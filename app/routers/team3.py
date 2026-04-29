from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models import Task
from app.database import SessionLocal
from fastapi import APIRouter

router = APIRouter(prefix="/team3", tags=["Team 3 - Estados"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.put("/tasks/{id}/complete")
def complete_task(id: int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    task.status = "completed"
    return {"message": f"Tarea {id} completada"}

@router.put("/tasks/{id}/pending")
def pending_task(id: int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    task.status = "pending"
    db.commit()
    return {"message": f"Tarea {id} pendiente"}

@router.put("/tasks/{id}/status")
def change_status(id: int, status: str, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    task.status = status
    db.commit()
    return {"message": f"Tarea {id} ahora es {status}"}

@router.get("/tasks/status/{state}")
def get_by_status(state: str, db: Session = Depends(get_db)):
    tasks = db.query(Task).filter(Task.status == state).all()
    #Conste que no se menciono nada de validar estados especificos.
    return {"message": f"Tareas con estado {state}", "tasks": tasks}

@router.get("/tasks/statuses/count")
def count_by_status(db: Session = Depends(get_db)):
    results = db.query(Task.status, func.count(Task.id)).group_by(Task.status).all()
    return {"message": "Conteo por estado", "counts": [{"status": s, "count": c} for s, c in results]}
