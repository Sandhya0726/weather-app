import { useEffect, useState } from 'react';
import { WeatherCodeIcons, weatherCodeMap } from '../constants/WeatherCode';
import type { GeoData, WeatherData } from '../types/WeatherDataTypes';
import '../styles/Weather.css';

const Weather = () => {
  const [cityName, setCityName] = useState('');
  const [geoData, setGeoData] = useState<GeoData>();
  const [weather, setWeather] = useState<WeatherData>();

  const fetchByCountry = async (cityName: string) => {
    try {
      if (cityName !== '') {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`
        );

        const data = await res.json();
        if (data.results && data.results.length > 0) {
          setGeoData(data.results[0]);
        }
      }
    } catch (err) {
      console.log(err, 'err');
    }
  };

  const fetchByLatLon = async (latitutude: number, longitude: number) => {
    try {
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitutude}&longitude=${longitude}&current_weather=true&hourly=relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
      );
      const weatherData = await weatherRes.json();
      setWeather(weatherData);
    } catch (err) {
      console.log(err, 'err');
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
    if (geoData) {
      fetchByLatLon(geoData.latitude, geoData.longitude);
    }
  }, [geoData]);

  const handleClick = () => {
    if (!cityName) {
      alert('Please enter a city or country name');
    } else {
      fetchByCountry(cityName);
    }
  };

  return (
    <>
      <div className="weather-container">
        <div className="input-section">
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

        <h3 style={{ placeSelf: 'center' }}>Weekly Weather Forecast</h3>
        <div className="weekly-container">
          {weather?.daily?.time?.map((day, index) => {
            const weekdays = new Date(day).toLocaleString('en-US', {
              weekday: 'short',
            });

            return (
              <div key={index} className="weekly-day">
                <p className="day-title">
                  {weekdays} <br />
                  {day}
                </p>
                <p>
                  Min: {weather?.daily?.temperature_2m_min[index]}
                  {weather?.daily_units?.temperature_2m_min}
                </p>
                <p>
                  Max: {weather?.daily?.temperature_2m_max[index]}
                  {weather?.daily_units?.temperature_2m_max}
                </p>
                <div className="weekly-condition">
                  {weatherCodeMap?.[weather.daily.weathercode[index]] ||
                    'Condition not known'}
                  <span className="weekly-icon">
                    {WeatherCodeIcons?.[weather.daily.weathercode[index]]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Weather;
