import type { Metadata, Viewport } from "next";
import { ContactPage } from "../../contact";
import { siteViewport } from "../../site-metadata";
import { asset, contactPath, isIndexable, siteOrigin } from "../../site-config";

export const viewport: Viewport = siteViewport;

export const metadata: Metadata = {
  title: "문의 | Frankonia CyberShield",
  description:
    "CyberShield 상담 또는 견적을 요청하십시오. Frankonia 담당 엔지니어가 프로젝트를 검토해 이메일로 회신합니다.",
  icons: {
    icon: [
      { url: asset("/favicon.svg"), type: "image/svg+xml" },
      { url: asset("/favicon.ico"), sizes: "32x32 48x48" },
    ],
    apple: asset("/apple-touch-icon.png"),
  },
  manifest: asset("/site.webmanifest"),
  alternates: {
    canonical: `${siteOrigin}${contactPath("ko")}`,
    languages: {
      en: `${siteOrigin}${contactPath("en")}`,
      de: `${siteOrigin}${contactPath("de")}`,
      ko: `${siteOrigin}${contactPath("ko")}`,
      "x-default": `${siteOrigin}${contactPath("en")}`,
    },
  },
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
};

export default function Contact() {
  return <ContactPage lang="ko" />;
}
