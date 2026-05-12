import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../Navbar";
import { NAV_LINKS, PAGE_LINKS } from "../../../services/contentService";

const setup = (path = "/") =>
  render(<MemoryRouter initialEntries={[path]}><Navbar /></MemoryRouter>);

describe("Navbar", () => {
  it("renders the logo text", () => {
    setup();
    expect(screen.getByText("MERIDIAN")).toBeInTheDocument();
  });

  it("logo is a link to /", () => {
    setup();
    expect(screen.getByText("MERIDIAN").closest("a")).toHaveAttribute("href", "/");
  });

  it("renders all anchor nav links", () => {
    setup();
    NAV_LINKS.forEach(({ label }) =>
      expect(screen.getAllByText(label).length).toBeGreaterThan(0)
    );
  });

  it("renders all route-based page links", () => {
    setup();
    PAGE_LINKS.forEach(({ label }) =>
      expect(screen.getAllByText(label).length).toBeGreaterThan(0)
    );
  });

  it("'About Us' desktop link points to /about", () => {
    setup();
    const links = screen.getAllByRole("link", { name: /about us/i });
    expect(links.some((l) => l.getAttribute("href") === "/about")).toBe(true);
  });

  it("CTA reads 'Set an Appointment'", () => {
    setup();
    expect(screen.getAllByText(/Set an Appointment/i).length).toBeGreaterThan(0);
  });

  it("CTA links to /appointment", () => {
    setup();
    const ctas = screen.getAllByRole("link", { name: /Set an Appointment/i });
    ctas.forEach(link => expect(link).toHaveAttribute("href", "/appointment"));
  });

  it("is transparent at top of home page", () => {
    const { container } = setup("/");
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
    fireEvent.scroll(window);
    expect(container.querySelector(".navbar")).not.toHaveClass("navbar--scrolled");
  });

  it("shows solid background on non-home pages", () => {
    const { container } = setup("/about");
    expect(container.querySelector(".navbar")).toHaveClass("navbar--scrolled");
  });

  it("shows solid background after scrolling on home page", () => {
    const { container } = setup("/");
    Object.defineProperty(window, "scrollY", { value: 100, writable: true });
    fireEvent.scroll(window);
    expect(container.querySelector(".navbar")).toHaveClass("navbar--scrolled");
  });

  it("renders the burger button", () => {
    setup();
    expect(screen.getByLabelText("Toggle menu")).toBeInTheDocument();
  });

  it("toggles mobile menu on burger click", () => {
    const { container } = setup();
    const burger = screen.getByLabelText("Toggle menu");
    const mobile = container.querySelector(".navbar__mobile");
    expect(mobile).not.toHaveClass("navbar__mobile--open");
    fireEvent.click(burger);
    expect(mobile).toHaveClass("navbar__mobile--open");
    fireEvent.click(burger);
    expect(mobile).not.toHaveClass("navbar__mobile--open");
  });

  it("closes mobile menu when a nav link is clicked", () => {
    const { container } = setup();
    fireEvent.click(screen.getByLabelText("Toggle menu"));
    const mobile = container.querySelector(".navbar__mobile");
    fireEvent.click(mobile.querySelector(".navbar__mobile-link"));
    expect(mobile).not.toHaveClass("navbar__mobile--open");
  });

  it("'About Us' appears in the mobile menu", () => {
    const { container } = setup();
    fireEvent.click(screen.getByLabelText("Toggle menu"));
    const mobile = container.querySelector(".navbar__mobile");
    expect(mobile.textContent).toContain("About Us");
  });
});
