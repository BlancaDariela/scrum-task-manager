import TarjetaTarea from "./TarjetaTarea";

export default function ListaTareas({ tareas, cargando, error, onActualizar, onEliminar, busqueda, onBusqueda, onToast }) {
  const tareasFiltradas = tareas.filter((t) => {
    const q = busqueda.toLowerCase();
    return (
      t.nombre.toLowerCase().includes(q) ||
      (t.descripcion ?? "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="card" style={{ flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <div className="card-title" style={{ marginBottom: 0 }}>
          Tareas
          {tareas.length > 0 && (
            <span style={{ marginLeft: 8, color: "var(--text-dim)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>
              ({tareasFiltradas.length} de {tareas.length})
            </span>
          )}
        </div>
      </div>

      <div className="search-wrapper" style={{ marginBottom: "1rem" }}>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="6.5" cy="6.5" r="4.5" />
          <path d="M10 10l3 3" />
        </svg>
        <input
          type="text"
          placeholder="Buscar por título o descripción..."
          value={busqueda}
          onChange={(e) => onBusqueda(e.target.value)}
        />
      </div>

      {cargando && (
        <div className="loader">
          <div className="spinner" />
          Cargando tareas...
        </div>
      )}

      {error && !cargando && (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg width="22" height="22" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="8" cy="8" r="6" />
              <path d="M8 5v3M8 10.5v.5" />
            </svg>
          </div>
          <p style={{ fontSize: "0.85rem" }}>No se pudo conectar con el servidor</p>
          <p style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>{error}</p>
        </div>
      )}

      {!cargando && !error && tareasFiltradas.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg width="22" height="22" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M2 4h12M4 8h6M5 12h4" />
            </svg>
          </div>
          <p style={{ fontSize: "0.85rem" }}>
            {busqueda ? "Sin resultados para la búsqueda" : "No hay tareas todavía"}
          </p>
        </div>
      )}

      {!cargando && !error && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {tareasFiltradas.map((t) => (
            <TarjetaTarea
              key={t.id}
              tarea={t}
              onActualizar={onActualizar}
              onEliminar={onEliminar}
              onToast={onToast}
            />
          ))}
        </div>
      )}
    </div>
  );
}
