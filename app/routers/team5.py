from fastapi import APIRouter
import sqlite3
import os

router = APIRouter(prefix="/team5", tags=["Team 5 - Estadísticas"])

# Ruta absoluta hacia Data/tasks.db
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DB_NAME = os.path.join(BASE_DIR, "Data", "tasks.db")


@router.get("/stats/total")
def total_tasks():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM tasks")
    total = cursor.fetchone()[0]

    conn.close()
    return {"total": total}


@router.get("/stats/completed")
def completed_tasks():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM tasks WHERE status = 'completed'")
    completed = cursor.fetchone()[0]

    conn.close()
    return {"completed": completed}

@router.get("/stats/percentage")
def percentage():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM tasks")
    total = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM tasks WHERE status = 'completed'")
    completed = cursor.fetchone()[0]

    conn.close()

    if total == 0:
        return {"percentage": 0}

    percentage = (completed / total) * 100

    return {"percentage": round(percentage, 2)}

@router.get("/stats/avg-length")
def avg_length():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute("SELECT AVG(LENGTH(description)) FROM tasks")
    avg = cursor.fetchone()[0]

    conn.close()

    if avg is None:
        return {"average_length": 0}

    return {"average_length": round(avg, 2)}

@router.get("/stats/summary")
def summary():
    # TODO: resumen completo
    return {"message": "Resumen general"}