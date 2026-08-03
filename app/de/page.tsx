import type { Metadata } from "next";
import { Landing } from "../landing";
import { buildSiteMetadata } from "../site-metadata";

export const metadata: Metadata = buildSiteMetadata("de");

export default function GermanHome() {
  return <Landing lang="de" />;
}
