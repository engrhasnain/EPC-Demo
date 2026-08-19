import { Card } from "./Card";

interface StatCardProps {
  label: string;
  value: string | number;
  attention?: boolean;
  hint?: string;
}

export function StatCard({ label, value, attention = false, hint }: StatCardProps) {
  return (
    <Card>
      <p className="text-sm font-medium text-neutral-500">{label}</p>
      <p className={`mt-1 text-3xl font-semibold ${attention ? "text-[#b91c1c]" : "text-brand-black"}`}>
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-neutral-400">{hint}</p> : null}
    </Card>
  );
}
