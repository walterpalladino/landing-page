import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { validateCredentials, AUTH_SESSION_KEY } from "../authService";

describe("validateCredentials", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("resolves with success:true for correct credentials", async () => {
    const promise = validateCredentials({ username: "admin", password: "meridian2024" });
    await vi.runAllTimersAsync();
    expect(await promise).toEqual({ success: true });
  });

  it("resolves with success:false for wrong password", async () => {
    const promise = validateCredentials({ username: "admin", password: "wrong" });
    await vi.runAllTimersAsync();
    const result = await promise;
    expect(result.success).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it("resolves with success:false for wrong username", async () => {
    const promise = validateCredentials({ username: "hacker", password: "meridian2024" });
    await vi.runAllTimersAsync();
    const result = await promise;
    expect(result.success).toBe(false);
  });

  it("resolves with success:false for empty credentials", async () => {
    const promise = validateCredentials({ username: "", password: "" });
    await vi.runAllTimersAsync();
    expect((await promise).success).toBe(false);
  });

  it("returns an error message on failure", async () => {
    const promise = validateCredentials({ username: "x", password: "y" });
    await vi.runAllTimersAsync();
    const result = await promise;
    expect(typeof result.error).toBe("string");
    expect(result.error.length).toBeGreaterThan(0);
  });
});

describe("AUTH_SESSION_KEY", () => {
  it("is a non-empty string", () => {
    expect(typeof AUTH_SESSION_KEY).toBe("string");
    expect(AUTH_SESSION_KEY.length).toBeGreaterThan(0);
  });
});
