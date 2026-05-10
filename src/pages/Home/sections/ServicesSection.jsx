import { SERVICES } from "../../../services/contentService";
import "./ServicesSection.css";

export default function ServicesSection() {
  return (
    <section className="services" id="services">
      <div className="container">
        <header className="section-header">
          <p className="section-label">02 / Services</p>
          <h2 className="section-title">What we <em>do</em></h2>
          <p className="section-desc">
            Six disciplines, one integrated studio — built to take ideas from
            spark to shipped.
          </p>
        </header>

        <div className="services__grid">
          {SERVICES.map((service, i) => (
            <article
              key={service.id}
              className="service-card"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="service-card__img-wrap">
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-card__img"
                  loading="lazy"
                />
                <span className="service-card__icon">{service.icon}</span>
              </div>
              <div className="service-card__body">
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__desc">{service.description}</p>
                <span className="service-card__link">Learn more →</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
