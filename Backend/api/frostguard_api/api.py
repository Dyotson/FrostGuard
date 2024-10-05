from datetime import datetime
from typing import List

from django.shortcuts import get_object_or_404
from ninja import NinjaAPI, Router, Schema

from django.db.models import Max, Min
from collections import defaultdict

from frostguard_api.models import GuardianAlert, GuardianPositionData, GuardianTelemetryData, GuardianZone

# Instancia de la API principal
api = NinjaAPI()

# Routers para cada grupo de endpoints

## Router para Guardian Position Data
guardian_position_data_router = Router(tags=["Guardian Position Data"])


class GuardianZoneSchema(Schema):
    id: int
    name: str
    has_sprinklers: bool  
    has_roof: bool  
    has_heaters: bool  
    has_fans: bool  
    crop_type: str  
    description: str  
    coordinates: list  


class CreateGuardianZoneSchema(Schema):
    name: str
    has_sprinklers: bool  
    has_roof: bool  
    has_heaters: bool  
    has_fans: bool  
    crop_type: str  
    description: str  
    coordinates: list  


class GuardianPositionDataSchema(Schema):
    id: int
    sender: str
    altitude: int
    latitude_i: float
    longitude_i: float
    guardian_zone: GuardianZoneSchema


class CreateGuardianPositionDataSchema(Schema):
    sender: str
    altitude: int
    latitude_i: float
    longitude_i: float
    guardian_zone_id: int


@guardian_position_data_router.get("/", response=List[GuardianPositionDataSchema])
def list_guardian_position_data(request, zone_name: str = None):
    queryset = GuardianPositionData.objects.all()
    if zone_name:
        queryset = queryset.filter(guardian_zone__name__icontains=zone_name)
    return list(queryset)


@guardian_position_data_router.get("/{guardian_position_data_id}", response=GuardianPositionDataSchema)
def get_guardian_position_data(request, guardian_position_data_id: int):
    guardian_position_data = get_object_or_404(GuardianPositionData, id=guardian_position_data_id)
    return guardian_position_data


@guardian_position_data_router.post("/", response=GuardianPositionDataSchema)
def create_guardian_position_data(request, payload: CreateGuardianPositionDataSchema):
    guardian_position_data = GuardianPositionData.objects.create(**payload.dict())
    return guardian_position_data


@guardian_position_data_router.put("/{guardian_position_data_id}", response=GuardianPositionDataSchema)
def update_guardian_position_data(request, guardian_position_data_id: int, payload: CreateGuardianPositionDataSchema):
    guardian_position_data = get_object_or_404(GuardianPositionData, id=guardian_position_data_id)
    for attr, value in payload.dict().items():
        setattr(guardian_position_data, attr, value)
    guardian_position_data.save()
    return guardian_position_data


@guardian_position_data_router.delete("/{guardian_position_data_id}")
def delete_guardian_position_data(request, guardian_position_data_id: int):
    guardian_position_data = get_object_or_404(GuardianPositionData, id=guardian_position_data_id)
    guardian_position_data.delete()
    return {"success": True}


## Router para Guardian Telemetry Data
guardian_telemetry_data_router = Router(tags=["Guardian Telemetry Data"])


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


@guardian_telemetry_data_router.get("/", response=List[GuardianTelemetryDataSchema])
def list_guardian_telemetry_data(request):
    return list(GuardianTelemetryData.objects.all())


@guardian_telemetry_data_router.get("/most_recent_lowest_temperature", response=GuardianTelemetryDataSchema)
def get_most_recent_lowest_temperature(request):
    recent_data = GuardianTelemetryData.objects.values('sender').annotate(max_timestamp=Max('timestamp'))

    recent_telemetry = {}
    for data in recent_data:
        recent_telemetry[data['sender']] = GuardianTelemetryData.objects.filter(
            sender=data['sender'],
            timestamp=data['max_timestamp']
        ).first()

    lowest_temperature_data = min(recent_telemetry.values(), key=lambda x: x.temperature)
    
    return lowest_temperature_data


