from fastapi import APIRouter
from app.database import SessionLocal, engine, Base
from app.models import Task

router = APIRouter(prefix="/team1", tags=["Team 1 - CRUD"])

@router.post("/tasks")
def create_task():
    # TODO: crear tarea en la base de datos
    return {"message": "Crear tarea (pendiente)"}

@router.get("/tasks")
def get_tasks():
    # TODO: obtener todas las tareas
    return {"message": "Listar tareas (pendiente)"}

@router.get("/tasks/{id}")
def get_task(id: int):
    # TODO: obtener tarea por ID
    return {"message": f"Obtener tarea {id} (pendiente)"}

@router.put("/tasks/{id}")
def update_task(id: int):
    # TODO: actualizar tarea
    return {"message": f"Actualizar tarea {id} (pendiente)"}

@router.delete("/tasks/{id}")
def delete_task(id: int):
    # TODO: eliminar tarea
    return {"message": f"Eliminar tarea {id} (pendiente)"}