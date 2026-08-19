from typing import Literal

from fastapi import APIRouter

from app.models.qa import Inspection, NonConformance, QASummary
from app.services import qa_service

router = APIRouter(prefix="/api/qa", tags=["qa"])


@router.get("/inspections", response_model=list[Inspection])
def get_inspections(lang: Literal["es", "en"] = "es") -> list[Inspection]:
    return qa_service.list_inspections(lang)


@router.get("/ncrs", response_model=list[NonConformance])
def get_ncrs(lang: Literal["es", "en"] = "es") -> list[NonConformance]:
    return qa_service.list_ncrs(lang)


@router.get("/summary", response_model=QASummary)
def get_summary(lang: Literal["es", "en"] = "es") -> QASummary:
    return qa_service.get_summary(lang)
