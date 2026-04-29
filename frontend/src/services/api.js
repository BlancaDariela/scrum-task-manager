const BASE_URL = process.env.REACT_APP_API_URL || "";

const handle = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return { data: null, error: data.detail || "Error en el servidor" };
  return { data, error: null };
};

// ─── TEAM 1 — CRUD completo ──────────────────────────────────────────────────
export const crearTarea = (body) =>
  fetch(`${BASE_URL}/team1/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then(handle);

export const obtenerTareas = () =>
  fetch(`${BASE_URL}/team1/tasks`).then(handle);

export const obtenerTareaPorId = (id) =>
  fetch(`${BASE_URL}/team1/tasks/${id}`).then(handle);

export const actualizarTarea = (id, body) =>
  fetch(`${BASE_URL}/team1/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then(handle);

export const eliminarTarea = (id) =>
  fetch(`${BASE_URL}/team1/tasks/${id}`, { method: "DELETE" }).then(handle);

// ─── TEAM 2 — Listado ────────────────────────────────────────────────────────
export const listarTareas = () =>
  fetch(`${BASE_URL}/team2/tasks/list`).then(handle);

export const ordenarPorNombre = () =>
  fetch(`${BASE_URL}/team2/tasks/sorted/name`).then(handle);

export const ordenarPorLongitud = () =>
  fetch(`${BASE_URL}/team2/tasks/sorted/length`).then(handle);

export const limitarTareas = (limit = 5) =>
  fetch(`${BASE_URL}/team2/tasks/limit?limit=${limit}`).then(handle);

export const listadoAvanzado = () =>
  fetch(`${BASE_URL}/team2/tasks/advanced`).then(handle);

// ─── TEAM 3 — Estados ────────────────────────────────────────────────────────
export const completarTarea = (id) =>
  fetch(`${BASE_URL}/team3/tasks/${id}/complete`, { method: "PUT" }).then(handle);

export const pendienteTarea = (id) =>
  fetch(`${BASE_URL}/team3/tasks/${id}/pending`, { method: "PUT" }).then(handle);

export const cambiarEstado = (id, status) =>
  fetch(`${BASE_URL}/team3/tasks/${id}/status?status=${status}`, {
    method: "PUT",
  }).then(handle);

export const obtenerPorEstado = (state) =>
  fetch(`${BASE_URL}/team3/tasks/status/${state}`).then(handle);

export const contarPorEstado = () =>
  fetch(`${BASE_URL}/team3/tasks/status/count`).then(handle);

// ─── TEAM 4 — Búsqueda / Filtros ─────────────────────────────────────────────
export const buscarExacta = (name) =>
  fetch(`${BASE_URL}/team4/tasks/search?name=${encodeURIComponent(name)}`).then(handle);

export const buscarKeyword = (keyword) =>
  fetch(`${BASE_URL}/team4/tasks/search/keyword?keyword=${encodeURIComponent(keyword)}`).then(handle);

export const filtrarPorEstado = (state) =>
  fetch(`${BASE_URL}/team4/tasks/filter?state=${state}`).then(handle);

export const busquedaAvanzada = (name = "", state = "") =>
  fetch(
    `${BASE_URL}/team4/tasks/search/advanced?name=${encodeURIComponent(name)}&state=${state}`
  ).then(handle);

// ─── TEAM 5 — Estadísticas ───────────────────────────────────────────────────
export const totalTareas = () =>
  fetch(`${BASE_URL}/team5/stats/total`).then(handle);

export const tareasCompletadas = () =>
  fetch(`${BASE_URL}/team5/stats/completed`).then(handle);

export const porcentajeAvance = () =>
  fetch(`${BASE_URL}/team5/stats/percentage`).then(handle);

export const promedioLongitud = () =>
  fetch(`${BASE_URL}/team5/stats/avg-length`).then(handle);

export const resumenEstadisticas = () =>
  fetch(`${BASE_URL}/team5/stats/summary`).then(handle);

// ─── TEAM 6 — Almacenamiento ─────────────────────────────────────────────────
export const guardarDatos = (body) =>
  fetch(`${BASE_URL}/team6/storage/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then(handle);

export const cargarDatos = () =>
  fetch(`${BASE_URL}/team6/storage/load`).then(handle);

export const actualizarDatos = (body) =>
  fetch(`${BASE_URL}/team6/storage/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then(handle);

export const reiniciarDatos = () =>
  fetch(`${BASE_URL}/team6/storage/reset`, { method: "DELETE" }).then(handle);

export const estadoStorage = () =>
  fetch(`${BASE_URL}/team6/storage/status`).then(handle);

// ─── TEAM 8 — Reportes ───────────────────────────────────────────────────────
export const reporteTareas = () =>
  fetch(`${BASE_URL}/team8/reports/tasks`).then(handle);

export const reporteCompletadas = () =>
  fetch(`${BASE_URL}/team8/reports/completed`).then(handle);

export const reportePendientes = () =>
  fetch(`${BASE_URL}/team8/reports/pending`).then(handle);

export const reporteCompleto = () =>
  fetch(`${BASE_URL}/team8/reports/full`).then(handle);

export const reporteResumen = () =>
  fetch(`${BASE_URL}/team8/reports/summary`).then(handle);

// ─── TEAM 9 — Flujo de trabajo ───────────────────────────────────────────────
export const ejecutarFlujo = (name) =>
  fetch(`${BASE_URL}/team9/workflow/task?name=${encodeURIComponent(name)}`, {
    method: "POST",
  }).then(handle);

export const resultadoFlujo = () =>
  fetch(`${BASE_URL}/team9/workflow/result`).then(handle);

// ─── Mapper: normaliza la respuesta del backend al shape del frontend ─────────
export const normalizarTarea = (t) => ({
  id: t.id,
  nombre: t.name ?? t.nombre ?? "",
  estado: mapEstado(t.status ?? t.estado ?? "pending"),
});

const mapEstado = (s) => {
  const m = { pending: "pendiente", completed: "completada", "in-progress": "en-progreso" };
  return m[s] ?? s;
};

export const desnormalizarTarea = (t) => ({
  name: t.nombre,
  status: mapEstadoInverso(t.estado),
});

const mapEstadoInverso = (s) => {
  const m = { pendiente: "pending", completada: "completed", "en-progreso": "in-progress" };
  return m[s] ?? s;
};
