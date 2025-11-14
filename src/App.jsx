import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const App = () => {
  const authStatus = "unauthenticated"; 

  return (
    <>
      <Navbar authStatus={authStatus} />
      <main className="container pt-5 mt-5 text-center">
        <h1 className="display-4">Proyecto Integrador</h1>
        <p className="lead">Configurado con React y Bootstrap.</p>
      </main>
      <Footer />
    </>
  );
};

export default App;