"use client";

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CHART_COLORS } from "@/lib/chart-colors";
import { useLanguage } from "@/lib/i18n";
import type { NCRTrendPoint } from "@/lib/types";

export function NcrTrendChart({ data }: { data: NCRTrendPoint[] }) {
  const { t } = useLanguage();

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }} barGap={4}>
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
          width={28}
          allowDecimals={false}
        />
        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e5e5" }} />
        <Legend wrapperStyle={{ fontSize: 12 }} iconType="circle" />
        <Bar dataKey="opened" name={t("qa.chart.opened")} fill={CHART_COLORS.accent} radius={[4, 4, 0, 0]} maxBarSize={28} />
        <Bar dataKey="closed" name={t("qa.chart.closed")} fill={CHART_COLORS.context} radius={[4, 4, 0, 0]} maxBarSize={28} />
      </BarChart>
    </ResponsiveContainer>
  );
}
