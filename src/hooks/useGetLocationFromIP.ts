import { useEffect, useState } from 'react';
import type { GeoData } from '../types/WeatherDataTypes';

export function useGetLocationFromIP() {
  const [ipGeo, setIpGeo] = useState<GeoData | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        setIpGeo({
          latitude: data.latitude,
          longitude: data.longitude,
          city: data.city,
          country: data.country_name,
        });
      } catch (error) {
        console.error('IP location failed:', error);
        setIpGeo(null);
      }
    };
    fetchLocation();
  }, []);

  return ipGeo;
}
