from typing import List

from django.shortcuts import get_object_or_404
from ninja import NinjaAPI, Schema

from frostguard_api.models import GuardianPositionData, GuardianTelemetryData, GuardianAlert, GuardianZone
from datetime import datetime

api = NinjaAPI()

## Guardian Position Data

class GuardianPositionDataSchema(Schema):
    id: int
    sender: str
    altitude: int
    latitude_i: float
    longitude_i: float
    guardian_zone_id: int


class CreateGuardianPositionDataSchema(Schema):
    sender: str
    altitude: int
    latitude_i: float
    longitude_i: float
    guardian_zone_id: int


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
    timestamp: datetime


class CreateGuardianTelemetryDataSchema(Schema):
    sender: str
    barometric_pressure: float
    relative_humidity: float
    temperature: float
    timestamp: datetime


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


## Guardian Alert

class GuardianAlertSchema(Schema):
    id: int
    start_datetime: datetime
    end_datetime: datetime
    message_recommendation: str
    guardian_zone_id: int


@api.get("/guardian_alerts", response=List[GuardianAlertSchema])  # List endpoint
def list_guardian_alerts(request):
    return list(GuardianAlert.objects.all())


@api.get("/guardian_alerts/{guardian_alert_id}", response=GuardianAlertSchema)  # Retrieve endpoint
def get_guardian_alert(request, guardian_alert_id: int):
    guardian_alert = get_object_or_404(GuardianAlert, id=guardian_alert_id)
    return guardian_alert


## Guardian Zone

class GuardianZoneSchema(Schema):
    id: int
    name: str


class CreateGuardianZoneSchema(Schema):
    name: str


@api.get("/guardian_zones", response=List[GuardianZoneSchema])  # List endpoint
def list_guardian_zones(request):
    return list(GuardianZone.objects.all())


@api.get("/guardian_zones/{guardian_zone_id}", response=GuardianZoneSchema)  # Retrieve endpoint
def get_guardian_zone(request, guardian_zone_id: int):
    guardian_zone = get_object_or_404(GuardianZone, id=guardian_zone_id)
    return guardian_zone


@api.post("/guardian_zones", response=GuardianZoneSchema)  # Create endpoint
def create_guardian_zone(request, payload: CreateGuardianZoneSchema):
    guardian_zone = GuardianZone.objects.create(**payload.dict())
    return guardian_zone


@api.put("/guardian_zones/{guardian_zone_id}", response=GuardianZoneSchema)  # Update endpoint
def update_guardian_zone(request, guardian_zone_id: int, payload: CreateGuardianZoneSchema):
    guardian_zone = get_object_or_404(GuardianZone, id=guardian_zone_id)
    for attr, value in payload.dict().items():
        setattr(guardian_zone, attr, value)
    guardian_zone.save()
    return guardian_zone


@api.delete("/guardian_zones/{guardian_zone_id}")  # Delete endpoint
def delete_guardian_zone(request, guardian_zone_id: int):
    guardian_zone = get_object_or_404(GuardianZone, id=guardian_zone_id)
    guardian_zone.delete()
    return {"success": True}