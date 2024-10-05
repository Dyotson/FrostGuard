// components/ConfigurationForm.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createFieldConfiguration } from "@/lib/api_utils";

interface ConfigurationData {
  hasSprinklers: boolean;
  hasRoof: boolean;
  hasHeaters: boolean;
  hasFans: boolean;
  cropType: string;
  description: string;
}

export default function ConfigurationForm() {
  const [formData, setFormData] = useState<ConfigurationData>({
    hasSprinklers: false,
    hasRoof: false,
    hasHeaters: false,
    hasFans: false,
    cropType: "",
    description: "",
  });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCropTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, cropType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createFieldConfiguration(formData);
      // Redirigir al apartado General después de guardar
      router.push("/dashboard/general");
    } catch (error) {
      console.error("Error al enviar la configuración:", error);
      // Manejar el error (mostrar mensaje al usuario)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Aspersores */}
      <div className="flex items-center">
        <Checkbox
          name="hasSprinklers"
          id="hasSprinklers"
          checked={formData.hasSprinklers}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="hasSprinklers" className="ml-2">
          ¿Tiene aspersores?
        </label>
      </div>

      {/* Techo */}
      <div className="flex items-center">
        <Checkbox
          name="hasRoof"
          id="hasRoof"
          checked={formData.hasRoof}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="hasRoof" className="ml-2">
          ¿Tiene techo?
        </label>
      </div>

      {/* Calefactores */}
      <div className="flex items-center">
        <Checkbox
          name="hasHeaters"
          id="hasHeaters"
          checked={formData.hasHeaters}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="hasHeaters" className="ml-2">
          ¿Tiene calefactores?
        </label>
      </div>

      {/* Ventiladores */}
      <div className="flex items-center">
        <Checkbox
          name="hasFans"
          id="hasFans"
          checked={formData.hasFans}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="hasFans" className="ml-2">
          ¿Tiene ventiladores?
        </label>
      </div>

      {/* Tipo de Cultivo */}
      <div>
        <label htmlFor="cropType" className="block mb-1">
          Tipo de cultivo
        </label>
        <Select value={formData.cropType} onValueChange={handleCropTypeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccione el tipo de cultivo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Maíz">Maíz</SelectItem>
            <SelectItem value="Trigo">Trigo</SelectItem>
            <SelectItem value="Soja">Soja</SelectItem>
            <SelectItem value="Otros">Otros</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Descripción */}
      <div>
        <label htmlFor="description" className="block mb-1">
          Descripción personalizada
        </label>
        <Textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Escriba una descripción del terreno..."
          required
        />
      </div>

      {/* Botón de Envío */}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Guardar Configuración"}
      </Button>
    </form>
  );
}
