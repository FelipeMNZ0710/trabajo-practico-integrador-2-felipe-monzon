import { Link } from "react-router-dom";

const Navbar = ({ authStatus, onLogout }) => {

  const handleLogoutClick = () => {
    console.log("Cerrando sesion...");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/home">
          Task<span className="text-danger">Manager</span>
        </Link>
        <div className="d-flex">
          {authStatus === "authenticated" ? (
            <>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/home">Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/tasks">Tareas</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Perfil</Link>
                </li>
              </ul>
              <button onClick={handleLogoutClick} className="btn btn-danger">
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Iniciar sesión</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Registrarse</Link>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;