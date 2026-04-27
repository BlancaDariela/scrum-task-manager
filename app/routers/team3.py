from fastapi import APIRouter

router = APIRouter(prefix="/team3", tags=["Team 3 - Estados"])

@router.put("/tasks/{id}/complete")
def complete_task(id: int):
    # TODO: marcar como completada
    return {"message": f"Tarea {id} completada"}

@router.put("/tasks/{id}/pending")
def pending_task(id: int):
    # TODO: marcar como pendiente
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