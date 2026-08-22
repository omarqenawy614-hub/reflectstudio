import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import Section from "./Section";
import { services } from "../data/services";
import { artStyle } from "../utils/placeholderArt";

// ============================================================
// SECTION ENTRANCE ANIMATION
// ============================================================

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 64,
    scale: 0.94,
    rotate: -1.2,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,

    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ============================================================
// DESKTOP / MOUSE DETECTION
// ============================================================

const supportsFineTilt =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// ============================================================
// CATEGORY CARD
// ============================================================

function CategoryCard({ service, index }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  // ----------------------------------------------------------
  // Pointer position
  // ----------------------------------------------------------

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  // ----------------------------------------------------------
  // Smooth spring movement
  // ----------------------------------------------------------

  const springX = useSpring(px, {
    stiffness: 220,
    damping: 22,
    mass: 0.4,
  });

  const springY = useSpring(py, {
    stiffness: 220,
    damping: 22,
    mass: 0.4,
  });

  // ----------------------------------------------------------
  // 3D card tilt
  // ----------------------------------------------------------

  const rotateX = useTransform(
    springY,
    [0, 1],
    [7, -7]
  );

  const rotateY = useTransform(
    springX,
    [0, 1],
    [-7, 7]
  );

  // ----------------------------------------------------------
  // Pointer movement
  // ----------------------------------------------------------

  function handleMove(e) {
    if (!supportsFineTilt || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x =
      (e.clientX - rect.left) / rect.width;

    const y =
      (e.clientY - rect.top) / rect.height;

    px.set(x);
    py.set(y);

    // Used by the CSS glow.
    cardRef.current.style.setProperty(
      "--mx",
      `${e.clientX - rect.left}px`
    );

    cardRef.current.style.setProperty(
      "--my",
      `${e.clientY - rect.top}px`
    );
  }

  // ----------------------------------------------------------
  // Reset card when mouse leaves
  // ----------------------------------------------------------

  function handleLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  // ----------------------------------------------------------
  // Render
  // ----------------------------------------------------------

  return (
    <motion.a
      ref={cardRef}
      href={`/${service.slug}`}
      className="category-card"
      variants={cardVariants}
      style={
        supportsFineTilt
          ? {
              rotateX,
              rotateY,
              transformPerspective: 900,
            }
          : undefined
      }
      whileHover={{
        scale: 1.035,
        transition: {
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1],
        },
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={(e) => {
        e.preventDefault();
        navigate(`/${service.slug}`);
      }}
    >

      {/* =====================================================
          CARD BACKGROUND
          JPG / WEBP / normal category image
          ===================================================== */}

      <div
        {...artStyle(
          "category-card-bg",
          service.image,
          index
        )}
      />

      {/* =====================================================
          OPTIONAL PNG ARTWORK
          
          Only the categories that have:
          
          artwork: somePngImage
          
          will render this element.
          
          The other JPG categories are completely unaffected.
          ===================================================== */}

      {service.artwork && (
        <div className="category-card-artwork-wrap">
          <img
            className="category-card-artwork"
            src={service.artwork}
            alt=""
            draggable="false"
          />
        </div>
      )}

      {/* =====================================================
          CARD SHADE
          ===================================================== */}

      <div className="category-card-shade" />

      {/* =====================================================
          CARD GLOW
          ===================================================== */}

      <div className="category-card-glow" />

      {/* =====================================================
          CARD LABEL
          ===================================================== */}

      <div className="category-card-label">
        <span className="n">
          0{index + 1}
        </span>

        <span className="t">
          {service.name}
        </span>
      </div>

    </motion.a>
  );
}

// ============================================================
// SERVICES SECTION
// ============================================================

export default function ServicesSection() {
  return (
    <Section id="services">

      <div className="wrap">

        <div className="eyebrow">
          <span className="line" />
          Capabilities
        </div>

        <h2 className="section-title">
  Our <span className="gradient-text">Services.</span> </h2>

      </div>

      <motion.div
        className="category-grid wrap-wide"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.2,
        }}
      >

        {services.map((service, index) => (
          <CategoryCard
            service={service}
            index={index}
            key={service.slug}
          />
        ))}

      </motion.div>

    </Section>
  );
}