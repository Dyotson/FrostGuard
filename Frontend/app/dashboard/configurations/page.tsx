"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Edit2, XCircle } from "lucide-react";
import { useJsApiLoader } from "@react-google-maps/api";
import ConfigurationMap from "@/components/ConfigurationMap";
import ConfigurationForm from "@/components/ConfigurationForm";

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
const center = { lat: 40.7128, lng: -74.006 };

export default function ConfigurationPage() {
  const [zones, setZones] = useState<ZoneConfiguration[]>(initialZones);
  const [activeZone, setActiveZone] = useState<ZoneConfiguration | null>(null);
  const [editZone, setEditZone] = useState<ZoneConfiguration | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [drawingMode, setDrawingMode] =
    useState<google.maps.drawing.OverlayType | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["drawing", "maps", "visualization"],
  });

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
    setEditZone({ ...newZone });
    setIsEditing(true);
    setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
  };

  const saveActiveZone = (updatedZone: ZoneConfiguration) => {
    setZones(
      zones.map((zone) => (zone.id === updatedZone.id ? updatedZone : zone))
    );
    setActiveZone(updatedZone);
    setEditZone(null);
    setIsEditing(false);
    setDrawingMode(null);
  };

  const resetPolygon = () => {
    if (editZone) {
      setEditZone({ ...editZone, coordinates: [] });
      setZones(
        zones.map((zone) =>
          zone.id === editZone.id ? { ...zone, coordinates: [] } : zone
        )
      );
      setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
    }
  };

  const deleteZone = (id: string) => {
    setZones(zones.filter((zone) => zone.id !== id));
    setActiveZone(null);
    setEditZone(null);
  };

  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <Card className="shadow-md w-full mx-auto">
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
              disabled={isEditing}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Agregar Zona
            </Button>
            <ul className="space-y-2">
              {zones.map((zone) => (
                <li
                  key={zone.id}
                  className={`p-2 border rounded cursor-pointer ${activeZone?.id === zone.id ? "bg-gray-200" : ""
                    }`}
                  onClick={() => {
                    if (isEditing && activeZone?.id !== zone.id) return;
                    setActiveZone(zone);
                    setEditZone({ ...zone });
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
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteZone(zone.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditZone({ ...zone });
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
            <ConfigurationMap
              center={center}
              zones={zones}
              activeZone={activeZone}
              drawingMode={drawingMode}
              onPolygonComplete={(polygon) => {
                const path = polygon.getPath();
                const coordinates = path.getArray().map((latLng) => ({
                  lat: latLng.lat(),
                  lng: latLng.lng(),
                }));

                if (editZone) {
                  setEditZone({ ...editZone, coordinates });
                  setZones(
                    zones.map((zone) =>
                      zone.id === editZone.id
                        ? { ...editZone, coordinates }
                        : zone
                    )
                  );
                  setActiveZone({ ...editZone, coordinates });
                }

                polygon.setMap(null);
                setDrawingMode(null);
              }}
            />
          </div>
        </div>

        {editZone && isEditing && (
          <ConfigurationForm
            zone={editZone}
            onSave={saveActiveZone}
            onResetPolygon={resetPolygon}
            onCancel={() => {
              setIsEditing(false);
              setEditZone(null);
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
