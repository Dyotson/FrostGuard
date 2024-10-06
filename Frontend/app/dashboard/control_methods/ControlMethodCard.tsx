import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info, Trash2 } from "lucide-react";
import { ControlMethod } from "@/lib/interfaces";

interface ControlType {
  icon: React.ReactNode;
  name: string;
  description: string;
}

interface ControlMethodCardProps {
  control: ControlMethod;
  controlTypes: Record<string, ControlType>;
  onToggleControl: (id: number) => void;
  onRemoveControl: (id: number) => void;
}

export default function ControlMethodCard({
  control,
  controlTypes,
  onToggleControl,
  onRemoveControl,
}: ControlMethodCardProps) {
  const controlType = controlTypes[control.control_type];

  // Additional validation to prevent errors in rendering controlType
  if (!controlType) {
    console.error(
      `Control type not found for: ${control.control_type}`
    );
    return null; // We don't render anything if the control type is not found
  }

  return (
    <Card className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
      <div className="mb-4">{controlType.icon}</div>

      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        {control.name}
      </h3>

      <div className="flex items-center space-x-2 mb-4">
        <Switch
          checked={control.active}
          onCheckedChange={() => onToggleControl(control.id)}
        />
        <span className="text-sm text-gray-500">
          {control.active ? "Activated" : "Deactivated"}
        </span>
      </div>

      <div className="flex space-x-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Info">
              <Info className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{control.name}</DialogTitle>
              <DialogDescription>{controlType.description}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Button
          variant="destructive"
          size="icon"
          onClick={() => onRemoveControl(control.id)}
          aria-label="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}