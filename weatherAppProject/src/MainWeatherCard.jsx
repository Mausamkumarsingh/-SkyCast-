import React from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import CloudIcon from '@mui/icons-material/Cloud';
import './MainWeatherCard.css';

export default function MainWeatherCard({ weatherInfo, isCelsius }) {
    const { city, temp, weather, dt } = weatherInfo;

    const date = new Date(dt * 1000);
    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' });

    // Conversion helper
    const displayTemp = isCelsius ? Math.round(temp) : Math.round((temp * 9 / 5) + 32);
    const unit = isCelsius ? "°C" : "°F";

    const getWeatherIcon = () => {
        if (weather.includes("rain") || weatherInfo.humidity > 80) return <ThunderstormIcon style={{ fontSize: '4rem' }} />;
        if (temp > 15) return <WbSunnyIcon style={{ fontSize: '4rem' }} />;
        if (temp <= 15 && temp > 5) return <CloudIcon style={{ fontSize: '4rem' }} />;
        return <AcUnitIcon style={{ fontSize: '4rem' }} />;
    };

    // ... existing URLs ...
    const INIT_URL = "https://images.unsplash.com/photo-1680352267694-a7fd4f33d4e1?q=80&w=1964&auto=format&fit=crop";
    const HOT_URL = "https://images.unsplash.com/photo-1504370805625-d32c54b16100?q=80&w=1932&auto=format&fit=crop";
    const COLD_URL = "https://images.unsplash.com/photo-1612208695882-02f2322b7fee?q=80&w=1974&auto=format&fit=crop";
    const RAIN_URL = "https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=2070&auto=format&fit=crop";
    const CLOUDY_URL = "https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1951&auto=format&fit=crop"; // Cloudy/Overcast
    const HAZE_URL = "https://images.unsplash.com/photo-1522108709-178f7c5285e2?q=80&w=1974&auto=format&fit=crop"; // Foggy/Haze
    const SNOW_URL = "https://images.unsplash.com/photo-1477601434617-6d7d0eb0c388?q=80&w=2072&auto=format&fit=crop"; // Snow

    const getImage = () => {
        const desc = weather.toLowerCase();
        if (desc.includes("rain") || desc.includes("drizzle") || desc.includes("thunderstorm") || weatherInfo.humidity > 80) return RAIN_URL;
        if (desc.includes("snow")) return SNOW_URL;
        if (desc.includes("haze") || desc.includes("mist") || desc.includes("fog") || desc.includes("smoke")) return HAZE_URL;
        if (desc.includes("cloud")) return CLOUDY_URL;
        if (temp > 15) return HOT_URL;
        return COLD_URL;
    };

    return (
        <div className="main-weather-card" style={{ backgroundImage: `url(${getImage()})` }}>
            <div className="card-header">
                <h2 className="city-name">{city}{weatherInfo.country ? `, ${weatherInfo.country}` : ''}</h2>
                <span className="date-time">{formattedDate}</span>
            </div>

            <div className="weather-display">
                <div className="temperature">
                    {displayTemp}{unit}
                </div>
                <div className="weather-icon-container">
                    {getWeatherIcon()}
                </div>
            </div>

            <div className="weather-description">
                {weather}
            </div>
        </div>
    );
}
