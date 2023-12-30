import './Hero.css'

export const Hero = () => {
    return (
      <div className="Hero">
        <img className="Hero-img" src="/assets/Hero-img.jpg" alt="Poor Things | Frame" loading="lazy" />
        <div className="Hero-mask"></div>
        <p className="Hero-metadata">
          <a href="/film/poor-things-2023/">Poor Things (2023)</a>
        </p>
        <div className="Hero-div">
          <h2 className="Hero-h2">
            Track films you've watched.
            <br />
            Save those you want to see.
            <br />
            Tell your friends what's good.
          </h2>
          <p className="Hero-p">
            <strong>The social network for film&nbsp;lovers.</strong>
            Also available on{" "}
            <a href="/apps/" className="Hero-icons">
              <span href="apps" className="platform -ios">
                iOS, Apple TV
              </span>
              <span className="_hidetext"> and </span>
              <span className="platform -android">Android</span>
            </a>
          </p>
        </div>
      </div>
    );
}