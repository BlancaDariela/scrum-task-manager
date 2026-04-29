import { NavLink } from "react-router-dom";

export default function Navbar({ onAbrirFlujo, onAbrirStorage }) {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        <span>
          <svg viewBox="0 0 16 16" fill="none" stroke="#0f0f11" strokeWidth="2" strokeLinecap="round">
            <path d="M2 4h12M2 8h8M2 12h10" />
          </svg>
        </span>
        Gestor de Tareas
      </NavLink>

      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
          Panel
        </NavLink>
        <NavLink to="/reportes" className={({ isActive }) => isActive ? "active" : ""}>
          Reportes
        </NavLink>
        <button className="btn-modal" onClick={onAbrirFlujo}>
          Flujo de tarea
        </button>
        <button className="btn-modal" onClick={onAbrirStorage}>
          Almacenamiento
        </button>
      </div>
    </nav>
  );
}
