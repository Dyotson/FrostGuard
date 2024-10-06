"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface TemperatureChartProps {
  data: Array<{ name: string; proyeccion: number; historico: number }>;
}

export default function TemperatureChart({ data }: TemperatureChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="proyeccion"
          stroke="#8884d8"
          name="Projection"
        />
        <Line
          type="monotone"
          dataKey="historico"
          stroke="#82ca9d"
          name="Historical"
        />
        {/* Línea roja en cero */}
        <ReferenceLine
          y={0}
          stroke="red"
          strokeDasharray="3 3"
          name="Critical Status
"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
