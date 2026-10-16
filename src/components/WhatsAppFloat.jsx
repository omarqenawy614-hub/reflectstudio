import { siteConfig } from "../data/siteConfig";

// Floating "chat" pill — the fastest path to a lead in this market.
export default function WhatsAppFloat() {
  const text = encodeURIComponent(`Hello ${siteConfig.name}! I'd like to talk about a project.`);
  return (
    <a
      className="wa-float"
      href={`https://wa.me/${siteConfig.whatsappNumber}?text=${text}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="dot" />
      <span className="wa-label">Chat with us</span>
    </a>
  );
}
