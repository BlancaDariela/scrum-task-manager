import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import VistaPrincipal from "./views/VistaPrincipal";
import VistaReportes from "./views/VistaReportes";
import ModalFlujo from "./components/ModalFlujo";
import ModalAlmacenamiento from "./components/ModalAlmacenamiento";
import Toast from "./components/Toast";
import "./styles/global.css";

export default function App() {
  // Estado global de tareas
  const [tareas, setTareas] = useState([]);

  // Modales
  const [modalFlujo, setModalFlujo] = useState(false);
  const [modalStorage, setModalStorage] = useState(false);

  // Toast
  const [toast, setToast] = useState({ mensaje: "", tipo: "success" });

  const mostrarToast = (mensaje, tipo = "success") => setToast({ mensaje, tipo });

  // Auto-cargar desde localStorage al iniciar
  useEffect(() => {
    const local = localStorage.getItem("todo_tareas");
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTareas(parsed);
        }
      } catch {}
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar
          onAbrirFlujo={() => setModalFlujo(true)}
          onAbrirStorage={() => setModalStorage(true)}
        />

        <Routes>
          <Route
            path="/"
            element={
              <VistaPrincipal
                tareas={tareas}
                setTareas={setTareas}
                onToast={mostrarToast}
              />
            }
          />
          <Route
            path="/reportes"
            element={<VistaReportes tareas={tareas} />}
          />
        </Routes>
      </div>

      {modalFlujo && <ModalFlujo onCerrar={() => setModalFlujo(false)} />}

      {modalStorage && (
        <ModalAlmacenamiento
          tareas={tareas}
          onCargar={setTareas}
          onToast={mostrarToast}
          onCerrar={() => setModalStorage(false)}
        />
      )}

      <Toast
        mensaje={toast.mensaje}
        tipo={toast.tipo}
        onCerrar={() => setToast({ ...toast, mensaje: "" })}
      />
    </BrowserRouter>
  );
}
