from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Task

router = APIRouter(prefix="/team2", tags=["Team 2 - Listado"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/tasks/list")
def list_tasks(db: Session = Depends(get_db)):
    tasks = db.query(Task).all()
    return tasks

@router.get("/tasks/sorted/name")
def sort_by_name():
    # TODO: ordenar por nombre
    return {"message": "Ordenar por nombre"}

@router.get("/tasks/sorted/length")
def sort_by_length():
    # TODO: ordenar por longitud del nombre
    return {"message": "Ordenar por longitud"}

@router.get("/tasks/limit")
def limit_tasks(limit: int = 5):
    # TODO: limitar resultados
    return {"message": f"Mostrar {limit} tareas"}

@router.get("/tasks/advanced")
def advanced():
    # TODO: combinar ordenamiento + límite
    return {"message": "Listado avanzado"}