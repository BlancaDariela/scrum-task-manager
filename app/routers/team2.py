from fastapi import APIRouter

router = APIRouter(prefix="/team2", tags=["Team 2 - Listado"])

@router.get("/tasks/list")
def list_tasks():
    # TODO: listar tareas
    return {"message": "Listado de tareas"}

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