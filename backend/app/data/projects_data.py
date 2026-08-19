from datetime import date

from app.models.schedule import Project, RiskFactor, SCurvePoint, ScheduleAlert

PROJECTS: list[Project] = [
    Project(
        id="proj-001",
        name="Gasoducto Vaca Muerta Sur – Tramo 1",
        client="YPF",
        project_type="Gas Pipeline",
        location="Neuquén → Río Negro, Argentina",
        start_date=date(2026, 2, 1),
        planned_end_date=date(2027, 5, 31),
        forecast_end_date=date(2027, 8, 14),
        percent_complete_planned=58.0,
        percent_complete_actual=47.0,
        delay_risk_score=78,
        risk_level="High",
        contributing_factors=[
            RiskFactor(
                factor="Procurement — tubería API 5L X70",
                impact_days=34,
                description="Demoras en la importación de tubería de acero desde el proveedor internacional principal.",
            ),
            RiskFactor(
                factor="Clima — tramo cordillerano",
                impact_days=18,
                description="Precipitaciones por encima del promedio histórico redujeron los días productivos de zanjeo.",
            ),
            RiskFactor(
                factor="Subcontratista — montaje electromecánico",
                impact_days=12,
                description="Rendimiento por debajo de la curva base en 2 de los últimos 4 hitos de montaje.",
            ),
        ],
        s_curve=[
            SCurvePoint(period="Feb-26", planned_pct=4, actual_pct=4),
            SCurvePoint(period="Mar-26", planned_pct=11, actual_pct=10),
            SCurvePoint(period="Abr-26", planned_pct=19, actual_pct=17),
            SCurvePoint(period="May-26", planned_pct=28, actual_pct=24),
            SCurvePoint(period="Jun-26", planned_pct=37, actual_pct=31),
            SCurvePoint(period="Jul-26", planned_pct=47, actual_pct=39),
            SCurvePoint(period="Ago-26", planned_pct=58, actual_pct=47),
        ],
        alerts=[
            ScheduleAlert(date=date(2026, 7, 22), severity="critical", message="Proveedor de tubería confirma nueva demora de 15 días en el segundo embarque."),
            ScheduleAlert(date=date(2026, 8, 5), severity="warning", message="Brecha planificado-vs-real supera el umbral de 10 puntos porcentuales por tercera semana consecutiva."),
            ScheduleAlert(date=date(2026, 8, 14), severity="warning", message="Rendimiento del subcontratista de montaje 18% por debajo del objetivo en el último hito."),
        ],
    ),
    Project(
        id="proj-002",
        name="Planta Compresora Salliqueló",
        client="Transportadora de Gas del Sur",
        project_type="Compressor Plant",
        location="Salliqueló, Buenos Aires, Argentina",
        start_date=date(2025, 11, 1),
        planned_end_date=date(2026, 10, 15),
        forecast_end_date=date(2026, 10, 9),
        percent_complete_planned=82.0,
        percent_complete_actual=84.0,
        delay_risk_score=22,
        risk_level="Low",
        contributing_factors=[
            RiskFactor(
                factor="Procurement — entrega de turbocompresor",
                impact_days=-6,
                description="El fabricante adelantó la entrega del paquete de turbocompresión 6 días respecto del plan.",
            ),
            RiskFactor(
                factor="Productividad de obra civil",
                impact_days=-3,
                description="Cuadrillas de obra civil superando el rendimiento planificado en un 8%.",
            ),
        ],
        s_curve=[
            SCurvePoint(period="Mar-26", planned_pct=35, actual_pct=36),
            SCurvePoint(period="Abr-26", planned_pct=46, actual_pct=48),
            SCurvePoint(period="May-26", planned_pct=56, actual_pct=59),
            SCurvePoint(period="Jun-26", planned_pct=66, actual_pct=69),
            SCurvePoint(period="Jul-26", planned_pct=75, actual_pct=77),
            SCurvePoint(period="Ago-26", planned_pct=82, actual_pct=84),
        ],
        alerts=[
            ScheduleAlert(date=date(2026, 8, 10), severity="info", message="Proyecto 6 días adelantado respecto del cronograma base; sin acciones requeridas."),
        ],
    ),
    Project(
        id="proj-003",
        name="Litio Catamarca – Piletas y Ductos",
        client="Galaxy Lithium",
        project_type="Mining Infrastructure",
        location="Salar del Hombre Muerto, Catamarca, Argentina",
        start_date=date(2026, 3, 15),
        planned_end_date=date(2027, 2, 28),
        forecast_end_date=date(2027, 4, 20),
        percent_complete_planned=35.0,
        percent_complete_actual=29.0,
        delay_risk_score=51,
        risk_level="Medium",
        contributing_factors=[
            RiskFactor(
                factor="Procurement — cañería HDPE de gran diámetro",
                impact_days=15,
                description="Lead time del proveedor de cañerías HDPE revisado al alza tras cambio de especificación.",
            ),
            RiskFactor(
                factor="Productividad en altura",
                impact_days=9,
                description="Rendimiento de cuadrillas por debajo de la curva base por aclimatación a +3.900 msnm.",
            ),
            RiskFactor(
                factor="Permiso ambiental — enmienda de trazado",
                impact_days=7,
                description="Enmienda menor de trazado de ductos en revisión por autoridad ambiental provincial.",
            ),
        ],
        s_curve=[
            SCurvePoint(period="Abr-26", planned_pct=6, actual_pct=6),
            SCurvePoint(period="May-26", planned_pct=13, actual_pct=11),
            SCurvePoint(period="Jun-26", planned_pct=20, actual_pct=17),
            SCurvePoint(period="Jul-26", planned_pct=27, actual_pct=23),
            SCurvePoint(period="Ago-26", planned_pct=35, actual_pct=29),
        ],
        alerts=[
            ScheduleAlert(date=date(2026, 8, 12), severity="warning", message="Lead time revisado de cañería HDPE agrega 15 días al camino crítico si no se mitiga."),
        ],
    ),
    Project(
        id="proj-004",
        name="Reversión Plantas Compresoras – Gasoducto Norte",
        client="TGN / Secretaría de Energía",
        project_type="Compressor Plant",
        location="Ferreyra y Deán Funes, Córdoba, Argentina",
        start_date=date(2026, 6, 1),
        planned_end_date=date(2027, 9, 30),
        forecast_end_date=date(2028, 1, 18),
        percent_complete_planned=20.0,
        percent_complete_actual=9.0,
        delay_risk_score=89,
        risk_level="Critical",
        contributing_factors=[
            RiskFactor(
                factor="Backlog de RFI — diseño de proceso",
                impact_days=41,
                description="28 RFI de ingeniería de proceso sin responder por más de 20 días, bloqueando emisión de isométricos.",
            ),
            RiskFactor(
                factor="Procurement — turbocompresores de reversión",
                impact_days=37,
                description="Equipos de largo lead time con entrega revisada; fabricante reporta congestión en su planta.",
            ),
            RiskFactor(
                factor="Disputa laboral regional",
                impact_days=14,
                description="Paro sectorial de 6 días afectó a las cuadrillas de montaje en ambas plantas.",
            ),
        ],
        s_curve=[
            SCurvePoint(period="Jun-26", planned_pct=4, actual_pct=3),
            SCurvePoint(period="Jul-26", planned_pct=11, actual_pct=6),
            SCurvePoint(period="Ago-26", planned_pct=20, actual_pct=9),
        ],
        alerts=[
            ScheduleAlert(date=date(2026, 8, 1), severity="critical", message="Backlog de RFI de ingeniería alcanza 28 ítems; riesgo directo sobre la emisión de isométricos."),
            ScheduleAlert(date=date(2026, 8, 9), severity="critical", message="Brecha planificado-vs-real de 11 puntos porcentuales, la mayor de la cartera."),
            ScheduleAlert(date=date(2026, 8, 15), severity="warning", message="Fabricante de turbocompresores confirma congestión de planta; posible impacto adicional de 2-3 semanas."),
        ],
    ),
]

