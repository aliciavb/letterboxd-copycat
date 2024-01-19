import { useEffect, useState } from "react"
import './Main.css'
import { PopularLi } from "../PopularLi"


export const Main = () => {
    const { VITE_URL_API } = import.meta.env

    // useState para buscar los elementos del array de films
    const [films, setFilms] = useState([])

     // useEffect para hacer fetch en el endpoint /films
     useEffect(() => {
           fetch(`${VITE_URL_API}films`)
             .then((res) => res.json())
             .then((data) => {setFilms(data);})
             .catch((err) => console.log(err));
           }, [ ]);

    // useState para buscar los elementos del array de highlights
    const [highlights, setHighlights] = useState([])

     // useEffect para hacer fetch en el endpoint /highlights
     useEffect(() => {
           fetch(`${VITE_URL_API}highlights`)
             .then((res) => res.json())
             .then((data) => {setHighlights(data);})
             .catch((err) => console.log(err));
           }, [ ]);
  
    return (
      <div className="Main">
          <section className="Films-featured">
              <ul className="Featured-carrousel">
                {films.map((eachPopularLi) => (
                  <PopularLi key={eachPopularLi._id} {...eachPopularLi} />
                ))}
              </ul>
        </section>
        <div className="Main-banner">
            <a href="https://letterboxd.com/2023/">
                <img 
                    src="/assets/2023-year.jpg"
                    width="950"
                    height="100"
                    alt="2023 Year in review"
                    loading="lazy"
                />
            </a> 
        </div>
        <section className="Main-highlights">
	        <h2 className="Main-tagline">Letterboxd lets you…</h2>
	        <div className="Highlights">
                {highlights.map((eachHighlight) => (
                  <Highlight key={eachHighlight._id} {...eachHighlight} />
                ))}
            </div>
        </section>
      </div>
    )
  }
  
const Highlight = (props) => {
    const { icon, text} = props
    return (
      <div className="Highlight">
        <img className="Highlight-icon" src={icon} loading="lazy"/>
        <p>{text}</p>
      </div>
    );
}



