from datetime import date

from app.data.projects_data import PROJECT_NAMES_EN
from app.models.qa import Inspection, NonConformance

_PROJECT_NAMES = {
    "proj-001": "Gasoducto Vaca Muerta Sur – Tramo 1",
    "proj-002": "Planta Compresora Salliqueló",
    "proj-003": "Litio Catamarca – Piletas y Ductos",
    "proj-004": "Reversión Plantas Compresoras – Gasoducto Norte",
}

DISCIPLINE_EN: dict[str, str] = {
    "Soldadura": "Welding",
    "Obra Civil": "Civil Works",
    "Electromecánico": "Electromechanical",
    "Cañerías": "Piping",
    "Ingeniería": "Engineering",
}

INSPECTIONS: list[Inspection] = [
    Inspection(id="insp-001", project_id="proj-001", project_name=_PROJECT_NAMES["proj-001"], discipline="Soldadura", checklist_item="Radiografiado de junta circunferencial — progresiva 12+400", result="Pass", inspector="M. Ibáñez", date=date(2026, 8, 12), photo_count=4, signed_off_by="R. Aguirre (QA Lead)"),
    Inspection(id="insp-002", project_id="proj-001", project_name=_PROJECT_NAMES["proj-001"], discipline="Soldadura", checklist_item="Ensayo de tintas penetrantes — junta km 43", result="Fail", inspector="M. Ibáñez", date=date(2026, 8, 13), photo_count=6, signed_off_by=None),
    Inspection(id="insp-003", project_id="proj-001", project_name=_PROJECT_NAMES["proj-001"], discipline="Obra Civil", checklist_item="Verificación de tapada mínima de zanja", result="Pass", inspector="L. Funes", date=date(2026, 8, 11), photo_count=3, signed_off_by="R. Aguirre (QA Lead)"),
    Inspection(id="insp-004", project_id="proj-001", project_name=_PROJECT_NAMES["proj-001"], discipline="Electromecánico", checklist_item="Torque de bridas — estación de bombeo km 42", result="Pass", inspector="D. Salcedo", date=date(2026, 8, 14), photo_count=5, signed_off_by="R. Aguirre (QA Lead)"),
    Inspection(id="insp-005", project_id="proj-001", project_name=_PROJECT_NAMES["proj-001"], discipline="Cañerías", checklist_item="Prueba hidrostática — spread 3", result="Pending", inspector="D. Salcedo", date=date(2026, 8, 16), photo_count=0, signed_off_by=None),
    Inspection(id="insp-006", project_id="proj-002", project_name=_PROJECT_NAMES["proj-002"], discipline="Electromecánico", checklist_item="Alineación láser — turbocompresor TG-2", result="Pass", inspector="C. Ríos", date=date(2026, 8, 10), photo_count=8, signed_off_by="P. Molina (QA Lead)"),
    Inspection(id="insp-007", project_id="proj-002", project_name=_PROJECT_NAMES["proj-002"], discipline="Soldadura", checklist_item="Inspección visual — cabezal de descarga", result="Pass", inspector="C. Ríos", date=date(2026, 8, 12), photo_count=3, signed_off_by="P. Molina (QA Lead)"),
    Inspection(id="insp-008", project_id="proj-002", project_name=_PROJECT_NAMES["proj-002"], discipline="Obra Civil", checklist_item="Nivelación de bases antivibratorias", result="Pass", inspector="L. Funes", date=date(2026, 8, 9), photo_count=2, signed_off_by="P. Molina (QA Lead)"),
    Inspection(id="insp-009", project_id="proj-003", project_name=_PROJECT_NAMES["proj-003"], discipline="Cañerías", checklist_item="Termofusión de cañería HDPE — pileta 4", result="Fail", inspector="N. Bazán", date=date(2026, 8, 13), photo_count=5, signed_off_by=None),
    Inspection(id="insp-010", project_id="proj-003", project_name=_PROJECT_NAMES["proj-003"], discipline="Cañerías", checklist_item="Termofusión de cañería HDPE — pileta 4 (reinspección)", result="Pass", inspector="N. Bazán", date=date(2026, 8, 15), photo_count=5, signed_off_by="V. Cardozo (QA Lead)"),
    Inspection(id="insp-011", project_id="proj-003", project_name=_PROJECT_NAMES["proj-003"], discipline="Obra Civil", checklist_item="Compactación de base de pileta de evaporación", result="Pass", inspector="L. Funes", date=date(2026, 8, 8), photo_count=4, signed_off_by="V. Cardozo (QA Lead)"),
    Inspection(id="insp-012", project_id="proj-004", project_name=_PROJECT_NAMES["proj-004"], discipline="Soldadura", checklist_item="Radiografiado — colector de succión CC-1", result="Fail", inspector="M. Ibáñez", date=date(2026, 8, 14), photo_count=6, signed_off_by=None),
    Inspection(id="insp-013", project_id="proj-004", project_name=_PROJECT_NAMES["proj-004"], discipline="Electromecánico", checklist_item="Verificación de instrumentación de vibración CC-1", result="Pass", inspector="D. Salcedo", date=date(2026, 8, 15), photo_count=3, signed_off_by="J. Peralta (QA Lead)"),
    Inspection(id="insp-014", project_id="proj-004", project_name=_PROJECT_NAMES["proj-004"], discipline="Obra Civil", checklist_item="Verificación de anclaje de bancada — planta Deán Funes", result="Pass", inspector="L. Funes", date=date(2026, 8, 7), photo_count=2, signed_off_by="J. Peralta (QA Lead)"),
    Inspection(id="insp-015", project_id="proj-004", project_name=_PROJECT_NAMES["proj-004"], discipline="Cañerías", checklist_item="Prueba hidrostática — colector de descarga", result="Pending", inspector="D. Salcedo", date=date(2026, 8, 17), photo_count=0, signed_off_by=None),
    Inspection(id="insp-016", project_id="proj-002", project_name=_PROJECT_NAMES["proj-002"], discipline="Cañerías", checklist_item="Prueba hidrostática final — línea de descarga", result="Pass", inspector="N. Bazán", date=date(2026, 8, 16), photo_count=4, signed_off_by="P. Molina (QA Lead)"),
]

