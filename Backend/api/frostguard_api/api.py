from typing import List

from django.shortcuts import get_object_or_404
from ninja import NinjaAPI, Schema

from frostguard_api.models import GuardianPositionData

api = NinjaAPI()

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
