"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Sprout,
  Home,
  ThermometerSnowflake,
  Wind,
  Info,
  Plus,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface ControlType {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface Control extends ControlType {
  instanceId: string;
  active: boolean;
  customName: string;
  zoneId: string;
}

const controlTypes: ControlType[] = [
  {
    id: "sprinkler",
    name: "Aspersores",
    icon: <Sprout className="h-8 w-8 text-green-500" />,
    description:
      "Riego con agua para crear una capa de hielo que protege los cultivos del daño por heladas. Útil para cultivos frutales.",
  },
  {
    id: "roof",
    name: "Techos",
    icon: <Home className="h-8 w-8 text-yellow-500" />,
    description:
      "Infraestructura de techos útiles principalmente para cultivos de menor escala, que requieren protección directa en su superficie.",
  },
  {
    id: "heater",
    name: "Calefactores",
    icon: <ThermometerSnowflake className="h-8 w-8 text-red-500" />,
    description:
      "Sistema de calefacción aplicados en plantaciones sensibles como cítricos y viñedos.",
  },
  {
    id: "fan",
    name: "Ventiladores",
    icon: <Wind className="h-8 w-8 text-blue-500" />,
    description:
      "Tecnologías que mezclan el aire más cálido en altura con el frío cercano al suelo. Útiles para viñedos.",
  },
];

export default function ControlMethodsPage() {
  const [controls, setControls] = useState<Control[]>([
    {
      ...controlTypes[0],
      instanceId: "sprinkler-1",
      active: true,
      customName: "Aspersor Principal",
      zoneId: "Zona 1",
    },
  ]);

  const [newControlName, setNewControlName] = useState("");
  const [selectedType, setSelectedType] = useState<ControlType | null>(null);
  const [selectedZone, setSelectedZone] = useState<string>("Zona 1");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const zones = ["Zona 1", "Zona 2", "Zona 3"];

  const toggleControl = (instanceId: string) => {
    setControls(
      controls.map((control) =>
        control.instanceId === instanceId
          ? { ...control, active: !control.active }
          : control
      )
    );
  };

  const addControl = () => {
    if (selectedType && newControlName) {
      const newControl: Control = {
        ...selectedType,
        instanceId: `${selectedType.id}-${Date.now()}`,
        active: false,
        customName: newControlName,
        zoneId: selectedZone,
      };
      setControls([...controls, newControl]);
      setNewControlName("");
      setSelectedType(null);
      setSelectedZone("Zona 1");
      setIsDialogOpen(false);
    }
  };

  const removeControl = (instanceId: string) => {
    setControls(
      controls.filter((control) => control.instanceId !== instanceId)
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">
        Métodos de Control para Combatir Heladas
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {controls.map((control) => (
          <Card
            key={control.instanceId}
            className="flex flex-col items-center p-6 hover:bg-gray-50 transition-colors"
          >
            {control.icon}
            <h3 className="mt-4 text-lg font-medium">{control.customName}</h3>
            <p className="text-sm text-gray-500">
              {control.name} - {control.zoneId}
            </p>
            <div className="mt-2 flex items-center space-x-2">
              <Switch
                checked={control.active}
                onCheckedChange={() => toggleControl(control.instanceId)}
              />
              <span className="text-sm text-gray-500">
                {control.active ? "Activado" : "Desactivado"}
              </span>
            </div>
            <div className="mt-4 flex space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Info className="w-4 h-4 mr-2" />
                    Info
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{control.customName}</DialogTitle>
                    <DialogDescription>{control.description}</DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeControl(control.instanceId)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar
              </Button>
            </div>
          </Card>
        ))}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Card className="flex flex-col items-center justify-center p-6 hover:bg-gray-50 transition-colors cursor-pointer">
              <Plus className="h-8 w-8 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                Agregar Método de Control
              </p>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Método de Control</DialogTitle>
              <DialogDescription>
                Selecciona el tipo de método de control, asigna una zona y dale
                un nombre personalizado.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {controlTypes.map((type) => (
                <Button
                  key={type.id}
                  variant="outline"
                  onClick={() => setSelectedType(type)}
                  className={`${
                    selectedType?.id === type.id ? "border-blue-500" : ""
                  } flex items-center justify-start space-x-2`}
                >
                  {type.icon}
                  <span>{type.name}</span>
                </Button>
              ))}
            </div>

            <div className="mt-4">
              <Label htmlFor="name">Nombre Personalizado</Label>
              <Input
                id="name"
                value={newControlName}
                onChange={(e) => setNewControlName(e.target.value)}
                placeholder="Escribe el nombre"
              />
            </div>

            <div className="mt-4">
              <Label htmlFor="zone">Asignar Zona</Label>
              <Select value={selectedZone} onValueChange={setSelectedZone}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Seleccionar zona" />
                </SelectTrigger>
                <SelectContent>
                  {zones.map((zone) => (
                    <SelectItem key={zone} value={zone}>
                      {zone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button
                onClick={addControl}
                disabled={!selectedType || !newControlName}
              >
                Agregar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
