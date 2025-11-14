import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import useForm from "../hooks/useForm";

const Tasks = () => {
  const { values, handleChange, handleReset } = useForm({
    title: "",
    description: "",
    is_completed: false,
  });

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
  try {
    setLoading(true);
    const res = await fetch("http://localhost:3000/api/tasks-by-user", {
      credentials: "include",
      cache: "no-store",
    });

    if (res.status === 401) {
      navigate("/login");
      return;
    }

    const data = await res.json();
    setTasks(data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Error al crear la tarea");

      handleReset();
      await fetchTasks();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleCompleted = async (taskId, currentStatus) => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ is_completed: !currentStatus }),
      });

      setTasks(
        tasks.map((t) =>
          t.id === taskId ? { ...t, is_completed: !currentStatus } : t
        )
      );
    } catch (err) {
      console.error("Error al actualizar la tarea", err);
    }
  };

  if (loading) return <Loading />;

  return (
    <main className="container py-5">
      <h1 className="text-primary mb-4">Tus Tareas</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="Título de la tarea"
            required
          />
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="Descripción"
            required
          />
          <div className="form-check mb-2">
            <input
              type="checkbox"
              name="is_completed"
              checked={values.is_completed}
              onChange={handleChange}
              className="form-check-input"
              id="completedCheck"
            />
            <label className="form-check-label" htmlFor="completedCheck">
              Completada
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Agregar Tarea
        </button>
      </form>

      <div className="list-group">
        {tasks.length === 0 ? (
          <p className="text-muted">No hay tareas aún</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                task.is_completed ? "list-group-item-success" : ""
              }`}
            >
              <div className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.is_completed}
                  onChange={() => toggleCompleted(task.id, task.is_completed)}
                />
                <div>
                  <h5>{task.title}</h5>
                  <p className="mb-0">{task.description}</p>
                </div>
              </div>
              <span className="badge bg-secondary">
                {task.is_completed ? "Completada" : "Pendiente"}
              </span>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Tasks;
