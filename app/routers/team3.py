from http.client import HTTPException

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
def change_status(id: int, status: str):
    # TODO: cambiar estado manualmente
    return {"message": f"Tarea {id} ahora es {status}"}

@router.get("/tasks/status/{state}")
def get_by_status(state: str):
    # TODO: listar por estado
    return {"message": f"Tareas con estado {state}"}

@router.get("/tasks/status/count")
def count_by_status():
    # TODO: contar tareas por estado
    return {"message": "Conteo por estado"}