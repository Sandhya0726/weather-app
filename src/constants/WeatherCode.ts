import Sunny from '../animations/Sunny.json';
import MainlyClear from '../animations/MainlyClear.json';
import PartlyCloudy from '../animations/PartlyCloudy.json';
import RainShower from '../animations/RainShower.json';
import Rainy from '../animations/Rainy.json';
import Snowfall from '../animations/Snowfall.json';
import Thunderstorm from '../animations/Thunderstorm.json';
import Windy from '../animations/Windy.json';

export const weatherCodeMap: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snow fall',
  73: 'Moderate snow fall',
  75: 'Heavy snow fall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

export const WeatherCodeIcons: Record<number, object> = {
  0: Sunny,
  1: MainlyClear,
  2: PartlyCloudy,
  3: Windy,
  51: RainShower,
  53: Rainy,
  55: Rainy,
  56: Rainy,
  57: Snowfall,
  61: Rainy,
  63: Rainy,
  65: Rainy,
  66: Snowfall,
  67: Snowfall,
  71: Snowfall,
  73: Snowfall,
  75: Snowfall,
  77: Snowfall,
  80: RainShower,
  81: Rainy,
  82: Rainy,
  85: Snowfall,
  86: Snowfall,
  95: Thunderstorm,
  96: Thunderstorm,
  99: Thunderstorm,
};
