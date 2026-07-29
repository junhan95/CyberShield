import type { Metadata } from "next";
import { headers } from "next/headers";
import type { Lang } from "./landing";

const content = {
  en: {
    title: "Frankonia CyberShield | Electromagnetic Security for Critical Compute",
    description:
      "Modular, verifiable electromagnetic shielding for AI, sovereign cloud, colocation and mission-critical data infrastructure.",
  },
  ko: {
    title: "Frankonia CyberShield | 핵심 컴퓨팅을 위한 전자기 보안",
    description:
      "AI, 소버린 클라우드, 코로케이션 및 미션 크리티컬 데이터 인프라를 위한 모듈형 검증 전자기 차폐 솔루션.",
  },
} as const;

export async function buildSiteMetadata(lang: Lang): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const { title, description } = content[lang];
  const path = lang === "ko" ? "/ko" : "/";

  return {
    title,
    description,
    icons: { icon: "/favicon.svg" },
    alternates: {
      canonical: `${origin}${path}`,
      languages: {
        en: `${origin}/`,
        ko: `${origin}/ko`,
        "x-default": `${origin}/`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${origin}${path}`,
      locale: lang === "ko" ? "ko_KR" : "en_US",
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "Frankonia CyberShield" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${origin}/og.png`],
    },
  };
}
