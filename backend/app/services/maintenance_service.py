from app.data.equipment_data import EQUIPMENT, get_all_equipment, get_equipment
from app.models.maintenance import Equipment, MaintenanceSummary


def list_equipment(lang: str = "es") -> list[Equipment]:
    return get_all_equipment(lang)


def get_summary() -> MaintenanceSummary:
    healthy = [e for e in EQUIPMENT if e.status == "Healthy"]
    warning = [e for e in EQUIPMENT if e.status == "Warning"]
    critical = [e for e in EQUIPMENT if e.status == "Critical"]
    avg_health = round(sum(e.health_score for e in EQUIPMENT) / len(EQUIPMENT), 1) if EQUIPMENT else 0.0
    return MaintenanceSummary(
        total_equipment=len(EQUIPMENT),
        healthy=len(healthy),
        warning=len(warning),
        critical=len(critical),
        average_health_score=avg_health,
    )


def build_advisory_context(equipment_id: str | None = None) -> str:
    items = [get_equipment(equipment_id)] if equipment_id else EQUIPMENT
    items = [e for e in items if e is not None]
    lines = []
    for e in items:
        failure_mode = f"Modo de falla previsto: {e.predicted_failure_mode}. " if e.predicted_failure_mode else ""
        alerts = "; ".join(a.message for a in e.alerts) if e.alerts else "Sin alertas activas."
        lines.append(
            f"- {e.name} ({e.equipment_type}, {e.project_name}, criticidad {e.criticality}): "
            f"estado {e.status}, salud {e.health_score}/100, vida útil remanente estimada "
            f"{e.remaining_useful_life_days} días. {failure_mode}Alertas: {alerts}"
        )
    return "\n".join(lines)
