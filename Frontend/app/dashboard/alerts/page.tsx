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
        setError("Error loading alerts.");
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
    return date.toLocaleString("en-US", {
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
      return `${days} day${days > 1 ? "s" : ""} and ${remainingHours} hour${remainingHours !== 1 ? "s" : ""
        }`;
    } else {
      return `${remainingHours} hour${remainingHours !== 1 ? "s" : ""}`;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading alerts...</p>
      </div>
    );
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
    <div className="space-y-8 mx-auto">
      {/* Active Alerts */}
      <Card className="shadow-md rounded-md">
        <CardHeader className="flex flex-row items-center space-x-2 bg-[#ff966a] text-white rounded-t-md">
          <AlertTriangle className="w-6 h-6" />
          <CardTitle className="text-lg font-semibold">
            Active Alerts
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
                    "en-US"
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
              <p>No active alerts.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Historical Alerts */}
      <Card className="shadow-md rounded-md">
        <CardHeader className="flex flex-row items-center space-x-2 bg-gray-700 text-white rounded-t-md">
          <Clock className="w-6 h-6" />
          <CardTitle className="text-lg font-semibold">
            Historical Alerts
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
                    "en-US"
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
              <p>No historical alerts recorded.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}