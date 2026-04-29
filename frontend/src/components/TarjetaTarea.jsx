import { cambiarEstado, completarTarea, pendienteTarea } from "../services/api";

const ESTADOS = [
  { valor: "pendiente", label: "Pendiente" },
  { valor: "en-progreso", label: "En progreso" },
  { valor: "completada", label: "Completada" },
];

const ESTADO_BACKEND = {
  completada: "completed",
  pendiente: "pending",
  "en-progreso": "in-progress",
};

export default function TarjetaTarea({ tarea, onActualizar, onEliminar, onToast }) {
  const cambiar = async (nuevoEstado) => {
    // optimistic update
    onActualizar({ ...tarea, estado: nuevoEstado });

    let resultado;
    if (nuevoEstado === "completada") {
      resultado = await completarTarea(tarea.id);
    } else if (nuevoEstado === "pendiente") {
      resultado = await pendienteTarea(tarea.id);
    } else {
      resultado = await cambiarEstado(tarea.id, ESTADO_BACKEND[nuevoEstado]);
    }

    if (resultado.error) {
      onToast?.("Error al actualizar estado", "error");
    }
  };

  const eliminar = async () => {
    const { eliminarTarea } = await import("../services/api");
    const { error } = await eliminarTarea(tarea.id);
    if (error) {
      onToast?.("Error al eliminar tarea", "error");
    } else {
      onEliminar(tarea.id);
      onToast?.("Tarea eliminada", "success");
    }
  };

  return (
    <div className="task-card">
      <div className="task-card-header">
        <span className="task-card-title">{tarea.nombre}</span>
        <span className={`badge badge-${tarea.estado}`}>
          {ESTADOS.find((e) => e.valor === tarea.estado)?.label ?? tarea.estado}
        </span>
      </div>

      {tarea.descripcion && (
        <p className="task-card-desc">{tarea.descripcion}</p>
      )}

      <div className="task-card-footer">
        <span className="task-card-date">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="3" width="12" height="12" rx="2" />
            <path d="M5 1v2M11 1v2M2 7h12" />
          </svg>
          {tarea.fechaLimite
            ? new Date(tarea.fechaLimite + "T00:00:00").toLocaleDateString("es-MX", {
                day: "numeric", month: "short", year: "numeric",
              })
            : "Sin fecha"}
        </span>

        <div className="task-card-actions">
          <select
            className={`estado-select badge badge-${tarea.estado}`}
            value={tarea.estado}
            onChange={(e) => cambiar(e.target.value)}
          >
            {ESTADOS.map((e) => (
              <option key={e.valor} value={e.valor}>
                {e.label}
              </option>
            ))}
          </select>

          <button className="btn btn-ghost btn-sm" onClick={eliminar} title="Eliminar">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M2 4h12M6 4V2h4v2M5 4l1 9h4l1-9" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
