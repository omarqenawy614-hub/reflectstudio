import { useState } from "react";
import Section from "./Section";
import SocialIcon from "./SocialIcons";
import { siteConfig } from "../data/siteConfig";
import { services } from "../data/services";

// service names for the dropdown (duplicates removed)
const serviceNames = [...new Set(services.map((s) => s.name))];

const EMPTY = { name: "", phone: "", service: "", message: "" };

function buildMessage(f) {
  const lines = [`Hello ${siteConfig.name}! 👋`, "", `Name: ${f.name.trim()}`];
  if (f.phone.trim()) lines.push(`Phone: ${f.phone.trim()}`);
  if (f.service) lines.push(`Service: ${f.service}`);
  lines.push("", "About my project:", f.message.trim());
  return lines.join("\n");
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setError("");
  };

  function send(channel) {
    if (!form.name.trim() || !form.message.trim()) {
      setError("Please add your name and a few words about your project.");
      return;
    }
    const text = buildMessage(form);
    if (channel === "whatsapp") {
      window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    } else {
      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
        `New project enquiry — ${form.name}`
      )}&body=${encodeURIComponent(text)}`;
    }
  }

  return (
    <Section id="contact">
      <div className="wrap contact-layout">
        <div className="contact-info">
          <div className="eyebrow">
            <span className="line" />
            Get In Touch
          </div>
          <h2>
            Let's work
            <br />
            <span className="accent">together.</span>
          </h2>
          <p className="section-sub">
            Tell us about your brand, the problem, or the world you're trying to build. We reply within one
            working day.
          </p>

          <ul className="contact-lines">
            <li>
              <span>WhatsApp</span>
              <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noreferrer">
                {siteConfig.whatsappDisplay}
              </a>
            </li>
            <li>
              <span>Email</span>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
            <li>
              <span>Studio</span>
              <b>{siteConfig.location}, Egypt</b>
            </li>
          </ul>

          <div className="social-row">
            {siteConfig.socials
              .filter((s) => s.href)
              .map((s) => (
                <a
                  href={s.href}
                  className="social-pill"
                  title={s.name}
                  aria-label={s.name}
                  key={s.name}
                  target="_blank"
                  rel="noreferrer"
                >
                  <SocialIcon name={s.name} />
                </a>
              ))}
          </div>
        </div>

        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            send("whatsapp");
          }}
          noValidate
        >
          <h3>Start your project</h3>

          <div className="field-row">
            <label className="field">
              <span>Your name *</span>
              <input value={form.name} onChange={set("name")} placeholder="Full name" autoComplete="name" />
            </label>
            <label className="field">
              <span>Phone / WhatsApp</span>
              <input
                value={form.phone}
                onChange={set("phone")}
                placeholder="+20 …"
                autoComplete="tel"
                inputMode="tel"
              />
            </label>
          </div>

          <label className="field">
            <span>What do you need?</span>
            <select value={form.service} onChange={set("service")}>
              <option value="">Select a service (optional)</option>
              {serviceNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
              <option value="Not sure yet">Not sure yet — let's talk</option>
            </select>
          </label>

          <label className="field">
            <span>About your project *</span>
            <textarea
              rows={4}
              value={form.message}
              onChange={set("message")}
              placeholder="Tell us about your business and what you want to achieve…"
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Send via WhatsApp →
            </button>
            <button type="button" className="btn-ghost" onClick={() => send("email")}>
              Send by email
            </button>
          </div>
        </form>
      </div>
    </Section>
  );
}
