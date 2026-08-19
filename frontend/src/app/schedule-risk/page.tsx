"use client";

import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { Card } from "@/components/ui/Card";
import { AlertList } from "@/components/ui/AlertList";
import { SCurveChart } from "@/components/charts/SCurveChart";
import { ProjectTable } from "@/components/schedule/ProjectTable";
import { StreamingInsightPanel } from "@/components/ai/StreamingInsightPanel";
import { api } from "@/lib/api";
import { useLanguage } from "@/lib/i18n";
import { alertSeverityStatus } from "@/lib/status";
import type { Project, ScheduleSummary } from "@/lib/types";

export default function ScheduleRiskPage() {
  const { lang, t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [summary, setSummary] = useState<ScheduleSummary | null>(null);
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    api
      .projects(lang)
      .then((data) => {
        setProjects(data);
        setSelectedId((current) => {
          if (current && data.some((p) => p.id === current)) return current;
          const highestRisk = [...data].sort((a, b) => b.delay_risk_score - a.delay_risk_score)[0];
          return highestRisk ? highestRisk.id : "";
        });
      })
      .catch(console.error);
    api.scheduleSummary().then(setSummary).catch(console.error);
  }, [lang]);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedId) ?? null,
    [projects, selectedId],
  );

  return (
    <div>
      <PageHeader title={t("schedule.title")} description={t("schedule.description")} />

      {summary ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label={t("schedule.stat.activeProjects")} value={summary.active_projects} />
          <StatCard
            label={t("schedule.stat.highRisk")}
            value={summary.high_risk_projects}
            attention={summary.high_risk_projects > 0}
          />
          <StatCard
            label={t("schedule.stat.totalDelay")}
            value={`${summary.total_predicted_delay_days} ${t("schedule.days")}`}
            attention={summary.total_predicted_delay_days > 60}
          />
          <StatCard label={t("schedule.stat.openAlerts")} value={summary.open_alerts} attention={summary.open_alerts > 3} />
        </div>
      ) : null}

      <div className="mt-6">
        <StreamingInsightPanel title={t("schedule.ai.title")} endpoint="/api/ai/schedule-briefing" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="mb-3 text-sm font-semibold text-brand-black">{t("schedule.portfolio.title")}</h2>
          <ProjectTable projects={projects} selectedId={selectedId} onSelect={setSelectedId} />
        </Card>
        <Card>
          <h2 className="mb-3 text-sm font-semibold text-brand-black">{t("schedule.alerts.title")}</h2>
          <AlertList
            alerts={projects.flatMap((project) =>
              project.alerts.map((alert, index) => ({
                key: `${project.id}-${index}`,
                tone: alertSeverityStatus(alert.severity),
                message: `${project.name}: ${alert.message}`,
                date: alert.date,
              })),
            )}
          />
        </Card>
      </div>

      {selectedProject ? (
        <Card className="mt-6">
          <div className="mb-3">
            <h2 className="text-sm font-semibold text-brand-black">
              {t("schedule.scurve.title")} — {selectedProject.name}
            </h2>
            <p className="text-xs text-neutral-400">
              {t("schedule.scurve.real")}: {selectedProject.percent_complete_actual}% ·{" "}
              {t("schedule.scurve.planned")}: {selectedProject.percent_complete_planned}% ·{" "}
              {t("schedule.scurve.risk")}: {selectedProject.delay_risk_score}/100
            </p>
          </div>
          <SCurveChart data={selectedProject.s_curve} />
          <div className="mt-4 border-t border-neutral-100 pt-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-400">
              {t("schedule.factors.title")}
            </h3>
            <ul className="space-y-1.5 text-sm text-neutral-600">
              {selectedProject.contributing_factors.map((factor) => (
                <li key={factor.factor}>
                  <span className="font-medium text-neutral-800">{factor.factor}</span>{" "}
                  <span className={factor.impact_days >= 0 ? "text-neutral-500" : "text-emerald-600"}>
                    ({factor.impact_days >= 0 ? "+" : ""}
                    {factor.impact_days}d)
                  </span>{" "}
                  — {factor.description}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      ) : null}
    </div>
  );
}
