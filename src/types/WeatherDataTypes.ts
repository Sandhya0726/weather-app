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
};
