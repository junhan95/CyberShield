import type { Metadata, Viewport } from "next";
import { BrandLockup, WordmarkDefs } from "./brand";
import { languages, route } from "./site-config";
import { siteViewport } from "./site-metadata";

export const viewport: Viewport = siteViewport;

export const metadata: Metadata = {
  title: "Page not found | Frankonia CyberShield",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="legal-page">
      <WordmarkDefs />

      <header className="site-header">
        <a className="brand" href={route("/")} aria-label="Frankonia CyberShield home">
          <BrandLockup decorative />
        </a>
        <a className="text-link legal-back" href={route("/")}>
          Back to CyberShield<span>↗</span>
        </a>
      </header>

      <article className="legal-body notfound-body">
        <p className="eyebrow">ERROR 404</p>
        <h1>This page does not exist.</h1>
        <p className="legal-intro">
          The address may have changed, or the link that brought you here may be out of date.
        </p>
        <nav className="notfound-links" aria-label="Site sections">
          {languages.map(([code, , label, path]) => (
            <a key={code} href={route(path)} hrefLang={code} lang={code}>
              {label}
            </a>
          ))}
        </nav>
      </article>

      <footer>
        <div className="footer-brand"><BrandLockup /></div>
        <p>
          CyberShield is a high-assurance engineering solution. Performance, standards and
          certification scope depend on the agreed project configuration and final validation.
        </p>
        <div>
          <a href={route("/privacy")}>Privacy</a>
          <a href={route("/imprint")}>Imprint</a>
          <a href="https://frankonia-solutions.com/" target="_blank" rel="noreferrer">© 1987 Frankonia Group</a>
        </div>
      </footer>
    </main>
  );
}
