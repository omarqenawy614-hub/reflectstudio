import Section from "./Section";
import SocialIcon from "./SocialIcons";
import { siteConfig } from "../data/siteConfig";

export default function Contact() {
  return (
    <Section id="contact">
      <div className="wrap contact-inner">
        <div className="eyebrow">
          <span className="line" />
          Get In Touch
          <span className="line" />
        </div>
        <h2>
          Let's work
          <br />
          <span className="accent">together.</span>
        </h2>
        <p className="section-sub">
          Tell us about the brand, the problem, or the world you're trying to build. We reply within one
          working day.
        </p>
        <a href={`mailto:${siteConfig.email}`} className="contact-email">
          {siteConfig.email}
        </a>
        <div className="social-row">
          {siteConfig.socials
            .filter((s) => s.href)
            .map((s) => (
              <a href={s.href} className="social-pill" title={s.name} key={s.name} target="_blank" rel="noreferrer">
                <SocialIcon name={s.name} />
              </a>
            ))}
        </div>
      </div>
    </Section>
  );
}
