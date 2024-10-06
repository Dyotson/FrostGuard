
export interface GuardianZone {
  id: number;
  name: string;
  has_sprinklers: boolean;
  has_roof: boolean;
  has_heaters: boolean;
  has_fans: boolean;
  crop_type: string;
  description: string;
  coordinates: { lat: number; lng: number }[];
}

export interface ControlMethod {
  id: number;
  name: string;
  active: boolean;
  guardian_zone: GuardianZone;
  control_type: string;
}

export interface ControlMethodPayload {
  name: string;
  active: boolean;
  guardian_zone_id: number;
  control_type: string;
}

export interface GuardianPositionData {
  id: number;
  sender: string;
  altitude: number;
  latitude_i: number;
  longitude_i: number;
}

export interface FieldConfiguration {
  hasSprinklers: boolean;
  hasRoof: boolean;
  hasHeaters: boolean;
  hasFans: boolean;
  cropType: string;
  description: string;
}

export interface GuardianTelemetryData {
  id: number;
  sender: string;
  barometric_pressure: number;
  relative_humidity: number;
  temperature: number;
  timestamp: string;
}

export interface GuardianPositionData {
  id: number;
  sender: string;
  altitude: number;
  latitude_i: number;
  longitude_i: number;
  guardian_zone: {
    id: number;
    name: string;
    has_sprinklers: boolean;
    has_roof: boolean;
    has_heaters: boolean;
    has_fans: boolean;
    crop_type: string;
    description: string;
    coordinates: { lat: number; lng: number }[];
  };
}
