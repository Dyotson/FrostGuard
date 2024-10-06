"use client";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Polygon,
  Circle,
  InfoWindow,
} from "@react-google-maps/api";
import { useState } from "react";
import { GuardianPositionData, GuardianTelemetryData } from "@/lib/interfaces";

interface HomeMapProps {
  zoneData: GuardianPositionData[];
  telemetryData: GuardianTelemetryData[];
  zoom: number;
}

export default function HomeMap({
  zoneData,
  telemetryData,
  zoom,
}: HomeMapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["drawing", "maps", "places"],
  });

  const [selectedTelemetry, setSelectedTelemetry] =
    useState<GuardianTelemetryData | null>(null);
  const [activeMarkerPosition, setActiveMarkerPosition] =
    useState<google.maps.LatLngLiteral | null>(null);

  if (loadError) {
    return <div>Error loading map
    </div>;
  }

  if (!isLoaded) {
    return <div>Loading map...
    </div>;
  }

  // Ordenamos las coordenadas del polígono
  const sortCoordinatesClockwise = (
    coordinates: { lat: number; lng: number }[]
  ) => {
    const centroid = coordinates.reduce(
      (acc, point) => ({
        lat: acc.lat + point.lat / coordinates.length,
        lng: acc.lng + point.lng / coordinates.length,
      }),
      { lat: 0, lng: 0 }
    );

    return coordinates.sort((a, b) => {
      const angleA = Math.atan2(a.lat - centroid.lat, a.lng - centroid.lng);
      const angleB = Math.atan2(b.lat - centroid.lat, b.lng - centroid.lng);
      return angleA - angleB;
    });
  };

  // Encuentra los datos de telemetría más recientes de un sender
  const findLatestTelemetryBySender = (sender: string) => {
    const filteredTelemetry = telemetryData
      .filter((data) => data.sender === sender)
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

    return filteredTelemetry.length > 0 ? filteredTelemetry[0] : null;
  };

  // Maneja el clic en el marcador y selecciona la telemetría más reciente
  const handleMarkerClick = (guardian: GuardianPositionData) => {
    const latestTelemetry = findLatestTelemetryBySender(guardian.sender);
    setSelectedTelemetry(latestTelemetry);
    setActiveMarkerPosition({
      lat: guardian.latitude_i,
      lng: guardian.longitude_i,
    });
  };

  return (
    <div className="w-full h-full">
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={{
          lat: zoneData[0].latitude_i,
          lng: zoneData[0].longitude_i,
        }}
        zoom={zoom}
        options={{ mapTypeId: "satellite" }}
      >
        {zoneData.map((guardian) => (
          <div key={guardian.id}>
            <Polygon
              paths={sortCoordinatesClockwise(
                guardian.guardian_zone.coordinates
              )}
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
              onClick={() => handleMarkerClick(guardian)}
            />
            <Circle
              center={{
                lat: guardian.latitude_i,
                lng: guardian.longitude_i,
              }}
              radius={100}
              options={{
                fillColor: "#FF0000",
                fillOpacity: 0.1,
                strokeColor: "#FF0000",
                strokeOpacity: 0.3,
                strokeWeight: 1,
              }}
            />
          </div>
        ))}

        {activeMarkerPosition && selectedTelemetry && (
          <InfoWindow
            position={activeMarkerPosition}
            onCloseClick={() => setActiveMarkerPosition(null)}
          >
            <div className="p-2 bg-white rounded shadow-md text-gray-800">
              <h3 className="text-base font-semibold text-blue-600 mb-2">
                Guardian Telemetry Data
              </h3>
              <p className="mb-1">
                <span className="font-semibold">Temperature:</span>{" "}
                {selectedTelemetry.temperature}°C
              </p>
              <p className="mb-1">
                <span className="font-semibold">Relative Humidity:
                </span>{" "}
                {selectedTelemetry.relative_humidity}%
              </p>
              <p className="mb-1">
                <span className="font-semibold">Barometric Pressure:
                </span>{" "}
                {selectedTelemetry.barometric_pressure} hPa
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Timestamp:</span>{" "}
                {new Date(selectedTelemetry.timestamp).toLocaleString()}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
