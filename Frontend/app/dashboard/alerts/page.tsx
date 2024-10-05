"use client";

import { useEffect, useState } from "react";
import AlertCard from "@/components/AlertCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAlertsData } from "@/lib/api_utils";
import { AlertTriangle, Clock, Bell } from "lucide-react";

interface Alert {
  id: string;
  start_datetime: string;
  end_datetime: string;
  active: boolean;
  message_recommendation: string;
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAlertsData();
        setAlerts(data);
      } catch (error) {
        setError("Error al cargar las alertas.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const activeAlerts = alerts.filter((alert) => alert.active);
  const historicalAlerts = alerts.filter((alert) => !alert.active);

  const formatDateTime = (datetime: string) => {
    const date = new Date(datetime);
    return date.toLocaleString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateDuration = (start: string, end: string): string => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const durationHours = Math.abs(endTime - startTime) / 36e5;
    const days = Math.floor(durationHours / 24);
    const remainingHours = Math.round(durationHours % 24);

    if (days > 0) {
      return `${days} día${days > 1 ? "s" : ""} y ${remainingHours} hora${
        remainingHours !== 1 ? "s" : ""
      }`;
    } else {
      return `${remainingHours} hora${remainingHours !== 1 ? "s" : ""}`;
    }
  };

  // Esconder la página hasta que se carguen los datos
  if (loading) {
    return null; // No mostrar nada mientras se carga
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-4">
      {/* Alertas Activas */}
      <Card className="shadow-md rounded-md">
        <CardHeader className="flex flex-row items-center space-x-2 bg-[#ff966a] text-white rounded-t-md">
          <AlertTriangle className="w-6 h-6" />
          <CardTitle className="text-lg font-semibold">
            Alertas Activas
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {activeAlerts.length > 0 ? (
            <div className="space-y-4">
              {activeAlerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  day={formatDateTime(alert.start_datetime)}
                  startTime={new Date(alert.start_datetime).toLocaleTimeString(
                    "es-ES"
                  )}
                  endTime={formatDateTime(alert.end_datetime)}
                  duration={calculateDuration(
                    alert.start_datetime,
                    alert.end_datetime
                  )}
                  recommendation={alert.message_recommendation}
                  active={true}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center text-gray-500">
              <Bell className="w-5 h-5 mr-2" />
              <p>No hay alertas activas.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Alertas Históricas */}
      <Card className="shadow-md rounded-md">
        <CardHeader className="flex flex-row items-center space-x-2 bg-gray-700 text-white rounded-t-md">
          <Clock className="w-6 h-6" />
          <CardTitle className="text-lg font-semibold">
            Alertas Históricas
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {historicalAlerts.length > 0 ? (
            <div className="space-y-4">
              {historicalAlerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  day={formatDateTime(alert.start_datetime)}
                  startTime={new Date(alert.start_datetime).toLocaleTimeString(
                    "es-ES"
                  )}
                  endTime={formatDateTime(alert.end_datetime)}
                  duration={calculateDuration(
                    alert.start_datetime,
                    alert.end_datetime
                  )}
                  recommendation={alert.message_recommendation}
                  active={false}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center text-gray-500">
              <Bell className="w-5 h-5 mr-2" />
              <p>No hay alertas históricas registradas.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
