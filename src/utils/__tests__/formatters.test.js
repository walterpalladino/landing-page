import { describe, it, expect } from "vitest";
import { toTitleCase, currentYear } from "../formatters";

describe("toTitleCase", () => {
  it("capitalises every word",         () => expect(toTitleCase("hello world")).toBe("Hello World"));
  it("handles single word",            () => expect(toTitleCase("foo")).toBe("Foo"));
  it("leaves already-cased unchanged", () => expect(toTitleCase("Hello World")).toBe("Hello World"));
});

describe("currentYear", () => {
  it("returns a four-digit number",    () => expect(currentYear()).toBeGreaterThan(2020));
  it("matches the real current year",  () => expect(currentYear()).toBe(new Date().getFullYear()));
});
