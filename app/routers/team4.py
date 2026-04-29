from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Task

router = APIRouter(prefix="/team4", tags=["Team 4 - Búsqueda"])

@router.get("/tasks/search")
def search(name: str):
    db = SessionLocal()
    try:
        task = db.query(Task).filter(Task.name == name).first()
        if not task:
            raise HTTPException(status_code=404, detail=f"No se encontró tarea con nombre '{name}'")
        return task
    finally:
        db.close()


@router.get("/tasks/search/keyword")
def keyword_search(keyword: str):
    # TODO: búsqueda por palabra clave
    return {"message": f"Buscar por keyword {keyword}"}

@router.get("/tasks/filter")
def filter_tasks(state: str):
    # TODO: filtrar por estado
    return {"message": f"Filtrar por estado {state}"}

@router.get("/tasks/search/advanced")
def advanced_search(name: str = "", state: str = ""):
    # TODO: búsqueda combinada
    return {"message": "Búsqueda avanzada"}