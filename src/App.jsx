import { useState, useEffect } from "react";
import AppRouter from "./router/AppRouter";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";

const App = () => {
  const [authStatus, setAuthStatus] = useState("checking");
  useEffect(() => {
    setTimeout(() => {
      setAuthStatus("unauthenticated"); 
    }, 1000);
  }, []);

  const handleLogin = () => {
    setAuthStatus("authenticated");
  };

  const handleLogout = () => {
    setAuthStatus("unauthenticated");
  };

  if (authStatus === "checking") {
    return <Loading />;
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