"use client";

import { Card, CardContent } from "@/components/ui/card";

interface AlertCardProps {
  hours: number;
  day: string;
  startTime: string;
  endTime: string;
  duration: string;
  recommendation: string;
}

export default function AlertCard({
  hours,
  day,
  startTime,
  endTime,
  duration,
  recommendation,
}: AlertCardProps) {
  return (
    <Card className="mb-4 shadow-md">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-red-500">
            Quedan {hours} horas para una helada
          </span>
          <span>{day}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>Inicio: {startTime}</div>
          <div>Término: {endTime}</div>
          <div>Duración: {duration}</div>
        </div>
        <div className="mt-2 text-sm font-medium">
          Recomendación: {recommendation}
        </div>
      </CardContent>
    </Card>
  );
}
