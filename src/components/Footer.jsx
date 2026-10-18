import { useLocation, useNavigate } from "react-router-dom";
import { siteConfig } from "../data/siteConfig";
import { services } from "../data/services";
import SocialIcon from "./SocialIcons";
import SplitText from "./SplitText";
import logoImage from "../assets/logo.png";
import { scrollToPanel } from "../utils/scrollToPanel";
import { useProjectModal } from "./ProjectModal";

// ============================================================
// FOOTER
// On the homepage it is the LAST full-screen panel (a huge moving
// "Let's Talk", a short call-to-action, then the link columns on
// the left and the brand / contact block on the right).
// On every other page it is a normal footer at the bottom.
// ============================================================

const serviceLinks = services.filter(
  (s, i, arr) => arr.findIndex((x) => x.name === s.name) === i
);

export default function Footer() {
  const navigate = useNavigate();
  const isHome = useLocation().pathname === "/";
  const { openProject } = useProjectModal();

  function goSection(e, to) {
    e.preventDefault();
    const id = to.replace("/#", "");
    if (isHome) {
      scrollToPanel(id);
    } else {
      navigate(to);
    }
  }

  const marquee = Array.from({ length: 6 }, (_, i) => (
    <span key={i} className="ft-big-item">
      Let&rsquo;s Talk<i className="ft-big-dot" />
    </span>
  ));

  return (
    <footer
      id="footer"
      className={isHome ? "panel footer-panel" : "footer-plain"}
      {...(isHome ? { "data-panel": true } : {})}
    >
      <div className={isHome ? "panel-inner" : undefined}>
        {/* ---------- big moving text ---------- */}
        <div className="ft-big" aria-hidden="true">
          <div className="ft-big-track">{marquee}</div>
        </div>

        {/* ---------- call to action ---------- */}
        <div className="ft-cta">
          <SplitText as="h3" className="ft-cta-title" delay={100}>
            Have a project in mind?
          </SplitText>
          <p className="rv" style={{ "--rd": "350ms" }}>
            Tell us about your brand and we will reply within one working day.
          </p>
          <a
            href="#start-project"
            className="btn-primary rv"
            style={{ "--rd": "500ms" }}
            onClick={(e) => {
              e.preventDefault();
              openProject();
            }}
          >
            Start a project →
          </a>
        </div>

        {/* ---------- columns: links left, brand right ---------- */}
        <div className="wrap ft-main rv" style={{ "--rd": "600ms" }}>
          <div className="ft-links">
            <div className="footer-col">
              <h4>Studio</h4>
              {siteConfig.footerNav.map((item) => (
                <a href={item.to} key={item.label} onClick={(e) => goSection(e, item.to)}>
                  {item.label}
                </a>
              ))}
            </div>

            <div className="footer-col">
              <h4>Services</h4>
              {serviceLinks.map((s) => (
                <a
                  href={`/${s.slug}`}
                  key={s.slug}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/${s.slug}`);
                  }}
                >
                  {s.name}
                </a>
              ))}
            </div>

            <div className="footer-col">
              <h4>Contact</h4>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noreferrer">
                {siteConfig.whatsappDisplay}
              </a>
              <a
                href="#start-project"
                onClick={(e) => {
                  e.preventDefault();
                  openProject();
                }}
              >
                {siteConfig.location}, Egypt — Start a project
              </a>
            </div>
          </div>

          <div className="ft-brand">
            <a
              href="/"
              className="footer-logo"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              <img src={logoImage} alt={siteConfig.name} className="footer-logo-image" />
            </a>
            <p>{siteConfig.description}</p>
            <div className="social-row">
              {siteConfig.socials
                .filter((s) => s.href)
                .map((s) => (
                  <a
                    href={s.href}
                    className="social-pill"
                    title={s.name}
                    aria-label={s.name}
                    key={s.name}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <SocialIcon name={s.name} />
                  </a>
                ))}
            </div>
          </div>
        </div>

        {/* ---------- bottom bar ---------- */}
        <div className="wrap">
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </span>
            <span>Built in Cairo, for the world.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
