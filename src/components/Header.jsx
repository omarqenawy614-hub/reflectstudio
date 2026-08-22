import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { siteConfig } from "../data/siteConfig";
import logoImage from "../assets/logo.png";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const [active, setActive] = useState("home");

  // ============================================================
  // LOGO SIZE
  // غيّر الرقم ده فقط للتحكم في عرض الشعار
  // ============================================================
  const LOGO_WIDTH = 200;

  // Track which homepage section is in view so its nav pill fills in.
  useEffect(() => {
    if (!isHome) return;

    const ids = siteConfig.nav.map((n) =>
      n.to.replace("/#", "")
    );

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    function onScroll() {
      let current = sections[0];

      sections.forEach((sec) => {
        if (
          sec.getBoundingClientRect().top <=
          window.innerHeight * 0.4
        ) {
          current = sec;
        }
      });

      if (current) {
        setActive(current.id);
      }
    }

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    onScroll();

    return () =>
      window.removeEventListener(
        "scroll",
        onScroll
      );
  }, [isHome]);

  function goTo(to) {
    const sectionId = to.replace("/#", "");

    if (isHome) {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({
          behavior: "smooth",
        });
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
          href="/#contact"
          className="nav-cta"
          onClick={(e) => {
            e.preventDefault();
            goTo("/#contact");
          }}
        >
          Start a project
        </a>

      </div>
    </header>
  );
}