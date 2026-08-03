import type { ReactNode } from "react";
import { BrandLockup, WordmarkDefs } from "./brand";
import { route } from "./site-config";

/**
 * Provider details, shared by the imprint and the privacy policy.
 * Taken from the group imprint at frankonia-solutions.com/imprint.
 */
export const company = {
  name: "Frankonia Germany EMC Solutions GmbH",
  street: "Industriestraße 16",
  city: "91180 Heideck",
  country: "Germany",
  phone: "+49 9177 98-500",
  fax: "+49 9177 98-520",
  email: "info@frankoniagroup.com",
  salesEmail: "sales@frankoniagroup.com",
  website: "frankonia-solutions.com",
  directors: "Wolfgang Opitz, Dr. Daniel Feyerlein",
  registerCourt: "Amtsgericht Nürnberg",
  registerNumber: "HRB 8052",
  vatId: "DE 133565240",
  dpoName: "Melanie Kolb",
  dpoEmail: "kolb@grothprojekt.de",
} as const;

/**
 * Shell for the standalone legal pages. These are English-only and deliberately
 * plain: brand lockup, a route back to the site, the document, and the same
 * footer as the landing page.
 */
export function LegalPage({
  title,
  intro,
  updated,
  children,
}: {
  title: string;
  intro: string;
  updated: string;
  children: ReactNode;
}) {
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

      <article className="legal-body">
        <p className="eyebrow">LEGAL</p>
        <h1>{title}</h1>
        <p className="legal-intro">{intro}</p>
        <p className="legal-updated">Last updated: {updated}</p>
        {children}
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

/** Marks a value the operator must supply before publication. */
export function Fill({ children }: { children: ReactNode }) {
  return <span className="legal-fill">{children}</span>;
}
