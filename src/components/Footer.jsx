import { useNavigate } from "react-router-dom";
import { siteConfig } from "../data/siteConfig";
import logoImage from "../assets/logo.png";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">

          {/* ==================================================
              FOOTER BRAND
              ================================================== */}

          <div className="footer-brand">

            <a
              href="/"
              className="footer-logo"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              <img
                src={logoImage}
                alt={siteConfig.name}
                className="footer-logo-image"
              />
            </a>

            <p>{siteConfig.description}</p>

          </div>


          {/* ==================================================
              STUDIO
              ================================================== */}

          <div className="footer-col">

            <h4>Studio</h4>

            {siteConfig.nav.map((item) => (

              <a
                href={item.to}
                key={item.label}
                onClick={(e) => {

                  e.preventDefault();

                  const id =
                    item.to.replace("/#", "");

                  if (
                    window.location.pathname === "/"
                  ) {

                    document
                      .getElementById(id)
                      ?.scrollIntoView({
                        behavior: "smooth"
                      });

                  } else {

                    navigate(item.to);

                  }

                }}
              >

                {item.label}

              </a>

            ))}

          </div>


          {/* ==================================================
              CONNECT
              ================================================== */}

          <div className="footer-col">

            <h4>Connect</h4>

            {siteConfig.socials
              .filter((s) => s.href)
              .map((s) => (

                <a
                  href={s.href}
                  key={s.name}
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.name}
                </a>

              ))}

          </div>

        </div>


        {/* ==================================================
            FOOTER BOTTOM
            ================================================== */}

        <div className="footer-bottom">

          <span>
            © {new Date().getFullYear()}{" "}
            {siteConfig.name}. All rights reserved.
          </span>

          <span>
            Built in Cairo, for the world.
          </span>

        </div>

      </div>
    </footer>
  );
}