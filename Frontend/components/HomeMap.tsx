"use client";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Polygon,
} from "@react-google-maps/api";
import { ReactNode } from "react";

interface MarkerData {
  lat: number;
  lng: number;
  label?: string;
}

interface HomeMapProps {
  center: { lat: number; lng: number };
  zoom: number;
  markers: MarkerData[];
  polygonCoordinates: { lat: number; lng: number }[]; // Añadimos las coordenadas del polígono
  children?: ReactNode;
}

export default function HomeMap({
  center,
  zoom,
  markers,
  polygonCoordinates,
  children,
}: HomeMapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", libraries: ["drawing", "maps", "visualization"],
  });

  if (loadError) {
    return <div>Error al cargar el mapa</div>;
  }

  if (!isLoaded) {
    return <div>Cargando mapa...</div>;
  }

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={zoom}
    >
      <Polygon
        paths={polygonCoordinates}
        options={{
          fillColor: "#2196F3",
          fillOpacity: 0.4,
          strokeColor: "#1E88E5",
          strokeOpacity: 1,
          strokeWeight: 2,
        }}
      />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={{ lat: marker.lat, lng: marker.lng }}
          icon={{
            url: "/assets/map.svg",
            scaledSize: new google.maps.Size(30, 35),
          }}
          label={marker.label}
        />
      ))}
      {children}
    </GoogleMap>
  );
}
