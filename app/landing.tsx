"use client";

import { useEffect, useRef, useState } from "react";
import { BrandLockup } from "./brand";
import { CutawayMap } from "./cutaway-map";
import { StructuredData } from "./structured-data";
import { copy } from "./copy";
import { asset, contactPath, languages, route } from "./site-config";
import type { Lang } from "./site-config";

export type { Lang };


const threatIcons = [
  <svg key="emanation" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
    <rect x="8" y="36" width="12" height="12" fill="currentColor" stroke="none" />
    <path d="M14 28 A14 14 0 0 1 28 42" />
    <path d="M14 20 A22 22 0 0 1 36 42" />
    <path d="M14 12 A30 30 0 0 1 44 42" />
  </svg>,
  <svg key="interference" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
    <path d="M8 44 V32" />
    <path d="M16 44 V24" />
    <path d="M24 44 V16" />
    <path d="M44 6 L32 26 H39 L28 50 L42 30 H35 Z" fill="currentColor" stroke="none" />
  </svg>,
  <svg key="emp" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
    <circle cx="28" cy="28" r="4" fill="currentColor" stroke="none" />
    <circle cx="28" cy="28" r="11" />
    <path d="M28 4 v8 M28 44 v8 M4 28 h8 M44 28 h8 M11 11 l6 6 M39 39 l6 6 M45 11 l-6 6 M11 45 l6 -6" />
  </svg>,
  <svg key="boundary" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
    <path d="M28 8 H8 V48 H48 V8 H44" />
    <path d="M36 2 V24" />
    <path d="M30 18 l6 6 6 -6" />
  </svg>,
];

// Anchor standards per mission profile, index-aligned with `applications`.
// Standard designations are proper nouns and stay in their original form; only
// the label above them is translated.
// Guaranteed attenuation per EN 50147-1 / IEEE 299. Frequency labels and the
// decibel figures are language-independent; only the field type is translated.
// The bar maps 80–125 dB onto the column height so the curve stays readable.
const attenuationRows = [
  ["10 kHz", 90, "magnetic"],
  ["100 kHz", 100, "magnetic"],
  ["1 MHz", 110, "magnetic"],
  ["100 MHz", 120, "plane"],
  ["400 MHz", 120, "plane"],
  ["1 GHz", 110, "plane"],
  ["18 GHz", 100, "microwave"],
  ["40 GHz", 100, "microwave"],
] as const;

const barHeight = (db: number) => `${Math.round(((db - 80) / 45) * 100)}%`;

// Citations, never links — the page does not send visitors to external sites.
// Each entry carries the issuing body, the document reference and the clause it
// was read from, so a reader can find the source without being handed a URL.
// Document titles are proper nouns and stay in English; what each one supports
// on this page is translated per locale as `evidenceUsedFor`.
const evidenceSources = [
  ["NDSS 2026", "Peering Inside the Black Box — long-range model architecture snooping via GPU electromagnetic side channels"],
  ["arXiv 2603.02891", "Kraken — parameter extraction from NVIDIA Tensor Cores"],
  ["IEC 61000-2-9", "Electromagnetic compatibility — Part 2-9: Description of HEMP environment, radiated disturbance"],
  ["IEC 61000-4-36", "Electromagnetic compatibility — Part 4-36: IEMI immunity test methods for equipment and systems"],
  ["NCSC", "TEMPEST and electromagnetic security guidance"],
  ["SL5 Standard v0.1", "Security Level 5 Standard for AI security — Section 3.9 SA-4, shielded rack enclosures in the weight enclave"],
  ["RAND RRA2849-1", "Securing AI Model Weights — the SL1–SL5 security level framework"],
  ["NIST SP 800-53", "Security and Privacy Controls for Information Systems and Organizations — control PE-19, Information Leakage"],
  ["CISA", "EMP Protection and Resilience Guidelines for Critical Infrastructure, v2.2 — Level 4 protection"],
  ["EN 50600", "Information technology — Data centre facilities and infrastructures"],
] as const;

