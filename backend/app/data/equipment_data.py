import math
from datetime import date, datetime, timedelta

from app.data.projects_data import PROJECT_NAMES_EN
from app.models.maintenance import Equipment, MaintenanceAlert, SensorPoint

_ANCHOR = datetime(2026, 8, 17, 6, 0, 0)


def _sensor_history(
    days: int,
    base_vibration: float,
    base_temp: float,
    base_pressure: float,
    vibration_drift_per_day: float = 0.0,
    temp_drift_per_day: float = 0.0,
) -> list[SensorPoint]:
    points: list[SensorPoint] = []
    for i in range(days, 0, -1):
        ts = _ANCHOR - timedelta(days=i)
        elapsed = days - i
        wobble = math.sin(i * 0.9) * 0.15
        points.append(
            SensorPoint(
                timestamp=ts,
                vibration_mm_s=round(base_vibration + elapsed * vibration_drift_per_day + wobble, 2),
                temperature_c=round(base_temp + elapsed * temp_drift_per_day + wobble * 2, 1),
                pressure_bar=round(base_pressure + wobble * 0.3, 2),
            )
        )
    return points


EQUIPMENT: list[Equipment] = [
    Equipment(
        id="eq-001",
        name="Compresor Centrífugo CC-1",
        equipment_type="Centrifugal Compressor",
        project_id="proj-004",
        project_name="Reversión Plantas Compresoras – Gasoducto Norte",
        location="Planta Ferreyra, Córdoba",
        criticality="Critical",
        status="Warning",
        health_score=61,
        remaining_useful_life_days=45,
        predicted_failure_mode="Desgaste de rodamiento (bearing wear)",
        last_inspection=date(2026, 8, 10),
        sensor_history=_sensor_history(14, base_vibration=2.8, base_temp=68, base_pressure=41, vibration_drift_per_day=0.18, temp_drift_per_day=0.25),
        alerts=[
            MaintenanceAlert(date=date(2026, 8, 15), severity="warning", message="Firma de vibración compatible con desgaste temprano de rodamiento; tendencia sostenida hace 9 días."),
            MaintenanceAlert(date=date(2026, 8, 16), severity="warning", message="Temperatura de carcasa 6°C por encima de la línea base de los últimos 30 días."),
        ],
    ),
    Equipment(
        id="eq-002",
        name="Turbina a Gas TG-2",
        equipment_type="Gas Turbine Generator",
        project_id="proj-002",
        project_name="Planta Compresora Salliqueló",
        location="Planta Salliqueló, Buenos Aires",
        criticality="Critical",
        status="Healthy",
        health_score=92,
        remaining_useful_life_days=240,
        predicted_failure_mode=None,
        last_inspection=date(2026, 8, 14),
        sensor_history=_sensor_history(14, base_vibration=1.1, base_temp=54, base_pressure=38),
        alerts=[],
    ),
    Equipment(
        id="eq-003",
        name="Skid de Bombeo PB-3",
        equipment_type="Pump Skid",
        project_id="proj-001",
        project_name="Gasoducto Vaca Muerta Sur – Tramo 1",
        location="Estación de bombeo km 42, Neuquén",
        criticality="High",
        status="Critical",
        health_score=38,
        remaining_useful_life_days=12,
        predicted_failure_mode="Desalineación de eje (shaft misalignment)",
        last_inspection=date(2026, 8, 16),
        sensor_history=_sensor_history(14, base_vibration=3.4, base_temp=71, base_pressure=52, vibration_drift_per_day=0.32, temp_drift_per_day=0.3),
        alerts=[
            MaintenanceAlert(date=date(2026, 8, 13), severity="critical", message="Vibración radial supera el umbral crítico de 6 mm/s en el rango de frecuencia 1X."),
            MaintenanceAlert(date=date(2026, 8, 16), severity="critical", message="Vida útil remanente estimada por debajo de 14 días; se recomienda parada programada."),
        ],
    ),
    Equipment(
        id="eq-004",
        name="Válvula de Línea Principal MLV-14",
        equipment_type="Mainline Valve Station",
        project_id="proj-001",
        project_name="Gasoducto Vaca Muerta Sur – Tramo 1",
        location="km 87, Río Negro",
        criticality="High",
        status="Healthy",
        health_score=88,
        remaining_useful_life_days=310,
        predicted_failure_mode=None,
        last_inspection=date(2026, 8, 9),
        sensor_history=_sensor_history(14, base_vibration=0.6, base_temp=32, base_pressure=68),
        alerts=[],
    ),
    Equipment(
        id="eq-005",
        name="Generador Diésel de Respaldo GD-1",
        equipment_type="Backup Generator",
        project_id="proj-004",
        project_name="Reversión Plantas Compresoras – Gasoducto Norte",
        location="Planta Deán Funes, Córdoba",
        criticality="Medium",
        status="Warning",
        health_score=67,
        remaining_useful_life_days=60,
        predicted_failure_mode="Sobrecalentamiento por obstrucción de refrigeración",
        last_inspection=date(2026, 8, 8),
        sensor_history=_sensor_history(14, base_vibration=1.8, base_temp=75, base_pressure=12, vibration_drift_per_day=0.05, temp_drift_per_day=0.2),
        alerts=[
            MaintenanceAlert(date=date(2026, 8, 14), severity="warning", message="Temperatura de operación en alza sostenida; revisar sistema de refrigeración."),
        ],
    ),
]

