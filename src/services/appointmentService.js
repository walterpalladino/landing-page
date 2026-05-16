/**
 * appointmentService.js
 *
 * Centralises all appointment-related data access.
 * Currently uses local generation to simulate a real API.
 * To connect a real backend, replace the bodies of
 * `getAvailableDates` and `submitAppointment` — the rest of
 * the app never needs to change.
 */

/** All possible time slots offered each day. */
export const ALL_TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00",
  "14:00", "14:30", "15:00", "15:30", "16:00",
];

/** Number of weekdays to expose in the picker. */
const DAYS_AHEAD = 5;

/**
 * Returns a human-readable label for an ISO date string.
 * @param {string} iso  "YYYY-MM-DD"
 * @returns {string}    e.g. "Monday, June 9"
 */
export function formatDateLabel(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month:   "long",
    day:     "numeric",
  });
}

/**
 * Simulates per-day slot availability.
 * In a real integration this logic lives on the server.
 *
 * @param {string}   iso    "YYYY-MM-DD"
 * @param {string[]} slots  Full list of candidate time slots
 * @returns {string[]}      Subset of slots that are available on this date
 */
export function computeAvailableSlots(iso, slots) {
  const dayOfMonth = new Date(iso + "T00:00:00").getDate();
  return slots.filter((_, i) => (i + dayOfMonth) % 3 !== 0);
}

/**
 * Builds the next `count` available weekdays starting from tomorrow.
 *
 * @param {Object} [options]
 * @param {number} [options.count=DAYS_AHEAD]     How many weekdays to return
 * @param {string[]} [options.slots=ALL_TIME_SLOTS] Candidate time slots
 * @param {Date}   [options.from=new Date()]      Reference "today" date
 * @returns {{ date: string, label: string, slots: string[] }[]}
 */
