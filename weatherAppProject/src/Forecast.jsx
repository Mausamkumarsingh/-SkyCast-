import React from 'react';
import './Forecast.css';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

export default function Forecast({ forecast, isCelsius }) {
    if (!forecast || forecast.length === 0) return null;

    const getDayName = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };

    const convert = (temp) => {
        if (isCelsius) return Math.round(temp);
        return Math.round((temp * 9 / 5) + 32);
    }

    const unit = isCelsius ? "°C" : "°F";

    const getWeatherIcon = (weatherCode) => {
        // WMO Weather Codes from Open-Meteo
        // 0: Clear sky
        // 1, 2, 3: Mainly clear, partly cloudy, and overcast
        // 45, 48: Fog
        // 51, 53, 55: Drizzle
        // 61, 63, 65: Rain
        // 71, 73, 75: Snow fall
        // 80, 81, 82: Rain showers
        // 95, 96, 99: Thunderstorm

        if (weatherCode === 0 || weatherCode === 1) return <WbSunnyIcon className="forecast-icon" style={{ color: '#ffb74d' }} />;
        if (weatherCode >= 51 && weatherCode <= 67) return <WaterDropIcon className="forecast-icon" style={{ color: '#4fc3f7' }} />;
        if (weatherCode >= 80 && weatherCode <= 82) return <WaterDropIcon className="forecast-icon" style={{ color: '#4fc3f7' }} />;
        if (weatherCode >= 95) return <ThunderstormIcon className="forecast-icon" style={{ color: '#90a4ae' }} />;
        if (weatherCode >= 71 && weatherCode <= 77) return <AcUnitIcon className="forecast-icon" style={{ color: '#81d4fa' }} />;
        return <CloudIcon className="forecast-icon" style={{ color: '#eceff1' }} />; // Default cloud for others (2, 3, 45, 48 etc)
    };

    return (
        <div className="forecast-container">
            <h3>7-Day Forecast</h3>
            <div className="forecast-list">
                {forecast.map((day, index) => (
                    <div className="forecast-card" key={index}>
                        <div className="forecast-day">{getDayName(day.date)}</div>
                        {getWeatherIcon(day.weatherCode)}
                        <div className="forecast-temp">
                            {convert(day.temp_day)}{unit}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
