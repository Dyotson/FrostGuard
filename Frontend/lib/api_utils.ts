export interface GuardianPositionData {
  id: number;
  sender: string;
  altitude: number;
  latitude_i: number;
  longitude_i: number;
}

// Función genérica para manejar las solicitudes HTTP
async function apiRequest<T>(
  endpoint: string,
  method: string = "GET",
  payload?: any
): Promise<T> {
  const options: RequestInit = {
    method,
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: payload ? JSON.stringify(payload) : undefined,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    options
  );

  if (!response.ok) {
    throw new Error(`Error en la solicitud: ${response.statusText}`);
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


export interface FieldConfiguration {
  hasSprinklers: boolean;
  hasRoof: boolean;
  hasHeaters: boolean;
  hasFans: boolean;
  cropType: string;
  description: string;
}

// Función para crear una nueva configuración de campo
export async function createFieldConfiguration(
  payload: FieldConfiguration
): Promise<void> {
  await apiRequest<void>("/field_configuration", "POST", payload);
}

// Type for the Guardian Zone
type GuardianZone = {
  id: number;
  name: string;
};

// Type for the Alert
type Alert = {
  id: number;
  start_datetime: string;  // ISO string format
  end_datetime: string;    // ISO string format
  message_recommendation: string;
  active: boolean;
  guardian_zone: GuardianZone;
};

// Type for the Array of Alerts
type AlertsResponse = Alert[];

export async function fetchAlertsData(): Promise<AlertsResponse> {
  const response = await apiRequest<AlertsResponse>("/guardian_alerts", "GET");
  return response;
}