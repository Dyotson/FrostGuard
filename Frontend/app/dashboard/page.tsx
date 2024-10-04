"use client"

import { useState } from "react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { MapPin, ThermometerSnowflake, Droplets, Wind, AlertTriangle } from "lucide-react"

export default function AdminDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <ThermometerSnowflake className="mr-2 h-6 w-6" />
          <h2 className="text-lg font-semibold">FrostGuard Admin</h2>
          <div className="ml-auto flex items-center space-x-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar región" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="norte">Región Norte</SelectItem>
                <SelectItem value="centro">Región Centro</SelectItem>
                <SelectItem value="sur">Región Sur</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Vista General</TabsTrigger>
            <TabsTrigger value="analytics">Analíticas</TabsTrigger>
            <TabsTrigger value="reports">Reportes</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Alertas Activas
                  </CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    +2 desde ayer
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Temperatura Promedio
                  </CardTitle>
                  <ThermometerSnowflake className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">-2°C</div>
                  <p className="text-xs text-muted-foreground">
                    -5°C desde ayer
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Humedad Promedio
                  </CardTitle>
                  <Droplets className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">68%</div>
                  <p className="text-xs text-muted-foreground">
                    +5% desde ayer
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Velocidad del Viento
                  </CardTitle>
                  <Wind className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15 km/h</div>
                  <p className="text-xs text-muted-foreground">
                    +2 km/h desde ayer
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Mapa de Alertas</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[200px] w-full bg-muted relative rounded-md overflow-hidden">
                    {/* Aquí iría un componente de mapa real */}
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      <MapPin className="h-12 w-12" />
                    </div>
                    <div className="absolute top-2 left-2 bg-background p-2 rounded-md shadow">
                      <p className="text-sm font-medium">12 Alertas Activas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Pronóstico de Temperatura</CardTitle>
                  <CardDescription>
                    Próximos 7 días
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { name: "Lun", temp: -2 },
                          { name: "Mar", temp: -1 },
                          { name: "Mié", temp: 0 },
                          { name: "Jue", temp: 1 },
                          { name: "Vie", temp: -1 },
                          { name: "Sáb", temp: -3 },
                          { name: "Dom", temp: -2 },
                        ]}
                        margin={{
                          top: 5,
                          right: 10,
                          left: 10,
                          bottom: 0,
                        }}
                      >
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
                              )
                            }
                            return null
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
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Distribución de Alertas por Tipo</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: "Helada", value: 45 },
                          { name: "Nieve", value: 30 },
                          { name: "Viento", value: 15 },
                          { name: "Granizo", value: 10 },
                        ]}
                      >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar dataKey="value" fill="#8884d8" />
                        <Tooltip />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
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
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
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
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Reporte Mensual de Alertas</p>
                      <p className="text-sm text-muted-foreground">Generado: 01/06/2023</p>
                    </div>
                    <div className="ml-auto font-medium">Descargar</div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Análisis de Tendencias Climáticas</p>
                      <p className="text-sm text-muted-foreground">Generado: 15/05/2023</p>
                    </div>
                    <div className="ml-auto font-medium">Descargar</div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Resumen de Impacto Económico</p>
                      <p className="text-sm text-muted-foreground">Generado: 30/04/2023</p>
                    </div>
                    <div className="ml-auto font-medium">Descargar</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}