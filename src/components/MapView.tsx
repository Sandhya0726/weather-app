import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

type MapProps = {
  lat: number;
  lng: number;
  cityName: string | undefined;
};

export default function Map({ lat, lng, cityName }: MapProps) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={7}
      style={{ height: '50vh', width: '100%', borderRadius: '8px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      <TileLayer
        url={`https://tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png?appid=${
          import.meta.env.VITE_OPENWEATHER_API_KEY
        }`}
        attribution="&copy; <a href='https://openweathermap.org/'>OpenWeatherMap</a>"
      />

      <TileLayer
        url={`https://tile.openweathermap.org/map/temp/{z}/{x}/{y}.png?appid=${
          import.meta.env.VITE_OPENWEATHER_API_KEY
        }}`}
      />

      <TileLayer
        url={`https://tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png?appid=${
          import.meta.env.VITE_OPENWEATHER_API_KEY
        }`}
      />

      <Marker position={[lat, lng]}>
        <Popup>Hello, {cityName}</Popup>
      </Marker>
    </MapContainer>
  );
}
