import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AppointmentPage from "../AppointmentPage";

const setup = () =>
  render(
    <MemoryRouter>
      <AppointmentPage />
    </MemoryRouter>
  );

// ── Layout & static content ─────────────────────────────

describe("AppointmentPage — layout", () => {
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
});

// ── Form fields ─────────────────────────────────────────

describe("AppointmentPage — form fields", () => {
  it("renders all text inputs", () => {
    setup();
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
  });

  it("renders the TimeSlotPicker grid", () => {
    const { container } = setup();
    expect(container.querySelector(".tsp__grid")).toBeInTheDocument();
  });

  it("renders the TimeSlotPicker Cancel button", () => {
    setup();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("email input has type email", () => {
    setup();
    expect(screen.getByLabelText("Email Address")).toHaveAttribute("type", "email");
  });

  it("phone input has type tel", () => {
    setup();
    expect(screen.getByLabelText("Phone Number")).toHaveAttribute("type", "tel");
  });

  it("Send Request button is disabled before a slot is selected", () => {
    setup();
    expect(screen.getByRole("button", { name: /send request/i })).toBeDisabled();
  });
});

// ── Controlled inputs ───────────────────────────────────

describe("AppointmentPage — controlled inputs", () => {
  it("updates First Name on input", async () => {
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByLabelText("First Name"), "Jane");
    expect(screen.getByLabelText("First Name")).toHaveValue("Jane");
  });

  it("updates Email on input", async () => {
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByLabelText("Email Address"), "jane@example.com");
    expect(screen.getByLabelText("Email Address")).toHaveValue("jane@example.com");
  });
});

// ── Slot selection & submission ─────────────────────────

describe("AppointmentPage — slot selection", () => {
  it("enables Send Request after a slot is selected", () => {
    const { container } = setup();
    const cell = container.querySelector(".tsp__cell--available");
    fireEvent.click(cell);
    // Click Confirm in the picker
    fireEvent.click(screen.getByRole("button", { name: /confirm slot/i }));
    expect(screen.getByRole("button", { name: /send request/i })).not.toBeDisabled();
  });

  it("shows slot confirmation text after selecting", () => {
    const { container } = setup();
    fireEvent.click(container.querySelector(".tsp__cell--available"));
    fireEvent.click(screen.getByRole("button", { name: /confirm slot/i }));
    expect(container.querySelector(".appt-page__slot-confirm")).toBeInTheDocument();
  });

  it("clears slot confirmation when Cancel is clicked", () => {
    const { container } = setup();
    fireEvent.click(container.querySelector(".tsp__cell--available"));
    fireEvent.click(screen.getByRole("button", { name: /confirm slot/i }));
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(container.querySelector(".appt-page__slot-confirm")).not.toBeInTheDocument();
  });
});

// ── Submission & success ────────────────────────────────

describe("AppointmentPage — submission", () => {
  const fillAndSubmit = async () => {
    const user = userEvent.setup();
    const { container } = setup();

    await user.type(screen.getByLabelText("First Name"), "Jane");
    await user.type(screen.getByLabelText("Last Name"), "Doe");
    await user.type(screen.getByLabelText("Email Address"), "jane@example.com");

    // Select a slot and confirm it
    fireEvent.click(container.querySelector(".tsp__cell--available"));
    fireEvent.click(screen.getByRole("button", { name: /confirm slot/i }));

    // Submit
    fireEvent.submit(
      screen.getByRole("button", { name: /send request/i }).closest("form")
    );

    return { container };
  };

  it("shows success message after form submission", async () => {
    await fillAndSubmit();
    await waitFor(() =>
      expect(screen.getByText(/Appointment request sent!/i)).toBeInTheDocument()
    );
  });

  it("includes the user's first name in the success message", async () => {
    await fillAndSubmit();
    await waitFor(() => expect(screen.getByText("Jane")).toBeInTheDocument());
  });

  it("hides the form after submission", async () => {
    await fillAndSubmit();
    await waitFor(() =>
      expect(screen.queryByLabelText("First Name")).not.toBeInTheDocument()
    );
  });

  it("shows 'Book another' in success state", async () => {
    await fillAndSubmit();
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /book another/i })).toBeInTheDocument()
    );
  });

  it("resets the form when 'Book another' is clicked", async () => {
    const user = userEvent.setup();
    await fillAndSubmit();
    await waitFor(() => screen.getByRole("button", { name: /book another/i }));
    await user.click(screen.getByRole("button", { name: /book another/i }));
    expect(screen.getByLabelText("First Name")).toHaveValue("");
  });
});
