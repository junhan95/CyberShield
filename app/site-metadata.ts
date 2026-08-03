import type { Metadata } from "next";
import type { Lang } from "./site-config";
import { asset, isIndexable, langPath, route, siteOrigin } from "./site-config";

const content = {
  en: {
    title: "Frankonia CyberShield | RF Shielded Rooms for Data Centres",
    description:
      "Modular RF shielding for AI, sovereign cloud and colocation data centres. Up to 120 dB attenuation from 10 kHz to 40 GHz, measured on site per EN 50147-1.",
  },
  de: {
    title: "Frankonia CyberShield | HF-Abschirmung für Rechenzentren",
    description:
      "Modulare, messtechnisch nachgewiesene HF-Abschirmung für KI-, Cloud- und Colocation-Rechenzentren. Schirmdämpfung bis 120 dB, geprüft nach EN 50147-1.",
  },
  ko: {
    title: "Frankonia CyberShield | 데이터센터 전자기 차폐 솔루션",
    description:
      "AI·소버린 클라우드·코로케이션 데이터센터를 위한 모듈형 전자기 차폐(EMC/TEMPEST) 솔루션. 10 kHz~40 GHz 최대 120 dB, EN 50147-1 현장 검증.",
  },
} as const;

export function buildSiteMetadata(lang: Lang): Metadata {
  const { title, description } = content[lang];
  const canonical = `${siteOrigin}${route(langPath(lang))}`;
  // Social platforms cache preview images by URL, so the version bumps when
  // the artwork changes.
  const ogImage = `${siteOrigin}${asset("/og.png")}?v=3`;

  return {
    title,
    description,
    icons: { icon: asset("/favicon.svg") },
    robots: isIndexable
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true },
    alternates: {
      canonical,
      languages: {
        en: `${siteOrigin}${route("/")}`,
        de: `${siteOrigin}${route("/de")}`,
        ko: `${siteOrigin}${route("/ko")}`,
        "x-default": `${siteOrigin}${route("/")}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      locale: { en: "en_US", de: "de_DE", ko: "ko_KR" }[lang],
      images: [{ url: ogImage, width: 1200, height: 630, alt: "Frankonia CyberShield" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
