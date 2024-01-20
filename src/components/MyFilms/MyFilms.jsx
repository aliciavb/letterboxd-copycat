import { useState, useEffect, useRef } from "react";
import "./MyFilms.css";

const MyFilms = () => {
  const { VITE_URL_API } = import.meta.env;

  const [myFilms, setMyFilms] = useState([]);
  const editFilm = useRef();

  // useEffect para hacer fetch en el endpoint /myfilms
  useEffect(() => {
    fetch(`${VITE_URL_API}myfilms`)
      .then((res) => res.json())
      .then((data) => setMyFilms(data))
      .catch((err) => console.log(err))
      .finally(() => {});
  }, [myFilms]);

  // eliminar film (metodo delete)
  const deleteFilmHandler = async (id) => {
    let options = {
      method: "delete",
      headers: { "Content-type": "application/json" },
    };

    try {
      // peticion fetch con las options de delete
      await fetch(`${VITE_URL_API}myfilms/${id}`, options);

      const res = await fetch(`${VITE_URL_API}myfilms`);
      const data = await res.json();

      setMyFilms(data);
    } catch (err) {
      console.error("No se ha podido eliminar", err);
    }
  };

  //state del formulario (abierto o cerrado)
  const [editOpen, setEditOpen] = useState(false);
  const editToggleOpen = () => setEditOpen(!editOpen);

  const editHandler = (id) => {
    const filmToEdit = myFilms.find((film) => film._id === id);

    const { editId, editTitle, editYear } = editFilm.current;

    editId.value = filmToEdit._id;
    editTitle.value = filmToEdit.title;
    editYear.value = filmToEdit.year;

    //abre y cierra el formulario de edit
    editToggleOpen();
  };

  const formEditHandler = async (e) => {
    e.preventDefault();

    const { editId, editTitle, editYear } = editFilm.current;

    const updatedFilm = {
      title: editTitle.value,
      year: editYear.value,
    };

    let options = {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updatedFilm),
    };

    try {
      const response = await fetch(
        `${VITE_URL_API}myfilms/${editId.value}`,
        options
      );
      const updatedMyFilms = await response.json();

      setMyFilms(updatedMyFilms);
    } catch (error) {
      console.error("Error updating film:", error);
    }

    editFilm.current.reset();
    editToggleOpen();
  };

  return (
    <>
      <div className="List-div">
        <ul>
          {myFilms.length === 0 ? (
            <li className="MyFilm-li">
              You haven't added any seen films.
              <br />
              Add them using the Log button!
            </li>
          ) : (
            myFilms.map((film) => (
              <Film
                key={film._id}
                {...film}
                deleteFilmHandler={deleteFilmHandler}
                editHandler={editHandler}
              />
            ))
          )}
        </ul>
      </div>

      <div className={`Edit-div ${editOpen ? "isVisible" : ""}`}>
        <h3 className="Edit-h3">Edit Film</h3>
        <form className="Edit-form" onSubmit={formEditHandler} ref={editFilm}>
          <input type="hidden" id="editId" />
          <input type="text" id="editTitle" placeholder="Title" />
          <input type="number" id="editYear" placeholder="Year" />
          <input className="Edit-submit" type="submit" value="Edit Film" />
        </form>
      </div>
    </>
  );
};

const Film = ({ _id, title, year, deleteFilmHandler, editHandler }) => {
  return (
    <li className="MyFilm-li">
      <div className="MyFilm-info">
        <span className="MyFilm-text">
          {title}, {year}
        </span>
      </div>
      <div className="MyFilm-actions">
        <EditBtn editHandler={editHandler} _id={_id} />
        <DeleteBtn deleteFilmHandler={deleteFilmHandler} _id={_id} />
      </div>
    </li>
  );
};

const EditBtn = (props) => {
  const { _id, editHandler } = props;
  return (
    <span className="MyFilm-edit">
      <button onClick={() => editHandler(_id)}>
        <img src="/assets/icons/edit-icon.svg" alt="edit icon" loading="lazy" />
      </button>
    </span>
  );
};

const DeleteBtn = (props) => {
  const { _id, deleteFilmHandler } = props;
  return (
    <span className="MyFilm-delete">
      <button onClick={() => deleteFilmHandler(_id)}>
        <img
          src="/assets/icons/delete-icon.svg"
          alt="delete icon"
          loading="lazy"
        />
      </button>
    </span>
  );
};

export default MyFilms;
