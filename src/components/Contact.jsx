import { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const handleReset = () => {
    setForm({ name: "", email: "", service: "", message: "" });
    setSent(false);
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__split">
        {/* Left panel */}
        <div className="contact__info">
          <div className="container contact__info-inner">
            <p className="section-label">04 / Contact</p>
            <h2 className="contact__title">
              Let's build<br />
              something<br />
              <em>remarkable.</em>
            </h2>
            <p className="contact__body">
              Whether you have a brief, a hunch, or just a conversation — we're
              ready to listen. Drop us a line and we'll be back within 24 hours.
            </p>
            <div className="contact__details">
              <div className="contact__detail">
                <span className="contact__detail-label">Email</span>
                <a href="mailto:hello@meridian.studio" className="contact__detail-value">
                  hello@meridian.studio
                </a>
              </div>
              <div className="contact__detail">
                <span className="contact__detail-label">Phone</span>
                <a href="tel:+15551234567" className="contact__detail-value">
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="contact__detail">
                <span className="contact__detail-label">Location</span>
                <span className="contact__detail-value">New York / Remote</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel — form */}
        <div className="contact__form-panel">
          {sent ? (
            <div className="contact__success">
              <span className="contact__success-icon">◈</span>
              <h3>Message received.</h3>
              <p>We'll be in touch within one business day.</p>
              <button className="contact__back-btn" onClick={handleReset}>
                Send another
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="service">Service of interest</label>
                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                >
                  <option value="">Select a service...</option>
                  <option>Brand Strategy</option>
                  <option>Digital Experience</option>
                  <option>Motion & Film</option>
                  <option>Growth Marketing</option>
                  <option>Systems & Tech</option>
                  <option>Editorial Content</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                />
              </div>

              <button type="submit" className="contact__submit">
                Send Message →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
