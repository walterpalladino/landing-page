import { useParams, useNavigate, Link } from "react-router-dom";
import { getServiceBySlug, SERVICES } from "../../services/contentService";
import Button from "../../components/ui/Button";
import "./ServiceDetailPage.css";

export default function ServiceDetailPage() {
  const { slug }   = useParams();
  const navigate   = useNavigate();
  const service    = getServiceBySlug(slug);

  /* ── 404 fallback ── */
  if (!service) {
    return (
      <div className="svc-not-found">
        <span className="svc-not-found__icon">◈</span>
        <h1>Service not found.</h1>
        <p>The page you&apos;re looking for doesn&apos;t exist.</p>
        <Button to="/#services" variant="outline">Back to services</Button>
      </div>
    );
  }

  /* Related services — all except the current one, max 3 */
  const related = SERVICES.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div className="svc-detail">

      {/* ── Hero banner ── */}
      <header className="svc-hero">
        <img
          src={service.image}
          alt={service.title}
          className="svc-hero__img"
        />
        <div className="svc-hero__overlay" />
        <div className="container svc-hero__content">
          <button className="svc-hero__back" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <p className="svc-hero__eyebrow">
            <span className="svc-hero__icon">{service.icon}</span>
            Our Services
          </p>
          <h1 className="svc-hero__title">{service.title}</h1>
          <p className="svc-hero__tagline">{service.tagline}</p>
        </div>
      </header>

      {/* ── Overview ── */}
      <section className="svc-overview">
        <div className="container svc-overview__grid">
          <div className="svc-overview__text">
            <p className="section-label">Overview</p>
            <h2 className="svc-overview__heading">What&apos;s involved</h2>
            <p className="svc-overview__body">{service.longDescription}</p>
            <Button to="/appointment" variant="primary">
              Book a consultation →
            </Button>
          </div>
          <div className="svc-overview__img-wrap">
            <img
              src={service.imageSplit}
              alt={`${service.title} detail`}
              className="svc-overview__img"
            />
          </div>
        </div>
      </section>

      {/* ── Highlights ── */}
      <section className="svc-highlights">
        <div className="container">
          <p className="section-label">What we cover</p>
          <h2 className="svc-highlights__heading">Scope &amp; capabilities</h2>
          <ul className="svc-highlights__list">
            {service.highlights.map((h) => (
              <li key={h} className="svc-highlights__item">
                <span className="svc-highlights__bullet">◈</span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Deliverables ── */}
      <section className="svc-deliverables">
        <div className="container">
          <p className="section-label">What you receive</p>
          <h2 className="svc-deliverables__heading">Deliverables</h2>
          <div className="svc-deliverables__grid">
            {service.deliverables.map((d, i) => (
              <div className="svc-deliverable-card" key={d.label}>
                <span className="svc-deliverable-card__num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="svc-deliverable-card__title">{d.label}</h3>
                <p className="svc-deliverable-card__desc">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="svc-gallery">
        <div className="svc-gallery__grid">
          {service.imageGallery.map((src, i) => (
            <div className="svc-gallery__item" key={i}>
              <img src={src} alt={`${service.title} gallery ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA band ── */}
      <section className="svc-cta">
        <div className="container svc-cta__inner">
          <div className="svc-cta__text">
            <h2 className="svc-cta__heading">
              Ready to get started?
            </h2>
            <p className="svc-cta__body">
              Let&apos;s talk about your project. Book a free 30-minute
              consultation and we&apos;ll tell you exactly how we can help.
            </p>
          </div>
          <div className="svc-cta__actions">
            <Button to="/appointment" variant="primary">
              Set an Appointment
            </Button>
            <Button href="#contact" variant="outline-light">
              Send a message
            </Button>
          </div>
        </div>
      </section>

      {/* ── Related services ── */}
      <section className="svc-related">
        <div className="container">
          <p className="section-label">Explore more</p>
          <h2 className="svc-related__heading">Other services</h2>
          <div className="svc-related__grid">
            {related.map((s) => (
              <Link
                key={s.id}
                to={`/services/${s.slug}`}
                className="svc-related-card"
              >
                <div className="svc-related-card__img-wrap">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                  />
                </div>
                <div className="svc-related-card__body">
                  <span className="svc-related-card__icon">{s.icon}</span>
                  <h3 className="svc-related-card__title">{s.title}</h3>
                  <p className="svc-related-card__tagline">{s.tagline}</p>
                  <span className="svc-related-card__cta">Learn more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
