import type { MetadataRoute } from "next";
import { contactPath, languages, route, siteOrigin } from "./site-config";

export const dynamic = "force-static";

const url = (path: string) => `${siteOrigin}${route(path)}`;

/** Every locale of the landing page carries the full alternate set. */
const localeAlternates = Object.fromEntries(
  languages.map(([code, , , path]) => [code, url(path)]),
);

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-03");

  return [
    ...languages.map(([, , , path]) => ({
      url: url(path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.9,
      alternates: { languages: localeAlternates },
    })),
    // The enquiry page, one per locale, each carrying the full alternate set.
    ...languages.map(([code]) => ({
      url: `${siteOrigin}${contactPath(code)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          languages.map(([other]) => [other, `${siteOrigin}${contactPath(other)}`]),
        ),
      },
    })),
    {
      url: url("/privacy"),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: url("/imprint"),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
  ];
}
