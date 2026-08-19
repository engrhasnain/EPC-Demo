"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Lang } from "./types";

type Dict = Record<string, string>;

const es: Dict = {
  "nav.overview": "Resumen",
  "nav.schedule": "Riesgo de Cronograma",
  "nav.qa": "QA/QC",
  "nav.maintenance": "Mantenimiento Predictivo",

  "overview.title": "Resumen de Operaciones",
  "overview.description":
    "Vista consolidada de riesgo de cronograma, calidad y mantenimiento predictivo en la cartera de proyectos EPC.",
  "overview.loading": "Cargando datos...",
  "overview.stat.activeProjects": "Proyectos activos",
  "overview.stat.totalDelay": "Desvío total proyectado",
  "overview.stat.totalDelay.hint": "Suma de brechas planificado vs. forecast",
  "overview.stat.openNcrs": "No conformidades abiertas",
  "overview.stat.equipmentAtRisk": "Equipos en riesgo",
  "overview.alerts.title": "Alertas prioritarias",
  "overview.explore.title": "Explorar módulos",

  "schedule.title": "Predicción de Desvíos de Cronograma",
  "schedule.description":
    "Modelos que anticipan demoras en proyectos EPC antes de que ocurran, con alertas tempranas.",
  "schedule.stat.activeProjects": "Proyectos activos",
  "schedule.stat.highRisk": "Riesgo alto o crítico",
  "schedule.stat.totalDelay": "Desvío total proyectado",
  "schedule.stat.openAlerts": "Alertas abiertas",
  "schedule.ai.title": "Briefing de riesgo — IA",
  "schedule.portfolio.title": "Cartera de proyectos",
  "schedule.alerts.title": "Alertas tempranas",
  "schedule.scurve.title": "Curva S",
  "schedule.scurve.real": "Real",
  "schedule.scurve.planned": "Planificado",
  "schedule.scurve.risk": "Riesgo",
  "schedule.factors.title": "Factores de riesgo",
  "schedule.table.project": "Proyecto",
  "schedule.table.type": "Tipo",
  "schedule.table.progress": "Avance",
  "schedule.table.deviation": "Desvío",
  "schedule.table.risk": "Riesgo",
  "schedule.table.plan": "plan.",
  "schedule.onTime": "En fecha",
  "schedule.days": "días",

  "qa.title": "Automatización de QA/QC",
  "qa.description": "Trazabilidad digital de inspecciones, reportes centralizados y reducción de errores humanos.",
  "qa.stat.totalInspections": "Inspecciones totales",
  "qa.stat.passRate": "Tasa de aprobación",
  "qa.stat.openNcrs": "No conformidades abiertas",
  "qa.stat.criticalNcrs": "NCR críticas",
  "qa.ai.title": "Resumen ejecutivo de calidad — IA",
  "qa.chart.passRateByDiscipline": "Aprobación por disciplina",
  "qa.chart.ncrTrend": "No conformidades por mes",
  "qa.ncrs.title": "No conformidades",
  "qa.inspections.title": "Registro de inspecciones",
  "qa.table.item": "Ítem",
  "qa.table.project": "Proyecto",
  "qa.table.discipline": "Disciplina",
  "qa.table.inspector": "Inspector",
  "qa.table.date": "Fecha",
  "qa.table.result": "Resultado",
  "qa.table.description": "Descripción",
  "qa.table.severity": "Severidad",
  "qa.table.status": "Estado",
  "qa.chart.opened": "Abiertas",
  "qa.chart.closed": "Cerradas",
  "qa.chart.approval": "Aprobación",

  "maintenance.title": "Mantenimiento Predictivo",
  "maintenance.description":
    "Algoritmos que detectan patrones de falla en equipos críticos, reduciendo costos y previniendo paradas no programadas.",
  "maintenance.stat.monitored": "Equipos monitoreados",
  "maintenance.stat.healthy": "Saludables",
  "maintenance.stat.warning": "En alerta",
  "maintenance.stat.critical": "Críticos",
  "maintenance.ai.title": "Aviso de mantenimiento — IA",
  "maintenance.equipment.title": "Registro de equipos",
  "maintenance.alerts.title": "Alertas de mantenimiento",
  "maintenance.trend.title": "Tendencia de vibración",
  "maintenance.health": "Salud",
  "maintenance.rul": "Vida útil remanente",
  "maintenance.failureMode": "Modo de falla previsto",
  "maintenance.table.equipment": "Equipo",
  "maintenance.table.project": "Proyecto",
  "maintenance.table.health": "Salud",
  "maintenance.table.rul": "Vida útil rem.",
  "maintenance.table.status": "Estado",
  "maintenance.readout.temperature": "Temperatura actual",
  "maintenance.readout.pressure": "Presión actual",
  "maintenance.readout.criticality": "Criticidad",
  "maintenance.readout.lastInspection": "Última inspección",
  "maintenance.threshold": "Umbral crítico",
  "maintenance.vibration": "Vibración",

  "ai.regenerate": "Regenerar",
  "ai.generating": "Generando...",
  "ai.error": "No se pudo generar el briefing. Verificá que la clave de IA del backend esté configurada y con saldo disponible.",

  "alerts.empty": "Sin alertas activas.",

  "footer.disclaimer": "Datos ilustrativos de demostración — no reflejan operaciones reales de Contreras.",
};

