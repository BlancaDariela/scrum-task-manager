from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/team9", tags=["Team 9 - Flujo"])

tasks = []  # simulación

@router.post("/workflow/task", status_code=201)
def workflow_task(name: str):
    name = name.strip()

    if not name:
        raise HTTPException(status_code=400, detail="El nombre no puede estar vacío")
    if len(name) < 3:
        raise HTTPException(status_code=400, detail="El nombre debe tener al menos 3 caracteres")
    if any(t["name"] == name for t in tasks):
        raise HTTPException(status_code=409, detail="La tarea ya existe")

    task = {"name": name, "status": "pending"}
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