import type { Metadata } from "next";
import { Landing } from "../landing";
import { buildSiteMetadata } from "../site-metadata";

export function generateMetadata(): Promise<Metadata> {
  return buildSiteMetadata("ko");
}

export default function KoreanHome() {
  return <Landing lang="ko" />;
}
