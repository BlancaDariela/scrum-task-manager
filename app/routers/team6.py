from fastapi import APIRouter

router = APIRouter(prefix="/team6", tags=["Team 6 - Persistencia"])

@router.post("/storage/save")
def save_data():
    # TODO: guardar datos
    return {"message": "Datos guardados"}

@router.get("/storage/load")
def load_data():
    # TODO: cargar datos
    return {"message": "Datos cargados"}

@router.put("/storage/update")
def update_data():
    # TODO: actualizar datos
    return {"message": "Datos actualizados"}

@router.delete("/storage/reset")
def reset_data():
    # TODO: reiniciar almacenamiento
    return {"message": "Datos reiniciados"}

@router.get("/storage/status")
def status():
    # TODO: estado del almacenamiento
    return {"message": "Estado del storage"}