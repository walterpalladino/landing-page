import { Link } from "react-router-dom";
import { CLIENTS, STATS } from "../../../services/contentService";
import "./ClientsSection.css";

export default function ClientsSection() {
  return (
    <section className="clients" id="clients">
      <div className="container">
        <header className="section-header">
          <p className="section-label">03 / Clients</p>
          <h2 className="section-title">
            Trusted by <em>industry leaders</em>
          </h2>
        </header>

        <div className="clients__grid">
          {CLIENTS.map((client) => (
            <Link
              key={client.id}
              to={`/clients/${client.slug}`}
              className="client-card"
              aria-label={`View case study for ${client.name}`}
            >
              <img
                src={client.logo}
                alt={client.name}
                className="client-card__logo"
                loading="lazy"
              />
              <span className="client-card__name">{client.name}</span>
              <span className="client-card__industry">{client.industry}</span>
            </Link>
          ))}
        </div>

        <div className="clients__stat-row">
          {STATS.map((s) => (
            <div className="clients__stat" key={s.label}>
              <span className="clients__stat-num">{s.num}</span>
              <span className="clients__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
