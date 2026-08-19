from collections import defaultdict

from app.data.qa_data import INSPECTIONS, NON_CONFORMANCES, get_inspections, get_ncrs
from app.models.qa import DisciplinePassRate, Inspection, NCRTrendPoint, NonConformance, QASummary

_MONTHS_ES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
_MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


def _period_label(year: int, month: int, lang: str) -> str:
    months = _MONTHS_EN if lang == "en" else _MONTHS_ES
    return f"{months[month - 1]}-{year % 100:02d}"


def list_inspections(lang: str = "es") -> list[Inspection]:
    return get_inspections(lang)


def list_ncrs(lang: str = "es") -> list[NonConformance]:
    return get_ncrs(lang)


def _pass_rate_by_discipline(lang: str) -> list[DisciplinePassRate]:
    inspections = get_inspections(lang)
    disciplines = sorted({i.discipline for i in inspections})
    rates = []
    for d in disciplines:
        graded = [i for i in inspections if i.discipline == d and i.result in ("Pass", "Fail")]
        if not graded:
            continue
        passed = len([i for i in graded if i.result == "Pass"])
        rates.append(
            DisciplinePassRate(
                discipline=d,
                pass_rate=round(passed / len(graded) * 100, 1),
                total_inspections=len(graded),
            )
        )
    return rates


def _ncr_trend(lang: str) -> list[NCRTrendPoint]:
    opened_by_key: dict[tuple[int, int], int] = defaultdict(int)
    closed_by_key: dict[tuple[int, int], int] = defaultdict(int)
    for n in NON_CONFORMANCES:
        opened_by_key[(n.raised_date.year, n.raised_date.month)] += 1
        if n.closed_date:
            closed_by_key[(n.closed_date.year, n.closed_date.month)] += 1
    keys = sorted(set(opened_by_key) | set(closed_by_key))
    return [
        NCRTrendPoint(
            period=_period_label(year, month, lang),
            opened=opened_by_key.get((year, month), 0),
            closed=closed_by_key.get((year, month), 0),
        )
        for year, month in keys
    ]


def get_summary(lang: str = "es") -> QASummary:
    graded = [i for i in INSPECTIONS if i.result in ("Pass", "Fail")]
    passed = len([i for i in graded if i.result == "Pass"])
    overall_pass_rate = round(passed / len(graded) * 100, 1) if graded else 0.0
    open_ncrs = [n for n in NON_CONFORMANCES if n.status != "Closed"]
    critical_ncrs = [n for n in open_ncrs if n.severity == "Critical"]
    return QASummary(
        total_inspections=len(INSPECTIONS),
        overall_pass_rate=overall_pass_rate,
        open_ncrs=len(open_ncrs),
        critical_ncrs=len(critical_ncrs),
        pass_rate_by_discipline=_pass_rate_by_discipline(lang),
        ncr_trend=_ncr_trend(lang),
    )


def build_summary_context() -> str:
    summary = get_summary()
    open_list = [n for n in NON_CONFORMANCES if n.status != "Closed"]
    lines = [
        f"Inspecciones totales: {summary.total_inspections}. Tasa de aprobación general: {summary.overall_pass_rate}%.",
        f"No conformidades abiertas: {summary.open_ncrs} (de las cuales {summary.critical_ncrs} críticas).",
        "Tasa de aprobación por disciplina: "
        + ", ".join(f"{r.discipline} {r.pass_rate}%" for r in summary.pass_rate_by_discipline)
        + ".",
        "No conformidades abiertas:",
    ]
    for n in open_list:
        lines.append(f"- [{n.severity}] {n.project_name} — {n.discipline}: {n.description} (estado: {n.status})")
    return "\n".join(lines)
