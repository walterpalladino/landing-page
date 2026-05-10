import { describe, it, expect } from "vitest";
import { NAV_LINKS, SERVICES, CLIENTS, SOCIAL_LINKS, STATS } from "../contentService";

describe("NAV_LINKS", () => {
  it("is a non-empty array", () => expect(NAV_LINKS.length).toBeGreaterThan(0));
  it("every entry has label and href starting with #", () => {
    NAV_LINKS.forEach(l => {
      expect(l.label).toBeTruthy();
      expect(l.href).toMatch(/^#/);
    });
  });
});

describe("SERVICES", () => {
  it("contains exactly 6 items", () => expect(SERVICES).toHaveLength(6));
  it("every service has required fields", () => {
    SERVICES.forEach(s => {
      expect(s.id).toBeDefined();
      expect(s.title).toBeTruthy();
      expect(s.description.length).toBeGreaterThan(10);
      expect(s.icon).toBeTruthy();
      expect(s.image).toContain("picsum.photos");
    });
  });
  it("ids are unique", () => {
    const ids = SERVICES.map(s => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("CLIENTS", () => {
  it("contains exactly 8 items", () => expect(CLIENTS).toHaveLength(8));
  it("every client has id, name, and picsum logo", () => {
    CLIENTS.forEach(c => {
      expect(c.id).toBeDefined();
      expect(c.name).toBeTruthy();
      expect(c.logo).toContain("picsum.photos");
    });
  });
  it("ids are unique", () => {
    const ids = CLIENTS.map(c => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("SOCIAL_LINKS", () => {
  it("is a non-empty array", () => expect(SOCIAL_LINKS.length).toBeGreaterThan(0));
  it("every entry has label, href, and icon", () => {
    SOCIAL_LINKS.forEach(s => {
      expect(s.label).toBeTruthy();
      expect(s.href).toBeTruthy();
      expect(s.icon).toBeTruthy();
    });
  });
});

describe("STATS", () => {
  it("contains exactly 4 stats", () => expect(STATS).toHaveLength(4));
  it("every stat has num and label", () => {
    STATS.forEach(s => {
      expect(s.num).toBeTruthy();
      expect(s.label).toBeTruthy();
    });
  });
});
