import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

vi.mock("../../../../services/appointmentService", () => ({
  ALL_TIME_SLOTS: ["09:00", "09:30", "10:00"],
  buildAvailabilityWindow: vi.fn(() => [
    { date: "2030-06-09", label: "Monday, June 9",    isWeekend: false },
    { date: "2030-06-10", label: "Tuesday, June 10",  isWeekend: false },
    { date: "2030-06-14", label: "Saturday, June 14", isWeekend: true  },
  ]),
  getAvailabilityGrid: vi.fn(),
  saveAvailability:    vi.fn().mockResolvedValue({ success: true }),
  computeAvailableSlots: vi.fn(() => []),
  formatDateLabel:     vi.fn((iso) => iso),
}));

import { getAvailabilityGrid, saveAvailability } from "../../../../services/appointmentService";
import AvailabilityGrid from "../AvailabilityGrid";

const MOCK_GRID = {
  "2030-06-09": ["09:00", "10:00"],
  "2030-06-10": [],
  "2030-06-14": [],
};

beforeEach(() => {
  getAvailabilityGrid.mockResolvedValue(MOCK_GRID);
  saveAvailability.mockResolvedValue({ success: true });
});

/** Render and wait until the grid table is visible (loading is done). */
const setup = async () => {
  const utils = render(<AvailabilityGrid />);
  await waitFor(
    () => expect(utils.container.querySelector(".avail-grid__table")).toBeInTheDocument(),
    { timeout: 3000 }
  );
  return utils;
};

describe("AvailabilityGrid", () => {
  it("shows loading state before data resolves", () => {
    getAvailabilityGrid.mockReturnValue(new Promise(() => {}));
    render(<AvailabilityGrid />);
    expect(screen.getByText(/Loading availability/i)).toBeInTheDocument();
  });

  it("renders the grid table after loading", async () => {
    const { container } = await setup();
    expect(container.querySelector(".avail-grid__table")).toBeInTheDocument();
  });

  it("renders a column header per day", async () => {
    const { container } = await setup();
    expect(container.querySelectorAll(".avail-grid__col-header").length).toBe(3);
  });

  it("renders row labels for each time slot", async () => {
    const { container } = await setup();
    expect(container.querySelectorAll(".avail-grid__row-label").length).toBe(3);
  });

  it("renders the Save Changes button", async () => {
    await setup();
    expect(screen.getByRole("button", { name: /save changes/i })).toBeInTheDocument();
  });

  it("renders ON cells for enabled slots", async () => {
    const { container } = await setup();
    expect(container.querySelectorAll(".avail-grid__cell--on").length).toBeGreaterThan(0);
  });

  it("renders OFF cells for disabled slots", async () => {
    const { container } = await setup();
    expect(container.querySelectorAll(".avail-grid__cell--off").length).toBeGreaterThan(0);
  });

  it("renders weekend cells as disabled", async () => {
    const { container } = await setup();
    expect(container.querySelectorAll(".avail-grid__cell--weekend").length).toBeGreaterThan(0);
  });

  it("toggling an OFF cell turns it ON", async () => {
    const { container } = await setup();
    const offCell = container.querySelector(".avail-grid__cell--off");
    fireEvent.click(offCell);
    expect(offCell).toHaveClass("avail-grid__cell--on");
  });

  it("toggling an ON cell turns it OFF", async () => {
    const { container } = await setup();
    const onCell = container.querySelector(".avail-grid__cell--on");
    fireEvent.click(onCell);
    expect(onCell).toHaveClass("avail-grid__cell--off");
  });

  it("calls saveAvailability when Save Changes is clicked", async () => {
    await setup();
    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));
    await waitFor(() => expect(saveAvailability).toHaveBeenCalledOnce());
  });

  it("shows ✓ Saved after a successful save", async () => {
    await setup();
    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));
    await waitFor(() => expect(screen.getByText(/✓ Saved/)).toBeInTheDocument());
  });

  it("renders the legend with Available label", async () => {
    await setup();
    expect(screen.getByText(/Available/)).toBeInTheDocument();
  });

  it("renders the hint text", async () => {
    await setup();
    expect(screen.getByText(/Click a cell to toggle/i)).toBeInTheDocument();
  });
});
