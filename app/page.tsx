import type { Metadata } from "next";
import { Landing } from "./landing";
import { buildSiteMetadata } from "./site-metadata";

export const metadata: Metadata = buildSiteMetadata("en");

export default function Home() {
  return <Landing lang="en" />;
}
