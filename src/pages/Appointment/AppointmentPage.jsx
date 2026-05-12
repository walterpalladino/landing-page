import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm }           from "../../hooks/useForm";
import { useAvailableDates } from "../../hooks/useAvailableDates";
import Input          from "../../components/ui/Input";
import TimeSlotPicker from "../../components/ui/TimeSlotPicker";
import Button         from "../../components/ui/Button";
import "./AppointmentPage.css";

const INITIAL = {
  firstName: "",
  lastName:  "",
  email:     "",
  phone:     "",
  slot:      null,
};

export default function AppointmentPage() {
  const navigate = useNavigate();
  const { values, submitted, handleChange, handleSubmit, reset } = useForm(INITIAL);
  const { dates, loading, error, refresh } = useAvailableDates();

  // Scroll to the top of the page whenever the submitted state changes —
  // both when the form is submitted (show success) and when reset (show form again).
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [submitted]);

  const handleSlotSelect = (selection) =>
    handleChange({ target: { name: "slot", value: selection } });

  const handleSlotCancel = () =>
    handleChange({ target: { name: "slot", value: null } });

  const formatSlotLabel = (slot) => {
    if (!slot) return "";
    const dateObj = dates.find((d) => d.date === slot.date);
    return `${slot.slot} — ${dateObj?.label ?? slot.date}`;
  };

  return (
    <div className="appt-page">
      {/* ── Left panel ── */}
      <aside className="appt-page__aside">
        <button className="appt-page__back" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="appt-page__aside-content">
          <span className="appt-page__logo-mark">◈</span>
          <h2 className="appt-page__aside-title">
            Let&apos;s find<br />a time that<br /><em>works for you.</em>
          </h2>
          <p className="appt-page__aside-body">
            Fill in your details and choose a slot from the calendar. Our team
            will confirm and send you everything you need within one business day.
          </p>

          <div className="appt-page__aside-details">
            {[
              { label: "Duration",     value: "30 – 60 min"             },
              { label: "Format",       value: "Video call or in-person"  },
              { label: "Confirmation", value: "Within 24 hours by email" },
            ].map(({ label, value }) => (
              <div className="appt-page__aside-detail" key={label}>
                <span className="appt-page__aside-detail-label">{label}</span>
                <span className="appt-page__aside-detail-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* ── Right panel ── */}
      <main className="appt-page__main">
        <header className="appt-page__header">
          <p className="appt-page__eyebrow">Set an Appointment</p>
          <h1 className="appt-page__title">Book a session</h1>
        </header>

        {submitted ? (
          /* ── Success ── */
          <div className="appt-page__success">
            <span className="appt-page__success-icon">◈</span>
            <h2 className="appt-page__success-title">Appointment request sent!</h2>
            <p className="appt-page__success-body">
              Thank you, <strong>{values.firstName}</strong>. We&apos;ve received
              your request for <strong>{formatSlotLabel(values.slot)}</strong>.
              You&apos;ll receive full confirmation and instructions at{" "}
              <strong>{values.email}</strong> within one business day.
            </p>
            <div className="appt-page__success-actions">
              <Button variant="outline" onClick={reset}>Book another</Button>
              <Button variant="primary" to="/">Back to home</Button>
            </div>
          </div>
        ) : (
          /* ── Form ── */
          <form
            className="appt-page__form"
            onSubmit={handleSubmit(() => {})}
            noValidate
          >
            <div className="appt-page__form-row">
              <Input
                id="firstName" name="firstName" label="First Name"
                value={values.firstName} onChange={handleChange}
                placeholder="Jane" required
              />
              <Input
                id="lastName" name="lastName" label="Last Name"
                value={values.lastName} onChange={handleChange}
                placeholder="Doe" required
              />
            </div>

            <Input
              id="email" name="email" label="Email Address" type="email"
              value={values.email} onChange={handleChange}
              placeholder="jane@example.com" required
            />

            <Input
              id="phone" name="phone" label="Phone Number" type="tel"
              value={values.phone} onChange={handleChange}
              placeholder="+1 (555) 000-0000"
            />

            {/* ── Slot picker — loading / error / ready ── */}
            {loading && (
              <div className="appt-page__slots-loading" aria-busy="true">
                <span className="appt-page__slots-loading-icon">◈</span>
                <span>Loading available slots…</span>
              </div>
            )}

            {error && !loading && (
              <div className="appt-page__slots-error" role="alert">
                <p>Could not load available slots. Please try again.</p>
                <button
                  type="button"
                  className="appt-page__slots-retry"
                  onClick={refresh}
                >
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && (
              <TimeSlotPicker
                availableDates={dates}
                onSelect={handleSlotSelect}
                onCancel={handleSlotCancel}
              />
            )}

            {values.slot && (
              <p className="appt-page__slot-confirm">
                ◈&nbsp; Selected: <strong>{formatSlotLabel(values.slot)}</strong>
              </p>
            )}

            <div className="appt-page__form-footer">
              <p className="appt-page__form-note">
                * Required fields. A time slot must be selected before submitting.
              </p>
              <Button
                type="submit"
                variant="primary"
                disabled={!values.slot || loading}
                aria-disabled={!values.slot || loading}
              >
                Send Request →
              </Button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
