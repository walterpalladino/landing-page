import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  ALL_TIME_SLOTS,
  formatDateLabel,
  computeAvailableSlots,
  buildAvailableDates,
  getAvailableDates,
  submitAppointment,
} from "../appointmentService";

// ── ALL_TIME_SLOTS ──────────────────────────────────────

describe("ALL_TIME_SLOTS", () => {
  it("is a non-empty array of strings", () => {
    expect(Array.isArray(ALL_TIME_SLOTS)).toBe(true);
    expect(ALL_TIME_SLOTS.length).toBeGreaterThan(0);
  });

  it("every slot matches HH:MM format", () => {
    ALL_TIME_SLOTS.forEach((s) => expect(s).toMatch(/^\d{2}:\d{2}$/));
  });

  it("slots are in ascending order", () => {
    const sorted = [...ALL_TIME_SLOTS].sort();
    expect(ALL_TIME_SLOTS).toEqual(sorted);
  });
});

// ── formatDateLabel ─────────────────────────────────────

describe("formatDateLabel", () => {
  it("returns a non-empty string for a valid ISO date", () => {
    const label = formatDateLabel("2030-06-10");
    expect(typeof label).toBe("string");
    expect(label.length).toBeGreaterThan(0);
  });

  it("includes the day number in the label", () => {
    expect(formatDateLabel("2030-06-10")).toContain("10");
  });

  it("includes the month name in the label", () => {
    expect(formatDateLabel("2030-06-10")).toContain("June");
  });
});

// ── computeAvailableSlots ───────────────────────────────

describe("computeAvailableSlots", () => {
  it("returns a subset of the provided slots", () => {
    const result = computeAvailableSlots("2030-06-10", ALL_TIME_SLOTS);
    expect(result.length).toBeLessThanOrEqual(ALL_TIME_SLOTS.length);
    result.forEach((s) => expect(ALL_TIME_SLOTS).toContain(s));
  });

  it("returns different subsets for different dates (simulates real availability)", () => {
    const a = computeAvailableSlots("2030-06-09", ALL_TIME_SLOTS);
    const b = computeAvailableSlots("2030-06-10", ALL_TIME_SLOTS);
    // At least one must differ (their day-of-month differs by 1)
    const same = JSON.stringify(a) === JSON.stringify(b);
    expect(same).toBe(false);
  });

  it("returns an empty array when no candidate slots provided", () => {
    expect(computeAvailableSlots("2030-06-10", [])).toEqual([]);
  });
});

// ── buildAvailableDates ─────────────────────────────────

describe("buildAvailableDates", () => {
  it("returns the requested number of dates (default 5)", () => {
    expect(buildAvailableDates()).toHaveLength(5);
  });

  it("honours a custom count", () => {
    expect(buildAvailableDates({ count: 3 })).toHaveLength(3);
  });

  it("every returned date has the required shape", () => {
    buildAvailableDates().forEach((d) => {
      expect(d).toHaveProperty("date");
      expect(d).toHaveProperty("label");
      expect(d).toHaveProperty("slots");
      expect(d.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(typeof d.label).toBe("string");
      expect(Array.isArray(d.slots)).toBe(true);
    });
  });

  it("skips weekends — no date falls on Saturday or Sunday", () => {
    buildAvailableDates({ count: 10 }).forEach((d) => {
      const dow = new Date(d.date + "T00:00:00").getDay();
      expect(dow).not.toBe(0); // Sunday
      expect(dow).not.toBe(6); // Saturday
    });
  });

  it("all dates are after the `from` reference date", () => {
    const from = new Date("2030-01-01T00:00:00");
    buildAvailableDates({ from }).forEach((d) => {
      expect(new Date(d.date + "T00:00:00") > from).toBe(true);
    });
  });

  it("dates are in ascending (chronological) order", () => {
    const dates = buildAvailableDates().map((d) => d.date);
    const sorted = [...dates].sort();
    expect(dates).toEqual(sorted);
  });

  it("uses custom slots when provided", () => {
    const custom = ["10:00", "15:00"];
    buildAvailableDates({ slots: custom }).forEach((d) => {
      d.slots.forEach((s) => expect(custom).toContain(s));
    });
  });
});

// ── getAvailableDates ───────────────────────────────────

describe("getAvailableDates", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("resolves to an array of 5 dates", async () => {
    const promise = getAvailableDates();
    await vi.runAllTimersAsync();
    const result = await promise;
    expect(result).toHaveLength(5);
  });

  it("every resolved date has date, label, and slots", async () => {
    const promise = getAvailableDates();
    await vi.runAllTimersAsync();
    const result = await promise;
    result.forEach((d) => {
      expect(d).toHaveProperty("date");
      expect(d).toHaveProperty("label");
      expect(d).toHaveProperty("slots");
    });
  });
});

// ── submitAppointment ───────────────────────────────────

describe("submitAppointment", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  const VALID = {
    firstName: "Jane",
    lastName:  "Doe",
    email:     "jane@example.com",
    phone:     "+15550001234",
    slot:      { date: "2030-06-10", slot: "10:00" },
  };

  it("resolves with { success: true } for a valid payload", async () => {
    const promise = submitAppointment(VALID);
    await vi.runAllTimersAsync();
    const result = await promise;
    expect(result).toEqual({ success: true });
  });

  it("rejects when firstName is missing", async () => {
    const promise = submitAppointment({ ...VALID, firstName: "" });
    // Attach a no-op catch immediately so the rejection is always handled,
    // then advance timers and verify via expect().rejects
    promise.catch(() => {});
    await vi.runAllTimersAsync();
    await expect(promise).rejects.toThrow("Missing required fields");
  });

  it("rejects when email is missing", async () => {
    const promise = submitAppointment({ ...VALID, email: "" });
    promise.catch(() => {});
    await vi.runAllTimersAsync();
    await expect(promise).rejects.toThrow("Missing required fields");
  });

  it("rejects when slot is missing", async () => {
    const promise = submitAppointment({ ...VALID, slot: null });
    promise.catch(() => {});
    await vi.runAllTimersAsync();
    await expect(promise).rejects.toThrow("Missing required fields");
  });
});
