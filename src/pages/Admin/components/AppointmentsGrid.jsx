import { useState, useEffect } from "react";
import {
  ALL_TIME_SLOTS,
  buildWeekDates,
  getAppointments,
} from "../../../services/appointmentService";
import "./AppointmentsGrid.css";

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
function formatWeekRange(week) {
  if (!week.length) return "";
  const first = new Date(week[0].date + "T12:00:00");
  const last  = new Date(week[6].date + "T12:00:00");
  const opts  = { month: "short", day: "numeric" };
  return `${first.toLocaleDateString("en-US", opts)} – ${last.toLocaleDateString("en-US", { ...opts, year: "numeric" })}`;
}

export default function AppointmentsGrid() {
  const [weekRef, setWeekRef] = useState(new Date());   // any date in the current week
  const [week,    setWeek]    = useState([]);
  const [appts,   setAppts]   = useState([]);            // raw appointments for this week
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [detail,  setDetail]  = useState(null);          // appointment being inspected

  useEffect(() => {
    setWeek(buildWeekDates(weekRef));
    setLoading(true);
    setError(null);
    getAppointments(weekRef)
      .then((data) => { setAppts(data); setLoading(false); })
      .catch(() => { setError("Could not load appointments."); setLoading(false); });
  }, [weekRef]);

  const goToPrevWeek = () => {
    const d = new Date(weekRef);
    d.setDate(d.getDate() - 7);
    setWeekRef(d);
  };
  const goToNextWeek = () => {
    const d = new Date(weekRef);
    d.setDate(d.getDate() + 7);
    setWeekRef(d);
  };
  const goToCurrentWeek = () => setWeekRef(new Date());

  /** Find appointment for a specific date + slot, if any */
  const getAppt = (date, slot) =>
    appts.find((a) => a.date === date && a.slot === slot) ?? null;

  const weekdays = week.filter((d) => !d.isWeekend);

  return (
    <div className="appts-grid">
      {/* ── Toolbar ── */}
      <div className="appts-grid__toolbar">
        <div className="appts-grid__nav">
          <button className="appts-grid__nav-btn" onClick={goToPrevWeek} aria-label="Previous week">
            ← Prev
          </button>
          <button className="appts-grid__today-btn" onClick={goToCurrentWeek}>
            Today
          </button>
          <button className="appts-grid__nav-btn" onClick={goToNextWeek} aria-label="Next week">
            Next →
          </button>
        </div>
        <span className="appts-grid__week-label">{formatWeekRange(week)}</span>
        <span className="appts-grid__count">
          {appts.length} appointment{appts.length !== 1 ? "s" : ""}
        </span>
      </div>

      {error && <p className="appts-grid__error" role="alert">{error}</p>}

      {/* ── Grid ── */}
      <div className="appts-grid__scroll">
        {loading ? (
          <div className="appts-grid__loading" aria-busy="true">
            <span className="appts-grid__spinner">◈</span>
            <p>Loading appointments…</p>
          </div>
        ) : (
          <div
            className="appts-grid__table"
            style={{ gridTemplateColumns: `var(--apg-label-w) repeat(${weekdays.length}, 1fr)` }}
            role="grid"
            aria-label="Appointments week view"
          >
            {/* Corner */}
            <div className="appts-grid__corner" role="columnheader" />

            {/* Day headers */}
            {weekdays.map((day) => {
              const todayISO = (() => {
                const t = new Date();
                t.setHours(12, 0, 0, 0);
                const y = t.getFullYear();
                const m = String(t.getMonth() + 1).padStart(2, "0");
                const d = String(t.getDate()).padStart(2, "0");
                return `${y}-${m}-${d}`;
              })();
              const isToday = day.date === todayISO;
              return (
                <div
                  key={day.date}
                  className={`appts-grid__col-header ${isToday ? "appts-grid__col-header--today" : ""}`}
                  role="columnheader"
                >
                  <span className="appts-grid__col-day">{formatDayName(day.date)}</span>
                  <span className="appts-grid__col-num">{formatDayNum(day.date)}</span>
                  <span className="appts-grid__col-month">{formatMonth(day.date)}</span>
                  {isToday && <span className="appts-grid__today-pill">Today</span>}
                </div>
              );
            })}

            {/* Time slot rows */}
            {ALL_TIME_SLOTS.map((slot) => (
              <div key={`row-${slot}`} style={{ display: "contents" }}>
                <div key={`label-${slot}`} className="appts-grid__row-label" role="rowheader">
                  {slot}
                </div>
                {weekdays.map((day) => {
                  const appt = getAppt(day.date, slot);
                  return (
                    <div
                      key={`${day.date}-${slot}`}
                      className={`appts-grid__cell ${appt ? "appts-grid__cell--booked" : "appts-grid__cell--free"}`}
                      role="gridcell"
                      onClick={() => appt && setDetail(appt)}
                      aria-label={
                        appt
                          ? `${slot} — ${appt.firstName} ${appt.lastName} (${appt.status})`
                          : `${slot} on ${day.label} — free`
                      }
                      tabIndex={appt ? 0 : -1}
                      onKeyDown={(e) => {
                        if (appt && (e.key === "Enter" || e.key === " ")) {
                          e.preventDefault();
                          setDetail(appt);
                        }
                      }}
                    >
                      {appt && (
                        <span className="appts-grid__booking">
                          <span className={`appts-grid__status appts-grid__status--${appt.status}`} />
                          <span className="appts-grid__booking-name">
                            {appt.firstName} {appt.lastName[0]}.
                          </span>
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Legend ── */}
      <div className="appts-grid__legend">
        <span className="appts-grid__legend-confirmed">● Confirmed</span>
        <span className="appts-grid__legend-pending">● Pending</span>
        <span className="appts-grid__legend-free">○ Free</span>
      </div>

      {/* ── Detail drawer ── */}
      {detail && (
        <div className="appts-grid__detail" role="dialog" aria-label="Appointment details">
          <div className="appts-grid__detail-header">
            <h3 className="appts-grid__detail-title">Appointment details</h3>
            <button
              className="appts-grid__detail-close"
              onClick={() => setDetail(null)}
              aria-label="Close details"
            >
              ✕
            </button>
          </div>
          <dl className="appts-grid__detail-body">
            {[
              ["Name",   `${detail.firstName} ${detail.lastName}`],
              ["Email",  detail.email],
              ["Phone",  detail.phone],
              ["Date",   detail.date],
              ["Time",   detail.slot],
              ["Status", detail.status],
            ].map(([label, value]) => (
              <div key={label} className="appts-grid__detail-row">
                <dt className="appts-grid__detail-label">{label}</dt>
                <dd className={`appts-grid__detail-value ${label === "Status" ? `appts-grid__status-text--${detail.status}` : ""}`}>
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
