from datetime import date
from typing import Literal

from pydantic import BaseModel

RiskLevel = Literal["Low", "Medium", "High", "Critical"]
AlertSeverity = Literal["info", "warning", "critical"]


class SCurvePoint(BaseModel):
    period: str
    planned_pct: float
    actual_pct: float


class RiskFactor(BaseModel):
    factor: str
    impact_days: int
    description: str


class ScheduleAlert(BaseModel):
    date: date
    severity: AlertSeverity
    message: str


class Project(BaseModel):
    id: str
    name: str
    client: str
    project_type: str
    location: str
    start_date: date
    planned_end_date: date
    forecast_end_date: date
    percent_complete_planned: float
    percent_complete_actual: float
    delay_risk_score: int
    risk_level: RiskLevel
    contributing_factors: list[RiskFactor]
    s_curve: list[SCurvePoint]
    alerts: list[ScheduleAlert]


class ScheduleSummary(BaseModel):
    active_projects: int
    high_risk_projects: int
    critical_risk_projects: int
    total_predicted_delay_days: int
    open_alerts: int
