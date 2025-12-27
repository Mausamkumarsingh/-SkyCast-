🌤️ SkyCast - Advanced Intelligent Weather Dashboard  
🔗 Live Demo: https://skycast-one-wine.vercel.app

## 📖 Project Overview
SkyCast is a premium, feature-rich weather application built with **React** that goes beyond basic forecasting. It serves as an intelligent daily planner, providing real-time data, visualization, and lifestyle advice. The application features a dynamic theme engine that adapts to weather conditions, a voice-controlled search interface, and interactive data verifications like sun position tracking and pollution maps.

## 🛠️ Tech Stack
*   **Frontend Framework**: React.js (Vite)
*   **UI/UX Library**: Material UI (MUI) & Plain CSS3 (Glassmorphism, CSS Variables)
*   **APIs Integrated**:
    *   **OpenWeatherMap**: Current weather, Humidity, Wind, Pressure.
    *   **OpenWeatherMap Air Quality**: AQI and Pollutant breakdown (CO, NO2, O3).
    *   **Open-Meteo**: High-precision 7-Day Forecast, Hourly Temp Curve, UV Index.
    *   **OpenStreetMap**: Interactive location verification map.
*   **Browser APIs**:
    *   **Geolocation API**: For "Locate Me" GPS functionality.
    *   **Web Speech API**: For voice-activated search commands.
    *   **LocalStorage**: For persisting search history.
*   **Tools**:
    *   `html2canvas`: For generating social-shareable dashboard screenshots.

## 🚀 Key Features
1.  **Dynamic Theme Engine 🎨**: Implemented a global state-driven styling system that dynamically updates the application's color palette (gradients, glass effects) based on live weather conditions (Sunny, Rain, Snow, Night).
2.  **Smart Assistant Module 🧠**: Developed a logic-based recommendation engine that analyzes temperature, wind, and rain data to provide actionable advice on clothing ("Wear a heavy coat") and outdoor activities ("Good for running").
3.  **Data Visualization 📊**:
    *   **Hourly Chart**: Built a custom SVG area chart to visualize temperature trends over the next 24 hours.
    *   **Sun Cycle Arc**: Implemented a mathematical SVG animation that tracks the sun's exact position between sunrise and sunset times.
    *   **UV & AQI Gauges**: Color-coded indicators for environmental health safety.
4.  **Accessibility & UX 🎤**: Integrated **Voice Search** optimized for Indian accents using the `en-IN` locale, complete with visual feedback states and transcript cleaning. Added **Skeleton Loaders** for perceived performance improvement.

## 💡 Technical Highlights (For Resume)
*   **Multi-API Orchestration**: Successfully merged data from three different API providers (OpenWeather, Open-Meteo, OSM) into a unified, normalized state object for the UI.
*   **SVG Animations**: Created lightweight, dependency-free SVG components for the Hourly Chart and Sun Arc, requiring calculation of path coordinates and gradients dynamically.
*   **Performance**: Implemented `useEffect` and `useCallback` hooks to manage timers (Sun Clock) and prevent unnecessary re-renders during state updates.
*   **Responsive Design**: Built a CSS Grid-based layout that adapts seamlessly from desktop dashboards to mobile screens.

## 📸 Screenshots
*(Add your screenshots here)*
