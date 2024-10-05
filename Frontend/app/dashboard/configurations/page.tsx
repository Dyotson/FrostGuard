"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2, Edit2 } from "lucide-react";
import { GoogleMap, DrawingManager, Polygon, LoadScript } from "@react-google-maps/api";

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

const initialZones: ZoneConfiguration[] = [
  // Zonas iniciales (puedes dejarlas vacías si lo prefieres)
];

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = { lat: 40.7128, lng: -74.0060 }; // Coordenadas iniciales del mapa

export default function ConfigurationPage() {
  const [zones, setZones] = useState<ZoneConfiguration[]>(initialZones);
  const [activeZone, setActiveZone] = useState<ZoneConfiguration | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [drawingMode, setDrawingMode] = useState<google.maps.drawing.OverlayType | null>(null);

  const mapRef = useRef<google.maps.Map | null>(null);

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const addZone = () => {
    const newZone: ZoneConfiguration = {
      id: Date.now().toString(),
      name: `Zona ${zones.length + 1}`,
      hasSprinklers: false,
      hasRoof: false,
      hasHeaters: false,
      hasFans: false,
      cropType: "",
      description: "",
      coordinates: [],
    };
    setZones([...zones, newZone]);
    setActiveZone(newZone);
    setIsEditing(true);
    setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
  };

  const saveZone = () => {
    setIsEditing(false);
    setDrawingMode(null);
  };

  const updateZone = (updates: Partial<ZoneConfiguration>) => {
    if (activeZone) {
      setActiveZone({ ...activeZone, ...updates });
    }
  };

  const saveActiveZone = () => {
    if (activeZone) {
      setZones(zones.map((zone) => (zone.id === activeZone.id ? activeZone : zone)));
      setIsEditing(false);
      setDrawingMode(null);
    }
  };

  const deleteZone = (id: string) => {
    setZones(zones.filter((zone) => zone.id !== id));
    setActiveZone(null);
  };

  const onPolygonComplete = (polygon: google.maps.Polygon) => {
    const path = polygon.getPath();
    const coordinates = path.getArray().map((latLng) => ({
      lat: latLng.lat(),
      lng: latLng.lng(),
    }));
    updateZone({ coordinates });
    polygon.setMap(null); // Remove the drawing overlay
    setDrawingMode(null);
  };

  return (
    <Card className="shadow-md w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Configuración del Terreno</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4">
          {/* Panel de Zonas */}
          <div className="w-1/3">
            <Button type="button" onClick={addZone} variant="outline" className="w-full mb-4">
              <PlusCircle className="mr-2 h-4 w-4" /> Agregar Zona
            </Button>
            <ul className="space-y-2">
              {zones.map((zone) => (
                <li
                  key={zone.id}
                  className={`p-2 border rounded cursor-pointer ${
                    activeZone?.id === zone.id ? "bg-gray-200" : ""
                  }`}
                  onClick={() => {
                    setActiveZone(zone);
                    setIsEditing(false);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span>{zone.name}</span>
                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setActiveZone(zone);
                          setIsEditing(true);
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteZone(zone.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Mapa */}
          <div className="w-2/3">
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!} libraries={["drawing"]}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={5}
                onLoad={handleMapLoad}
              >
                {zones.map((zone) => (
                  <Polygon
                    key={zone.id}
                    paths={zone.coordinates}
                    options={{
                      fillColor: zone.id === activeZone?.id ? "#2196F3" : "#90CAF9",
                      fillOpacity: 0.4,
                      strokeColor: "#1E88E5",
                      strokeOpacity: 1,
                      strokeWeight: 2,
                      clickable: false,
                      draggable: false,
                      editable: false,
                      geodesic: false,
                      zIndex: 1,
                    }}
                  />
                ))}
                {isEditing && drawingMode && (
                  <DrawingManager
                    options={{
                      drawingControl: false,
                      drawingMode: drawingMode,
                      polygonOptions: {
                        fillColor: "#2196F3",
                        fillOpacity: 0.4,
                        strokeColor: "#1E88E5",
                        strokeOpacity: 1,
                        strokeWeight: 2,
                        clickable: false,
                        editable: false,
                        zIndex: 2,
                      },
                    }}
                    onPolygonComplete={onPolygonComplete}
                  />
                )}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>

        {/* Formulario de Edición */}
        {activeZone && isEditing && (
          <div className="mt-6">
            <form className="space-y-6" onSubmit={saveActiveZone}>
              <div>
                <Label htmlFor={`name-${activeZone.id}`}>Nombre de la Zona</Label>
                <Input
                  id={`name-${activeZone.id}`}
                  value={activeZone.name}
                  onChange={(e) => updateZone({ name: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`sprinklers-${activeZone.id}`}>Aspersores</Label>
                  <Switch
                    id={`sprinklers-${activeZone.id}`}
                    checked={activeZone.hasSprinklers}
                    onCheckedChange={(checked) => updateZone({ hasSprinklers: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor={`roof-${activeZone.id}`}>Techo</Label>
                  <Switch
                    id={`roof-${activeZone.id}`}
                    checked={activeZone.hasRoof}
                    onCheckedChange={(checked) => updateZone({ hasRoof: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor={`heaters-${activeZone.id}`}>Calefactores</Label>
                  <Switch
                    id={`heaters-${activeZone.id}`}
                    checked={activeZone.hasHeaters}
                    onCheckedChange={(checked) => updateZone({ hasHeaters: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor={`fans-${activeZone.id}`}>Ventiladores</Label>
                  <Switch
                    id={`fans-${activeZone.id}`}
                    checked={activeZone.hasFans}
                    onCheckedChange={(checked) => updateZone({ hasFans: checked })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`cropType-${activeZone.id}`}>Tipo de Cultivo</Label>
                <Select
                  value={activeZone.cropType}
                  onValueChange={(value) => updateZone({ cropType: value })}
                >
                  <SelectTrigger id={`cropType-${activeZone.id}`} className="mt-1">
                    <SelectValue placeholder="Selecciona el tipo de cultivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Maíz">Maíz</SelectItem>
                    <SelectItem value="Trigo">Trigo</SelectItem>
                    <SelectItem value="Soja">Soja</SelectItem>
                    <SelectItem value="Otros">Otros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor={`description-${activeZone.id}`}>Descripción</Label>
                <Textarea
                  id={`description-${activeZone.id}`}
                  value={activeZone.description}
                  onChange={(e) => updateZone({ description: e.target.value })}
                  placeholder="Describe las características de esta zona"
                  className="mt-1"
                />
              </div>

              <div className="flex space-x-4">
                <Button type="button" onClick={saveActiveZone}>
                  Guardar Zona
                </Button>
                <Button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        )}
      </CardContent>
    </Card>
  );
}