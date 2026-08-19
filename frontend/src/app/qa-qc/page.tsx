"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { Card } from "@/components/ui/Card";
import { DisciplinePassRateChart } from "@/components/charts/DisciplinePassRateChart";
import { NcrTrendChart } from "@/components/charts/NcrTrendChart";
import { InspectionTable } from "@/components/qa/InspectionTable";
import { NcrTable } from "@/components/qa/NcrTable";
import { StreamingInsightPanel } from "@/components/ai/StreamingInsightPanel";
import { api } from "@/lib/api";
import { useLanguage } from "@/lib/i18n";
import type { Inspection, NonConformance, QASummary } from "@/lib/types";

export default function QaQcPage() {
  const { lang, t } = useLanguage();
  const [summary, setSummary] = useState<QASummary | null>(null);
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [ncrs, setNcrs] = useState<NonConformance[]>([]);

  useEffect(() => {
    api.qaSummary(lang).then(setSummary).catch(console.error);
    api.inspections(lang).then(setInspections).catch(console.error);
    api.ncrs(lang).then(setNcrs).catch(console.error);
  }, [lang]);

  return (
    <div>
      <PageHeader title={t("qa.title")} description={t("qa.description")} />

      {summary ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label={t("qa.stat.totalInspections")} value={summary.total_inspections} />
          <StatCard
            label={t("qa.stat.passRate")}
            value={`${summary.overall_pass_rate}%`}
            attention={summary.overall_pass_rate < 80}
          />
          <StatCard label={t("qa.stat.openNcrs")} value={summary.open_ncrs} attention={summary.open_ncrs > 0} />
          <StatCard label={t("qa.stat.criticalNcrs")} value={summary.critical_ncrs} attention={summary.critical_ncrs > 0} />
        </div>
      ) : null}

      <div className="mt-6">
        <StreamingInsightPanel title={t("qa.ai.title")} endpoint="/api/ai/qa-summary" />
      </div>

      {summary ? (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="mb-3 text-sm font-semibold text-brand-black">{t("qa.chart.passRateByDiscipline")}</h2>
            <DisciplinePassRateChart data={summary.pass_rate_by_discipline} />
          </Card>
          <Card>
            <h2 className="mb-3 text-sm font-semibold text-brand-black">{t("qa.chart.ncrTrend")}</h2>
            <NcrTrendChart data={summary.ncr_trend} />
          </Card>
        </div>
      ) : null}

      <Card className="mt-6">
        <h2 className="mb-3 text-sm font-semibold text-brand-black">{t("qa.ncrs.title")}</h2>
        <NcrTable ncrs={ncrs} />
      </Card>

      <Card className="mt-6">
        <h2 className="mb-3 text-sm font-semibold text-brand-black">{t("qa.inspections.title")}</h2>
        <InspectionTable inspections={inspections} />
      </Card>
    </div>
  );
}
