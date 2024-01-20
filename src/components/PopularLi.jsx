import { useEffect, useState } from "react";

export const PopularLi = (props) => {
  const { VITE_URL_API } = import.meta.env;

  const { id, src, alt, href, title, year, views, lists, likes } = props;

  // useState para buscar los elementos del array de films
  const [films, setFilms] = useState([]);

  // useEffect para hacer fetch en el endpoint /films
  useEffect(() => {
    fetch(`${VITE_URL_API}films`)
      .then((res) => res.json())
      .then((data) => {
        setFilms(data);
      })
      .catch((err) => console.log(err));
  }, []);

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
        {/* meter useContext para no repetir las props */}
        <FilmStats key={id} views={views} lists={lists} likes={likes} />
      </ul>
    </li>
  );
};

const FilmStats = (props) => {
  const { id, views, lists, likes } = props;
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
};
