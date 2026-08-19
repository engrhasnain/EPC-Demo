import { STATUS_COLORS, type StatusTone } from "@/lib/status";

interface BadgeProps {
  tone: StatusTone | "neutral";
  children: React.ReactNode;
}

export function Badge({ tone, children }: BadgeProps) {
  const dotColor = tone === "neutral" ? "#a3a3a3" : STATUS_COLORS[tone];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-800">
      <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: dotColor }} />
      {children}
    </span>
  );
}
