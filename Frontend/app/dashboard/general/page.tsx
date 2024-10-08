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
  fetchAllTelemetryData,
} from "@/lib/api_utils";
import { GuardianPositionData, GuardianTelemetryData } from "@/lib/interfaces";

export default function GeneralPage() {
  const [selectedZone, setSelectedZone] = useState<string>("Zona 1");
  const [zoneData, setZoneData] = useState<GuardianPositionData[]>([]);
  const [telemetryData, setTelemetryData] = useState<GuardianTelemetryData[]>(
    []
  );
  const [climateData, setClimateData] = useState<GuardianTelemetryData | null>(
    null
  );

  useEffect(() => {
    const fetchZoneData = async () => {
      const response = await fetchGuardianPositionDataByZone(selectedZone);
      if (response.length > 0) {
        setZoneData(response);
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

  useEffect(() => {
    const fetchTelemetryData = async () => {
      const response = await fetchAllTelemetryData();
      setTelemetryData(response);
    };

    fetchTelemetryData();
  }, []);

  const roundValue = (value: number) => Math.round(value * 100) / 100;

  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <Select value={selectedZone} onValueChange={setSelectedZone}>
          <SelectTrigger className="w-[180px] transition duration-200 ease-in-out hover:shadow-md">
            <SelectValue placeholder="Select Zone" />
          </SelectTrigger>
          <SelectContent>
            {["Zone 1", "Zone 2", "Zone 3"].map((zone) => (
              <SelectItem key={zone} value={zone}>
                {zone}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
        <StatCard
          title="Lowest Recent Temperature"
          value={
            climateData ? `${roundValue(climateData.temperature)}°C` : "N/A"
          }
          icon={<ThermometerSnowflake className="h-4 w-4 text-blue-500" />}
        />
        <StatCard
          title="Relative Humidity"
          value={
            climateData
              ? `${roundValue(climateData.relative_humidity)}%`
              : "N/A"
          }
          icon={<Droplets className="h-4 w-4 text-blue-300" />}
        />
        <StatCard
          title="Barometric Pressure"
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
          <CardTitle>Map of the Terrain</CardTitle>
        </CardHeader>
        <CardContent>
          {zoneData.length > 0 ? (
            <div className="w-full h-[500px] sm:h-[600px]">
              <HomeMap
                zoneData={zoneData}
                telemetryData={telemetryData}
                zoom={15}
              />
            </div>
          ) : (
            <p>No data available for this area</p>
          )}
        </CardContent>
      </Card>
    </>
  );
}
