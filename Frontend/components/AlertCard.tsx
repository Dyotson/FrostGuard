"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertCardProps {
  day: string;
  startTime: string;
  endTime: string;
  duration: string;
  recommendation: string;
  active: boolean;
}

export default function AlertCard({
  day,
  startTime,
  endTime,
  duration,
  recommendation,
  active,
}: AlertCardProps) {
  return (
    <Card
      className={cn(
        "shadow-md rounded-lg",
        active
          ? "border-l-4 border-l-[#ff966a] bg-[#fff3e0]"
          : "border-l-4 border-l-blue-400 bg-blue-50"
      )}
    >
      <CardContent className="p-4 space-y-4">
        <div
          className={cn(
            "p-3 rounded-lg",
            active ? "bg-[#ffebb8]" : "bg-blue-100"
          )}
        >
          <h3 className="text-base font-semibold flex items-center text-gray-800">
            <AlertCircle className="w-4 h-4 mr-2" />
            Recomendación
          </h3>
          <p className="text-sm text-gray-700">{recommendation}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-white shadow-sm rounded-md">
            <CardContent className="p-3">
              <div className="flex items-center space-x-2 text-gray-700">
                <Calendar className="w-4 h-4" />
                <span className="font-semibold text-sm">Inicio:</span>
              </div>
              <p className="mt-1 text-sm">{day}</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm rounded-md">
            <CardContent className="p-3">
              <div className="flex items-center space-x-2 text-gray-700">
                <Calendar className="w-4 h-4" />
                <span className="font-semibold text-sm">Término:</span>
              </div>
              <p className="mt-1 text-sm">{endTime}</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center text-gray-600 bg-white p-2 rounded-md">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-lg font-medium font-semibold">
            Duración: {duration}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
