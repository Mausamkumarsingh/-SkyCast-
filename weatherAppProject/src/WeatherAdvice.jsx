import React from 'react';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import WarningIcon from '@mui/icons-material/Warning';

export default function WeatherAdvice({ weatherInfo, isCelsius }) {
    if (!weatherInfo) return null;

    const { temp, weather, wind, humidity } = weatherInfo;

    // Convert for logic if needed, but let's stick to C for thresholds
    const tempC = isCelsius ? temp : (temp - 32) * 5 / 9;
    const cond = weather ? weather.toLowerCase() : "";

    let outfit = "Comfortable clothes";
    let activity = "Good day for a walk";
    let color = "#4caf50"; // Green for good

    // Clothing Logic
    if (tempC < 5) outfit = "Heavy coat, scarf, and gloves necessary! ❄️";
    else if (tempC < 15) outfit = "Wear a sweater or jacket. It's chilly. 🧥";
    else if (tempC < 25) outfit = "Comfortable layers or t-shirt. 👕";
    else outfit = "Lightweight, breathable clothes. It's hot! 🩳";

    if (cond.includes("rain") || cond.includes("drizzle")) {
        outfit += " Don't forget an umbrella! ☂️";
        activity = "Indoor activities recommended. 📚";
        color = "#ff9800"; // Orange
    }

    if (cond.includes("snow")) {
        outfit += " Wear waterproof boots! 👢";
        activity = "Build a snowman? ⛄";
        color = "#2196f3"; // Blue
    }

    if (wind > 10) { // High wind
        outfit += " Secure your hat, it's windy! 🌬️";
    }

    // Activity Logic refinements
    if (tempC > 30) {
        activity = "Stay hydrated and avoid midday sun. 🥤";
        color = "#f44336"; // Red
    }
    else if (tempC >= 15 && tempC <= 25 && !cond.includes("rain")) {
        activity = "Perfect weather for a run or hike! 🏃";
        color = "#00e676"; // Bright green
    }

    return (
        <div className="highlight-card" style={{
            gridColumn: 'span 2',
            background: `linear-gradient(to right, ${color}20, transparent)`,
            borderLeft: `4px solid ${color}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        }}>
            <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                Smart Assistant
            </h4>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                <CheckroomIcon sx={{ color: 'var(--accent-color)' }} />
                <span>{outfit}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                <DirectionsRunIcon sx={{ color: 'var(--accent-color)' }} />
                <span>{activity}</span>
            </div>
        </div>
    );
}
