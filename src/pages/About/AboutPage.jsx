import { ABOUT } from "../../services/contentService";
import Button    from "../../components/ui/Button";
import "./AboutPage.css";

export default function AboutPage() {
  const { headline, subheadline, image, imageSplit, story, values, team } = ABOUT;

  return (
    <div className="about-page">

      {/* ── Hero ── */}
      <header className="about-hero">
        <img src={image} alt="Meridian studio team" className="about-hero__img" />
        <div className="about-hero__overlay" />
        <div className="container about-hero__content">
          <p className="about-hero__eyebrow">About Us</p>
          <h1 className="about-hero__headline">{headline}</h1>
          <p className="about-hero__sub">{subheadline}</p>
        </div>
      </header>

      {/* ── Story ── */}
      <section className="about-story">
        <div className="container about-story__grid">
          <div className="about-story__text">
            <p className="section-label">Our story</p>
            <h2 className="about-story__heading">How we got here</h2>
            {story.map((para, i) => (
              <p key={i} className="about-story__para">{para}</p>
            ))}
            <Button to="/appointment" variant="primary">
              Work with us →
            </Button>
          </div>
          <div className="about-story__img-wrap">
            <img src={imageSplit} alt="Meridian studio space" className="about-story__img" />
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="about-values">
        <div className="container">
          <p className="section-label">What we believe</p>
          <h2 className="about-values__heading">Our values</h2>
          <div className="about-values__grid">
            {values.map((v, i) => (
              <div key={v.title} className="about-value-card">
                <span className="about-value-card__num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="about-value-card__title">{v.title}</h3>
                <p className="about-value-card__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="about-team">
        <div className="container">
          <p className="section-label">The people</p>
          <h2 className="about-team__heading">Who we are</h2>
          <div className="about-team__grid">
            {team.map((member) => (
              <div key={member.name} className="about-team-card">
                <div className="about-team-card__img-wrap">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="about-team-card__img"
                    loading="lazy"
                  />
                </div>
                <div className="about-team-card__body">
                  <h3 className="about-team-card__name">{member.name}</h3>
                  <p className="about-team-card__role">{member.role}</p>
                  <p className="about-team-card__bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ── */}
      <section className="about-cta">
        <div className="container about-cta__inner">
          <div>
            <h2 className="about-cta__heading">Let&apos;s build something together.</h2>
            <p className="about-cta__body">
              We take on a small number of new clients each quarter.
              If you have a project in mind, we&apos;d love to hear about it.
            </p>
          </div>
          <div className="about-cta__actions">
            <Button to="/appointment" variant="primary">Set an Appointment</Button>
            <Button href="#contact"   variant="outline-light">Send a message</Button>
          </div>
        </div>
      </section>

    </div>
  );
}
