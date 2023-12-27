import './Header.css'

export const Header = () => {
    return (
      <header className="Header">
        <section className="Header-section">
          <h1 className="Header-h1">
            <a href="/" className="Header-logo">
              Letterboxd — Your life in film
            </a>
          </h1>
          <nav className="Header-nav">
            <ul className="Header-ul">
              <li className="Header-li">
                <a className="Header-a">
                  <span>Sign in</span>
                </a>
              </li>
              <li className="Header-li">
                <a className="Header-a">
                  <span>Create account</span>
                </a>
              </li>
              <li className="Header-li">
                <a className="Header-a">
                  <span>Films</span>
                </a>
              </li>
              <li className="Header-li">
                <a className="Header-a">
                  <span>Lists</span>
                </a>
              </li>
              <li className="Header-li">
                <a className="Header-a">
                  <span>Members</span>
                </a>
              </li>
              <li className="Header-li">
                <a className="Header-a">
                  <span>Journal</span>
                </a>
              </li>
            </ul>
          </nav>
        </section>
      </header>
    );
}

