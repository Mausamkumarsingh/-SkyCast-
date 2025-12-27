import React from 'react';
import './Forecast.css'; // Re-use styling

export default function HourlyForecast({ hourly, isCelsius }) {
    if (!hourly || hourly.length === 0) return null;

    // Convert temp helper
    const convert = (temp) => isCelsius ? temp : (temp * 9 / 5) + 32;

    // Layout configuration
    const height = 150;
    const width = 1200; // Wide scrollable area
    const points = hourly.map((h, i) => {
        const t = convert(h.temp);
        return t;
    });

    const minTemp = Math.min(...points) - 2;
    const maxTemp = Math.max(...points) + 2;
    const range = maxTemp - minTemp;

    // Generate SVG path
    const getY = (temp) => height - ((temp - minTemp) / range) * height * 0.7 - 20; // 0.7 to leave padding
    const getX = (i) => (i / (points.length - 1)) * width;

    let pathData = `M 0,${height}`; // Start bottom-left
    points.forEach((temp, i) => {
        pathData += ` L ${getX(i)},${getY(temp)}`;
    });
    pathData += ` L ${width},${height} Z`; // Close path to bottom-right

    // Format Time 
    const formatTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: 'numeric', hour12: true });
    };

    return (
        <div className="forecast-container" style={{ marginTop: '20px' }}>
            <h3>24-Hour Forecast</h3>
            <div className="hourly-scroll-container" style={{ overflowX: 'auto', paddingBottom: '10px' }}>
                <div style={{ position: 'relative', width: `${width}px`, height: `${height}px` }}>
                    {/* SVG Chart */}
                    <svg width={width} height={height} style={{ position: 'absolute', top: 0, left: 0 }}>
                        <defs>
                            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="rgba(255, 183, 77, 0.6)" />
                                <stop offset="100%" stopColor="rgba(255, 183, 77, 0)" />
                            </linearGradient>
                        </defs>
                        <path d={pathData} fill="url(#tempGradient)" stroke="none" />
                        <path
                            d={pathData.replace(`L ${width},${height} Z`, '').replace(`M 0,${height}`, `M 0,${getY(points[0])}`)}
                            fill="none"
                            stroke="#ffb74d"
                            strokeWidth="3"
                        />
                    </svg>

                    {/* Data Points Overlay */}
                    {hourly.map((h, i) => {
                        // Simplify: show every 2nd or 3rd to avoid crowding? Or all.
                        // Let's show all but maybe stagger text if needed.
                        const temp = convert(h.temp);
                        const x = getX(i);
                        const y = getY(temp);

                        return (
                            <div key={i} style={{ position: 'absolute', left: x - 20, top: y - 35, width: 40, textAlign: 'center', fontSize: '0.8rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                <div style={{ fontWeight: 'bold' }}>{Math.round(temp)}°</div>
                            </div>
                        );
                    })}

                    {/* Time Labels at Bottom */}
                    {hourly.map((h, i) => {
                        if (i % 2 !== 0) return null; // Show every 2 hours
                        const x = getX(i);
                        return (
                            <div key={i} style={{ position: 'absolute', left: x - 20, bottom: 0, width: 40, textAlign: 'center', fontSize: '0.7rem', color: '#aaa' }}>
                                {formatTime(h.time)}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
