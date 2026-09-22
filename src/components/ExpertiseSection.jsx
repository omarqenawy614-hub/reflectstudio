import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Section from "./Section";

// ============================================================
// صور الخدمات PNG
// ضع ملفات PNG داخل:
// src/assets/expertise/
// ============================================================

import webDesignImg from "../assets/expertise/web-design.png";
import graphicDesignImg from "../assets/expertise/graphic-design.png";
import mediaProductionImg from "../assets/expertise/media-production.png";
import marketingImg from "../assets/expertise/marketing.png";

// ============================================================
// بيانات الخدمات
// ============================================================

const expertise = [
  {
    title: "Web Design & Development",
    description:
      "Websites and digital experiences designed to look sharp, feel intuitive and perform beautifully.",
    image: webDesignImg,
  },
  {
    title: "Graphic Design",
    description:
      "Visual systems, campaign assets and creative design built to make your brand impossible to ignore.",
    image: graphicDesignImg,
  },
  {
    title: "Media Production",
    description:
      "Brand films, campaign content and visual stories created to capture attention and leave an impression.",
    image: mediaProductionImg,
  },
  {
    title: "Marketing",
    description:
      "Creative marketing campaigns that connect your brand with the right audience and drive meaningful growth.",
    image: marketingImg,
  },
];

// ============================================================
// حركة ظهور الخدمات
// ============================================================

const expertiseVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const expertiseItemVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ============================================================
// تحديد دعم الماوس
// ============================================================

const supportsFineTilt =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// ============================================================
// كارت الخدمة
// ============================================================

function ExpertiseCard({ item }) {
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
  // 3D Tilt
  // ----------------------------------------------------------

  const rotateX = useTransform(
    springY,
    [0, 1],
    [4, -4]
  );

  const rotateY = useTransform(
    springX,
    [0, 1],
    [-4, 4]
  );

  // ----------------------------------------------------------
  // حركة الماوس
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
  }

  // ----------------------------------------------------------
  // إعادة الصورة للوضع الطبيعي
  // ----------------------------------------------------------

  function handleLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  // ----------------------------------------------------------
  // Render
  // ----------------------------------------------------------

  return (
    <motion.article
      ref={cardRef}
      className="expertise-card"
      variants={expertiseItemVariants}
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
        scale: 1.025,
        transition: {
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1],
        },
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >

      {/* =====================================================
          صورة الخدمة PNG
          ===================================================== */}

      <div className="expertise-image-wrap">
        <img
          src={item.image}
          alt={item.title}
          className="expertise-image"
          draggable="false"
        />
      </div>

      {/* =====================================================
          النص خارج الصورة
          ===================================================== */}

      <div className="expertise-card-content">
        <h3>{item.title}</h3>

        <p>{item.description}</p>
      </div>

    </motion.article>
  );
}

// ============================================================
// SERVICES / EXPERTISE SECTION
// ============================================================

export default function ExpertiseSection() {
  return (
    <Section id="expertise">

      <div className="wrap">

        {/* ==================================================
            عنوان القسم
            ================================================== */}

        <div className="eyebrow">
          <span className="line" />
          Capabilities
        </div>

        <h2 className="section-title">
          Our <span className="gradient-text">Expertise.</span>
        </h2>

      </div>

      {/* =====================================================
          قائمة الخدمات
          ===================================================== */}

      <motion.div
        className="expertise-list wrap"
        variants={expertiseVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
      >

        {expertise.map((item) => (
          <ExpertiseCard
            key={item.title}
            item={item}
          />
        ))}

      </motion.div>

    </Section>
  );
  
}
