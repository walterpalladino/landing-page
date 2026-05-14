import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "../LoginPage";

const setup = (props = {}) =>
  render(
    <LoginPage
      onLogin={vi.fn()}
      isLoading={false}
      error={null}
      {...props}
    />
  );

describe("LoginPage — layout", () => {
  it("renders the brand logo mark", () => {
    setup();
    expect(screen.getByText("◈")).toBeInTheDocument();
  });

  it("renders the brand name", () => {
    setup();
    expect(screen.getByText("MERIDIAN")).toBeInTheDocument();
  });

  it("renders the 'Admin Access' heading", () => {
    setup();
    expect(screen.getByRole("heading", { name: /Admin Access/i })).toBeInTheDocument();
  });

  it("renders username and password fields", () => {
    setup();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("password field has type=password", () => {
    setup();
    expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");
  });

  it("renders the Sign In button", () => {
    setup();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });
});

describe("LoginPage — button state", () => {
  it("submit button is disabled when fields are empty", () => {
    setup();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeDisabled();
  });

  it("submit button is enabled when both fields have values", async () => {
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByLabelText("Username"), "admin");
    await user.type(screen.getByLabelText("Password"), "pass");
    expect(screen.getByRole("button", { name: /sign in/i })).not.toBeDisabled();
  });

  it("submit button is disabled while loading", () => {
    setup({ isLoading: true });
    expect(screen.getByRole("button", { name: /signing in/i })).toBeDisabled();
  });

  it("shows 'Signing in…' text while loading", () => {
    setup({ isLoading: true });
    expect(screen.getByText(/Signing in/i)).toBeInTheDocument();
  });
});

describe("LoginPage — error display", () => {
  it("shows error message when error prop is set", () => {
    setup({ error: "Invalid username or password." });
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Invalid username or password.")).toBeInTheDocument();
  });

  it("does not show error when error prop is null", () => {
    setup();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});

describe("LoginPage — form submission", () => {
  it("calls onLogin with username and password on submit", async () => {
    const onLogin = vi.fn();
    const user = userEvent.setup();
    render(<LoginPage onLogin={onLogin} isLoading={false} error={null} />);

    await user.type(screen.getByLabelText("Username"), "admin");
    await user.type(screen.getByLabelText("Password"), "meridian2024");
    fireEvent.submit(screen.getByRole("button", { name: /sign in/i }).closest("form"));

    expect(onLogin).toHaveBeenCalledOnce();
    expect(onLogin).toHaveBeenCalledWith({
      username: "admin",
      password: "meridian2024",
    });
  });
});
