import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useScrolled } from "../../hooks/useScrolled";
import { PAGE_LINKS, getActiveNavLinks } from "../../services/contentService";
import "./Navbar.css";

export default function Navbar() {
  const scrolled             = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname }         = useLocation();

  const isHome      = pathname === "/" || pathname === "";
  const solidBg     = scrolled || !isHome;
  const activeLinks = getActiveNavLinks();

  const linkClass = `navbar__link ${solidBg ? "" : "navbar__link--light"}`.trim();

  /**
   * Builds the correct href for a section anchor link.
   * - On home:     "#services"           → native browser scroll
   * - Elsewhere:   "/#services"          → navigate to home then scroll
   */
  const sectionHref = (anchor) => (isHome ? anchor : `/${anchor}`);

  return (
    <nav className={`navbar ${solidBg ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">

        {/* Logo — scrolls to top when already on home, navigates otherwise */}
        <Link
          to="/"
          className="navbar__logo"
          onClick={() => {
            if (isHome) window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="navbar__logo-mark">◈</span>
          <span className={`navbar__logo-text ${solidBg ? "" : "navbar__logo-text--light"}`}>
            MERIDIAN
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="navbar__links">
          {/* Section anchor links */}
          {activeLinks.map((link) => (
            <li key={link.href}>
              <a href={sectionHref(link.href)} className={linkClass}>
                {link.label}
              </a>
            </li>
          ))}
          {/* Route links */}
          {PAGE_LINKS.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className={linkClass}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to="/appointment"
          className={`navbar__cta ${solidBg ? "navbar__cta--dark" : "navbar__cta--light"}`}
        >
          Set an Appointment
        </Link>

        {/* Burger */}
        <button
          className={`navbar__burger ${menuOpen ? "open" : ""} ${solidBg ? "" : "navbar__burger--light"}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`}>
        {activeLinks.map((link) => (
          <a
            key={link.href}
            href={sectionHref(link.href)}
            className="navbar__mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        {PAGE_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="navbar__mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/appointment"
          className="navbar__mobile-cta"
          onClick={() => setMenuOpen(false)}
        >
          Set an Appointment →
        </Link>
      </div>
    </nav>
  );
}
