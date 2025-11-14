import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import Loading from "../../components/Loading";

const RegisterPage = ({ onLoginSuccess }) => {
  const { values, handleChange, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !values.username ||
      !values.email ||
      !values.password ||
      !values.firstname ||
      !values.lastname
    ) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    setLoading(true);

    const payload = {
      name: values.firstname,
      lastname: values.lastname,
      username: values.username,
      email: values.email,
      password: values.password,
    };

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (res.status === 201) {
        alert("Registrado exitosamente");
        handleReset();

        // Llamar login‐success para actualizar estado de autenticación
        onLoginSuccess();

        navigate("/home");
        return;
      }

      const data = await res.json();
      alert(data.message || "Error en el registro");
      handleReset();
    } catch (err) {
      console.error(err);
      alert("Error de conexión al servidor");
      handleReset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-vh-100 d-flex align-items-center justify-content-center bg-dark text-light py-5">
      {loading && <Loading />}

      <div
        className="card bg-secondary bg-opacity-10 border-secondary"
        style={{ maxWidth: 680, width: "100%" }}
      >
        <div className="card-body p-4">
          <h2 className="card-title text-center mb-2">Crear cuenta</h2>
          <p className="text-center text-muted mb-4 small">
            Completa los campos para registrarte
          </p>

          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-12 col-md-6">
              <label
                htmlFor="username"
                className="form-label small text-muted"
              >
                Usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={values.username}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="email" className="form-label small text-muted">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-12 col-md-6">
              <label
                htmlFor="password"
                className="form-label small text-muted"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-6 col-md-3">
              <label
                htmlFor="firstname"
                className="form-label small text-muted"
              >
                Nombre
              </label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                value={values.firstname}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-6 col-md-3">
              <label
                htmlFor="lastname"
                className="form-label small text-muted"
              >
                Apellido
              </label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                value={values.lastname}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-12">
              <button
                type="submit"
                className="btn btn-danger w-100"
                disabled={loading}
              >
                {loading ? "Registrando..." : "Registrarse"}
              </button>
            </div>
          </form>

          <p className="text-center small text-muted mt-3 mb-0">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-danger fw-medium">
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
