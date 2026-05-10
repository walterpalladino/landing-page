import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import Input      from "../../components/ui/Input";
import DatePicker from "../../components/ui/DatePicker";
import Button     from "../../components/ui/Button";
import "./AppointmentPage.css";

const INITIAL = {
  firstName: "",
  lastName:  "",
  email:     "",
  phone:     "",
  date:      "",
};

export default function AppointmentPage() {
  const navigate = useNavigate();
  const { values, submitted, handleChange, handleSubmit, reset } = useForm(INITIAL);

  return (
    <div className="appt-page">
      {/* ── Left panel — brand / context ── */}
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
            Fill in your details and preferred date. Our team will confirm
            the appointment and send you everything you need via email within
            one business day.
          </p>

          <div className="appt-page__aside-details">
            {[
              { label: "Duration",     value: "30 – 60 min"            },
              { label: "Format",       value: "Video call or in-person" },
              { label: "Confirmation", value: "Within 24 hours by email"},
            ].map(({ label, value }) => (
              <div className="appt-page__aside-detail" key={label}>
                <span className="appt-page__aside-detail-label">{label}</span>
                <span className="appt-page__aside-detail-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* ── Right panel — form / success ── */}
      <main className="appt-page__main">
        <header className="appt-page__header">
          <p className="appt-page__eyebrow">Set an Appointment</p>
          <h1 className="appt-page__title">Book a session</h1>
        </header>

        {submitted ? (
          /* ── Success state ── */
          <div className="appt-page__success">
            <span className="appt-page__success-icon">◈</span>
            <h2 className="appt-page__success-title">Appointment request sent!</h2>
            <p className="appt-page__success-body">
              Thank you, <strong>{values.firstName}</strong>. We&apos;ve received your
              request for <strong>{values.date}</strong>. You&apos;ll receive full
              confirmation and instructions at{" "}
              <strong>{values.email}</strong> within one business day.
            </p>
            <div className="appt-page__success-actions">
              {/* Both on a light background → outline and primary */}
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

            <DatePicker
              id="date" name="date" label="Preferred Date"
              value={values.date} onChange={handleChange}
              required
            />

            <div className="appt-page__form-footer">
              <p className="appt-page__form-note">
                * Required fields. You&apos;ll receive a confirmation email with meeting
                details once we&apos;ve reviewed your request.
              </p>
              <Button type="submit" variant="primary">Send Request →</Button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