PROJECT_NAMES_EN: dict[str, str] = {
    "proj-001": "Vaca Muerta Sur Gas Pipeline – Section 1",
    "proj-002": "Salliqueló Compressor Plant",
    "proj-003": "Catamarca Lithium – Ponds and Pipelines",
    "proj-004": "Compressor Plant Reversal – Northern Gas Pipeline",
}

PROJECT_TRANSLATIONS_EN: dict[str, dict] = {
    "proj-001": {
        "contributing_factors": [
            {"factor": "Procurement — API 5L X70 line pipe", "description": "Delays in importing steel pipe from the main international supplier."},
            {"factor": "Weather — cordillera section", "description": "Above-average rainfall reduced productive trenching days."},
            {"factor": "Subcontractor — electromechanical erection", "description": "Performance below the baseline curve in 2 of the last 4 erection milestones."},
        ],
        "alerts": [
            {"message": "Pipe supplier confirms a new 15-day delay on the second shipment."},
            {"message": "Planned-vs-actual gap exceeds the 10-point threshold for a third consecutive week."},
            {"message": "Erection subcontractor performance 18% below target on the latest milestone."},
        ],
    },
    "proj-002": {
        "contributing_factors": [
            {"factor": "Procurement — turbocompressor delivery", "description": "The manufacturer delivered the turbocompression package 6 days ahead of plan."},
            {"factor": "Civil works productivity", "description": "Civil works crews outperforming the planned productivity rate by 8%."},
        ],
        "alerts": [
            {"message": "Project running 6 days ahead of baseline schedule; no action required."},
        ],
    },
    "proj-003": {
        "contributing_factors": [
            {"factor": "Procurement — large-diameter HDPE piping", "description": "HDPE pipe supplier lead time revised upward after a specification change."},
            {"factor": "High-altitude productivity", "description": "Crew productivity below the baseline curve due to acclimatization at +3,900 masl."},
            {"factor": "Environmental permit — routing amendment", "description": "Minor pipeline routing amendment under review by the provincial environmental authority."},
        ],
        "alerts": [
            {"message": "Revised HDPE pipe lead time adds 15 days to the critical path if not mitigated."},
        ],
    },
    "proj-004": {
        "contributing_factors": [
            {"factor": "RFI backlog — process design", "description": "28 process engineering RFIs unanswered for more than 20 days, blocking isometric issuance."},
            {"factor": "Procurement — reversal turbocompressors", "description": "Long-lead equipment with a revised delivery date; manufacturer reports plant congestion."},
            {"factor": "Regional labor dispute", "description": "A 6-day sector-wide strike affected erection crews at both plants."},
        ],
        "alerts": [
            {"message": "Engineering RFI backlog reaches 28 items; direct risk to isometric issuance."},
            {"message": "Planned-vs-actual gap of 11 percentage points, the largest in the portfolio."},
            {"message": "Turbocompressor manufacturer confirms plant congestion; possible additional 2-3 week impact."},
        ],
    },
}


def get_projects(lang: str = "es") -> list[Project]:
    if lang != "en":
        return PROJECTS
    translated: list[Project] = []
    for project in PROJECTS:
        override = PROJECT_TRANSLATIONS_EN.get(project.id, {})
        factors = [
            f.model_copy(update={"factor": t["factor"], "description": t["description"]})
            for f, t in zip(project.contributing_factors, override.get("contributing_factors", []))
        ] or project.contributing_factors
        alerts = [
            a.model_copy(update={"message": t["message"]})
            for a, t in zip(project.alerts, override.get("alerts", []))
        ] or project.alerts
        translated.append(
            project.model_copy(
                update={
                    "name": PROJECT_NAMES_EN.get(project.id, project.name),
                    "contributing_factors": factors,
                    "alerts": alerts,
                }
            )
        )
    return translated


def get_project(project_id: str, lang: str = "es") -> Project | None:
    return next((p for p in get_projects(lang) if p.id == project_id), None)
