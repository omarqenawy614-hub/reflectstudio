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
  location: "Cairo / Remote",
  email: "hello@reflectstudio.com",

  // Nav items shown as pills in the header. `to` matches a section id
  // on the homepage (scrolled to) or a route path (navigated to).
  nav: [
    { label: "Home", to: "/#home" },
    { label: "Master Visuals", to: "/#master-visuals" },
    { label: "What We Do", to: "/#what-we-do" },
    { label: "Our Clients", to: "/#our-clients" },
    { label: "Contact", to: "/#contact" },
  ],

  // Social links — swap the `href` values for your real profiles.
  // Set `href` to "" to hide an icon from the site.
  socials: [
    { name: "Facebook", href: "https://facebook.com" },
    { name: "Instagram", href: "https://instagram.com" },
    { name: "Snapchat", href: "https://snapchat.com" },
    { name: "TikTok", href: "https://tiktok.com" },
    { name: "WhatsApp", href: "https://wa.me/000000000" },
    { name: "Email", href: "mailto:hello@reflectstudio.com" },
  ],
};
