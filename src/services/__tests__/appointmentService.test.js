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

  it("returns different subsets for different dates", () => {
    const a = computeAvailableSlots("2030-06-09", ALL_TIME_SLOTS);
    const b = computeAvailableSlots("2030-06-10", ALL_TIME_SLOTS);
    expect(JSON.stringify(a)).not.toBe(JSON.stringify(b));
  });

  it("returns an empty array when no candidate slots provided", () => {
    expect(computeAvailableSlots("2030-06-10", [])).toEqual([]);
  });
});

// ── buildAvailableDates ─────────────────────────────────

// 2030-01-07 is a Monday — fixed anchor so tests never depend on today's date.
const FIXED_FROM = new Date("2030-01-07T12:00:00");

describe("buildAvailableDates", () => {
  it("returns the default count of 5 dates", () => {
    expect(buildAvailableDates({ from: FIXED_FROM })).toHaveLength(5);
  });

  it("honours a custom count", () => {
    expect(buildAvailableDates({ count: 3, from: FIXED_FROM })).toHaveLength(3);
  });

  it("every returned date has the required shape", () => {
    buildAvailableDates({ from: FIXED_FROM }).forEach((d) => {
      expect(d).toHaveProperty("date");
      expect(d).toHaveProperty("label");
      expect(d).toHaveProperty("slots");
      expect(d.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(typeof d.label).toBe("string");
      expect(Array.isArray(d.slots)).toBe(true);
    });
  });

  it("skips weekends — no date falls on Saturday or Sunday", () => {
    // Span 10 weekdays from a known Monday to cover at least 2 weekends
    buildAvailableDates({ count: 10, from: FIXED_FROM }).forEach((d) => {
      // Parse at noon local time to avoid UTC midnight boundary shift
      const dow = new Date(d.date + "T12:00:00").getDay();
      expect(dow).not.toBe(0); // Sunday
      expect(dow).not.toBe(6); // Saturday
    });
  });

  it("all dates are strictly after the from date", () => {
    buildAvailableDates({ from: FIXED_FROM }).forEach((d) => {
      expect(new Date(d.date + "T12:00:00") > FIXED_FROM).toBe(true);
    });
  });

  it("dates are in ascending chronological order", () => {
    const dates = buildAvailableDates({ from: FIXED_FROM }).map((d) => d.date);
    expect(dates).toEqual([...dates].sort());
  });

  it("uses custom slots when provided", () => {
    const custom = ["10:00", "15:00"];
    buildAvailableDates({ slots: custom, from: FIXED_FROM }).forEach((d) => {
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
    expect(await promise).toEqual({ success: true });
  });

  it("rejects when firstName is missing", async () => {
    const promise = submitAppointment({ ...VALID, firstName: "" });
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
