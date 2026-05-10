import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AppointmentPage from "../AppointmentPage";

/** Renders the component wrapped in a router so useNavigate doesn't throw. */
const setup = () =>
  render(
    <MemoryRouter>
      <AppointmentPage />
    </MemoryRouter>
  );

describe("AppointmentPage", () => {
  // ── Layout & static content ──────────────────────────
  it("renders the page eyebrow", () => {
    setup();
    expect(screen.getByText(/Set an Appointment/i)).toBeInTheDocument();
  });

  it("renders the page title", () => {
    setup();
    expect(screen.getByRole("heading", { name: /Book a session/i })).toBeInTheDocument();
  });

  it("renders the aside headline", () => {
    setup();
    expect(screen.getByText(/Let's find/i)).toBeInTheDocument();
  });

  it("renders aside detail labels", () => {
    setup();
    expect(screen.getByText("Duration")).toBeInTheDocument();
    expect(screen.getByText("Format")).toBeInTheDocument();
    expect(screen.getByText("Confirmation")).toBeInTheDocument();
  });

  it("renders a Back button", () => {
    setup();
    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
  });

  // ── Form fields ──────────────────────────────────────
  it("renders all form fields", () => {
    setup();
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Preferred Date")).toBeInTheDocument();
  });

  it("email field has type email", () => {
    setup();
    expect(screen.getByLabelText("Email Address")).toHaveAttribute("type", "email");
  });

  it("phone field has type tel", () => {
    setup();
    expect(screen.getByLabelText("Phone Number")).toHaveAttribute("type", "tel");
  });

  it("date field has type date", () => {
    setup();
    expect(screen.getByLabelText("Preferred Date")).toHaveAttribute("type", "date");
  });

  it("renders the Send Request submit button", () => {
    setup();
    expect(screen.getByRole("button", { name: /send request/i })).toBeInTheDocument();
  });

  // ── Controlled inputs ────────────────────────────────
  it("updates First Name on input", async () => {
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByLabelText("First Name"), "Jane");
    expect(screen.getByLabelText("First Name")).toHaveValue("Jane");
  });

  it("updates Last Name on input", async () => {
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByLabelText("Last Name"), "Doe");
    expect(screen.getByLabelText("Last Name")).toHaveValue("Doe");
  });

  it("updates Email on input", async () => {
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByLabelText("Email Address"), "jane@example.com");
    expect(screen.getByLabelText("Email Address")).toHaveValue("jane@example.com");
  });

  it("updates Phone on input", async () => {
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByLabelText("Phone Number"), "+15550001234");
    expect(screen.getByLabelText("Phone Number")).toHaveValue("+15550001234");
  });

  it("updates Date on change", () => {
    setup();
    fireEvent.change(screen.getByLabelText("Preferred Date"), {
      target: { value: "2030-08-20" },
    });
    expect(screen.getByLabelText("Preferred Date")).toHaveValue("2030-08-20");
  });

  // ── Submission & success state ───────────────────────
  it("shows success message after submission", async () => {
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByLabelText("First Name"), "Jane");
    await user.type(screen.getByLabelText("Last Name"), "Doe");
    await user.type(screen.getByLabelText("Email Address"), "jane@example.com");
    fireEvent.change(screen.getByLabelText("Preferred Date"), {
      target: { value: "2030-08-20" },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: /send request/i }).closest("form")
    );
    await waitFor(() =>
      expect(screen.getByText(/Appointment request sent!/i)).toBeInTheDocument()
    );
  });

  it("shows the user's first name in the success message", async () => {
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByLabelText("First Name"), "Jane");
    await user.type(screen.getByLabelText("Email Address"), "jane@example.com");
    fireEvent.change(screen.getByLabelText("Preferred Date"), {
      target: { value: "2030-08-20" },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: /send request/i }).closest("form")
    );
    await waitFor(() => expect(screen.getByText("Jane")).toBeInTheDocument());
  });

  it("hides the form after successful submission", async () => {
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByLabelText("First Name"), "Jane");
    await user.type(screen.getByLabelText("Email Address"), "jane@example.com");
    fireEvent.change(screen.getByLabelText("Preferred Date"), {
      target: { value: "2030-08-20" },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: /send request/i }).closest("form")
    );
    await waitFor(() =>
      expect(screen.queryByLabelText("First Name")).not.toBeInTheDocument()
    );
  });

  it("shows 'Book another' button in success state", async () => {
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByLabelText("First Name"), "Jane");
    await user.type(screen.getByLabelText("Email Address"), "jane@example.com");
    fireEvent.change(screen.getByLabelText("Preferred Date"), {
      target: { value: "2030-08-20" },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: /send request/i }).closest("form")
    );
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /book another/i })).toBeInTheDocument()
    );
  });

  it("resets the form when 'Book another' is clicked", async () => {
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByLabelText("First Name"), "Jane");
    await user.type(screen.getByLabelText("Email Address"), "jane@example.com");
    fireEvent.change(screen.getByLabelText("Preferred Date"), {
      target: { value: "2030-08-20" },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: /send request/i }).closest("form")
    );
    await waitFor(() => screen.getByRole("button", { name: /book another/i }));
    await user.click(screen.getByRole("button", { name: /book another/i }));
    expect(screen.getByLabelText("First Name")).toHaveValue("");
  });
});
