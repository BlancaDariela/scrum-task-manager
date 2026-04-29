# Equipo 3 - Estados de Tareas

##  Objetivo

Gestionar el estado de las tareas.

##  Tareas

* Marcar como completada
* Marcar como pendiente
* Cambiar estado
* Listar por estado
* Contar por estado

##  Endpoints

* PUT /team3/tasks/{id}/complete
* PUT /team3/tasks/{id}/pending
* PUT /team3/tasks/{id}/status
* GET /team3/tasks/status/{state}
* GET /team3/tasks/status/count

##  Reglas

* Validar que la tarea exista
* No duplicar lógica de otros equipos
