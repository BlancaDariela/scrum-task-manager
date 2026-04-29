import { useState } from "react";
import { ejecutarFlujo, resultadoFlujo } from "../services/api";

const PASOS = [
  { label: "Crear tarea de ejemplo", desc: "Se genera una tarea con nombre y estado 'pendiente'" },
  { label: "Cambiar estado", desc: "El estado pasa a 'en progreso'" },
  { label: "Aplicar filtro", desc: "Se filtra la tarea por estado activo" },
  { label: "Ver conteo actualizado", desc: "Se muestra el resumen final del flujo" },
];

export default function ModalFlujo({ onCerrar }) {
  const [paso, setPaso] = useState(0);
  const [tareaEjemplo, setTareaEjemplo] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);

  const avanzar = async () => {
    setCargando(true);

    if (paso === 0) {
      const { data } = await ejecutarFlujo("Tarea de ejemplo");
      setTareaEjemplo(data?.task ?? { name: "Tarea de ejemplo", status: "completed" });
    }

    if (paso === 3) {
      const { data } = await resultadoFlujo();
      setResultado(data);
    }

    setCargando(false);
    if (paso < PASOS.length - 1) setPaso((p) => p + 1);
  };

  const reiniciar = () => { setPaso(0); setTareaEjemplo(null); setResultado(null); };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onCerrar()}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">Flujo de tarea</span>
          <button className="modal-close" onClick={onCerrar}>✕</button>
        </div>
        <div className="modal-body">
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Simulación del ciclo de vida completo de una tarea. Solo lectura — no modifica la lista real.
          </p>

          <div className="flow-steps">
            {PASOS.map((p, i) => (
              <div
                key={i}
                className={`flow-step ${i < paso ? "done" : ""} ${i === paso ? "active" : ""}`}
              >
                <div className="flow-step-num">
                  {i < paso ? "✓" : i + 1}
                </div>
                <div className="flow-step-content">
                  <span className="flow-step-label">{p.label}</span>
                  <span className="flow-step-desc">{p.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {tareaEjemplo && (
            <div style={{ background: "var(--surface2)", borderRadius: 8, padding: "0.75rem 1rem", fontSize: "0.82rem" }}>
              <p style={{ color: "var(--text-muted)", marginBottom: 4, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Tarea generada</p>
              <p><strong>{tareaEjemplo.name}</strong> — <span className={`badge badge-completada`}>Completada</span></p>
            </div>
          )}

          {resultado && (
            <div style={{ background: "var(--surface2)", borderRadius: 8, padding: "0.75rem 1rem", fontSize: "0.82rem" }}>
              <p style={{ color: "var(--text-muted)", marginBottom: 4, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Resultado del flujo</p>
              <p>Tareas en sistema: <strong>{resultado.tasks?.length ?? 0}</strong></p>
            </div>
          )}

          <div style={{ display: "flex", gap: 8 }}>
            {paso < PASOS.length - 1 ? (
              <button className="btn btn-primary btn-full" onClick={avanzar} disabled={cargando}>
                {cargando ? <><span className="spinner" /> Procesando...</> : "Siguiente paso →"}
              </button>
            ) : (
              <button className="btn btn-secondary btn-full" onClick={reiniciar}>
                Reiniciar simulación
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
