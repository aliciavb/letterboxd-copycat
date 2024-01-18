
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import { Header } from "../components/Header/Header"
import './Films.css'
import MyFilms from '../components/MyFilms/MyFilms';



export const Films = () => {
    const { VITE_URL_API } = import.meta.env

    const navigate = useNavigate()
  
    useEffect(() => {
      if (!localStorage.getItem('usuarios')) {
        navigate('/')
      }
    }, [])
  
    // useState para buscar los elementos del array de films
    const [films, setFilms] = useState([])

     // useEffect para hacer fetch en el endpoint /films
     useEffect(() => {
           fetch(`${VITE_URL_API}films`)
             .then((res) => res.json())
             .then((data) => {setFilms(data);})
             .catch((err) => console.log(err));
           }, [ ]);
  
    return (
      <div className="Films">
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
                  <PopularLi key={eachPopularLi.id} {...eachPopularLi} />
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
                <MyFilms VITE_URL_API={VITE_URL_API} />
          </div>
        </section>
      </div>
    );
  };
  


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



<>

{/* <table cellpadding="0" cellspacing="0" id="diary-table" className="table film-table">
	<thead>
		<tr>
		<th scope="col" className="th-film">Film</th>
		<th scope="col" className="th-released center">Released</th>
		<th scope="col" className="th-actions film-actions center">
            <span className="shown-for-owner">Edit</span>
        </th>
		</tr>
	</thead>
	<tbody>
	    <tr className="">
            <td className="">
                <div className="">
                    <div>
                        <img src="" width="35" height="52" alt="La La Land" className="image" />
                            <a href="/aliverso/film/la-la-land/" className="frame">
                                <span className="frame-title">La La Land (2016)</span>
                                <span className="overlay"></span>
                            </a>
                    </div>
                </div>
                <h3 className="headline-3 prettify">
                    <a href="/aliverso/film/la-la-land/">La La Land</a>
                </h3>
            </td>
            
            <td className=""><span>2016</span></td>
        
	        <td className="">
            <span className="overlay-actions -w150 js-film-options">
			<span className="diary-entry-edit shown-for-owner" data-owner="aliverso">
            <a href="#" rel="nofollow" className="edit-review-button has-icon icon-16 icon-edit cboxElement" data-delete-viewing-url="/s/viewing:510671995/delete" data-viewing-id="510671995" data-film-id="240344" data-film-name="La La Land" data-film-poster="/film/la-la-land/image-150/" data-film-year="2016" data-viewing-date="2024-01-12" data-viewing-date-str="12 Jan 2024" data-review-text="" data-rating="2" data-tags="[  ]" data-rewatch="false" data-specified-date="true" data-contains-spoilers="false" data-spoilers-locked="false">
            <span className="icon"></span>Edit this entry</a>
            </span>
			<span className="replace menu-link icon" style="opacity: 1;"></span>
		    </span>
            </td>
        </tr>
    </tbody>
</table> */}

</>