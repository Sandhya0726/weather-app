import { lazy, Suspense, useState } from 'react';
import {
  WeatherBackgrounds,
  WeatherCodeIcons,
  weatherCodeMap,
} from '../constants/WeatherCode';
import type { GeoData } from '../types/WeatherDataTypes';

import { Map } from './MapView';

import { useDebouncedInput } from '../hooks/useDebouncedInput';
import { useGeoSearch } from '../hooks/useGeoSearch';
import { useGeoLocation } from '../hooks/useGeoLocation';
import { useWeather } from '../hooks/useWeather';
import { useGetLocationFromIP } from '../hooks/useGetLocationFromIP';
import Loader from './Loader';
import AddToFavourite from './AddToFavourite';
import useFavouritesStore from './store/AddToFavStore';
import { Link } from 'react-router-dom';

const Navbar = lazy(() => import('./Navbar'));
const WeatherCards = lazy(() => import('./WeatherCards'));
const AnimateIcon = lazy(() => import('./AnimateIcon'));

const Weather = () => {
  const [cityName, setCityName] = useState('');
  const { favourites } = useFavouritesStore();

  const debouncedCity = useDebouncedInput({ value: cityName, delay: 1000 });
  const geoFromBrowser = useGeoLocation();
  const geoFromIP = useGetLocationFromIP();

  const { geoData, loading: geoLoading, fetchByCountry } = useGeoSearch();
  const activeGeo: GeoData | null =
    geoData ?? geoFromBrowser ?? geoFromIP ?? null;

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
      className={`flex flex-col relative items-center justify-start min-h-screen w-full transition-colors duration-700 z-10 ${
        weather?.current_weather?.weathercode !== undefined
          ? WeatherBackgrounds[weather.current_weather.weathercode] ||
            'bg-blue-50'
          : 'bg-blue-50'
      }`}
    >
      <Suspense fallback={<Loader />}>
        <Navbar
          cityName={cityName}
          onChange={(e) => setCityName(e.target.value)}
          handleClick={handleClick}
          loading={geoLoading}
        />
      </Suspense>
      {!weatherLoading && weather?.current_weather?.weathercode && (
        <div className="absolute inset-0 right-0 top-0 -z-10 opacity-5">
          <Suspense fallback={<Loader />}>
            <AnimateIcon
              animate={WeatherCodeIcons[weather.current_weather.weathercode]}
              styles={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Suspense>
        </div>
      )}
      <AddToFavourite
        lat={activeGeo?.latitude}
        lon={activeGeo?.longitude}
        name={activeGeo?.city ?? activeGeo?.name}
      />
      {favourites.length > 0 && (
        <Link
          to={'/favourite-weather'}
          className="underline w-full font-poppins font-regular text-end pr-4"
        >
          See your favourites
        </Link>
      )}

      {!weatherLoading && activeGeo && weather && (
        <>
          <div className="w-full p-1 h-auto flex flex-col md:flex-row gap-4 items-start justify-around">
            <div className="w-fit h-auto rounded-md flex flex-col-reverse md:flex-row items-center justify-between gap-4">
              <div className="text-start pl-4">
                <h3 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800">
                  Current Weather of
                  {(activeGeo?.name ?? activeGeo.city) &&
                    ` ${activeGeo?.name ?? activeGeo.city}, ${
                      activeGeo.country
                    }`}
                </h3>

                <p className="text-4xl font-poppins font-semibold !text-blue-800">
                  {weather?.current_weather?.temperature}
                  {weather?.current_weather_units?.temperature}
                </p>
                <p className="text-lg !text-gray-800 font-poppins font-bold">
                  {weatherCodeMap?.[weather.current_weather.weathercode]}
                </p>
                <p className="text-lg !text-gray-600 font-poppins font-regular">
                  Windspeed: {weather?.current_weather?.windspeed}
                  {weather?.current_weather_units?.windspeed}
                </p>
                <p className="text-lg !text-gray-600 font-poppins font-regular">
                  Humidity: {weather?.hourly?.relative_humidity_2m[0]}%
                </p>
              </div>
              <div className="text-9xl">
                {WeatherCodeIcons[weather.current_weather.weathercode] && (
                  <Suspense fallback={<Loader />}>
                    <AnimateIcon
                      animate={
                        WeatherCodeIcons[weather.current_weather.weathercode]
                      }
                    />
                  </Suspense>
                )}
              </div>
            </div>

            <div className="w-[40%] h-[50vh] mt-8 lg:flex items-center justify-end hidden">
              <Map
                lat={activeGeo.latitude}
                lng={activeGeo.longitude}
                cityName={activeGeo?.city ?? activeGeo?.country}
              />
            </div>
          </div>

          <h3 className="text-black font-poppins font-bold my-8 sm:my-0 text-xl">
            Weekly Weather Forecast
          </h3>

          <Suspense fallback={<h3>Weekly Forecast Loading.... </h3>}>
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
          </Suspense>
        </>
      )}
    </div>
  );
};

export default Weather;
