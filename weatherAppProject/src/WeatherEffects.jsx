import React from 'react';
import './WeatherEffects.css';

export default function WeatherEffects({ weather }) {
    if (!weather) return null;
    const desc = weather.toLowerCase();

    // Determine effect
    let EffectComponent = null;

    if (desc.includes("rain") || desc.includes("drizzle") || desc.includes("thunderstorm")) {
        // Render Rain
        const drops = Array.from({ length: 50 }).map((_, i) => ({
            left: Math.random() * 100 + 'vw',
            delay: Math.random() * 2 + 's',
            duration: 0.5 + Math.random() * 0.5 + 's'
        }));

        EffectComponent = (
            <div className="weather-overlay rain-container">
                {drops.map((d, i) => (
                    <div className="drop" key={i} style={{ left: d.left, animationDelay: d.delay, animationDuration: d.duration }}></div>
                ))}
                {desc.includes("thunderstorm") && <div className="thunder"></div>}
            </div>
        );
    } else if (desc.includes("snow") || desc.includes("sleet")) {
        // Render Snow
        const flakes = Array.from({ length: 50 }).map((_, i) => ({
            left: Math.random() * 100 + 'vw',
            delay: Math.random() * 5 + 's',
            duration: 3 + Math.random() * 2 + 's',
            opacity: Math.random()
        }));

        EffectComponent = (
            <div className="weather-overlay snow-container">
                {flakes.map((f, i) => (
                    <div className="flake" key={i} style={{ left: f.left, animationDelay: f.delay, animationDuration: f.duration, opacity: f.opacity }}></div>
                ))}
            </div>
        );
    }

    return EffectComponent;
}
