from typing import Literal

from fastapi import APIRouter, HTTPException

from app.data.equipment_data import get_equipment as fetch_equipment
from app.models.maintenance import Equipment, MaintenanceSummary
from app.services import maintenance_service

router = APIRouter(prefix="/api/maintenance", tags=["maintenance"])


@router.get("/equipment", response_model=list[Equipment])
def get_equipment_list(lang: Literal["es", "en"] = "es") -> list[Equipment]:
    return maintenance_service.list_equipment(lang)


@router.get("/summary", response_model=MaintenanceSummary)
def get_summary() -> MaintenanceSummary:
    return maintenance_service.get_summary()


@router.get("/equipment/{equipment_id}", response_model=Equipment)
def get_equipment_detail(equipment_id: str, lang: Literal["es", "en"] = "es") -> Equipment:
    equipment = fetch_equipment(equipment_id, lang)
    if equipment is None:
        raise HTTPException(status_code=404, detail="Equipment not found")
    return equipment
