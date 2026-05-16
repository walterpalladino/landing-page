import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

vi.mock("../../../services/appointmentService", () => ({
  ALL_TIME_SLOTS:          ["09:00", "10:00"],
  buildAvailabilityWindow: vi.fn(() => []),
  buildWeekDates:          vi.fn(() => []),
  getAvailabilityGrid:     vi.fn(() => new Promise(() => {})),
  getAppointments:         vi.fn(() => new Promise(() => {})),
  saveAvailability:        vi.fn().mockResolvedValue({ success: true }),
  formatDateLabel:         vi.fn((iso) => iso),
  computeAvailableSlots:   vi.fn(() => []),
  toLocalISO:              vi.fn(() => "2030-01-01"),
}));

import AdminPage from "../AdminPage";

const setup = (props = {}) =>
  render(<MemoryRouter><AdminPage onLogout={vi.fn()} {...props} /></MemoryRouter>);

/** Click a sidebar nav item by its label text (partial match, inside <nav>). */
const clickSidebarItem = (label) => {
  const nav = screen.getByRole("navigation", { name: "Admin navigation" });
  fireEvent.click(within(nav).getByText(new RegExp(label)));
};

// ── Layout ──────────────────────────────────────────────

describe("AdminPage — layout", () => {
  it("renders the sidebar brand name", () => {
    setup();
    expect(screen.getByText("MERIDIAN")).toBeInTheDocument();
  });

  it("renders the 'Administration' section label", () => {
    setup();
    expect(screen.getByText("Administration")).toBeInTheDocument();
  });

  it("renders all six nav items in the sidebar", () => {
    setup();
    const nav = screen.getByRole("navigation", { name: "Admin navigation" });
    ["General Settings", "Services", "Clients", "Contact", "About Us", "Appointments"]
      .forEach((label) =>
        expect(within(nav).getByText(label)).toBeInTheDocument()
      );
  });

  it("renders the Sign out button", () => {
    setup();
    expect(screen.getByRole("button", { name: /sign out/i })).toBeInTheDocument();
  });

  it("renders the main content area", () => {
    setup();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});

// ── Default panel ────────────────────────────────────────

describe("AdminPage — default panel", () => {
  it("shows General Settings panel by default", () => {
    setup();
    expect(screen.getByRole("heading", { name: /General Settings/i })).toBeInTheDocument();
  });

  it("General Settings sidebar item has active class", () => {
    const { container } = setup();
    expect(container.querySelector(".admin-sidebar__item--active").textContent)
      .toContain("General Settings");
  });

  it("breadcrumb shows General Settings", () => {
    setup();
    expect(screen.getByText(/Admin \/ General Settings/i)).toBeInTheDocument();
  });
});

// ── Static panel switching ────────────────────────────────

describe("AdminPage — static panel switching", () => {
  const CASES = [
    { label: "Services", heading: /^Services$/ },
    { label: "Clients",  heading: /^Clients$/  },
    { label: "Contact",  heading: /^Contact$/  },
    { label: "About Us", heading: /^About Us$/ },
  ];

  CASES.forEach(({ label, heading }) => {
    it(`'${label}' shows its panel heading`, () => {
      setup();
      clickSidebarItem(label);
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    });

    it(`'${label}' updates the breadcrumb`, () => {
      setup();
      clickSidebarItem(label);
      expect(screen.getByText(new RegExp(`Admin \\/ ${label}`))).toBeInTheDocument();
    });

    it(`'${label}' gets the active sidebar class`, () => {
      const { container } = setup();
      clickSidebarItem(label);
      expect(container.querySelector(".admin-sidebar__item--active").textContent)
        .toContain(label);
    });
  });
});

// ── Appointments panel + sub-navigation ──────────────────

describe("AdminPage — Appointments panel", () => {
  it("updates breadcrumb to Appointments", () => {
    setup();
    clickSidebarItem("Appointments");
    expect(screen.getByText(/Admin \/ Appointments/i)).toBeInTheDocument();
  });

  it("marks Appointments as active", () => {
    const { container } = setup();
    clickSidebarItem("Appointments");
    expect(container.querySelector(".admin-sidebar__item--active").textContent)
      .toContain("Appointments");
  });

  it("shows Availability and Existing Appointments sub-buttons", () => {
    setup();
    clickSidebarItem("Appointments");
    expect(screen.getByRole("button", { name: "Availability" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Existing Appointments" })).toBeInTheDocument();
  });

  it("shows Availability sub-panel heading by default", () => {
    setup();
    clickSidebarItem("Appointments");
    expect(screen.getByRole("heading", { name: /^Availability$/i })).toBeInTheDocument();
  });

  it("shows loading indicator in Availability sub-panel", () => {
    setup();
    clickSidebarItem("Appointments");
    expect(screen.getByText(/Loading availability/i)).toBeInTheDocument();
  });

  it("clicking Existing Appointments shows its heading", () => {
    setup();
    clickSidebarItem("Appointments");
    fireEvent.click(screen.getByRole("button", { name: "Existing Appointments" }));
    expect(screen.getByRole("heading", { name: /^Existing Appointments$/i })).toBeInTheDocument();
  });

  it("clicking Existing Appointments shows loading indicator", () => {
    setup();
    clickSidebarItem("Appointments");
    fireEvent.click(screen.getByRole("button", { name: "Existing Appointments" }));
    expect(screen.getByText(/Loading appointments/i)).toBeInTheDocument();
  });

  it("Availability sub-btn has active class by default", () => {
    const { container } = setup();
    clickSidebarItem("Appointments");
    expect(container.querySelector(".admin-panel__sub-btn--active").textContent)
      .toContain("Availability");
  });

  it("switching to Existing Appointments updates active sub-btn", () => {
    const { container } = setup();
    clickSidebarItem("Appointments");
    fireEvent.click(screen.getByRole("button", { name: "Existing Appointments" }));
    expect(container.querySelector(".admin-panel__sub-btn--active").textContent)
      .toContain("Existing Appointments");
  });
});

// ── Logout ───────────────────────────────────────────────

describe("AdminPage — logout", () => {
  it("calls onLogout when Sign out is clicked", () => {
    const onLogout = vi.fn();
    setup({ onLogout });
    fireEvent.click(screen.getByRole("button", { name: /sign out/i }));
    expect(onLogout).toHaveBeenCalledOnce();
  });
});
