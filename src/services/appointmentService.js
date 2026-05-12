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

  while (dates.length < count) {
    const dow = cursor.getDay();
    if (dow !== 0 && dow !== 6) {                 // skip weekends
      const iso = cursor.toISOString().split("T")[0];
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
