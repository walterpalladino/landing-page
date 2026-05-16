import { useState, useEffect } from "react";
import {
  ALL_TIME_SLOTS,
  buildAvailabilityWindow,
  getAvailabilityGrid,
  saveAvailability,
} from "../../../services/appointmentService";
import "./AvailabilityGrid.css";

function formatDayName(iso) {
  return new Date(iso + "T12:00:00")
    .toLocaleDateString("en-US", { weekday: "short" })
    .toUpperCase();
}
function formatDayNum(iso) {
  return new Date(iso + "T12:00:00").getDate();
}
function formatMonth(iso) {
  return new Date(iso + "T12:00:00")
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();
}

export default function AvailabilityGrid() {
  const [days,    setDays]    = useState(() => buildAvailabilityWindow());
  const [grid,    setGrid]    = useState({});   // { "YYYY-MM-DD": string[] }
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    setLoading(true);
    getAvailabilityGrid()
      .then((data) => { setGrid(data); setLoading(false); })
      .catch(() => { setError("Could not load availability."); setLoading(false); });
  }, []);

  /* Toggle a single slot on/off */
  const toggleSlot = (date, slot) => {
    setSaved(false);
    setGrid((prev) => {
      const current = new Set(prev[date] ?? []);
      if (current.has(slot)) current.delete(slot);
      else current.add(slot);
      return { ...prev, [date]: [...current].sort() };
    });
  };

  /* Toggle all slots for a day */
  const toggleDay = (date) => {
    setSaved(false);
    const day = days.find((d) => d.date === date);
    if (day?.isWeekend) return;
    setGrid((prev) => {
      const current = prev[date] ?? [];
      const next = current.length === ALL_TIME_SLOTS.length ? [] : [...ALL_TIME_SLOTS];
      return { ...prev, [date]: next };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await saveAvailability(grid);
      setSaved(true);
    } catch {
      setError("Could not save availability. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="avail-grid avail-grid--loading" aria-busy="true">
        <span className="avail-grid__spinner">◈</span>
        <p>Loading availability…</p>
      </div>
    );
  }

  return (
    <div className="avail-grid">
      <div className="avail-grid__toolbar">
        <p className="avail-grid__hint">
          Click a cell to toggle a slot. Click a date header to toggle the entire day.
        </p>
        <div className="avail-grid__toolbar-actions">
          {saved && <span className="avail-grid__saved">✓ Saved</span>}
          {error && <span className="avail-grid__error" role="alert">{error}</span>}
          <button
            className="avail-grid__save-btn"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="avail-grid__scroll">
        <div
          className="avail-grid__table"
          style={{ gridTemplateColumns: `var(--ag-label-w) repeat(${days.length}, 1fr)` }}
          role="grid"
          aria-label="Availability editor"
        >
          {/* Corner */}
          <div className="avail-grid__corner" role="columnheader" />

          {/* Date column headers */}
          {days.map((day) => (
            <button
              key={day.date}
              className={`avail-grid__col-header ${day.isWeekend ? "avail-grid__col-header--weekend" : ""}`}
              role="columnheader"
              onClick={() => toggleDay(day.date)}
              disabled={day.isWeekend}
              aria-label={`Toggle all slots for ${day.label}`}
              title={day.isWeekend ? "Weekends unavailable" : `Toggle all — ${day.label}`}
            >
              <span className="avail-grid__col-day">{formatDayName(day.date)}</span>
              <span className="avail-grid__col-num">{formatDayNum(day.date)}</span>
              <span className="avail-grid__col-month">{formatMonth(day.date)}</span>
              {!day.isWeekend && (
                <span className="avail-grid__col-count">
                  {(grid[day.date] ?? []).length}/{ALL_TIME_SLOTS.length}
                </span>
              )}
            </button>
          ))}

          {/* Slot rows */}
          {ALL_TIME_SLOTS.map((slot) => (
            <div key={`row-${slot}`} style={{ display: "contents" }}>
              <div key={`label-${slot}`} className="avail-grid__row-label" role="rowheader">
                {slot}
              </div>
              {days.map((day) => {
                const enabled = (grid[day.date] ?? []).includes(slot);
                if (day.isWeekend) {
                  return (
                    <div
                      key={`${day.date}-${slot}`}
                      className="avail-grid__cell avail-grid__cell--weekend"
                      role="gridcell"
                      aria-disabled="true"
                    />
                  );
                }
                return (
                  <button
                    key={`${day.date}-${slot}`}
                    className={`avail-grid__cell ${enabled ? "avail-grid__cell--on" : "avail-grid__cell--off"}`}
                    role="gridcell"
                    onClick={() => toggleSlot(day.date, slot)}
                    aria-pressed={enabled}
                    aria-label={`${slot} on ${day.label} — ${enabled ? "available" : "unavailable"}`}
                  >
                    {enabled ? <span className="avail-grid__tick">◈</span> : null}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <p className="avail-grid__legend">
        <span className="avail-grid__legend-on">◈ Available</span>
        <span className="avail-grid__legend-off">□ Unavailable</span>
        <span className="avail-grid__legend-wknd">▨ Weekend (closed)</span>
      </p>
    </div>
  );
}