NON_CONFORMANCES: list[NonConformance] = [
    NonConformance(id="ncr-001", project_id="proj-001", project_name=_PROJECT_NAMES["proj-001"], discipline="Soldadura", severity="Major", description="Indicación lineal en ensayo de tintas penetrantes, junta circunferencial km 43.", raised_by="M. Ibáñez", raised_date=date(2026, 8, 13), status="Open", closed_date=None, root_cause=None),
    NonConformance(id="ncr-002", project_id="proj-003", project_name=_PROJECT_NAMES["proj-003"], discipline="Cañerías", severity="Major", description="Fusión incompleta detectada en unión termofusionada HDPE, pileta de evaporación 4.", raised_by="N. Bazán", raised_date=date(2026, 8, 13), status="Closed", closed_date=date(2026, 8, 15), root_cause="Parámetro de temperatura de fusión fuera de especificación por falla de calibración del equipo."),
    NonConformance(id="ncr-003", project_id="proj-004", project_name=_PROJECT_NAMES["proj-004"], discipline="Soldadura", severity="Critical", description="Porosidad agrupada en radiografiado del colector de succión de CC-1.", raised_by="M. Ibáñez", raised_date=date(2026, 8, 14), status="Open", closed_date=None, root_cause=None),
    NonConformance(id="ncr-004", project_id="proj-004", project_name=_PROJECT_NAMES["proj-004"], discipline="Ingeniería", severity="Major", description="28 RFI de diseño de proceso sin respuesta por más de 20 días, bloqueando emisión de isométricos.", raised_by="J. Peralta", raised_date=date(2026, 8, 1), status="In Review", closed_date=None, root_cause="Cuello de botella en la oficina técnica del cliente."),
    NonConformance(id="ncr-005", project_id="proj-001", project_name=_PROJECT_NAMES["proj-001"], discipline="Electromecánico", severity="Minor", description="Torque de 3 bridas secundarias por debajo del valor especificado en estación km 42.", raised_by="D. Salcedo", raised_date=date(2026, 8, 5), status="Closed", closed_date=date(2026, 8, 6), root_cause="Llave dinamométrica fuera de calibración; reemplazada y bridas retorqueadas."),
    NonConformance(id="ncr-006", project_id="proj-002", project_name=_PROJECT_NAMES["proj-002"], discipline="Obra Civil", severity="Minor", description="Desviación menor de nivelación en base antivibratoria de TG-2.", raised_by="L. Funes", raised_date=date(2026, 7, 28), status="Closed", closed_date=date(2026, 7, 30), root_cause="Asentamiento inicial de hormigón; corregido con calzado de precisión."),
    NonConformance(id="ncr-007", project_id="proj-003", project_name=_PROJECT_NAMES["proj-003"], discipline="Obra Civil", severity="Major", description="Espesor de geomembrana por debajo de especificación en sector norte de pileta 2.", raised_by="V. Cardozo", raised_date=date(2026, 8, 4), status="In Review", closed_date=None, root_cause=None),
    NonConformance(id="ncr-008", project_id="proj-004", project_name=_PROJECT_NAMES["proj-004"], discipline="Cañerías", severity="Minor", description="Identificación de línea faltante en 4 tramos de cañería auxiliar.", raised_by="D. Salcedo", raised_date=date(2026, 8, 9), status="Closed", closed_date=date(2026, 8, 10), root_cause="Omisión en checklist de pintura e identificación; se incorporó ítem de verificación adicional."),
    NonConformance(id="ncr-009", project_id="proj-001", project_name=_PROJECT_NAMES["proj-001"], discipline="Soldadura", severity="Major", description="Reparación de soldadura no documentada previa a radiografiado, junta km 39.", raised_by="R. Aguirre", raised_date=date(2026, 7, 30), status="Closed", closed_date=date(2026, 8, 3), root_cause="Falta de adherencia al procedimiento de registro de reparaciones; se reforzó la capacitación a la cuadrilla."),
]