export function buildAvailableDates({
  count  = DAYS_AHEAD,
  slots  = ALL_TIME_SLOTS,
  from   = new Date(),
} = {}) {
  const dates  = [];
  const cursor = new Date(from);
  cursor.setDate(cursor.getDate() + 1);           // start tomorrow
  cursor.setHours(12, 0, 0, 0);                   // noon — avoids UTC midnight shift

  while (dates.length < count) {
    const dow = cursor.getDay();
    if (dow !== 0 && dow !== 6) {                 // skip weekends
      // Pad month/day manually so we always get local date, not UTC date
      const y  = cursor.getFullYear();
      const m  = String(cursor.getMonth() + 1).padStart(2, "0");
      const d  = String(cursor.getDate()).padStart(2, "0");
      const iso = `${y}-${m}-${d}`;
      dates.push({
        date:  iso,
        label: formatDateLabel(iso),
        slots: computeAvailableSlots(iso, slots),
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

/**
 * Fetches available appointment dates and slots.
 *
 * Async so the signature is identical to what a real HTTP call
 * would look like — callers never need to change when you swap
 * the implementation.
 *
 * @returns {Promise<{ date: string, label: string, slots: string[] }[]>}
 */
export async function getAvailableDates() {
  // Simulate a brief network round-trip
  await new Promise((resolve) => setTimeout(resolve, 300));
  return buildAvailableDates();
}

/**
 * Submits an appointment request.
 *
 * @param {{ firstName: string, lastName: string, email: string, phone: string, slot: { date: string, slot: string } }} payload
 * @returns {Promise<{ success: boolean }>}
 */
export async function submitAppointment(payload) {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 400));

  // Basic validation — a real API would do this server-side
  if (!payload.firstName || !payload.email || !payload.slot) {
    throw new Error("Missing required fields.");
  }

  return { success: true };
}

// ─────────────────────────────────────────────────────────
// Admin-facing appointment utilities
// ─────────────────────────────────────────────────────────

/**
 * Returns a local ISO date string (YYYY-MM-DD) for a given Date, at noon
 * to avoid UTC boundary shifts.
 */
export function toLocalISO(date) {
  const d = new Date(date);
  d.setHours(12, 0, 0, 0);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Builds 14 calendar days (including weekends) starting from today
 * for the availability editor.
 *
 * @param {Date} [from=new Date()] Reference date
 * @returns {{ date: string, label: string, isWeekend: boolean }[]}
 */
export function buildAvailabilityWindow({ from = new Date() } = {}) {
  const days = [];
  const cursor = new Date(from);
  cursor.setHours(12, 0, 0, 0);

  for (let i = 0; i < 14; i++) {
    const iso = toLocalISO(cursor);
    const dow = cursor.getDay();
    days.push({
      date:      iso,
      label:     formatDateLabel(iso),
      isWeekend: dow === 0 || dow === 6,
    });
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

/**
 * Fetches the current admin-configured availability.
 * Returns a map: { "YYYY-MM-DD": Set<string> } of enabled slots.
 *
 * In production replace with a real API call.
 *
 * @returns {Promise<Record<string, string[]>>}
 */
export async function getAvailabilityGrid() {
  await new Promise((r) => setTimeout(r, 200));
  // Seed with the same simulated data as buildAvailableDates
  const window14 = buildAvailabilityWindow();
  const result = {};
  window14.forEach(({ date, isWeekend }) => {
    if (!isWeekend) {
      result[date] = computeAvailableSlots(date, ALL_TIME_SLOTS);
    } else {
      result[date] = [];
    }
  });
  return result;
}

/**
 * Persists the admin's availability configuration.
 *
 * @param {Record<string, string[]>} grid  Map of date → enabled slot array
 * @returns {Promise<{ success: boolean }>}
 */
export async function saveAvailability(grid) {
  await new Promise((r) => setTimeout(r, 300));
  // In production: POST to your API
  console.info("[appointmentService] availability saved", grid);
  return { success: true };
}

/**
 * Builds all 7 calendar days of the week containing `referenceDate`.
 * Week starts on Monday.
 *
 * @param {Date} referenceDate
 * @returns {{ date: string, label: string, isWeekend: boolean }[]}
 */
export function buildWeekDates(referenceDate = new Date()) {
  const d = new Date(referenceDate);
  d.setHours(12, 0, 0, 0);
  // Move to Monday of this week
  const dow = d.getDay(); // 0=Sun … 6=Sat
  const diffToMonday = dow === 0 ? -6 : 1 - dow;
  d.setDate(d.getDate() + diffToMonday);

  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(d);
    day.setDate(day.getDate() + i);
    const iso = toLocalISO(day);
    const dayDow = day.getDay();
    return {
      date:      iso,
      label:     formatDateLabel(iso),
      isWeekend: dayDow === 0 || dayDow === 6,
    };
  });
}

/**
 * Sample appointment records used to seed the appointments view.
 * In production replace with a real API call.
 */
const SAMPLE_APPOINTMENTS = (() => {
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  // Build a week of sample data anchored to this week's Monday
  const week = buildWeekDates(today);
  const names = [
    ["Alice",  "Morgan",  "alice@example.com"],
    ["Bob",    "Chen",    "bob@example.com"  ],
    ["Carmen", "Reyes",   "c.reyes@corp.com" ],
    ["David",  "Osei",    "dosei@mail.net"   ],
    ["Elena",  "Müller",  "elena.m@work.com" ],
  ];
  const slots = ["09:00", "10:30", "14:00", "15:30", "11:00"];
  return week
    .filter((d) => !d.isWeekend)
    .slice(0, 5)
    .map((day, i) => ({
      id:        i + 1,
      date:      day.date,
      slot:      slots[i],
      firstName: names[i][0],
      lastName:  names[i][1],
      email:     names[i][2],
      phone:     "+1 555 000 000" + i,
      status:    i % 3 === 0 ? "confirmed" : i % 3 === 1 ? "pending" : "confirmed",
    }));
})();

/**
 * Fetches appointments for a given week.
 *
 * @param {Date} referenceDate  Any date within the desired week
 * @returns {Promise<Array>}
 */
export async function getAppointments(referenceDate = new Date()) {
  await new Promise((r) => setTimeout(r, 200));
  const week = buildWeekDates(referenceDate);
  const weekDates = new Set(week.map((d) => d.date));
  // In production: fetch from API filtered by week
  return SAMPLE_APPOINTMENTS.filter((a) => weekDates.has(a.date));
}
