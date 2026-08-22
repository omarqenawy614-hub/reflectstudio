// ============================================================
// SERVICES / CATEGORIES
// Each entry becomes: a portrait category card on the homepage, a
// row in "What We Do" (edited separately in WhatWeDo.jsx), a nav-able
// category, and its own page at /<slug> listing every project tagged
// with that category.
//
// `image`: path to that category's card background.
//
// To add a new service/category: add an object here. To add a
// project to it, add an entry with a matching `category` slug in
// src/data/projects.js.
// ============================================================

import masterVisualsImg from "../assets/categories/master-visuals.jpg";
import socialMediaImg from "../assets/categories/social-media.jpg";
import videosImg from "../assets/categories/videos.jpg";
import visualIdentityImg from "../assets/categories/visual-identity.png";

export const services = [
  {
    slug: "master-visuals",
    name: "Master Visuals",
    blurb: "Key frames, key art and world-building imagery",
    image: masterVisualsImg,
  },

  {
    slug: "social-media",
    name: "Social Media",
    blurb: "Content systems built for feed and story",
    image: socialMediaImg,
  },

  {
    slug: "visual-identity",
    name: "Visual Identity",
    blurb: "Logos, systems, guidelines",
    image: visualIdentityImg,
  },

  {
    slug: "motion-graphics",
    name: "Motion Graphics",
    blurb: "Title sequences, edits, animated systems",
    image: null,
  },

  {
    slug: "videos",
    name: "Videos",
    blurb: "Brand film, product and campaign video",
    image: videosImg,
  },

  {
    slug: "websites",
    name: "Websites",
    blurb: "Interactive, performant digital experiences",
    image: null,
  },

  {
    slug: "campaigns",
    name: "Campaigns",
    blurb: "Concept-to-delivery, multi-channel",
    image: null,
  },
];