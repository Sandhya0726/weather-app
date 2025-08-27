import { useState } from 'react';
import {
  WeatherBackgrounds,
  WeatherCodeIcons,
  weatherCodeMap,
} from '../constants/WeatherCode';
import type { GeoData } from '../types/WeatherDataTypes';

import WeatherCards from './WeatherCards';
import AnimateIcon from './AnimateIcon';
import Navbar from './Navbar';
import { Map } from './MapView';

import { useDebouncedInput } from '../hooks/useDebouncedInput';
import { useGeoSearch } from '../hooks/useGeoSearch';
import { useGeoLocation } from '../hooks/useGeoLocation';
import { useWeather } from '../hooks/useWeather';

const Weather = () => {
  const [cityName, setCityName] = useState('');

  const debouncedCity = useDebouncedInput({ value: cityName, delay: 1000 });
  const geoFromBrowser = useGeoLocation();
  const { geoData, loading: geoLoading, fetchByCountry } = useGeoSearch();

  const activeGeo: GeoData | null = geoData ?? geoFromBrowser ?? null;

  const { weather, loading: weatherLoading } = useWeather(
    activeGeo?.latitude,
    activeGeo?.longitude
  );

  const handleClick = () => {
    if (debouncedCity) {
      fetchByCountry(debouncedCity);
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
      <Navbar
        cityName={cityName}
        onChange={(e) => setCityName(e.target.value)}
        handleClick={handleClick}
        loading={geoLoading}
      />

      {weatherLoading && weather?.current_weather?.weathercode && (
        <div className="absolute inset-0 right-0 top-0 -z-1 opacity-5">
          <AnimateIcon
            animate={WeatherCodeIcons[weather.current_weather.weathercode]}
            styles={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}

      {!weatherLoading && activeGeo && weather && (
        <>
          <div className="w-full p-1 h-auto flex flex-col md:flex-row gap-4 items-start justify-center">
            <div className="w-fit h-auto rounded-md flex flex-col-reverse md:flex-row items-center justify-between gap-4">
              <div className="text-start pl-4">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Current Weather of
                  {activeGeo?.name
                    ? ` ${activeGeo.name}, ${activeGeo.country}`
                    : 'Your Location'}
                </h3>
                <p className="text-4xl font-semibold !text-blue-800">
                  {weather?.current_weather?.temperature}
                  {weather?.current_weather_units?.temperature}
                </p>
                <p className="text-lg !text-gray-800 font-bold">
                  {weatherCodeMap?.[weather.current_weather.weathercode]}
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
                {WeatherCodeIcons[weather.current_weather.weathercode] && (
                  <AnimateIcon
                    animate={
                      WeatherCodeIcons[weather.current_weather.weathercode]
                    }
                  />
                )}
              </div>
            </div>

            <div className="w-full md:w-[30%] h-[auto] mt-8 flex items-center justify-center">
              <Map lat={activeGeo.latitude} lng={activeGeo.longitude} />
            </div>
          </div>

          <h3 className="text-black font-bold my-8 sm:my-0 text-xl">
            Weekly Weather Forecast
          </h3>
          <div className="w-full h-auto p-2 md:p-10 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4">
            {weather?.daily?.time?.map((day, index) => {
              const weekdays = new Date(day).toLocaleString('en-US', {
                weekday: 'short',
              });

              return (
                <WeatherCards
                  key={index}
                  weekdays={weekdays}
                  day={day}
                  Min={weather?.daily?.temperature_2m_min[index]}
                  MinUnit={weather?.daily_units?.temperature_2m_min}
                  Max={weather?.daily?.temperature_2m_max[index]}
                  MaxUnit={weather?.daily_units?.temperature_2m_max}
                  weatherCondition={
                    weatherCodeMap?.[weather.daily.weathercode[index]] ||
                    'Condition not known'
                  }
                  icon={WeatherCodeIcons?.[weather.daily.weathercode[index]]}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
