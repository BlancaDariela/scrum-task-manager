from fastapi import APIRouter

router = APIRouter(prefix="/team8", tags=["Team 8 - Reportes"])

@router.get("/reports/tasks")
def report_tasks():
    # TODO: reporte general
    return {"message": "Reporte de tareas"}

@router.get("/reports/completed")
def report_completed():
    # TODO: reporte completadas
    return {"message": "Reporte completadas"}

@router.get("/reports/pending")
def report_pending():
    # TODO: reporte pendientes
    return {"message": "Reporte pendientes"}

@router.get("/reports/full")
def report_full():
    # TODO: reporte completo
    return {"message": "Reporte completo"}

@router.get("/reports/summary")
def report_summary():
    # TODO: resumen
    return {"message": "Resumen"}