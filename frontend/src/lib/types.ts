export type Lang = "es" | "en";

export type RiskLevel = "Low" | "Medium" | "High" | "Critical";
export type AlertSeverity = "info" | "warning" | "critical";

export interface SCurvePoint {
  period: string;
  planned_pct: number;
  actual_pct: number;
}

export interface RiskFactor {
  factor: string;
  impact_days: number;
  description: string;
}

export interface ScheduleAlert {
  date: string;
  severity: AlertSeverity;
  message: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  project_type: string;
  location: string;
  start_date: string;
  planned_end_date: string;
  forecast_end_date: string;
  percent_complete_planned: number;
  percent_complete_actual: number;
  delay_risk_score: number;
  risk_level: RiskLevel;
  contributing_factors: RiskFactor[];
  s_curve: SCurvePoint[];
  alerts: ScheduleAlert[];
}

export interface ScheduleSummary {
  active_projects: number;
  high_risk_projects: number;
  critical_risk_projects: number;
  total_predicted_delay_days: number;
  open_alerts: number;
}

export type InspectionResult = "Pass" | "Fail" | "Pending";
export type NCRSeverity = "Minor" | "Major" | "Critical";
export type NCRStatus = "Open" | "In Review" | "Closed";

export interface Inspection {
  id: string;
  project_id: string;
  project_name: string;
  discipline: string;
  checklist_item: string;
  result: InspectionResult;
  inspector: string;
  date: string;
  photo_count: number;
  signed_off_by: string | null;
}

export interface NonConformance {
  id: string;
  project_id: string;
  project_name: string;
  discipline: string;
  severity: NCRSeverity;
  description: string;
  raised_by: string;
  raised_date: string;
  status: NCRStatus;
  closed_date: string | null;
  root_cause: string | null;
}

export interface DisciplinePassRate {
  discipline: string;
  pass_rate: number;
  total_inspections: number;
}

export interface NCRTrendPoint {
  period: string;
  opened: number;
  closed: number;
}

export interface QASummary {
  total_inspections: number;
  overall_pass_rate: number;
  open_ncrs: number;
  critical_ncrs: number;
  pass_rate_by_discipline: DisciplinePassRate[];
  ncr_trend: NCRTrendPoint[];
}

export type EquipmentStatus = "Healthy" | "Warning" | "Critical";
export type Criticality = "Critical" | "High" | "Medium";

export interface SensorPoint {
  timestamp: string;
  vibration_mm_s: number;
  temperature_c: number;
  pressure_bar: number;
}

export interface MaintenanceAlert {
  date: string;
  severity: AlertSeverity;
  message: string;
}

export interface Equipment {
  id: string;
  name: string;
  equipment_type: string;
  project_id: string;
  project_name: string;
  location: string;
  criticality: Criticality;
  status: EquipmentStatus;
  health_score: number;
  remaining_useful_life_days: number;
  predicted_failure_mode: string | null;
  last_inspection: string;
  sensor_history: SensorPoint[];
  alerts: MaintenanceAlert[];
}

export interface MaintenanceSummary {
  total_equipment: number;
  healthy: number;
  warning: number;
  critical: number;
  average_health_score: number;
}

export interface OverviewAlert {
  module: string;
  severity: string;
  message: string;
  date: string;
}

export interface Overview {
  schedule: ScheduleSummary;
  qa: QASummary;
  maintenance: MaintenanceSummary;
  top_alerts: OverviewAlert[];
}
