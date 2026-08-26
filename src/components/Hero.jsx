import { siteConfig } from "../data/siteConfig";
import heroBanner from "../assets/Hero Banner.png";

export default function Hero() {
  return (
    <section id="home" className="hero">

      {/* ==================================================
          HERO BANNER
          ================================================== */}
      <div
        className="hero-atmosphere has-image"
        style={{
          backgroundImage: `url("${heroBanner}")`,
        }}
      />

      <div className="hero-overlay" />
      <div className="hero-fade" />

      {/* ==================================================
          HERO CONTENT
          يظهر في منتصف الـ Hero فوق صورة الرائد
          ================================================== */}
      <div className="wrap hero-content">

        {/* السطر التعريفي */}
        <div className="hero-eyebrow">
          <span className="line" />
          Marketing Agency — {siteConfig.location}
        </div>

        {/* العنوان الرئيسي */}
        <h1>
          We build the {""}
          <em className="">
            Reflection
          </em>
          <span className="hero-title-small">
    your brand hasn't seen yet.
  </span>
        </h1>

        {/* النص الصغير أسفل العنوان */}
        <p className="hero-sub">
          Everything your business needs to stand out — visual identity and
          advertising campaigns to websites and digital marketing.
        </p>

        {/* ==================================================
            HERO ACTIONS
            ================================================== */}
        <div className="hero-actions">

          <a
            href="#contact"
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Start a project →
          </a>

          <a
            href="#master-visuals"
            className="btn-ghost"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("master-visuals")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View the work
          </a>

        </div>

      </div>

      {/* ==================================================
          SCROLL HINT
          ================================================== */}
      <div className="scroll-hint">
        <span>Scroll</span>
        <span className="stick" />
      </div>

    </section>
  );
}