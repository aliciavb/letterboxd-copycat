import "./Hero.css";

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


const HeroDiv = () => {
  return(
    <div className="Hero-div">
        <h2 className="Hero-h2"> Track films you've watched. <br /> Save those you want to see. <br /> Tell your friends what's good. </h2>
        <a className="Hero-cta" href="/create-account/"> Get started — it's free! </a>
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

const HeroMetadata = () => {
  return(
    <p className="Hero-metadata">
        <a href="https://letterboxd.com/film/poor-things-2023/" target="_blank">
          Poor Things (2023)
        </a>
      </p>
  )
}