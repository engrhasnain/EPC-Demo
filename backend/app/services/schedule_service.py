from app.data.projects_data import PROJECTS, get_project, get_projects
from app.models.schedule import Project, ScheduleSummary


def list_projects(lang: str = "es") -> list[Project]:
    return get_projects(lang)


def get_summary() -> ScheduleSummary:
    high_risk = [p for p in PROJECTS if p.risk_level in ("High", "Critical")]
    critical_risk = [p for p in PROJECTS if p.risk_level == "Critical"]
    total_delay_days = sum((p.forecast_end_date - p.planned_end_date).days for p in PROJECTS)
    open_alerts = sum(len(p.alerts) for p in PROJECTS)
    return ScheduleSummary(
        active_projects=len(PROJECTS),
        high_risk_projects=len(high_risk),
        critical_risk_projects=len(critical_risk),
        total_predicted_delay_days=max(total_delay_days, 0),
        open_alerts=open_alerts,
    )


def build_briefing_context(project_id: str | None = None) -> str:
    projects = [get_project(project_id)] if project_id else PROJECTS
    projects = [p for p in projects if p is not None]
    lines = []
    for p in projects:
        gap = round(p.percent_complete_planned - p.percent_complete_actual, 1)
        delay_days = (p.forecast_end_date - p.planned_end_date).days
        factors = "; ".join(f"{f.factor} ({f.impact_days:+d}d)" for f in p.contributing_factors)
        lines.append(
            f"- {p.name} ({p.client}, {p.project_type}): {p.percent_complete_actual}% completado vs "
            f"{p.percent_complete_planned}% planificado (brecha {gap} pts). Riesgo: {p.risk_level} "
            f"({p.delay_risk_score}/100). Desvío proyectado: {delay_days} días. Factores: {factors}."
        )
    return "\n".join(lines)
