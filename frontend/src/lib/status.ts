import type { EquipmentStatus, NCRSeverity, NCRStatus, RiskLevel } from "./types";

export type StatusTone = "good" | "warning" | "serious" | "critical";

export const STATUS_COLORS: Record<StatusTone, string> = {
  good: "#0ca30c",
  warning: "#fab219",
  serious: "#ec835a",
  critical: "#d03b3b",
};

export function riskLevelStatus(level: RiskLevel): StatusTone {
  switch (level) {
    case "Low":
      return "good";
    case "Medium":
      return "warning";
    case "High":
      return "serious";
    case "Critical":
      return "critical";
  }
}

export function equipmentStatus(status: EquipmentStatus): StatusTone {
  switch (status) {
    case "Healthy":
      return "good";
    case "Warning":
      return "warning";
    case "Critical":
      return "critical";
  }
}

export function ncrSeverityStatus(severity: NCRSeverity): StatusTone {
  switch (severity) {
    case "Minor":
      return "warning";
    case "Major":
      return "serious";
    case "Critical":
      return "critical";
  }
}

export function ncrStatusStatus(status: NCRStatus): StatusTone {
  switch (status) {
    case "Closed":
      return "good";
    case "In Review":
      return "warning";
    case "Open":
      return "serious";
  }
}

export function alertSeverityStatus(severity: string): StatusTone {
  switch (severity) {
    case "info":
      return "good";
    case "critical":
      return "critical";
    default:
      return "warning";
  }
}
