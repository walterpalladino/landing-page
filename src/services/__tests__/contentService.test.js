import { describe, it, expect } from "vitest";
import {
  NAV_LINKS, SERVICES, CLIENTS, SOCIAL_LINKS, STATS, getServiceBySlug,
} from "../contentService";

describe("NAV_LINKS", () => {
  it("is a non-empty array", () => expect(NAV_LINKS.length).toBeGreaterThan(0));
  it("every entry has label and href starting with #", () => {
    NAV_LINKS.forEach((l) => {
      expect(l.label).toBeTruthy();
      expect(l.href).toMatch(/^#/);
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
