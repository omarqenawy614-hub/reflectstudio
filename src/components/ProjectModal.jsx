import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { siteConfig } from "../data/siteConfig";
import { services } from "../data/services";

// ============================================================
// "START YOUR PROJECT" WINDOW
// Every "Start a project" / "Talk to us" button on the site opens
// this window (same form as the old Contact section). The visitor
// fills it in and sends it by WhatsApp or by email.
//
//   const { openProject } = useProjectModal();
//   <button onClick={openProject}>Start a project</button>
// ============================================================

const Ctx = createContext({ openProject: () => {} });
export const useProjectModal = () => useContext(Ctx);

const serviceNames = [...new Set(services.map((s) => s.name))];
const EMPTY = { name: "", phone: "", service: "", message: "" };

function buildMessage(f) {
  const lines = [`Hello ${siteConfig.name}! 👋`, "", `Name: ${f.name.trim()}`];
  if (f.phone.trim()) lines.push(`Phone: ${f.phone.trim()}`);
  if (f.service) lines.push(`Service: ${f.service}`);
  lines.push("", "About my project:", f.message.trim());
  return lines.join("\n");
}

function ProjectForm({ onClose }) {
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
    <form
      className="contact-form pm-form"
      onSubmit={(e) => {
        e.preventDefault();
        send("whatsapp");
      }}
      noValidate
    >
      <button type="button" className="pm-close" aria-label="Close" onClick={onClose}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>

      <h3>Start your project</h3>

      <div className="field-row">
        <label className="field">
          <span>Your name *</span>
          <input value={form.name} onChange={set("name")} placeholder="Full name" autoComplete="name" autoFocus />
        </label>
        <label className="field">
          <span>Phone / WhatsApp</span>
          <input value={form.phone} onChange={set("phone")} placeholder="+20 …" autoComplete="tel" inputMode="tel" />
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
        <textarea rows={4} value={form.message} onChange={set("message")} placeholder="Tell us about your business and what you want to achieve…" />
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
  );
}

export function ProjectModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openProject = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("modal-open");
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <Ctx.Provider value={{ openProject }}>
      {children}
      {open &&
        createPortal(
          <div className="pm-overlay" onMouseDown={(e) => e.target === e.currentTarget && close()} role="dialog" aria-modal="true" aria-label="Start your project">
            <ProjectForm onClose={close} />
          </div>,
          document.body
        )}
    </Ctx.Provider>
  );
}
