/*-----------------------------------------------------------------------
  * PopularLi.jsx
  *   Componente que muestra una lista de peliculas con poster y stats
  *   Hooks:
  *     - useEffect, useState
  *   Datos:
  *     - API fetch a {VITE_URL_API}/films
  *   Estructura: 
  *     - Poster de la película
  *     - Componente FilmStats con los datos 
------------------------------------------------------------------------*/
import { useEffect, useState } from "react";

/**
* Este componente es cada película del endpoint /films (películas destacadas)
* param     {VITE_URL_API}       variable de entorno
* props     {id,src, alt, href,
            title, year, views,
            lists, likes}        datos de cada película en la bbdd
* hook      {useState}           busca los elementos del array de films
* hook      {useEffect}          hace fetch en el endpoint /films
* component {FilmStats}          contiene más datos de la película
*/
export const PopularLi = (props) => {
  const { id, src, alt, href, title, year, views, lists, likes } = props
  const { VITE_URL_API } = import.meta.env

  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetch(`${VITE_URL_API}films`)
      .then((res) => res.json())
      .then((data) => { setFilms(data)})
      .catch((err) => console.log(err))
  }, [])

  return (
    <li className="Popular-li">
      <div className="Film-poster">
        <div className="Film-info">
          <img src={src} alt={alt} loading="lazy" />
          <a className="Film-a" href={href} target="_blank">
            <span className="Film-text">
              {title} ({year})
            </span>
          </a>
        </div>
      </div>
      <ul className="Film-stats">
        {/* Aquí me faltaría meter useContext para no repetir las props */}
        <FilmStats key={id} views={views} lists={lists} likes={likes} />
      </ul>
    </li>
  );
};

/**
* Este componente muestra los datos de views, likes y lists de cada pelicula
* props   {views, lists, likes}   datos de la bbdd
*/
const FilmStats = (props) => {
  const { views, lists, likes } = props
  return (
    <>
      <li className="Film-stat">
        <img src={views.icon} alt={views.data} loading="lazy" />
        <span>{views.data}</span>
      </li>
      <li className="Film-stat">
        <img src={lists.icon} alt={lists.data} loading="lazy" />
        <span>{lists.data}</span>
      </li>
      <li className="Film-stat">
        <img src={likes.icon} alt={likes.data} loading="lazy" />
        <span>{likes.data}</span>
      </li>
    </>
  );
}
