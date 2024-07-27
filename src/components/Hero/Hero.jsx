/*-----------------------------------------------------------------------
  * Hero.jsx
  *   Componente para la home ("/"). Se muestra debajo del Header
  *   Estructura: 
  *     - Imagen de cabecera (en móvil el logo se muestra aquí)
  *     - HeroDiv textos de descripción de la app
------------------------------------------------------------------------*/
import "./Hero.css";

/**
* Este componente carga el Hero que aparece en "/"
*/
export const Hero = () => {
  return (
    <div className="Hero">
      <img className="Hero-img" src="/assets/Hero-img.jpg" alt="Poor Things | Frame"
        loading="lazy"
      />
      <div className="Hero-mask">
        <h1 className="Header-h1 mobile">
          <a href="/" className="Header-logo">
            <img src="/assets/H1-logo.svg" alt="Letterboxd | Logo" loading="lazy"
            />
          </a>
        </h1>
      </div>
      <HeroDiv />
      <HeroMetadata />
      
    </div>
  );
};

/**
* Este componente carga los textos de inicio de la app
*/
const HeroDiv = () => {
  return(
    <div className="Hero-div">
        <h2 className="Hero-h2"> Track films you&apos;ve watched.<br /> Save those you want to see. <br /> Tell your friends what&apos;s good. </h2>
        <a className="Hero-cta" href="https://letterboxd.com/create-account/" target="_blank" rel="noreferrer"> Get started — it&apos;s free! </a>
        <p className="Hero-p"> The social network for film lovers. <br /> Also available on
          <span>
            <img className="Hero-icon apple" src="/assets/icons/ios-apple.svg" alt="iOS, Apple"
              loading="lazy"
            />
            <img className="Hero-icon android" src="/assets/icons/android.svg" alt="Android"
              loading="lazy"
            />
          </span>
        </p>
      </div>
  )
}

/**
* Este componente contiene el título de la película de la imagen
*/
const HeroMetadata = () => {
  return(
    <p className="Hero-metadata">
        <a href="https://letterboxd.com/film/poor-things-2023/" target="_blank" rel="noreferrer">
          Poor Things (2023)
        </a>
      </p>
  )
}