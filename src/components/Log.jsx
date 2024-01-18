import { useState, useRef, useEffect  } from "react";
import './Log.css'

const Log = () => {
  const { VITE_URL_API } = import.meta.env
  

  const [myFilms, setmyFilms] = useState([])

  const addTitle = useRef()
  const addYear  = useRef()


  const addFilmHandler = async (e) => {
    e.preventDefault();

    const newFilm = {
      title: addTitle.current.value,
      year: addYear.current.value,
    };

    let options = {
      method: 'post',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newFilm),
    };

    try {
      const res = await fetch(`${VITE_URL_API}myfilms`, options);
      const myFilmsData = await res.json();
  
      setmyFilms(myFilmsData);
    } catch (err) {
      console.log(err);
    }
  }

  //abre y cierra el formulario de log
  const [logOpen, setLogOpen] = useState(false)
  const filmToggleOpen = () => setLogOpen(!logOpen)
  
  return (
    <li className="Header-li LogButton">
      <a className="Header-a LogButton-a" onClick={filmToggleOpen}>
        <span>Log</span>
      </a>
      <form
        className={`LogForm ${logOpen ? "isVisible" : ""}`}
        onSubmit={addFilmHandler}
      >
        <a className="LogForm-close" onClick={filmToggleOpen}>
          x
        </a>
        <div className="LogForm-field">
          <label htmlFor="Title">Title</label>
          <input type="text" name="addTitle" ref={addTitle} placeholder="" />
        </div>
        <div className="LogForm-field">
          <label htmlFor="Year">Year</label>
          <input type="number" name="addYear" ref={addYear} placeholder="" />
        </div>
        <input className="LogForm-submit" type="submit" value="Log film" />
      </form>
    </li>
  );

}



export default Log