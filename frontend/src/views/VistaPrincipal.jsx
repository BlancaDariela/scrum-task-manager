import { useState, useEffect, useCallback } from "react";
import FormularioTarea from "../components/FormularioTarea";
import ListaTareas from "../components/ListaTareas";
import FiltroTareas from "../components/FiltroTareas";
import ContadorTareas from "../components/ContadorTareas";
import { obtenerTareas, busquedaAvanzada, normalizarTarea } from "../services/api";

const FILTROS_INICIAL = { estado: "", desde: "", hasta: "", keyword: "" };

export default function VistaPrincipal({ tareas, setTareas, onToast }) {
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState(FILTROS_INICIAL);
  const [busqueda, setBusqueda] = useState("");

  const cargarTareas = useCallback(async () => {
    setCargando(true);
    setError(null);
    
    let resultado;
    if (filtros.estado || filtros.keyword) {
      resultado = await busquedaAvanzada(filtros.keyword, filtros.estado);
    } else {
      resultado = await obtenerTareas();
    }

    if (resultado.error) {
      setError(resultado.error);
      const local = localStorage.getItem("todo_tareas");
      if (local) {
        try { setTareas(JSON.parse(local)); } catch {}
      }
    } else {
      // Normalizar array de tareas devuelto por el backend
      const arr = Array.isArray(resultado.data)
        ? resultado.data.map(normalizarTarea)
        : Array.isArray(resultado.data?.tasks)
        ? resultado.data.tasks.map(normalizarTarea)
        : [];
      setTareas(arr);
    }

    setCargando(false);
  }, [filtros.estado, filtros.keyword, setTareas]);

  useEffect(() => { cargarTareas(); }, [cargarTareas]);

  // Filtro client-side por fecha y búsqueda
  const tareasFiltradas = tareas.filter((t) => {
    if (filtros.desde && t.fechaLimite && t.fechaLimite < filtros.desde) return false;
    if (filtros.hasta && t.fechaLimite && t.fechaLimite > filtros.hasta) return false;
    return true;
  });

  const agregarTarea = (nueva) => setTareas((prev) => [nueva, ...prev]);

  const actualizarTarea = (actualizada) =>
    setTareas((prev) => prev.map((t) => (t.id === actualizada.id ? actualizada : t)));

  const eliminarTarea = (id) =>
    setTareas((prev) => prev.filter((t) => t.id !== id));

  const limpiarFiltros = () => { setFiltros(FILTROS_INICIAL); setBusqueda(""); };

  return (
    <div className="dashboard-layout">
      <FiltroTareas
        filtros={filtros}
        onChange={setFiltros}
        onLimpiar={limpiarFiltros}
      />

      <div className="main-content">
        <ContadorTareas tareas={tareas} />

        <FormularioTarea onCrear={agregarTarea} onToast={onToast} />

        <ListaTareas
          tareas={tareasFiltradas}
          cargando={cargando}
          error={error}
          onActualizar={actualizarTarea}
          onEliminar={eliminarTarea}
          busqueda={busqueda}
          onBusqueda={setBusqueda}
          onToast={onToast}
        />
      </div>
    </div>
  );
}
