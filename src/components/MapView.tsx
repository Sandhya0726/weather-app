import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

type MapProps = {
  lat: number;
  lng: number;
  cityName: string | undefined;
};

export function Map({ lat, lng, cityName }: MapProps) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      style={{ height: '50vh', width: '100%', borderRadius: '8px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={[lat, lng]}>
        <Popup>Hello,{cityName}</Popup>
      </Marker>
    </MapContainer>
  );
}
