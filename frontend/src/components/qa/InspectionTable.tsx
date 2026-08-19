"use client";

import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/lib/i18n";
import type { StatusTone } from "@/lib/status";
import type { Inspection } from "@/lib/types";

const RESULT_TONE: Record<Inspection["result"], StatusTone> = {
  Pass: "good",
  Fail: "critical",
  Pending: "warning",
};

export function InspectionTable({ inspections }: { inspections: Inspection[] }) {
  const { t } = useLanguage();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-200 text-xs uppercase tracking-wide text-neutral-400">
            <th className="py-2 pr-4 font-medium">{t("qa.table.item")}</th>
            <th className="py-2 pr-4 font-medium">{t("qa.table.project")}</th>
            <th className="py-2 pr-4 font-medium">{t("qa.table.discipline")}</th>
            <th className="py-2 pr-4 font-medium">{t("qa.table.inspector")}</th>
            <th className="py-2 pr-4 font-medium">{t("qa.table.date")}</th>
            <th className="py-2 pr-4 font-medium">{t("qa.table.result")}</th>
          </tr>
        </thead>
        <tbody>
          {inspections.map((inspection) => (
            <tr key={inspection.id} className="border-b border-neutral-100 last:border-0">
              <td className="max-w-xs py-3 pr-4 text-neutral-700">{inspection.checklist_item}</td>
              <td className="py-3 pr-4 text-neutral-500">{inspection.project_name}</td>
              <td className="py-3 pr-4 text-neutral-500">{inspection.discipline}</td>
              <td className="py-3 pr-4 text-neutral-500">{inspection.inspector}</td>
              <td className="py-3 pr-4 whitespace-nowrap text-neutral-500">{inspection.date}</td>
              <td className="py-3 pr-4">
                <Badge tone={RESULT_TONE[inspection.result]}>{inspection.result}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
