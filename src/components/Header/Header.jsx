import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export const Header = () => {
  const { VITE_URL_API } = import.meta.env;

  //revisar no dejar useRefs vacios??
  const navigate = useNavigate();
  const name = useRef("");
  const pass = useRef("");

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
              src="/assets/H1-logo.webp"
              alt="Letterboxd | Logo"
              loading="lazy"
            />
          </a>
        </h1>
        <nav className="Header-nav">
          <ul className="Header-ul">
            <li className="Header-li">
              <a className="Header-a" onClick={toggleOpen}>
                <span>{open ? "Close" : "Sign in"}</span>
              </a>
              <Login
                open={open}
                name={name}
                pass={pass}
                VITE_URL_API={VITE_URL_API}
                navigate={navigate}
              />
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
};

const Login = (props) => {
  const { open, name, pass, VITE_URL_API, navigate } = props;

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
          navigate("/films");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={`Login ${open ? "isVisible" : ""}`}>
      <h2>Login</h2>
      <form onSubmit={formHandler}>
        <input type="text" name="name" ref={name} placeholder="Username" />
        <input type="password" name="pass" ref={pass} placeholder="Password" />
        <input type="submit" value="Sign in" />
        <button type="button" onClick={() => formHandler()}>
          Close
        </button>
      </form>
    </div>
  );
};
