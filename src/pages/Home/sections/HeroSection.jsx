import Button from "../../../components/ui/Button";
import "./HeroSection.css";

export default function HeroSection() {
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
          {/* Anchor scroll — stays as href */}
          <Button href="#services" variant="primary">Our Work ↓</Button>
          {/* Internal page navigation — uses to prop → Link */}
          <Button to="/appointment" variant="ghost">Set an Appointment</Button>
        </div>
      </div>

      <div className="hero__scroll-hint fade-up" style={{ animationDelay: "1s" }}>
        <span>Scroll</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}
