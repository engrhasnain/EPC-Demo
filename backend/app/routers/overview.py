from typing import Literal

from fastapi import APIRouter

from app.models.overview import Overview
from app.services import overview_service

router = APIRouter(prefix="/api/overview", tags=["overview"])


@router.get("", response_model=Overview)
def get_overview(lang: Literal["es", "en"] = "es") -> Overview:
    return overview_service.get_overview(lang)
