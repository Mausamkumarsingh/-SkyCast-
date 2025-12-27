import React, { useEffect, useState } from 'react';

export default function SunClock({ sunrise, sunset }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const calculateProgress = () => {
            const now = Math.floor(Date.now() / 1000);
            if (now < sunrise) {
                setProgress(0); // Before sunrise
            } else if (now > sunset) {
                setProgress(100); // After sunset
            } else {
                const totalDaylight = sunset - sunrise;
                const elapsed = now - sunrise;
                setProgress((elapsed / totalDaylight) * 100);
            }
        };

        calculateProgress();
        const interval = setInterval(calculateProgress, 60000); // Update every minute
        return () => clearInterval(interval);
    }, [sunrise, sunset]);

    // SVG Config
    const width = 200;
    const height = 100; // Semi-circle
    const r = 80;
    const cx = 100;
    const cy = 100;

    // Convert progress (0-100) to angle (-90 to 90 degrees) for semi-circle
    // 0% = -180 deg (left), 50% = -90 (top), 100% = 0 (right)? 
    // Let's use standard unit circle: Left=180, Top=270, Right=360/0.
    // SVG path starts at 0 degrees (East/Right).
    // Let's map 0% -> 180 (Left) and 100% -> 0 (Right).
    // Angle in radians = PI + (progress/100) * PI ? No, that goes counter-clockwise 180 -> 360.

    // Simpler: 
    // 0% -> x: cx - r, y: cy (Left)
    // 50% -> x: cx, y: cy - r (Top)
    // 100%-> x: cx + r, y: cy (Right)

    const angleRad = Math.PI + (progress / 100) * Math.PI; // 180 to 360 deg in radians
    const sunX = cx + r * Math.cos(angleRad);
    const sunY = cy + r * Math.sin(angleRad);

    // Format Time
    const formatTime = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', color: 'var(--text-primary)' }}>
            <div style={{ position: 'relative', height: '110px', width: '200px' }}>
                <svg width="200" height="110" viewBox="0 0 200 110">
                    {/* Track */}
                    <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeLinecap="round" />

                    {/* Progress Arc (Optional, maybe tricky to do simple dashed arc for passed time) in SVG */}

                    {/* Sun Icon */}
                    <g transform={`translate(${sunX}, ${sunY})`}>
                        <circle r="8" fill="#FFD700" filter="drop-shadow(0 0 5px orange)" />
                    </g>
                </svg>

                {/* Labels */}
                <div style={{ position: 'absolute', bottom: '0', left: '10px', fontSize: '0.75rem', color: '#ccc' }}>
                    Rise<br />{formatTime(sunrise)}
                </div>
                <div style={{ position: 'absolute', bottom: '0', right: '10px', textAlign: 'right', fontSize: '0.75rem', color: '#ccc' }}>
                    Set<br />{formatTime(sunset)}
                </div>
            </div>
        </div>
    );
}
