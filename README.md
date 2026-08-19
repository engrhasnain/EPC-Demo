# AI EPC Operations Intelligence

A concept demo for EPC (Engineering, Procurement, Construction) operations — schedule deviation
prediction, QA/QC automation, and predictive maintenance, with AI-generated narrative insights on
top of each.

Built as a client-facing demo for Contreras Hermanos, an Argentine EPC contractor. Data throughout
the app is illustrative, modeled on Contreras' real project types (pipelines, compressor plants,
mining infrastructure) — not live client data.

## Stack

- **Backend**: FastAPI + uv (Python), streaming AI narrative endpoints via DeepSeek (OpenAI-compatible API)
- **Frontend**: Next.js (App Router) + TypeScript + Tailwind CSS v4 + Recharts, with a built-in ES/EN language toggle

## Modules

- **Overview** — consolidated KPIs and alerts across all three modules
- **Schedule Risk** — project portfolio, S-curves, delay-risk scoring, AI risk briefings
- **QA/QC** — inspection log, non-conformance tracking, pass-rate trends, AI quality summaries
- **Predictive Maintenance** — equipment registry, vibration trend monitoring, AI maintenance advisories

## Running locally

### Backend

```
cd backend
uv sync
cp .env.example .env   # add your DEEPSEEK_API_KEY
uv run uvicorn app.main:app --port 8009
```

### Frontend

```
cd frontend
npm install
npm run dev -- -p 3008
```

Set `NEXT_PUBLIC_API_BASE_URL` in `frontend/.env.local` if the backend isn't on `http://localhost:8009`.
