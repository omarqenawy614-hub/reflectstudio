// ============================================================
// SITE CONFIG
// The single place to change global settings: nav items, social
// links, contact details and studio blurb. Brand COLORS live in
// src/styles/global.css as CSS variables (--primary, --rose, etc.)
// so every component stays in sync automatically.
// ============================================================

export const siteConfig = {
  name: "Reflect Studio",
  shortName: "Reflect",
  tagline: "We build the reflection your brand hasn't seen yet.",
  description:
    "Reflect Studio is an independent creative studio working across visual identity, motion, campaigns and digital worlds — for brands that refuse to look like everyone else.",
  location: "Cairo",
  email: "omaralqenawy12@gmail.com",
  // WhatsApp number: country code + number, digits only (no "+", spaces or dashes).
  // Used by the contact form and the floating "Chat with us" button.
  whatsappNumber: "201113419906",
  whatsappDisplay: "+20 111 341 9906",

  // Nav items shown as pills in the header. `to` matches a section id
  // on the homepage (scrolled to) or a route path (navigated to).
  nav: [
    { label: "Home", to: "/#home" },
    { label: "Services", to: "/#services" },
    { label: "Visuals", to: "/#master-visuals" },
    { label: "What We Do", to: "/#what-we-do" },
    { label: "Clients", to: "/#our-clients" },
    { label: "Don't Wait", to: "/#why-us" }, // the countdown screen
    { label: "Why Us", to: "/#why-cards" }, // the 4 cards screen
    { label: "Contact", to: "/#footer" },
  ],

  // Shortcuts listed in the footer — the same screens as the header,
  // without "Contact" (you are already there).
  footerNav: [
    { label: "Home", to: "/#home" },
    { label: "Our Services", to: "/#services" },
    { label: "Visuals", to: "/#master-visuals" },
    { label: "What We Do", to: "/#what-we-do" },
    { label: "Our Clients", to: "/#our-clients" },
    { label: "Don't Wait", to: "/#why-us" },
    { label: "Why Choose Us", to: "/#why-cards" },
  ],

  // Social links — swap the `href` values for your real profiles.
  // Set `href` to "" to hide an icon from the site.
  socials: [
    { name: "Facebook", href: "https://www.facebook.com/Reflect.Studio0" },
    { name: "Instagram", href: "https://www.instagram.com/omar_alqenawy/" },
    { name: "Snapchat", href: "https://snapchat.com" },
    { name: "TikTok", href: "https://tiktok.com" },
    { name: "WhatsApp", href: "https://wa.me/201113419906" },
    { name: "Email", href: "mailto:omaralqenawy12@gmail.com" },
  ],
};
