# Reflect Studio — Website

A cinematic, dark, interactive website for Reflect Studio, built with React + Vite.

## 1. Running it locally

You'll need [Node.js](https://nodejs.org) installed (version 18 or newer).

```bash
npm install       # first time only, installs dependencies
npm run dev       # starts a local preview at http://localhost:5173
```

To create the production-ready files (for deploying):

```bash
npm run build     # outputs the finished site into the /dist folder
```

You can preview that production build locally with `npm run preview`.

## 2. Deploying

The `/dist` folder produced by `npm run build` is a complete static
site — it can be uploaded to Netlify, Vercel, Cloudflare Pages, GitHub
Pages, or any standard web host. Netlify and Vercel both support
dragging the `dist` folder straight into their dashboard, or
connecting this project's Git repository for automatic deploys.

## 3. Editing content (no coding required)

Everything you're likely to want to change lives in `src/data/`:

| File | What it controls |
|---|---|
| `src/data/siteConfig.js` | Studio name, tagline, description, nav labels, email, social links |
| `src/data/services.js` | The 7 service/category names shown on the homepage and used as page URLs |
| `src/data/projects.js` | Every project — add one by copying an existing entry and editing it |
| `src/data/clients.js` | Client names for the scrolling logo row, and the 4 stats numbers |

**To add a project:** open `src/data/projects.js`, copy one of the
existing objects inside the `projects` array, paste it, and change the
`title`, `client`, `year`, `description`, `category` (must match a
slug from `services.js`) and `slug` (must be unique — this becomes
part of the URL). It will automatically appear on its category page
and get its own project detail page.

**To change brand colors:** open `src/styles/global.css` and edit the
values at the very top, inside `:root { ... }` — `--primary`,
`--rose`, `--mauve`, `--deep`, `--void`, etc. Every glow, button,
gradient and accent across the whole site references these variables,
so changing one line updates the entire site consistently.

## 4. Adding real images

Every image slot currently uses an automatic brand-colored gradient
placeholder so the layout looks finished even with no photography yet.
To swap in a real image:

1. Drop the image file into the matching folder in `src/assets/`
   (`hero/`, `master-visuals/`, `clients/`, or `projects/`).
2. Import it at the top of the relevant file, e.g.
   `import heroImg from "../assets/hero/hero.jpg";`
3. Set the corresponding value:
   - **Hero image:** `HERO_IMAGE` constant at the top of `src/components/Hero.jsx`
   - **Project thumbnails/gallery:** the `thumb` and `images` fields on
     that project in `src/data/projects.js`
   - **Client logos:** the `logo` field on that client in `src/data/clients.js`

## 5. Project structure

```
src/
  components/   Reusable UI pieces (Header, Hero, cards, marquees, footer...)
  pages/        The three page types: Home, CategoryPage, ProjectDetail
  data/         All editable content — see table above
  assets/       Images, organized by where they're used
  styles/       global.css — one file holding all design tokens and styles
  utils/        Small helper functions (placeholder art generator)
```

Routing is handled by `react-router-dom` in `src/App.jsx`:

- `/` → homepage
- `/:category` → e.g. `/master-visuals`, `/social-media`, `/visual-identity`,
  `/motion-graphics`, `/videos`, `/websites`, `/campaigns` — lists every
  project in that category (6 by default, add more anytime)
- `/project/:slug` → an individual project's detail page (a flat,
  global URL — every project slug must be unique across all categories)

## 6. Notes on the design

- The homepage is intentionally interactive: an ambient starfield runs
  behind the entire site (not just the hero) with a subtle camera-like
  parallax and particles that softly displace away from the cursor —
  no stars "light up," they just drift out of the way and settle back.
- A large ring trails the cursor with a slight delay and stretches
  along the direction of travel; it's desktop-only and skipped
  entirely on touch devices.
- Category cards use the cursor's position to drive a subtle 3D tilt
  (via `framer-motion` springs), not a generic CSS hover.
- Master Visuals' three rows drift continuously on their own — even
  with the mouse and scroll both completely still — and scrolling adds
  a temporary speed boost that decays smoothly back to normal. The row
  strip itself runs edge-to-edge across the viewport rather than
  sitting inside the centered container.
- Project detail pages are intentionally quiet — no particle field
  glow variation, minimal motion — so the work stays the focus.
- Colors are drawn from the studio's brand identity reference: a deep
  near-black violet base, a bright lavender signature accent, and a
  dusty rose secondary accent.
