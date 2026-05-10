import { NAV_LINKS, SOCIAL_LINKS } from "../data/content";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#" className="footer__logo">
              <span className="footer__logo-mark">◈</span>
              <span>MERIDIAN</span>
            </a>
            <p className="footer__tagline">
              Creative studio for<br />brands that mean business.
            </p>
            <div className="footer__socials">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="footer__social"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer__nav">
            <span className="footer__col-title">Navigation</span>
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="footer__link">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__nav">
            <span className="footer__col-title">Services</span>
            <ul>
              {["Brand Strategy", "Digital Experience", "Motion & Film", "Growth Marketing", "Systems & Tech"].map((s) => (
                <li key={s}>
                  <a href="#services" className="footer__link">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__contact-col">
            <span className="footer__col-title">Contact</span>
            <a href="mailto:hello@meridian.studio" className="footer__contact-link">
              hello@meridian.studio
            </a>
            <a href="tel:+15551234567" className="footer__contact-link">
              +1 (555) 123-4567
            </a>
            <address className="footer__address">
              123 Studio Row<br />
              New York, NY 10001<br />
              United States
            </address>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} Meridian Studio. All rights reserved.</span>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
