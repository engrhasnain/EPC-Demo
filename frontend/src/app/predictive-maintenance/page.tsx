"use client";

import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { Card } from "@/components/ui/Card";
import { AlertList } from "@/components/ui/AlertList";
import { SensorTrendChart } from "@/components/charts/SensorTrendChart";
import { EquipmentTable } from "@/components/maintenance/EquipmentTable";
import { StreamingInsightPanel } from "@/components/ai/StreamingInsightPanel";
import { api } from "@/lib/api";
import { useLanguage } from "@/lib/i18n";
import { alertSeverityStatus } from "@/lib/status";
import type { Equipment, MaintenanceSummary } from "@/lib/types";

export default function PredictiveMaintenancePage() {
  const { lang, t } = useLanguage();
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [summary, setSummary] = useState<MaintenanceSummary | null>(null);
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    api
      .equipment(lang)
      .then((data) => {
        setEquipment(data);
        setSelectedId((current) => {
          if (current && data.some((e) => e.id === current)) return current;
          const mostAtRisk = [...data].sort((a, b) => a.health_score - b.health_score)[0];
          return mostAtRisk ? mostAtRisk.id : "";
        });
      })
      .catch(console.error);
    api.maintenanceSummary().then(setSummary).catch(console.error);
  }, [lang]);

  const selectedEquipment = useMemo(
    () => equipment.find((item) => item.id === selectedId) ?? null,
    [equipment, selectedId],
  );

  return (
    <div>
      <PageHeader title={t("maintenance.title")} description={t("maintenance.description")} />

      {summary ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label={t("maintenance.stat.monitored")} value={summary.total_equipment} />
          <StatCard label={t("maintenance.stat.healthy")} value={summary.healthy} />
          <StatCard label={t("maintenance.stat.warning")} value={summary.warning} attention={summary.warning > 0} />
          <StatCard label={t("maintenance.stat.critical")} value={summary.critical} attention={summary.critical > 0} />
        </div>
      ) : null}

      <div className="mt-6">
        <StreamingInsightPanel title={t("maintenance.ai.title")} endpoint="/api/ai/maintenance-advisory" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="mb-3 text-sm font-semibold text-brand-black">{t("maintenance.equipment.title")}</h2>
          <EquipmentTable equipment={equipment} selectedId={selectedId} onSelect={setSelectedId} />
        </Card>
        <Card>
          <h2 className="mb-3 text-sm font-semibold text-brand-black">{t("maintenance.alerts.title")}</h2>
          <AlertList
            alerts={equipment.flatMap((item) =>
              item.alerts.map((alert, index) => ({
                key: `${item.id}-${index}`,
                tone: alertSeverityStatus(alert.severity),
                message: `${item.name}: ${alert.message}`,
                date: alert.date,
              })),
            )}
          />
        </Card>
      </div>

      {selectedEquipment ? (
        <Card className="mt-6">
          <div className="mb-3">
            <h2 className="text-sm font-semibold text-brand-black">
              {t("maintenance.trend.title")} — {selectedEquipment.name}
            </h2>
            <p className="text-xs text-neutral-400">
              {t("maintenance.health")}: {selectedEquipment.health_score}/100 · {t("maintenance.rul")}:{" "}
              {selectedEquipment.remaining_useful_life_days} {t("schedule.days")}
              {selectedEquipment.predicted_failure_mode
                ? ` · ${t("maintenance.failureMode")}: ${selectedEquipment.predicted_failure_mode}`
                : ""}
            </p>
          </div>
          <SensorTrendChart data={selectedEquipment.sensor_history} />
          <div className="mt-4 grid grid-cols-2 gap-4 border-t border-neutral-100 pt-4 text-sm sm:grid-cols-4">
            <div>
              <p className="text-xs text-neutral-400">{t("maintenance.readout.temperature")}</p>
              <p className="font-semibold text-neutral-800">
                {selectedEquipment.sensor_history.at(-1)?.temperature_c}°C
              </p>
            </div>
            <div>
              <p className="text-xs text-neutral-400">{t("maintenance.readout.pressure")}</p>
              <p className="font-semibold text-neutral-800">
                {selectedEquipment.sensor_history.at(-1)?.pressure_bar} bar
              </p>
            </div>
            <div>
              <p className="text-xs text-neutral-400">{t("maintenance.readout.criticality")}</p>
              <p className="font-semibold text-neutral-800">{selectedEquipment.criticality}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400">{t("maintenance.readout.lastInspection")}</p>
              <p className="font-semibold text-neutral-800">{selectedEquipment.last_inspection}</p>
            </div>
          </div>
        </Card>
      ) : null}
    </div>
  );
}