// Importance rating and responsibility tone, aligned with the scope rows above.
const scopeMeta = [
  [5, "core"], [5, "core"], [5, "core"], [5, "core"], [5, "core"],
  [4, "service"], [2, "partner"], [2, "partner"], [2, "customer"],
] as const;

const revealSelector = [
  ".sector-grid article",
  ".focus-block li",
  ".belief-grid article",
  ".answer-section .why-value",
  ".company-glance li",
  ".company-column",
  ".threat-grid article",
  ".feature-list article",
  ".step-list article",
  ".scenario-grid article",
  ".compare-row",
  ".ecosystem-grid article",
  ".scope-list tbody tr",
  ".standards-row div",
  ".verify-stats div",
  ".technology-block li",
  ".environment-lists section",
  ".accessory-grid section",
  ".faq-list details",
  ".why-metric",
  ".system-image",
  ".environment-visual",
  ".verify-visual",
  ".lifecycle-visual",
].join(",");

// Photography for the six product lines, in the order the cards are listed.
const ecosystemImages = ["structure", "access", "connectivity", "air", "validation", "lifecycle"];
// Photography for the six application sectors, in group order: four
// industrial, then two home security. Index-aligned with `sectorAlt`.
const sectorImages = ["hyperscale", "colocation", "government", "drone", "home", "chamber"];

/** The hero backdrop, in the order it plays.
 *
 *  Built plant, not a render: the band used to hold a 3D turntable of a hall
 *  being assembled, and a rotating model of a thing is a weaker claim than a
 *  photograph of the same thing standing in a building. All four are Frankonia
 *  reference installations.
 *
 *  The four were picked so each is a different room at a different exposure —
 *  a modular volume inside a plant hall, a working bay under a red service
 *  gantry, the shielded envelope seen from outside, the filtered power entry —
 *  so the cut between them reads as a change of scene, not a change of crop.
 *
 *  Subject placement decided the shortlist as much as subject did: the scrim
 *  is opaque ink to 44% of the band and only clears past 78%, so a frame only
 *  earns a place if what it shows sits right of center. The first frame is the
 *  LCP image — it loads at high priority and is what a visitor sees at t=0. */
const heroSlides = [
  { src: "/images/hero/hero-shielded-hall.webp" },
  { src: "/images/hero/hero-shielded-bay.webp" },
  { src: "/images/hero/hero-modular-volume.webp" },
  { src: "/images/hero/hero-power-filters.webp" },
];

const navSectionIds = ["why", "applications", "verification", "solution", "ecosystem", "process", "company"];

