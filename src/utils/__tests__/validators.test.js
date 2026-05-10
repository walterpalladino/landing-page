import { describe, it, expect } from "vitest";
import { isValidEmail, isNonEmpty } from "../validators";

describe("isValidEmail", () => {
  it("accepts a standard email",  () => expect(isValidEmail("a@b.com")).toBe(true));
  it("accepts subdomain email",   () => expect(isValidEmail("x@y.co.uk")).toBe(true));
  it("rejects missing @",         () => expect(isValidEmail("notanemail")).toBe(false));
  it("rejects missing domain",    () => expect(isValidEmail("a@")).toBe(false));
  it("rejects empty string",      () => expect(isValidEmail("")).toBe(false));
});

describe("isNonEmpty", () => {
  it("returns true for a normal string",  () => expect(isNonEmpty("hello")).toBe(true));
  it("returns false for empty string",    () => expect(isNonEmpty("")).toBe(false));
  it("returns false for whitespace only", () => expect(isNonEmpty("   ")).toBe(false));
  it("returns false for non-string",      () => expect(isNonEmpty(null)).toBe(false));
});
