# 🌤️ SkyCast – Advanced Intelligent Weather Dashboard  
🔗 **Live Demo:** https://skycast-one-wine.vercel.app  

---

## 📖 Project Overview
SkyCast is a premium, feature-rich weather application built with **React** that goes beyond basic forecasting. It serves as an intelligent daily planner, providing real-time data, visualization, and lifestyle advice.

The application features:
- a **dynamic theme engine** that adapts to weather conditions  
- **voice-controlled search interface**  
- interactive visualizations like **sun position tracking and pollution maps**

---

## 🛠️ Tech Stack

### 🖥️ Frontend Framework
- **React.js (Vite)**

### 🎨 UI/UX
- **Material UI (MUI)**
- **Plain CSS3** — Glassmorphism, CSS variables

### 🌐 APIs Integrated
- **OpenWeatherMap** – current weather, humidity, wind, pressure  
- **OpenWeatherMap Air Quality** – AQI, pollutants (CO, NO₂, O₃ etc.)  
- **Open-Meteo** – 7-day forecast, hourly temperature curve, UV index  
- **OpenStreetMap** – interactive location verification map  

### 🧭 Browser APIs
- **Geolocation API** – “Locate Me” GPS detection  
- **Web Speech API** – voice-activated search commands  
- **LocalStorage** – persistent search history  

### 🛠️ Tools
- **html2canvas** – shareable dashboard screenshots  

---

## ✨ Key Features

- 🎨 **Dynamic Theme Engine**  
  Weather-adaptive gradients & glass effects (Sunny, Rain, Snow, Night)

- 🧠 **Smart Assistant Module**  
  Clothing & activity suggestions such as:  
  - “Wear a heavy coat”  
  - “Good for running”  
  - “Carry an umbrella”

- 📊 **Data Visualizations**
  - Hourly temperature SVG area chart  
  - Sun cycle arc animation  
  - UV & AQI gauges  

- 🎤 **Accessibility & UX**
  - Voice search optimized for **Indian accent (`en-IN`)**
  - Transcript cleaning & visual feedback states  
  - Skeleton loaders for smooth experience  

---

## 💡 Technical Highlights (Resume-Ready)

- **Multi-API orchestration**  
  Unified normalized data from OpenWeather, Open-Meteo & OSM

- **SVG animations**  
  Custom dependency-free components for charts & sun-arc

- **Performance optimization**  
  Efficient `useEffect` and `useCallback` usage to avoid re-renders

- **Fully responsive design**  
  CSS Grid layout adapting seamlessly from desktop to mobile

---


## 🖼️ Screenshots

### 🌍 Dashboard View
![Dashboard](src/assets/dashboard.png)

### 🗺️ Map & Smart Assistant
![Smart Assistant](src/assets/smart-assistant.png)

### ⏱️ 24-Hour Forecast
![24 Hour Forecast](src/assets/24hour.png)



🛡️ License 

This project is for educational and personal use. 
You may modify and use it for learning purposes.

## ⚙️ Run the Project Locally

```bash
git clone https://github.com/Mausamkumarsingh/-SkyCast-.git
cd -SkyCast-/weatherAppProject
npm install
npm run dev





