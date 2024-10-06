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
    name: "Sprinklers",
    description:
      "Water irrigation to create an ice layer that protects crops from frost damage. Useful for fruit crops.",
  },
  roof: {
    id: "roof",
    icon: <Home className="h-8 w-8 text-yellow-500" />,
    name: "Roofs",
    description:
      "Roof infrastructure mainly useful for smaller-scale crops that require direct surface protection.",
  },
  heater: {
    id: "heater",
    icon: <ThermometerSnowflake className="h-8 w-8 text-red-500" />,
    name: "Heaters",
    description:
      "Heating systems applied to sensitive plantations like citrus and vineyards.",
  },
  fan: {
    id: "fan",
    icon: <Wind className="h-8 w-8 text-blue-500" />,
    name: "Fans",
    description:
      "Technologies that mix warmer air from above with the colder air near the ground. Useful for vineyards.",
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
        setError("Error loading data.");
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
      setError("Error adding control method.");
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
      setError("Error removing control method.");
      console.error(err);
    }
  };

  if (loading) {
    return <p>Loading control methods...</p>;
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