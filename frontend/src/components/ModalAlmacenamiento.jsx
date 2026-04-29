import { useState } from "react";
import { guardarDatos, cargarDatos, reiniciarDatos, estadoStorage } from "../services/api";

export default function ModalAlmacenamiento({ tareas, onCargar, onToast, onCerrar }) {
  const [ultimoGuardado, setUltimoGuardado] = useState(
    localStorage.getItem("todo_last_save") ?? null
  );
  const [cargando, setCargando] = useState(false);
  const [estadoApi, setEstadoApi] = useState(null);

  const guardar = async () => {
    setCargando(true);

    // Guardar en localStorage localmente
    localStorage.setItem("todo_tareas", JSON.stringify(tareas));
    const ahora = new Date().toLocaleString("es-MX");
    localStorage.setItem("todo_last_save", ahora);
    setUltimoGuardado(ahora);

    // También llamar al endpoint
    await guardarDatos({ tasks: tareas });
    setCargando(false);
    onToast?.("Datos guardados correctamente", "success");
  };

  const cargar = async () => {
    setCargando(true);
    const local = localStorage.getItem("todo_tareas");

    if (local) {
      try {
        const parsed = JSON.parse(local);
        onCargar(parsed);
        onToast?.("Tareas cargadas desde almacenamiento local", "success");
      } catch {
        onToast?.("Error al leer datos locales", "error");
      }
    }

    // También llamar al endpoint
    await cargarDatos();
    setCargando(false);
  };

  const reiniciar = async () => {
    localStorage.removeItem("todo_tareas");
    localStorage.removeItem("todo_last_save");
    setUltimoGuardado(null);
    await reiniciarDatos();
    onToast?.("Almacenamiento reiniciado", "success");
  };

  const verificarEstado = async () => {
    setCargando(true);
    const { data } = await estadoStorage();
    setEstadoApi(data?.message ?? "Sin respuesta");
    setCargando(false);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onCerrar()}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">Simulador de almacenamiento</span>
          <button className="modal-close" onClick={onCerrar}>✕</button>
        </div>
        <div className="modal-body">
          <div style={{ background: "var(--surface2)", borderRadius: 8, padding: "0.75rem 1rem", fontSize: "0.82rem" }}>
            <p style={{ color: "var(--text-muted)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
              Estado actual
            </p>
            <p>Tareas en memoria: <strong>{tareas.length}</strong></p>
            {ultimoGuardado && (
              <p style={{ color: "var(--text-muted)", marginTop: 4 }}>
                Último guardado: {ultimoGuardado}
              </p>
            )}
            {!ultimoGuardado && (
              <p style={{ color: "var(--text-dim)", marginTop: 4 }}>Sin datos guardados aún</p>
            )}
          </div>

          {estadoApi && (
            <div style={{ background: "var(--surface2)", borderRadius: 8, padding: "0.75rem 1rem", fontSize: "0.82rem" }}>
              <p style={{ color: "var(--text-muted)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Respuesta API</p>
              <p>{estadoApi}</p>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button className="btn btn-primary btn-full" onClick={guardar} disabled={cargando}>
              {cargando ? <><span className="spinner" /> Guardando...</> : "Guardar en almacenamiento"}
            </button>
            <button className="btn btn-secondary btn-full" onClick={cargar} disabled={cargando}>
              Cargar desde almacenamiento
            </button>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-ghost btn-full btn-sm" onClick={verificarEstado} disabled={cargando}>
                Verificar estado API
              </button>
              <button className="btn btn-danger btn-sm" onClick={reiniciar} disabled={cargando}>
                Reiniciar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
