import { useState } from 'react';
import type { GeoData } from '../types/WeatherDataTypes';

export function useGeoSearch() {
  const [geoData, setGeoData] = useState<GeoData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const fetchByCountry = async (cityName: string) => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`
      );
      const data = await res.json();

      if (data.results?.length > 0) {
        setGeoData(data.results[0]);
      } else {
        setError('No results found');
      }
    } catch (err) {
      setError('Failed to fetch geodata');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { geoData, loading, error, fetchByCountry };
}
