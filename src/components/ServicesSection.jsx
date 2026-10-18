import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Section from "./Section";
import SplitText from "./SplitText";
import { services } from "../data/services";
import { artStyle } from "../utils/placeholderArt";

// ============================================================
// SERVICES — a looping row of cards that drifts on its own.
//
//  * it keeps moving by itself (even when you do nothing)
//  * the card nearest the centre grows and glows, the others
//    step back and turn slightly away
//  * grab it with the mouse and drag left / right to stop on the
//    service you want (it keeps gliding a little after you let go)
//  * clicking a card still opens that service page, exactly as before
//
// Tune the feel with the numbers below.
// ============================================================

const AUTO_SPEED = 38;      // px per second of self-movement
const HOVER_SLOWDOWN = 0.25; // speed while the mouse rests on the row (1 = no slowdown)
const GAP = 22;             // space between cards (px)
const MAX_GROW = 0.3;       // how much bigger the centre card gets (0.3 = +30 %)

function ServiceCard({ service, index, onOpen }) {
  const ref = useRef(null);

  function move(e) {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <a
      ref={ref}
      href={`/${service.slug}`}
      className="category-card svc-card"
      draggable="false"
      onDragStart={(e) => e.preventDefault()}
      onMouseMove={move}
      onClick={(e) => {
        e.preventDefault();
        onOpen(service);
      }}
    >
      <div {...artStyle("category-card-bg", service.image, index)} />

      {service.artwork && (
        <div className="category-card-artwork-wrap">
          <img className="category-card-artwork" src={service.artwork} alt="" draggable="false" />
        </div>
      )}

      <div className="category-card-shade" />
      <div className="category-card-glow" />

      <div className="category-card-label">
        <span className="n">0{(index % services.length) + 1}</span>
        <span className="t">{service.name}</span>
      </div>
    </a>
  );
}

function ServiceCarousel() {
  const navigate = useNavigate();
  const boxRef = useRef(null);
  const trackRef = useRef(null);
  const [cardW, setCardW] = useState(220);

  const N = services.length;
  const items = [...services, ...services, ...services]; // 3 copies = endless loop
  const step = cardW + GAP;
  const loop = N * step;

  const st = useRef({ x: 0, v: 0, drag: false, moved: 0, hover: false, visible: true, lastX: 0, lastT: 0 });

  // card size follows the screen height so everything stays on one screen
  useEffect(() => {
    const fit = () => setCardW(Math.round(Math.max(130, Math.min(230, window.innerHeight * 0.265))));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  // only animate while the section is on screen
  useEffect(() => {
    const panel = boxRef.current?.closest("[data-panel]");
    if (!panel) return;
    const io = new IntersectionObserver(([en]) => (st.current.visible = en.isIntersecting), { threshold: 0.01 });
    io.observe(panel);
    return () => io.disconnect();
  }, []);

  // the animation loop
  useEffect(() => {
    const box = boxRef.current;
    const track = trackRef.current;
    if (!box || !track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const s = st.current;
    let raf;
    let last = performance.now();
    let speedMul = 1;

    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (s.visible) {
        if (!s.drag) {
          const target = s.hover ? HOVER_SLOWDOWN : 1;
          speedMul += (target - speedMul) * Math.min(1, dt * 5);
          s.x += (reduce ? 0 : AUTO_SPEED * speedMul) * dt + s.v * dt;
          s.v *= Math.pow(0.04, dt); // inertia after a drag fades out
        }
        s.x = ((s.x % loop) + loop) % loop;

        const boxW = box.clientWidth;
        const base = boxW / 2 - cardW / 2 - loop - s.x; // middle copy centred on the screen
        track.style.transform = `translate3d(${base}px,0,0)`;

        const kids = track.children;
        for (let i = 0; i < kids.length; i++) {
          const cx = base + i * step + cardW / 2;
          const d = (cx - boxW / 2) / step; // 0 = dead centre, ±1 = next card
          const f = Math.exp(-(d * d) / 0.9);       // focus 0..1
          const scale = 1 + MAX_GROW * f;
          const fade = 0.38 + 0.62 * Math.exp(-(d * d) / 5);
          const el = kids[i];
          el.style.transform = `scale(${scale.toFixed(3)}) rotateY(${(-d * 9).toFixed(2)}deg)`;
          el.style.opacity = fade.toFixed(3);
          el.style.zIndex = String(Math.round(f * 10));
          el.style.setProperty("--f", f.toFixed(3));
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [cardW, loop, step]);

  // ---------- drag with the mouse / finger ----------
  function onPointerDown(e) {
    if (e.button !== undefined && e.button !== 0) return;
    const s = st.current;
    s.drag = true;
    s.moved = 0;
    s.v = 0;
    s.lastX = e.clientX;
    s.lastT = performance.now();
    box_cursor(true);

    const move = (ev) => {
      const dx = ev.clientX - s.lastX;
      const now = performance.now();
      const dt = Math.max(1, now - s.lastT) / 1000;
      s.moved += Math.abs(dx);
      s.x -= dx; // content follows the pointer
      s.v = s.v * 0.6 + (-dx / dt) * 0.4;
      s.lastX = ev.clientX;
      s.lastT = now;
    };
    const up = () => {
      s.drag = false;
      box_cursor(false);
      // a throw too fast for the loop is capped
      s.v = Math.max(-2200, Math.min(2200, s.v));
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  }

  const box_cursor = (grabbing) => boxRef.current?.classList.toggle("is-grabbing", grabbing);

  function open(service) {
    // a drag is not a click
    if (st.current.moved > 6) return;
    navigate(`/${service.slug}`);
  }

  return (
    <div
      className="svc-box"
      ref={boxRef}
      onPointerDown={onPointerDown}
      onMouseEnter={() => (st.current.hover = true)}
      onMouseLeave={() => (st.current.hover = false)}
      style={{ "--card-w": `${cardW}px`, "--gap": `${GAP}px` }}
    >
      <div className="svc-track" ref={trackRef}>
        {items.map((service, i) => (
          <div className="svc-slot" key={i}>
            <ServiceCard service={service} index={i} onOpen={open} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <Section id="services">
      <div className="wrap">
        <div className="eyebrow rv">
          <span className="line" />
          Capabilities
        </div>

        <SplitText as="h2" className="section-title" delay={120}>
          Our <span className="gradient-text">Services.</span>
        </SplitText>
      </div>

      <div className="svc-wrap rv" style={{ "--rd": "400ms" }}>
        <ServiceCarousel />
        <p className="svc-hint">Drag to explore &nbsp;·&nbsp; click a card to open it</p>
      </div>
    </Section>
  );
}
