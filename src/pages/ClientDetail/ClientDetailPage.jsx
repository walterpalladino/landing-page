import { useParams, useNavigate, Link } from "react-router-dom";
import { getClientBySlug, CLIENTS } from "../../services/contentService";
import Button from "../../components/ui/Button";
import "./ClientDetailPage.css";

export default function ClientDetailPage() {
  const { slug }   = useParams();
  const navigate   = useNavigate();
  const client     = getClientBySlug(slug);

  /* ── 404 fallback ── */
  if (!client) {
    return (
      <div className="cli-not-found">
        <span className="cli-not-found__icon">◈</span>
        <h1>Client not found.</h1>
        <p>The case study you&apos;re looking for doesn&apos;t exist.</p>
        <Button to="/#clients" variant="outline">Back to clients</Button>
      </div>
    );
  }

  /* Other clients for the related strip — max 3, excluding current */
  const related = CLIENTS.filter((c) => c.id !== client.id).slice(0, 3);

  return (
    <div className="cli-detail">

      {/* ── Hero banner ── */}
      <header className="cli-hero">
        <img src={client.image} alt={client.name} className="cli-hero__img" />
        <div className="cli-hero__overlay" />
        <div className="container cli-hero__content">
          <button className="cli-hero__back" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <p className="cli-hero__eyebrow">Case Study</p>
          <h1 className="cli-hero__title">{client.name}</h1>
          <p className="cli-hero__industry">{client.industry}</p>
          <p className="cli-hero__tagline">{client.tagline}</p>
        </div>
      </header>

      {/* ── Overview ── */}
      <section className="cli-overview">
        <div className="container cli-overview__grid">
          <div className="cli-overview__text">
            <p className="section-label">The project</p>
            <h2 className="cli-overview__heading">What we did together</h2>
            <p className="cli-overview__body">{client.overview}</p>
            <div className="cli-overview__services">
              <p className="cli-overview__services-label">Services delivered</p>
              <ul className="cli-overview__services-list">
                {client.services.map((s) => (
                  <li key={s} className="cli-overview__service-tag">{s}</li>
                ))}
              </ul>
            </div>
            <Button to="/appointment" variant="primary">
              Start your project →
            </Button>
          </div>
          <div className="cli-overview__img-wrap">
            <img
              src={client.imageSplit}
              alt={`${client.name} project`}
              className="cli-overview__img"
            />
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="cli-stats">
        <div className="cli-stats__grid">
          {client.stats.map((s) => (
            <div key={s.label} className="cli-stats__item">
              <span className="cli-stats__num">{s.num}</span>
              <span className="cli-stats__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="cli-testimonial">
        <div className="container cli-testimonial__inner">
          <span className="cli-testimonial__mark">◈</span>
          <blockquote className="cli-testimonial__quote">
            &ldquo;{client.testimonial.quote}&rdquo;
          </blockquote>
          <div className="cli-testimonial__attribution">
            <span className="cli-testimonial__author">{client.testimonial.author}</span>
            <span className="cli-testimonial__role">{client.testimonial.role}</span>
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="cli-gallery">
        <div className="cli-gallery__grid">
          {client.imageGallery.map((src, i) => (
            <div key={i} className="cli-gallery__item">
              <img
                src={src}
                alt={`${client.name} gallery ${i + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Deliverables ── */}
      <section className="cli-deliverables">
        <div className="container">
          <p className="section-label">What was delivered</p>
          <h2 className="cli-deliverables__heading">Deliverables</h2>
          <ul className="cli-deliverables__list">
            {client.deliverables.map((d) => (
              <li key={d} className="cli-deliverables__item">
                <span className="cli-deliverables__bullet">◈</span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA band ── */}
      <section className="cli-cta">
        <div className="container cli-cta__inner">
          <div className="cli-cta__text">
            <h2 className="cli-cta__heading">Ready to write your own story?</h2>
            <p className="cli-cta__body">
              Every engagement starts with a conversation. Tell us about your
              project and let&apos;s explore what&apos;s possible.
            </p>
          </div>
          <div className="cli-cta__actions">
            <Button to="/appointment" variant="primary">Set an Appointment</Button>
            <Button href="/#contact"  variant="outline-light">Send a message</Button>
          </div>
        </div>
      </section>

      {/* ── Related clients ── */}
      <section className="cli-related">
        <div className="container">
          <p className="section-label">More work</p>
          <h2 className="cli-related__heading">Other case studies</h2>
          <div className="cli-related__grid">
            {related.map((c) => (
              <Link
                key={c.id}
                to={`/clients/${c.slug}`}
                className="cli-related-card"
              >
                <div className="cli-related-card__img-wrap">
                  <img src={c.image} alt={c.name} loading="lazy" />
                </div>
                <div className="cli-related-card__body">
                  <p className="cli-related-card__industry">{c.industry}</p>
                  <h3 className="cli-related-card__name">{c.name}</h3>
                  <p className="cli-related-card__tagline">{c.tagline}</p>
                  <span className="cli-related-card__cta">View case study →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
