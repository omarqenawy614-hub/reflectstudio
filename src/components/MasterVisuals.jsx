import { useEffect, useRef, useState } from "react";
import Section from "./Section";
import { artStyle } from "../utils/placeholderArt";

// ============================================================
// MAIN MASTER VISUAL IMAGES
// Put your images here:
// src/assets/master-visuals/featured-1.jpg
// src/assets/master-visuals/featured-2.jpg
// src/assets/master-visuals/featured-3.jpg
// src/assets/master-visuals/featured-4.jpg
// src/assets/master-visuals/featured-5.jpg
// ============================================================

import featuredVisual1 from "../assets/master-visuals/featured-1.jpg";
import featuredVisual2 from "../assets/master-visuals/featured-2.jpg";
import featuredVisual3 from "../assets/master-visuals/featured-3.jpg";
import featuredVisual4 from "../assets/master-visuals/featured-4.jpg";
import featuredVisual5 from "../assets/master-visuals/featured-5.jpg";

const FEATURED_VISUALS = [
  featuredVisual1,
  featuredVisual2,
  featuredVisual3,
  featuredVisual4,
  featuredVisual5
];

// ============================================================
// Tile names for the 3 scrolling rows below the intro
// ============================================================

const ROW_TILES = [
  ["Signal", "Bloom", "Vertex", "Nocturne", "Ionic", "Marrow"],
  ["Orbit", "Frame", "Echo", "Halo", "Wren", "Sable"],
  ["Drift", "Aurora", "Pulse", "Relic", "Ember", "Cove"],
];

const FEATURED = [
  "Campaign 01 — Nova",
  "Identity — Vessel",
  "Motion — Aurora"
];

// Row 1 & 3 drift left→right, row 2 drifts right→left.
const ROW_DIRECTIONS = ["right", "left", "right"];

// Motion tuning
const BASE_SPEED = 78;
const MAX_BOOST = 900;
const VELOCITY_TO_BOOST = 14;
const BOOST_DECAY = 0.91;

export default function MasterVisuals() {

  // ==========================================================
  // MASTER VISUAL FADE
  // ==========================================================

  const [activeVisual, setActiveVisual] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setActiveVisual((current) => {

        return (current + 1) % FEATURED_VISUALS.length;

      });

    }, 5000);

    return () => clearInterval(interval);

  }, []);


  // ==========================================================
  // THREE MOVING ROWS
  // ==========================================================

  const rowRefs = [
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  const offsets = useRef([0, 0, 0]);

  const loopWidths = useRef([0, 0, 0]);

  const boostRef = useRef(0);

  const lastScrollYRef = useRef(0);

  const lastTimeRef = useRef(0);

  const rafRef = useRef(null);

  const reducedMotionRef = useRef(false);


  useEffect(() => {

    reducedMotionRef.current =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;


    function measure() {

      rowRefs.forEach((ref, i) => {

        if (ref.current) {

          loopWidths.current[i] =
            ref.current.scrollWidth / 2;

        }

      });

    }


    measure();

    window.addEventListener(
      "resize",
      measure
    );


    lastScrollYRef.current =
      window.scrollY;

    lastTimeRef.current =
      performance.now();


    function frame(now) {

      const dt = Math.min(
        (now - lastTimeRef.current) / 1000,
        0.05
      );

      lastTimeRef.current = now;


      if (reducedMotionRef.current) {

        rafRef.current =
          requestAnimationFrame(frame);

        return;

      }


      const scrollY =
        window.scrollY;


      const scrollDelta =
        Math.abs(
          scrollY -
          lastScrollYRef.current
        );


      lastScrollYRef.current =
        scrollY;


      const instantBoost =
        Math.min(
          scrollDelta * VELOCITY_TO_BOOST,
          MAX_BOOST
        );


      boostRef.current =
        Math.max(
          instantBoost,
          boostRef.current * BOOST_DECAY
        );


      const speed =
        BASE_SPEED +
        boostRef.current;


      rowRefs.forEach((ref, i) => {

        const el =
          ref.current;

        const loopWidth =
          loopWidths.current[i];


        if (!el || !loopWidth) return;


        let offset =
          (
            offsets.current[i] +
            speed * dt
          ) % loopWidth;


        offsets.current[i] =
          offset;


        const tx =
          ROW_DIRECTIONS[i] === "right"
            ? offset - loopWidth
            : -offset;


        el.style.transform =
          `translateX(${tx}px)`;

      });


      rafRef.current =
        requestAnimationFrame(frame);

    }


    rafRef.current =
      requestAnimationFrame(frame);


    return () => {

      cancelAnimationFrame(
        rafRef.current
      );

      window.removeEventListener(
        "resize",
        measure
      );

    };

  }, []);


  // ==========================================================
  // SECTION
  // ==========================================================

  return (

    <Section id="master-visuals">

      <div className="wrap">

        <div className="mv-top">

          {/* ==================================================
              LEFT CONTENT
              ================================================== */}

          <div>

            <div className="eyebrow">

              <span className="line" />

              Selected Work

            </div>


            <h2 className="section-title">
  Our Latest{" "}
  <span
    style={{
      background: "linear-gradient(100deg, var(--primary), var(--rose))",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    Visuals
  </span>
</h2>


            <p className="section-sub">

              A running archive of key frames,
              key art and world-building imagery produced across every
              Reflect Studio engagement — the visuals that end up
              defining a brand.

            </p>

          </div>


          {/* ==================================================
              MAIN MASTER VISUAL CARD
              
              5 IMAGES WITH CROSSFADE
              ================================================== */}

          <div
            className="mv-frame-small"
            style={{
              position: "relative",
              overflow: "hidden"
            }}
          >

            {FEATURED_VISUALS.map((image, index) => (

              <img
                key={image}
                src={image}
                alt={`Featured visual ${index + 1}`}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  opacity:
                    activeVisual === index
                      ? 1
                      : 0,
                  transition:
                    "opacity 1.5s ease-in-out",
                  zIndex:
                    activeVisual === index
                      ? 2
                      : 1,
                  pointerEvents: "none"
                }}
              />

            ))}


            <span
              className="tag"
              style={{
                zIndex: 5
              }}
            >
              Master Visuals  — 2026
            </span>

          </div>

        </div>

      </div>


      {/* ======================================================
          THREE MOVING ROWS
          ====================================================== */}

      <div className="mv-rows-outer">

        <div className="mv-rows">

          {ROW_TILES.map((tiles, ri) => (

            <div
              className="mv-row"
              ref={rowRefs[ri]}
              key={ri}
            >

              {[...tiles, ...tiles].map(
                (name, i) => (

                  <div
                    {...artStyle(
                      "mv-tile",
                      null,
                      ri + i
                    )}
                    key={`${name}-${i}`}
                  >

                    <span className="tag">
                      {name}
                    </span>

                  </div>

                )

              )}

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

            <div
              {...artStyle(
                "mv-big",
                null,
                i
              )}
              key={name}
            >

              <div className="shade" />

              <div className="label">

                <div className="n">
                  0{i + 1}
                </div>

                <div className="t">
                  {name}
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </Section>

  );

}