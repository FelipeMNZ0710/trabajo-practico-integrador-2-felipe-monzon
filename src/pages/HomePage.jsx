import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";

export default function Home() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const { values, handleChange, handleReset } = useForm({
    title: "",
    description: "",
    is_completed: false,
  });

  const fetchStats = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/tasks/stats", {
      credentials: "include",
    });

    if (res.status === 401) { // si no está autenticado
      navigate("/login");      // redirige al login
      return;                  // y no intenta leer JSON
    }

    const data = await res.json();
    setStats(data);
  } catch (err) {
    console.error("Error trayendo estadísticas", err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchStats();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });
      handleReset();
      setShowModal(false);
      fetchStats();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando datos…</p>;

  return (
    <div className="home-wrapper">

      <header className="home-header">
        <h1>Panel General</h1>
        <p>Bienvenido, aquí verás el estado general de tus tareas.</p>
      </header>

      <div className="home-columns">

        <section className="home-section">
          <h2>Estado Actual</h2>

          <div className="data-list">
            <div className="data-item">
              <span className="label">Total de tareas:</span>
              <span className="value">{stats.total}</span>
            </div>

            <div className="data-item">
              <span className="label">Completadas:</span>
              <span className="value">{stats.completed}</span>
            </div>

            <div className="data-item">
              <span className="label">Pendientes:</span>
              <span className="value">{stats.pending}</span>
            </div>
          </div>
        </section>

        <aside className="home-section">
          <h2>Acciones rápidas</h2>

          <div className="actions">
            <button onClick={() => navigate("/tasks")}>
              Ver todas las tareas
            </button>
            <button onClick={() => setShowModal(true)}>
              Crear nueva tarea
            </button>
          </div>
        </aside>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Crear nueva tarea</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                placeholder="Título"
                required
              />
              <textarea
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="Descripción"
                required
              />
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="is_completed"
                    checked={values.is_completed}
                    onChange={handleChange}
                  />
                  Completada
                </label>
              </div>
              <div className="modal-actions">
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
