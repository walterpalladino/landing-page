import { useState } from "react";
import "./TimeSlotPicker.css";

/**
 * TimeSlotPicker
 *
 * Props:
 *   availableDates  — array of { date: string (ISO "YYYY-MM-DD"), label: string, slots: string[] }
 *   onSelect(slot)  — called with { date, slot } when the user confirms a selection
 *   onCancel()      — called when the user clicks Cancel
 */

function formatDayName(isoDate) {
  const d = new Date(isoDate + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
}

function formatDayNumber(isoDate) {
  const d = new Date(isoDate + "T00:00:00");
  return d.getDate();
}

function formatMonth(isoDate) {
  const d = new Date(isoDate + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
}

export default function TimeSlotPicker({ availableDates = [], onSelect, onCancel }) {
  const [selected, setSelected] = useState(null); // { date, slot }

  // Build a unified list of all unique time slots across all dates, sorted
  const allSlots = Array.from(
    new Set(availableDates.flatMap((d) => d.slots))
  ).sort();

  const handleSlotClick = (date, slot) => {
    const isSame =
      selected && selected.date === date && selected.slot === slot;
    setSelected(isSame ? null : { date, slot });
  };

  const handleSelect = () => {
    if (selected && onSelect) onSelect(selected);
  };

  const handleCancel = () => {
    setSelected(null);
    if (onCancel) onCancel();
  };

  if (!availableDates.length) {
    return (
      <div className="tsp tsp--empty">
        <span className="tsp__empty-icon">◈</span>
        <p className="tsp__empty-text">No available dates at this time.</p>
      </div>
    );
  }

  return (
    <div className="tsp">
      {/* ── Label ── */}
      <div className="tsp__label-row">
        <span className="tsp__label">Preferred Date &amp; Time</span>
        {selected && (
          <span className="tsp__selection-hint">
            {selected.slot} · {availableDates.find((d) => d.date === selected.date)?.label ?? selected.date}
          </span>
        )}
      </div>

      {/* ── Scrollable grid wrapper ── */}
      <div className="tsp__scroll">
        <div
          className="tsp__grid"
          style={{ gridTemplateColumns: `var(--tsp-row-label-w) repeat(${availableDates.length}, 1fr)` }}
          role="grid"
          aria-label="Appointment time slot picker"
        >
          {/* ── Header row — empty corner + date columns ── */}
          <div className="tsp__corner" role="columnheader" />
          {availableDates.map((d) => (
            <div key={d.date} className="tsp__col-header" role="columnheader">
              <span className="tsp__col-header-day">{formatDayName(d.date)}</span>
              <span className="tsp__col-header-num">{formatDayNumber(d.date)}</span>
              <span className="tsp__col-header-month">{formatMonth(d.date)}</span>
            </div>
          ))}

          {/* ── Time slot rows ── */}
          {allSlots.map((slot) => (
            <>
              {/* Row label */}
              <div key={`label-${slot}`} className="tsp__row-label" role="rowheader">
                {slot}
              </div>

              {/* Cells */}
              {availableDates.map((d) => {
                const available = d.slots.includes(slot);
                const isSelected =
                  selected?.date === d.date && selected?.slot === slot;

                return (
                  <div
                    key={`${d.date}-${slot}`}
                    role="gridcell"
                    className={[
                      "tsp__cell",
                      available ? "tsp__cell--available" : "tsp__cell--unavailable",
                      isSelected ? "tsp__cell--selected" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => available && handleSlotClick(d.date, slot)}
                    aria-disabled={!available}
                    aria-selected={isSelected}
                    aria-label={
                      available
                        ? `${slot} on ${d.label}${isSelected ? ", selected" : ""}`
                        : `${slot} on ${d.label}, unavailable`
                    }
                    tabIndex={available ? 0 : -1}
                    onKeyDown={(e) => {
                      if (available && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        handleSlotClick(d.date, slot);
                      }
                    }}
                  >
                    {available ? (
                      <span className="tsp__cell-inner">
                        {isSelected && <span className="tsp__cell-check">◈</span>}
                        <span className="tsp__cell-time">{slot}</span>
                      </span>
                    ) : (
                      <span className="tsp__cell-dash">—</span>
                    )}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>

      {/* ── Actions ── */}
      <div className="tsp__actions">
        <button
          type="button"
          className="tsp__btn tsp__btn--cancel"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="tsp__btn tsp__btn--select"
          onClick={handleSelect}
          disabled={!selected}
          aria-disabled={!selected}
        >
          {selected ? "Confirm slot →" : "Select a slot"}
        </button>
      </div>
    </div>
  );
}
