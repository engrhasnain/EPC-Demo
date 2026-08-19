from datetime import date
from typing import Literal

from pydantic import BaseModel

InspectionResult = Literal["Pass", "Fail", "Pending"]
NCRSeverity = Literal["Minor", "Major", "Critical"]
NCRStatus = Literal["Open", "In Review", "Closed"]


class Inspection(BaseModel):
    id: str
    project_id: str
    project_name: str
    discipline: str
    checklist_item: str
    result: InspectionResult
    inspector: str
    date: date
    photo_count: int
    signed_off_by: str | None = None


class NonConformance(BaseModel):
    id: str
    project_id: str
    project_name: str
    discipline: str
    severity: NCRSeverity
    description: str
    raised_by: str
    raised_date: date
    status: NCRStatus
    closed_date: date | None = None
    root_cause: str | None = None


class DisciplinePassRate(BaseModel):
    discipline: str
    pass_rate: float
    total_inspections: int


class NCRTrendPoint(BaseModel):
    period: str
    opened: int
    closed: int


class QASummary(BaseModel):
    total_inspections: int
    overall_pass_rate: float
    open_ncrs: int
    critical_ncrs: int
    pass_rate_by_discipline: list[DisciplinePassRate]
    ncr_trend: list[NCRTrendPoint]