const en: Dict = {
  "nav.overview": "Overview",
  "nav.schedule": "Schedule Risk",
  "nav.qa": "QA/QC",
  "nav.maintenance": "Predictive Maintenance",

  "overview.title": "Operations Overview",
  "overview.description":
    "Consolidated view of schedule risk, quality, and predictive maintenance across the EPC project portfolio.",
  "overview.loading": "Loading data...",
  "overview.stat.activeProjects": "Active projects",
  "overview.stat.totalDelay": "Total projected slippage",
  "overview.stat.totalDelay.hint": "Sum of planned-vs-forecast gaps",
  "overview.stat.openNcrs": "Open non-conformances",
  "overview.stat.equipmentAtRisk": "Equipment at risk",
  "overview.alerts.title": "Priority alerts",
  "overview.explore.title": "Explore modules",

  "schedule.title": "Schedule Deviation Prediction",
  "schedule.description": "Models that anticipate EPC project delays before they occur, with early alerts.",
  "schedule.stat.activeProjects": "Active projects",
  "schedule.stat.highRisk": "High or critical risk",
  "schedule.stat.totalDelay": "Total projected slippage",
  "schedule.stat.openAlerts": "Open alerts",
  "schedule.ai.title": "AI risk briefing",
  "schedule.portfolio.title": "Project portfolio",
  "schedule.alerts.title": "Early alerts",
  "schedule.scurve.title": "S-curve",
  "schedule.scurve.real": "Actual",
  "schedule.scurve.planned": "Planned",
  "schedule.scurve.risk": "Risk",
  "schedule.factors.title": "Risk factors",
  "schedule.table.project": "Project",
  "schedule.table.type": "Type",
  "schedule.table.progress": "Progress",
  "schedule.table.deviation": "Deviation",
  "schedule.table.risk": "Risk",
  "schedule.table.plan": "plan.",
  "schedule.onTime": "On schedule",
  "schedule.days": "days",

  "qa.title": "QA/QC Automation",
  "qa.description": "Digital traceability of inspections, centralized reporting, and reduction of human errors.",
  "qa.stat.totalInspections": "Total inspections",
  "qa.stat.passRate": "Pass rate",
  "qa.stat.openNcrs": "Open non-conformances",
  "qa.stat.criticalNcrs": "Critical NCRs",
  "qa.ai.title": "AI quality executive summary",
  "qa.chart.passRateByDiscipline": "Pass rate by discipline",
  "qa.chart.ncrTrend": "Non-conformances by month",
  "qa.ncrs.title": "Non-conformances",
  "qa.inspections.title": "Inspection log",
  "qa.table.item": "Item",
  "qa.table.project": "Project",
  "qa.table.discipline": "Discipline",
  "qa.table.inspector": "Inspector",
  "qa.table.date": "Date",
  "qa.table.result": "Result",
  "qa.table.description": "Description",
  "qa.table.severity": "Severity",
  "qa.table.status": "Status",
  "qa.chart.opened": "Opened",
  "qa.chart.closed": "Closed",
  "qa.chart.approval": "Pass rate",

  "maintenance.title": "Predictive Maintenance",
  "maintenance.description":
    "Algorithms that detect failure patterns in critical equipment, lowering costs and preventing unplanned downtime.",
  "maintenance.stat.monitored": "Monitored equipment",
  "maintenance.stat.healthy": "Healthy",
  "maintenance.stat.warning": "In warning",
  "maintenance.stat.critical": "Critical",
  "maintenance.ai.title": "AI maintenance advisory",
  "maintenance.equipment.title": "Equipment log",
  "maintenance.alerts.title": "Maintenance alerts",
  "maintenance.trend.title": "Vibration trend",
  "maintenance.health": "Health",
  "maintenance.rul": "Remaining useful life",
  "maintenance.failureMode": "Predicted failure mode",
  "maintenance.table.equipment": "Equipment",
  "maintenance.table.project": "Project",
  "maintenance.table.health": "Health",
  "maintenance.table.rul": "Remaining life",
  "maintenance.table.status": "Status",
  "maintenance.readout.temperature": "Current temperature",
  "maintenance.readout.pressure": "Current pressure",
  "maintenance.readout.criticality": "Criticality",
  "maintenance.readout.lastInspection": "Last inspection",
  "maintenance.threshold": "Critical threshold",
  "maintenance.vibration": "Vibration",

  "ai.regenerate": "Regenerate",
  "ai.generating": "Generating...",
  "ai.error": "Couldn't generate the briefing. Check that the backend's AI key is configured and has available balance.",

  "alerts.empty": "No active alerts.",

  "footer.disclaimer": "Illustrative demo data — does not reflect Contreras' real operations.",
};

const DICTS: Record<Lang, Dict> = { es, en };

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");
  const t = (key: string) => DICTS[lang][key] ?? key;
  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
