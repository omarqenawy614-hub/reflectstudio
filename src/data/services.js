// ============================================================
// SERVICES / CATEGORIES
// ============================================================

import socialMediaImg from "../assets/categories/social-media.jpg";
import videosImg from "../assets/categories/videos.jpg";
import visualIdentityImg from "../assets/categories/visual-identity.jpg";
import motionGraphicsImg from "../assets/categories/motion-graphics.jpg";
import websitesImg from "../assets/categories/websites.jpg";

export const services = [
  {
    slug: "social-media",
    name: "Graphic Design",
    blurb: "Content systems built for campaigns, social and visual communication",
    image: socialMediaImg,
  },

  {
    slug: "visual-identity",
    name: "Branding & Identity",
    blurb: "Logos, systems, guidelines and complete brand identities",
    image: visualIdentityImg,
  },

  {
    slug: "motion-graphics",
    name: "Video & Motion",
    blurb: "Title sequences, edits, animated systems and motion content",
    image: motionGraphicsImg,
  },

  {
    slug: "videos",
    name: "Video & Motion",
    blurb: "Brand film, product and campaign video",
    image: videosImg,
  },

  {
    slug: "websites",
    name: "Web Development",
    blurb: "Interactive, performant digital experiences",
    image: websitesImg,
  },
];