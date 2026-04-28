from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/team9", tags=["Team 9 - Flujo"])

tasks = []  # simulación

@router.post("/workflow/task", status_code=201)
def workflow_task(name: str):
    # Crear tarea
    task = {
        "name": name,
        "status": "pending"
    }

    tasks.append(task)

    return {
        "message": "Tarea agregada exitosamente",
        "task": task
    }

@router.get("/workflow/result")
def get_result():
    if not tasks:
        raise HTTPException(status_code=404, detail="No hay tareas todavía")
    return {"tasks": tasks}