import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const HomePage = () => {
  const [userData, setUserData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadHomeData = async () => {
    try {
      const profilePromise = fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });
      const tasksPromise = fetch("http://localhost:3000/api/tasks-by-user", {
        credentials: "include",
      });
      const [profileRes, tasksRes] = await Promise.all([
        profilePromise,
        tasksPromise,
      ]);
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setUserData(profileData.user);
      } else {
        console.error("Error al cargar el perfil");
      }
      if (tasksRes.ok) {
        const tasksData = await tasksRes.json();
        setTasks(
          tasksData.tasks || (Array.isArray(tasksData) ? tasksData : [])
        );
      } else {
        console.error("Error al cargar las tareas");
      }
    } catch (error) {
      console.error("Error en las peticiones de Home:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHomeData();
  }, []);
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.is_completed).length;
  const pendingTasks = totalTasks - completedTasks;

  if (loading) {
    return (
      <main className="min-vh-100 bg-dark text-white p-4 position-relative">
        <Loading />
      </main>
    );
  }

  return (
    <div className="container mt-5 pt-5 text-white">
      <h1 className="display-5 text-center mb-5">
        Bienvenido,{" "}
        <span className="text-danger">{userData?.name || "Usuario"}</span>
      </h1>

      <div className="row text-center">
        <div className="col-md-4 mb-4">
          <div className="card bg-secondary h-100">
            <div className="card-body">
              <h3 className="display-1 fw-bold text-danger">{totalTasks}</h3>
              <p className="h5 text-white-50 mt-2">Total de Tareas</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card bg-secondary h-100">
            <div className="card-body">
              <h3 className="display-1 fw-bold text-success">{completedTasks}</h3>
              <p className="h5 text-white-50 mt-2">Completadas</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card bg-secondary h-100">
            <div className="card-body">
              <h3 className="display-1 fw-bold text-warning">{pendingTasks}</h3>
              <p className="h5 text-white-50 mt-2">Pendientes</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-4">
        <Link to="/tasks" className="btn btn-danger btn-lg">
          Ir a mis Tareas
        </Link>
      </div>
    </div>
  );
};

export default HomePage;