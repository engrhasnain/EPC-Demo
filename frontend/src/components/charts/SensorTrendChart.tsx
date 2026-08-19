"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CHART_COLORS } from "@/lib/chart-colors";
import { useLanguage } from "@/lib/i18n";
import type { SensorPoint } from "@/lib/types";

const CRITICAL_VIBRATION_MM_S = 6;

export function SensorTrendChart({ data }: { data: SensorPoint[] }) {
  const { t } = useLanguage();
  const chartData = data.map((point) => ({
    ...point,
    label: new Date(point.timestamp).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" }),
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid stroke={CHART_COLORS.grid} vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: CHART_COLORS.axis }}
          axisLine={{ stroke: CHART_COLORS.grid }}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          tick={{ fontSize: 12, fill: CHART_COLORS.axis }}
          axisLine={false}
          tickLine={false}
          width={32}
        />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e5e5" }}
          formatter={(value) => [`${value} mm/s`, t("maintenance.vibration")]}
        />
        <ReferenceLine
          y={CRITICAL_VIBRATION_MM_S}
          stroke={CHART_COLORS.critical}
          strokeDasharray="4 3"
          label={{ value: t("maintenance.threshold"), position: "insideTopRight", fontSize: 11, fill: CHART_COLORS.critical }}
        />
        <Line
          type="monotone"
          dataKey="vibration_mm_s"
          name={t("maintenance.vibration")}
          stroke={CHART_COLORS.accent}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
