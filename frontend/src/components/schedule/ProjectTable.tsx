"use client";

import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/lib/i18n";
import { riskLevelStatus } from "@/lib/status";
import type { Project } from "@/lib/types";

interface ProjectTableProps {
  projects: Project[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ProjectTable({ projects, selectedId, onSelect }: ProjectTableProps) {
  const { t } = useLanguage();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-200 text-xs uppercase tracking-wide text-neutral-400">
            <th className="py-2 pr-4 font-medium">{t("schedule.table.project")}</th>
            <th className="py-2 pr-4 font-medium">{t("schedule.table.type")}</th>
            <th className="py-2 pr-4 font-medium">{t("schedule.table.progress")}</th>
            <th className="py-2 pr-4 font-medium">{t("schedule.table.deviation")}</th>
            <th className="py-2 pr-4 font-medium">{t("schedule.table.risk")}</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => {
            const delayDays = Math.round(
              (new Date(project.forecast_end_date).getTime() - new Date(project.planned_end_date).getTime()) /
                (1000 * 60 * 60 * 24),
            );
            return (
              <tr
                key={project.id}
                onClick={() => onSelect(project.id)}
                className={`cursor-pointer border-b border-neutral-100 transition-colors last:border-0 hover:bg-neutral-50 ${
                  selectedId === project.id ? "bg-orange-50/60" : ""
                }`}
              >
                <td className="py-3 pr-4">
                  <p className="font-medium text-neutral-800">{project.name}</p>
                  <p className="text-xs text-neutral-400">{project.client}</p>
                </td>
                <td className="py-3 pr-4 text-neutral-600">{project.project_type}</td>
                <td className="py-3 pr-4 text-neutral-600">
                  {project.percent_complete_actual}%{" "}
                  <span className="text-xs text-neutral-400">
                    / {project.percent_complete_planned}% {t("schedule.table.plan")}
                  </span>
                </td>
                <td className="py-3 pr-4 text-neutral-600">
                  {delayDays > 0
                    ? `+${delayDays} ${t("schedule.days")}`
                    : delayDays < 0
                      ? `${delayDays} ${t("schedule.days")}`
                      : t("schedule.onTime")}
                </td>
                <td className="py-3 pr-4">
                  <Badge tone={riskLevelStatus(project.risk_level)}>{project.risk_level}</Badge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
