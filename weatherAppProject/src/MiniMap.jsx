import React from 'react';

export default function MiniMap({ lat, lon }) {
    if (!lat || !lon) return null;

    // OpenStreetMap Embed URL
    // We need a bounding box (bbox). Let's create a small box around the point.
    const delta = 0.05; // Zoom Level approximate
    const bbox = `${lon - delta},${lat - delta},${lon + delta},${lat + delta}`;
    const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;

    return (
        <div className="highlight-card" style={{ padding: '0', overflow: 'hidden', height: '200px', gridColumn: 'span 2' }}>
            <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src={src}
                style={{ border: 'none', filter: 'invert(90%) hue-rotate(180deg)' }} // Dark mode map hack
                title="Location Map"
            ></iframe>
        </div>
    );
}
