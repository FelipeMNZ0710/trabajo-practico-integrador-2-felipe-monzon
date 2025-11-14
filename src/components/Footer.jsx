const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-0">
          &copy; {currentYear} Felipe Monzón
        </p>
        <p className="mb-0 small text-white-50">
          Trabajo Práctico Integrador III
        </p>
      </div>
    </footer>
  );
};

export default Footer;