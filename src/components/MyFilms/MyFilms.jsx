import { useState, useEffect } from "react"

const MyFilms = () => {
    const { VITE_URL_API } = import.meta.env

// useState para gestionar el array de myfilms
  const [myFilms, setMyFilms] = useState([])

// useEffect para hacer fetch en el endpoint /myfilms
useEffect(() => {
    fetch(`${VITE_URL_API}myfilms`)
      .then((res) => res.json())
      .then((data) => setMyFilms(data))
      .catch((err) => console.log(err));
  }, [myFilms]); // Include myFilms as a dependency

    const deleteHandler = async (filmId) => {
        try {
          let options = {
            method: "delete",
            headers: { "Content-type": "application/json" },
          };
      
          // Send the delete request
          await fetch(`${VITE_URL_API}myfilms/${filmId}`, options);
      
          // Fetch the updated list of films after successful deletion
          const response = await fetch(`${VITE_URL_API}myfilms`);
          const data = await response.json();
      
          // Update the state with the new list of films
          setMyFilms(data);
        } catch (error) {
          console.error("Error deleting film:", error);
        }
      };

  return (
    <div>
      <ul className="Personal-carrousel">
        {myFilms.length === 0 ? (
          <li>Add films using the Log button!</li>
        ) : (
          myFilms.map((eachmyFilm) => (
            <MyFilmsLi
              key={eachmyFilm._id}
              {...eachmyFilm}
              deleteHandler={deleteHandler}
            />
          ))
        )}
      </ul>
    </div>
  );
};



const MyFilmsLi = (props) => {
    const { _id, title, year, deleteHandler } = props;
  
    const handleDelete = () => {
      console.log("Film ID:", _id);
      deleteHandler(_id);
    };
  
    return (
      <li className="MyFilm-li">
        <div className="MyFilm-info">
          <span className="MyFilm-text">
            {title} ({year})
          </span>
        </div>
        <div className="MyFilm-actions">
          <span className="MyFilm-delete">
            <button onClick={handleDelete}>
              <img
                src="/assets/delete-icon.svg"
                alt="delete icon"
                loading="lazy"
              />
            </button>
          </span>
        </div>
      </li>
    );
  };

export default MyFilms
