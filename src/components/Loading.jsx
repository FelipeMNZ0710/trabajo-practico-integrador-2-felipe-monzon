const Loading = () => {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center loading-overlay">
      <div className="spinner-border text-light" role="status" style={{ width: 48, height: 48 }}>
        <span className="visually-hidden">Cargando...</span>
      </div>
      <p className="mt-3 small text-muted">Cargando...</p>
    </div>
  );
};

export default Loading;
