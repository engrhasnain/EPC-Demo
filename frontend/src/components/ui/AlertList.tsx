"use client";

import { useLanguage } from "@/lib/i18n";
import { STATUS_COLORS, type StatusTone } from "@/lib/status";

interface AlertItem {
  key: string;
  tone: StatusTone;
  message: string;
  date: string;
  module?: string;
}

export function AlertList({ alerts }: { alerts: AlertItem[] }) {
  const { t } = useLanguage();

  if (alerts.length === 0) {
    return <p className="text-sm text-neutral-400">{t("alerts.empty")}</p>;
  }

  return (
    <ul className="divide-y divide-neutral-100">
      {alerts.map((alert) => (
        <li key={alert.key} className="flex items-start gap-3 py-3">
          <span
            className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: STATUS_COLORS[alert.tone] }}
          />
          <div className="flex-1">
            {alert.module ? (
              <span className="mr-2 text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
                {alert.module}
              </span>
            ) : null}
            <p className="mt-0.5 text-sm text-neutral-700">{alert.message}</p>
            <span className="text-xs text-neutral-400">{alert.date}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
