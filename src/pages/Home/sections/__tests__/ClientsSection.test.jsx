import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ClientsSection from "../ClientsSection";
import { CLIENTS, STATS } from "../../../../services/contentService";

const setup = () =>
  render(<MemoryRouter><ClientsSection /></MemoryRouter>);

describe("ClientsSection", () => {
  it("renders section with id='clients'", () => {
    const { container } = setup();
    expect(container.querySelector("#clients")).toBeInTheDocument();
  });

  it("renders the section label", () => {
    setup();
    expect(screen.getByText(/03 \/ Clients/i)).toBeInTheDocument();
  });

  it("renders all client names", () => {
    setup();
    CLIENTS.forEach(({ name }) => expect(screen.getByText(name)).toBeInTheDocument());
  });

  it("renders the correct number of client cards", () => {
    const { container } = setup();
    expect(container.querySelectorAll(".client-card")).toHaveLength(CLIENTS.length);
  });

  it("every card is an anchor element (entire card is a link)", () => {
    const { container } = setup();
    container.querySelectorAll(".client-card").forEach((card) => {
      expect(card.tagName).toBe("A");
    });
  });

  it("each card links to /clients/:slug", () => {
    const { container } = setup();
    const cards = container.querySelectorAll(".client-card");
    cards.forEach((card, i) => {
      expect(card).toHaveAttribute("href", `/clients/${CLIENTS[i].slug}`);
    });
  });

  it("each card has a descriptive aria-label", () => {
    setup();
    CLIENTS.forEach(({ name }) => {
      expect(
        screen.getByRole("link", { name: new RegExp(`View case study for ${name}`, "i") })
      ).toBeInTheDocument();
    });
  });

  it("renders industry labels on each card", () => {
    setup();
    CLIENTS.forEach(({ industry }) =>
      expect(screen.getByText(industry)).toBeInTheDocument()
    );
  });

  it("logos are lazy loaded and from picsum", () => {
    const { container } = setup();
    container.querySelectorAll(".client-card__logo").forEach((logo) => {
      expect(logo).toHaveAttribute("loading", "lazy");
      expect(logo.getAttribute("src")).toContain("picsum.photos");
    });
  });

  it("renders all stat numbers", () => {
    setup();
    STATS.forEach(({ num }) => expect(screen.getByText(num)).toBeInTheDocument());
  });

  it("renders all stat labels", () => {
    setup();
    STATS.forEach(({ label }) => expect(screen.getByText(label)).toBeInTheDocument());
  });
});
