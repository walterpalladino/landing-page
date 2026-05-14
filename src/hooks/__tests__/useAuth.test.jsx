import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAuth } from "../useAuth";

vi.mock("../../services/authService", () => ({
  AUTH_SESSION_KEY: "meridian_admin_auth",
  validateCredentials: vi.fn(),
}));

import { validateCredentials } from "../../services/authService";

const VALID   = { username: "admin", password: "meridian2024" };
const INVALID = { username: "wrong", password: "wrong"        };

beforeEach(() => {
  sessionStorage.clear();
  validateCredentials.mockReset();
});
afterEach(() => {
  sessionStorage.clear();
  vi.clearAllMocks();
});

describe("useAuth — initial state", () => {
  it("starts unauthenticated when sessionStorage is empty", () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.isAuthenticated).toBe(false);
  });

  it("starts authenticated when sessionStorage has the auth flag", () => {
    sessionStorage.setItem("meridian_admin_auth", "true");
    const { result } = renderHook(() => useAuth());
    expect(result.current.isAuthenticated).toBe(true);
  });

  it("starts with isLoading false", () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.isLoading).toBe(false);
  });

  it("starts with error null", () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.error).toBeNull();
  });

  it("exposes login and logout functions", () => {
    const { result } = renderHook(() => useAuth());
    expect(typeof result.current.login).toBe("function");
    expect(typeof result.current.logout).toBe("function");
  });
});

describe("useAuth — successful login", () => {
  it("sets isAuthenticated to true after a successful login", async () => {
    validateCredentials.mockResolvedValueOnce({ success: true });
    const { result } = renderHook(() => useAuth());
    await act(async () => { await result.current.login(VALID); });
    expect(result.current.isAuthenticated).toBe(true);
  });

  it("persists auth flag in sessionStorage", async () => {
    validateCredentials.mockResolvedValueOnce({ success: true });
    const { result } = renderHook(() => useAuth());
    await act(async () => { await result.current.login(VALID); });
    expect(sessionStorage.getItem("meridian_admin_auth")).toBe("true");
  });

  it("clears error on successful login", async () => {
    validateCredentials.mockResolvedValueOnce({ success: true });
    const { result } = renderHook(() => useAuth());
    await act(async () => { await result.current.login(VALID); });
    expect(result.current.error).toBeNull();
  });

  it("sets isLoading to false after login completes", async () => {
    validateCredentials.mockResolvedValueOnce({ success: true });
    const { result } = renderHook(() => useAuth());
    await act(async () => { await result.current.login(VALID); });
    expect(result.current.isLoading).toBe(false);
  });
});

describe("useAuth — failed login", () => {
  it("keeps isAuthenticated false on failure", async () => {
    validateCredentials.mockResolvedValueOnce({ success: false, error: "Invalid credentials." });
    const { result } = renderHook(() => useAuth());
    await act(async () => { await result.current.login(INVALID); });
    expect(result.current.isAuthenticated).toBe(false);
  });

  it("sets error message on failure", async () => {
    validateCredentials.mockResolvedValueOnce({ success: false, error: "Invalid credentials." });
    const { result } = renderHook(() => useAuth());
    await act(async () => { await result.current.login(INVALID); });
    expect(result.current.error).toBe("Invalid credentials.");
  });

  it("sets error on service exception", async () => {
    validateCredentials.mockRejectedValueOnce(new Error("Network error"));
    const { result } = renderHook(() => useAuth());
    await act(async () => { await result.current.login(VALID); });
    expect(result.current.error).toBeTruthy();
    expect(result.current.isAuthenticated).toBe(false);
  });
});

describe("useAuth — logout", () => {
  it("clears isAuthenticated on logout", async () => {
    validateCredentials.mockResolvedValueOnce({ success: true });
    const { result } = renderHook(() => useAuth());
    await act(async () => { await result.current.login(VALID); });
    act(() => result.current.logout());
    expect(result.current.isAuthenticated).toBe(false);
  });

  it("removes sessionStorage flag on logout", async () => {
    validateCredentials.mockResolvedValueOnce({ success: true });
    const { result } = renderHook(() => useAuth());
    await act(async () => { await result.current.login(VALID); });
    act(() => result.current.logout());
    expect(sessionStorage.getItem("meridian_admin_auth")).toBeNull();
  });

  it("clears error on logout", async () => {
    validateCredentials.mockResolvedValueOnce({ success: false, error: "Bad credentials." });
    const { result } = renderHook(() => useAuth());
    await act(async () => { await result.current.login(INVALID); });
    act(() => result.current.logout());
    expect(result.current.error).toBeNull();
  });
});
