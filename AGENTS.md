# AGENTS.md — Project Guardrails & Decisions

## 0) Purpose (who/why)
A simple, fast, **static** portfolio for my wife (artist & education creator) with bilingual content (**EN/DE**). Emphasis on clarity, accessibility, image quality, and zero runtime security surface.

---

## 1) Non‑negotiables (constraints)
- **Static only** (no server, no client JS by default). Future interactivity via Astro islands (opt‑in hydration) only if/when needed.
- **Internationalization:** two locales (English/German) with SEO‑friendly URLs.
- **Performance:** lightweight pages, optimized images, minimal CSS (Tailwind utilities).
- **Accessibility:** alt text for artwork, logical headings, sufficient color contrast.

References:
- Astro i18n routing & helpers (official docs).
- Tailwind v4 with Astro via the **Vite plugin** (`@tailwindcss/vite`); the old `@astrojs/tailwind` integration is deprecated for Tailwind 4. [1](https://docs.astro.build/en/guides/internationalization/)[2](https://docs.astro.build/en/guides/integrations-guide/tailwind/)
---

## 2) Tech stack (decisions)
- **Framework:** Astro (static output).
- **Runtime:** **Node LTS** (target Node 22; Node 20+ acceptable).
- **Package manager:** **pnpm** (single lockfile `pnpm-lock.yaml`).
- **Styling:** **Tailwind v4** via `@tailwindcss/vite`; add `@tailwindcss/typography` if needed.
- **Language:** TypeScript preferred in `.astro` frontmatter and utilities.
- **No SPA framework** initially (React/Svelte/Vue). If needed later, prefer **Svelte** for small, self‑contained widgets.

References:
- Tailwind + Astro setup (official guides). [3](https://tailwindcss.com/docs/installation/framework-guides/astro)[4](https://tailwindcss.com/docs/guides/astro)

---

## 3) i18n strategy (routing & content)
- **Dynamic routing:** Single `[locale]/[...slug].astro` file handles all pages for both locales (eliminates per-page duplication).
- **Localized content** with Content Collections (frontmatter includes `locale: 'en' | 'de'`).
- **Language switcher**: URL segment swap (`/en/...` ↔ `/de/...`), located in sticky header.
- **HTML lang**: set per page from current route.
- **Build-time validation:** `scripts/check-i18n-pages.mjs` ensures every page exists in both EN/DE (fails build if missing translation).
  - **IMPORTANT:** Always use **identical filenames** across locales (e.g., `privacy.md` in both `/en/` and `/de/`). The validation script compares filenames, not content or titles. Different filenames will break the build.
- Optional: If we later want automatic route generation/fallbacks, adopt Astro's i18n config (`astro.config.* -> i18n.locales/defaultLocale`). [1](https://docs.astro.build/en/guides/internationalization/)

**Out of scope for now:** domain‑per‑locale, auto‑redirect by `Accept-Language`.

---

## 4) Information architecture (initial)
- **Top‑level pages (per locale):** Home, Project Futopia, Climate Education / Public Speaking, Creative Projects, Contact (mailto).
- **Content model (works):**
  Frontmatter: `title`, `date?`, `medium?`, `dimensions?`, `image`, `alt`, `locale`, `tags?`.
- **Assets:** `/public/images/works/<slug>.jpg` (plus optional `@1x/@2x` variants or responsive pipeline later).

---

## 5) Visual system (Tailwind)
- Wide format header image (still to be created, placeholder is ok).
- **Design tokens:** start with Tailwind defaults; add a tiny brand palette in a global CSS theme layer if needed.
- **Typography:** consider `@tailwindcss/typography` for Markdown rendering.
- **Layout:** responsive grid for works (1–2 columns on mobile, 2–4 on desktop).

Reference: Tailwind v4 + Astro via Vite plugin. [3](https://tailwindcss.com/docs/installation/framework-guides/astro)
---

## 6) Images & performance
- **Authoring rule:** provide **alt text** and a reasonably sized source image (e.g., 1600–2400px long edge). Keep under ~500–800 KB where possible.
- **Initial approach:** ship pre‑optimized JPEG/WebP; no client JS galleries.
- **Later option:** adopt Astro’s asset/image tooling for responsive variants; still static at build time.

---

## 7) Accessibility & SEO checklist
- `<html lang="en|de">`, descriptive titles/meta per page.
- `hreflang` alternates between EN/DE.
- Semantic landmarks (header/main/nav/footer).
- Color contrast meets WCAG AA.
- Optional at build time: sitemap integration (`@astrojs/sitemap`). (Static, safe.)

Reference: Astro’s GitHub Pages deploy action and config support custom `site` URL used for sitemap/base paths. [5](https://docs.astro.build/en/guides/deploy/github/)

---

## 8) Hosting & CI/CD (GitHub Pages)
- **Host:** GitHub Pages.
- **Deploy:** official **withastro/action** workflow on pushes to `main`.
  - The action auto‑detects the package manager from the repo’s lockfile and lets us pin Node version (we’ll keep Node 22).
  - No secrets/env needed for static sites.

References:
- Astro GitHub Pages guide & official action (supports npm/pnpm/yarn/bun; Node version configurable). [5](https://docs.astro.build/en/guides/deploy/github/)[6](https://github.com/withastro/action)

---

## 9) Code quality & repo conventions
- **Formatting:** Prettier (Astro + Tailwind plugin optional for class sorting).
- **Linting:** keep minimal; rely on TypeScript + editor hints.
- **Branches:** feature branches → PR → `main` (auto‑deploy).
- **Do not mix package managers**; **do not commit multiple lockfiles**. [5](https://docs.astro.build/en/guides/deploy/github/)

---

## 10) Security posture
- No forms posting to third‑party endpoints.
- No analytics/trackers initially.
- No external scripts unless strictly necessary; if added, load with integrity and minimal scope.

---

## 11) Future extensions (opt‑in only)
- **Lightbox or filters** for the works grid via a **Svelte island** (`client:visible`) if UX warrants it; otherwise stay static.
- **CMS** (headless) and webhooks are **explicitly out of scope** for v1.

---

## 12) Definition of Done (v1)
- Pages present in **EN/DE** with consistent nav & footer.
- Works grid renders localized entries from Content Collections.
- All images have alt text; Lighthouse: performance ≥ 90 on mobile.
- GitHub Pages deploy succeeds from `main` on each push.
``