INSPECTION_TRANSLATIONS_EN: dict[str, str] = {
    "insp-001": "Radiographic testing of circumferential weld — chainage 12+400",
    "insp-002": "Dye penetrant testing — weld at km 43",
    "insp-003": "Minimum trench cover verification",
    "insp-004": "Flange torque check — km 42 pumping station",
    "insp-005": "Hydrostatic test — spread 3",
    "insp-006": "Laser alignment — TG-2 turbocompressor",
    "insp-007": "Visual inspection — discharge header",
    "insp-008": "Anti-vibration base leveling",
    "insp-009": "HDPE pipe thermofusion — pond 4",
    "insp-010": "HDPE pipe thermofusion — pond 4 (re-inspection)",
    "insp-011": "Evaporation pond base compaction",
    "insp-012": "Radiographic testing — CC-1 suction header",
    "insp-013": "CC-1 vibration instrumentation check",
    "insp-014": "Foundation anchoring verification — Deán Funes plant",
    "insp-015": "Hydrostatic test — discharge header",
    "insp-016": "Final hydrostatic test — discharge line",
}

NCR_TRANSLATIONS_EN: dict[str, dict] = {
    "ncr-001": {"description": "Linear indication in dye penetrant test, circumferential weld at km 43.", "root_cause": None},
    "ncr-002": {"description": "Incomplete fusion detected in HDPE thermofused joint, evaporation pond 4.", "root_cause": "Fusion temperature parameter out of specification due to equipment calibration failure."},
    "ncr-003": {"description": "Clustered porosity in radiographic testing of the CC-1 suction header.", "root_cause": None},
    "ncr-004": {"description": "28 process design RFIs unanswered for more than 20 days, blocking isometric issuance.", "root_cause": "Bottleneck in the client's technical office."},
    "ncr-005": {"description": "Torque on 3 secondary flanges below the specified value at the km 42 station.", "root_cause": "Torque wrench out of calibration; replaced and flanges re-torqued."},
    "ncr-006": {"description": "Minor leveling deviation on the TG-2 anti-vibration base.", "root_cause": "Initial concrete settlement; corrected with precision shimming."},
    "ncr-007": {"description": "Geomembrane thickness below specification in the north sector of pond 2.", "root_cause": None},
    "ncr-008": {"description": "Missing line identification on 4 sections of auxiliary piping.", "root_cause": "Omission in the paint-and-identification checklist; an additional verification item was added."},
    "ncr-009": {"description": "Undocumented weld repair prior to radiographic testing, weld at km 39.", "root_cause": "Failure to follow the repair-recording procedure; crew retraining reinforced."},
}


def get_inspections(lang: str = "es") -> list[Inspection]:
    if lang != "en":
        return INSPECTIONS
    translated: list[Inspection] = []
    for inspection in INSPECTIONS:
        translated.append(
            inspection.model_copy(
                update={
                    "project_name": PROJECT_NAMES_EN.get(inspection.project_id, inspection.project_name),
                    "discipline": DISCIPLINE_EN.get(inspection.discipline, inspection.discipline),
                    "checklist_item": INSPECTION_TRANSLATIONS_EN.get(inspection.id, inspection.checklist_item),
                }
            )
        )
    return translated


def get_ncrs(lang: str = "es") -> list[NonConformance]:
    if lang != "en":
        return NON_CONFORMANCES
    translated: list[NonConformance] = []
    for ncr in NON_CONFORMANCES:
        override = NCR_TRANSLATIONS_EN.get(ncr.id, {})
        translated.append(
            ncr.model_copy(
                update={
                    "project_name": PROJECT_NAMES_EN.get(ncr.project_id, ncr.project_name),
                    "discipline": DISCIPLINE_EN.get(ncr.discipline, ncr.discipline),
                    "description": override.get("description", ncr.description),
                    "root_cause": override.get("root_cause", ncr.root_cause),
                }
            )
        )
    return translated
