"use client";

import { useEffect, useRef, useState } from "react";
import { BrandLockup } from "./brand";
import { copy } from "./copy";
import { contactPath, languages, route } from "./site-config";
import type { Lang } from "./site-config";

/**
 * The navigation bar, shared by the landing page and the contact page.
 *
 * It was written inside `landing.tsx` and lifted out unchanged when the
 * enquiry moved onto a page of its own — a visitor who lands on /contact
 * should have the same way back into the site as one who scrolls the landing
 * page, and two copies of a header drift apart within a release or two.
 *
 * `onLanding` is the only difference between the two placements. The section
 * links are anchors on the landing page and absolute links back to it
 * everywhere else, so `#why` from /contact/ resolves to /#why rather than to
 * nothing at all.
 */
export function SiteHeader({ lang, onLanding = false }: { lang: Lang; onLanding?: boolean }) {
  const t = copy[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Close the language dropdown on an outside click or Escape.
  useEffect(() => {
    if (!langOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!langRef.current?.contains(event.target as Node)) setLangOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLangOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [langOpen]);

  /** The landing page's own path, for the links that leave this one. */
  const home = route(languages.find(([code]) => code === lang)![3]);
  const section = (id: string) => (onLanding ? `#${id}` : `${home}#${id}`);

  const goContact = (type: "consultation" | "quote") => {
    setMenuOpen(false);
    window.location.href = `${contactPath(lang)}?request=${type}`;
  };

  const navLinks = (
    <>
      {/* Listed in the order the sections appear on the landing page, so the
          scroll-spy highlight only ever moves forward as the reader goes down. */}
      <a href={section("why")} onClick={() => setMenuOpen(false)}>{t.nav.threats}</a>
      <a href={section("applications")} onClick={() => setMenuOpen(false)}>{t.nav.applications}</a>
      <a href={section("verification")} onClick={() => setMenuOpen(false)}>{t.nav.verification}</a>
      <a href={section("solution")} onClick={() => setMenuOpen(false)}>{t.nav.solution}</a>
      <a href={section("ecosystem")} onClick={() => setMenuOpen(false)}>{t.nav.ecosystem}</a>
      <a href={section("process")} onClick={() => setMenuOpen(false)}>{t.nav.process}</a>
      <a href={section("company")} onClick={() => setMenuOpen(false)}>{t.nav.company}</a>
      {/* A route, not an anchor: the enquiry form has a page of its own. */}
      <a
        href={contactPath(lang)}
        className={onLanding ? undefined : "active"}
        aria-current={onLanding ? undefined : "page"}
        onClick={() => setMenuOpen(false)}
      >
        {t.nav.contact}
      </a>
    </>
  );

  return (
    <>
      <header className="site-header">
        <a className="brand" href={onLanding ? "#top" : home} aria-label="Frankonia CyberShield home">
          <BrandLockup decorative onLight />
        </a>
        <nav className="nav-desktop" aria-label="Primary navigation">
          {navLinks}
        </nav>
        <div className="header-actions">
          <div className={langOpen ? "language-select open" : "language-select"} ref={langRef}>
            <button
              className="language"
              aria-label={t.langLabel}
              aria-haspopup="true"
              aria-expanded={langOpen}
              onClick={() => setLangOpen(!langOpen)}
            >
              {languages.find(([code]) => code === lang)?.[1]}
              <svg viewBox="0 0 12 8" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M1 2 L6 6.5 L11 2" />
              </svg>
            </button>
            {langOpen && (
              <ul className="language-menu" aria-label={t.langLabel}>
                {languages.map(([code, short, label, path]) => (
                  <li key={code}>
                    {/* The switcher stays on the page the reader is on: from
                        /contact/ it offers /de/contact/, not /de/. */}
                    <a
                      href={onLanding ? route(path) : contactPath(code)}
                      hrefLang={code}
                      lang={code}
                      className={code === lang ? "current" : ""}
                      aria-current={code === lang ? "true" : undefined}
                    >
                      <b>{short}</b>
                      <span>{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button className="button button-small" onClick={() => goContact("quote")}>{t.quote}</button>
          <button
            className={menuOpen ? "menu-toggle open" : "menu-toggle"}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t.menuCloseLabel : t.menuOpenLabel}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i /><i /><i />
          </button>
        </div>
        <div className="scroll-progress" aria-hidden="true"><i /></div>
      </header>

      {menuOpen && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          {navLinks}
          <button className="button" onClick={() => goContact("quote")}>{t.quote}</button>
        </nav>
      )}
    </>
  );
}
