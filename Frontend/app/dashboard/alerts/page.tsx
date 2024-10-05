"use client";

import { useEffect, useState } from "react";
import AlertCard from "@/components/AlertCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAlertsData } from "@/lib/api_utils"; // Replace with your actual API call if different

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Fetch the alerts data
    const fetchData = async () => {
      const data = await fetchAlertsData(); // Replace with your actual API fetch
      setAlerts(data);
    };

    fetchData();
  }, []);

  // Filter alerts into active and historical categories
  const activeAlerts = alerts.filter(alert => alert.active);
  const historicalAlerts = alerts.filter(alert => !alert.active);

  // Helper function to format date and time
  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
                hours={Math.abs(new Date(alert.end_datetime) - new Date(alert.start_datetime)) / 36e5}
                day={formatDateTime(alert.start_datetime)}
                startTime={new Date(alert.start_datetime).toLocaleTimeString("es-ES")}
                endTime={new Date(alert.end_datetime).toLocaleTimeString("es-ES")}
                duration={`${Math.abs(new Date(alert.end_datetime) - new Date(alert.start_datetime)) / 36e5} horas`}
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
                hours={Math.abs(new Date(alert.end_datetime) - new Date(alert.start_datetime)) / 36e5}
                day={formatDateTime(alert.start_datetime)}
                startTime={new Date(alert.start_datetime).toLocaleTimeString("es-ES")}
                endTime={new Date(alert.end_datetime).toLocaleTimeString("es-ES")}
                duration={`${Math.abs(new Date(alert.end_datetime) - new Date(alert.start_datetime)) / 36e5} horas`}
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