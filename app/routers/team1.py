from fastapi import APIRouter, HTTPException
from app.database import SessionLocal, engine, Base
from app.models import Task
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
    db = SessionLocal()
    try:
        tasks = db.query(Task).all()
        return tasks

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error al obtener las tareas: {str(e)}"
        )

    finally:
        db.close()

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