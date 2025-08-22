export type GeoData = {
  name?: string;
  country?: string;
  latitude: number;
  longitude: number;
};

export type WeatherData = {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
  current_weather_units: {
    temperature: string;
    windspeed: string;
  };
  hourly: {
    relative_humidity_2m: number[];
  };
  daily: {
    time: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  };
  daily_units: {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    weathercode: string;
  };
};
