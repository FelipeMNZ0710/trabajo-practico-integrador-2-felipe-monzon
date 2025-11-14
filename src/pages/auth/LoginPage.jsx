import { useState } from "react";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import Loading from "../../components/Loading";

const LoginPage = ({ onLoginSuccess }) => {
  const { values, handleChange, handleReset } = useForm({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.username || !values.password) {
      return alert("Todos los campos son obligatorios");
    }
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        onLoginSuccess();
      } else {
        alert(data.message || "Credenciales inválidas");
        handleReset();
      }
    } catch (err) {
      console.error(err);
      alert("Error al conectar con el servidor");
      handleReset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark text-white">
      {loading && <Loading />}

      <div className="card bg-secondary p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body">
          <h2 className="card-title text-center h3 mb-3">Bienvenido</h2>
          <p className="text-center text-white-50 mb-4">
            Inicia sesión para continuar
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Usuario
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                placeholder="Tu nombre de usuario"
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="form-control"
                required
              />
            </div>

            <button type="submit" className="btn btn-danger w-100 mt-3">
              Ingresar
            </button>
          </form>

          <p className="text-center text-white-50 mt-4 mb-0">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-danger fw-bold text-decoration-none">
              Registrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;