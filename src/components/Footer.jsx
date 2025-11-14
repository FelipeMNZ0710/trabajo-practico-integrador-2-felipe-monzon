const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-5 py-3 bg-transparent text-muted">
      <div className="container d-flex flex-column align-items-center">
        <p className="mb-1 small">
          &copy; {currentYear}{" "}
          <span className="text-white fw-semibold" style={{ cursor: "default" }}>
            Felipe Monzón
          </span>
        </p>
        <p className="mb-0 small text-muted">Trabajo Práctico Integrador II</p>
      </div>
    </footer>
  );
};

export default Footer;
