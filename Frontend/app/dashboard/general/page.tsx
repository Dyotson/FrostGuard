"use client";

import { useState } from "react";
import StatCard from "@/components/StatCard";
import MapComponent from "@/components/MapComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Settings,
  ThermometerSnowflake,
  Droplets,
  Wind,
  AlertTriangle,
} from "lucide-react";

const zones = {
  "Zona 1": {
    center: { lat: 10.0, lng: -84.0 },
    markers: [
      { lat: 10.1, lng: -84.1, label: "A" },
      { lat: 9.9, lng: -83.9, label: "B" },
    ],
  },
  "Zona 2": {
    center: { lat: 11.0, lng: -85.0 },
    markers: [
      { lat: 11.1, lng: -85.1, label: "C" },
      { lat: 10.9, lng: -84.9, label: "D" },
    ],
  },
  "Zona 3": {
    center: { lat: 12.0, lng: -86.0 },
    markers: [
      { lat: 12.1, lng: -86.1, label: "E" },
      { lat: 11.9, lng: -85.9, label: "F" },
    ],
  },
};

export default function GeneralPage() {
  const [selectedZone, setSelectedZone] = useState("Zona 1");
//   const currentZone = zones[selectedZone];

  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <Select value={selectedZone} onValueChange={setSelectedZone}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar zona" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(zones).map((zone) => (
              <SelectItem key={zone} value={zone}>
                {zone}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
        <StatCard
          title="Temperatura Promedio"
          value="-2°C"
          icon={<ThermometerSnowflake className="h-4 w-4 text-blue-500" />}
        />
        <StatCard
          title="Humedad Promedio"
          value="65%"
          icon={<Droplets className="h-4 w-4 text-blue-300" />}
        />
        <StatCard
          title="Velocidad del Viento"
          value="10 km/h"
          icon={<Wind className="h-4 w-4 text-gray-500" />}
        />
        <StatCard
          title="Alertas Activas"
          value="3"
          icon={<AlertTriangle className="h-4 w-4 text-red-500" />}
        />
      </div>

      <Card className="mb-4 shadow-md">
        <CardHeader>
          <CardTitle>Mapa del Terreno</CardTitle>
        </CardHeader>
        {/* <CardContent className="h-[400px]">
          <MapComponent
            center={currentZone.center}
            zoom={12}
            markers={currentZone.markers}
          />
        </CardContent> */}
      </Card>
    </>
  );
}
