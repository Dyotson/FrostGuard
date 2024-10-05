"use client";

import AlertCard from "@/components/AlertCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AlertsPage() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Alertas Activas</CardTitle>
      </CardHeader>
      <CardContent>
        <AlertCard
          hours={5}
          day="Lunes, 10 de Julio"
          startTime="22:00"
          endTime="06:00"
          duration="8 horas"
          recommendation="Activar sistema de aspersión a las 21:30"
        />
        <AlertCard
          hours={12}
          day="Martes, 11 de Julio"
          startTime="20:00"
          endTime="08:00"
          duration="12 horas"
          recommendation="Preparar calefactores y cubiertas"
        />
      </CardContent>
    </Card>
  );
}
