import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppRoutes from "../AppRoutes";

/** Wraps AppRoutes in a MemoryRouter starting at "/" (home route). */
const setup = (initialPath = "/") =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <AppRoutes />
    </MemoryRouter>
  );

describe("App routes (integration)", () => {
  it("renders without crashing on home route", () => {
    expect(() => setup("/")).not.toThrow();
  });

  it("renders the Navbar with the logo on home route", () => {
    setup("/");
    expect(screen.getAllByText("MERIDIAN").length).toBeGreaterThan(0);
  });

  it("renders the main content area on the home route", () => {
    setup("/");
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders the Footer on home route", () => {
    setup("/");
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("CTA reads 'Set an Appointment'", () => {
    setup("/");
    expect(screen.getAllByText(/Set an Appointment/i).length).toBeGreaterThan(0);
  });

  it("all home sections are present on the home route", () => {
    const { container } = setup("/");
    expect(container.querySelector(".hero")).toBeInTheDocument();
    expect(container.querySelector("#services")).toBeInTheDocument();
    expect(container.querySelector("#clients")).toBeInTheDocument();
    expect(container.querySelector("#contact")).toBeInTheDocument();
  });

  it("renders the AppointmentPage on /appointment", () => {
    setup("/appointment");
    expect(screen.getByText(/Book a session/i)).toBeInTheDocument();
  });

  it("AppointmentPage has all form fields on /appointment", () => {
    setup("/appointment");
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Preferred Date")).toBeInTheDocument();
  });
});
