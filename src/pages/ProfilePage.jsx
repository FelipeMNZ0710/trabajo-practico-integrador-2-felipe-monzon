import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const ProfilePage = ({ onLogout }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/profile", { credentials: "include" });

    if (res.status === 401) {
      onLogout();
      navigate("/login");
      return;
    }

    const data = await res.json();
    setUserData(data.user);
  } catch (error) {
    console.error(error);
    onLogout();
  } finally {
    setLoading(false);
  }
};


  useEffect(() => { fetchProfile(); }, []);

  const handleLogoutClick = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", { credentials: "include" });
    } catch (error) {
      console.error("Error al cerrar sesión en el backend:", error);
    } finally {
      onLogout();
      navigate("/login");
    }
  };

  return (
    <main className="min-vh-100 py-5">
      <div className="container d-flex justify-content-center">
        <section className="card" style={{ maxWidth: 720, width: "100%" }}>
          {loading && <Loading />}

          <div className="card-body">
            <div className="text-center mb-4">
              <div className="avatar-lg bg-danger text-white rounded-circle d-inline-flex align-items-center justify-content-center">
                {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
              </div>
              <h1 className="h4 mt-3">{userData?.name ? `${userData.name} ${userData.lastname}` : "Mi Perfil"}</h1>
              <p className="text-muted small">Información personal</p>
            </div>

            {!loading && userData && (
              <div className="d-grid gap-3">
                <div className="d-flex justify-content-between align-items-center border rounded p-3">
                  <small className="text-muted">ID de Usuario</small>
                  <div className="text-end"><small className="fw-medium">{userData.id}</small></div>
                </div>

                <div className="d-flex justify-content-between align-items-center border rounded p-3">
                  <small className="text-muted">Nombre</small>
                  <div className="text-end"><small className="fw-medium">{userData.name}</small></div>
                </div>

                <div className="d-flex justify-content-between align-items-center border rounded p-3">
                  <small className="text-muted">Apellido</small>
                  <div className="text-end"><small className="fw-medium">{userData.lastname}</small></div>
                </div>

                {userData.email && (
                  <div className="d-flex justify-content-between align-items-center border rounded p-3">
                    <small className="text-muted">Correo</small>
                    <div className="text-end"><small className="fw-medium text-truncate" style={{ maxWidth: 300 }}>{userData.email}</small></div>
                  </div>
                )}

                <button onClick={handleLogoutClick} className="btn btn-danger mt-2">Cerrar Sesión</button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
