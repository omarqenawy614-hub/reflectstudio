import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Section from "./Section";
import { artStyle } from "../utils/placeholderArt";

// ============================================================
// MAIN MASTER VISUAL IMAGES
// ============================================================

import featuredVisual1 from "../assets/master-visuals/featured-1.jpg";
import featuredVisual2 from "../assets/master-visuals/featured-2.jpg";
import featuredVisual3 from "../assets/master-visuals/featured-3.jpg";
import featuredVisual4 from "../assets/master-visuals/featured-4.jpg";
import featuredVisual5 from "../assets/master-visuals/featured-5.jpg";

// ============================================================
// BOTTOM FEATURED WORK IMAGES
// ============================================================

import workVisual1 from "../assets/master-visuals/work-01.jpg";
import workVisual2 from "../assets/master-visuals/work-02.jpg";
import workVisual3 from "../assets/master-visuals/work-03.jpg";

const FEATURED_VISUALS = [featuredVisual1, featuredVisual2, featuredVisual3, featuredVisual4, featuredVisual5];
const FEATURED_WORK = [workVisual1, workVisual2, workVisual3];

// ============================================================
// TWO MOVING ROWS
// ============================================================

const ROW_TILES = [
  ["Signal", "Bloom", "Vertex", "Nocturne", "Ionic", "Marrow"],
  ["Orbit", "Frame", "Echo", "Halo", "Wren", "Sable"],
];

const FEATURED = ["Campaign 01 — Nova", "Identity — Vessel", "Motion — Aurora"];

// ============================================================
// Row 1 → moves right
// Row 2 → moves left
// ============================================================

const ROW_DIRECTIONS = ["right", "left"];

// ============================================================
// Motion tuning
// ============================================================

const BASE_SPEED = 78;
const MAX_BOOST = 900;
const VELOCITY_TO_BOOST = 14;
const BOOST_DECAY = 0.91;

// ============================================================
// BOTTOM FEATURED CARD
// ============================================================

function FeaturedCard({ name, image, index }) {
  const cardRef = useRef(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const springX = useSpring(px, { stiffness: 220, damping: 22, mass: 0.4 });
  const springY = useSpring(py, { stiffness: 220, damping: 22, mass: 0.4 });

  const rotateX = useTransform(springY, [0, 1], [7, -7]);
  const rotateY = useTransform(springX, [0, 1], [-7, 7]);

  function handleMove(e) {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    px.set(x);
    py.set(y);

    cardRef.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  function handleLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={cardRef}
      className="mv-big"
      style={{ backgroundImage: `url(${image})`, rotateX, rotateY, transformPerspective: 900 }}
      whileHover={{ scale: 1.035, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="shade" />
      <div className="mv-big-glow" />

      <div className="label">
        <div className="n">0{index + 1}</div>
        <div className="t">{name}</div>
      </div>
    </motion.div>
  );
}

export default function MasterVisuals() {
  // ==========================================================
  // MASTER VISUAL FADE
  // ==========================================================

  const [activeVisual, setActiveVisual] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVisual((current) => (current + 1) % FEATURED_VISUALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ==========================================================
  // TWO MOVING ROWS
  // ==========================================================

  const rowRefs = [useRef(null), useRef(null)];
  const offsets = useRef([0, 0]);
  const loopWidths = useRef([0, 0]);
  const boostRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef = useRef(null);
  const reducedMotionRef = useRef(false);

  // ==========================================================
  // INFINITE MARQUEE
  // ==========================================================

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function measure() {
      rowRefs.forEach((ref, i) => {
        const el = ref.current;
        if (!el) return;
        loopWidths.current[i] = el.scrollWidth / 2;
      });
    }

    measure();
    window.addEventListener("resize", measure);

    lastScrollYRef.current = window.scrollY;
    lastTimeRef.current = performance.now();

    function frame(now) {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;

      if (reducedMotionRef.current) {
        rafRef.current = requestAnimationFrame(frame);
        return;
      }

      const scrollY = window.scrollY;
      const scrollDelta = Math.abs(scrollY - lastScrollYRef.current);
      lastScrollYRef.current = scrollY;

      const instantBoost = Math.min(scrollDelta * VELOCITY_TO_BOOST, MAX_BOOST);

      boostRef.current = Math.max(instantBoost, boostRef.current * BOOST_DECAY);

      const speed = BASE_SPEED + boostRef.current;

      rowRefs.forEach((ref, i) => {
        const el = ref.current;
        const loopWidth = loopWidths.current[i];

        if (!el || !loopWidth) return;

        let offset = offsets.current[i];

        if (ROW_DIRECTIONS[i] === "left") {
          offset += speed * dt;
          if (offset >= loopWidth) offset -= loopWidth;
        } else {
          offset -= speed * dt;
          if (offset <= -loopWidth) offset += loopWidth;
        }

        offsets.current[i] = offset;
        el.style.transform = `translate3d(${offset}px, 0, 0)`;
      });

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // ==========================================================
  // SECTION
  // ==========================================================

  return (
    <Section id="master-visuals">
      <div className="wrap">
        <div className="mv-top">
          <div>
            <div className="eyebrow"><span className="line" />Selected Work</div>

            <h2 className="section-title">
              Our Latest{" "}
              <span style={{ background: "linear-gradient(100deg, var(--primary), var(--rose))", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Visuals
              </span>
            </h2>

            <p className="section-sub">
              A running archive of key frames, key art and world-building imagery produced across every Reflect Studio engagement — the visuals that end up defining a brand.
            </p>
          </div>

          <div className="mv-frame-small" style={{ position: "relative", overflow: "hidden" }}>
            {FEATURED_VISUALS.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`Featured visual ${index + 1}`}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: activeVisual === index ? 1 : 0, transition: "opacity 1.5s ease-in-out", zIndex: activeVisual === index ? 2 : 1, pointerEvents: "none" }}
              />
            ))}

            <span className="tag" style={{ zIndex: 5 }}>Master Visuals — 2026</span>
          </div>
        </div>
      </div>

      {/* ======================================================
          TWO INFINITE MOVING ROWS
          ====================================================== */}

      <div className="mv-rows-outer">
        <div className="mv-rows">
          {ROW_TILES.map((tiles, ri) => (
            <div className="mv-row" ref={rowRefs[ri]} key={ri}>
              {tiles.map((name, i) => (
                <div {...artStyle("mv-tile", null, ri + i)} key={`first-${name}-${i}`}>
                  <span className="tag">{name}</span>
                </div>
              ))}

              {tiles.map((name, i) => (
                <div {...artStyle("mv-tile", null, ri + i)} key={`second-${name}-${i}`}>
                  <span className="tag">{name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================
          BOTTOM FEATURED CARDS
          ====================================================== */}

      <div className="wrap">
        <div className="mv-featured">
          {FEATURED.map((name, i) => (
            <FeaturedCard key={name} name={name} image={FEATURED_WORK[i]} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}