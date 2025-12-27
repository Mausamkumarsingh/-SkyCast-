import React from 'react';
import './Highlights.css';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SpeedIcon from '@mui/icons-material/Speed'; // Pressure
import SunClock from './SunClock';

export default function Highlights({ weatherInfo }) {
    const { feelslike, humidity, wind, pressure, visibility, sunrise, sunset, aqi, uv } = weatherInfo;

    // Helper: Calculate Moon Phase
    const getMoonPhase = (date) => {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 3) { year--; month += 12; }
        ++month;
        const c = 365.25 * year;
        const e = 30.6 * month;
        const jd = c + e + day - 694039.09;
        const b = jd / 29.5305882;
        const phase = (b - Math.floor(b));

        if (phase < 0.03) return { name: "New Moon", icon: "🌑" };
        if (phase < 0.25) return { name: "Waxing Crescent", icon: "🌒" };
        if (phase < 0.28) return { name: "First Quarter", icon: "🌓" };
        if (phase < 0.50) return { name: "Waxing Gibbous", icon: "🌔" };
        if (phase < 0.53) return { name: "Full Moon", icon: "🌕" };
        if (phase < 0.75) return { name: "Waning Gibbous", icon: "🌖" };
        if (phase < 0.78) return { name: "Last Quarter", icon: "🌗" };
        return { name: "Waning Crescent", icon: "🌘" };
    };

    const moon = getMoonPhase(new Date());

    const getAQIStatus = (aqiValue) => {
        if (!aqiValue) return { label: 'N/A', color: 'gray' };
        if (aqiValue <= 1) return { label: 'Good', color: '#00e676' };
        if (aqiValue <= 2) return { label: 'Fair', color: '#ffea00' };
        if (aqiValue <= 3) return { label: 'Moderate', color: '#ff9100' };
        if (aqiValue <= 4) return { label: 'Poor', color: '#ff3d00' };
        return { label: 'Very Poor', color: '#d50000' };
    };

    const getUVStatus = (u) => {
        if (u === undefined) return { label: 'N/A', color: 'gray' };
        if (u <= 2) return { label: 'Low', color: '#00e676' };
        if (u <= 5) return { label: 'Moderate', color: '#ffea00' };
        if (u <= 7) return { label: 'High', color: '#ff9100' };
        if (u <= 10) return { label: 'Very High', color: '#ff3d00' };
        return { label: 'Extreme', color: '#d50000' };
    }

    const aqiStatus = getAQIStatus(aqi);
    const uvStatus = getUVStatus(uv);

    return (
        <div className="highlights-container">
            <h3>Today's Highlights</h3>
            <div className="highlights-grid">

                {/* Sun Arc Card */}
                <div className="highlight-card sun-card" style={{ gridColumn: 'span 2' }}>
                    <h4 style={{ marginBottom: '0' }}>Sun Cycle</h4>
                    <SunClock sunrise={sunrise} sunset={sunset} />
                </div>

                {/* AQI Card */}
                <div className="highlight-card">
                    <h4>Air Quality</h4>
                    <div className="aqi-badge" style={{ borderColor: aqiStatus.color, color: aqiStatus.color, boxShadow: `0 0 10px ${aqiStatus.color}40` }}>
                        {aqiStatus.label}
                    </div>
                </div>

                {/* UV Index Card */}
                <div className="highlight-card">
                    <h4>UV Index</h4>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: uvStatus.color, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                        <WbSunnyIcon sx={{ color: uvStatus.color }} />
                        {uv ? Math.round(uv) : 0}
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{uvStatus.label}</div>
                </div>

                {/* Moon Phase Card */}
                <div className="highlight-card">
                    <h4>Moon Phase</h4>
                    <div style={{ fontSize: '2.5rem', lineHeight: '1' }}>{moon.icon}</div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{moon.name}</div>
                </div>

                <div className="highlight-card">
                    <h4>Humidity</h4>
                    <div className="highlight-value-container">
                        <WaterDropIcon className="highlight-icon" />
                        <div className="highlight-value">{humidity}%</div>
                    </div>
                </div>

                <div className="highlight-card">
                    <h4>Wind</h4>
                    <div className="highlight-value-container">
                        <AirIcon className="highlight-icon" />
                        <div className="highlight-value">{wind} m/s</div>
                    </div>
                </div>

                <div className="highlight-card">
                    <h4>Visibility</h4>
                    <div className="highlight-value-container">
                        <VisibilityIcon className="highlight-icon" />
                        <div className="highlight-value">{visibility} km</div>
                    </div>
                </div>

                <div className="highlight-card">
                    <h4>Pressure</h4>
                    <div className="highlight-value-container">
                        <SpeedIcon className="highlight-icon" />
                        <div className="highlight-value">{pressure} hPa</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
