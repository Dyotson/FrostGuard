"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Droplet,
  Home,
  Thermometer,
  Fan,
  Leaf,
  FileText,
  XCircle,
} from "lucide-react";

interface ZoneConfiguration {
  id: string;
  name: string;
  hasSprinklers: boolean;
  hasRoof: boolean;
  hasHeaters: boolean;
  hasFans: boolean;
  cropType: string;
  description: string;
  coordinates: { lat: number; lng: number }[];
}

interface ConfigurationFormProps {
  zone: ZoneConfiguration;
  onSave: (zone: ZoneConfiguration) => void;
  onResetPolygon: () => void;
  onCancel: () => void;
}

export default function ConfigurationForm({
  zone,
  onSave,
  onResetPolygon,
  onCancel,
}: ConfigurationFormProps) {
  const [formData, setFormData] = useState<ZoneConfiguration>(zone);

  useEffect(() => {
    setFormData(zone);
  }, [zone]);

  const handleSwitchChange = (
    field: keyof ZoneConfiguration,
    checked: boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: checked }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, cropType: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <Label htmlFor={`name-${formData.id}`}>
            <Home className="mr-2 h-4 w-4 inline" /> Zone Name
          </Label>
          <Input
            id={`name-${formData.id}`}
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center justify-between">
            <Label htmlFor={`sprinklers-${formData.id}`}>
              <Droplet className="mr-2 h-4 w-4 inline" /> Sprinklers
            </Label>
            <Switch
              id={`sprinklers-${formData.id}`}
              checked={formData.hasSprinklers}
              onCheckedChange={(checked) =>
                handleSwitchChange("hasSprinklers", checked)
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor={`roof-${formData.id}`}>
              <Home className="mr-2 h-4 w-4 inline" /> Roof
            </Label>
            <Switch
              id={`roof-${formData.id}`}
              checked={formData.hasRoof}
              onCheckedChange={(checked) =>
                handleSwitchChange("hasRoof", checked)
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor={`heaters-${formData.id}`}>
              <Thermometer className="mr-2 h-4 w-4 inline" /> Heaters
            </Label>
            <Switch
              id={`heaters-${formData.id}`}
              checked={formData.hasHeaters}
              onCheckedChange={(checked) =>
                handleSwitchChange("hasHeaters", checked)
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor={`fans-${formData.id}`}>
              <Fan className="mr-2 h-4 w-4 inline" /> Heat Fans
            </Label>
            <Switch
              id={`fans-${formData.id}`}
              checked={formData.hasFans}
              onCheckedChange={(checked) =>
                handleSwitchChange("hasFans", checked)
              }
            />
          </div>
        </div>

        <div className="mb-4">
          <Label htmlFor={`cropType-${formData.id}`}>
            <Leaf className="mr-2 h-4 w-4 inline" /> Crop Type
          </Label>
          <Select value={formData.cropType} onValueChange={handleSelectChange}>
            <SelectTrigger id={`cropType-${formData.id}`} className="mt-1">
              <SelectValue placeholder="Selecciona el tipo de cultivo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Maíz">Corn</SelectItem>
              <SelectItem value="Trigo">Wheat</SelectItem>
              <SelectItem value="Soja">Soy</SelectItem>
              <SelectItem value="Otros">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4">
          <Label htmlFor={`description-${formData.id}`}>
            <FileText className="mr-2 h-4 w-4 inline" /> Description
          </Label>
          <Textarea
            id={`description-${formData.id}`}
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe las características de esta zona"
            className="mt-1"
          />
        </div>

        <div className="flex space-x-4">
          <Button type="submit">Save Zone</Button>
          <Button type="button" onClick={onResetPolygon} variant="destructive">
            <XCircle className="mr-2 h-4 w-4 inline" /> Reset Polygon
          </Button>
          <Button type="button" onClick={onCancel} variant="outline">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
