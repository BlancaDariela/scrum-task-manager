export default function ContadorTareas({ tareas }) {
  const total = tareas.length;
  const completadas = tareas.filter((t) => t.estado === "completada").length;
  const pendientes = tareas.filter((t) => t.estado === "pendiente").length;
  const enProgreso = tareas.filter((t) => t.estado === "en-progreso").length;
  const porcentaje = total > 0 ? Math.round((completadas / total) * 100) : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-value">{total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item">
          <span className="stat-value" style={{ color: "var(--completada-fg)" }}>
            {completadas}
          </span>
          <span className="stat-label">Completadas</span>
        </div>
        <div className="stat-item">
          <span className="stat-value" style={{ color: "var(--pending-fg)" }}>
            {pendientes}
          </span>
          <span className="stat-label">Pendientes</span>
        </div>
        <div className="stat-item">
          <span className="stat-value" style={{ color: "var(--progreso-fg)" }}>
            {enProgreso}
          </span>
          <span className="stat-label">En progreso</span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div className="progress-bar-wrap" style={{ flex: 1 }}>
          <div className="progress-bar-fill" style={{ width: `${porcentaje}%` }} />
        </div>
        <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", minWidth: 36, textAlign: "right" }}>
          {porcentaje}%
        </span>
      </div>
    </div>
  );
}
