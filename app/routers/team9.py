from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/team9", tags=["Team 9 - Flujo"])

tasks = []  # simulación

@router.post("/workflow/task")
def workflow_task(name: str):
    # TODO: validar nombre
    if not name or len(name) < 3:
        raise HTTPException(status_code=400, detail="Nombre inválido")

    # TODO: evitar duplicados
    for t in tasks:
        if t["name"] == name:
            raise HTTPException(status_code=409, detail="Tarea duplicada")

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
    # TODO: devolver resultados
    return {"tasks": tasks}