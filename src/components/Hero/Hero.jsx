import './Hero.css'

export const Hero = () => {
    return (
      <div className="Hero">
        <img className="Hero-img" src="/assets/Hero-img.jpg" alt="Poor Things | Frame" loading="lazy" />
        <div className="Hero-mask"></div>
        <p className="Hero-metadata">
          <a href="https://letterboxd.com/film/poor-things-2023/" target='_blank'>Poor Things (2023)</a>
        </p>
        <div className="Hero-div">
          <h2 className="Hero-h2">
            Track films you've watched.
            <br />
            Save those you want to see.
            <br />
            Tell your friends what's good.
          </h2>
          <p className="Hero-p">The social network for film lovers. Also available on iOS, Apple TV and Android</p>
        </div>
      </div>
    );
}