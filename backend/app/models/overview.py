from pydantic import BaseModel

from app.models.maintenance import MaintenanceSummary
from app.models.qa import QASummary
from app.models.schedule import ScheduleSummary


class OverviewAlert(BaseModel):
    module: str
    severity: str
    message: str
    date: str


class Overview(BaseModel):
    schedule: ScheduleSummary
    qa: QASummary
    maintenance: MaintenanceSummary
    top_alerts: list[OverviewAlert]
