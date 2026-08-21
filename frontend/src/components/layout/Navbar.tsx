"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n";

export function Navbar() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { href: "/", label: t("nav.overview") },
    { href: "/schedule-risk", label: t("nav.schedule") },
    { href: "/qa-qc", label: t("nav.qa") },
    { href: "/predictive-maintenance", label: t("nav.maintenance") },
  ];

  return (
    <header className="bg-brand-black">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-md bg-white px-2 py-1">
            <Image src="/zenthic-logo.jpeg" alt="Zenthic" width={96} height={36} className="h-6 w-auto" />
          </div>
          <span className="text-sm font-semibold tracking-wide text-white">
            AI EPC Operations Intelligence
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <nav className="flex flex-wrap items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? "bg-brand-orange text-white" : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center rounded-full bg-neutral-800 p-0.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setLang("es")}
              className={`rounded-full px-2.5 py-1 transition-colors ${
                lang === "es" ? "bg-brand-orange text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`rounded-full px-2.5 py-1 transition-colors ${
                lang === "en" ? "bg-brand-orange text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
