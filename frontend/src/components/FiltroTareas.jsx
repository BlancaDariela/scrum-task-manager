const ESTADOS = [
  { valor: "", label: "Todas" },
  { valor: "pendiente", label: "Pendiente" },
  { valor: "en-progreso", label: "En progreso" },
  { valor: "completada", label: "Completada" },
];

export default function FiltroTareas({ filtros, onChange, onLimpiar }) {
  return (
    <div className="sidebar">
      <div className="filter-section">
        <div className="filter-section-title">Estado</div>
        <div className="filter-chip-group">
          {ESTADOS.map((e) => (
            <button
              key={e.valor}
              className={`filter-chip ${filtros.estado === e.valor ? "active" : ""}`}
              onClick={() => onChange({ ...filtros, estado: e.valor })}
            >
              {e.label}
            </button>
          ))}
        </div>
      </div>

      <div className="divider" />

      <div className="filter-section">
        <div className="filter-section-title">Rango de fechas</div>
        <div className="input-group">
          <label>Desde</label>
          <input
            type="date"
            value={filtros.desde}
            onChange={(e) => onChange({ ...filtros, desde: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label>Hasta</label>
          <input
            type="date"
            value={filtros.hasta}
            onChange={(e) => onChange({ ...filtros, hasta: e.target.value })}
          />
        </div>
      </div>

      <div className="divider" />

      <button className="btn btn-secondary btn-full btn-sm" onClick={onLimpiar}>
        Limpiar filtros
      </button>
    </div>
  );
}
