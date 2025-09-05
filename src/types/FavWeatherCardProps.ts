export type FavWeatherCardProps = {
  city: string;
  lat: number;
  lon: number;
};

export type AddToFavProps = {
  lat: number | undefined;
  lon: number | undefined;
  name: string | undefined;
};
