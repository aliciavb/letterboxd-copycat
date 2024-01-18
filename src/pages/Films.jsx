import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import { Header } from "../components/Header/Header"
import './Films.css'

export const Films = () => {
    const { VITE_URL_API } = import.meta.env;

    const navigate = useNavigate()

    useEffect(() => {
        if( !localStorage.getItem('usuarios')){
            navigate('/')
        }
    } , [])


     // useState para buscar los elementos del array de films
    const [films, setFilms] = useState([]);

    // useState para buscar los elementos del array de myfilms
    const [ myFilms, setMyFilms] = useState([]);

    // useEffect para hacer fetch en el endpoint /films y /myfilms
     useEffect(() => {
    const fetchFilms = async () => {
      try {
        const [filmsResponse, myFilmsResponse] = await Promise.all([
          fetch(`${VITE_URL_API}films`),
          fetch(`${VITE_URL_API}myfilms`),
        ]);

        const [filmsData, myFilmsData] = await Promise.all([
          filmsResponse.json(),
          myFilmsResponse.json(),
        ]);

        setFilms(filmsData);
        setMyFilms(myFilmsData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFilms();
  }, [myFilms]);

    

    return(
        <div className='Films'>
            <Header />
            <section className="Films-popular">
                <div className="Popular-intro">
	            <h3>Popular films this week</h3>
	            <span>More</span>
                </div>
	            <div className="Popular-wrapper">
                    {/* botones prev y next para carrusel */}
                    <div>
                        <ul className="Popular-carrousel">
                        {films.map((eachPopularLi) => (
                            <PopularLi 
                                key={eachPopularLi.id}
                                {...eachPopularLi}
                            />
                        ))}
	                    </ul>
                    </div>
                </div>
            </section>
            <section className="Films-popular Films-personal">
                <div className="Popular-intro Personal-intro">
	            <h3>Your seen films</h3>
	            <span>See all</span>
                </div>
	            <div className="Popular-wrapper Personal-wrapper">
                    {/* botones prev y next para carrusel */}
                    <div>
                        <ul className="Personal-carrousel">
                        {myFilms.length === 0 
                        ? <li>Add films using the Log button!</li> 
                        : myFilms.map(eachmyFilm => (
                            <MyFilmsLi key={eachmyFilm.id} {...eachmyFilm} />
                        ))
                        }
	                    </ul>
                    </div>
                </div>
            </section>
        </div>
    )
}



const PopularLi = (props) => {
    const { VITE_URL_API } = import.meta.env;

    const {id, src, alt, href, title, year, views, lists, likes} = props

     // useState para buscar los elementos del array de films
     const [films, setFilms] = useState([]);

     // useEffect para hacer fetch en el endpoint /films
     useEffect(() => {
           fetch(`${VITE_URL_API}films`)
             .then((res) => res.json())
             .then((data) => {setFilms(data);})
             .catch((err) => console.log(err));
           }, [ ]);

    return(
        <li className="Popular-li">
            <div className="Film-poster">
                <div className="Film-info" >
                    <img src={src} alt={alt} loading='lazy'/>
                    <a href={href} target='_blank'>
                        <span className="Film-text">{title} ({year})</span>
                    </a>
                </div>
            </div>
            <ul className="Film-stats">
                {/* meter useContext para no repetir las props */}
                <FilmStats
                    key={id}
                    views={views}
                    lists={lists}
                    likes={likes}
                />
            </ul>
        </li>
    )
}


const FilmStats = (props) => {
    const { id, views, lists, likes } = props
    return (
        <>
            <li className="Film-stat">
                <img src={views.icon} alt={views.data} loading='lazy' />
                <span>{views.data}</span>
            </li>
            <li className="Film-stat">
                <img src={lists.icon} alt={lists.data} loading='lazy' />
                <span>{lists.data}</span>
            </li>
            <li className="Film-stat">
                <img src={likes.icon} alt={likes.data} loading='lazy' />
                <span>{likes.data}</span>
            </li>
        </>
    )
}


const MyFilmsLi = (props) => {
    const {id, title, year} = props

    return(
        <li className="MyFilm-li">
            <div className="MyFilm-poster">
                <div className="MyFilm-info" >
                    <a href="" target='_blank'>
                        <span className="Film-text">{title} ({year})</span>
                    </a>
                </div>
            </div>
        </li>
    )
}

