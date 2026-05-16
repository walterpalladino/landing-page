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

// ── Admin utilities ─────────────────────────────────────

import {
  toLocalISO,
  buildAvailabilityWindow,
  getAvailabilityGrid,
  saveAvailability,
  buildWeekDates,
  getAppointments,
} from "../appointmentService";

describe("toLocalISO", () => {
  it("returns a YYYY-MM-DD string", () => {
    const d = new Date("2030-06-10T12:00:00");
    expect(toLocalISO(d)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("returns 2030-06-10 for a June 10 date", () => {
    const d = new Date("2030-06-10T12:00:00");
    expect(toLocalISO(d)).toBe("2030-06-10");
  });
});

describe("buildAvailabilityWindow", () => {
  const MONDAY = new Date("2030-01-07T12:00:00");

  it("returns exactly 14 entries", () => {
    expect(buildAvailabilityWindow({ from: MONDAY })).toHaveLength(14);
  });

  it("every entry has date, label, isWeekend", () => {
    buildAvailabilityWindow({ from: MONDAY }).forEach((d) => {
      expect(d).toHaveProperty("date");
      expect(d).toHaveProperty("label");
      expect(d).toHaveProperty("isWeekend");
      expect(typeof d.isWeekend).toBe("boolean");
    });
  });

  it("marks Saturdays and Sundays as weekends", () => {
    buildAvailabilityWindow({ from: MONDAY }).forEach((d) => {
      const dow = new Date(d.date + "T12:00:00").getDay();
      if (dow === 0 || dow === 6) expect(d.isWeekend).toBe(true);
      else expect(d.isWeekend).toBe(false);
    });
  });

  it("dates are in ascending order", () => {
    const dates = buildAvailabilityWindow({ from: MONDAY }).map((d) => d.date);
    expect(dates).toEqual([...dates].sort());
  });
});

describe("buildWeekDates", () => {
  const WEDNESDAY = new Date("2030-01-09T12:00:00"); // Wed

  it("returns exactly 7 days", () => {
    expect(buildWeekDates(WEDNESDAY)).toHaveLength(7);
  });

  it("starts on Monday regardless of reference day", () => {
    const week = buildWeekDates(WEDNESDAY);
    expect(new Date(week[0].date + "T12:00:00").getDay()).toBe(1); // Monday
  });

  it("ends on Sunday", () => {
    const week = buildWeekDates(WEDNESDAY);
    expect(new Date(week[6].date + "T12:00:00").getDay()).toBe(0); // Sunday
  });

  it("marks Sat and Sun as weekend", () => {
    const week = buildWeekDates(WEDNESDAY);
    expect(week[5].isWeekend).toBe(true); // Saturday
    expect(week[6].isWeekend).toBe(true); // Sunday
  });

  it("dates are in ascending order", () => {
    const dates = buildWeekDates(WEDNESDAY).map((d) => d.date);
    expect(dates).toEqual([...dates].sort());
  });
});

describe("getAvailabilityGrid", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("resolves to an object with 14 keys", async () => {
    const p = getAvailabilityGrid();
    await vi.runAllTimersAsync();
    const grid = await p;
    expect(Object.keys(grid)).toHaveLength(14);
  });

  it("each key is a YYYY-MM-DD string", async () => {
    const p = getAvailabilityGrid();
    await vi.runAllTimersAsync();
    const grid = await p;
    Object.keys(grid).forEach((k) => expect(k).toMatch(/^\d{4}-\d{2}-\d{2}$/));
  });

  it("each value is an array of strings", async () => {
    const p = getAvailabilityGrid();
    await vi.runAllTimersAsync();
    const grid = await p;
    Object.values(grid).forEach((slots) => {
      expect(Array.isArray(slots)).toBe(true);
      slots.forEach((s) => expect(typeof s).toBe("string"));
    });
  });
});

describe("saveAvailability", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("resolves with { success: true }", async () => {
    const p = saveAvailability({ "2030-01-08": ["09:00", "10:00"] });
    await vi.runAllTimersAsync();
    expect(await p).toEqual({ success: true });
  });
});

describe("getAppointments", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("resolves to an array", async () => {
    const p = getAppointments(new Date("2030-01-07T12:00:00"));
    await vi.runAllTimersAsync();
    expect(Array.isArray(await p)).toBe(true);
  });

  it("every appointment has required fields", async () => {
    const p = getAppointments(new Date());
    await vi.runAllTimersAsync();
    const appts = await p;
    appts.forEach((a) => {
      expect(a).toHaveProperty("id");
      expect(a).toHaveProperty("date");
      expect(a).toHaveProperty("slot");
      expect(a).toHaveProperty("firstName");
      expect(a).toHaveProperty("lastName");
      expect(a).toHaveProperty("email");
      expect(a).toHaveProperty("status");
    });
  });
});
