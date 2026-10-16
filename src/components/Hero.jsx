import { siteConfig } from "../data/siteConfig";
import { stats } from "../data/clients";
import astronaut from "../assets/astronaut.webp";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-bg" />

      {/* ==================================================
          HERO CONTENT — النص على الشمال، الرائد على اليمين
          ================================================== */}
      <div className="wrap hero-grid">
        <div className="hero-copy">
          {/* السطر التعريفي */}
          <div className="hero-eyebrow">
            <span className="line" />
            Marketing Agency — {siteConfig.location}
          </div>

          {/* العنوان الرئيسي */}
          <h1>
            We build the {""}
            <em className="">Reflection</em>
            <span className="hero-title-small">your brand hasn't seen yet.</span>
          </h1>

          {/* النص الصغير أسفل العنوان */}
          <p className="hero-sub">
            Everything your business needs to stand out — visual identity and advertising campaigns to
            websites and digital marketing.
          </p>

          {/* HERO ACTIONS */}
          <div className="hero-actions">
            <a
              href="#contact"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Start a project →
            </a>

            <a
              href="#master-visuals"
              className="btn-ghost"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("master-visuals")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View the work
            </a>
          </div>

          {/* الأرقام (من src/data/clients.js → stats) */}
          <ul className="hero-proof">
            {stats.slice(0, 3).map((s) => (
              <li key={s.label}>
                <strong>
                  {s.num}
                  {s.suffix}
                </strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* صورة الرائد */}
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-orb" />
          <img src={astronaut} alt="" className="hero-astronaut" draggable="false" fetchpriority="high" />
        </div>
      </div>

      {/* SCROLL HINT */}
      <div className="scroll-hint">
        <span>Scroll</span>
        <span className="stick" />
      </div>
    </section>
  );
}
