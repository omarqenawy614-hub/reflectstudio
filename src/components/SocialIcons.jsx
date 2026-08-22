// Simple line-icon set for the social links used across the site.
// Add a new platform by adding a key here and a matching entry in
// src/data/siteConfig.js -> socials.
export const ICONS = {
  Facebook: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M13.5 22V13.5H16L16.4 10.5H13.5V8.7C13.5 7.8 13.8 7.2 15.1 7.2H16.5V4.5C16.2 4.5 15.2 4.4 14.1 4.4C11.7 4.4 10.1 5.9 10.1 8.4V10.5H7.5V13.5H10.1V22H13.5Z"
        fill="currentColor"
      />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.6" cy="7.4" r="1.1" fill="currentColor" />
    </svg>
  ),
  Snapchat: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M12 4.5C9.5 4.5 8 6.3 8 8.7C8 9.6 8.1 10.3 8.1 10.3C8.1 10.3 6.8 10.8 6 11.6C5.6 12 5.9 12.6 6.4 12.7C7 12.9 7.5 13 7.5 13.4C7.5 14 6.6 15.3 5 15.7C4.7 15.8 4.7 16.2 5.1 16.4C5.6 16.6 6.4 16.7 6.6 17C6.8 17.3 6.6 17.8 6.9 18C7.4 18.3 8.8 17.9 9.7 18.4C10.5 18.9 11 19.5 12 19.5C13 19.5 13.5 18.9 14.3 18.4C15.2 17.9 16.6 18.3 17.1 18C17.4 17.8 17.2 17.3 17.4 17C17.6 16.7 18.4 16.6 18.9 16.4C19.3 16.2 19.3 15.8 19 15.7C17.4 15.3 16.5 14 16.5 13.4C16.5 13 17 12.9 17.6 12.7C18.1 12.6 18.4 12 18 11.6C17.2 10.8 15.9 10.3 15.9 10.3C15.9 10.3 16 9.6 16 8.7C16 6.3 14.5 4.5 12 4.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  ),
  TikTok: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M14 4V14.5C14 15.9 12.9 17 11.5 17C10.1 17 9 15.9 9 14.5C9 13.1 10.1 12 11.5 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M14 4C14 6 15.8 7.7 18 7.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  WhatsApp: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M6 18L7 14.5C6.4 13.4 6 12.2 6 11C6 7.1 9.1 4 13 4C16.9 4 20 7.1 20 11C20 14.9 16.9 18 13 18C11.8 18 10.6 17.6 9.6 17L6 18Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 9.5C10.5 9.5 11 11.5 13 12.5C13.3 12.6 14.5 11.5 14.5 11.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  Email: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="4" y="6" width="16" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 7.5L12 13L19 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function SocialIcon({ name }) {
  return ICONS[name] || null;
}
