import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <img
          src="https://picsum.photos/seed/herolandscape/1600/900"
          alt="Hero visual"
          className="hero__img"
        />
        <div className="hero__overlay" />
      </div>

      <div className="container hero__content">
        <p className="hero__eyebrow fade-up" style={{ animationDelay: "0.1s" }}>
          Creative Studio — Est. 2018
        </p>
        <h1 className="hero__headline fade-up" style={{ animationDelay: "0.25s" }}>
          We craft<br />
          <em>experiences</em><br />
          that last.
        </h1>
        <p className="hero__sub fade-up" style={{ animationDelay: "0.45s" }}>
          Strategy. Design. Technology. Three disciplines, one studio.
        </p>
        <div className="hero__actions fade-up" style={{ animationDelay: "0.6s" }}>
          <a href="#services" className="hero__btn hero__btn--primary">
            Our Work ↓
          </a>
          <a href="#contact" className="hero__btn hero__btn--ghost">
            Get in Touch
          </a>
        </div>
      </div>

      <div className="hero__scroll-hint fade-up" style={{ animationDelay: "1s" }}>
        <span>Scroll</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}
