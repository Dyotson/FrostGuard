"use client";

import { useState, useEffect, useRef } from "react";
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
import {
  PlusCircle,
  Trash2,
  Edit2,
  Droplet,
  Home,
  Thermometer,
  Fan,
  Leaf,
  FileText,
  XCircle,
} from "lucide-react";
import {
  useJsApiLoader,
  DrawingManager,
  Polygon,
} from "@react-google-maps/api";
import MapComponent from "@/components/MapComponent"; // Asegúrate de que la ruta sea correcta

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

const initialZones: ZoneConfiguration[] = [];

const center = { lat: 40.7128, lng: -74.006 }; // Coordenadas iniciales del mapa

export default function ConfigurationPage() {
  // Estados para manejar las zonas, zona activa, edición y modo de dibujo
  const [zones, setZones] = useState<ZoneConfiguration[]>(initialZones);
  const [activeZone, setActiveZone] = useState<ZoneConfiguration | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [drawingMode, setDrawingMode] =
    useState<google.maps.drawing.OverlayType | null>(null);

  // Cargar la API de Google Maps usando useJsApiLoader
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["drawing"],
  });

  // Configurar las opciones del mapa una vez que la API esté cargada
  const [mapOptions, setMapOptions] = useState<google.maps.MapOptions | null>(
    null
  );

  useEffect(() => {
    if (isLoaded && typeof google !== "undefined") {
      setMapOptions({
        mapTypeControl: true, // Permite cambiar entre satélite y mapa
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_RIGHT,
        },
        fullscreenControl: true, // Control para pantalla completa
        streetViewControl: false, // Desactivar vista de la calle
      });
    }
  }, [isLoaded]);

  // Refs para manejar el mapa y el polígono
  const mapRef = useRef<google.maps.Map | null>(null);
  const polygonRef = useRef<google.maps.Polygon | null>(null);

  // Manejar la carga del mapa
  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    // Dibujar polígonos existentes al cargar el mapa
    zones.forEach((zone) => {
      if (zone.coordinates.length > 0) {
        drawPolygon(zone);
      }
    });
  };

  // Añadir una nueva zona
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

  // Guardar la zona activa
  const saveActiveZone = () => {
    if (activeZone) {
      setZones(
        zones.map((zone) => (zone.id === activeZone.id ? activeZone : zone))
      );
      setIsEditing(false);
      setDrawingMode(null);
    }
  };

  // Actualizar propiedades de la zona activa
  const updateZone = (updates: Partial<ZoneConfiguration>) => {
    if (activeZone) {
      setActiveZone({ ...activeZone, ...updates });
    }
  };

  // Eliminar una zona
  const deleteZone = (id: string) => {
    setZones(zones.filter((zone) => zone.id !== id));
    setActiveZone(null);
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
      polygonRef.current = null;
    }
  };

  // Resetear el polígono actual
  const resetPolygon = () => {
    if (polygonRef.current) {
      polygonRef.current.setMap(null); // Remover polígono actual del mapa
      polygonRef.current = null;
    }
    if (activeZone) {
      setZones(
        zones.map((zone) =>
          zone.id === activeZone.id ? { ...zone, coordinates: [] } : zone
        )
      );
      setDrawingMode(google.maps.drawing.OverlayType.POLYGON); // Permitir dibujar nuevamente
    }
  };

  // Función para dibujar un polígono en el mapa
  const drawPolygon = (zone: ZoneConfiguration) => {
    if (!isLoaded || !mapRef.current) return;

    // Remover polígono anterior si existe
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
    }

    // Crear nuevo polígono
    polygonRef.current = new google.maps.Polygon({
      paths: zone.coordinates,
      fillColor: zone.id === activeZone?.id ? "#2196F3" : "#90CAF9",
      fillOpacity: 0.4,
      strokeColor: "#1E88E5",
      strokeOpacity: 1,
      strokeWeight: 2,
      editable: zone.id === activeZone?.id,
      draggable: zone.id === activeZone?.id,
      map: mapRef.current,
    });

    // Añadir eventos para actualizar las coordenadas si el polígono es editable
    if (zone.id === activeZone?.id) {
      const path = polygonRef.current.getPath();

      const updateCoordinates = () => {
        const updatedCoordinates = path.getArray().map((latLng) => ({
          lat: latLng.lat(),
          lng: latLng.lng(),
        }));
        updateZone({ coordinates: updatedCoordinates });
        setZones((prevZones) =>
          prevZones.map((z) =>
            z.id === zone.id ? { ...z, coordinates: updatedCoordinates } : z
          )
        );
      };

      path.addListener("set_at", updateCoordinates);
      path.addListener("insert_at", updateCoordinates);
    }
  };

  // Manejar la finalización del dibujo del polígono
  const onPolygonComplete = (polygon: google.maps.Polygon) => {
    const path = polygon.getPath();
    const coordinates = path.getArray().map((latLng) => ({
      lat: latLng.lat(),
      lng: latLng.lng(),
    }));

    if (activeZone) {
      setZones(
        zones.map((zone) =>
          zone.id === activeZone.id ? { ...zone, coordinates } : zone
        )
      );
      setActiveZone({ ...activeZone, coordinates });
      drawPolygon(activeZone);
    }

    polygon.setMap(null); // Remover la superposición de dibujo
    setDrawingMode(null); // Finalizar modo de dibujo
  };

  // Efecto para centrar y dibujar el polígono al cambiar de zona
  useEffect(() => {
    if (isLoaded && activeZone) {
      // Dibujar polígono de la zona activa
      if (activeZone.coordinates.length > 0) {
        drawPolygon(activeZone);
        // Centrar el mapa en la zona activa
        if (mapRef.current) {
          const bounds = new google.maps.LatLngBounds();
          activeZone.coordinates.forEach((coord) => {
            bounds.extend(new google.maps.LatLng(coord.lat, coord.lng));
          });
          mapRef.current.fitBounds(bounds);
        }
      }
    }
  }, [activeZone, isLoaded, zones]);

  // Manejar errores de carga
  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <Card className="shadow-md w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Configuración del Terreno
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4">
          <div className="w-1/3">
            <Button
              type="button"
              onClick={addZone}
              variant="outline"
              className="w-full mb-4"
            >
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
                    setIsEditing(true);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span>{zone.name}</span>
                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteZone(zone.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setActiveZone(zone);
                          setIsEditing(true);
                        }}
                      >
                        <Edit2 className="h-4 w-4 text-blue-500" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-2/3 h-96">
            {" "}
            <MapComponent center={center} zoom={12} markers={[]}>
              {activeZone && drawingMode && (
                <DrawingManager
                  onPolygonComplete={onPolygonComplete}
                  drawingMode={drawingMode}
                  options={{
                    drawingControl: true,
                    drawingControlOptions: {
                      position: google.maps.ControlPosition.TOP_CENTER,
                      drawingModes: [google.maps.drawing.OverlayType.POLYGON],
                    },
                    polygonOptions: {
                      fillColor: "#2196F3",
                      fillOpacity: 0.4,
                      strokeColor: "#1E88E5",
                      strokeOpacity: 1,
                      strokeWeight: 2,
                      clickable: false,
                      editable: false,
                      draggable: false,
                      zIndex: 2,
                    },
                  }}
                />
              )}

              {zones.map((zone) => (
                <Polygon
                  key={zone.id}
                  paths={zone.coordinates}
                  options={{
                    fillColor:
                      zone.id === activeZone?.id ? "#2196F3" : "#90CAF9",
                    fillOpacity: 0.4,
                    strokeColor: "#1E88E5",
                    strokeOpacity: 1,
                    strokeWeight: 2,
                    clickable: false,
                    draggable: false,
                    editable: zone.id === activeZone?.id,
                    geodesic: false,
                    zIndex: 1,
                  }}
                />
              ))}
            </MapComponent>
          </div>
        </div>

        {activeZone && isEditing && (
          <div className="mt-6">
            <form className="space-y-6">
              <div className="mb-4">
                <Label htmlFor={`name-${activeZone.id}`}>
                  <Home className="mr-2 h-4 w-4 inline" /> Nombre de la Zona
                </Label>
                <Input
                  id={`name-${activeZone.id}`}
                  value={activeZone.name}
                  onChange={(e) => updateZone({ name: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`sprinklers-${activeZone.id}`}>
                    <Droplet className="mr-2 h-4 w-4 inline" /> Aspersores
                  </Label>
                  <Switch
                    id={`sprinklers-${activeZone.id}`}
                    checked={activeZone.hasSprinklers}
                    onCheckedChange={(checked) =>
                      updateZone({ hasSprinklers: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor={`roof-${activeZone.id}`}>
                    <Home className="mr-2 h-4 w-4 inline" /> Techo
                  </Label>
                  <Switch
                    id={`roof-${activeZone.id}`}
                    checked={activeZone.hasRoof}
                    onCheckedChange={(checked) =>
                      updateZone({ hasRoof: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor={`heaters-${activeZone.id}`}>
                    <Thermometer className="mr-2 h-4 w-4 inline" /> Calefactores
                  </Label>
                  <Switch
                    id={`heaters-${activeZone.id}`}
                    checked={activeZone.hasHeaters}
                    onCheckedChange={(checked) =>
                      updateZone({ hasHeaters: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor={`fans-${activeZone.id}`}>
                    <Fan className="mr-2 h-4 w-4 inline" /> Ventiladores
                  </Label>
                  <Switch
                    id={`fans-${activeZone.id}`}
                    checked={activeZone.hasFans}
                    onCheckedChange={(checked) =>
                      updateZone({ hasFans: checked })
                    }
                  />
                </div>
              </div>

              <div className="mb-4">
                <Label htmlFor={`cropType-${activeZone.id}`}>
                  <Leaf className="mr-2 h-4 w-4 inline" /> Tipo de Cultivo
                </Label>
                <Select
                  value={activeZone.cropType}
                  onValueChange={(value) => updateZone({ cropType: value })}
                >
                  <SelectTrigger
                    id={`cropType-${activeZone.id}`}
                    className="mt-1"
                  >
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

              <div className="mb-4">
                <Label htmlFor={`description-${activeZone.id}`}>
                  <FileText className="mr-2 h-4 w-4 inline" /> Descripción
                </Label>
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
                  onClick={resetPolygon}
                  variant="destructive"
                >
                  <XCircle className="mr-2 h-4 w-4 inline" /> Resetear Polígono
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
