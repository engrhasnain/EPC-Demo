"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CHART_COLORS } from "@/lib/chart-colors";
import { useLanguage } from "@/lib/i18n";
import type { SCurvePoint } from "@/lib/types";

export function SCurveChart({ data }: { data: SCurvePoint[] }) {
  const { t } = useLanguage();

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid stroke={CHART_COLORS.grid} vertical={false} />
        <XAxis
          dataKey="period"
          tick={{ fontSize: 12, fill: CHART_COLORS.axis }}
          axisLine={{ stroke: CHART_COLORS.grid }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: CHART_COLORS.axis }}
          axisLine={false}
          tickLine={false}
          width={36}
          tickFormatter={(value: number) => `${value}%`}
        />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e5e5" }}
          formatter={(value) => [`${value}%`, undefined]}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} iconType="plainline" />
        <Line
          type="monotone"
          dataKey="planned_pct"
          name={t("schedule.scurve.planned")}
          stroke={CHART_COLORS.context}
          strokeWidth={2}
          strokeDasharray="4 3"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="actual_pct"
          name={t("schedule.scurve.real")}
          stroke={CHART_COLORS.accent}
          strokeWidth={2}
          dot={{ r: 4, fill: CHART_COLORS.accent, stroke: "#ffffff", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
