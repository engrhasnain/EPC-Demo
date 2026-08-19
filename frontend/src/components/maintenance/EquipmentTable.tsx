"use client";

import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/lib/i18n";
import { equipmentStatus } from "@/lib/status";
import type { Equipment } from "@/lib/types";

interface EquipmentTableProps {
  equipment: Equipment[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function EquipmentTable({ equipment, selectedId, onSelect }: EquipmentTableProps) {
  const { t } = useLanguage();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-200 text-xs uppercase tracking-wide text-neutral-400">
            <th className="py-2 pr-4 font-medium">{t("maintenance.table.equipment")}</th>
            <th className="py-2 pr-4 font-medium">{t("maintenance.table.project")}</th>
            <th className="py-2 pr-4 font-medium">{t("maintenance.table.health")}</th>
            <th className="py-2 pr-4 font-medium">{t("maintenance.table.rul")}</th>
            <th className="py-2 pr-4 font-medium">{t("maintenance.table.status")}</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map((item) => (
            <tr
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`cursor-pointer border-b border-neutral-100 transition-colors last:border-0 hover:bg-neutral-50 ${
                selectedId === item.id ? "bg-orange-50/60" : ""
              }`}
            >
              <td className="py-3 pr-4">
                <p className="font-medium text-neutral-800">{item.name}</p>
                <p className="text-xs text-neutral-400">{item.equipment_type}</p>
              </td>
              <td className="py-3 pr-4 text-neutral-500">{item.project_name}</td>
              <td className="py-3 pr-4 text-neutral-600">{item.health_score}/100</td>
              <td className="py-3 pr-4 text-neutral-600">{item.remaining_useful_life_days} {t("schedule.days")}</td>
              <td className="py-3 pr-4">
                <Badge tone={equipmentStatus(item.status)}>{item.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
