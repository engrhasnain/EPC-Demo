"use client";

import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/lib/i18n";
import { ncrSeverityStatus, ncrStatusStatus } from "@/lib/status";
import type { NonConformance } from "@/lib/types";

export function NcrTable({ ncrs }: { ncrs: NonConformance[] }) {
  const { t } = useLanguage();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-200 text-xs uppercase tracking-wide text-neutral-400">
            <th className="py-2 pr-4 font-medium">{t("qa.table.description")}</th>
            <th className="py-2 pr-4 font-medium">{t("qa.table.project")}</th>
            <th className="py-2 pr-4 font-medium">{t("qa.table.discipline")}</th>
            <th className="py-2 pr-4 font-medium">{t("qa.table.severity")}</th>
            <th className="py-2 pr-4 font-medium">{t("qa.table.status")}</th>
          </tr>
        </thead>
        <tbody>
          {ncrs.map((ncr) => (
            <tr key={ncr.id} className="border-b border-neutral-100 last:border-0">
              <td className="max-w-sm py-3 pr-4 text-neutral-700">{ncr.description}</td>
              <td className="py-3 pr-4 text-neutral-500">{ncr.project_name}</td>
              <td className="py-3 pr-4 text-neutral-500">{ncr.discipline}</td>
              <td className="py-3 pr-4">
                <Badge tone={ncrSeverityStatus(ncr.severity)}>{ncr.severity}</Badge>
              </td>
              <td className="py-3 pr-4">
                <Badge tone={ncrStatusStatus(ncr.status)}>{ncr.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
