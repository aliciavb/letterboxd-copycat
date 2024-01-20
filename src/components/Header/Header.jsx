import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Log from "../Log";

export const Header = () => {
  const { VITE_URL_API } = import.meta.env;

  const navigate = useNavigate()
  const name = useRef("")
  const pass = useRef("")

  // useState para buscar los elementos del nav menu
  const [nav, setNav] = useState([])
  //abre y cierra el popup de login
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  // useState para diferenciar el header si está loggeado o no
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

  // useEffect para hacer fetch en el endpoint /nav
  useEffect(() => {
    fetch(`${VITE_URL_API}nav`)
      .then((res) => res.json())
      .then((data) => setNav(data))
      .catch((err) => console.log(err));
  }, [])

  //comprueba si hay usuarios en localStorage y entra a films
  useEffect(() => {
    if (localStorage.getItem("usuarios")) {
      navigate("/films");
      setLoggedIn(true);
      const buscarUsername = JSON.parse(localStorage.getItem("usuarios"));
      setUsername(buscarUsername.name);
    }
  }, [])

  
  return (
    <header className={`Header ${loggedIn ? "isLogged" : ""}`}>
      <section className="Header-section">
        <h1 className="Header-h1">
          <a href="/" className="Header-logo">
            <img src="/assets/H1-logo.svg" alt="Letterboxd | Logo" loading="lazy" />
          </a>
        </h1>
        {/* Aquí me faltaría hacer un componente con todo el nav */}
        <nav className="Header-nav">
          <ul className="Header-ul">
            <li className="Header-li">
              <a className="Header-a" onClick={toggleOpen}>
                {loggedIn
                ? ( <span>Hello, {username}</span> )
                : ( <span>
                      <span className="Header-text">Sign in</span>
                      <span className="Header-icon">
                        <img  src="/assets/icons/login-icon.svg" alt="Login" loading="lazy" />
                      </span>
                    </span>
                  )}
              </a>
              {/* Aquí me faltaría meter useContext para no repetir las props */}
              <Login
                open={open}
                name={name}
                pass={pass}
                VITE_URL_API={VITE_URL_API}
                navigate={navigate}
                toggleOpen={toggleOpen}
              />
            </li>

            {nav.map((eachLi) => (
              <Li key={eachLi._id} {...eachLi} />
            ))}

            {loggedIn ? <Log /> : ""}
          </ul>
        </nav>
      </section>
    </header>
  )
}

const Login = (props) => {
  const { open, name, pass, VITE_URL_API, navigate, toggleOpen } = props;

  //logica de las interacciones al hacer login
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // useState para diferenciar el header si está loggeado o no
  const [loggedIn, setLoggedIn] = useState(false);

  //funcionamiento del formulario con la api
  const formHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    let nuevo = {
      name: name.current.value,
      pass: pass.current.value,
    };

    let options = {
      method: "post",
      body: JSON.stringify(nuevo),
      headers: {
        "Content-type": "application/json",
      },
    };

    fetch(VITE_URL_API, options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          localStorage.setItem("usuarios", JSON.stringify(data));
          navigate("/films");
          setLoggedIn(true);
        } else {
          console.log("Los datos son incorrectos");
          setError("Los datos introducidos son incorrectos");
        }

        // Me faltaría hacer un boton de cerrar sesion con localStorage.removeItem("usuarios", JSON.stringify(data));
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={`Login ${open ? "isVisible" : ""} ${ loggedIn ? "isLogged" : "" }`} >
      <form className="Login-form" onSubmit={formHandler}>
        <a className="Login-close" onClick={toggleOpen}> x </a>
        <div className="Login-field">
          <label htmlFor="name">Username</label>
          <input type="text" name="name" ref={name} placeholder="Username" />
        </div>
        <div className="Login-field">
          <label htmlFor="pass">Password</label>
          <input type="password" name="pass" ref={pass} placeholder="Password" />
        </div>
        <input className="Login-submit" type="submit" value="Sign in" />
        {/* Faltaría meter mensajes de cargando y error  */}
        {/* {loading && <p>Loading...</p>}*/}
        {/* {error && <p className="error-message">{error}</p>}  */}
      </form>
    </div>
  )
}

const Li = (props) => {
  const { _id, span, href } = props;
  return (
    <li className="Header-li  mapped">
      <a className="Header-a" href={href} target="_blank">
        <span>{span}</span>
      </a>
    </li>
  );
};
