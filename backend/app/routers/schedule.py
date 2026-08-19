from typing import Literal

from fastapi import APIRouter, HTTPException

from app.data.projects_data import get_project as fetch_project
from app.models.schedule import Project, ScheduleSummary
from app.services import schedule_service

router = APIRouter(prefix="/api/schedule", tags=["schedule"])


@router.get("/projects", response_model=list[Project])
def get_projects(lang: Literal["es", "en"] = "es") -> list[Project]:
    return schedule_service.list_projects(lang)


@router.get("/summary", response_model=ScheduleSummary)
def get_summary() -> ScheduleSummary:
    return schedule_service.get_summary()


@router.get("/projects/{project_id}", response_model=Project)
def get_project(project_id: str, lang: Literal["es", "en"] = "es") -> Project:
    project = fetch_project(project_id, lang)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project
