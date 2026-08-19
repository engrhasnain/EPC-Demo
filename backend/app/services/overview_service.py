from app.models.overview import Overview, OverviewAlert
from app.services import maintenance_service, qa_service, schedule_service


def get_overview(lang: str = "es") -> Overview:
    schedule_summary = schedule_service.get_summary()
    qa_summary = qa_service.get_summary(lang)
    maintenance_summary = maintenance_service.get_summary()

    top_alerts: list[OverviewAlert] = []
    for p in schedule_service.list_projects(lang):
        for a in p.alerts:
            if a.severity in ("critical", "warning"):
                top_alerts.append(OverviewAlert(module="Schedule Risk", severity=a.severity, message=f"{p.name}: {a.message}", date=a.date.isoformat()))
    for e in maintenance_service.list_equipment(lang):
        for a in e.alerts:
            if a.severity in ("critical", "warning"):
                top_alerts.append(OverviewAlert(module="Predictive Maintenance", severity=a.severity, message=f"{e.name}: {a.message}", date=a.date.isoformat()))
    for n in qa_service.list_ncrs(lang):
        if n.status != "Closed" and n.severity in ("Critical", "Major"):
            severity = "critical" if n.severity == "Critical" else "warning"
            top_alerts.append(OverviewAlert(module="QA/QC", severity=severity, message=f"{n.project_name}: {n.description}", date=n.raised_date.isoformat()))

    top_alerts.sort(key=lambda a: (a.severity != "critical", a.date))
    return Overview(schedule=schedule_summary, qa=qa_summary, maintenance=maintenance_summary, top_alerts=top_alerts[:8])
