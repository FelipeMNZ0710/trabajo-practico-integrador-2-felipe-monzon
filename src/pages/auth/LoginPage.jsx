import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import Loading from "../../components/Loading";

const LoginPage = ({ onLoginSuccess }) => {
  const { values, handleChange, handleReset } = useForm({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.username || !values.password) {
      alert("Por favor completa todos los campos.");
      return;
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
        navigate("/home");
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
    <main className="min-vh-100 d-flex align-items-center justify-content-center">
      {loading && <Loading />}

      <div className="card p-4" style={{ maxWidth: 420, width: "100%" }}>
        <h2 className="text-center mb-2">Bienvenido</h2>
        <p className="text-center text-muted small mb-4">Inicia sesión para continuar</p>

        <form onSubmit={handleSubmit} className="mb-0">
          <div className="mb-3">
            <label htmlFor="username" className="form-label small text-muted">Usuario</label>
            <input id="username" name="username" type="text" value={values.username} onChange={handleChange} className="form-control" placeholder="Tu nombre de usuario" required />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label small text-muted">Contraseña</label>
            <input id="password" name="password" type="password" value={values.password} onChange={handleChange} className="form-control" placeholder="••••••••" required />
          </div>

          <button type="submit" className="btn btn-danger w-100" disabled={loading}>Ingresar</button>
        </form>

        <p className="text-center small text-muted mt-3 mb-0">
          ¿No tienes cuenta? <Link to="/register" className="text-danger fw-medium">Registrate</Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
