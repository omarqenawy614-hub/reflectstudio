import { useNavigate } from "react-router-dom";
import { siteConfig } from "../data/siteConfig";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
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
            <p>{siteConfig.description}</p>
          </div>

          <div className="footer-col">
            <h4>Studio</h4>
            {siteConfig.nav.map((item) => (
              <a
                href={item.to}
                key={item.label}
                onClick={(e) => {
                  e.preventDefault();
                  const id = item.to.replace("/#", "");
                  if (window.location.pathname === "/") {
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    navigate(item.to);
                  }
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="footer-col">
            <h4>Connect</h4>
            {siteConfig.socials
              .filter((s) => s.href)
              .map((s) => (
                <a href={s.href} key={s.name} target="_blank" rel="noreferrer">
                  {s.name}
                </a>
              ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span>
          <span>Built in Cairo, for the world.</span>
        </div>
      </div>
    </footer>
  );
}
