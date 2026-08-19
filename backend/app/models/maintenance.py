from datetime import date, datetime
from typing import Literal

from pydantic import BaseModel

EquipmentStatus = Literal["Healthy", "Warning", "Critical"]
Criticality = Literal["Critical", "High", "Medium"]
AlertSeverity = Literal["info", "warning", "critical"]


class SensorPoint(BaseModel):
    timestamp: datetime
    vibration_mm_s: float
    temperature_c: float
    pressure_bar: float


class MaintenanceAlert(BaseModel):
    date: date
    severity: AlertSeverity
    message: str


class Equipment(BaseModel):
    id: str
    name: str
    equipment_type: str
    project_id: str
    project_name: str
    location: str
    criticality: Criticality
    status: EquipmentStatus
    health_score: int
    remaining_useful_life_days: int
    predicted_failure_mode: str | None = None
    last_inspection: date
    sensor_history: list[SensorPoint]
    alerts: list[MaintenanceAlert]


class MaintenanceSummary(BaseModel):
    total_equipment: int
    healthy: int
    warning: int
    critical: int
    average_health_score: float
