"use client";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Polygon,
  Circle,
} from "@react-google-maps/api";
import { useState } from "react";
import { GuardianPositionData, GuardianTelemetryData } from "@/lib/api_utils";

interface HomeMapProps {
  zoneData: GuardianPositionData[];  // Array of GuardianPositionData
  telemetryData: GuardianTelemetryData[];  // Array of GuardianTelemetryData
  zoom: number;
}

export default function HomeMap({ zoneData, telemetryData, zoom }: HomeMapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["drawing", "maps", "places"],
  });

  const [selectedTelemetry, setSelectedTelemetry] = useState<GuardianTelemetryData | null>(null);

  if (loadError) {
    return <div>Error al cargar el mapa</div>;
  }

  if (!isLoaded) {
    return <div>Cargando mapa...</div>;
  }

  const mapContainerStyle = {
    width: "1350px",
    height: "600px",
  };

  const mapOptions = {
    mapTypeId: "satellite",
  };

  // Helper function to find the most recent telemetry data for a given sender
  const findLatestTelemetryBySender = (sender: string) => {
    const filteredTelemetry = telemetryData
      .filter((data) => data.sender === sender)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return filteredTelemetry.length > 0 ? filteredTelemetry[0] : null;
  };

  // Handle marker click and select the most recent telemetry data
  const handleMarkerClick = (guardianSender: string) => {
    const latestTelemetry = findLatestTelemetryBySender(guardianSender);
    setSelectedTelemetry(latestTelemetry);
  };

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{
          lat: zoneData[0].latitude_i,
          lng: zoneData[0].longitude_i,
        }}
        zoom={zoom}
        options={mapOptions}
      >
        {zoneData.map((guardian) => (
          <div key={guardian.id}>
            <Polygon
              paths={guardian.guardian_zone.coordinates}
              options={{
                fillColor: "#2196F3",
                fillOpacity: 0.1,
                strokeColor: "#1E88E5",
                strokeOpacity: 0.8,
                strokeWeight: 2,
              }}
            />
            <Marker
              position={{
                lat: guardian.latitude_i,
                lng: guardian.longitude_i,
              }}
              icon={{
                url: "/assets/map.svg",
                scaledSize: new google.maps.Size(30, 40),
              }}
              onClick={() => handleMarkerClick(guardian.sender)}  // Handle marker click based on sender
            />
            <Circle
              center={{
                lat: guardian.latitude_i,
                lng: guardian.longitude_i,
              }}
              radius={100}
              options={{
                fillColor: "#FF0000",
                fillOpacity: 0.2,
                strokeColor: "#FF0000",
                strokeOpacity: 0.5,
                strokeWeight: 1,
              }}
            />
          </div>
        ))}
      </GoogleMap>

      {selectedTelemetry && (
        <div className="mt-4">
          <h3>Datos de Telemetría del Guardian</h3>
          <p><strong>Temperatura:</strong> {selectedTelemetry.temperature}°C</p>
          <p><strong>Humedad Relativa:</strong> {selectedTelemetry.relative_humidity}%</p>
          <p><strong>Presión Barométrica:</strong> {selectedTelemetry.barometric_pressure} hPa</p>
          <p><strong>Timestamp:</strong> {selectedTelemetry.timestamp}</p>
        </div>
      )}
    </div>
  );
}