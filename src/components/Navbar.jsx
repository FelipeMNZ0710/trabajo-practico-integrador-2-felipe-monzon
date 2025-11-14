import { Link } from "react-router-dom";

const Navbar = ({ authStatus, onLogout }) => {
  const handleLogoutClick = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Error al cerrar sesión en el backend:", error);
    } finally {
      onLogout();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand fw-semibold" to={authStatus === "authenticated" ? "/home" : "/"}>
          Felipe<span className="text-danger fw-bold"> Monzón</span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <div className="ms-auto d-flex align-items-center gap-3">
            {authStatus === "authenticated" ? (
              <>
                <Link to="/home" className="nav-link text-light">Inicio</Link>
                <Link to="/tasks" className="nav-link text-light">Tareas</Link>
                <Link to="/profile" className="nav-link text-light">Perfil</Link>
                <button onClick={handleLogoutClick} className="btn btn-danger btn-sm ms-2">Cerrar sesión</button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link text-light">Iniciar sesión</Link>
                <Link to="/register" className="nav-link text-light">Registrarse</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
