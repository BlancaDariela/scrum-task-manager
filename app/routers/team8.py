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
def report_tasks(db: Session = Depends(get_db)):
    # Obtenemos todas las tareas de la tabla sin ningún filtro
    todas_las_tareas = db.query(Task).all()
    
    return {
        "message": "Reporte general de todas las tareas",
        "total_tareas": len(todas_las_tareas),
        "data": todas_las_tareas
    }

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
def report_summary(db: Session = Depends(get_db)):
    # TODO: resumen
    # Resumen con conteos agregados por estatus
    total = db.query(Task).count()
    completadas = db.query(Task).filter(Task.status == "completed").count()
    pendientes = db.query(Task).filter(Task.status == "pending").count()
    
    #Calcular porcentaje de completadas(evitando division por cero)
    porcentaje_completadas = (completadas / total * 100) if total > 0 else 0
    
    return{
        "message": "Resumen general de tareas",
        "total_tareas": total,
        "tareas_completadas": completadas,
        "tareas_pendientes": pendientes,
        "porcentaje_completadas": round(porcentaje_completadas, 2)
    }
    
    return {"message": "Resumen"}
