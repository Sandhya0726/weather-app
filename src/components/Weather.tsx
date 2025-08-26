import { useEffect, useState } from 'react';
import {
  WeatherBackgrounds,
  WeatherCodeIcons,
  weatherCodeMap,
} from '../constants/WeatherCode';
import type { GeoData, WeatherData } from '../types/WeatherDataTypes';
import '../styles/Weather.css';
import { Search } from 'lucide-react';
import Lottie from 'lottie-react';

const Weather = () => {
  const [cityName, setCityName] = useState('');
  const [geoData, setGeoData] = useState<GeoData>();
  const [weather, setWeather] = useState<WeatherData>();
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const fetchByCountry = async (cityName: string) => {
    try {
      setButtonLoading(true);
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
    } finally {
      setButtonLoading(false);
    }
  };

  function Map({ lat, lng }: { lat: number; lng: number }) {
    const mapUrl = `https://www.google.com/maps?q=${lat},${lng}&hl=es;z=14&output=embed`;
    return (
      <iframe
        className="rounded-md"
        src={mapUrl}
        width="400"
        height="300"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      ></iframe>
    );
  }

  const fetchPlaceName = async (latitude: number, longitude: number) => {
    try {
      const res = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=7a7881070f68414c8ec5d9bab426a380`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setGeoData((prev) => ({
          latitude: prev?.latitude ?? 0,
          longitude: prev?.longitude ?? 0,
          name:
            data.results[0].components.city_district ||
            data.results[0].components.county,
          country: data.results[0].components.country,
        }));
      }
    } catch (err) {
      console.error('Reverse geocoding error:', err);
    }
  };

  const fetchByLatLon = async (latitutude: number, longitude: number) => {
    try {
      setLoading(true);
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitutude}&longitude=${longitude}&current_weather=true&hourly=relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
      );
      const weatherData = await weatherRes.json();
      setWeather(weatherData);
    } catch (err) {
      console.log(err, 'err');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setGeoData({ latitude, longitude });

        fetchPlaceName(latitude, longitude);
      });
    }
  }, []);

  useEffect(() => {
    if (geoData?.latitude && geoData?.longitude) {
      fetchByLatLon(geoData.latitude, geoData.longitude);
    }
  }, [geoData?.latitude, geoData?.longitude]);

  const handleClick = () => {
    if (!cityName) {
      alert('Please enter a city or country name');
    } else {
      fetchByCountry(cityName);
    }
  };

  return (
    <div
      className={`flex flex-col relative items-center justify-center h-auto w-full transition-colors duration-700 z-10 ${
        weather?.current_weather?.weathercode !== undefined
          ? WeatherBackgrounds[weather.current_weather.weathercode] ||
            'bg-blue-50'
          : 'bg-blue-50'
      }`}
    >
      <div className="w-full h-[10vh] bg-indigo-950 flex justify-between items-center px-4">
        <h2 className="text-white font-bold">Weather App</h2>
        <div className="w-fit flex justify-end rounded-md bg-white gap-2">
          <input
            className="bg-white px-2 py-2 rounded-md w-[150px] md:w-[400px] outline-none"
            type="search"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="Enter city or country name"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleClick();
              }
            }}
            disabled={buttonLoading}
          />
          <button
            onClick={handleClick}
            className="px-6 bg-gray-300 rounded-r-md text-gray-900 cursor-pointer hover:bg-gray-400 transition-all duration-300 ease-in-out"
          >
            {buttonLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-gray-700"></div>
            ) : (
              <Search />
            )}{' '}
          </button>
        </div>
      </div>

      {loading && weather?.current_weather?.weathercode !== undefined && (
        <div className="absolute inset-0 right-0 top-0 -z-1 opacity-5">
          <Lottie
            animationData={
              WeatherCodeIcons[weather.current_weather.weathercode]
            }
            loop
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}

      {!loading && (
        <>
          <div className="w-full p-1 h-auto flex flex-col md:flex-row gap-4 items-start justify-center">
            <div className="w-fit h-auto rounded-md flex flex-col-reverse md:flex-row items-center justify-between gap-4">
              {geoData && (
                <>
                  <div className="text-start">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                      Current Weather of
                      {geoData?.name
                        ? ` ${geoData.name}, ${geoData.country}`
                        : 'Your Location'}
                    </h3>
                    <p className="text-4xl font-semibold !text-blue-800">
                      {weather?.current_weather?.temperature}
                      {weather?.current_weather_units?.temperature}
                    </p>
                    <p className="text-lg !text-gray-800 font-bold">
                      {weather?.current_weather?.weathercode !== undefined &&
                        weatherCodeMap?.[weather.current_weather.weathercode]}
                    </p>
                    <p className="text-lg !text-gray-600 font-regular">
                      Windspeed: {weather?.current_weather?.windspeed}
                      {weather?.current_weather_units?.windspeed}
                    </p>
                    <p className="text-lg !text-gray-600 font-regular">
                      Humidity: {weather?.hourly?.relative_humidity_2m[0]}%
                    </p>
                  </div>
                  <div className="text-9xl">
                    {weather?.current_weather?.weathercode !== undefined && (
                      <Lottie
                        animationData={
                          WeatherCodeIcons[weather.current_weather.weathercode]
                        }
                        loop
                        style={{ width: '100%', height: 400 }}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="w-full md:w-[30%] h-[40vh] flex items-center justify-center">
              <Map lat={geoData?.latitude ?? 0} lng={geoData?.longitude ?? 0} />
            </div>
          </div>
          <h3 className="text-black font-bold text-xl">
            Weekly Weather Forecast
          </h3>
          <div className="w-full h-auto p-10 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7  gap-4">
            {weather?.daily?.time?.map((day, index) => {
              const weekdays = new Date(day).toLocaleString('en-US', {
                weekday: 'short',
              });

              return (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-md flex flex-col gap-2 shadow-lg"
                >
                  <p className="text-lg font-semibold !text-gray-500">
                    {weekdays} <br />
                    {day}
                  </p>
                  <p className="text-md font-semibold !text-blue-400">
                    Min: {weather?.daily?.temperature_2m_min[index]}
                    {weather?.daily_units?.temperature_2m_min}
                  </p>
                  <p className="text-md font-semibold !text-orange-600">
                    Max: {weather?.daily?.temperature_2m_max[index]}
                    {weather?.daily_units?.temperature_2m_max}
                  </p>
                  <div className="flex flex-col gap-2 font-semibold">
                    {weatherCodeMap?.[weather.daily.weathercode[index]] ||
                      'Condition not known'}
                    <span className="text-[36px]">
                      <Lottie
                        animationData={
                          WeatherCodeIcons[weather.daily.weathercode[index]]
                        }
                        loop
                        style={{ width: 150, height: 150 }}
                      />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          {weather?.current_weather?.weathercode !== undefined && (
            <div className="absolute inset-0 right-0 top-0 -z-1 opacity-5">
              <Lottie
                animationData={
                  WeatherCodeIcons[weather.current_weather.weathercode]
                }
                loop
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Weather;