export function Landing({ lang }: { lang: Lang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const metricRef = useRef<HTMLElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

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

  // Reveal cards as they scroll into view; anything already on screen stays visible.
  // Cards start hidden, so every path here must end with them shown.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    const targets = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));
    if (!targets.length) return;

    const pending = new Set(targets);
    const reveal = (el: Element) => {
      el.classList.add("is-in");
      pending.delete(el as HTMLElement);
    };

    targets.forEach((el) => {
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
      el.style.setProperty("--reveal-delay", `${Math.min(siblings.indexOf(el), 5) * 70}ms`);
      el.classList.add("reveal");
      if (el.getBoundingClientRect().top < window.innerHeight) reveal(el);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    pending.forEach((el) => observer.observe(el));

    // Fallback: if the observer never delivers, scrolling still uncovers the cards.
    const onScroll = () => {
      if (!pending.size) {
        window.removeEventListener("scroll", onScroll);
        return;
      }
      pending.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          observer.unobserve(el);
          reveal(el);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [lang]);

  // Count the headline statistic up once it is on screen.
  useEffect(() => {
    const el = metricRef.current;
    if (!el) return;
    // The figure may be decimal, and German writes it with a comma, so the
    // number is pulled out of the string rather than assumed to lead it.
    const found = t.whyMetric.match(/[\d.,]+/);
    if (!found) return;
    const numeric = found[0];
    const comma = numeric.includes(",");
    const target = parseFloat(comma ? numeric.replace(",", ".") : numeric);
    if (Number.isNaN(target) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const decimals = (numeric.split(/[.,]/)[1] ?? "").length;
    const prefix = t.whyMetric.slice(0, found.index);
    const suffix = t.whyMetric.slice((found.index ?? 0) + numeric.length);
    const render = (value: number) => {
      const shown = value.toFixed(decimals);
      return prefix + (comma ? shown.replace(".", ",") : shown) + suffix;
    };

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const started = performance.now();
        const step = (now: number) => {
          const progress = Math.min(1, (now - started) / 1000);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = render(target * eased);
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [t.whyMetric]);

  // Scroll progress bar + active navigation link.
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>(".scroll-progress i");
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = max > 0 ? window.scrollY / max : 0;
        bar?.style.setProperty("transform", `scaleX(${Math.min(1, ratio)})`);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = navSectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          document.querySelectorAll<HTMLAnchorElement>(".nav-desktop a").forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [lang]);

  /** Both calls to action now lead to the contact page rather than to a
   *  section further down; `request` preselects the enquiry it belongs to. */
  const goContact = (type: "consultation" | "quote") => {
    setMenuOpen(false);
    window.location.href = `${contactPath(lang)}?request=${type}`;
  };

  const navLinks = (
    <>
      {/* Listed in the order the sections now appear, so the scroll-spy
          highlight only ever moves forward as the reader goes down. */}
      <a href="#why" onClick={() => setMenuOpen(false)}>{t.nav.threats}</a>
      <a href="#applications" onClick={() => setMenuOpen(false)}>{t.nav.applications}</a>
      <a href="#verification" onClick={() => setMenuOpen(false)}>{t.nav.verification}</a>
      <a href="#solution" onClick={() => setMenuOpen(false)}>{t.nav.solution}</a>
      <a href="#ecosystem" onClick={() => setMenuOpen(false)}>{t.nav.ecosystem}</a>
      <a href="#process" onClick={() => setMenuOpen(false)}>{t.nav.process}</a>
      <a href="#company" onClick={() => setMenuOpen(false)}>{t.nav.company}</a>
      {/* A route, not an anchor: the enquiry form has a page of its own. */}
      <a href={contactPath(lang)} onClick={() => setMenuOpen(false)}>{t.nav.contact}</a>
    </>
  );

  return (
    <main>
      <StructuredData
        lang={lang}
        faqs={t.faqs}
        productLines={t.ecosystemCards}
        description={t.heroBody}
      />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Frankonia CyberShield home">
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
                    <a
                      href={route(path)}
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

      <section className="hero" id="top">
        {/* The plant behind the headline. Decorative: the h1 states what
            CyberShield does and these state what it looks like built — naming
            them in alt would put a caption in front of the sentence they
            illustrate. Plain <img> rather than a CSS background so the first
            frame is in the HTML the parser reaches first; it is the largest
            thing on the page and should start downloading before the
            stylesheet resolves. The other three are `low` so they queue behind
            it instead of competing for the same connection.

            The wrapper is what keeps the scrim on top: the slides carry
            z-index to order the cross-dissolve, and without a stacking context
            of their own they would climb over `.hero::after` and take the
            headline's contrast with them. */}
        <div className="hero-media" aria-hidden="true">
          {heroSlides.map((slide, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={slide.src}
              className="hero-shot"
              src={asset(slide.src)}
              alt=""
              width={2000}
              height={1333}
              fetchPriority={i === 0 ? "high" : "low"}
              decoding="async"
            />
          ))}
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.heroTitle}<br /><span>{t.heroAccent}</span></h1>
            <p className="hero-body">{t.heroBody}</p>
            <div className="hero-actions">
              <button className="button" onClick={() => goContact("consultation")}>{t.consultation}<span>↗</span></button>
              <a className="text-link" href="#solution">{t.explore}<span>↓</span></a>
            </div>
          </div>
        </div>
        <div className="metrics">
          {t.metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
      </section>

      {/* The reversal, stated before anything else: the practice is the
          problem, not the reader — so it opens the page. */}
      <section className="belief-section" id="belief" aria-labelledby="belief-title">
        <div className="section-heading light">
          <p className="eyebrow">{t.beliefEyebrow}</p>
          <h2 id="belief-title">{t.beliefTitle}</h2>
        </div>
        <div className="belief-grid">
          <article className="belief-now">
            <p className="belief-label">{t.beliefLabels[0]}</p>
            <p>{t.beliefStatusQuo}</p>
          </article>
          <article className="belief-next">
            <p className="belief-label">{t.beliefLabels[1]}</p>
            <p>{t.beliefBelief}</p>
          </article>
        </div>
      </section>

      {/* The answer, stated once and compactly. The system and verification
          sections below are the elaboration, not the reveal. */}
      <section className="answer-section">
        <div className="why-value">
          <div>
            <p className="eyebrow">{t.whyValueLabel}</p>
            <h3>{t.whyValueTitle}</h3>
          </div>
          <p>{t.whyValueBody}</p>
        </div>
      </section>

      <div className="proof-strip">
        {t.proof.map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}
      </div>

      <section className="why-section" id="why">
        <div className="why-intro">
          <div>
            <p className="eyebrow">{t.whyEyebrow}</p>
            <h2>{t.whyTitle}</h2>
            <p className="lead">{t.whyBody}</p>
          </div>
          <aside className="why-metric" aria-label={t.whyMetricLabel}>
            <strong ref={metricRef}>{t.whyMetric}</strong>
            <span>{t.whyMetricLabel}</span>
          </aside>
        </div>
      </section>

      <section className="threat-section section-dark" aria-labelledby="threat-title">
        <div className="section-heading">
          <p className="eyebrow">{t.threatEyebrow}</p>
          <h2 id="threat-title">{t.threatTitle}</h2>
          <p>{t.threatBody}</p>
        </div>
        <div className="threat-grid">
          {t.threats.map(([title, body, impact], index) => (
            <article key={title}>
              <span className="threat-number">0{index + 1}</span>
              <div className="threat-icon" aria-hidden="true">{threatIcons[index]}</div>
              <h3>{title}</h3>
              <p>{body}</p>
              <div className="impact-tag"><span>{t.impactLabel}</span><strong>{impact}</strong></div>
            </article>
          ))}
        </div>
      </section>

      {/* Who the room is for: the six sectors of the brochure, in its two
          groups — industrial on one side, home security on the other. Each
          card carries the brochure line and the executive summary's core
          deliverable; each group closes with its focus list. */}
      <section className="applications-section" id="applications">
        <div className="section-heading light">
          <p className="eyebrow">{t.applicationsEyebrow}</p>
          <h2>{t.applicationsTitle}</h2>
          <p>{t.applicationsBody}</p>
        </div>
        {t.applicationGroups.map((group, g, groups) => {
          // Sector images and alts are one flat list across both groups.
          const offset = groups.slice(0, g).reduce((n, previous) => n + previous.sectors.length, 0);
          return (
          <div className="application-group" key={group.title}>
            <div className="application-group-label">
              <span>0{g + 1}</span>
              <h3>{group.title}</h3>
              <p>{group.tagline}</p>
            </div>
            <div className="application-group-body">
              <div className="sector-grid">
                {group.sectors.map(([title, body, deliverable], i) => (
                  <article key={title}>
                    <img
                      src={asset(`/images/sectors/${sectorImages[offset + i]}.webp`)}
                      width={1000}
                      height={667}
                      loading="lazy"
                      decoding="async"
                      alt={t.sectorAlt[offset + i]}
                    />
                    <div className="sector-body">
                      <span>0{g + 1}.{i + 1}</span>
                      <h4>{title}</h4>
                      <p>{body}</p>
                      <p className="sector-deliverable"><span>{t.deliverableLabel}</span>{deliverable}</p>
                    </div>
                  </article>
                ))}
              </div>
              <div className="focus-block">
                <h4>{group.focusTitle}</h4>
                <ul>
                  {group.focus.map(([label, note]) => (
                    <li key={label}><strong>{label}</strong><span>{note}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          );
        })}
        {/* One call to action for the section, not one per sector. */}
        <div className="applications-cta">
          <button className="button" onClick={() => goContact("consultation")}>
            {t.consultation}<span>↗</span>
          </button>
        </div>
      </section>

      <section className="scenario-section">
        <div className="section-heading light">
          <p className="eyebrow">{t.scenarioEyebrow}</p>
          <h2>{t.scenarioTitle}</h2>
        </div>
        <div className="scenario-grid">
          {t.scenarios.map(([tag, title, challenge, approach, outcome]) => (
            <article key={title}>
              <p className="scenario-tag">{tag}</p>
              <h3>{title}</h3>
              <div><span>{t.scenarioLabels.challenge}</span><p>{challenge}</p></div>
              <div><span>{t.scenarioLabels.approach}</span><p>{approach}</p></div>
              <div className="scenario-outcome"><span>{t.scenarioLabels.outcome}</span><p>{outcome}</p></div>
            </article>
          ))}
        </div>
        <p className="scenario-note">
          {t.scenarioNote}
          <a
            className="outbound"
            href="https://frankonia-solutions.com/anechoic-chambers/references_anechoic-chambers/"
            target="_blank"
            rel="noreferrer"
          >
            {t.scenarioLink}<span aria-hidden="true">↗</span>
          </a>
        </p>
      </section>

      <section className="verify-section" id="verification">
        <div className="verify-content">
          <p className="eyebrow">{t.verifyEyebrow}</p>
          <h2>{t.verifyTitle}</h2>
          <p className="lead">{t.verifyBody}</p>
          <p className="standards-intro">{t.standardsIntro}</p>
          <div className="standards-row">
            {t.standards.map(([name, note]) => (
              <div key={name}><strong>{name}</strong><span>{note}</span></div>
            ))}
          </div>
          <p className="standards-intro">{t.regulatoryIntro}</p>
          <div className="standards-row">
            {t.regulatory.map(([name, note]) => (
              <div key={name}><strong>{name}</strong><span>{note}</span></div>
            ))}
          </div>
          <div className="evidence-row">
            <strong>{t.evidenceTitle}</strong>
            <p className="evidence-note">{t.evidenceNote}</p>
            <ul className="evidence-list">
              {evidenceSources.map(([reference, title], index) => (
                <li key={reference}>
                  <strong>{reference}</strong>
                  <span>{title}</span>
                  <em>{t.evidenceUsedFor[index]}</em>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="verify-aside">
          <div className="verify-visual">
            <img
              src={asset("/images/technician-verification.webp")}
              width={768}
              height={1376}
              loading="lazy"
              decoding="async"
              alt={t.alt.technician}
            />
          </div>
          {/* The three headline figures from the brochure's standard page. The
              full curve is in the attenuation band below; these are the values
              a reader carries away. */}
          <div className="verify-stats" aria-label={t.attenuationEyebrow}>
            {t.verifyStats.map(([value, at, field]) => (
              <div key={at}><strong>{value}</strong><span>{at}<br />{field}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="system-section" id="solution">
        <div className="system-image">
          <img
            src={asset("/images/facility-aerial.webp")}
            width={1024}
            height={1024}
            loading="lazy"
            decoding="async"
            alt={t.alt.facility}
          />
        </div>
        <div className="system-content">
          <p className="eyebrow">{t.systemEyebrow}</p>
          <h2>{t.systemTitle}</h2>
          <p className="lead">{t.systemBody}</p>
          <div className="feature-list">
            {t.features.map(([num, title, body]) => (
              <article key={num}>
                <span>{num}</span>
                <div><h3>{title}</h3><p>{body}</p></div>
              </article>
            ))}
          </div>
          <div className="technology-block">
            <h3>{t.technologyTitle}</h3>
            <ul>
              {t.technology.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* The module system itself — the brochure's "Shielded Environment"
          page: what a PAN room is made of, before the measured curve. */}
      <section className="environment-section" aria-labelledby="environment-title">
        <div className="environment-grid">
          <div className="environment-content">
            <p className="eyebrow">{t.environmentEyebrow}</p>
            <h2 id="environment-title">{t.environmentTitle}</h2>
            {t.environmentBody.map((paragraph) => <p className="lead" key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="environment-visual">
            <img
              src={asset("/images/hero/hero-modular-volume.webp")}
              width={2000}
              height={1333}
              loading="lazy"
              decoding="async"
              alt={t.environmentAlt}
            />
          </div>
        </div>
        <div className="environment-lists">
          <section aria-label={t.environmentFeaturesTitle}>
            <h3>{t.environmentFeaturesTitle}</h3>
            <ul>{t.environmentFeatures.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section aria-label={t.environmentStandardsTitle}>
            <h3>{t.environmentStandardsTitle}</h3>
            <ul>{t.environmentStandards.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        </div>
      </section>

      <section className="attenuation-section section-dark" id="attenuation" aria-labelledby="attenuation-title">
        <div className="section-heading">
          <p className="eyebrow">{t.attenuationEyebrow}</p>
          <h2 id="attenuation-title">{t.attenuationTitle}</h2>
          <p>{t.attenuationBody}</p>
        </div>
        <div className="table-scroll" role="region" tabIndex={0} aria-label={t.attenuationTitle}>
          <table className="attenuation-chart">
            <caption className="visually-hidden">{t.attenuationTitle}</caption>
            <thead>
              <tr>
                {attenuationRows.map(([frequency]) => <th key={frequency} scope="col">{frequency}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr className="attenuation-bars" aria-hidden="true">
                {attenuationRows.map(([frequency, db]) => (
                  <td key={frequency}>
                    <span className="attenuation-bar"><i style={{ height: barHeight(db) }} /></span>
                  </td>
                ))}
              </tr>
              <tr className="attenuation-values">
                {attenuationRows.map(([frequency, db]) => <td key={frequency}>&ge; {db} dB</td>)}
              </tr>
              <tr className="attenuation-fields">
                {attenuationRows.map(([frequency, , field]) => <td key={frequency}>{t.fieldTypes[field]}</td>)}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="attenuation-note">{t.attenuationNote}</p>
      </section>

      <section className="ecosystem-section" id="ecosystem">
        <div className="section-heading light">
          <p className="eyebrow">{t.ecosystemEyebrow}</p>
          <h2>{t.ecosystemTitle}</h2>
          <p>{t.ecosystemBody}</p>
        </div>
        <div className="ecosystem-grid">
          {t.ecosystemCards.map(([title, body, spec], index) => (
            <article key={title}>
              <img
                src={asset(`/images/ecosystem/${ecosystemImages[index]}.webp`)}
                width={1000}
                height={667}
                loading="lazy"
                decoding="async"
                alt={t.ecosystemAlt[index]}
              />
              <div className="ecosystem-body">
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
                <p className="ecosystem-spec">{spec}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="ecosystem-note">
          <a href="#attenuation">{t.ecosystemNote}<b>↑</b></a>
        </p>
        {/* The accessory catalogue from the brochure's components page: six
            lists, one per discipline, under the six product lines. */}
        <div className="accessory-intro">
          <h3>{t.accessoriesTitle}</h3>
          <p>{t.accessoriesBody}</p>
        </div>
        <div className="accessory-grid">
          {t.accessories.map(([title, items]) => (
            <section key={title} aria-label={title}>
              <h4>{title}</h4>
              <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          ))}
        </div>
      </section>

      <section className="cutaway-section" aria-labelledby="cutaway-title">
        <div className="section-heading">
          <p className="eyebrow">{t.cutawayEyebrow}</p>
          <h2 id="cutaway-title">{t.cutawayTitle}</h2>
          <p>{t.cutawayBody}</p>
        </div>
        <CutawayMap lang={lang} alt={t.cutawayAlt} hint={t.cutawayHint} />
      </section>

      <section className="lifecycle-section" id="process">
        <div className="lifecycle-visual">
          <img
            src={asset("/images/engineer-inspection.webp")}
            width={800}
            height={800}
            loading="lazy"
            decoding="async"
            alt={t.alt.engineer}
          />
        </div>
        <div className="lifecycle-content">
          <p className="eyebrow">{t.processEyebrow}</p>
          <h2>{t.processTitle}</h2>
          <div className="step-list">
            {t.processSteps.map(([num, title, body]) => (
              <article key={num}><span>{num}</span><div><h3>{title}</h3><p>{body}</p></div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="scope-section" aria-labelledby="scope-title">
        <div className="section-heading light">
          <p className="eyebrow">{t.scopeEyebrow}</p>
          <h2 id="scope-title">{t.scopeTitle}</h2>
          <p>{t.scopeBody}</p>
        </div>
        <div className="table-scroll" role="region" tabIndex={0} aria-label={t.scopeTitle}>
          <table className="scope-list">
            <caption className="visually-hidden">{t.scopeBody}</caption>
            <thead>
              <tr>{t.scopeHead.map((label) => <th key={label} scope="col">{label}</th>)}</tr>
            </thead>
            <tbody>
              {t.scopeRows.map(([category, tag, detail], index) => {
                const [rating, tone] = scopeMeta[index];
                return (
                  <tr key={category}>
                    <th scope="row">{category}</th>
                    <td>
                      <span className="scope-rating" aria-label={`${rating} / 5`}>
                        {[1, 2, 3, 4, 5].map((dot) => <i key={dot} className={dot <= rating ? "on" : ""} />)}
                      </span>
                    </td>
                    <td><span className={`scope-tag ${tone}`}>{tag}</span>{detail}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Who is behind the room, placed where the reader is deciding whether to
          trust the supplier rather than the specification. */}
      <section className="company-section" id="company" aria-labelledby="company-title">
        <div className="company-intro">
          <div className="section-heading light">
            <p className="eyebrow">{t.companyEyebrow}</p>
            <h2 id="company-title">{t.companyTitle}</h2>
            <p>{t.companyBody}</p>
            {/* The group site is the proof behind the paragraph above: the
                reader who wants to check who Frankonia is leaves from here,
                in a new tab so the page they are reading survives it. */}
            <a
              className="text-link company-link"
              href="https://www.frankonia-korea.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.companyLink}<span>↗</span>
            </a>
          </div>
          <img
            className="company-banner"
            src={asset("/images/frankonia-campus.webp")}
            width={983}
            height={553}
            loading="lazy"
            decoding="async"
            alt={t.companyImageAlt}
          />
        </div>
        <div className="company-glance">
          <h3>{t.companyGlanceTitle}</h3>
          <ul>
            {t.companyGlance.map(([label, note]) => (
              <li key={label}><strong>{label}</strong><span>{note}</span></li>
            ))}
          </ul>
        </div>
        <div className="company-grid">
          {t.companyColumns.map(([heading, items]) => (
            <section key={heading} className="company-column">
              <h3>{heading}</h3>
              <ul>
                {items.map(([label, note]) => (
                  <li key={label}><strong>{label}</strong><span>{note}</span></li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <div className="company-glance company-values">
          <h3>{t.companyValuesTitle}</h3>
          <ul>
            {t.companyValues.map(([label, note]) => (
              <li key={label}><strong>{label}</strong><span>{note}</span></li>
            ))}
          </ul>
        </div>
        {/* Entities and cities only. Addresses, numbers and mailboxes stay on
            the imprint, so the form remains the one route in. */}
        <div className="company-glance company-locations">
          <h3>{t.companyLocationsTitle}</h3>
          <ul>
            {t.companyLocations.map(([name, place]) => (
              <li key={name}><strong>{name}</strong><span>{place}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="faq-inner">
          <p className="eyebrow">{t.faqEyebrow}</p>
          <h2>{t.faqTitle}</h2>
          <div className="faq-list">
            {t.faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span aria-hidden="true">+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><BrandLockup registered /></div>
        <p>{t.footer}</p>
        <div>
          {/* The header switcher only renders its links once opened, so these
              are the crawlable path to the other locales. */}
          <nav className="footer-langs" aria-label={t.langLabel}>
            {languages.map(([code, , label, path]) => (
              <a key={code} href={route(path)} hrefLang={code} lang={code} aria-current={code === lang ? "true" : undefined}>
                {label}
              </a>
            ))}
          </nav>
          <a href={contactPath(lang)}>{t.nav.contact}</a>
          <a href={route("/privacy")}>Privacy</a>
          <a href={route("/imprint")}>Imprint</a>
          <a href="https://frankonia-solutions.com/" target="_blank" rel="noreferrer">© 1987 Frankonia Group</a>
        </div>
      </footer>
    </main>
  );
}
