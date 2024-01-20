/*------------------------------------------------------------------------------
  * Header.jsx
  *   Contiene el menú de navegación con el Sign in y el botón de Log
  *   Hooks:
  *     - useNavigate, useState, useEffect, useRef
  *   Datos:
  *     - API fetch a {VITE_URL_API}/ para recibir los usuarios
  *     - LocalStorage para buscar si hay usuarios registrados
  *     - API fetch a {VITE_URL_API}/nav para mostrar elementos del menú
  *   Estructura: 
  *     - H1 con el logo (en móvil se muestra en Hero)
  *     - Menú de navegación que cambia si el usuario está loggeado
  *       - Primer elemento muestra Sign in o Hello, user 
  *       - Lista de elementos de /nav con enlace a la web de letterboxd.com
  *       - Botón de Log que muestra Log.jsx para registrar películas
------------------------------------------------------------------------------*/
import { useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import Log from "../Log"
import "./Header.css"

/**
* Este componente carga el Header
* param  {VITE_URL_API}  variable de entorno
* hook   {navigate}      navega a /films si los datos son correctos
* prop   {name, pass}    son los inputs del formulario
* hook   {useState}      para hacer el map en nav y abir el popup
* hook   {toggleOpen}    abre y cierra el popup
* hook   {useEffect}     para hacer fetch en el endpoint /nav
* hook   {useEffect}     comprueba si hay usuarios en localStorage y entra a films
*/
export const Header = () => {
  const { VITE_URL_API } = import.meta.env;

  const navigate = useNavigate()
  const name = useRef("")
  const pass = useRef("")

  const [nav, setNav] = useState([])
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

  useEffect(() => {
    fetch(`${VITE_URL_API}nav`)
      .then((res) => res.json())
      .then((data) => setNav(data))
      .catch((err) => console.log(err));
  }, [])

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

/**
* Este componente carga el formulario de Login
* prop   {open}          gestiona el estado del popup
* prop   {name, pass}    son los inputs del formulario
* prop   {VITE_URL_API}  variable de entorno
* hook   {navigate}      navega a /films si los datos son correctos
* hook   {toggleOpen}    abre y cierra el popup
* hook   {useState}      para cambiar el header si está loggeado el usuario
* hook   {formHandler}   custom hook funcionamiento del formulario con la api
*/
const Login = (props) => {
  const { open, name, pass, VITE_URL_API, navigate, toggleOpen } = props;

  /* Esto está sin terminar, sería la logica de las interacciones al hacer login  */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  const formHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    let nuevo = {
      name: name.current.value,
      pass: pass.current.value,
    }

    let options = {
      method: "post",
      body: JSON.stringify(nuevo),
      headers: { "Content-type": "application/json", }
    }

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

/**
* Este componente carga los elementos del menú
* prop   {span, href}    son los datos que tiene cada objeto de la bbdd
* clase  {mapped}        clase css para no mostrar estos Li en móvil 
*/
const Li = (props) => {
  const { span, href } = props;
  return (
    <li className="Header-li  mapped">
      <a className="Header-a" href={href} target="_blank">
        <span>{span}</span>
      </a>
    </li>
  );
};
