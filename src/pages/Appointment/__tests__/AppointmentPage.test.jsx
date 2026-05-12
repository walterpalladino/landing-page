import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AppointmentPage from "../AppointmentPage";

// ── Mock the service so page tests don't wait on timers ──
vi.mock("../../../services/appointmentService", () => ({
  getAvailableDates: vi.fn(),
}));

import { getAvailableDates } from "../../../services/appointmentService";

const MOCK_DATES = [
  { date: "2030-06-09", label: "Monday, June 9",   slots: ["09:00", "10:00", "14:00"] },
  { date: "2030-06-10", label: "Tuesday, June 10", slots: ["09:00", "15:00"]          },
];

const setup = () =>
  render(<MemoryRouter><AppointmentPage /></MemoryRouter>);

beforeEach(() => {
  getAvailableDates.mockResolvedValue(MOCK_DATES);
});

afterEach(() => {
  vi.clearAllMocks();
});

// ── Loading state ───────────────────────────────────────

describe("AppointmentPage — loading state", () => {
  it("shows a loading indicator while slots are being fetched", () => {
    // Don't resolve yet — leave the promise pending
    getAvailableDates.mockReturnValue(new Promise(() => {}));
    setup();
    expect(screen.getByText(/Loading available slots/i)).toBeInTheDocument();
  });

  it("does not show the picker while loading", () => {
    getAvailableDates.mockReturnValue(new Promise(() => {}));
    const { container } = setup();
    expect(container.querySelector(".tsp__grid")).not.toBeInTheDocument();
  });
});

// ── Error state ─────────────────────────────────────────

describe("AppointmentPage — error state", () => {
  it("shows an error message when the fetch fails", async () => {
    getAvailableDates.mockRejectedValueOnce(new Error("Network error"));
    setup();
    await waitFor(() =>
      expect(screen.getByText(/Could not load available slots/i)).toBeInTheDocument()
    );
  });

  it("shows a Retry button on error", async () => {
    getAvailableDates.mockRejectedValueOnce(new Error("fail"));
    setup();
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument()
    );
  });

  it("re-fetches when Retry is clicked", async () => {
    getAvailableDates
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValueOnce(MOCK_DATES);

    setup();
    await waitFor(() => screen.getByRole("button", { name: /retry/i }));
    fireEvent.click(screen.getByRole("button", { name: /retry/i }));

    await waitFor(() =>
      expect(screen.queryByText(/Could not load/i)).not.toBeInTheDocument()
    );
  });
});

// ── Ready state — layout ────────────────────────────────

describe("AppointmentPage — ready state layout", () => {
  it("renders the page eyebrow", async () => {
    setup();
    await waitFor(() => expect(screen.getByText(/Set an Appointment/i)).toBeInTheDocument());
  });

  it("renders the page title", async () => {
    setup();
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: /Book a session/i })).toBeInTheDocument()
    );
  });

  it("renders the TimeSlotPicker grid after data loads", async () => {
    const { container } = setup();
    await waitFor(() =>
      expect(container.querySelector(".tsp__grid")).toBeInTheDocument()
    );
  });

  it("renders all form fields", async () => {
    setup();
    await waitFor(() => expect(screen.getByLabelText("First Name")).toBeInTheDocument());
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
  });

  it("Send Request button is disabled before a slot is selected", async () => {
    setup();
    await waitFor(() => expect(screen.getByLabelText("First Name")).toBeInTheDocument());
    expect(screen.getByRole("button", { name: /send request/i })).toBeDisabled();
  });
});

// ── Slot interaction ────────────────────────────────────

describe("AppointmentPage — slot selection", () => {
  it("enables Send Request after selecting and confirming a slot", async () => {
    const { container } = setup();
    await waitFor(() => container.querySelector(".tsp__cell--available"));

    fireEvent.click(container.querySelector(".tsp__cell--available"));
    fireEvent.click(screen.getByRole("button", { name: /confirm slot/i }));

    expect(screen.getByRole("button", { name: /send request/i })).not.toBeDisabled();
  });

  it("shows slot confirmation text after selecting", async () => {
    const { container } = setup();
    await waitFor(() => container.querySelector(".tsp__cell--available"));

    fireEvent.click(container.querySelector(".tsp__cell--available"));
    fireEvent.click(screen.getByRole("button", { name: /confirm slot/i }));

    expect(container.querySelector(".appt-page__slot-confirm")).toBeInTheDocument();
  });

  it("clears slot confirmation on Cancel", async () => {
    const { container } = setup();
    await waitFor(() => container.querySelector(".tsp__cell--available"));

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

    await waitFor(() => screen.getByLabelText("First Name"));

    await user.type(screen.getByLabelText("First Name"), "Jane");
    await user.type(screen.getByLabelText("Last Name"), "Doe");
    await user.type(screen.getByLabelText("Email Address"), "jane@example.com");

    await waitFor(() => container.querySelector(".tsp__cell--available"));
    fireEvent.click(container.querySelector(".tsp__cell--available"));
    fireEvent.click(screen.getByRole("button", { name: /confirm slot/i }));

    fireEvent.submit(
      screen.getByRole("button", { name: /send request/i }).closest("form")
    );

    return { container };
  };

  it("shows success message after submission", async () => {
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

  it("shows 'Book another' button in success state", async () => {
    await fillAndSubmit();
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /book another/i })).toBeInTheDocument()
    );
  });

  it("resets to empty form when 'Book another' is clicked", async () => {
    const user = userEvent.setup();
    await fillAndSubmit();
    await waitFor(() => screen.getByRole("button", { name: /book another/i }));
    await user.click(screen.getByRole("button", { name: /book another/i }));
    await waitFor(() =>
      expect(screen.getByLabelText("First Name")).toHaveValue("")
    );
  });
});
