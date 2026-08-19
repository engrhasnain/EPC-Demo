"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { AlertList } from "@/components/ui/AlertList";
import { Card } from "@/components/ui/Card";
import { api } from "@/lib/api";
import { useLanguage } from "@/lib/i18n";
import { alertSeverityStatus } from "@/lib/status";
import type { Overview } from "@/lib/types";

export default function OverviewPage() {
  const { lang, t } = useLanguage();
  const [overview, setOverview] = useState<Overview | null>(null);

  useEffect(() => {
    api.overview(lang).then(setOverview).catch(console.error);
  }, [lang]);

  return (
    <div>
      <PageHeader title={t("overview.title")} description={t("overview.description")} />

      {!overview ? (
        <p className="text-sm text-neutral-400">{t("overview.loading")}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label={t("overview.stat.activeProjects")}
              value={overview.schedule.active_projects}
              hint={`${overview.schedule.high_risk_projects} ${lang === "en" ? "high or critical risk" : "en riesgo alto o crítico"}`}
              attention={overview.schedule.critical_risk_projects > 0}
            />
            <StatCard
              label={t("overview.stat.totalDelay")}
              value={`${overview.schedule.total_predicted_delay_days} ${t("schedule.days")}`}
              hint={t("overview.stat.totalDelay.hint")}
              attention={overview.schedule.total_predicted_delay_days > 60}
            />
            <StatCard
              label={t("overview.stat.openNcrs")}
              value={overview.qa.open_ncrs}
              hint={`${overview.qa.critical_ncrs} ${lang === "en" ? "critical" : "críticas"} · ${overview.qa.overall_pass_rate}% ${t("qa.stat.passRate").toLowerCase()}`}
              attention={overview.qa.critical_ncrs > 0}
            />
            <StatCard
              label={t("overview.stat.equipmentAtRisk")}
              value={overview.maintenance.warning + overview.maintenance.critical}
              hint={`${lang === "en" ? "of" : "de"} ${overview.maintenance.total_equipment} ${lang === "en" ? "monitored equipment" : "equipos monitoreados"}`}
              attention={overview.maintenance.critical > 0}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <h2 className="mb-3 text-sm font-semibold text-brand-black">{t("overview.alerts.title")}</h2>
              <AlertList
                alerts={overview.top_alerts.map((alert, index) => ({
                  key: `${alert.module}-${index}`,
                  tone: alertSeverityStatus(alert.severity),
                  message: alert.message,
                  date: alert.date,
                  module: alert.module,
                }))}
              />
            </Card>
            <Card>
              <h2 className="mb-3 text-sm font-semibold text-brand-black">{t("overview.explore.title")}</h2>
              <div className="flex flex-col gap-2 text-sm">
                <Link
                  href="/schedule-risk"
                  className="rounded-lg border border-neutral-200 px-3 py-2 font-medium text-neutral-700 transition-colors hover:border-brand-orange hover:text-brand-orange"
                >
                  {t("nav.schedule")} →
                </Link>
                <Link
                  href="/qa-qc"
                  className="rounded-lg border border-neutral-200 px-3 py-2 font-medium text-neutral-700 transition-colors hover:border-brand-orange hover:text-brand-orange"
                >
                  {t("nav.qa")} →
                </Link>
                <Link
                  href="/predictive-maintenance"
                  className="rounded-lg border border-neutral-200 px-3 py-2 font-medium text-neutral-700 transition-colors hover:border-brand-orange hover:text-brand-orange"
                >
                  {t("nav.maintenance")} →
                </Link>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
