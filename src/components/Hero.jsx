import { siteConfig } from "../data/siteConfig";

// REPLACE ME: set an image path here (e.g. from src/assets/hero/)
// to swap the generated atmosphere for a real cinematic photograph.
// Example: import heroImg from "../assets/hero/hero.jpg";
const HERO_IMAGE = null;

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div
        className={`hero-atmosphere${HERO_IMAGE ? " has-image" : ""}`}
        style={HERO_IMAGE ? { backgroundImage: `url(${HERO_IMAGE})` } : undefined}
      />
      <div className="hero-overlay" />
      <div className="hero-fade" />

      <div className="wrap hero-content">
        <div className="hero-eyebrow">
          <span className="line" />
          Marketing Agency — {siteConfig.location}
        </div>
        <h1>
          We build the <em>Reflection</em> your brand hasn't seen.
        </h1>
        <p className="hero-sub">{siteConfig.description}</p>
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
      </div>

      <div className="scroll-hint">
        <span>Scroll</span>
        <span className="stick" />
      </div>
    </section>
  );
}
