from typing import Literal

from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from app.services import ai_service, maintenance_service, qa_service, schedule_service

router = APIRouter(prefix="/api/ai", tags=["ai"])

_SCHEDULE_SYSTEM_PROMPT_ES = (
    "Sos un analista senior de control de proyectos EPC (Engineering, Procurement, Construction). "
    "A partir de los datos de cartera de proyectos que te paso, redactá un briefing de riesgo de "
    "cronograma breve (4-6 oraciones), en español, para un director de operaciones. Priorizá los "
    "proyectos de mayor riesgo, explicá las causas raíz principales y sugerí una acción concreta. "
    "No inventes datos que no estén en el contexto. No uses títulos ni markdown, solo texto corrido."
)

_SCHEDULE_SYSTEM_PROMPT_EN = (
    "You are a senior EPC (Engineering, Procurement, Construction) project controls analyst. Using "
    "the project portfolio data provided below (it may contain Spanish field values), write a brief "
    "schedule risk briefing (4-6 sentences), in English, for an operations director. Prioritize the "
    "highest-risk projects, explain the main root causes, and suggest one concrete action. Do not "
    "invent data that isn't in the context. No titles or markdown, plain prose only."
)

_QA_SYSTEM_PROMPT_ES = (
    "Sos un gerente de calidad (QA/QC) de una constructora EPC. A partir de las métricas de "
    "inspecciones y no conformidades que te paso, redactá un resumen ejecutivo breve (4-6 oraciones), "
    "en español, para el director de operaciones. Destacá tendencias de calidad por disciplina y las "
    "no conformidades abiertas más críticas. No inventes datos. No uses títulos ni markdown, solo "
    "texto corrido."
)

_QA_SYSTEM_PROMPT_EN = (
    "You are the QA/QC manager of an EPC construction contractor. Using the inspection and "
    "non-conformance metrics provided below (they may contain Spanish field values), write a brief "
    "executive summary (4-6 sentences), in English, for the operations director. Highlight quality "
    "trends by discipline and the most critical open non-conformances. Do not invent data. No titles "
    "or markdown, plain prose only."
)

_MAINTENANCE_SYSTEM_PROMPT_ES = (
    "Sos un ingeniero de confiabilidad senior. A partir del estado de los equipos críticos que te "
    "paso, redactá un aviso de mantenimiento predictivo breve (4-6 oraciones), en español, para el "
    "gerente de mantenimiento. Priorizá los equipos con mayor riesgo de falla, explicá el modo de "
    "falla previsto y recomendá una ventana de intervención. No inventes datos. No uses títulos ni "
    "markdown, solo texto corrido."
)

_MAINTENANCE_SYSTEM_PROMPT_EN = (
    "You are a senior reliability engineer. Using the critical equipment status provided below (it "
    "may contain Spanish field values), write a brief predictive maintenance advisory (4-6 "
    "sentences), in English, for the maintenance manager. Prioritize the equipment at highest risk "
    "of failure, explain the predicted failure mode, and recommend an intervention window. Do not "
    "invent data. No titles or markdown, plain prose only."
)


@router.get("/schedule-briefing")
async def schedule_briefing(
    project_id: str | None = None, lang: Literal["es", "en"] = "es"
) -> StreamingResponse:
    context = schedule_service.build_briefing_context(project_id)
    system_prompt = _SCHEDULE_SYSTEM_PROMPT_EN if lang == "en" else _SCHEDULE_SYSTEM_PROMPT_ES
    return StreamingResponse(
        ai_service.stream_insight(system_prompt, context),
        media_type="text/plain",
    )


@router.get("/qa-summary")
async def qa_summary(lang: Literal["es", "en"] = "es") -> StreamingResponse:
    context = qa_service.build_summary_context()
    system_prompt = _QA_SYSTEM_PROMPT_EN if lang == "en" else _QA_SYSTEM_PROMPT_ES
    return StreamingResponse(
        ai_service.stream_insight(system_prompt, context),
        media_type="text/plain",
    )


@router.get("/maintenance-advisory")
async def maintenance_advisory(
    equipment_id: str | None = None, lang: Literal["es", "en"] = "es"
) -> StreamingResponse:
    context = maintenance_service.build_advisory_context(equipment_id)
    system_prompt = _MAINTENANCE_SYSTEM_PROMPT_EN if lang == "en" else _MAINTENANCE_SYSTEM_PROMPT_ES
    return StreamingResponse(
        ai_service.stream_insight(system_prompt, context),
        media_type="text/plain",
    )
