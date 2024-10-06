import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { GuardianZone } from "@/lib/interfaces";

interface ControlType {
  id: string;
  icon: React.ReactNode;
  name: string;
}

interface AddControlMethodDialogProps {
  controlTypes: Record<string, ControlType>;
  guardianZones: GuardianZone[];
  onAddControl: (name: string, controlType: string, zoneId: number) => void;
}

export default function AddControlMethodDialog({
  controlTypes,
  guardianZones,
  onAddControl,
}: AddControlMethodDialogProps) {
  const [newControlName, setNewControlName] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedZoneId, setSelectedZoneId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleAddControl = () => {
    if (!selectedType || !newControlName || selectedZoneId === null) {
      return;
    }

    onAddControl(newControlName, selectedType, selectedZoneId);
    setNewControlName("");
    setSelectedType(null);
    setSelectedZoneId(null);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <span>Add Control Method</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Control Method</DialogTitle>
          <DialogDescription>
            Select the type of control method, assign a zone, and give it a custom name.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Label htmlFor="control-type">Control Type</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.keys(controlTypes).map((key) => (
              <Button
                key={key}
                variant="outline"
                onClick={() => setSelectedType(key)}
                className={`${selectedType === key ? "border-blue-500" : ""
                  } flex items-center space-x-2`}
              >
                {controlTypes[key].icon}
                <span>{controlTypes[key].name}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="control-name">Custom Name</Label>
          <Input
            id="control-name"
            value={newControlName}
            onChange={(e) => setNewControlName(e.target.value)}
            placeholder="Enter the name"
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="zone">Assign Zone</Label>
          <Select
            value={selectedZoneId !== null ? selectedZoneId.toString() : ""}
            onValueChange={(value) => setSelectedZoneId(Number(value))}
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select zone" />
            </SelectTrigger>
            <SelectContent>
              {guardianZones.map((zone) => (
                <SelectItem key={zone.id} value={zone.id.toString()}>
                  {zone.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button
            onClick={handleAddControl}
            disabled={
              !selectedType || !newControlName || selectedZoneId === null
            }
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}