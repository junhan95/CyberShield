import type { Metadata, Viewport } from "next";
import { ContactPage } from "../contact";
import { siteViewport } from "../site-metadata";
import { asset, contactPath, isIndexable, siteOrigin } from "../site-config";

export const viewport: Viewport = siteViewport;

export const metadata: Metadata = {
  title: "Contact | Frankonia CyberShield",
  description:
    "Request a CyberShield consultation or quotation. A Frankonia specialist reviews the project and replies by e-mail.",
  icons: {
    icon: [
      { url: asset("/favicon.svg"), type: "image/svg+xml" },
      { url: asset("/favicon.ico"), sizes: "32x32 48x48" },
    ],
    apple: asset("/apple-touch-icon.png"),
  },
  manifest: asset("/site.webmanifest"),
  alternates: {
    canonical: `${siteOrigin}${contactPath("en")}`,
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
  return <ContactPage lang="en" />;
}
