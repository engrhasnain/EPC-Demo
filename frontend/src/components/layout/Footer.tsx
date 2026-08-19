"use client";

import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-neutral-200 py-4 text-center text-xs text-neutral-400">
      {t("footer.disclaimer")}
    </footer>
  );
}
