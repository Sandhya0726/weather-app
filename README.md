# Weather-App

This is a simple weather application built with Vite + React + Typescript that allows users to search for the current weather of any city. The app fetches real-time weather data using geolocation and the Open-Meteo API and displays weekly weather forecast in a clean, user-friendly interface.

# Features

- Search weather by city or country
- Displays temperature, humidity, weather condition, and icons
- Styled using CSS
- Real-time API integration
- Custom hooks for reusable and readable code

# Tech Stack

- React + Vite – Frontend framework
- Typescript - Type Safety
- Tailwind CSS – Styling
- Open-Meteo API – Weather data
- Lottie Animations – Animated weather icons

# Important Note

The Geolocation API used in this app requires a secure context (HTTPS) or will only work on localhost.
If you deploy the project, make sure your hosting provider supports HTTPS (e.g., Vercel, Netlify, GitHub Pages with HTTPS enabled).

# Installation

- Clone the repository
  https://github.com/Sandhya0726/weather-app.git

- Navigate to project directory,

  - cd weather-app

- Install dependencies,

  - npm install

- Run the project,
  - npm run dev

### Project Structure

├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── public
└── vite.svg
├── src
├── App.css
├── App.tsx
├── assets
│ ├── animations
│ │ ├── LoaderClouds.json
│ │ ├── MainlyClear.json
│ │ ├── PartlyCloudy.json
│ │ ├── RainShower.json
│ │ ├── Rainy.json
│ │ ├── Snowfall.json
│ │ ├── Sunny.json
│ │ ├── Thunderstorm.json
│ │ └── Windy.json
│ └── react.svg
├── components
│ ├── AnimateIcon.tsx
│ ├── Loader.tsx
│ ├── MapView.tsx
│ ├── Navbar.tsx
│ ├── Weather.tsx
│ └── WeatherCards.tsx
├── constants
│ └── WeatherCode.ts
├── declaration.d.ts
├── hooks
│ ├── useDebouncedInput.tsx
│ ├── useGeoLocation.tsx
│ ├── useGeoSearch.tsx
│ └── useWeather.tsx
├── index.css
├── main.tsx
├── types
│ ├── AnimateIconProps.ts
│ ├── NavbarProps.ts
│ ├── WeatherCardsProps.ts
│ └── WeatherDataTypes.ts
└── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
