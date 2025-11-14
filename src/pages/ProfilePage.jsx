import { useState, useEffect } from "react";
import Loading from "../components/Loading";

const ProfilePage = ({ onLogout }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUserData(data.user);
      } else {
        console.error("Error al obtener perfil, cerrando sesión");
        onLogout();
      }
    } catch (error) {
      console.error(error);
      onLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogoutClick = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        method: 'POST',
        credentials: "include",
      });
    } catch (error) {
      console.error("Error al cerrar sesión en el backend:", error);
    } finally {
      onLogout();
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark text-white py-5">
      <div className="card bg-secondary shadow-lg" style={{ width: '100%', maxWidth: '600px' }}>
        <div className="card-body p-4">
          {loading && <Loading />}
          
          <h2 className="card-title text-center h3 mb-4">Mi Perfil</h2>
          
          {!loading && userData && (
            <div>
              <div className="text-center mb-4">
                <div 
                  className="rounded-circle bg-danger d-inline-flex align-items-center justify-content-center"
                  style={{ width: '80px', height: '80px' }}
                >
                  <span className="h1">{userData.name.charAt(0).toUpperCase()}</span>
                </div>
                <h3 className="mt-3">{userData.name} {userData.lastname}</h3>
              </div>
              
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-secondary text-white d-flex justify-content-between align-items-center">
                  <strong>ID de Usuario:</strong>
                  <span className="badge bg-dark p-2">{userData.id}</span>
                </li>
                <li className="list-group-item bg-secondary text-white d-flex justify-content-between align-items-center">
                  <strong>Nombre:</strong>
                  <span>{userData.name}</span>
                </li>
                <li className="list-group-item bg-secondary text-white d-flex justify-content-between align-items-center">
                  <strong>Apellido:</strong>
                  <span>{userData.lastname}</span>
                </li>
                 <li className="list-group-item bg-secondary text-white d-flex justify-content-between align-items-center">
                  <strong>Email:</strong>
                  <span>{userData.email}</span>
                </li>
              </ul>

              <button
                onClick={handleLogoutClick}
                className="btn btn-danger w-100 mt-4"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;