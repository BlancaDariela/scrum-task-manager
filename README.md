# Equipo 9 - Flujo Completo

##  Objetivo

Implementar un flujo completo de tareas con validaciones.

##  Tareas

* Crear tarea
* Validar datos (no vacío, mínimo 3 caracteres)
* Evitar duplicados
* Asignar estado inicial
* Marcar como completada
* Manejar errores

##  Endpoints

* POST /team9/workflow/task
* GET /team9/workflow/result

##  Casos obligatorios

* Nombre vacío → error 400
* Nombre duplicado → error 409

##  Reglas

* Manejar errores correctamente
* Usar códigos HTTP adecuados
* Probar todos los casos en Swagger
