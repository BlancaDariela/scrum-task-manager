import { useState, useEffect } from "react";
import { reporteCompleto } from "../services/api";

const ESTADOS_LABEL = {
  pendiente: "Pendiente",
  "en-progreso": "En progreso",
  completada: "Completada",
};

export default function VistaReportes({ tareas }) {
  const [reporteApi, setReporteApi] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const fetchReporte = async () => {
      setCargando(true);
      const { data } = await reporteCompleto();
      if (data) setReporteApi(data);
      setCargando(false);
    };
    fetchReporte();
  }, []);

  // Calcular estadísticas locales desde el estado global
  const porEstado = ["pendiente", "en-progreso", "completada"].map((e) => ({
    estado: e,
    cantidad: tareas.filter((t) => t.estado === e).length,
  }));

  const total = tareas.length;
  const completadas = tareas.filter((t) => t.estado === "completada").length;
  const porcentaje = total > 0 ? Math.round((completadas / total) * 100) : 0;

  const masReciente = [...tareas].sort((a, b) =>
    (b.fechaLimite ?? "").localeCompare(a.fechaLimite ?? "")
  )[0];

  const exportar = () => {
    const reporte = {
      generadoEn: new Date().toISOString(),
      total,
      completadas,
      porcentaje: `${porcentaje}%`,
      porEstado,
      tareaReciente: masReciente ?? null,
      apiRespuesta: reporteApi ?? null,
    };
    console.log("📋 Reporte exportado:", reporte);
    alert("Reporte exportado en consola (F12)");
  };

  return (
    <div className="reports-layout">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ fontSize: "1.4rem" }}>Reportes</h2>
        <button className="btn btn-primary" onClick={exportar}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M8 2v9M4 8l4 4 4-4M2 14h12" />
          </svg>
          Exportar reporte
        </button>
      </div>

      {/* Resumen general */}
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-value">{total}</span>
          <span className="stat-label">Total de tareas</span>
        </div>
        <div className="stat-item">
          <span className="stat-value" style={{ color: "var(--completada-fg)" }}>{completadas}</span>
          <span className="stat-label">Completadas</span>
        </div>
        <div className="stat-item">
          <span className="stat-value" style={{ color: "var(--pending-fg)" }}>
            {tareas.filter((t) => t.estado === "pendiente").length}
          </span>
          <span className="stat-label">Pendientes</span>
        </div>
        <div className="stat-item">
          <span className="stat-value text-accent">{porcentaje}%</span>
          <span className="stat-label">Avance</span>
        </div>
      </div>

      {/* Progreso */}
      <div className="card">
        <div className="card-title">Progreso general</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className="progress-bar-wrap" style={{ flex: 1 }}>
            <div className="progress-bar-fill" style={{ width: `${porcentaje}%` }} />
          </div>
          <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--accent)", minWidth: 40 }}>
            {porcentaje}%
          </span>
        </div>
      </div>

      {/* Tabla por estado */}
      <div className="card">
        <div className="card-title">Tareas por estado</div>
        <table className="report-table">
          <thead>
            <tr>
              <th>Estado</th>
              <th>Cantidad</th>
              <th>Porcentaje</th>
            </tr>
          </thead>
          <tbody>
            {porEstado.map((row) => (
              <tr key={row.estado}>
                <td>
                  <span className={`badge badge-${row.estado}`}>
                    {ESTADOS_LABEL[row.estado]}
                  </span>
                </td>
                <td style={{ fontWeight: 600 }}>{row.cantidad}</td>
                <td style={{ color: "var(--text-muted)" }}>
                  {total > 0 ? `${Math.round((row.cantidad / total) * 100)}%` : "0%"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tarea más reciente */}
      {masReciente && (
        <div className="card">
          <div className="card-title">Tarea más reciente</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <div>
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>{masReciente.nombre}</p>
              {masReciente.descripcion && (
                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 2 }}>
                  {masReciente.descripcion}
                </p>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className={`badge badge-${masReciente.estado}`}>
                {ESTADOS_LABEL[masReciente.estado]}
              </span>
              {masReciente.fechaLimite && (
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  {new Date(masReciente.fechaLimite + "T00:00:00").toLocaleDateString("es-MX", {
                    day: "numeric", month: "long", year: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Respuesta API (si hay) */}
      {(reporteApi || cargando) && (
        <div className="card">
          <div className="card-title">Respuesta del servidor (team8)</div>
          {cargando ? (
            <div className="loader"><div className="spinner" /> Consultando API...</div>
          ) : (
            <pre style={{
              fontSize: "0.78rem",
              color: "var(--text-muted)",
              background: "var(--bg)",
              padding: "0.75rem",
              borderRadius: 8,
              overflow: "auto",
              maxHeight: 200,
            }}>
              {JSON.stringify(reporteApi, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
