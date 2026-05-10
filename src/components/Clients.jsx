import { CLIENTS } from "../data/content";
import "./Clients.css";

export default function Clients() {
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
            <div className="client-card" key={client.id}>
              <img
                src={client.logo}
                alt={client.name}
                className="client-card__logo"
                loading="lazy"
              />
              <span className="client-card__name">{client.name}</span>
            </div>
          ))}
        </div>

        <div className="clients__stat-row">
          {[
            { num: "120+", label: "Projects Delivered" },
            { num: "40+", label: "Global Clients" },
            { num: "8", label: "Years in Business" },
            { num: "97%", label: "Retention Rate" },
          ].map((s) => (
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
