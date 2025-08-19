import { useState } from 'react';
import { weatherCodeMap } from '../constants/WeatherCode';
import type { GeoData, WeatherData } from '../types/WeatherDataTypes';

const Weather = () => {
  const [cityName, setCityName] = useState('');
  const [geoData, setGeoData] = useState<GeoData>();
  const [weather, setWeather] = useState<WeatherData>();

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`
      );
      const data = await res.json();
      console.log(data);

      if (data.results && data.results.length > 0) {
        setGeoData(data.results[0]);

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${data.results[0].latitude}&longitude=${data.results[0].longitude}&current_weather=true&hourly=relative_humidity_2m,weathercode&timezone=auto`
        );
        const weatherData = await weatherRes.json();
        setWeather(weatherData);
        console.log(weatherData);
      } else {
        alert('No results found!');
      }
    } catch (error) {
      console.error('Error fetching city:', error);
    }
  };

  const handleClick = () => {
    if (!cityName) {
      alert('Please enter a city or country name');
    } else {
      fetchData();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'blue',
        alignItems: 'start',
        gap: 10,
        width: '100%',
        justifyContent: 'center',
        height: '50vh',
        padding: 20,
        color: 'white',
      }}
    >
      <input
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        style={{
          padding: 4,
          borderRadius: 4,
          outline: 'none',
        }}
        type="text"
        placeholder="Enter city or country name"
      />
      <button
        onClick={handleClick}
        style={{
          padding: 4,
          fontSize: '14px',
          borderRadius: 4,
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        Get Weather
      </button>

      {geoData && (
        <div style={{ marginTop: 20 }}>
          <h3>
            Current Weather: {geoData?.name}, {geoData?.country}
          </h3>
          <p>
            Temperature: {weather?.current_weather?.temperature}{' '}
            {weather?.current_weather_units?.temperature}
          </p>
          <p>
            Windspeed: {weather?.current_weather?.windspeed}
            {weather?.current_weather_units?.windspeed}
          </p>
          <p>Humidity: {weather?.hourly?.relative_humidity_2m[0]}%</p>
          <p>
            Condition:{' '}
            {weather?.current_weather?.weathercode !== undefined
              ? weatherCodeMap?.[weather.current_weather.weathercode]
              : ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;
