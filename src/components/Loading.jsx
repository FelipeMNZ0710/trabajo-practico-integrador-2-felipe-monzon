const Loading = () => {
  return (
    <div 
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 9999
      }}
    >
      <div className="spinner-border text-light" role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-light mt-3">Cargando...</p>
    </div>
  );
};

export default Loading;