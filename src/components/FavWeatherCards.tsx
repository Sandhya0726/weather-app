import Lottie from 'lottie-react';
import { WeatherCodeIcons, weatherCodeMap } from '../constants/WeatherCode';
import { useWeather } from '../hooks/useWeather';
import { XIcon } from 'lucide-react';
import useFavouritesStore from './store/AddToFavStore';
import CardSkeleton from './CardSkeleton';
import type { FavWeatherCardProps } from '../types/FavWeatherCardProps';

const FavWeatherCards = ({ city, lat, lon }: FavWeatherCardProps) => {
  const { weather, loading } = useWeather(lat, lon);
  const { removeFavourite } = useFavouritesStore();

  if (loading) return <CardSkeleton />;

  if (!weather) return <p>No data for {city}</p>;

  const handleRemoveFav = () => {
    if (lat !== undefined && lon !== undefined) {
      removeFavourite(lat, lon);
    }
  };

  return (
    <div className="relative h-fit md:h-[60vh] w-full md:w-[200px] bg-gray-50 p-4 rounded-md flex flex-col gap-2 shadow-lg">
      <p className="text-lg font-poppins font-semibold !text-gray-700">
        {city}
      </p>
      <p className="text-md font-poppins font-semibold !text-blue-500">
        {weather.current_weather?.temperature}
        {weather.current_weather_units?.temperature}
      </p>
      <p className="text-md font-poppins font-semibold !text-orange-600">
        Humidity: {weather.hourly?.relative_humidity_2m?.[0]}%
      </p>
      <div className="flex flex-col gap-2 font-poppins font-semibold">
        {weatherCodeMap?.[weather.current_weather.weathercode]}
        <span className="text-[36px]">
          {WeatherCodeIcons[weather.current_weather.weathercode] && (
            <Lottie
              animationData={
                WeatherCodeIcons[weather.current_weather.weathercode]
              }
              loop
              style={{ width: 100, height: 100 }}
            />
          )}
        </span>
      </div>
      <button
        onClick={handleRemoveFav}
        className="absolute right-2 top-2 cursor-pointer font-poppins"
        title="Remove from favourites"
      >
        <XIcon size={24} />
      </button>
    </div>
  );
};

export default FavWeatherCards;