EQUIPMENT_TRANSLATIONS_EN: dict[str, dict] = {
    "eq-001": {
        "name": "Centrifugal Compressor CC-1",
        "location": "Ferreyra Plant, Córdoba",
        "predicted_failure_mode": "Bearing wear",
        "alerts": [
            "Vibration signature consistent with early bearing wear; sustained trend for 9 days.",
            "Casing temperature 6°C above the last-30-days baseline.",
        ],
    },
    "eq-002": {
        "name": "Gas Turbine TG-2",
        "location": "Salliqueló Plant, Buenos Aires",
    },
    "eq-003": {
        "name": "Pump Skid PB-3",
        "location": "Pumping Station km 42, Neuquén",
        "predicted_failure_mode": "Shaft misalignment",
        "alerts": [
            "Radial vibration exceeds the 6 mm/s critical threshold in the 1X frequency band.",
            "Estimated remaining useful life below 14 days; a scheduled shutdown is recommended.",
        ],
    },
    "eq-004": {
        "name": "Mainline Valve MLV-14",
    },
    "eq-005": {
        "name": "Backup Diesel Generator GD-1",
        "location": "Deán Funes Plant, Córdoba",
        "predicted_failure_mode": "Overheating from cooling obstruction",
        "alerts": [
            "Sustained rising operating temperature; inspect the cooling system.",
        ],
    },
}


def get_all_equipment(lang: str = "es") -> list[Equipment]:
    if lang != "en":
        return EQUIPMENT
    translated: list[Equipment] = []
    for item in EQUIPMENT:
        override = EQUIPMENT_TRANSLATIONS_EN.get(item.id, {})
        alert_texts = override.get("alerts")
        alerts = (
            [a.model_copy(update={"message": msg}) for a, msg in zip(item.alerts, alert_texts)]
            if alert_texts
            else item.alerts
        )
        translated.append(
            item.model_copy(
                update={
                    "name": override.get("name", item.name),
                    "project_name": PROJECT_NAMES_EN.get(item.project_id, item.project_name),
                    "location": override.get("location", item.location),
                    "predicted_failure_mode": override.get("predicted_failure_mode", item.predicted_failure_mode),
                    "alerts": alerts,
                }
            )
        )
    return translated


def get_equipment(equipment_id: str, lang: str = "es") -> Equipment | None:
    return next((e for e in get_all_equipment(lang) if e.id == equipment_id), None)
