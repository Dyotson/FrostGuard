"use client";

import { GoogleMap, DrawingManager, Polygon } from "@react-google-maps/api";

interface MarkerData {
  lat: number;
  lng: number;
}

interface ZoneConfiguration {
  id: string;
  name: string;
  hasSprinklers: boolean;
  hasRoof: boolean;
  hasHeaters: boolean;
  hasFans: boolean;
  cropType: string;
  description: string;
  coordinates: { lat: number; lng: number }[];
}

interface ConfigurationMapProps {
  center: { lat: number; lng: number };
  zones: ZoneConfiguration[];
  activeZone: ZoneConfiguration | null;
  drawingMode: google.maps.drawing.OverlayType | null;
  onPolygonComplete: (polygon: google.maps.Polygon) => void;
}

export default function ConfigurationMap({
  center,
  zones,
  activeZone,
  drawingMode,
  onPolygonComplete,
}: ConfigurationMapProps) {
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={12}
      options={{
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
      }}
    >
      {zones.map((zone) => (
        <Polygon
          key={zone.id}
          paths={zone.coordinates}
          options={{
            fillColor: zone.id === activeZone?.id ? "#2196F3" : "#90CAF9",
            fillOpacity: 0.4,
            strokeColor: "#1E88E5",
            strokeOpacity: 1,
            strokeWeight: 2,
            clickable: false,
            draggable: false,
            editable: zone.id === activeZone?.id,
            geodesic: false,
            zIndex: 1,
          }}
        />
      ))}

      {drawingMode && (
        <DrawingManager
          onPolygonComplete={onPolygonComplete}
          drawingMode={drawingMode}
          options={{
            drawingControl: true,
            drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [google.maps.drawing.OverlayType.POLYGON],
            },
            polygonOptions: {
              fillColor: "#2196F3",
              fillOpacity: 0.4,
              strokeColor: "#1E88E5",
              strokeOpacity: 1,
              strokeWeight: 2,
              clickable: false,
              editable: true,
              draggable: true,
            },
          }}
        />
      )}
    </GoogleMap>
  );
}
