import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { siteConfig } from "../data/siteConfig";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const [active, setActive] = useState("home");

  // Track which homepage section is in view so its nav pill fills in.
  useEffect(() => {
    if (!isHome) return;
    const ids = siteConfig.nav.map((n) => n.to.replace("/#", ""));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);

    function onScroll() {
      let current = sections[0];
      sections.forEach((sec) => {
        if (sec.getBoundingClientRect().top <= window.innerHeight * 0.4) current = sec;
      });
      if (current) setActive(current.id);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  function goTo(to) {
    const sectionId = to.replace("/#", "");
    if (isHome) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(to);
    }
  }

  return (
    <header className="site-header">
      <div className="wrap nav-inner">
        <a
          href="/"
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <span className="dot" />
          {siteConfig.shortName.toUpperCase()}
          <span className="faint">/STUDIO</span>
        </a>

        <nav className="pills">
          {siteConfig.nav.map((item) => {
            const sectionId = item.to.replace("/#", "");
            const isActive = isHome && active === sectionId;
            return (
              <a
                key={item.label}
                href={item.to}
                className={isActive ? "active" : "inactive"}
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
