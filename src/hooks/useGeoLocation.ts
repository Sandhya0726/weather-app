import { useEffect, useState } from 'react';
import type { GeoData } from '../types/WeatherDataTypes';

export function useGeoLocation() {
  const [geoData, setGeoData] = useState<GeoData>();
  const apiKey = import.meta.env.VITE_OPEN_CAGE_API;

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const res = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
          );
          const data = await res.json();

          if (data.results?.length > 0) {
            setGeoData({
              latitude,
              longitude,
              city:
                data.results[0].components.city_district ||
                data.results[0].components.county,
              country: data.results[0].components.country,
            });
          } else {
            setGeoData({ latitude, longitude, city: 'Unknown', country: '' });
          }
        } catch (err) {
          console.error('Reverse geocoding error:', err);
        }
      });
    }
  }, []);

  return geoData;
}
