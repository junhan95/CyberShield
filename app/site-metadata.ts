import type { Metadata } from "next";
import type { Lang } from "./site-config";
import { asset, langPath, route, siteOrigin } from "./site-config";

const content = {
  en: {
    title: "Frankonia CyberShield | Electromagnetic Security for Critical Compute",
    description:
      "Modular, verifiable electromagnetic shielding for AI, sovereign cloud, colocation and mission-critical data infrastructure.",
  },
  de: {
    title: "Frankonia CyberShield | Elektromagnetische Sicherheit für kritische Rechenleistung",
    description:
      "Modulare, messtechnisch nachgewiesene elektromagnetische Abschirmung für KI, souveräne Cloud, Colocation und geschäftskritische Dateninfrastruktur.",
  },
  ko: {
    title: "Frankonia CyberShield | 핵심 컴퓨팅을 위한 전자기 보안",
    description:
      "AI, 소버린 클라우드, 코로케이션 및 미션 크리티컬 데이터 인프라를 위한 모듈형 검증 전자기 차폐 솔루션.",
  },
} as const;

export function buildSiteMetadata(lang: Lang): Metadata {
  const { title, description } = content[lang];
  const canonical = `${siteOrigin}${route(langPath(lang))}`;
  // Social platforms cache preview images by URL, so the version bumps when
  // the artwork changes.
  const ogImage = `${siteOrigin}${asset("/og.png")}?v=2`;

  return {
    title,
    description,
    icons: { icon: asset("/favicon.svg") },
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
