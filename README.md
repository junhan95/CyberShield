<div align="center">

<img src="public/og.png" alt="Frankonia CyberShield" width="820">

# Frankonia CyberShield

**Physical and electromagnetic security for critical compute.**

The product site for Frankonia's modular RF-shielded enclosures — the rooms that wrap
AI clusters, sovereign cloud and colocation halls in a measurable electromagnetic boundary.

[![Deploy](https://github.com/junhan95/CyberShield/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/junhan95/CyberShield/actions/workflows/deploy-pages.yml)
![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-149ECA?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Static export](https://img.shields.io/badge/output-static%20export-2ea44f)

### [English](https://www.frankonia-cybershield.com/) · [Deutsch](https://www.frankonia-cybershield.com/de/) · [한국어](https://www.frankonia-cybershield.com/ko/)

</div>

---

## What this is

A single-page product site, prerendered to static HTML and served from the
`www.frankonia-cybershield.com` document root. Three fully translated locales, two
standalone legal pages, no tracking of any kind and no third-party requests at all.

The one thing on the site that is not a static file is `public/api/inquiry.php`, the
endpoint the contact form posts to.

| Route | Locale | Page |
|---|---|---|
| [`/`](https://www.frankonia-cybershield.com/) | English | Landing |
| [`/de/`](https://www.frankonia-cybershield.com/de/) | Deutsch | Landing |
| [`/ko/`](https://www.frankonia-cybershield.com/ko/) | 한국어 | Landing |
| [`/privacy/`](https://www.frankonia-cybershield.com/privacy/) | English | Privacy policy |
| [`/imprint/`](https://www.frankonia-cybershield.com/imprint/) | English | Imprint |

## Highlights

**Trilingual from one component.** Every string lives in a single `copy` object keyed by
locale, so EN / DE / KO render from the same tree. The German copy uses real EMC shielding
terminology — *Schirmdämpfung*, *Wabenkamin*, *Hohlleiter* — rather than a literal
translation of the English.

**Cut-metal wordmark, drawn in SVG.** `CYBERSHIELD` is a brushed steel sheet shown through
a double-contour letterform mask, with a polished chamfer from `feSpecularLighting` and a
cast shadow. The filter values are tuned to the 26 px header size on purpose: SVG filters
rasterise at final render scale, so a grain tuned on a large canvas dissolves into flat
gray when scaled down.

**A hero that never dips through the background.** Four photographs cross-dissolve on one
round, each with its own slow push in a different direction. The outgoing frame does not
fade — it drops a z-index level and the incoming one fades in above it, so an opaque
photograph covers the band at every instant. Cross-fading the pair would let the ground
show through at the midpoint of every hand-over, which reads as a flicker. Under
`prefers-reduced-motion` the band settles on the first frame, the one already downloaded
at high priority.

**Measured, not asserted.** The attenuation band charts guaranteed shielding performance
from 10 kHz to 40 GHz against EN 50147-1 / IEEE 299, with bar heights derived from the
decibel figures rather than hand-placed.

**An enquiry form that survives its own edge cases.** It posts JSON to a first-party PHP
endpoint, but carries a real `action` and `method` as well, so a visitor without
JavaScript posts natively rather than losing the enquiry — and if the endpoint is
unreachable the UI hands back a prefilled mailto. Bots meet a honeypot field and a minimum
fill time, both of which answer as though they succeeded so there is nothing to tune
against. Rate limiting is keyed on the email address rather than the IP, which keeps the
endpoint out of the log-retention question entirely.

**The brand lockup is the real artwork.** `frankonia-logo.svg` is built from vector
outlines extracted from the official brand PDF, not approximated with a web font, so the
FRANKONIA wordmark is glyph-exact.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, RSC) |
| Runtime | React 19 · TypeScript 5.9 |
| Dev server | [vinext](https://github.com/cloudflare/vinext) on Vite 8 |
| Styling | Hand-written CSS in `app/globals.css` (Tailwind 4 is installed but barely used) |
| Fonts | Inter · Jost · Noto Sans KR, self-hosted via `@fontsource` |
| Enquiry endpoint | PHP `mail()` on the host, `public/api/inquiry.php` |
| Hosting | Static export on Apache, uploaded over SFTP |

## Local development

```bash
npm install
npm run dev
```

The dev server prints its URL on start. `.claude/launch.json` pins the editor preview to
port 3200.

To reproduce the production build exactly:

```bash
STATIC_EXPORT=1 NEXT_PUBLIC_BASE_PATH= NEXT_PUBLIC_SITE_ORIGIN=https://www.frankonia-cybershield.com NEXT_PUBLIC_INDEXABLE=1 npx next build
```

Output lands in `out/`. The GitHub Pages mirror is built the same way but with
`NEXT_PUBLIC_BASE_PATH=/CyberShield` and
`NEXT_PUBLIC_SITE_ORIGIN=https://junhan95.github.io`, which Pages needs baked in at build
time.

> **On Windows, run the Pages variant from PowerShell rather than Git Bash.** Git Bash
> rewrites `/CyberShield` into a Windows path and the build fails with an invalid
> `basePath`.

## Layout

```
app/
  landing.tsx         # the whole landing page, and all copy keyed by locale
  brand.tsx           # cut-metal wordmark definitions, shared across pages
  cutaway-map.tsx     # the interactive cutaway render and its hotspots
  cutaway.ts          # the parts behind the cutaway, keyed by locale
  legal.tsx           # shell and company details for the legal pages
  site-config.ts      # base path, locale table, asset/route helpers
  site-metadata.ts    # per-locale title, description, hreflang, Open Graph
  structured-data.tsx # JSON-LD: organization, product, FAQ
  page.tsx            # /
  de/  ko/            # /de/  /ko/
  privacy/ imprint/   # standalone legal pages
public/
  frankonia-logo.svg  # brand lockup, vector outlines from the brand PDF
  api/inquiry.php     # enquiry endpoint, copied into out/ by the build
  images/hero/        # the four photographs the hero band cross-dissolves
  images/             # facility photography
deploy/
  deploy.py           # production build and upload, one command
  upload.py           # SFTP push of out/ to the document root
  htaccess            # Apache config, uploaded last so the root is never half-live
```

`db/`, `worker/`, `examples/` and `drizzle.config.ts` are scaffolding left over from the
project starter. The site does not use them.

## Deployment

**Production — www.frankonia-cybershield.com.** Copy `.env.example` to `.env`, fill in the
SFTP credentials, then:

```bash
npm run deploy
```

`deploy/deploy.py` runs the production build and hands off to `deploy/upload.py`, which
pushes `out/` over SFTP. A failed build aborts before the upload. Site content goes up
first and `.htaccess` last, so the document root is never left pointing at a half-uploaded
tree; the previous `.htaccess` is backed up beside it, and files left over from the last
build are pruned afterwards.

`.env` is gitignored — credentials never enter the repository.

**Mirror — GitHub Pages.** Pushing to `main` triggers
[`deploy-pages.yml`](.github/workflows/deploy-pages.yml), which runs the static export with
the `/CyberShield` base path and publishes `out/` to Pages. The two targets are
independent: a commit does not update the live site, and `npm run deploy` does not update
the mirror.

## Notes

- Content is derived from Frankonia's CyberShield product documentation. Performance
  figures, standards and certification scope depend on the agreed project configuration
  and final on-site validation.
- The site sets no cookies, embeds no analytics and makes no third-party requests. The
  fonts are served from our own origin.
- Enquiries are handed straight to the responsible mailbox. Nothing is written to disk
  inside the document root, and no IP address is stored.
- The imprint carries the statutory details of Frankonia Germany EMC Solutions GmbH.

---

<div align="center">
<sub>© 1987 Frankonia Group · <a href="https://frankonia-solutions.com/">frankonia-solutions.com</a></sub>
</div>
