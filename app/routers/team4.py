from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Task
from app.schemas import TaskResponse
from typing import List

router = APIRouter(prefix="/team4", tags=["Team 4 - Búsqueda"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

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

@router.get("/tasks/filter", response_model=List[TaskResponse])
def filter_tasks(state: str, db: Session = Depends(get_db)):
    valid_states = ["pending", "completed"]
    if state not in valid_states:
        raise HTTPException(status_code=400, detail=f"Estado invalido. Usa: {valid_states}")

    tasks = db.query(Task).filter(Task.status == state).all()
    return tasks

@router.get("/tasks/search/advanced", response_model=List[TaskResponse])
def advanced_search(name: str = "", state: str = "", db: Session = Depends(get_db)):
    query = db.query(Task)

    if name:
        query = query.filter(Task.name.ilike(f"%{name}%"))
    if state:
        valid_states = ["pending", "completed"]
        if state not in valid_states:
            raise HTTPException(status_code=400, detail=f"Estado invalido. Usa: {valid_states}")
        query = query.filter(Task.status == state)

    return query.all()
