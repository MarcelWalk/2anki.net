function StarModal() {
  return (
    <div
      className="card"
      style={{
        position: 'fixed', bottom: 10, right: 10, zIndex: 10, background: '#5397f5', color: 'white', border: 'none',
      }}
    >
      <header className="card-header columns is-centered" style={{ boxShadow: 'none', marginTop: '0px' }}>
        <div className="column is-half">
          <img src="./mascot/navbar-logo.png" alt="2anki mascot" />
        </div>

      </header>
      <div className="card-content">

        <div className="content">
          <p style={{ color: 'white' }}>
            Did you know 2anki is an open-source project?
          </p>
          Please consider to give us a star on GitHub!
          <br />
          You can support us on Patreon or GitHub sponsors too
          <br />
          Thanks :)
        </div>
      </div>
      <footer className="card-footer" style={{ border: 'none' }}>
        <a
          href="."
          onClick={() => {
            // eslint-disable-next-line
            console.log('Dismiss clicked');
          }}
          className="card-footer-item"
          style={{ border: 'none', color: 'white' }}
        >
          Dismiss
        </a>
        <a href="https://github.com/alemayhu/2anki.net" className="card-footer-item" target="_blank" rel="noreferrer" style={{ border: 'none', color: 'white' }}>GitHub</a>
        <a href="https://www.patreon.com/alemayhu" className="card-footer-item" target="_blank" rel="noreferrer" style={{ border: 'none', color: 'white' }}>Patreon</a>
      </footer>
    </div>
  );
}

export default StarModal;
