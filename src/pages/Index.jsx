/*-----------------------------------------------------
  * Index.jsx
  *   Esta página se carga si no hay usuario loggeado
  *   Estructura: 
  *     - Header con el menú
  *     - Hero (imagen e intro)
  *     - Main (contenido de la página)
-------------------------------------------------------*/

import { Header } from "../components/Header/Header";
import { Hero } from "../components/Hero/Hero";
import { Main } from "../components/Main/Main";

export const Index = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Main />
    </div>
  );
};
