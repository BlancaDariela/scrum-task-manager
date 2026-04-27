from pydantic import BaseModel

class TaskCreate(BaseModel):
    name: str

class TaskResponse(BaseModel):
    id: int
    name: str
    status: str

    class Config:
        orm_mode = True