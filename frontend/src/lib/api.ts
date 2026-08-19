import type {
  Equipment,
  Inspection,
  Lang,
  MaintenanceSummary,
  NonConformance,
  Overview,
  Project,
  QASummary,
  ScheduleSummary,
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8008";

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Request failed: ${path} (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  overview: (lang: Lang = "es") => getJson<Overview>(`/api/overview?lang=${lang}`),
  projects: (lang: Lang = "es") => getJson<Project[]>(`/api/schedule/projects?lang=${lang}`),
  scheduleSummary: () => getJson<ScheduleSummary>("/api/schedule/summary"),
  inspections: (lang: Lang = "es") => getJson<Inspection[]>(`/api/qa/inspections?lang=${lang}`),
  ncrs: (lang: Lang = "es") => getJson<NonConformance[]>(`/api/qa/ncrs?lang=${lang}`),
  qaSummary: (lang: Lang = "es") => getJson<QASummary>(`/api/qa/summary?lang=${lang}`),
  equipment: (lang: Lang = "es") => getJson<Equipment[]>(`/api/maintenance/equipment?lang=${lang}`),
  maintenanceSummary: () => getJson<MaintenanceSummary>("/api/maintenance/summary"),
};

export async function streamAiInsight(
  path: string,
  onChunk: (text: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  const res = await fetch(`${API_BASE_URL}${path}`, { signal });
  if (!res.ok || !res.body) {
    throw new Error(`Streaming request failed: ${path} (${res.status})`);
  }
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    onChunk(decoder.decode(value, { stream: true }));
  }
}
