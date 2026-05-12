import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AboutPage from "../AboutPage";
import { ABOUT } from "../../../services/contentService";

const setup = () =>
  render(<MemoryRouter><AboutPage /></MemoryRouter>);

// ── Hero ────────────────────────────────────────────────

describe("AboutPage — hero", () => {
  it("renders the page eyebrow", () => {
    setup();
    expect(screen.getByText("About Us")).toBeInTheDocument();
  });

  it("renders the main headline", () => {
    setup();
    expect(screen.getByRole("heading", { level: 1, name: ABOUT.headline })).toBeInTheDocument();
  });

  it("renders the subheadline", () => {
    setup();
    expect(screen.getByText(ABOUT.subheadline)).toBeInTheDocument();
  });

  it("renders a hero image from picsum", () => {
    const { container } = setup();
    const img = container.querySelector(".about-hero__img");
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toContain("picsum.photos");
  });
});

// ── Story ───────────────────────────────────────────────

describe("AboutPage — story", () => {
  it("renders the 'Our story' section label", () => {
    setup();
    expect(screen.getByText("Our story")).toBeInTheDocument();
  });

  it("renders all story paragraphs", () => {
    setup();
    ABOUT.story.forEach((para) =>
      expect(screen.getByText(para)).toBeInTheDocument()
    );
  });

  it("renders the split image", () => {
    const { container } = setup();
    const img = container.querySelector(".about-story__img");
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toContain("picsum.photos");
  });

  it("'Work with us' CTA links to /appointment", () => {
    setup();
    expect(screen.getByRole("link", { name: /work with us/i }))
      .toHaveAttribute("href", "/appointment");
  });
});

// ── Values ──────────────────────────────────────────────

describe("AboutPage — values", () => {
  it("renders the 'Our values' heading", () => {
    setup();
    expect(screen.getByText("Our values")).toBeInTheDocument();
  });

  it("renders all value titles", () => {
    setup();
    ABOUT.values.forEach(({ title }) =>
      expect(screen.getByText(title)).toBeInTheDocument()
    );
  });

  it("renders all value descriptions", () => {
    setup();
    ABOUT.values.forEach(({ desc }) =>
      expect(screen.getByText(desc)).toBeInTheDocument()
    );
  });

  it("renders the correct number of value cards", () => {
    const { container } = setup();
    expect(container.querySelectorAll(".about-value-card")).toHaveLength(
      ABOUT.values.length
    );
  });

  it("value cards are numbered sequentially", () => {
    const { container } = setup();
    const nums = [...container.querySelectorAll(".about-value-card__num")].map(
      (el) => el.textContent.trim()
    );
    expect(nums).toEqual(["01", "02", "03", "04"]);
  });
});

// ── Team ────────────────────────────────────────────────

describe("AboutPage — team", () => {
  it("renders the 'Who we are' heading", () => {
    setup();
    expect(screen.getByText("Who we are")).toBeInTheDocument();
  });

  it("renders all team member names", () => {
    setup();
    ABOUT.team.forEach(({ name }) =>
      expect(screen.getByText(name)).toBeInTheDocument()
    );
  });

  it("renders all team member roles", () => {
    setup();
    ABOUT.team.forEach(({ role }) =>
      expect(screen.getByText(role)).toBeInTheDocument()
    );
  });

  it("renders all team member bios", () => {
    setup();
    ABOUT.team.forEach(({ bio }) =>
      expect(screen.getByText(bio)).toBeInTheDocument()
    );
  });

  it("renders the correct number of team cards", () => {
    const { container } = setup();
    expect(container.querySelectorAll(".about-team-card")).toHaveLength(
      ABOUT.team.length
    );
  });

  it("team photos are lazy loaded and from picsum", () => {
    const { container } = setup();
    container.querySelectorAll(".about-team-card__img").forEach((img) => {
      expect(img).toHaveAttribute("loading", "lazy");
      expect(img.getAttribute("src")).toContain("picsum.photos");
    });
  });
});

// ── CTA band ────────────────────────────────────────────

describe("AboutPage — CTA band", () => {
  it("renders the CTA heading", () => {
    setup();
    expect(screen.getByText(/Let's build something together/i)).toBeInTheDocument();
  });

  it("'Set an Appointment' button links to /appointment", () => {
    setup();
    const links = screen.getAllByRole("link", { name: /Set an Appointment/i });
    expect(links.length).toBeGreaterThan(0);
    links.forEach((l) => expect(l).toHaveAttribute("href", "/appointment"));
  });
});
