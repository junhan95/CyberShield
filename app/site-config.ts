// GitHub Pages serves this project from a repository subpath, so every asset
// and internal link needs that prefix. Raw <img>/<a> tags do not get Next's
// basePath rewriting, so they go through the helpers below.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "http://localhost:3000";

/** Prefix a file in `public/` (e.g. `/images/hero.jpg`). */
export const asset = (path: string) => `${basePath}${path}`;

/** Prefix an internal route, keeping the trailing slash static export expects. */
export const route = (path: string) => {
  const withBase = `${basePath}${path}`;
  return withBase.endsWith("/") ? withBase : `${withBase}/`;
};
