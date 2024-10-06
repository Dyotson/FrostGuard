"use client";

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

export default function GeneralPage() {
  const [selectedZone, setSelectedZone] = useState<string>("Zona 1");
  const [zoneData, setZoneData] = useState<GuardianPositionData | null>(null);
  const [climateData, setClimateData] = useState<GuardianTelemetryData | null>(
    null
  );

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

  const mapCenter = zoneData
    ? {
        lat: zoneData.latitude_i,
        lng: zoneData.longitude_i,
      }
    : { lat: 0, lng: 0 };

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
            climateData ? `${roundValue(climateData.temperature)}°C` : "N/A"
          }
          icon={<ThermometerSnowflake className="h-4 w-4 text-blue-500" />}
        />
        <StatCard
          title="Humedad Relativa"
          value={
            climateData
              ? `${roundValue(climateData.relative_humidity)}%`
              : "N/A"
          }
          icon={<Droplets className="h-4 w-4 text-blue-300" />}
        />
        <StatCard
          title="Presión Barométrica"
          value={
            climateData
              ? `${roundValue(climateData.barometric_pressure)} hPa`
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
              center={mapCenter}
              zoom={15}
              markerPosition={{
                lat: zoneData.latitude_i,
                lng: zoneData.longitude_i,
              }}
              polygonCoordinates={zoneData.guardian_zone.coordinates}
            />
          ) : (
            <p>No hay datos disponibles para esta zona</p>
          )}
        </CardContent>
      </Card>
    </>
  );
}
