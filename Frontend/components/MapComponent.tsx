"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface MarkerData {
  lat: number;
  lng: number;
  label?: string;
}

interface MapComponentProps {
  center: { lat: number; lng: number };
  zoom: number;
  markers: MarkerData[];
}

export default function MapComponent({
  center,
  zoom,
  markers,
}: MapComponentProps) {
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            label={marker.label}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
