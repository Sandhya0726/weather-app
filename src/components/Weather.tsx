import { useEffect, useState } from 'react';
import { WeatherCodeIcons, weatherCodeMap } from '../constants/WeatherCode';
import type { GeoData, WeatherData } from '../types/WeatherDataTypes';
import '../styles/Weather.css';

const Weather = () => {
  const [cityName, setCityName] = useState('');
  const [geoData, setGeoData] = useState<GeoData>();
  const [weather, setWeather] = useState<WeatherData>();

  const fetchData = async () => {
    try {
      if (cityName !== '') {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`
        );

        const data = await res.json();
        if (data.results && data.results.length > 0) {
          setGeoData(data.results[0]);

          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${data.results[0].latitude}&longitude=${data.results[0].longitude}&current_weather=true&hourly=relative_humidity_2m,weathercode&timezone=auto`
          );
          const weatherData = await weatherRes.json();
          setWeather(weatherData);
        } else {
          alert('No results found!');
        }
      } else {
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${geoData?.latitude}&longitude=${geoData?.longitude}&current_weather=true&hourly=relative_humidity_2m,weathercode&timezone=auto`
        );
        const weatherData = await weatherRes.json();
        setWeather(weatherData);
      }
    } catch (error) {
      console.error('Error fetching city:', error);
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setGeoData({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (geoData && !cityName) {
      fetchData();
    }
  }, [geoData]);

  const handleClick = () => {
    if (!cityName) {
      alert('Please enter a city or country name');
    } else {
      fetchData();
    }
  };

  console.log(weather, 'weatherData');

  return (
    <div className="weather-container">
      <div className="search-box">
        <input
          type="search"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter city or country name"
        />
        <button onClick={handleClick}>Get Weather</button>
      </div>

      {geoData && (
        <div className="weather-wrapper">
          <div className="weather-info">
            <h3>
              Current Weather:
              {geoData?.name
                ? ` ${geoData.name}, ${geoData.country}`
                : 'Your Location'}
            </h3>
            <p>
              Temperature: {weather?.current_weather?.temperature}
              {weather?.current_weather_units?.temperature}
            </p>
            <p>
              Windspeed: {weather?.current_weather?.windspeed}
              {weather?.current_weather_units?.windspeed}
            </p>
            <p>Humidity: {weather?.hourly?.relative_humidity_2m[0]}%</p>
            <p>
              Condition:{' '}
              {weather?.current_weather?.weathercode !== undefined &&
                weatherCodeMap?.[weather.current_weather.weathercode]}
            </p>
          </div>
          <div className="weather-icon">
            {weather?.current_weather?.weathercode !== undefined &&
              WeatherCodeIcons?.[weather.current_weather.weathercode]}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
