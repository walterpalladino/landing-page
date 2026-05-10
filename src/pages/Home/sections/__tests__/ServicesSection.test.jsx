import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ServicesSection from "../ServicesSection";
import { SERVICES } from "../../../../services/contentService";

describe("ServicesSection", () => {
  it("renders section with id='services'", () => {
    const { container } = render(<ServicesSection />);
    expect(container.querySelector("#services")).toBeInTheDocument();
  });

  it("renders the section label", () => {
    render(<ServicesSection />);
    expect(screen.getByText(/02 \/ Services/i)).toBeInTheDocument();
  });

  it("renders all service titles", () => {
    render(<ServicesSection />);
    SERVICES.forEach(({ title }) => expect(screen.getByText(title)).toBeInTheDocument());
  });

  it("renders correct number of cards", () => {
    const { container } = render(<ServicesSection />);
    expect(container.querySelectorAll(".service-card")).toHaveLength(SERVICES.length);
  });

  it("renders all descriptions", () => {
    render(<ServicesSection />);
    SERVICES.forEach(({ description }) => expect(screen.getByText(description)).toBeInTheDocument());
  });

  it("images use picsum and are lazy loaded", () => {
    const { container } = render(<ServicesSection />);
    container.querySelectorAll(".service-card__img").forEach(img => {
      expect(img.getAttribute("src")).toContain("picsum.photos");
      expect(img).toHaveAttribute("loading", "lazy");
    });
  });

  it("renders a 'Learn more' link per card", () => {
    render(<ServicesSection />);
    expect(screen.getAllByText(/learn more/i)).toHaveLength(SERVICES.length);
  });
});
