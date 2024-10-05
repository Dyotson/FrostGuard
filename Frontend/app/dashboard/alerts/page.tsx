"use client";

import { useEffect, useState } from "react";
import AlertCard from "@/components/AlertCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAlertsData } from "@/lib/api_utils";

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

  useEffect(() => {

    const fetchData = async () => {
      try {
        const data = await fetchAlertsData();
        setAlerts(data);
      } catch (error) {
        setError("Error al cargar las alertas.");
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


  const calculateDuration = (start: string, end: string): number => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const durationHours = Math.abs(endTime - startTime) / 36e5;
    return durationHours;
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {/* Alertas Activas */}
      <Card className="shadow-md mb-6">
        <CardHeader>
          <CardTitle>Alertas Activas</CardTitle>
        </CardHeader>
        <CardContent>
          {activeAlerts.length > 0 ? (
            activeAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                hours={calculateDuration(
                  alert.start_datetime,
                  alert.end_datetime
                )}
                day={formatDateTime(alert.start_datetime)}
                startTime={new Date(alert.start_datetime).toLocaleTimeString(
                  "es-ES"
                )}
                endTime={new Date(alert.end_datetime).toLocaleTimeString(
                  "es-ES"
                )}
                duration={`${calculateDuration(
                  alert.start_datetime,
                  alert.end_datetime
                )} horas`}
                recommendation={alert.message_recommendation}
              />
            ))
          ) : (
            <p>No hay alertas activas.</p>
          )}
        </CardContent>
      </Card>

      {/* Alertas Históricas */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Alertas Históricas</CardTitle>
        </CardHeader>
        <CardContent>
          {historicalAlerts.length > 0 ? (
            historicalAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                hours={calculateDuration(
                  alert.start_datetime,
                  alert.end_datetime
                )}
                day={formatDateTime(alert.start_datetime)}
                startTime={new Date(alert.start_datetime).toLocaleTimeString(
                  "es-ES"
                )}
                endTime={new Date(alert.end_datetime).toLocaleTimeString(
                  "es-ES"
                )}
                duration={`${calculateDuration(
                  alert.start_datetime,
                  alert.end_datetime
                )} horas`}
                recommendation={alert.message_recommendation}
              />
            ))
          ) : (
            <p>No hay alertas históricas.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
