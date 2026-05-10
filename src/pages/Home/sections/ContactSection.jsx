import { useForm } from "../../../hooks/useForm";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Textarea from "../../../components/ui/Textarea";
import "./ContactSection.css";

const SERVICE_OPTIONS = [
  "Brand Strategy",
  "Digital Experience",
  "Motion & Film",
  "Growth Marketing",
  "Systems & Tech",
  "Editorial Content",
];

const INITIAL_VALUES = { name: "", email: "", service: "", message: "" };

export default function ContactSection() {
  const { values, submitted, handleChange, handleSubmit, reset } =
    useForm(INITIAL_VALUES);

  return (
    <section className="contact" id="contact">
      <div className="contact__split">
        {/* ── Left info panel ── */}
        <div className="contact__info">
          <div className="container contact__info-inner">
            <p className="section-label">04 / Contact</p>
            <h2 className="contact__title">
              Let&apos;s build<br />something<br /><em>remarkable.</em>
            </h2>
            <p className="contact__body">
              Whether you have a brief, a hunch, or just a conversation — we&apos;re
              ready to listen. Drop us a line and we&apos;ll be back within 24 hours.
            </p>
            <div className="contact__details">
              {[
                { label: "Email",    value: "hello@meridian.studio", href: "mailto:hello@meridian.studio" },
                { label: "Phone",    value: "+1 (555) 123-4567",     href: "tel:+15551234567"             },
                { label: "Location", value: "New York / Remote",     href: null                           },
              ].map(({ label, value, href }) => (
                <div className="contact__detail" key={label}>
                  <span className="contact__detail-label">{label}</span>
                  {href
                    ? <a href={href} className="contact__detail-value">{value}</a>
                    : <span className="contact__detail-value">{value}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right form panel ── */}
        <div className="contact__form-panel">
          {submitted ? (
            <div className="contact__success">
              <span className="contact__success-icon">◈</span>
              <h3>Message received.</h3>
              <p>We&apos;ll be in touch within one business day.</p>
              <button className="contact__back-btn" onClick={reset}>
                Send another
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit(() => {})}>
              <div className="form-row">
                <Input
                  id="name" name="name" label="Name"
                  value={values.name} onChange={handleChange}
                  placeholder="Your name" required
                />
                <Input
                  id="email" name="email" label="Email" type="email"
                  value={values.email} onChange={handleChange}
                  placeholder="your@email.com" required
                />
              </div>
              <Select
                id="service" name="service" label="Service of interest"
                value={values.service} onChange={handleChange}
                options={SERVICE_OPTIONS}
              />
              <Textarea
                id="message" name="message" label="Message"
                value={values.message} onChange={handleChange}
                placeholder="Tell us about your project..." required
              />
              <Button type="submit" variant="outline">Send Message →</Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
