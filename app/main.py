from fastapi import FastAPI
from app.database import engine, Base, SessionLocal
from app.models import Task

from app.routers import team1, team2, team3, team4, team5, team6, team8, team9

Base.metadata.create_all(bind=engine)

app = FastAPI()

def seed_data():
    db = SessionLocal()

    if db.query(Task).count() == 0:
        tasks = [
            Task(name="Estudiar", status="pending"),
            Task(name="Hacer tarea", status="completed"),
            Task(name="Leer", status="pending"),
            Task(name="Programar", status="pending"),
            Task(name="Dormir", status="completed")
        ]
        db.add_all(tasks)
        db.commit()

    db.close()

seed_data()

# routers
app.include_router(team1.router)
app.include_router(team2.router)
app.include_router(team3.router)
app.include_router(team4.router)
app.include_router(team5.router)
app.include_router(team6.router)
app.include_router(team8.router)
app.include_router(team9.router)