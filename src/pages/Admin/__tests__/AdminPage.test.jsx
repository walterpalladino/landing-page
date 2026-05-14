import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminPage from "../AdminPage";

const setup = (props = {}) =>
  render(
    <MemoryRouter>
      <AdminPage onLogout={vi.fn()} {...props} />
    </MemoryRouter>
  );

// ── Layout ──────────────────────────────────────────────

describe("AdminPage — layout", () => {
  it("renders the sidebar brand mark and name", () => {
    setup();
    expect(screen.getAllByText("◈").length).toBeGreaterThan(0);
    expect(screen.getByText("MERIDIAN")).toBeInTheDocument();
  });

  it("renders the 'Administration' section label in sidebar", () => {
    setup();
    expect(screen.getByText("Administration")).toBeInTheDocument();
  });

  it("renders all six nav items", () => {
    setup();
    const labels = [
      "General Settings", "Services", "Clients",
      "Contact", "About Us", "Appointments",
    ];
    labels.forEach((label) =>
      expect(screen.getByRole("button", { name: new RegExp(label, "i") })).toBeInTheDocument()
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

describe("AdminPage — default active panel", () => {
  it("shows 'General Settings' panel by default", () => {
    setup();
    expect(screen.getByRole("heading", { name: /General Settings/i })).toBeInTheDocument();
  });

  it("'General Settings' button has active class by default", () => {
    const { container } = setup();
    const active = container.querySelector(".admin-sidebar__item--active");
    expect(active.textContent).toContain("General Settings");
  });

  it("shows the breadcrumb for the active panel", () => {
    setup();
    expect(screen.getByText(/Admin \/ General Settings/i)).toBeInTheDocument();
  });
});

// ── Panel switching ──────────────────────────────────────

describe("AdminPage — panel switching", () => {
  const PANELS = [
    { button: "Services",     heading: /Services/        },
    { button: "Clients",      heading: /Clients/         },
    { button: "Contact",      heading: /Contact/         },
    { button: "About Us",     heading: /About Us/        },
    { button: "Appointments", heading: /Appointments/    },
  ];

  PANELS.forEach(({ button, heading }) => {
    it(`clicking '${button}' shows the ${button} panel`, () => {
      setup();
      fireEvent.click(screen.getByRole("button", { name: new RegExp(button, "i") }));
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    });

    it(`clicking '${button}' updates the breadcrumb`, () => {
      setup();
      fireEvent.click(screen.getByRole("button", { name: new RegExp(button, "i") }));
      expect(screen.getByText(new RegExp(`Admin \\/ ${button}`, "i"))).toBeInTheDocument();
    });

    it(`clicking '${button}' marks it as active`, () => {
      const { container } = setup();
      fireEvent.click(screen.getByRole("button", { name: new RegExp(button, "i") }));
      const active = container.querySelector(".admin-sidebar__item--active");
      expect(active.textContent).toContain(button);
    });
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
