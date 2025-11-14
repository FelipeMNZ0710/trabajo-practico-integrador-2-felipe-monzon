import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import useForm from "../hooks/useForm";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { values, setValues, handleChange, handleReset } = useForm({
    title: "",
    description: "",
    is_completed: false,
  });
  const [idToEdit, setIdToEdit] = useState(null);

  const fetchTasks = async () => {
    if (tasks.length === 0) {
      setLoading(true);
    }

    try {
      const res = await fetch("http://localhost:3000/api/tasks-by-user", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setTasks(data.tasks || (Array.isArray(data) ? data : []));
      } else {
        console.error("Error al obtener las tareas");
        setTasks([]);
      }
    } catch (error) {
      console.error(error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (idToEdit) {
      handleUpdateTask();
    } else {
      handleCreateTask();
    }
  };

  const handleSelectEdit = (task) => {
    setIdToEdit(task.id);
    setValues({
      title: task.title,
      description: task.description,
      is_completed: task.is_completed,
    });
  };

  const handleCancelEdit = () => {
    setIdToEdit(null);
    handleReset();
  };

  const handleCreateTask = async () => {
    if (!values.title) {
      alert("El título es obligatorio");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        alert("¡Tarea creada exitosamente!");
        handleReset();
        fetchTasks();
      } else {
        const data = await res.json();
        alert(data.message || "Error al crear la tarea");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión al crear la tarea");
    }
  };

  const handleUpdateTask = async () => {
    if (!values.title) {
      alert("El título es obligatorio");
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${idToEdit}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });

      if (res.ok) {
        alert("¡Tarea actualizada exitosamente!");
        handleCancelEdit();
        fetchTasks();
      } else {
        const data = await res.json();
        alert(data.message || "Error al actualizar la tarea");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión al actualizar la tarea");
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        alert("Tarea eliminada exitosamente");
        fetchTasks();
      } else {
        const data = await res.json();
        alert(data.message || "Error al eliminar la tarea");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión al eliminar la tarea");
    }
  };

  return (
    <div className="container mt-5 pt-5 text-white">
      <div className="row">
        <div className="col-md-4">
          <div className="card bg-secondary p-3 shadow-lg">
            <h2 className="text-center h4 mb-3">
              {idToEdit ? "Editar Tarea" : "Crear Tarea"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Título</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  placeholder="Ej: Estudiar React"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Descripción</label>
                <textarea
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Detalles de la tarea..."
                  className="form-control"
                ></textarea>
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  id="is_completed"
                  name="is_completed"
                  checked={values.is_completed}
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label htmlFor="is_completed" className="form-check-label">
                  Marcar como completada
                </label>
              </div>
              <button type="submit" className="btn btn-danger w-100">
                {idToEdit ? "Actualizar Tarea" : "Guardar Tarea"}
              </button>
              {idToEdit && (
                <button type="button" onClick={handleCancelEdit} className="btn btn-dark w-100 mt-2">
                  Cancelar Edición
                </button>
              )}
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <h2 className="text-center h4 mb-3">Mis Tareas</h2>
          <div className="card bg-secondary p-3 shadow-lg" style={{ minHeight: '200px' }}>
            {loading ? <Loading /> : (
              tasks.length === 0 ? (
                <p className="text-center text-white-50 mt-5">Aún no tienes tareas. ¡Añade una!</p>
              ) : (
                <ul className="list-group">
                  {tasks.map((task) => (
                    <li key={task.id} className="list-group-item bg-dark text-white d-flex justify-content-between align-items-center mb-2 border-secondary">
                      <div>
                        <h5 className={task.is_completed ? "text-decoration-line-through text-muted" : ""}>
                          {task.title}
                        </h5>
                        <p className={`mb-0 small ${task.is_completed ? "text-decoration-line-through text-muted" : "text-white-50"}`}>
                          {task.description}
                        </p>
                      </div>
                      <div className="d-flex gap-2">
                        <button onClick={() => handleSelectEdit(task)} className="btn btn-warning btn-sm">
                          Editar
                        </button>
                        <button onClick={() => handleDelete(task.id)} className="btn btn-danger btn-sm">
                          Borrar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;