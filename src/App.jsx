import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const App = () => {
  const authStatus = "unauthenticated"; 
  
  return (
    <div className="d-flex flex-column min-vh-100 bg-secondary">
      <Navbar authStatus={authStatus} />
      <main className="container pt-5 mt-5 text-center flex-grow-1">
        <h1 className="display-4 text-white">Proyecto Integrador</h1>
        <p className="lead text-white-50">Configurado con React y Bootstrap.</p>
      </main>
      <Footer />
    </div>
  );
};

export default App;