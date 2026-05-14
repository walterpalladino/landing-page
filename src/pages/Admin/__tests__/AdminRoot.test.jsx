import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Mock useAuth at the path AdminRoot actually imports from
vi.mock("../../../hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from "../../../hooks/useAuth";
import AdminRoot from "../AdminRoot";

const UNAUTHENTICATED = {
  isAuthenticated: false,
  isLoading:       false,
  error:           null,
  login:           vi.fn(),
  logout:          vi.fn(),
};

const AUTHENTICATED = {
  ...UNAUTHENTICATED,
  isAuthenticated: true,
};

const setup = () =>
  render(<MemoryRouter><AdminRoot /></MemoryRouter>);

beforeEach(() => {
  useAuth.mockReturnValue(UNAUTHENTICATED);
});
afterEach(() => vi.clearAllMocks());

describe("AdminRoot — unauthenticated", () => {
  it("renders the LoginPage when not authenticated", () => {
    setup();
    expect(screen.getByRole("heading", { name: /Admin Access/i })).toBeInTheDocument();
  });

  it("does not render AdminPage when not authenticated", () => {
    setup();
    expect(screen.queryByText("Administration")).not.toBeInTheDocument();
  });

  it("passes isLoading to LoginPage", () => {
    useAuth.mockReturnValue({ ...UNAUTHENTICATED, isLoading: true });
    setup();
    expect(screen.getByText(/Signing in/i)).toBeInTheDocument();
  });

  it("passes error to LoginPage", () => {
    useAuth.mockReturnValue({ ...UNAUTHENTICATED, error: "Bad credentials." });
    setup();
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Bad credentials.")).toBeInTheDocument();
  });
});

describe("AdminRoot — authenticated", () => {
  it("renders AdminPage when authenticated", () => {
    useAuth.mockReturnValue(AUTHENTICATED);
    setup();
    expect(screen.getByText("Administration")).toBeInTheDocument();
  });

  it("does not render LoginPage when authenticated", () => {
    useAuth.mockReturnValue(AUTHENTICATED);
    setup();
    expect(screen.queryByRole("heading", { name: /Admin Access/i })).not.toBeInTheDocument();
  });

  it("passes logout to AdminPage", () => {
    const logout = vi.fn();
    useAuth.mockReturnValue({ ...AUTHENTICATED, logout });
    setup();
    // AdminPage renders a Sign out button
    expect(screen.getByRole("button", { name: /sign out/i })).toBeInTheDocument();
  });
});
