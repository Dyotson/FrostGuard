"use client";

import TemperatureChart from "@/components/TemperatureChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activityData = [
  { name: "Lun", proyeccion: -2, historico: -1 },
  { name: "Mar", proyeccion: -1, historico: -2 },
  { name: "Mié", proyeccion: 0, historico: -1 },
  { name: "Jue", proyeccion: 1, historico: 0 },
  { name: "Vie", proyeccion: -1, historico: -2 },
  { name: "Sáb", proyeccion: -3, historico: -4 },
  { name: "Dom", proyeccion: -2, historico: -3 },
];

export default function ActivityPage() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Proyecciones según Temperaturas Históricas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <TemperatureChart data={activityData} />
        </div>
      </CardContent>
    </Card>
  );
}
