import { describe, it, expect, vi, afterEach } from "vitest";
import {
  HOME_SECTIONS,
  NAV_LINKS, PAGE_LINKS, SERVICES, CLIENTS, SOCIAL_LINKS, STATS,
  ABOUT, getServiceBySlug, getActiveNavLinks,
} from "../contentService";

describe("HOME_SECTIONS", () => {
  it("exports HOME_SECTIONS as an object", () => {
    expect(typeof HOME_SECTIONS).toBe("object");
    expect(HOME_SECTIONS).not.toBeNull();
  });

  it("has entries for all four home sections", () => {
    expect(HOME_SECTIONS).toHaveProperty("hero");
    expect(HOME_SECTIONS).toHaveProperty("services");
    expect(HOME_SECTIONS).toHaveProperty("clients");
    expect(HOME_SECTIONS).toHaveProperty("contact");
  });

  it("every value is a boolean", () => {
    Object.values(HOME_SECTIONS).forEach((v) =>
      expect(typeof v).toBe("boolean")
    );
  });

  it("all sections are enabled by default", () => {
    Object.values(HOME_SECTIONS).forEach((v) => expect(v).toBe(true));
  });
});

describe("NAV_LINKS", () => {
  it("is a non-empty array", () => expect(NAV_LINKS.length).toBeGreaterThan(0));
  it("every entry has label, href (starting with #), and a section key", () => {
    NAV_LINKS.forEach((l) => {
      expect(l.label).toBeTruthy();
      expect(l.href).toMatch(/^#/);
      expect(l.section).toBeTruthy();
    });
  });
  it("each section key matches a HOME_SECTIONS key", () => {
    NAV_LINKS.forEach((l) => {
      expect(HOME_SECTIONS).toHaveProperty(l.section);
    });
  });
});

describe("getActiveNavLinks", () => {
  it("returns all links when every HOME_SECTIONS entry is true", () => {
    // All flags are true by default
    expect(getActiveNavLinks()).toHaveLength(NAV_LINKS.length);
  });

  it("excludes the Clients link when HOME_SECTIONS.clients is false", () => {
    HOME_SECTIONS.clients = false;
    const active = getActiveNavLinks();
    expect(active.some((l) => l.section === "clients")).toBe(false);
    HOME_SECTIONS.clients = true; // restore
  });

  it("excludes the Services link when HOME_SECTIONS.services is false", () => {
    HOME_SECTIONS.services = false;
    const active = getActiveNavLinks();
    expect(active.some((l) => l.section === "services")).toBe(false);
    HOME_SECTIONS.services = true;
  });

  it("excludes the Contact link when HOME_SECTIONS.contact is false", () => {
    HOME_SECTIONS.contact = false;
    const active = getActiveNavLinks();
    expect(active.some((l) => l.section === "contact")).toBe(false);
    HOME_SECTIONS.contact = true;
  });

  it("returns an empty array when all section flags are false", () => {
    HOME_SECTIONS.services = false;
    HOME_SECTIONS.clients  = false;
    HOME_SECTIONS.contact  = false;
    expect(getActiveNavLinks()).toHaveLength(0);
    HOME_SECTIONS.services = true;
    HOME_SECTIONS.clients  = true;
    HOME_SECTIONS.contact  = true;
  });

  it("always includes links that have no section key", () => {
    // Add a section-less link temporarily
    const extra = { label: "Blog", href: "#blog" };
    NAV_LINKS.push(extra);
    HOME_SECTIONS.services = false;
    HOME_SECTIONS.clients  = false;
    HOME_SECTIONS.contact  = false;
    const active = getActiveNavLinks();
    expect(active.some((l) => l.label === "Blog")).toBe(true);
    NAV_LINKS.pop();
    HOME_SECTIONS.services = true;
    HOME_SECTIONS.clients  = true;
    HOME_SECTIONS.contact  = true;
  });
});

describe("PAGE_LINKS", () => {
  it("is a non-empty array", () => expect(PAGE_LINKS.length).toBeGreaterThan(0));
  it("every entry has label and to starting with /", () => {
    PAGE_LINKS.forEach((l) => {
      expect(l.label).toBeTruthy();
      expect(l.to).toMatch(/^\//);
    });
  });
  it("includes an About Us entry pointing to /about", () => {
    expect(PAGE_LINKS.some((l) => l.to === "/about")).toBe(true);
  });
});

describe("ABOUT", () => {
  it("has headline, subheadline, image, and imageSplit", () => {
    expect(ABOUT.headline).toBeTruthy();
    expect(ABOUT.subheadline).toBeTruthy();
    expect(ABOUT.image).toContain("picsum.photos");
    expect(ABOUT.imageSplit).toContain("picsum.photos");
  });

  it("has at least one story paragraph", () => {
    expect(Array.isArray(ABOUT.story)).toBe(true);
    expect(ABOUT.story.length).toBeGreaterThan(0);
    ABOUT.story.forEach((p) => expect(typeof p).toBe("string"));
  });

  it("has at least 2 values, each with title and desc", () => {
    expect(ABOUT.values.length).toBeGreaterThanOrEqual(2);
    ABOUT.values.forEach((v) => {
      expect(v.title).toBeTruthy();
      expect(v.desc).toBeTruthy();
    });
  });

  it("has at least 1 team member with name, role, bio, and image", () => {
    expect(ABOUT.team.length).toBeGreaterThan(0);
    ABOUT.team.forEach((m) => {
      expect(m.name).toBeTruthy();
      expect(m.role).toBeTruthy();
      expect(m.bio).toBeTruthy();
      expect(m.image).toContain("picsum.photos");
    });
  });
});

describe("SERVICES", () => {
  it("contains exactly 6 services", () => expect(SERVICES).toHaveLength(6));

  it("every service has all required fields", () => {
    SERVICES.forEach((s) => {
      expect(s.id).toBeDefined();
      expect(s.slug).toBeTruthy();
      expect(s.title).toBeTruthy();
      expect(s.tagline).toBeTruthy();
      expect(s.description.length).toBeGreaterThan(10);
      expect(s.longDescription.length).toBeGreaterThan(20);
      expect(s.icon).toBeTruthy();
      expect(s.image).toContain("picsum.photos");
      expect(s.imageSplit).toContain("picsum.photos");
    });
  });

  it("every service has at least 4 highlights", () => {
    SERVICES.forEach((s) => expect(s.highlights.length).toBeGreaterThanOrEqual(4));
  });

  it("every service has exactly 4 deliverables", () => {
    SERVICES.forEach((s) => expect(s.deliverables).toHaveLength(4));
  });

  it("every deliverable has label and desc", () => {
    SERVICES.forEach((s) =>
      s.deliverables.forEach((d) => {
        expect(d.label).toBeTruthy();
        expect(d.desc).toBeTruthy();
      })
    );
  });

  it("every service has exactly 3 gallery images", () => {
    SERVICES.forEach((s) => expect(s.imageGallery).toHaveLength(3));
  });

  it("slugs are unique", () => {
    const slugs = SERVICES.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("ids are unique", () => {
    const ids = SERVICES.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("slugs contain only lowercase letters, digits, and hyphens", () => {
    SERVICES.forEach((s) => expect(s.slug).toMatch(/^[a-z0-9-]+$/));
  });
});

describe("getServiceBySlug", () => {
  it("returns the correct service for a known slug", () => {
    const svc = getServiceBySlug("brand-strategy");
    expect(svc).toBeDefined();
    expect(svc.title).toBe("Brand Strategy");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getServiceBySlug("does-not-exist")).toBeUndefined();
  });

  it("returns the right service for every slug in SERVICES", () => {
    SERVICES.forEach((s) => {
      const found = getServiceBySlug(s.slug);
      expect(found).toBeDefined();
      expect(found.id).toBe(s.id);
    });
  });
});

describe("CLIENTS", () => {
  it("contains exactly 8 clients", () => expect(CLIENTS).toHaveLength(8));
  it("every client has id, name, and picsum logo", () => {
    CLIENTS.forEach((c) => {
      expect(c.id).toBeDefined();
      expect(c.name).toBeTruthy();
      expect(c.logo).toContain("picsum.photos");
    });
  });
  it("client ids are unique", () => {
    const ids = CLIENTS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("SOCIAL_LINKS", () => {
  it("is a non-empty array", () => expect(SOCIAL_LINKS.length).toBeGreaterThan(0));
  it("every entry has label, href, and icon", () => {
    SOCIAL_LINKS.forEach((s) => {
      expect(s.label).toBeTruthy();
      expect(s.href).toBeTruthy();
      expect(s.icon).toBeTruthy();
    });
  });
});

describe("STATS", () => {
  it("contains exactly 4 stats", () => expect(STATS).toHaveLength(4));
  it("every stat has num and label", () => {
    STATS.forEach((s) => {
      expect(s.num).toBeTruthy();
      expect(s.label).toBeTruthy();
    });
  });
});
