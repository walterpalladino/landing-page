import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ClientDetailPage from "../ClientDetailPage";
import { CLIENTS } from "../../../services/contentService";

const setup = (slug) =>
  render(
    <MemoryRouter initialEntries={[`/clients/${slug}`]}>
      <Routes>
        <Route path="/clients/:slug" element={<ClientDetailPage />} />
      </Routes>
    </MemoryRouter>
  );

const FIRST = CLIENTS[0]; // apex-industries

// ── Valid slug ──────────────────────────────────────────

describe("ClientDetailPage — valid slug", () => {
  it("renders the client name as the hero h1", () => {
    setup(FIRST.slug);
    expect(screen.getByRole("heading", { level: 1, name: FIRST.name })).toBeInTheDocument();
  });

  it("renders the industry label", () => {
    setup(FIRST.slug);
    expect(screen.getAllByText(FIRST.industry).length).toBeGreaterThan(0);
  });

  it("renders the tagline", () => {
    setup(FIRST.slug);
    expect(screen.getByText(FIRST.tagline)).toBeInTheDocument();
  });

  it("renders the overview text", () => {
    setup(FIRST.slug);
    expect(screen.getByText(FIRST.overview)).toBeInTheDocument();
  });

  it("renders all service tags", () => {
    setup(FIRST.slug);
    FIRST.services.forEach((s) =>
      expect(screen.getByText(s)).toBeInTheDocument()
    );
  });

  it("renders all stat numbers", () => {
    setup(FIRST.slug);
    FIRST.stats.forEach(({ num }) =>
      expect(screen.getByText(num)).toBeInTheDocument()
    );
  });

  it("renders all stat labels", () => {
    setup(FIRST.slug);
    FIRST.stats.forEach(({ label }) =>
      expect(screen.getByText(label)).toBeInTheDocument()
    );
  });

  it("renders the testimonial quote", () => {
    setup(FIRST.slug);
    expect(
      screen.getByText(`\u201c${FIRST.testimonial.quote}\u201d`)
    ).toBeInTheDocument();
  });

  it("renders the testimonial author", () => {
    setup(FIRST.slug);
    expect(screen.getByText(FIRST.testimonial.author)).toBeInTheDocument();
  });

  it("renders the testimonial role", () => {
    setup(FIRST.slug);
    expect(screen.getByText(FIRST.testimonial.role)).toBeInTheDocument();
  });

  it("renders all gallery images with lazy loading", () => {
    const { container } = setup(FIRST.slug);
    const imgs = container.querySelectorAll(".cli-gallery__item img");
    expect(imgs).toHaveLength(FIRST.imageGallery.length);
    imgs.forEach((img) => expect(img).toHaveAttribute("loading", "lazy"));
  });

  it("renders all deliverables", () => {
    setup(FIRST.slug);
    FIRST.deliverables.forEach((d) =>
      expect(screen.getByText(d)).toBeInTheDocument()
    );
  });

  it("renders exactly 3 related client cards", () => {
    const { container } = setup(FIRST.slug);
    expect(container.querySelectorAll(".cli-related-card")).toHaveLength(3);
  });

  it("does not include the current client in related cards", () => {
    setup(FIRST.slug);
    const relatedNames = screen
      .getAllByText(FIRST.name)
      .filter((el) => el.closest(".cli-related-card"));
    expect(relatedNames).toHaveLength(0);
  });

  it("all related cards link to /clients/:slug", () => {
    const { container } = setup(FIRST.slug);
    container.querySelectorAll(".cli-related-card").forEach((card) => {
      expect(card.getAttribute("href")).toMatch(/^\/clients\//);
    });
  });

  it("'Start your project' button links to /appointment", () => {
    setup(FIRST.slug);
    expect(screen.getByRole("link", { name: /start your project/i }))
      .toHaveAttribute("href", "/appointment");
  });

  it("'Set an Appointment' CTA links to /appointment", () => {
    setup(FIRST.slug);
    const links = screen.getAllByRole("link", { name: /Set an Appointment/i });
    links.forEach((l) => expect(l).toHaveAttribute("href", "/appointment"));
  });

  it("renders a Back button", () => {
    setup(FIRST.slug);
    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
  });

  it("hero image comes from picsum", () => {
    const { container } = setup(FIRST.slug);
    expect(container.querySelector(".cli-hero__img").getAttribute("src"))
      .toContain("picsum.photos");
  });
});

// ── Every slug renders ──────────────────────────────────

describe("ClientDetailPage — every client slug renders", () => {
  CLIENTS.forEach(({ slug, name }) => {
    it(`renders correctly for slug "${slug}"`, () => {
      setup(slug);
      expect(screen.getByRole("heading", { level: 1, name })).toBeInTheDocument();
    });
  });
});

// ── 404 fallback ────────────────────────────────────────

describe("ClientDetailPage — 404 fallback", () => {
  it("shows not-found message for an unknown slug", () => {
    setup("unknown-client");
    expect(screen.getByText(/Client not found/i)).toBeInTheDocument();
  });

  it("shows a link back to clients on 404", () => {
    setup("unknown-client");
    expect(screen.getByRole("link", { name: /back to clients/i })).toBeInTheDocument();
  });

  it("404 link points to /#clients", () => {
    setup("unknown-client");
    expect(screen.getByRole("link", { name: /back to clients/i }))
      .toHaveAttribute("href", "/#clients");
  });
});
