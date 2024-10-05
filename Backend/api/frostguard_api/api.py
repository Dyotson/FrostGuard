from typing import List

from django.shortcuts import get_object_or_404
from ninja import NinjaAPI, Schema

from frostguard_api.models import GuardianPositionData, GuardianTelemetryData

api = NinjaAPI()

## Guardian Position Data

class GuardianPositionDataSchema(Schema):
    id: int
    sender: str
    altitude: int
    latitude_i: int
    longitude_i: int


class CreateGuardianPositionDataSchema(Schema):
    sender: str
    altitude: int
    latitude_i: int
    longitude_i: int


@api.get("/status")
def status(request):
    return {"status": "ok", "message": "Backend is running"}


@api.get("/guardian_position_data", response=List[GuardianPositionDataSchema])
def list_guardian_position_data(request):
    return list(GuardianPositionData.objects.all())


@api.get("/guardian_position_data/{guardian_position_data_id}", response=GuardianPositionDataSchema)
def get_guardian_position_data(request, guardian_position_data_id: int):
    guardian_position_data = get_object_or_404(GuardianPositionData, id=guardian_position_data_id)
    return guardian_position_data


@api.post("/guardian_position_data", response=GuardianPositionDataSchema)
def create_guardian_position_data(request, payload: CreateGuardianPositionDataSchema):
    guardian_position_data = GuardianPositionData.objects.create(**payload.dict())
    return guardian_position_data


@api.put("/guardian_position_data/{guardian_position_data_id}", response=GuardianPositionDataSchema)
def update_guardian_position_data(request, guardian_position_data_id: int, payload: CreateGuardianPositionDataSchema):
    guardian_position_data = get_object_or_404(GuardianPositionData, id=guardian_position_data_id)
    for attr, value in payload.dict().items():
        setattr(guardian_position_data, attr, value)
    guardian_position_data.save()
    return guardian_position_data


@api.delete("/guardian_position_data/{guardian_position_data_id}")
def delete_guardian_position_data(request, guardian_position_data_id: int):
    guardian_position_data = get_object_or_404(GuardianPositionData, id=guardian_position_data_id)
    guardian_position_data.delete()
    return {"success": True}



## Guardian Telemtry Data


class GuardianTelemetryDataSchema(Schema):
    id: int
    sender: str
    barometric_pressure: float
    relative_humidity: float
    temperature: float
    timestamp: str  # Use appropriate format for datetime


class CreateGuardianTelemetryDataSchema(Schema):
    sender: str
    barometric_pressure: float
    relative_humidity: float
    temperature: float
    timestamp: str  # Use appropriate format for datetime


@api.get("/guardian_telemetry_data", response=List[GuardianTelemetryDataSchema])
def list_guardian_telemetry_data(request):
    return list(GuardianTelemetryData.objects.all())


@api.get("/guardian_telemetry_data/{guardian_telemetry_data_id}", response=GuardianTelemetryDataSchema)
def get_guardian_telemetry_data(request, guardian_telemetry_data_id: int):
    guardian_telemetry_data = get_object_or_404(GuardianTelemetryData, id=guardian_telemetry_data_id)
    return guardian_telemetry_data


@api.post("/guardian_telemetry_data", response=GuardianTelemetryDataSchema)
def create_guardian_telemetry_data(request, payload: CreateGuardianTelemetryDataSchema):
    guardian_telemetry_data = GuardianTelemetryData.objects.create(**payload.dict())
    return guardian_telemetry_data


@api.put("/guardian_telemetry_data/{guardian_telemetry_data_id}", response=GuardianTelemetryDataSchema)
def update_guardian_telemetry_data(request, guardian_telemetry_data_id: int, payload: CreateGuardianTelemetryDataSchema):
    guardian_telemetry_data = get_object_or_404(GuardianTelemetryData, id=guardian_telemetry_data_id)
    for attr, value in payload.dict().items():
        setattr(guardian_telemetry_data, attr, value)
    guardian_telemetry_data.save()
    return guardian_telemetry_data


@api.delete("/guardian_telemetry_data/{guardian_telemetry_data_id}")
def delete_guardian_telemetry_data(request, guardian_telemetry_data_id: int):
    guardian_telemetry_data = get_object_or_404(GuardianTelemetryData, id=guardian_telemetry_data_id)
    guardian_telemetry_data.delete()
    return {"success": True}
