import type { Metadata, Viewport } from "next";
import { Landing } from "../landing";
import { buildSiteMetadata, siteViewport } from "../site-metadata";

export const viewport: Viewport = siteViewport;
export const metadata: Metadata = buildSiteMetadata("de");

export default function GermanHome() {
  return <Landing lang="de" />;
}
