from fastapi import APIRouter

router = APIRouter(prefix="/team5", tags=["Team 5 - Estadísticas"])

@router.get("/stats/total")
def total_tasks():
    # TODO: contar total
    return {"total": 0}

@router.get("/stats/completed")
def completed_tasks():
    # TODO: contar completadas
    return {"completed": 0}

@router.get("/stats/percentage")
def percentage():
    # TODO: calcular porcentaje
    return {"percentage": 0}

@router.get("/stats/avg-length")
def avg_length():
    # TODO: promedio de longitud
    return {"average_length": 0}

@router.get("/stats/summary")
def summary():
    # TODO: resumen completo
    return {"message": "Resumen general"}