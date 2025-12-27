import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import MicIcon from '@mui/icons-material/Mic';
import "./SearchBox.css";

export default function SearchBox({ updateInfo, setLoading }) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);

    // History State
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('weatherHistory');
        return saved ? JSON.parse(saved) : [];
    });

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const _RAW_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const API_KEY = _RAW_API_KEY
        ? String(_RAW_API_KEY)
            .trim()
            .replace(/^['"]+|['"]+$/g, '')
            .replace(/;+$/g, '')
        : undefined;

    const addToHistory = (cityName) => {
        // Avoid duplicates and limit to 4 items
        const newHistory = [cityName, ...history.filter(h => h !== cityName)].slice(0, 4);
        setHistory(newHistory);
        localStorage.setItem('weatherHistory', JSON.stringify(newHistory));
    };

    // Helper to process weather data
    const processWeatherData = async (url) => {
        if (!API_KEY) {
            console.error('Missing API key. Set VITE_WEATHER_API_KEY in .env');
            throw new Error("Missing API Key");
        }

        if (setLoading) setLoading(true);

        try {
            let response = await fetch(url);
            let jsonResponse = await response.json();
            if (!response.ok) {
                throw new Error("City not found");
            }

            // Fetch Air Quality using coordinates
            let lat = jsonResponse.coord.lat;
            let lon = jsonResponse.coord.lon;
            let aqi = null;
            let pollutants = {};
            try {
                let aqiResponse = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
                let aqiJson = await aqiResponse.json();
                aqi = aqiJson.list[0].main.aqi;
                pollutants = aqiJson.list[0].components;
            } catch (e) {
                console.warn("AQI Fetch failed", e);
            }

            // Fetch Forecast (Full 7-Day and Hourly using Open-Meteo)
            let forecast = [];
            let hourly = [];
            let uv = 0; // Default
            try {
                const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&hourly=temperature_2m,weather_code&timezone=auto`;
                let forecastResponse = await fetch(openMeteoUrl);
                let forecastJson = await forecastResponse.json();

                if (forecastJson.daily) {
                    // Current UV (approx from today's max or we could fetch current, but max is useful)
                    if (forecastJson.daily.uv_index_max && forecastJson.daily.uv_index_max.length > 0) {
                        uv = forecastJson.daily.uv_index_max[0];
                    }

                    forecast = forecastJson.daily.time.map((date, index) => {
                        return {
                            date: date,
                            temp_max: forecastJson.daily.temperature_2m_max[index],
                            temp_min: forecastJson.daily.temperature_2m_min[index],
                            temp_day: forecastJson.daily.temperature_2m_max[index],
                            weatherCode: forecastJson.daily.weather_code[index],
                        };
                    });
                }

                if (forecastJson.hourly) {
                    const now = new Date();
                    const currentHour = now.getHours();
                    const startIndex = currentHour;
                    const endIndex = startIndex + 24;

                    hourly = forecastJson.hourly.time.slice(startIndex, endIndex).map((time, i) => {
                        return {
                            time: time,
                            temp: forecastJson.hourly.temperature_2m[startIndex + i],
                            weatherCode: forecastJson.hourly.weather_code[startIndex + i]
                        };
                    });
                }
            } catch (e) {
                console.warn("Forecast Fetch failed", e);
            }

            let result = {
                city: jsonResponse.name,
                lat: lat, // Pass explicit coords
                lon: lon,
                temp: jsonResponse.main.temp,
                // ...
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelslike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
                wind: jsonResponse.wind.speed,
                pressure: jsonResponse.main.pressure,
                visibility: jsonResponse.visibility / 1000,
                sunrise: jsonResponse.sys.sunrise,
                sunset: jsonResponse.sys.sunset,
                dt: jsonResponse.dt,
                aqi: aqi,
                uv: uv, // Add UV
                pollutants: pollutants,
                country: jsonResponse.sys.country,
                forecast: forecast,
                hourly: hourly,
            };

            if (setLoading) setLoading(false);
            return result;
        } catch (err) {
            console.error('Fetch error', err);
            if (setLoading) setLoading(false);
            throw err;
        }
    };

    let getWeatherInfo = async (cityToSearch) => {
        let searchQuery = cityToSearch || city;
        if (searchQuery.toLowerCase().trim() === "punjab") {
            searchQuery = "Punjab, IN";
        }

        const url = `${API_URL}?q=${encodeURIComponent(searchQuery)}&appid=${API_KEY}&units=metric`;
        return await processWeatherData(url);
    };

    let handleLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                const url = `${API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
                try {
                    let newInfo = await processWeatherData(url);
                    updateInfo(newInfo);
                    setCity("");
                    setError(false);
                } catch (err) {
                    setError(true);
                }
            }, (error) => {
                console.error("Geolocation error:", error);
                alert("Unable to retrieve your location. Please check browser permissions.");
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    let handleChange = (evt) => {
        setCity(evt.target.value);
    };

    const handleHistoryClick = async (historyCity) => {
        try {
            let newInfo = await getWeatherInfo(historyCity);
            updateInfo(newInfo);
            setError(false);
            addToHistory(newInfo.city);
        } catch (e) {
            setError(true);
        }
    };

    let handleSubmit = async (evt) => {
        try {
            evt.preventDefault();
            if (!city) return;
            const cityToSearch = city;
            setCity("");
            let newInfo = await getWeatherInfo(cityToSearch);
            updateInfo(newInfo);
            setError(false);
            addToHistory(newInfo.city);
        } catch (err) {
            setError(true);
        }
    };

    const [isListening, setIsListening] = useState(false);

    const startListening = () => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-IN'; // Better for Indian accents/cities
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onstart = () => {
                setIsListening(true);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognition.onresult = (event) => {
                let transcript = event.results[0][0].transcript;
                console.log("Voice Result Raw:", transcript);

                // Clean up: remove trailing period and trim
                transcript = transcript.replace(/\.$/, '').trim();
                console.log("Voice Result Cleaned:", transcript);

                setCity(transcript); // Show the user what was heard
                handleHistoryClick(transcript);
            };

            recognition.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
                let msg = "Voice search failed.";
                if (event.error === 'no-speech') msg = "No speech was detected. Please try again.";
                if (event.error === 'not-allowed') msg = "Microphone permission denied. Please allow access.";
                if (event.error === 'network') msg = "Network error. Please check your connection.";
                alert(msg);
            };

            recognition.start();
        } else {
            alert("Voice search is not supported in this browser.");
        }
    };

    return (
        <div className='SearchBox'>
            <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <TextField
                    id="city"
                    label="City Name"
                    variant="outlined"
                    required
                    value={city}
                    onChange={handleChange}
                    style={{ flexGrow: 1, minWidth: '200px' }}
                />

                <Button
                    variant={isListening ? "contained" : "outlined"}
                    color={isListening ? "error" : "primary"}
                    onClick={startListening}
                    title="Voice Search"
                    style={{
                        height: '56px',
                        minWidth: '56px',
                        padding: '0',
                        borderColor: isListening ? '' : '#4fc3f7',
                        color: isListening ? 'white' : '#4fc3f7'
                    }}
                >
                    <MicIcon />
                </Button>

                <Button variant="contained" type="submit" style={{ height: '56px' }}>Search</Button>
                <Button
                    variant="outlined"
                    onClick={handleLocation}
                    title="Use My Location"
                    style={{ height: '56px', minWidth: '56px', padding: '0' }}
                >
                    <MyLocationIcon />
                </Button>
            </form>

            {/* Search History Chips */}
            {history.length > 0 && (
                <div className="history-chips" style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                    {history.map((h, i) => (
                        <span
                            key={i}
                            onClick={() => handleHistoryClick(h)}
                            style={{
                                background: 'rgba(255,255,255,0.1)',
                                padding: '4px 12px',
                                borderRadius: '16px',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                border: '1px solid rgba(255,255,255,0.2)',
                                transition: 'all 0.2s'
                            }}
                            className="history-chip"
                        >
                            {h}
                        </span>
                    ))}
                </div>
            )}

            {error && <p style={{ color: "red", marginTop: '10px' }}>No such place exists!</p>}
            <p style={{ fontSize: '0.8rem', color: '#aaaaaa', marginTop: '10px' }}>
                Tip: For specific locations, search "City, Country Code" (e.g., "Bihar, IN")
            </p>
        </div>
    );
}
