"use client";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Polygon,
  Circle,
} from "@react-google-maps/api";
import { ReactNode } from "react";

interface HomeMapProps {
  center: { lat: number; lng: number };
  zoom: number;
  markerPosition: { lat: number; lng: number };
  polygonCoordinates: { lat: number; lng: number }[];
  children?: ReactNode;
}

export default function HomeMap({
  center,
  zoom,
  markerPosition,
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

  const mapOptions = {
    mapTypeId: "satellite",
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={zoom}
      options={mapOptions}
    >
      <Polygon
        paths={polygonCoordinates}
        options={{
          fillColor: "#2196F3",
          fillOpacity: 0.1,
          strokeColor: "#1E88E5",
          strokeOpacity: 0.8,
          strokeWeight: 2,
        }}
      />
      <Marker
        position={markerPosition}
        icon={{
          url: "/assets/map.svg",
          scaledSize: new google.maps.Size(30, 40),
        }}
      />
      <Circle
        center={markerPosition}
        radius={100}
        options={{
          fillColor: "#FF0000",
          fillOpacity: 0.2,
          strokeColor: "#FF0000",
          strokeOpacity: 0.5,
          strokeWeight: 1,
        }}
      />
      {children}
    </GoogleMap>
  );
}