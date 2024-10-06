"use client";

import { useState, useEffect } from "react";
import AddControlMethodDialog from "./AddControlMethodDialog";
import ControlMethodCard from "./ControlMethodCard";
import {
  fetchControlMethods,
  createControlMethod,
  deleteControlMethod,
  fetchGuardianZones,
} from "@/lib/api_utils";
import { ControlMethod, GuardianZone } from "@/lib/interfaces";
import { Sprout, Home, ThermometerSnowflake, Wind } from "lucide-react";

interface ControlType {
  id: string;
  icon: JSX.Element;
  name: string;
  description: string;
}

const controlTypes: Record<string, ControlType> = {
  aspersion: {
    id: "aspersion",
    icon: <Sprout className="h-8 w-8 text-green-500" />,
    name: "Aspersores",
    description:
      "Riego con agua para crear una capa de hielo que protege los cultivos del daño por heladas. Útil para cultivos frutales.",
  },
  roof: {
    id: "roof",
    icon: <Home className="h-8 w-8 text-yellow-500" />,
    name: "Techos",
    description:
      "Infraestructura de techos útiles principalmente para cultivos de menor escala, que requieren protección directa en su superficie.",
  },
  heater: {
    id: "heater",
    icon: <ThermometerSnowflake className="h-8 w-8 text-red-500" />,
    name: "Calefactores",
    description:
      "Sistema de calefacción aplicados en plantaciones sensibles como cítricos y viñedos.",
  },
  fan: {
    id: "fan",
    icon: <Wind className="h-8 w-8 text-blue-500" />,
    name: "Ventiladores",
    description:
      "Tecnologías que mezclan el aire más cálido en altura con el frío cercano al suelo. Útiles para viñedos.",
  },
};

export default function ControlMethodsPage() {
  const [controls, setControls] = useState<ControlMethod[]>([]);
  const [guardianZones, setGuardianZones] = useState<GuardianZone[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedControls, fetchedZones] = await Promise.all([
          fetchControlMethods(),
          fetchGuardianZones(),
        ]);
        setControls(fetchedControls);
        setGuardianZones(fetchedZones);
      } catch (err) {
        setError("Error al cargar los datos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addControl = async (
    name: string,
    controlType: string,
    zoneId: number
  ) => {
    const payload = {
      name,
      active: false,
      guardian_zone_id: zoneId,
      control_type: controlType,
    };

    try {
      const newControl = await createControlMethod(payload);
      setControls([...controls, newControl]);
    } catch (err) {
      setError("Error al agregar el método de control.");
      console.error(err);
    }
  };

  const toggleControl = (id: number) => {
    const updatedControls = controls.map((control) =>
      control.id === id ? { ...control, active: !control.active } : control
    );
    setControls(updatedControls);
  };

  const removeControl = async (id: number) => {
    try {
      await deleteControlMethod(id);
      setControls(controls.filter((control) => control.id !== id));
    } catch (err) {
      setError("Error al eliminar el método de control.");
      console.error(err);
    }
  };

  if (loading) {
    return <p>Cargando métodos de control...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center my-4">
        <AddControlMethodDialog
          controlTypes={controlTypes}
          guardianZones={guardianZones}
          onAddControl={addControl}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {controls.map((control) => (
          <ControlMethodCard
            key={control.id}
            control={control}
            controlTypes={controlTypes}
            onToggleControl={toggleControl}
            onRemoveControl={removeControl}
          />
        ))}
      </div>
    </div>
  );
}
