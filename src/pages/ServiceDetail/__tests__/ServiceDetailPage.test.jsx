import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ServiceDetailPage from "../ServiceDetailPage";
import { SERVICES } from "../../../services/contentService";

/** Renders the page under a given slug path. */
const setup = (slug) =>
  render(
    <MemoryRouter initialEntries={[`/services/${slug}`]}>
      <Routes>
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
      </Routes>
    </MemoryRouter>
  );

const FIRST = SERVICES[0]; // brand-strategy

describe("ServiceDetailPage — valid slug", () => {
  it("renders the service title in the hero", () => {
    setup(FIRST.slug);
    expect(screen.getByRole("heading", { level: 1, name: FIRST.title })).toBeInTheDocument();
  });

  it("renders the service tagline", () => {
    setup(FIRST.slug);
    expect(screen.getByText(FIRST.tagline)).toBeInTheDocument();
  });

  it("renders the long description", () => {
    setup(FIRST.slug);
    expect(screen.getByText(FIRST.longDescription)).toBeInTheDocument();
  });

  it("renders all highlights", () => {
    setup(FIRST.slug);
    FIRST.highlights.forEach((h) => expect(screen.getByText(h)).toBeInTheDocument());
  });

  it("renders the correct number of deliverable cards", () => {
    const { container } = setup(FIRST.slug);
    expect(container.querySelectorAll(".svc-deliverable-card")).toHaveLength(
      FIRST.deliverables.length
    );
  });

  it("renders each deliverable label and description", () => {
    setup(FIRST.slug);
    FIRST.deliverables.forEach(({ label, desc }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
      expect(screen.getByText(desc)).toBeInTheDocument();
    });
  });

  it("renders gallery images with lazy loading", () => {
    const { container } = setup(FIRST.slug);
    const imgs = container.querySelectorAll(".svc-gallery__item img");
    expect(imgs).toHaveLength(FIRST.imageGallery.length);
    imgs.forEach((img) => expect(img).toHaveAttribute("loading", "lazy"));
  });

  it("renders exactly 3 related service cards", () => {
    const { container } = setup(FIRST.slug);
    expect(container.querySelectorAll(".svc-related-card")).toHaveLength(3);
  });

  it("does not include the current service in related cards", () => {
    setup(FIRST.slug);
    // The current service title should appear only in the hero h1, not in related cards
    const relatedTitles = screen
      .getAllByText(FIRST.title)
      .filter((el) => el.closest(".svc-related-card"));
    expect(relatedTitles).toHaveLength(0);
  });

  it("all related card links navigate to /services/<slug>", () => {
    const { container } = setup(FIRST.slug);
    container.querySelectorAll(".svc-related-card").forEach((card) => {
      expect(card.getAttribute("href")).toMatch(/^\/services\//);
    });
  });

  it("'Book a consultation' button links to /appointment", () => {
    setup(FIRST.slug);
    const link = screen.getByRole("link", { name: /book a consultation/i });
    expect(link).toHaveAttribute("href", "/appointment");
  });

  it("'Set an Appointment' CTA button links to /appointment", () => {
    setup(FIRST.slug);
    const links = screen.getAllByRole("link", { name: /Set an Appointment/i });
    expect(links.length).toBeGreaterThan(0);
    links.forEach((l) => expect(l).toHaveAttribute("href", "/appointment"));
  });

  it("renders a Back button in the hero", () => {
    setup(FIRST.slug);
    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
  });

  it("renders the hero banner image from picsum", () => {
    const { container } = setup(FIRST.slug);
    const hero = container.querySelector(".svc-hero__img");
    expect(hero).toBeInTheDocument();
    expect(hero.getAttribute("src")).toContain("picsum.photos");
  });
});

describe("ServiceDetailPage — every service slug renders", () => {
  SERVICES.forEach(({ slug, title }) => {
    it(`renders correctly for slug "${slug}"`, () => {
      setup(slug);
      expect(screen.getByRole("heading", { level: 1, name: title })).toBeInTheDocument();
    });
  });
});

describe("ServiceDetailPage — 404 fallback", () => {
  it("shows not-found message for an unknown slug", () => {
    setup("unknown-service");
    expect(screen.getByText(/Service not found/i)).toBeInTheDocument();
  });

  it("shows a link back to services on 404", () => {
    setup("unknown-service");
    expect(screen.getByRole("link", { name: /back to services/i })).toBeInTheDocument();
  });
});
