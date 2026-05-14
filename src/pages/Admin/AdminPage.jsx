import { useState } from "react";
import "./AdminPage.css";

const NAV_ITEMS = [
  { id: "general",      label: "General Settings" },
  { id: "services",     label: "Services"          },
  { id: "clients",      label: "Clients"           },
  { id: "contact",      label: "Contact"           },
  { id: "about",        label: "About Us"          },
  { id: "appointments", label: "Appointments"      },
];

/* ── Placeholder panels — content will be built out per item ── */
function PanelGeneral() {
  return (
    <div className="admin-panel">
      <h2 className="admin-panel__title">General Settings</h2>
      <p className="admin-panel__desc">
        Configure global site settings such as studio name, tagline, logo, and
        SEO metadata. Changes made here propagate across all pages.
      </p>
      <div className="admin-panel__placeholder">
        <span className="admin-panel__placeholder-icon">◈</span>
        <p>General settings editor coming soon.</p>
      </div>
    </div>
  );
}

function PanelServices() {
  return (
    <div className="admin-panel">
      <h2 className="admin-panel__title">Services</h2>
      <p className="admin-panel__desc">
        Add, edit, or remove service entries. Each service appears as a card on
        the home page and has a full detail page at <code>/services/:slug</code>.
      </p>
      <div className="admin-panel__placeholder">
        <span className="admin-panel__placeholder-icon">◈</span>
        <p>Services editor coming soon.</p>
      </div>
    </div>
  );
}

function PanelClients() {
  return (
    <div className="admin-panel">
      <h2 className="admin-panel__title">Clients</h2>
      <p className="admin-panel__desc">
        Manage client case studies. Each client card on the home page links to a
        full case study at <code>/clients/:slug</code>.
      </p>
      <div className="admin-panel__placeholder">
        <span className="admin-panel__placeholder-icon">◈</span>
        <p>Clients editor coming soon.</p>
      </div>
    </div>
  );
}

function PanelContact() {
  return (
    <div className="admin-panel">
      <h2 className="admin-panel__title">Contact</h2>
      <p className="admin-panel__desc">
        Update the studio&apos;s contact details — email address, phone number,
        and office location displayed in the Contact section and Footer.
      </p>
      <div className="admin-panel__placeholder">
        <span className="admin-panel__placeholder-icon">◈</span>
        <p>Contact editor coming soon.</p>
      </div>
    </div>
  );
}

function PanelAbout() {
  return (
    <div className="admin-panel">
      <h2 className="admin-panel__title">About Us</h2>
      <p className="admin-panel__desc">
        Edit the studio story, values, and team members shown on the About Us
        page at <code>/about</code>.
      </p>
      <div className="admin-panel__placeholder">
        <span className="admin-panel__placeholder-icon">◈</span>
        <p>About Us editor coming soon.</p>
      </div>
    </div>
  );
}

function PanelAppointments() {
  return (
    <div className="admin-panel">
      <h2 className="admin-panel__title">Appointments</h2>
      <p className="admin-panel__desc">
        View incoming appointment requests, configure available time slots, and
        manage the booking calendar.
      </p>
      <div className="admin-panel__placeholder">
        <span className="admin-panel__placeholder-icon">◈</span>
        <p>Appointments manager coming soon.</p>
      </div>
    </div>
  );
}

const PANELS = {
  general:      <PanelGeneral />,
  services:     <PanelServices />,
  clients:      <PanelClients />,
  contact:      <PanelContact />,
  about:        <PanelAbout />,
  appointments: <PanelAppointments />,
};

/* ── AdminPage ── */
export default function AdminPage({ onLogout }) {
  const [active, setActive] = useState("general");

  return (
    <div className="admin-page">

      {/* ── Sidebar ── */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <span className="admin-sidebar__logo-mark">◈</span>
          <span className="admin-sidebar__logo-text">MERIDIAN</span>
        </div>

        <p className="admin-sidebar__section-label">Administration</p>

        <nav className="admin-sidebar__nav" aria-label="Admin navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`admin-sidebar__item ${active === item.id ? "admin-sidebar__item--active" : ""}`}
              onClick={() => setActive(item.id)}
              aria-current={active === item.id ? "page" : undefined}
            >
              <span className="admin-sidebar__item-dot">◈</span>
              {item.label}
            </button>
          ))}
        </nav>

        <button className="admin-sidebar__logout" onClick={onLogout}>
          Sign out
        </button>
      </aside>

      {/* ── Main content ── */}
      <main className="admin-main">
        <header className="admin-main__header">
          <div className="admin-main__header-meta">
            <p className="admin-main__breadcrumb">
              Admin / {NAV_ITEMS.find((i) => i.id === active)?.label}
            </p>
          </div>
        </header>

        <div className="admin-main__content">
          {PANELS[active]}
        </div>
      </main>

    </div>
  );
}
