from fastapi import APIRouter, HTTPException
from app.database import SessionLocal, engine, Base
from app.models import Task
from app.schemas import TaskResponse
from app.schemas import TaskCreate, TaskResponse

router = APIRouter(prefix="/team1", tags=["Team 1 - CRUD"])


@router.post("/tasks")
def create_task(task: TaskCreate):
    if not task.name.strip():
        raise HTTPException(status_code=400, detail="El nombre de la tarea no puede estar vacío")
    db = SessionLocal()
    try:
        new_task = Task(name=task.name, status="pending")
        db.add(new_task)
        db.commit()
        db.refresh(new_task)
        return new_task
    finally:
        db.close()

    
@router.get("/tasks")
def get_tasks():
    # TODO: obtener todas las tareas
    return {"message": "Listar tareas (pendiente)"}

@router.get("/tasks/{id}", response_model=TaskResponse)
def get_task(id: int):
    db = SessionLocal()
    try:
        task = db.query(Task).filter(Task.id == id).first()
        if not task:
            raise HTTPException(status_code=404, detail="Tarea no encontrada")
        return task
    finally:
        db.close()


@router.put("/tasks/{id}")
def update_task(id: int):
    # TODO: actualizarø tarea
    return {"message": f"Actualizar tarea {id} (pendiente)"}

@router.delete("/tasks/{id}")
def delete_task(id: int):
    # TODO: eliminar tarea
    return {"message": f"Eliminar tarea {id} (pendiente)"}