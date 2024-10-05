"use client";

import ControlMethod from "@/components/ControlMethod";
import { Sprout, Home, ThermometerSnowflake, Wind } from "lucide-react";

export default function ControlPage() {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Métodos de Control</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <ControlMethod
          name="Aspersores"
          icon={<Sprout className="h-8 w-8 text-green-500" />}
        />
        <ControlMethod
          name="Techos"
          icon={<Home className="h-8 w-8 text-yellow-500" />}
        />
        <ControlMethod
          name="Calefactores"
          icon={<ThermometerSnowflake className="h-8 w-8 text-red-500" />}
        />
        <ControlMethod
          name="Ventiladores"
          icon={<Wind className="h-8 w-8 text-blue-500" />}
        />
        {/* Agrega más métodos de control según sea necesario */}
      </div>
    </>
  );
}
