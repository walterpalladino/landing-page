import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ClientsSection from "../ClientsSection";
import { CLIENTS, STATS } from "../../../../services/contentService";

describe("ClientsSection", () => {
  it("renders section with id='clients'", () => {
    const { container } = render(<ClientsSection />);
    expect(container.querySelector("#clients")).toBeInTheDocument();
  });

  it("renders the section label", () => {
    render(<ClientsSection />);
    expect(screen.getByText(/03 \/ Clients/i)).toBeInTheDocument();
  });

  it("renders all client names", () => {
    render(<ClientsSection />);
    CLIENTS.forEach(({ name }) => expect(screen.getByText(name)).toBeInTheDocument());
  });

  it("renders correct number of client cards", () => {
    const { container } = render(<ClientsSection />);
    expect(container.querySelectorAll(".client-card")).toHaveLength(CLIENTS.length);
  });

  it("logos are lazy loaded and from picsum", () => {
    const { container } = render(<ClientsSection />);
    container.querySelectorAll(".client-card__logo").forEach(logo => {
      expect(logo).toHaveAttribute("loading", "lazy");
      expect(logo.getAttribute("src")).toContain("picsum.photos");
    });
  });

  it("renders all stat numbers", () => {
    render(<ClientsSection />);
    STATS.forEach(({ num }) => expect(screen.getByText(num)).toBeInTheDocument());
  });

  it("renders all stat labels", () => {
    render(<ClientsSection />);
    STATS.forEach(({ label }) => expect(screen.getByText(label)).toBeInTheDocument());
  });
});
