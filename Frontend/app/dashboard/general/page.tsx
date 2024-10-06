"use client"

import { useJsApiLoader } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import StatCard from "@/components/StatCard";
import HomeMap from "@/components/HomeMap";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThermometerSnowflake, Droplets, Wind } from "lucide-react";
import {
  fetchLowestTemperatureData,
  fetchGuardianPositionDataByZone,
  GuardianPositionData,
  GuardianTelemetryData,
} from "@/lib/api_utils";
import { HeatmapLayer } from "@react-google-maps/api";

export default function GeneralPage() {
  const [selectedZone, setSelectedZone] = useState<string>("Zona 1");
  const [zoneData, setZoneData] = useState<GuardianPositionData | null>(null);
  const [climateData, setClimateData] = useState<GuardianTelemetryData[] | null>(
    null
  );

  // Load the Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", // Ensure you have the correct API key
    libraries: ["drawing", "maps", "visualization"],
  });

  useEffect(() => {
    const fetchZoneData = async () => {
      const response = await fetchGuardianPositionDataByZone(selectedZone);
      if (response.length > 0) {
        setZoneData(response[0]);
      }
    };

    fetchZoneData();
  }, [selectedZone]);

  useEffect(() => {
    const fetchClimateData = async () => {
      const response = await fetchLowestTemperatureData();
      setClimateData(response);
    };

    fetchClimateData();
  }, []);

  const roundValue = (value: number) => Math.round(value * 100) / 100;

  const calculateMapCenter = (coordinates: { lat: number; lng: number }[]) => {
    const totalCoords = coordinates.length;
    const latSum = coordinates.reduce((sum, coord) => sum + coord.lat, 0);
    const lngSum = coordinates.reduce((sum, coord) => sum + coord.lng, 0);
    return {
      lat: latSum / totalCoords,
      lng: lngSum / totalCoords,
    };
  };

  const createHeatmapData = () => {
    if (!isLoaded || !window.google) return []; // Ensure google object is available

    if (Array.isArray(climateData) && climateData.length > 0) {
      return climateData.map((data) => ({
        location: new google.maps.LatLng(data.latitude_i, data.longitude_i),
        weight: data.temperature,
      }));
    }

    // If no climate data, use zoneData to display yellow points
    return zoneData?.guardian_zone.coordinates.map((coord) => ({
      location: new google.maps.LatLng(coord.lat, coord.lng),
      weight: 1,
    })) || [];
  };

  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <Select value={selectedZone} onValueChange={setSelectedZone}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar zona" />
          </SelectTrigger>
          <SelectContent>
            {["Zona 1", "Zona 2", "Zona 3"].map((zone) => (
              <SelectItem key={zone} value={zone}>
                {zone}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
        <StatCard
          title="Temperatura Más Baja Reciente"
          value={
            climateData && climateData.length > 0
              ? `${roundValue(climateData[0].temperature)}°C`
              : "N/A"
          }
          icon={<ThermometerSnowflake className="h-4 w-4 text-blue-500" />}
        />
        <StatCard
          title="Humedad Relativa"
          value={
            climateData && climateData.length > 0
              ? `${roundValue(climateData[0].relative_humidity)}%`
              : "N/A"
          }
          icon={<Droplets className="h-4 w-4 text-blue-300" />}
        />
        <StatCard
          title="Presión Barométrica"
          value={
            climateData && climateData.length > 0
              ? `${roundValue(climateData[0].barometric_pressure)} hPa`
              : "N/A"
          }
          icon={<Wind className="h-4 w-4 text-gray-500" />}
        />
      </div>

      <Card className="mb-4 shadow-md">
        <CardHeader>
          <CardTitle>Mapa del Terreno</CardTitle>
        </CardHeader>
        <CardContent className="h-[600px]">
          {zoneData ? (
            <HomeMap
              center={calculateMapCenter(zoneData.guardian_zone.coordinates)}
              zoom={15}
              markers={zoneData.guardian_zone.coordinates}
              polygonCoordinates={zoneData.guardian_zone.coordinates}
            />
          ) : (
            <p>No hay datos disponibles para esta zona</p>
          )}
        </CardContent>
      </Card>

      <Card className="mb-4 shadow-md">
        <CardHeader>
          <CardTitle>Mapa de Calor de Temperaturas</CardTitle>
        </CardHeader>
        <CardContent className="h-[600px]">
          {zoneData ? (
            <HomeMap
              center={calculateMapCenter(zoneData.guardian_zone.coordinates)}
              zoom={15}
              markers={zoneData.guardian_zone.coordinates}
              polygonCoordinates={zoneData.guardian_zone.coordinates}
            >
              {isLoaded && window.google ? (
                <HeatmapLayer
                  data={createHeatmapData()}
                  options={{
                    radius: 100,
                    opacity: 0.6,
                    gradient:
                      !climateData || climateData.length === 0
                        ? ["rgba(255, 255, 0, 1)"] // Yellow gradient when no climate data
                        : [
                          "rgba(0, 0, 255, 0)",
                          "rgba(0, 0, 255, 1)",
                          "rgba(0, 255, 255, 1)",
                          "rgba(0, 255, 0, 1)",
                          "rgba(255, 255, 0, 1)",
                          "rgba(255, 165, 0, 1)",
                          "rgba(255, 0, 0, 1)",
                        ],
                  }}
                />
              ) : (
                <p>Cargando mapa de calor...</p>
              )}
            </HomeMap>
          ) : (
            <p>No hay datos disponibles para esta zona</p>
          )}
        </CardContent>
      </Card>
    </>
  );
}