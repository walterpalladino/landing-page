import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

const MOCK_WEEK = [
  { date: "2030-01-07", label: "Monday, January 7",    isWeekend: false },
  { date: "2030-01-08", label: "Tuesday, January 8",   isWeekend: false },
  { date: "2030-01-09", label: "Wednesday, January 9", isWeekend: false },
  { date: "2030-01-10", label: "Thursday, January 10", isWeekend: false },
  { date: "2030-01-11", label: "Friday, January 11",   isWeekend: false },
  { date: "2030-01-12", label: "Saturday, January 12", isWeekend: true  },
  { date: "2030-01-13", label: "Sunday, January 13",   isWeekend: true  },
];

const MOCK_APPTS = [
  { id: 1, date: "2030-01-07", slot: "09:00",
    firstName: "Alice", lastName: "Morgan",
    email: "alice@example.com", phone: "+1555", status: "confirmed" },
  { id: 2, date: "2030-01-08", slot: "14:00",
    firstName: "Bob",   lastName: "Chen",
    email: "bob@example.com",   phone: "+1556", status: "pending"   },
];

vi.mock("../../../../services/appointmentService", () => ({
  ALL_TIME_SLOTS:  ["09:00", "10:00", "14:00"],
  buildWeekDates:  vi.fn(() => MOCK_WEEK),
  getAppointments: vi.fn(),
  formatDateLabel: vi.fn((iso) => iso),
  toLocalISO:      vi.fn((d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }),
}));

import { getAppointments } from "../../../../services/appointmentService";
import AppointmentsGrid from "../AppointmentsGrid";

beforeEach(() => {
  vi.clearAllMocks();
  getAppointments.mockResolvedValue(MOCK_APPTS);
});

/** Render and wait until the grid table is visible. */
const setup = async () => {
  const utils = render(<AppointmentsGrid />);
  await waitFor(
    () => expect(utils.container.querySelector(".appts-grid__table")).toBeInTheDocument(),
    { timeout: 3000 }
  );
  return utils;
};

describe("AppointmentsGrid", () => {
  it("shows loading state before data resolves", () => {
    getAppointments.mockReturnValue(new Promise(() => {}));
    render(<AppointmentsGrid />);
    expect(screen.getByText(/Loading appointments/i)).toBeInTheDocument();
  });

  it("renders the grid table after loading", async () => {
    const { container } = await setup();
    expect(container.querySelector(".appts-grid__table")).toBeInTheDocument();
  });

  it("renders Prev and Next navigation buttons", async () => {
    await setup();
    expect(screen.getByRole("button", { name: /previous week/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next week/i })).toBeInTheDocument();
  });

  it("renders the Today button", async () => {
    await setup();
    expect(screen.getByRole("button", { name: /^today$/i })).toBeInTheDocument();
  });

  it("renders 5 weekday column headers", async () => {
    const { container } = await setup();
    expect(container.querySelectorAll(".appts-grid__col-header").length).toBe(5);
  });

  it("renders 2 booked cells", async () => {
    const { container } = await setup();
    expect(container.querySelectorAll(".appts-grid__cell--booked").length).toBe(2);
  });

  it("renders appointment name in booked cell", async () => {
    await setup();
    expect(screen.getByText(/Alice M\./i)).toBeInTheDocument();
  });

  it("renders free cells for unbooked slots", async () => {
    const { container } = await setup();
    expect(container.querySelectorAll(".appts-grid__cell--free").length).toBeGreaterThan(0);
  });

  it("clicking a booked cell opens the detail drawer", async () => {
    const { container } = await setup();
    fireEvent.click(container.querySelector(".appts-grid__cell--booked"));
    expect(screen.getByText("Appointment details")).toBeInTheDocument();
  });

  it("detail drawer shows the appointment email", async () => {
    const { container } = await setup();
    fireEvent.click(container.querySelector(".appts-grid__cell--booked"));
    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
  });

  it("closing the detail drawer removes it", async () => {
    const { container } = await setup();
    fireEvent.click(container.querySelector(".appts-grid__cell--booked"));
    fireEvent.click(screen.getByRole("button", { name: /close details/i }));
    expect(screen.queryByText("Appointment details")).not.toBeInTheDocument();
  });

  it("renders Confirmed and Pending legend entries", async () => {
    await setup();
    expect(screen.getByText(/Confirmed/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();
  });

  it("shows appointment count in toolbar", async () => {
    await setup();
    expect(screen.getByText(/2 appointments/i)).toBeInTheDocument();
  });

  it("clicking Prev week re-fetches appointments", async () => {
    await setup();
    // weekRef changes → useEffect fires → getAppointments called again
    fireEvent.click(screen.getByRole("button", { name: /previous week/i }));
    await waitFor(
      () => expect(getAppointments).toHaveBeenCalledTimes(2),
      { timeout: 4000 }
    );
  });

  it("clicking Next week re-fetches appointments", async () => {
    await setup();
    fireEvent.click(screen.getByRole("button", { name: /next week/i }));
    await waitFor(
      () => expect(getAppointments).toHaveBeenCalledTimes(2),
      { timeout: 4000 }
    );
  });

  it("clicking Today re-fetches appointments", async () => {
    await setup();
    fireEvent.click(screen.getByRole("button", { name: /^today$/i }));
    await waitFor(
      () => expect(getAppointments).toHaveBeenCalledTimes(2),
      { timeout: 4000 }
    );
  });
});
