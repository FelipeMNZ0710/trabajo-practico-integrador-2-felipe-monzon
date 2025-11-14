import { useState } from "react";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import Loading from "../../components/Loading";

const RegisterPage = ({ onLoginSuccess }) => {
  const { values, handleChange, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
    name: "",
    lastname: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        onLoginSuccess();
      } else {
        alert(data.message || "Error en el registro. Verifique los datos.");
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
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark text-white py-5">
      {loading && <Loading />}

      <div className="card bg-secondary p-4 shadow-lg" style={{ width: '100%', maxWidth: '500px' }}>
        <div className="card-body">
          <h2 className="card-title text-center h3 mb-3">Crear cuenta</h2>
          <p className="text-center text-white-50 mb-4">
            Completa los campos para registrarte
          </p>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Juan"
                  value={values.name}
                  onChange={handleChange}
                  disabled={loading}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastname" className="form-label">Apellido</label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  placeholder="Pérez"
                  value={values.lastname}
                  onChange={handleChange}
                  disabled={loading}
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="username" className="form-label">Usuario</label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="juanperez123"
                value={values.username}
                onChange={handleChange}
                disabled={loading}
                className="form-control"
                required
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={values.email}
                onChange={handleChange}
                disabled={loading}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={values.password}
                onChange={handleChange}
                disabled={loading}
                className="form-control"
                required
              />
            </div>

            <button type="submit" className="btn btn-danger w-100 mt-3" disabled={loading}>
              {loading ? "Registrando..." : "Registrarse"}
            </button>
          </form>

          <p className="text-center text-white-50 mt-4 mb-0">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-danger fw-bold text-decoration-none">
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;