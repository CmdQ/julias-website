# julia-salomon.de — Redesign Spec

## Overview

Clean rebuild of Julia Salomon's bilingual portfolio site. Same visual identity (colors, hero image, layout), renamed pages (no Futopia branding), upgraded tech (MDX, Astro image optimization). German-first, English second.

**Domain:** julia-salomon.de

## Pages & Navigation

### Page Mapping

| Label (DE)       | Label (EN)       | Slug (both)       |
|------------------|------------------|--------------------|
| Home             | Home             | `/`                |
| Über mich        | About me         | `/about/`          |
| Projekt Zukunft  | Future Project   | `/zukunft/`        |
| Kommunikation    | Communication    | `/training/`       |
| Kreativ          | Creative         | `/creative/`       |
| Kontakt          | Contact          | `/contact/`        |
| Datenschutz      | Privacy Notice   | `/privacy/`        |

URL pattern: `/{locale}/{slug}/` — e.g. `/de/zukunft/`, `/en/zukunft/`

Root `/` redirects to `/de/`.

### Navigation Structure

- **Desktop:** Sticky yellow header. Left: "Julia Salomon" (2rem, bold) + subtitle "Trainerin für positive Zukunftsvisionen und aktive Hoffnung" (1.1rem). Right: 3×2 grid of nav buttons (0.85rem).
- **Mobile:** Name + subtitle block (full width), then sticky 3×2 nav grid.
- **Footer:** © year, Datenschutz link, language switcher (🌐 English / Deutsch).

### Subtitle per Locale

- **DE:** Trainerin für positive Zukunftsvisionen und aktive Hoffnung
- **EN:** Trainer for Positive Futures and Active Hope

## Visual Design

Keep current design verbatim:

- **Color palette:** cream background `rgb(240, 238, 182)`, yellow highlight `rgb(226, 219, 70)`, dark brown text `rgb(59, 55, 47)`, dark outer `rgb(10, 24, 34)`.
- **Layout:** `max-w-5xl` (1024px) centered container with dark background outside.
- **Hero image:** existing `hero.jpg`, full-width within container, scrolls away.
- **Typography:** Tailwind defaults + `@tailwindcss/typography` for prose content.
- **Buttons:** Rounded pill style with semi-transparent white backgrounds, border on active state.

## Tech Stack

| Layer           | Choice                          |
|-----------------|----------------------------------|
| Framework       | Astro 5 (static output)          |
| Content         | MDX via `@astrojs/mdx`           |
| Styling         | Tailwind v4 via `@tailwindcss/vite` + `@tailwindcss/typography` |
| Images          | `astro:assets` (`<Image>` component) |
| Package manager | bun                              |
| Hosting         | GitHub Pages via `withastro/action` |
| Node            | 22 (LTS)                        |

### Dependencies (exhaustive)

```
astro
@astrojs/mdx
@tailwindcss/vite
@tailwindcss/typography
tailwindcss
```

No other dependencies. No remark plugins, no `unist-util-visit`.

## File Structure

```
src/
├── assets/
│   └── images/           ← optimized by Astro (WebP, resize)
│       ├── futopia/       ← keep folder name (existing image refs)
│       ├── creative/
│       ├── haekeln/
│       └── big/
├── components/
│   └── Gallery.astro     ← CSS-only lightbox gallery
├── content/
│   ├── config.ts
│   └── pages/
│       ├── de/
│       │   ├── index.mdx
│       │   ├── about.mdx
│       │   ├── zukunft.mdx
│       │   ├── training.mdx
│       │   ├── creative.mdx
│       │   ├── contact.mdx
│       │   └── privacy.mdx
│       └── en/
│           ├── index.mdx
│           ├── about.mdx
│           ├── zukunft.mdx
│           ├── training.mdx
│           ├── creative.mdx
│           ├── contact.mdx
│           └── privacy.mdx
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro        ← redirect to /de/
│   └── [locale]/
│       └── [...slug].astro
└── styles/
    └── global.css
public/
├── favicon.svg
└── images/
    └── hero.jpg            ← hero stays in public/ (no optimization needed)
scripts/
└── check-i18n-pages.mjs   ← build-time validation (identical filenames)
```

