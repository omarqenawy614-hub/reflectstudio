import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { siteConfig } from "../data/siteConfig";
import logoImage from "../assets/logo.png";
import { scrollToPanel } from "../utils/scrollToPanel";
import { useProjectModal } from "./ProjectModal";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const { openProject } = useProjectModal();
  const [active, setActive] = useState("home");

  // ============================================================
  // LOGO SIZE
  // غيّر الرقم ده فقط للتحكم في عرض الشعار
  // ============================================================
  const LOGO_WIDTH = 200;

  // The panel engine (usePanels.js) tells us which screen is showing,
  // so the matching pill is filled in.
  useEffect(() => {
    if (!isHome) return;
    const onChange = (e) => setActive(e.detail);
    window.addEventListener("panelchange", onChange);
    return () => window.removeEventListener("panelchange", onChange);
  }, [isHome]);

  function goTo(to) {
    const sectionId = to.replace("/#", "");

    if (isHome) {
      scrollToPanel(sectionId);
    } else {
      navigate(to);
    }
  }

  return (
    <header className="site-header">
      <div className="wrap nav-inner">

        {/* ==================================================
            REAL LOGO
            الضغط على اللوجو يرجع للـ Home
            ================================================== */}

        <a
          href="/"
          className="logo"
          onClick={(e) => {
            e.preventDefault();

            if (isHome) {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            } else {
              navigate("/");
            }
          }}
          aria-label="Reflect Studio — Home"
        >
          <img
            src={logoImage}
            alt="Reflect Studio"
            className="logo-image"
            style={{
              width: `${LOGO_WIDTH}px`,
              height: "auto",
              maxHeight: "60px",
              objectFit: "contain",
            }}
          />
        </a>

        {/* ==================================================
            NAVIGATION
            ================================================== */}

        <nav className="pills">
          {siteConfig.nav.map((item) => {
            const sectionId =
              item.to.replace("/#", "");

            const isActive =
              isHome &&
              active === sectionId;

            return (
              <a
                key={item.label}
                href={item.to}
                className={
                  isActive
                    ? "active"
                    : "inactive"
                }
                onClick={(e) => {
                  e.preventDefault();
                  goTo(item.to);
                }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* ==================================================
            CTA
            ================================================== */}

        <a
          href="#start-project"
          className="nav-cta"
          onClick={(e) => {
            e.preventDefault();
            openProject();
          }}
        >
          Start a project
        </a>

      </div>
    </header>
  );
}