"use client";

import TemperatureChart from "@/components/TemperatureChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activityData = [
  { name: "Mon", proyeccion: -2, historico: -1 },
  { name: "Tue", proyeccion: -1, historico: -2 },
  { name: "Wed", proyeccion: 0, historico: -1 },
  { name: "Thu", proyeccion: 1, historico: 0 },
  { name: "Fri", proyeccion: -1, historico: -2 },
  { name: "Sat", proyeccion: -3, historico: -4 },
  { name: "Sun", proyeccion: -2, historico: -3 },
];

export default function ActivityPage() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Projections Based on Historical Temperatures</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <TemperatureChart data={activityData} />
        </div>
      </CardContent>
    </Card>
  );
}