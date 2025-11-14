import { useState, useEffect } from "react";
import AppRouter from "./router/AppRouter";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";

const App = () => {
  const [authStatus, setAuthStatus] = useState("checking");

  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });

      if (res.ok) {
        setAuthStatus("authenticated");
      } else {
        setAuthStatus("unauthenticated");
      }
    } catch (error) {
      console.error("Error de conexión, no se pudo verificar la sesión", error);
      setAuthStatus("unauthenticated");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogin = () => {
    setAuthStatus("authenticated");
  };

  const handleLogout = () => {
    setAuthStatus("unauthenticated");
  };

  if (authStatus === "checking") {
    return (
      <div className="min-vh-100 bg-dark d-flex align-items-center justify-content-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark">
      <Navbar authStatus={authStatus} onLogout={handleLogout} />

      <main className="flex-grow-1">
        <AppRouter
          authStatus={authStatus}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      </main>

      <Footer />
    </div>
  );
};

export default App;