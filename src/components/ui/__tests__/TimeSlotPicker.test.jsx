import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TimeSlotPicker from "../TimeSlotPicker";

const DATES = [
  {
    date:   "2030-06-09",
    label:  "Monday, June 9",
    slots:  ["09:00", "10:00", "14:00"],
  },
  {
    date:   "2030-06-10",
    label:  "Tuesday, June 10",
    slots:  ["09:00", "15:00"],
  },
  {
    date:   "2030-06-11",
    label:  "Wednesday, June 11",
    slots:  ["10:00", "14:00", "16:00"],
  },
];

const setup = (props = {}) =>
  render(
    <TimeSlotPicker
      availableDates={DATES}
      onSelect={vi.fn()}
      onCancel={vi.fn()}
      {...props}
    />
  );

// ── Layout & structure ──────────────────────────────────

describe("TimeSlotPicker — layout", () => {
  it("renders the grid container", () => {
    const { container } = setup();
    expect(container.querySelector(".tsp__grid")).toBeInTheDocument();
  });

  it("renders a column header for each date", () => {
    const { container } = setup();
    const headers = container.querySelectorAll(".tsp__col-header");
    expect(headers).toHaveLength(DATES.length);
  });

  it("renders the day-name, day-number, and month for each header", () => {
    const { container } = setup();
    const headers = container.querySelectorAll(".tsp__col-header");
    // Verify structure is present and non-empty for every header
    headers.forEach((h) => {
      expect(h.querySelector(".tsp__col-header-day").textContent).toMatch(/^[A-Z]{3}$/);
      expect(h.querySelector(".tsp__col-header-num").textContent).toMatch(/^\d+$/);
      expect(h.querySelector(".tsp__col-header-month").textContent).toMatch(/^[A-Z]{3}$/);
    });
    // The day number for the first date (9th) should always be "9"
    expect(headers[0].querySelector(".tsp__col-header-num").textContent).toBe("9");
  });

  it("renders a row label for each unique time slot", () => {
    const { container } = setup();
    const labels = container.querySelectorAll(".tsp__row-label");
    const allUnique = [...new Set(DATES.flatMap((d) => d.slots))].sort();
    expect(labels).toHaveLength(allUnique.length);
  });

  it("labels match the unique slots sorted", () => {
    const { container } = setup();
    const labels = [...container.querySelectorAll(".tsp__row-label")].map(
      (el) => el.textContent.trim()
    );
    const expected = [...new Set(DATES.flatMap((d) => d.slots))].sort();
    expect(labels).toEqual(expected);
  });

  it("renders the Cancel button", () => {
    setup();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("renders the Select/Confirm button", () => {
    setup();
    expect(screen.getByRole("button", { name: /select a slot/i })).toBeInTheDocument();
  });
});

// ── Available vs unavailable cells ─────────────────────

describe("TimeSlotPicker — cell states", () => {
  it("marks cells as available when the slot exists for that date", () => {
    const { container } = setup();
    const available = container.querySelectorAll(".tsp__cell--available");
    // Total available = 3 + 2 + 3 = 8
    expect(available.length).toBe(8);
  });

  it("marks cells as unavailable when the slot is not offered on that date", () => {
    const { container } = setup();
    const unavailable = container.querySelectorAll(".tsp__cell--unavailable");
    // Unique slots = 09:00 10:00 14:00 15:00 16:00 → 5 × 3 columns = 15 total − 8 available = 7
    expect(unavailable.length).toBe(7);
  });

  it("unavailable cells have aria-disabled=true", () => {
    const { container } = setup();
    container.querySelectorAll(".tsp__cell--unavailable").forEach((cell) => {
      expect(cell).toHaveAttribute("aria-disabled", "true");
    });
  });

  it("available cells have aria-disabled=false", () => {
    const { container } = setup();
    container.querySelectorAll(".tsp__cell--available").forEach((cell) => {
      expect(cell).toHaveAttribute("aria-disabled", "false");
    });
  });
});

// ── Selection ───────────────────────────────────────────

describe("TimeSlotPicker — selection", () => {
  it("clicking an available cell selects it", () => {
    const { container } = setup();
    const first = container.querySelector(".tsp__cell--available");
    fireEvent.click(first);
    expect(first).toHaveClass("tsp__cell--selected");
  });

  it("only one cell is selected at a time", () => {
    const { container } = setup();
    const cells = container.querySelectorAll(".tsp__cell--available");
    fireEvent.click(cells[0]);
    fireEvent.click(cells[1]);
    const selected = container.querySelectorAll(".tsp__cell--selected");
    expect(selected).toHaveLength(1);
  });

  it("clicking the same cell twice deselects it", () => {
    const { container } = setup();
    const cell = container.querySelector(".tsp__cell--available");
    fireEvent.click(cell);
    expect(cell).toHaveClass("tsp__cell--selected");
    fireEvent.click(cell);
    expect(cell).not.toHaveClass("tsp__cell--selected");
  });

  it("clicking an unavailable cell does not select it", () => {
    const { container } = setup();
    const unavailable = container.querySelector(".tsp__cell--unavailable");
    fireEvent.click(unavailable);
    expect(unavailable).not.toHaveClass("tsp__cell--selected");
  });

  it("shows selection hint text when a slot is selected", () => {
    const { container } = setup();
    const cell = container.querySelector(".tsp__cell--available");
    fireEvent.click(cell);
    expect(container.querySelector(".tsp__selection-hint")).toBeInTheDocument();
  });

  it("hides selection hint when nothing is selected", () => {
    const { container } = setup();
    expect(container.querySelector(".tsp__selection-hint")).not.toBeInTheDocument();
  });

  it("selected cell has aria-selected=true", () => {
    const { container } = setup();
    const cell = container.querySelector(".tsp__cell--available");
    fireEvent.click(cell);
    expect(cell).toHaveAttribute("aria-selected", "true");
  });

  it("unselected available cells have aria-selected=false", () => {
    const { container } = setup();
    const cells = container.querySelectorAll(".tsp__cell--available");
    cells.forEach((cell) =>
      expect(cell).toHaveAttribute("aria-selected", "false")
    );
  });

  it("Enter key selects an available cell", () => {
    const { container } = setup();
    const cell = container.querySelector(".tsp__cell--available");
    fireEvent.keyDown(cell, { key: "Enter" });
    expect(cell).toHaveClass("tsp__cell--selected");
  });

  it("Space key selects an available cell", () => {
    const { container } = setup();
    const cell = container.querySelector(".tsp__cell--available");
    fireEvent.keyDown(cell, { key: " " });
    expect(cell).toHaveClass("tsp__cell--selected");
  });
});

// ── Confirm button ──────────────────────────────────────

describe("TimeSlotPicker — Confirm button", () => {
  it("Confirm button is disabled when no slot is selected", () => {
    setup();
    expect(screen.getByRole("button", { name: /select a slot/i })).toBeDisabled();
  });

  it("Confirm button is enabled after selecting a slot", () => {
    const { container } = setup();
    fireEvent.click(container.querySelector(".tsp__cell--available"));
    expect(
      screen.getByRole("button", { name: /confirm slot/i })
    ).not.toBeDisabled();
  });

  it("calls onSelect with { date, slot } when confirmed", () => {
    const onSelect = vi.fn();
    const { container } = render(
      <TimeSlotPicker availableDates={DATES} onSelect={onSelect} onCancel={vi.fn()} />
    );
    fireEvent.click(container.querySelector(".tsp__cell--available"));
    fireEvent.click(screen.getByRole("button", { name: /confirm slot/i }));
    expect(onSelect).toHaveBeenCalledOnce();
    const arg = onSelect.mock.calls[0][0];
    expect(arg).toHaveProperty("date");
    expect(arg).toHaveProperty("slot");
  });
});

// ── Cancel button ───────────────────────────────────────

describe("TimeSlotPicker — Cancel button", () => {
  it("calls onCancel when Cancel is clicked", () => {
    const onCancel = vi.fn();
    render(
      <TimeSlotPicker availableDates={DATES} onSelect={vi.fn()} onCancel={onCancel} />
    );
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("clears the selection when Cancel is clicked", () => {
    const { container } = setup();
    const cell = container.querySelector(".tsp__cell--available");
    fireEvent.click(cell);
    expect(cell).toHaveClass("tsp__cell--selected");
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(cell).not.toHaveClass("tsp__cell--selected");
  });
});

// ── Empty state ─────────────────────────────────────────

describe("TimeSlotPicker — empty state", () => {
  it("renders the empty state when no dates are provided", () => {
    render(<TimeSlotPicker availableDates={[]} onSelect={vi.fn()} onCancel={vi.fn()} />);
    expect(screen.getByText(/No available dates/i)).toBeInTheDocument();
  });

  it("does not render the grid when dates are empty", () => {
    const { container } = render(
      <TimeSlotPicker availableDates={[]} onSelect={vi.fn()} onCancel={vi.fn()} />
    );
    expect(container.querySelector(".tsp__grid")).not.toBeInTheDocument();
  });
});
