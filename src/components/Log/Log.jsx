/*-----------------------------------------------------------------------
  * Log.jsx
  *   Componente que contiene el método post para añadir películas
  *   Hooks:
  *     - useState, useRef
  *   Datos:
  *     - API fetch a {VITE_URL_API}/myfilms con método POST
  *   Estructura: 
  *     - Poster de la película
  *     - Componente FilmStats con los datos 
------------------------------------------------------------------------*/
import { useState, useRef } from "react";
import "./Log.css";

/**
* Este componente es el botón que tiene el formulario para hacer POST
* param     {VITE_URL_API}       variable de entorno
* hook      {useState}           para guardar las películas añadidas 
* hook      {useRef}             para rellenar con los neuvos datos el formulario 
* function  {addFilmHandler}     para añadir una película (method: POST )
* function  {filmToggleOpen}     para abrir el popup con el formulario
*/
const Log = () => {
  const { VITE_URL_API } = import.meta.env;

  const [myFilms, setmyFilms] = useState([])

  const addTitle = useRef()
  const addYear = useRef()

  const addFilmHandler = async (e) => {
    e.preventDefault();

    const newFilm = {
      title: addTitle.current.value,
      year: addYear.current.value,
    }

    let options = {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newFilm),
    }

    try {
      const res = await fetch(`${VITE_URL_API}myfilms`, options);
      const myFilmsData = await res.json();

      setmyFilms(myFilmsData);
    } catch (err) {
      console.log(err);
    }
    filmToggleOpen()
  }

  const [logOpen, setLogOpen] = useState(false);
  const filmToggleOpen = () => setLogOpen(!logOpen);

  return (
    <li className="Header-li LogButton">
      <a className="LogButton-a" onClick={filmToggleOpen}>
        <span>Log</span>
      </a>
      <form className={`LogForm ${logOpen ? "isVisible" : ""}`} onSubmit={addFilmHandler} >
        <a className="LogForm-close" onClick={filmToggleOpen}> x </a>
        <div className="LogForm-field">
          <label htmlFor="Title">Title</label>
          <input type="text" name="addTitle" ref={addTitle}/>
        </div>
        <div className="LogForm-field">
          <label htmlFor="Year">Year</label>
          <input type="number" name="addYear" ref={addYear}/>
        </div>
        <input className="LogForm-submit" type="submit" value="Log film" />
      </form>
    </li>
  )
}

export default Log
