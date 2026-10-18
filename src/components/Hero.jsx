import { siteConfig } from "../data/siteConfig";
import { stats } from "../data/clients";
import astronaut from "../assets/astronaut.webp";
import Section from "./Section";
import { scrollToPanel } from "../utils/scrollToPanel";
import { useProjectModal } from "./ProjectModal";
import SplitText from "./SplitText";

export default function Hero() {
  const { openProject } = useProjectModal();
  return (
    <Section id="home" className="hero">
      <div className="hero-bg" />

      {/* ==================================================
          HERO CONTENT — النص على الشمال، الرائد على اليمين
          ================================================== */}
      <div className="wrap hero-grid">
        <div className="hero-copy">
          {/* السطر التعريفي */}
          <div className="hero-eyebrow rv" style={{ "--rd": "0ms" }}>
            <span className="line" />
            Marketing Agency — {siteConfig.location}
          </div>

          {/* العنوان الرئيسي */}
          <SplitText as="h1" delay={250}>
            We build the <span className="hero-em">Reflection</span>
          </SplitText>
          <SplitText as="p" className="hero-title-small" delay={650}>
            your brand hasn't seen yet.
          </SplitText>

          {/* النص الصغير أسفل العنوان */}
          <p className="hero-sub rv" style={{ "--rd": "900ms" }}>
            Everything your business needs to stand out — visual identity and advertising campaigns to
            websites and digital marketing.
          </p>

          {/* HERO ACTIONS */}
          <div className="hero-actions rv" style={{ "--rd": "1050ms" }}>
            <a
              href="#contact"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                openProject();
              }}
            >
              Start a project →
            </a>

            <a
              href="#master-visuals"
              className="btn-ghost"
              onClick={(e) => {
                e.preventDefault();
                scrollToPanel("master-visuals");
              }}
            >
              View the work
            </a>
          </div>

          {/* الأرقام (من src/data/clients.js → stats) */}
          <ul className="hero-proof rv" style={{ "--rd": "1200ms" }}>
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
        <div className="hero-visual rv rv-fade" style={{ "--rd": "500ms" }} aria-hidden="true">
          <div className="hero-orb" />
          <img src={astronaut} alt="" className="hero-astronaut" draggable="false" fetchpriority="high" />
        </div>
      </div>

      {/* SCROLL HINT */}
      <div className="scroll-hint rv" style={{ "--rd": "1500ms" }}>
        <span>Scroll</span>
        <span className="stick" />
      </div>
    </Section>
  );
}
