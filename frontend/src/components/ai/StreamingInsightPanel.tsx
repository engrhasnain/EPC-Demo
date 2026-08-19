"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { streamAiInsight } from "@/lib/api";
import { useLanguage } from "@/lib/i18n";

interface StreamingInsightPanelProps {
  title: string;
  endpoint: string;
}

export function StreamingInsightPanel({ title, endpoint }: StreamingInsightPanelProps) {
  const { t } = useLanguage();
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "streaming" | "done" | "error">("idle");
  const controllerRef = useRef<AbortController | null>(null);

  const run = useCallback(() => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setText("");
    setStatus("streaming");
    streamAiInsight(endpoint, (chunk) => setText((prev) => prev + chunk), controller.signal)
      .then(() => setStatus("done"))
      .catch((err) => {
        if (controller.signal.aborted) return;
        console.error(err);
        setStatus("error");
      });
  }, [endpoint]);

  useEffect(() => {
    run();
    return () => controllerRef.current?.abort();
  }, [run]);

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-orange/10 text-xs font-bold text-brand-orange">
            AI
          </span>
          <h3 className="text-sm font-semibold text-brand-black">{title}</h3>
        </div>
        <button
          type="button"
          onClick={run}
          disabled={status === "streaming"}
          className="text-xs font-medium text-brand-orange hover:text-brand-orange-dark disabled:opacity-40"
        >
          {status === "streaming" ? t("ai.generating") : t("ai.regenerate")}
        </button>
      </div>
      {status === "error" ? (
        <p className="text-sm text-neutral-400">{t("ai.error")}</p>
      ) : (
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-700">
          {text}
          {status === "streaming" ? <span className="animate-pulse text-brand-orange">▍</span> : null}
        </p>
      )}
    </div>
  );
}
