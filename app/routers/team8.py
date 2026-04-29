from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Task


router = APIRouter(prefix="/team8", tags=["Team 8 - Reportes"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/reports/tasks")
def report_tasks():
    # TODO: reporte general
    return {"message": "Reporte de tareas"}

@router.get("/reports/completed")
def report_completed(db: Session = Depends(get_db)):
    # Filtrar directamente en la base de datos por el estatus "completed"
    tareas_completadas = db.query(Task).filter(Task.status == "completed").all()

    return {
        "message": "Reporte de tareas completadas",
        "total_completadas": len(tareas_completadas),
        "data": tareas_completadas
    }

@router.get("/reports/pending")
def report_pending(db: Session = Depends(get_db)):
    # TODO: reporte pendientes
    # Filtrar directamente en la base de datos por el estatus "pending"
    tareas_pendientes = db.query(Task).filter(Task.status == "pending").all()
    
    return{
        "message": "Reporte de tareas pendientes",
        "total_pendientes": len(tareas_pendientes),
        "data": tareas_pendientes
    }
    
    return {"message": "Reporte pendientes"}

@router.get("/reports/full")
def report_full(db: Session = Depends(get_db)):
    # TODO: reporte completo
    tareas = db.query(Task).all()
    return {
        "total":len(tareas),
        "data":[
            {
                "id":tarea.id,
                "name": tarea.name,
                "status":tarea.status,
            }
            for tarea in tareas
        ]
    }

@router.get("/reports/summary")
def report_summary():
    # TODO: resumen
    return {"message": "Resumen"}
