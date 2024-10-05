"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  ThermometerSnowflake,
  Droplets,
  Wind,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import Logo from "@/components/common/Logo";
import StatisticCard from "@/components/ui/StatisticCard";
import Map from "@/components/ui/Map";

interface ChartData {
  name: string;
  temp: number;
}

interface BarChartData {
  name: string;
  value: number;
}

interface MarkerData {
  lat: number;
  lng: number;
  label?: string;
}

export default function AdminDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Datos de temperatura memorizados para optimizar el rendimiento
  const temperatureData: ChartData[] = useMemo(
    () => [
      { name: "Lun", temp: -2 },
      { name: "Mar", temp: -1 },
      { name: "Mié", temp: 0 },
      { name: "Jue", temp: 1 },
      { name: "Vie", temp: -1 },
      { name: "Sáb", temp: -3 },
      { name: "Dom", temp: -2 },
    ],
    []
  );

  // Datos de distribución de alertas memorizados
  const alertDistributionData: BarChartData[] = useMemo(
    () => [
      { name: "Helada", value: 45 },
      { name: "Nieve", value: 30 },
      { name: "Viento", value: 15 },
      { name: "Granizo", value: 10 },
    ],
    []
  );

  // Datos hardcodeados para el mapa
  const mapCenter: { lat: number; lng: number } = useMemo(
    () => ({ lat: 10.0, lng: -84.0 }), // Coordenadas de ejemplo
    []
  );

  const markers: MarkerData[] = useMemo(
    () => [
      { lat: 10.1, lng: -84.1, label: "A" },
      { lat: 9.9, lng: -83.9, label: "B" },
    ],
    []
  );

  return (
    <div className="flex-col md:flex min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-8 w-8" />
            <span className="text-lg font-semibold text-gray-800 dark:text-white">
              FrostGuard
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 space-y-4 p-8 pt-6">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid grid-cols-3 gap-4">
            <TabsTrigger value="overview">Vista General</TabsTrigger>
            <TabsTrigger value="analytics">Analíticas</TabsTrigger>
            <TabsTrigger value="reports">Reportes</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            {/* Statistics Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatisticCard
                title="Alertas Activas"
                value={12}
                description="+2 desde ayer"
                icon={
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                }
              />
              <StatisticCard
                title="Temperatura Promedio"
                value="-2°C"
                description="-5°C desde ayer"
                icon={
                  <ThermometerSnowflake className="h-4 w-4 text-muted-foreground" />
                }
              />
              <StatisticCard
                title="Humedad Promedio"
                value="68%"
                description="+5% desde ayer"
                icon={<Droplets className="h-4 w-4 text-muted-foreground" />}
              />
              <StatisticCard
                title="Velocidad del Viento"
                value="15 km/h"
                description="+2 km/h desde ayer"
                icon={<Wind className="h-4 w-4 text-muted-foreground" />}
              />
            </div>

            {/* Charts and Map Section */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              {/* Mapa de Alertas */}
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Mapa de Alertas</CardTitle>
                </CardHeader>
                <CardContent className="pl-2 h-[400px]">
                  <Map center={mapCenter} zoom={8} markers={markers} />
                </CardContent>
              </Card>

              {/* Pronóstico de Temperatura */}
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Pronóstico de Temperatura</CardTitle>
                  <CardDescription>Próximos 7 días</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={temperatureData}>
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col">
                                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                                        Día
                                      </span>
                                      <span className="font-bold text-muted-foreground">
                                        {payload[0].payload.name}
                                      </span>
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                                        Temperatura
                                      </span>
                                      <span className="font-bold">
                                        {payload[0].value}°C
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="temp"
                          stroke="#8884d8"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                        <XAxis dataKey="name" />
                        <YAxis />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              {/* Distribución de Alertas por Tipo */}
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Distribución de Alertas por Tipo</CardTitle>
                </CardHeader>
                <CardContent className="pl-2 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={alertDistributionData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Calendario de Eventos */}
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Calendario de Eventos</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    aria-label="Calendario de Eventos"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reportes Generados</CardTitle>
                <CardDescription>
                  Lista de los últimos reportes generados por el sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Report Item */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Reporte Mensual de Alertas
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Generado: 01/06/2023
                      </p>
                    </div>
                    <Link
                      href="/download/report1"
                      className="font-medium text-blue-500 hover:underline"
                    >
                      Descargar
                    </Link>
                  </div>
                  {/* Report Item */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Análisis de Tendencias Climáticas
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Generado: 15/05/2023
                      </p>
                    </div>
                    <Link
                      href="/download/report2"
                      className="font-medium text-blue-500 hover:underline"
                    >
                      Descargar
                    </Link>
                  </div>
                  {/* Report Item */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Resumen de Impacto Económico
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Generado: 30/04/2023
                      </p>
                    </div>
                    <Link
                      href="/download/report3"
                      className="font-medium text-blue-500 hover:underline"
                    >
                      Descargar
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