## Content Strategy

### MDX Migration

All content pages convert from `.md` to `.mdx`. Existing prose content transfers 1:1 — text stays the same, only technical format changes.

Content that changes:
- All "Futopia" references in prose → "Zukunft" / contextually appropriate replacement
- Inline HTML galleries (`<div class="photo-gallery">`) → `<Gallery>` component imports

### Content Collection Schema

```typescript
const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});
```

Same as current — no schema changes needed.

## Components

### Gallery.astro

CSS-only lightbox gallery component. Accepts imported Astro image objects for optimization. Used in MDX as:

```mdx
import Gallery from '../../components/Gallery.astro';
import vortrag from '../../assets/images/futopia/vortrag.jpg';
import lego from '../../assets/images/futopia/lego.jpg';

<Gallery images={[
  { src: vortrag, alt: 'Julia gibt einen Vortrag' },
  { src: lego, alt: 'Teilnehmende bauen mit Lego' },
]} />
```

Implementation: renders a grid of `<Image>` thumbnails (optimized), each linking to a `:target`-based CSS lightbox overlay. Lightbox shows full-size image. No JavaScript.

### Image Optimization

Images in `src/assets/images/` are processed by Astro's built-in image pipeline:
- Automatic WebP conversion
- Responsive sizing
- Lazy loading

In MDX, use Astro's `<Image>` component:

```mdx
import { Image } from 'astro:assets';
import illustration from '../../assets/images/futopia/imagination.jpg';

<Image src={illustration} alt="Illustration einer Frau..." />
```

## i18n

- **Routing:** `[locale]/[...slug].astro` dynamic route with Content Collections.
- **Locale detection:** extracted from content file path (`de/zukunft.mdx` → locale `de`, slug `zukunft`).
- **Navigation labels:** object literal in `BaseLayout.astro`, keyed by locale.
- **Language switcher:** URL segment swap in footer (`/de/slug/` ↔ `/en/slug/`).
- **HTML lang:** `<html lang={locale}>` set per page.
- **hreflang:** `<link rel="alternate" hreflang="de|en">` in `<head>`.
- **Build validation:** `check-i18n-pages.mjs` compares filenames across `de/` and `en/` directories.

## CI/CD

GitHub Actions workflow (`.github/workflows/deploy.yml`):
- Trigger: push to `main`
- Steps: checkout → setup Node 22 → setup bun → `bun install` → `bun run build` → upload artifact → deploy to GitHub Pages
- Uses `oven-sh/setup-bun@v2` for bun.

## What Gets Removed

- `remark-locale-links.mjs` — MDX uses native Astro links
- `remark-lightbox-gallery.mjs` — replaced by `<Gallery>` component
- `unist-util-visit` dependency — only needed for remark plugins
- `tailwind.config.ts` — Tailwind v4 uses CSS-based config
- Custom button CSS classes (`.btn-primary`, `.btn-secondary`) — Tailwind utilities directly
- `pnpm-lock.yaml`, `pnpm-workspace.yaml` — replaced by `bun.lockb`

## What Stays

- Color palette (all CSS custom properties)
- Hero image (`hero.jpg`)
- Page layout (max-w-5xl centered, dark outer background)
- CSS-only lightbox approach (no JS)
- Photo gallery grid styles
- Prose typography via `@tailwindcss/typography`
- i18n check script
- GitHub Pages hosting

## Out of Scope

- New content/copywriting (text transfers 1:1, refinement later)
- New images or artwork
- Analytics, forms, or third-party scripts
- CMS integration
- SPA framework (React/Svelte/Vue)
- Client-side JavaScript
