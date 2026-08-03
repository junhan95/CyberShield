// GitHub Pages serves this project from a repository subpath, so every asset
// and internal link needs that prefix. Raw <img>/<a> tags do not get Next's
// basePath rewriting, so they go through the helpers below.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export type Lang = "en" | "de" | "ko";

/** Language switcher order: English, German, Korean. Lives here so both the
 *  client landing page and the server-side metadata can read it. */
export const languages = [
  ["en", "EN", "English", "/"],
  ["de", "DE", "Deutsch", "/de"],
  ["ko", "KO", "한국어", "/ko"],
] as const satisfies readonly (readonly [Lang, string, string, string])[];

export const langPath = (lang: Lang) => languages.find(([code]) => code === lang)![3];

export const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "http://localhost:3000";

/**
 * Search engines are kept out until the site moves to its own domain. Indexing
 * the GitHub Pages staging URL would park the ranking signals on a personal
 * subdomain and leave duplicate content behind at launch.
 *
 * Set NEXT_PUBLIC_INDEXABLE=1 in the deploy workflow to open it up.
 *
 * Note this has to ride on the per-page robots meta tag: a project page serves
 * from /CyberShield/, and crawlers only read robots.txt from the host root,
 * which belongs to a different repository.
 */
export const isIndexable = process.env.NEXT_PUBLIC_INDEXABLE === "1";

/** Prefix a file in `public/` (e.g. `/images/hero.jpg`). */
export const asset = (path: string) => `${basePath}${path}`;

/** Prefix an internal route, keeping the trailing slash static export expects. */
export const route = (path: string) => {
  const withBase = `${basePath}${path}`;
  return withBase.endsWith("/") ? withBase : `${withBase}/`;
};
