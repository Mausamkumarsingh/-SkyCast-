import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import './WeatherDashboard.css'; // Re-use grid layout

export default function LoadingSkeleton() {
    return (
        <div className="weather-dashboard" style={{ marginTop: '20px' }}>
            <div className="dashboard-grid">
                {/* Main Card Skeleton */}
                <Skeleton
                    variant="rectangular"
                    height={500}
                    sx={{ borderRadius: '25px', bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                />

                <div className="right-panel">
                    {/* Highlights Grid Skeleton */}
                    <div className="highlights-grid">
                        <Skeleton variant="rectangular" height={150} sx={{ borderRadius: '20px', bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                        <Skeleton variant="rectangular" height={150} sx={{ borderRadius: '20px', bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                        <Skeleton variant="rectangular" height={150} sx={{ borderRadius: '20px', bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                        <Skeleton variant="rectangular" height={150} sx={{ borderRadius: '20px', bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                    </div>

                    {/* Forecast Skeleton */}
                    <Skeleton
                        variant="rectangular"
                        height={180}
                        sx={{ borderRadius: '20px', marginTop: '2rem', bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                    />
                </div>
            </div>
        </div>
    );
}
