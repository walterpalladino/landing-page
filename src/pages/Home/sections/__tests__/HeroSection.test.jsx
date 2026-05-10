import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HeroSection from "../HeroSection";

const setup = () =>
  render(<MemoryRouter><HeroSection /></MemoryRouter>);

describe("HeroSection", () => {
  it("renders the hero section element", () => {
    const { container } = setup();
    expect(container.querySelector(".hero")).toBeInTheDocument();
  });

  it("renders the eyebrow copy", () => {
    setup();
    expect(screen.getByText(/Creative Studio/i)).toBeInTheDocument();
  });

  it("renders the headline", () => {
    setup();
    expect(screen.getByText(/We craft/i)).toBeInTheDocument();
    expect(screen.getByText("experiences")).toBeInTheDocument();
    expect(screen.getByText(/that last/i)).toBeInTheDocument();
  });

  it("renders the sub-headline", () => {
    setup();
    expect(screen.getByText(/Strategy\. Design\. Technology\./i)).toBeInTheDocument();
  });

  it("'Our Work' CTA scrolls to #services", () => {
    setup();
    expect(screen.getByRole("link", { name: /our work/i }))
      .toHaveAttribute("href", "#services");
  });

  it("'Set an Appointment' CTA links to /appointment", () => {
    setup();
    expect(screen.getByRole("link", { name: /Set an Appointment/i }))
      .toHaveAttribute("href", "/appointment");
  });

  it("background image src contains picsum.photos", () => {
    const { container } = setup();
    expect(container.querySelector(".hero__img").getAttribute("src"))
      .toContain("picsum.photos");
  });

  it("renders the scroll hint", () => {
    setup();
    expect(screen.getByText("Scroll")).toBeInTheDocument();
  });

  it("headline has fade-up animation class", () => {
    setup();
    expect(screen.getByText(/We craft/i).closest("h1")).toHaveClass("fade-up");
  });
});
