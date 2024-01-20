/*-----------------------------------------------------------------------
  * Films.jsx
  *   Esta página se carga cuando el usuario hace login 
  *   Hooks:
  *     - useNavigate, useEffect, useState
  *   Datos:
  *     - Se comprueba que existan en localStorage o redirige a "/"
  *     - API fetch a {VITE_URL_API}/films
  *   Estructura: 
  *     - Header con el menú
  *     - Lista vacía con el componente MyFilms (Gestor)
  *     - Lista de "popular films" con el componente PopularLi
------------------------------------------------------------------------*/
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Header } from "../components/Header/Header"
import { PopularLi } from "../components/PopularLi"
import MyFilms from "../components/MyFilms/MyFilms"
import "./Films.css"

/**
* Esta es la página que contiene el gestor
* param     {VITE_URL_API}          variable de entorno
* hook      {useNavigate}           para redirigir a inicio si no está loggeado
* hook      {useEffect}             comprueba los datos de localStorage
* hook      {useEffect, useState}   para buscar los elementos del array de /films
* component {Header}                importa el Header
* component {MyFilms}               importa el componente MyFilms (CRUD)
* component {PopularLi}             importa el componente PopularLi (lista de destacadas)
*/
export const Films = () => {
  const { VITE_URL_API } = import.meta.env

  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem("usuarios")) {
      navigate("/");
    }
  }, [])

  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetch(`${VITE_URL_API}films`)
      .then((res) => res.json())
      .then((data) => { setFilms(data)})
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="Films">
      <Header />
      <section className="Films-personal">
        <div className="Personal-intro">
          <h3>Your seen films</h3>
        </div>
        <div className="Popular-wrapper Personal-wrapper">
          {/* botones prev y next para carrusel */}
          <MyFilms VITE_URL_API={VITE_URL_API} />
        </div>
      </section>
      <section className="Films-popular">
        <div className="Popular-intro">
          <h3>Popular films this week</h3>
        </div>
        <div className="Popular-wrapper">
          {/* botones prev y next para carrusel */}
          <div>
            <ul className="Popular-carrousel">
              {films.map((eachPopularLi) => (
                <PopularLi key={eachPopularLi._id} {...eachPopularLi} />
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
