import { useEffect, useState } from "react";
import { urgency } from "../data/urgency";
import SplitText from "./SplitText";
import Sparks from "./Sparks";
import { scrollToPanel } from "../utils/scrollToPanel";
import { useProjectModal } from "./ProjectModal";

// ============================================================
// URGENCY BLOCK — three screens inside one scroll-stack:
//   1. big headline            2. ticking countdown
//   3. four "why choose us" cards
// All three share the glowing planet arc at the bottom.
// The stage that is showing is driven by `data-stage` (usePanels).
// ============================================================

const ICONS = {
  spark: <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4L12 3zM18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8L18 16z" />,
  bolt: <path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12L13 2z" />,
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </>
  ),
  shield: <path d="M12 3l7.5 3v5.5c0 4.6-3.1 8.2-7.5 9.5-4.4-1.3-7.5-4.9-7.5-9.5V6L12 3zM8.7 12l2.4 2.4 4.4-4.6" />,
};

// -------- countdown (MM : SS, counting DOWN) ----------------
function getDeadline() {
  const span = urgency.minutes * 60000;
  const KEY = "reflect-countdown-deadline";
  try {
    const saved = Number(sessionStorage.getItem(KEY));
    if (saved && saved > Date.now()) return saved;
    const next = Date.now() + span;
    sessionStorage.setItem(KEY, String(next));
    return next;
  } catch {
    return Date.now() + span;
  }
}

const pad = (n) => String(n).padStart(2, "0");

// a digit that "rolls" in whenever its value changes
function Digit({ v }) {
  return (
    <span className="cd-digit">
      <span key={v} className="cd-roll">
        {v}
      </span>
    </span>
  );
}

function Pair({ value, label }) {
  const s = pad(value);
  return (
    <div className="cd-unit">
      <div className="cd-num">
        <Digit v={s[0]} />
        <Digit v={s[1]} />
      </div>
      <div className="cd-label">{label}</div>
    </div>
  );
}

function Countdown() {
  const [deadline, setDeadline] = useState(getDeadline);
  const [ms, setMs] = useState(() => Math.max(0, deadline - Date.now()));

  useEffect(() => {
    const id = setInterval(() => {
      const left = deadline - Date.now();
      if (left <= 0) {
        // time is up -> start a fresh round
        try {
          sessionStorage.removeItem("reflect-countdown-deadline");
        } catch {}
        setDeadline(getDeadline());
      } else {
        setMs(left);
      }
    }, 200);
    return () => clearInterval(id);
  }, [deadline]);

  const total = Math.ceil(ms / 1000);
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  // the whole clock flips white <-> red every second (danger feeling)
  const hot = seconds % 2 === 1;

  return (
    <div className={`cd ${hot ? "cd-red" : "cd-white"}`} role="timer" aria-label="Time remaining">
      <Pair value={minutes} label="Minutes" />
      <span className="cd-sep">:</span>
      <Pair value={seconds} label="Seconds" />
    </div>
  );
}

const go = (id) => scrollToPanel(id);

export default function Urgency() {
  const { openProject } = useProjectModal();
  return (
    <section id="why-us" className="panel urgency" data-panel data-stages="3" data-stage="0">
      {/* the three scroll stops (the page snaps to each of these) */}
      <i className="snap-stop" style={{ top: "0vh" }} />
      <i className="snap-stop" style={{ top: "100vh" }} />
      <i className="snap-stop" style={{ top: "200vh" }} />

      <div className="urgency-sticky">

        {/* ---- the planet arc, shared by all three screens ---- */}
        <div className="planet" aria-hidden="true">
          <span className="planet-glow" />
          <span className="planet-rim" />
        </div>

        {/* ---------- screen 1 : headline ---------- */}
        <div className="stage stage-0">
          <div className="eyebrow rv">
            <span className="line" />
            {urgency.eyebrow}
          </div>
          <SplitText as="h2" className="urgency-headline" delay={150}>
            {urgency.headline}
          </SplitText>
        </div>

        {/* ---------- screen 2 : countdown ---------- */}
        <div className="stage stage-1">
          <p className="cd-caption rv" style={{ "--rd": "0ms" }}>
            {urgency.caption}
          </p>
          <div className="rv rv-fade" style={{ "--rd": "200ms" }}>
            <Countdown />
          </div>
          <div className="cd-actions rv" style={{ "--rd": "500ms" }}>
            <button className="btn-primary" onClick={openProject}>
              {urgency.primaryCta} →
            </button>
            <button className="btn-ghost" onClick={() => go("services")}>
              {urgency.secondaryCta}
            </button>
          </div>
        </div>

        {/* ---------- screen 3 : why choose us ---------- */}
        <div className="stage stage-2">
          <Sparks />
          <SplitText as="h2" className="section-title why-title" delay={100}>
            {urgency.whyTitle}
          </SplitText>
          <div className="why-grid">
            {urgency.why.map((w, i) => (
              <article className="why-card rv rv-card" key={w.t} style={{ "--rd": `${300 + i * 130}ms` }}>
                <span className="why-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
                    {ICONS[w.icon] || ICONS.spark}
                  </svg>
                </span>
                <span className="why-n">0{i + 1}</span>
                <h3>{w.t}</h3>
                <p>{w.d}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
