# Scrum – Sistema de Gestión de Tareas

Repositorio oficial de la práctica de Scrum.

##  Ramas por equipo

| Equipo | Módulo | Rama |
|--------|--------|------|
| Equipo 1 | Generador de tareas | `team-1` |
| Equipo 2 | Lista de tareas | `team-2` |
| Equipo 3 | Marcador de estado | `team-3` |
| Equipo 4 | Filtro de tareas | `team-4` |
| Equipo 5 | Contador de tareas | `team-5` |
| Equipo 6 | Simulador de almacenamiento | `team-6` |
| Equipo 7 | Interfaz simple | `team-7` |
| Equipo 8 | Generador de reportes | `team-8` |
| Equipo 9 | Flujo de tareas | `team-9` |

##  Reglas

-  Trabaja **solo en tu rama** (`team-N`)
-  **Nunca** hagas push a `main`
- Mínimo **3 commits** por equipo durante el sprint

##  ¿Cómo empezar?

git clone https://github.com/BlancaDariela/scrum-task-manager.git
cd scrum-task-manager
git checkout team-N  # cambia N por tu número de equipo

# Crea y activa el  el entorno virtual
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Instala el requirements.txt 
pip install -r requirements.txt

# Para corroborar enpoints ejecuta
uvicorn app.main:app --reload

# y despues entra a
http://127.0.0.1:8000/docs