import {
  ControlMethod,
  ControlMethodPayload,
  GuardianZone,
  FieldConfiguration,
  GuardianTelemetryData,
  GuardianPositionData,
} from "./interfaces";


// Función genérica para manejar las solicitudes HTTP
async function apiRequest<T>(
  endpoint: string,
  method: string = "GET",
  payload?: any
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: payload ? JSON.stringify(payload) : undefined,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    options
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error en la solicitud: ${response.status} ${errorText}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return await response.json();
}

// Obtener todas las posiciones
export async function fetchGuardianPositionData(): Promise<
  GuardianPositionData[]
> {
  return apiRequest<GuardianPositionData[]>("/guardian_position_data");
}

// Obtener una posición específica por ID
export async function fetchGuardianPositionDataById(
  id: number
): Promise<GuardianPositionData> {
  return apiRequest<GuardianPositionData>(`/guardian_position_data/${id}`);
}

// Crear una nueva posición
export async function createGuardianPositionData(
  payload: Omit<GuardianPositionData, "id">
): Promise<GuardianPositionData> {
  return apiRequest<GuardianPositionData>(
    "/guardian_position_data",
    "POST",
    payload
  );
}

// Actualizar una posición existente
export async function updateGuardianPositionData(
  id: number,
  payload: Omit<GuardianPositionData, "id">
): Promise<GuardianPositionData> {
  return apiRequest<GuardianPositionData>(
    `/guardian_position_data/${id}`,
    "PUT",
    payload
  );
}

// Eliminar una posición por ID
export async function deleteGuardianPositionData(id: number): Promise<void> {
  await apiRequest<void>(`/guardian_position_data/${id}`, "DELETE");
}

// Verificar el estado del backend
export async function checkApiStatus(): Promise<{
  status: string;
  message: string;
}> {
  return apiRequest<{ status: string; message: string }>("/status");
}


// Función para crear una nueva configuración de campo
export async function createFieldConfiguration(
  payload: FieldConfiguration
): Promise<void> {
  await apiRequest<void>("/field_configuration", "POST", payload);
}

export async function fetchAlertsData(): Promise<any[]> {
  try {
    const response = await apiRequest<any[]>("/guardian_alerts", "GET");
    return response;
  } catch (error) {
    console.error("Error al obtener las alertas", error);
    throw new Error("Error al obtener los datos de las alertas.");
  }
}


// Obtener la temperatura más baja reciente
export async function fetchLowestTemperatureData(): Promise<GuardianTelemetryData> {
  return apiRequest<GuardianTelemetryData>(
    "/guardian_telemetry_data/most_recent_lowest_temperature"
  );
}

// Obtener los datos de la posición de una zona por nombre
export async function fetchGuardianPositionDataByZone(
  zone_name: string
): Promise<GuardianPositionData[]> {
  return apiRequest<GuardianPositionData[]>(
    `/guardian_position_data?zone_name=${zone_name}`
  );
}

export async function fetchAllTelemetryData(): Promise<
  GuardianTelemetryData[]
> {
  return apiRequest<GuardianTelemetryData[]>("/guardian_telemetry_data");
}


// Obtener todas las zonas guardianas
export async function fetchGuardianZones(): Promise<GuardianZone[]> {
  return apiRequest<GuardianZone[]>("/guardian_zones/");
}

// Obtener todos los métodos de control
export async function fetchControlMethods(): Promise<ControlMethod[]> {
  return apiRequest<ControlMethod[]>("/control_methods/");
}

// Crear un nuevo método de control
export async function createControlMethod(payload: {
  name: string;
  active: boolean;
  guardian_zone_id: number;
  control_type: string;
}): Promise<ControlMethod> {
  return apiRequest<ControlMethod>("/control_methods/", "POST", payload);
}

// Actualizar un método de control
export async function updateControlMethod(id: number, payload: Partial<ControlMethod>): Promise<ControlMethod> {
  return apiRequest<ControlMethod>(`/control_methods/${id}/`, "PATCH", payload);
}

// Eliminar un método de control por ID
export async function deleteControlMethod(id: number): Promise<void> {
  await apiRequest<void>(`/control_methods/${id}/`, "DELETE");
}