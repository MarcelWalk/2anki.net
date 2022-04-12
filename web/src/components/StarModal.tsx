function StarModal() {
  return (
    <div
      className="card"
      style={{
        position: 'fixed', bottom: 10, right: 10, zIndex: 10, background: '#5397f5', color: 'white', border: 'none',
      }}
    >
      <header className="card-header" style={{ boxShadow: 'none' }}>
        <p className="card-header-title" style={{ color: 'white' }}>
          Did you know 2anki is an open-source project?
        </p>
      </header>
      <div className="card-content">
        <div className="content">
          Please show us your support by starring our GitHub repo
        </div>
      </div>
      <footer className="card-footer" style={{ border: 'none' }}>
        <a
          href="."
          onClick={() => {
            alert('Dismiss clicked');
          }}
          className="card-footer-item"
          style={{ border: 'none', color: 'white' }}
        >
          Dismiss
        </a>
        <a href="https://github.com/alemayhu/2anki.net" className="card-footer-item" target="_blank" rel="noreferrer" style={{ border: 'none', color: 'white' }}>Open</a>
      </footer>
    </div>
  );
}

export default StarModal;
