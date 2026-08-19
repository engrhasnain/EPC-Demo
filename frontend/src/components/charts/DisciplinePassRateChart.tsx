"use client";

import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CHART_COLORS } from "@/lib/chart-colors";
import { useLanguage } from "@/lib/i18n";
import type { DisciplinePassRate } from "@/lib/types";

export function DisciplinePassRateChart({ data }: { data: DisciplinePassRate[] }) {
  const { t } = useLanguage();

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} layout="vertical" margin={{ top: 8, right: 32, left: 8, bottom: 0 }}>
        <CartesianGrid stroke={CHART_COLORS.grid} horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 100]}
          tick={{ fontSize: 12, fill: CHART_COLORS.axis }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value: number) => `${value}%`}
        />
        <YAxis
          type="category"
          dataKey="discipline"
          tick={{ fontSize: 12, fill: "#262626" }}
          axisLine={false}
          tickLine={false}
          width={110}
        />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e5e5" }}
          formatter={(value) => [`${value}%`, t("qa.chart.approval")]}
        />
        <Bar dataKey="pass_rate" fill={CHART_COLORS.accent} radius={[0, 4, 4, 0]} maxBarSize={24}>
          <LabelList
            dataKey="pass_rate"
            position="right"
            formatter={(value) => `${value}%`}
            style={{ fontSize: 12, fill: "#262626", fontWeight: 600 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
