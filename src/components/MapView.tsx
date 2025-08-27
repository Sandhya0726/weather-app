export function Map({ lat, lng }: { lat: number; lng: number }) {
  const mapUrl = `https://www.google.com/maps?q=${lat},${lng}&hl=es;z=14&output=embed`;
  return (
    <iframe
      className="rounded-md"
      src={mapUrl}
      width="400"
      height="300"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
    ></iframe>
  );
}
