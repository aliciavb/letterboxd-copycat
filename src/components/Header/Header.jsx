import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export const Header = () => {
  const { VITE_URL_API } = import.meta.env;

  //revisar no dejar useRefs vacios??
  const navigate = useNavigate();
  const name = useRef("");
  const pass = useRef("");

  // useState para buscar los elementos del nav menu
  const [nav, setNav] = useState([]);

  useEffect(() => {
  // useEffect para hacer fetch en el endpoint /nav
    fetch(`${VITE_URL_API}nav`)
      .then((res) => res.json())
      .then((data) => setNav(data))
      .catch((err) => console.log(err));
    }, [ ]);

  //comprueba si hay usuarios en localStorage y entra a films
  useEffect(() => {
    if (localStorage.getItem("usuarios")) {
      navigate("/films");
    }
  }, []);

  //abre y cierra el popup de login
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);
  
  return (
    <header className="Header">
      <section className="Header-section">
        <h1 className="Header-h1">
          <a href="/" className="Header-logo">
            <img
              src="/assets/H1-logo.svg"
              alt="Letterboxd | Logo"
              loading="lazy"
            />
          </a>
        </h1>
        <nav className="Header-nav">
          <ul className="Header-ul">
            <li className="Header-li">
              <a className="Header-a" onClick={toggleOpen}>
                <span>Sign in</span>
              </a>
              {/* meter useContext para no repetir las props */}
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
              <Li key={eachLi.id} {...eachLi} />
            ))}
          </ul>
        </nav>
      </section>
    </header>
  );
};

const Login = (props) => {
  const { open, name, pass, VITE_URL_API, navigate, toggleOpen } = props

  //funcionamiento del formulario con la api
  const formHandler = (e) => {
    e.preventDefault();

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
          //añadir si funciona navigate, si no mensaje de error
          navigate("/films");
        }

        //boton de cerrar sesion con localStorage.removeItem("usuarios", JSON.stringify(data));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={`Login ${open ? "isVisible" : ""}`}>
      <form className="Login-form" onSubmit={formHandler}>
        <a className="Login-close" onClick={toggleOpen}>x</a>
        <div className="Login-field">
          <label for="name">Username</label>
          <input type="text" name="name" ref={name} placeholder="Username" />
        </div>
        <div className="Login-field">
          <label for="pass">Password</label>
          <input type="password" name="pass" ref={pass} placeholder="Password" />
        </div>
        <input className="Login-submit" type="submit" value="Sign in" />
      </form>
    </div>
  );
};


  

const Li = (props) => {
  const { span, href } = props;
  return (
    <li className="Header-li">
      <a className="Header-a" href={href} target="_blank">
        <span>{span}</span>
      </a>
    </li>
  );
};
