import { useState } from 'react';
import SearchBox from "./SearchBox";
import MainWeatherCard from "./MainWeatherCard";
import Highlights from "./Highlights";
import Forecast from "./Forecast";
import HourlyForecast from "./HourlyForecast";
import WeatherEffects from './WeatherEffects';
import './WeatherDashboard.css';

import LoadingSkeleton from './LoadingSkeleton';
import MiniMap from './MiniMap';
import WeatherAdvice from './WeatherAdvice';

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        // ... (keep initial state or mostly null)
        city: "Punjab",
        lat: 30.7, // Default
        lon: 76.7, // Default
        feelslike: 15,
        temp: 14,
        tempMin: 12,
        tempMax: 16,
        humidity: 60,
        weather: "haze",
        wind: 3,
        pressure: 1015,
        visibility: 5,
        sunrise: 1703640000,
        sunset: 1703680000,
        dt: 1703660000,
        aqi: null,
        pollutants: {},
        country: "IN",
        forecast: []
    });

    const [loading, setLoading] = useState(false);

    // Share Functionality
    const handleShare = async () => {
        // Dynamic import to avoid SSR issues if any, mainly to keep clean
        const html2canvas = (await import('html2canvas')).default;
        const element = document.querySelector('.weather-dashboard');

        if (element) {
            try {
                const canvas = await html2canvas(element, {
                    backgroundColor: null, // Transparent/Use CSS bg
                    scale: 2, // High res
                    useCORS: true // Attempt to capture external images if CORS allows
                });

                const link = document.createElement('a');
                link.download = `weather-${weatherInfo.city}.png`;
                link.href = canvas.toDataURL();
                link.click();
            } catch (err) {
                console.error("Screenshot failed", err);
                alert("Could not create screenshot. Try again.");
            }
        }
    };

    let updateInfo = (result) => {
        setWeatherInfo(result);
    }

    const [isCelsius, setIsCelsius] = useState(true);

    const toggleUnit = () => {
        setIsCelsius(!isCelsius);
    };

    // Determine Theme Class
    const getThemeClass = () => {
        if (!weatherInfo.weather) return 'theme-clear';

        const condition = weatherInfo.weather.toLowerCase();
        // Check for Night first? (Need check against dt vs sunrise/sunset or simplified logic)
        // If we have icon "n" suffix, it's night. But we only store description string mostly.
        // Let's rely on string match for now or assume day if not clear.

        if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunder')) return 'theme-rain';
        if (condition.includes('snow') || condition.includes('sleet')) return 'theme-snow';
        if (condition.includes('cloud') || condition.includes('mist') || condition.includes('smoke') || condition.includes('haze')) return 'theme-clouds';
        if (condition.includes('clear')) return 'theme-clear';

        return 'theme-clear';
    };

    return (
        <div className={`weather-dashboard ${getThemeClass()}`}>
            <WeatherEffects weather={weatherInfo.weather} />
            <div className="search-section">
                <SearchBox updateInfo={updateInfo} setLoading={setLoading} />
            </div>

            <div className="unit-toggle-container" style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000, display: 'flex', gap: '10px' }}>
                <button
                    onClick={handleShare}
                    style={{
                        padding: '10px 15px',
                        borderRadius: '20px',
                        border: 'none',
                        background: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        cursor: 'pointer',
                        backdropFilter: 'blur(5px)',
                        fontWeight: 'bold'
                    }}
                    title="Share Screenshot"
                >
                    📸
                </button>
                <button
                    onClick={toggleUnit}
                    style={{
                        padding: '10px 20px',
                        borderRadius: '20px',
                        border: 'none',
                        background: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        cursor: 'pointer',
                        backdropFilter: 'blur(5px)',
                        fontWeight: 'bold'
                    }}
                >
                    {isCelsius ? '°C' : '°F'}
                </button>
            </div>

            {loading ? (
                <LoadingSkeleton />
            ) : (
                <div className="dashboard-grid">
                    <MainWeatherCard weatherInfo={weatherInfo} isCelsius={isCelsius} />
                    <div className="right-panel">
                        <Highlights weatherInfo={weatherInfo} />
                        <div style={{ margin: '20px 0' }}>
                            <MiniMap lat={weatherInfo.lat} lon={weatherInfo.lon} />
                        </div>
                        {/* Advice Card */}
                        <div style={{ marginBottom: '20px' }}>
                            <WeatherAdvice weatherInfo={weatherInfo} isCelsius={isCelsius} />
                        </div>
                        <HourlyForecast hourly={weatherInfo.hourly} isCelsius={isCelsius} />
                        <Forecast forecast={weatherInfo.forecast} isCelsius={isCelsius} />
                    </div>
                </div>
            )}
        </div>
    );
}