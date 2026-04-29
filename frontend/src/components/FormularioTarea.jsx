import { useState } from "react";
import { crearTarea, normalizarTarea } from "../services/api";

export default function FormularioTarea({ onCrear, onToast }) {
  const [form, setForm] = useState({ nombre: "", descripcion: "", fechaLimite: "" });
  const [cargando, setCargando] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const enviar = async () => {
    if (!form.nombre.trim()) {
      onToast?.("El título es obligatorio", "error");
      return;
    }

    setCargando(true);
    const { data, error } = await crearTarea({
      name: form.nombre.trim(),
      status: "pending",
    });
    setCargando(false);

    if (error) {
      onToast?.(error, "error");
      return;
    }

    // El backend devuelve la tarea creada; la normalizamos
    const nueva = data?.id
      ? normalizarTarea({ ...data, descripcion: form.descripcion, fechaLimite: form.fechaLimite })
      : {
          id: Date.now(),
          nombre: form.nombre.trim(),
          descripcion: form.descripcion,
          fechaLimite: form.fechaLimite,
          estado: "pendiente",
        };

    onCrear(nueva);
    setForm({ nombre: "", descripcion: "", fechaLimite: "" });
    onToast?.("Tarea creada correctamente", "success");
  };

  return (
    <div className="card">
      <div className="card-title">Nueva tarea</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <div className="input-group">
          <label>Título *</label>
          <input
            type="text"
            placeholder="¿Qué hay que hacer?"
            value={form.nombre}
            onChange={set("nombre")}
            onKeyDown={(e) => e.key === "Enter" && enviar()}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 160px", gap: "0.75rem" }}>
          <div className="input-group">
            <label>Descripción</label>
            <input
              type="text"
              placeholder="Detalles opcionales..."
              value={form.descripcion}
              onChange={set("descripcion")}
            />
          </div>
          <div className="input-group">
            <label>Fecha límite</label>
            <input type="date" value={form.fechaLimite} onChange={set("fechaLimite")} />
          </div>
        </div>

        <button className="btn btn-primary" onClick={enviar} disabled={cargando}>
          {cargando ? (
            <><span className="spinner" /> Creando...</>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M8 2v12M2 8h12" />
              </svg>
              Agregar tarea
            </>
          )}
        </button>
      </div>
    </div>
  );
}
