import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../HomePage";

// We re-import the module fresh in each mock so vi.mock works cleanly
const setup = () =>
  render(<MemoryRouter><HomePage /></MemoryRouter>);

afterEach(() => {
  vi.resetModules();
  vi.restoreAllMocks();
});

// ── Default (all sections enabled) ─────────────────────

describe("HomePage — all sections enabled (default)", () => {
  it("renders a <main> landmark", () => {
    setup();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders the hero section", () => {
    const { container } = setup();
    expect(container.querySelector(".hero")).toBeInTheDocument();
  });

  it("renders the services section", () => {
    const { container } = setup();
    expect(container.querySelector("#services")).toBeInTheDocument();
  });

  it("renders the clients section", () => {
    const { container } = setup();
    expect(container.querySelector("#clients")).toBeInTheDocument();
  });

  it("renders the contact section", () => {
    const { container } = setup();
    expect(container.querySelector("#contact")).toBeInTheDocument();
  });
});

// ── Individual sections can be disabled ─────────────────

describe("HomePage — hero disabled", () => {
  it("hides the hero when HOME_SECTIONS.hero is false", async () => {
    vi.doMock("../../../services/contentService", async (importOriginal) => ({
      ...(await importOriginal()),
      HOME_SECTIONS: { hero: false, services: true, clients: true, contact: true },
    }));
    const { default: HomePageMocked } = await import("../HomePage");
    const { container } = render(<MemoryRouter><HomePageMocked /></MemoryRouter>);
    expect(container.querySelector(".hero")).not.toBeInTheDocument();
    expect(container.querySelector("#services")).toBeInTheDocument();
  });
});

describe("HomePage — services disabled", () => {
  it("hides the services section when HOME_SECTIONS.services is false", async () => {
    vi.doMock("../../../services/contentService", async (importOriginal) => ({
      ...(await importOriginal()),
      HOME_SECTIONS: { hero: true, services: false, clients: true, contact: true },
    }));
    const { default: HomePageMocked } = await import("../HomePage");
    const { container } = render(<MemoryRouter><HomePageMocked /></MemoryRouter>);
    expect(container.querySelector("#services")).not.toBeInTheDocument();
    expect(container.querySelector(".hero")).toBeInTheDocument();
  });
});

describe("HomePage — clients disabled", () => {
  it("hides the clients section when HOME_SECTIONS.clients is false", async () => {
    vi.doMock("../../../services/contentService", async (importOriginal) => ({
      ...(await importOriginal()),
      HOME_SECTIONS: { hero: true, services: true, clients: false, contact: true },
    }));
    const { default: HomePageMocked } = await import("../HomePage");
    const { container } = render(<MemoryRouter><HomePageMocked /></MemoryRouter>);
    expect(container.querySelector("#clients")).not.toBeInTheDocument();
    expect(container.querySelector("#services")).toBeInTheDocument();
  });
});

describe("HomePage — contact disabled", () => {
  it("hides the contact section when HOME_SECTIONS.contact is false", async () => {
    vi.doMock("../../../services/contentService", async (importOriginal) => ({
      ...(await importOriginal()),
      HOME_SECTIONS: { hero: true, services: true, clients: true, contact: false },
    }));
    const { default: HomePageMocked } = await import("../HomePage");
    const { container } = render(<MemoryRouter><HomePageMocked /></MemoryRouter>);
    expect(container.querySelector("#contact")).not.toBeInTheDocument();
    expect(container.querySelector("#clients")).toBeInTheDocument();
  });
});

describe("HomePage — all sections disabled", () => {
  it("renders only the <main> element when all sections are off", async () => {
    vi.doMock("../../../services/contentService", async (importOriginal) => ({
      ...(await importOriginal()),
      HOME_SECTIONS: { hero: false, services: false, clients: false, contact: false },
    }));
    const { default: HomePageMocked } = await import("../HomePage");
    const { container } = render(<MemoryRouter><HomePageMocked /></MemoryRouter>);
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(container.querySelector(".hero")).not.toBeInTheDocument();
    expect(container.querySelector("#services")).not.toBeInTheDocument();
    expect(container.querySelector("#clients")).not.toBeInTheDocument();
    expect(container.querySelector("#contact")).not.toBeInTheDocument();
  });
});
