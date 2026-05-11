import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ServicesSection from "../ServicesSection";
import { SERVICES } from "../../../../services/contentService";

const setup = () =>
  render(<MemoryRouter><ServicesSection /></MemoryRouter>);

describe("ServicesSection", () => {
  it("renders section with id='services'", () => {
    const { container } = setup();
    expect(container.querySelector("#services")).toBeInTheDocument();
  });

  it("renders the section label", () => {
    setup();
    expect(screen.getByText(/02 \/ Services/i)).toBeInTheDocument();
  });

  it("renders all service titles", () => {
    setup();
    SERVICES.forEach(({ title }) => expect(screen.getByText(title)).toBeInTheDocument());
  });

  it("renders the correct number of service cards", () => {
    const { container } = setup();
    expect(container.querySelectorAll(".service-card")).toHaveLength(SERVICES.length);
  });

  it("renders all service descriptions", () => {
    setup();
    SERVICES.forEach(({ description }) =>
      expect(screen.getByText(description)).toBeInTheDocument()
    );
  });

  it("images are lazy loaded and use picsum", () => {
    const { container } = setup();
    container.querySelectorAll(".service-card__img").forEach((img) => {
      expect(img).toHaveAttribute("loading", "lazy");
      expect(img.getAttribute("src")).toContain("picsum.photos");
    });
  });

  it("each 'Learn more' link navigates to /services/:slug", () => {
    setup();
    const links = screen.getAllByRole("link", { name: /learn more/i });
    expect(links).toHaveLength(SERVICES.length);
    links.forEach((link, i) => {
      expect(link).toHaveAttribute("href", `/services/${SERVICES[i].slug}`);
    });
  });

  it("'Learn more' links have descriptive aria-labels", () => {
    setup();
    SERVICES.forEach(({ title }) => {
      expect(
        screen.getByRole("link", { name: new RegExp(`learn more about ${title}`, "i") })
      ).toBeInTheDocument();
    });
  });
});
