import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppRoutes from "../AppRoutes";

const setup = (path = "/") =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>
  );

describe("App routes (integration)", () => {
  it("renders without crashing on home route", () => {
    expect(() => setup("/")).not.toThrow();
  });

  it("renders Navbar on home route", () => {
    setup("/");
    expect(screen.getAllByText("MERIDIAN").length).toBeGreaterThan(0);
  });

  it("renders main content on home route", () => {
    setup("/");
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders Footer on home route", () => {
    setup("/");
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("CTA reads 'Set an Appointment'", () => {
    setup("/");
    expect(screen.getAllByText(/Set an Appointment/i).length).toBeGreaterThan(0);
  });

  it("all home sections present on /", () => {
    const { container } = setup("/");
    expect(container.querySelector(".hero")).toBeInTheDocument();
    expect(container.querySelector("#services")).toBeInTheDocument();
    expect(container.querySelector("#clients")).toBeInTheDocument();
    expect(container.querySelector("#contact")).toBeInTheDocument();
  });

  it("renders AppointmentPage on /appointment", () => {
    setup("/appointment");
    expect(screen.getByRole("heading", { name: /Book a session/i })).toBeInTheDocument();
  });

  it("renders the login page on /admin", () => {
    setup("/admin");
    expect(screen.getByRole("heading", { name: /Admin Access/i })).toBeInTheDocument();
  });

  it("/admin does not render the public Navbar", () => {
    setup("/admin");
    // The public Navbar has MERIDIAN logo; admin login page doesn't use it
    // Admin login card has its own brand, Navbar should not be present
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("renders AboutPage on /about", () => {
    setup("/about");
    expect(screen.getByRole("heading", { level: 1, name: /We are Meridian/i })).toBeInTheDocument();
  });

  it("renders ClientDetailPage on /clients/:slug", () => {
    setup("/clients/apex-industries");
    expect(screen.getByRole("heading", { level: 1, name: "Apex Industries" })).toBeInTheDocument();
  });

  it("renders 404 on unknown client slug", () => {
    setup("/clients/nonexistent");
    expect(screen.getByText(/Client not found/i)).toBeInTheDocument();
  });

  it("renders ServiceDetailPage on /services/:slug", () => {
    setup("/services/brand-strategy");
    expect(screen.getByRole("heading", { level: 1, name: "Brand Strategy" })).toBeInTheDocument();
  });

  it("renders 404 on unknown service slug", () => {
    setup("/services/nonexistent");
    expect(screen.getByText(/Service not found/i)).toBeInTheDocument();
  });
});
