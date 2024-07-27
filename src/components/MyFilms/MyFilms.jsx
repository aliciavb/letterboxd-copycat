/*----------------------------------------------------------------------------------------
  * MyFilms.jsx
  *   Componente que contiene los métodos GET, PUT y DELETE de la lista de películas
  *   Hooks:
  *     - useState, useEffect, useRef
  *   Datos:
  *     - API fetch a {VITE_URL_API}/myfilms
  *   Estructura: 
  *     - Lista vacía con método GET
  *     - Formulario de editar con método PUT
  *     - Botón para eliminar con método DELETE
---------------------------------------------------------------------------------------*/
import { useState, useEffect, useRef } from "react";
import "./MyFilms.css";

/**
* Este componente contiene la lógica de los métodos del CRUD
* param     {VITE_URL_API}       variable de entorno
* hook      {useState}           para guardar las películas añadidas 
* hook      {useEffect}          para hacer fetch en el endpoint /myfilms
* function  {deleteFilmHandler}  para eliminar una película (method: DELETE)
* function  {editToggleOpen}     para abrir el formulario de editar
* function  {editHandler}        para buscar por id el elemento e introducir sus datos
* function  {formEditHandler}    para editar una película (method: PUT)
*/
const MyFilms = () => {
  const { VITE_URL_API } = import.meta.env;

  const [myFilms, setMyFilms] = useState([])
  const editFilm = useRef()

  useEffect(() => {
    fetch(`${VITE_URL_API}myfilms`)
      .then((res) => res.json())
      .then((data) => setMyFilms(data))
      .catch((err) => console.log(err))
      .finally(() => {})
  }, [myFilms])

  const deleteFilmHandler = async (id) => {
    let options = {
      method: "delete",
      headers: { "Content-type": "application/json" },
    };

    try {
      await fetch(`${VITE_URL_API}myfilms/${id}`, options)

      const res = await fetch(`${VITE_URL_API}myfilms`)
      const data = await res.json()

      setMyFilms(data)
    } catch (err) {
      console.error("No se ha podido eliminar", err);
    }
  }

  const [editOpen, setEditOpen] = useState(false);
  const editToggleOpen = () => setEditOpen(!editOpen);

  const editHandler = (id) => {
    const filmToEdit = myFilms.find((film) => film._id === id);

    const { editId, editTitle, editYear } = editFilm.current;

    editId.value = filmToEdit._id
    editTitle.value = filmToEdit.title
    editYear.value = filmToEdit.year

    editToggleOpen()
  }

  const formEditHandler = async (e) => {
    e.preventDefault();

    const { editId, editTitle, editYear } = editFilm.current

    const updatedFilm = {
      title: editTitle.value,
      year: editYear.value,
    }

    let options = {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updatedFilm),
    }

    try {
      const response = await fetch(`${VITE_URL_API}myfilms/${editId.value}`, options )
      const updatedMyFilms = await response.json()

      setMyFilms(updatedMyFilms)
    } catch (error) {
      console.error("Error updating film:", error)
    }

    editFilm.current.reset();
    editToggleOpen();
  }

  return (
    <>
      <div className="List-div">
        <ul>
          {myFilms.length === 0
            ? ( <li className="MyFilm-li"> You haven't added any seen films. <br /> Add them using the Log button!</li>)
            : ( myFilms.map((film) => (
                <Film key={film._id} {...film}
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
}

/**
* Este componente contiene cada película añadida. Tiene los datos y dos botones (edit y delete)
* props     {_id, title, year}   son los datos de cada objeto de la bbdd
* function  {deleteFilmHandler}  para eliminar una película (method: DELETE)
* function  {editHandler}        para buscar por id el elemento a editar e introducir sus datos
* component {EditBtn}            botón para editar
* component {DeleteBtn}          botón para eliminar
*/
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
}

/**
* Este componente es el botón para editar
* prop      {_id}                para pasar el id y editar la película correcta
* function  {editHandler}        para ejecutar la función al hacer click
*/
const EditBtn = (props) => {
  const { _id, editHandler } = props;
  return (
    <span className="MyFilm-edit">
      <button onClick={() => editHandler(_id)}>
        <img src="/assets/icons/edit-icon.svg" alt="edit icon" loading="lazy" />
      </button>
    </span>
  );
}

/**
* Este componente es el botón para eliminar
* prop      {_id}                para pasar el id y eliminar la película correcta
* function  {deleteFilmHandler}  para ejecutar la función al hacer click
*/
const DeleteBtn = (props) => {
  const { _id, deleteFilmHandler } = props;
  return (
    <span className="MyFilm-delete">
      <button onClick={() => deleteFilmHandler(_id)}>
        <img src="/assets/icons/delete-icon.svg" alt="delete icon"
          loading="lazy"
        />
      </button>
    </span>
  );
}

export default MyFilms
