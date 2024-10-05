"use client";

import {
  GoogleMap,
  Marker,
  Polygon,
  DrawingManager,
} from "@react-google-maps/api";
import { ReactNode } from "react";

interface MarkerData {
  lat: number;
  lng: number;
  label?: string;
}

interface MapComponentProps {
  center: { lat: number; lng: number };
  zoom: number;
  markers: MarkerData[];
  children?: ReactNode;
}

export default function MapComponent({
  center,
  zoom,
  markers,
  children,
}: MapComponentProps) {
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
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={{ lat: marker.lat, lng: marker.lng }}
          label={marker.label}
        />
      ))}
      {children}
    </GoogleMap>
  );
}