@guardian_telemetry_data_router.get("/{guardian_telemetry_data_id}", response=GuardianTelemetryDataSchema)
def get_guardian_telemetry_data(request, guardian_telemetry_data_id: int):
    guardian_telemetry_data = get_object_or_404(GuardianTelemetryData, id=guardian_telemetry_data_id)
    return guardian_telemetry_data


@guardian_telemetry_data_router.post("/", response=GuardianTelemetryDataSchema)
def create_guardian_telemetry_data(request, payload: CreateGuardianTelemetryDataSchema):
    guardian_telemetry_data = GuardianTelemetryData.objects.create(**payload.dict())
    return guardian_telemetry_data


@guardian_telemetry_data_router.put("/{guardian_telemetry_data_id}", response=GuardianTelemetryDataSchema)
def update_guardian_telemetry_data(
    request, guardian_telemetry_data_id: int, payload: CreateGuardianTelemetryDataSchema
):
    guardian_telemetry_data = get_object_or_404(GuardianTelemetryData, id=guardian_telemetry_data_id)
    for attr, value in payload.dict().items():
        setattr(guardian_telemetry_data, attr, value)
    guardian_telemetry_data.save()
    return guardian_telemetry_data


@guardian_telemetry_data_router.delete("/{guardian_telemetry_data_id}")
def delete_guardian_telemetry_data(request, guardian_telemetry_data_id: int):
    guardian_telemetry_data = get_object_or_404(GuardianTelemetryData, id=guardian_telemetry_data_id)
    guardian_telemetry_data.delete()
    return {"success": True}


## Router para Guardian Alerts
guardian_alerts_router = Router(tags=["Guardian Alerts"])


class GuardianAlertSchema(Schema):
    id: int
    start_datetime: datetime
    end_datetime: datetime
    message_recommendation: str
    active: bool
    guardian_zone: GuardianZoneSchema


@guardian_alerts_router.get("/", response=List[GuardianAlertSchema])
def list_guardian_alerts(request):
    return list(GuardianAlert.objects.all())


@guardian_alerts_router.get("/{guardian_alert_id}", response=GuardianAlertSchema)
def get_guardian_alert(request, guardian_alert_id: int):
    guardian_alert = get_object_or_404(GuardianAlert, id=guardian_alert_id)
    return guardian_alert


## Router para Guardian Zones
guardian_zones_router = Router(tags=["Guardian Zones"])


@guardian_zones_router.get("/", response=List[GuardianZoneSchema])
def list_guardian_zones(request, name: str = None):
    queryset = GuardianZone.objects.all()
    if name:
        queryset = queryset.filter(name__icontains=name)
    return list(queryset)


@guardian_zones_router.get("/{guardian_zone_id}", response=GuardianZoneSchema)
def get_guardian_zone(request, guardian_zone_id: int):
    guardian_zone = get_object_or_404(GuardianZone, id=guardian_zone_id)
    return guardian_zone


@guardian_zones_router.post("/", response=GuardianZoneSchema)
def create_guardian_zone(request, payload: CreateGuardianZoneSchema):
    guardian_zone = GuardianZone.objects.create(**payload.dict())
    return guardian_zone


@guardian_zones_router.put("/{guardian_zone_id}", response=GuardianZoneSchema)
def update_guardian_zone(request, guardian_zone_id: int, payload: CreateGuardianZoneSchema):
    guardian_zone = get_object_or_404(GuardianZone, id=guardian_zone_id)
    for attr, value in payload.dict().items():
        setattr(guardian_zone, attr, value)
    guardian_zone.save()
    return guardian_zone


@guardian_zones_router.delete("/{guardian_zone_id}")
def delete_guardian_zone(request, guardian_zone_id: int):
    guardian_zone = get_object_or_404(GuardianZone, id=guardian_zone_id)
    guardian_zone.delete()
    return {"success": True}


api.add_router("/guardian_position_data", guardian_position_data_router)
api.add_router("/guardian_telemetry_data", guardian_telemetry_data_router)
api.add_router("/guardian_alerts", guardian_alerts_router)
api.add_router("/guardian_zones", guardian_zones_router)


@api.get("/status")
def status(request):
    return {"status": "ok", "message": "Backend is running"}
