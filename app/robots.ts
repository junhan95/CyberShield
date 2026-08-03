import type { MetadataRoute } from "next";
import { isIndexable, route, siteOrigin } from "./site-config";

export const dynamic = "force-static";

/**
 * Written for the day this site gets its own domain. On the current GitHub
 * Pages project path it is served at /CyberShield/robots.txt, which crawlers
 * do not read — they only fetch robots.txt from the host root. Indexing on the
 * staging URL is therefore held back by the per-page robots meta tag instead.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Answer engines are welcome: the technical content is the point.
      { userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"], allow: "/" },
    ],
    sitemap: `${siteOrigin}${route("/")}sitemap.xml`,
    host: siteOrigin,
  };
}
