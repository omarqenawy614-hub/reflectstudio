import logoImage from "../assets/logo.png";
import { siteConfig } from "../data/siteConfig";

export default function ComingSoon() {
  return (
    <div className="coming-soon">
      <img src={logoImage} alt={siteConfig.name} className="cs-logo" />
      <div className="cs-eyebrow">Mobile version</div>
      <h1>Coming Soon</h1>
      <p>
        We're crafting a better mobile experience.
        <br />
        For now, please visit us from a desktop or laptop.
      </p>
      <a className="btn-primary" href={`https://wa.me/${siteConfig.whatsappNumber}`}>
        Contact us on WhatsApp
      </a>
    </div>
  );
}