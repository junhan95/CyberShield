"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { BrandLockup } from "./brand";
import { SiteHeader } from "./site-header";
import { copy } from "./copy";
import { asset, languages, route } from "./site-config";
import type { Lang } from "./site-config";

type Inquiry = "consultation" | "quote";

/**
 * The enquiry page, built to the same shape as the contact page on
 * frankonia-korea.com: a page head, the form, the three things worth putting
 * in the first mail, the five group offices, and a closing line.
 *
 * Two things differ from that page, both deliberate.
 *
 * It carries the landing page's own navigation bar rather than a reduced
 * header, so a reader who arrives here from a search result has the whole site
 * in front of them.
 *
 * And it sends by mailto. The Korean site posts to a PHP endpoint; here the
 * submit builds a message from the fields and hands it to the reader's own
 * mail application, which is why the copy on this page never claims the
 * enquiry has been sent — it has not, until they send it. `public/api/
 * inquiry.php` is left in place and is no longer what this form uses.
 */
export function ContactPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [inquiry, setInquiry] = useState<Inquiry>("consultation");
  const [handedOff, setHandedOff] = useState(false);
  /** The built mail, handed over by clicking a real link rather than by
   *  assigning to location: browsers are markedly more willing to launch an
   *  external protocol from a click they can attribute to the submit. */
  const mailRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // The landing page's calls to action arrive here with the request they meant.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("request");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (requested === "quote") setInquiry("quote");
  }, []);

  /** The enquiry as a plain-text mail, in the reader's own client. */
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const subject =
      inquiry === "quote"
        ? "[CyberShield] Quote request"
        : "[CyberShield] Consultation request";
    const body = [
      `${t.labels.type}: ${inquiry === "quote" ? t.quote : t.consultation}`,
      `${t.labels.name}: ${value("name")}`,
      `${t.labels.company}: ${value("company")}`,
      `${t.labels.email}: ${value("email")}`,
      `${t.labels.country}: ${value("country")}`,
      `${t.labels.project}: ${value("project")}`,
      `${t.labels.stage}: ${value("stage")}`,
      "",
      `${t.labels.message}:`,
      value("message"),
    ].join("\r\n");
    // encodeURIComponent, not URLSearchParams: the latter encodes spaces as
    // "+", which mail clients render literally in the subject line.
    const href =
      `mailto:${t.contactEmail}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
    const link = mailRef.current;
    if (!link) return;
    link.href = href;
    link.click();
    setHandedOff(true);
  };

  return (
    <main className="contact-page">
      <SiteHeader lang={lang} />

      <div className="page-head">
        <div>
          <p className="eyebrow">{t.contactEyebrow}</p>
          <h1>{t.contactTitle}</h1>
          <p className="page-head-lead">{t.contactBody}</p>
        </div>
      </div>

      <section className="enquiry-section" id="enquiry" aria-labelledby="enquiry-title">
        <div className="section-heading light">
          <p className="eyebrow">{t.enquiryEyebrow}</p>
          <h2 id="enquiry-title">{t.enquiryTitle}</h2>
          <p>{t.enquiryBody}</p>
        </div>

        <form onSubmit={submit}>
          <fieldset className="request-toggle">
            <legend>{t.labels.type}</legend>
            <label className={inquiry === "consultation" ? "selected" : ""}>
              <input type="radio" name="request" value="consultation" checked={inquiry === "consultation"} onChange={() => setInquiry("consultation")} />
              {t.consultation}
            </label>
            <label className={inquiry === "quote" ? "selected" : ""}>
              <input type="radio" name="request" value="quote" checked={inquiry === "quote"} onChange={() => setInquiry("quote")} />
              {t.quote}
            </label>
          </fieldset>
          <div className="form-grid">
            <label>{t.labels.name}<input required name="name" autoComplete="name" /></label>
            <label>{t.labels.company}<input required name="company" autoComplete="organization" /></label>
            <label>{t.labels.email}<input required type="email" name="email" autoComplete="email" /></label>
            <label>{t.labels.country}<input required name="country" autoComplete="country-name" /></label>
            <label>{t.labels.project}
              <select name="project" required defaultValue="">
                <option value="" disabled>—</option>
                <option>{t.options.newBuild}</option><option>{t.options.retrofit}</option><option>{t.options.confidential}</option>
              </select>
            </label>
            <label>{t.labels.stage}
              <select name="stage" required defaultValue="">
                <option value="" disabled>—</option>
                <option>{t.options.concept}</option><option>{t.options.planning}</option><option>{t.options.procurement}</option><option>{t.options.urgent}</option>
              </select>
            </label>
            <label className="full">{t.labels.message}<textarea required name="message" rows={4} /></label>
          </div>
          <label className="consent"><input type="checkbox" name="consent" required /> <span>{t.labels.consent}</span></label>
          <button className="button submit" type="submit">
            {inquiry === "quote" ? t.labels.submitQuote : t.labels.submitConsultation}
            <span>↗</span>
          </button>
          {/* Off-screen rather than hidden: a display:none link cannot be
              clicked in every browser, and this one has to be. */}
          <a ref={mailRef} className="visually-hidden" aria-hidden="true" tabIndex={-1} href={`mailto:${t.contactEmail}`}>{t.labels.submitConsultation}</a>
          <p className="form-status" role="status" aria-live="polite">
            {handedOff && <span className="form-status-ok">{t.mailtoHandedOff}</span>}
          </p>
          <p className="email-note">{t.mailtoNote}</p>
        </form>

        <div className="enquiry-aside">
          {/* The address in plain sight, for a reader whose browser cannot open
              a mail client for them. */}
          <div className="contact-direct">
            <h2>{t.contactDirectTitle}</h2>
            <p>{t.contactDirectBody}</p>
            <a className="contact-email" href={`mailto:${t.contactEmail}`}>{t.contactEmail}</a>
          </div>

          <div className="brochure">
            <a className="brochure-link" href={asset("/downloads/frankonia-cybershield-2026.pdf")} download>
              <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 2.5v10" />
                <path d="M6 9l4 4 4-4" />
                <path d="M3.5 16.5h13" />
              </svg>
              {t.brochureLabel}
            </a>
            <p className="brochure-meta">{t.brochureMeta}</p>
          </div>

        </div>
      </section>

      <section className="send-section" aria-labelledby="send-title">
        <div className="section-heading light">
          <p className="eyebrow">{t.sendEyebrow}</p>
          <h2 id="send-title">{t.sendTitle}</h2>
          <p>{t.sendBody}</p>
        </div>
        <div className="send-grid">
          {t.sendItems.map(([title, body], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="offices-section" aria-labelledby="offices-title">
        <div className="section-heading light">
          <p className="eyebrow">{t.officesEyebrow}</p>
          <h2 id="offices-title">{t.officesTitle}</h2>
          <p>{t.officesBody}</p>
        </div>
        <ul className="offices-list">
          {t.offices.map(([name, address, email, phone]) => (
            <li key={name}>
              <strong>{name}</strong>
              <div>
                <span className="office-address">{address}</span>
                <span className="office-reach">
                  <a href={`mailto:${email}`}>{email}</a>
                  <i aria-hidden="true">·</i>
                  <a href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="contact-closing">
        <p>{t.contactClosing}</p>
      </section>

      <footer>
        <div className="footer-brand"><BrandLockup registered /></div>
        <p>{t.footer}</p>
        <div>
          <nav className="footer-langs" aria-label={t.langLabel}>
            {languages.map(([code, , label, path]) => (
              <a key={code} href={route(path)} hrefLang={code} lang={code}>
                {label}
              </a>
            ))}
          </nav>
          <a href={route("/privacy")}>Privacy</a>
          <a href={route("/imprint")}>Imprint</a>
          <a href="https://frankonia-solutions.com/" target="_blank" rel="noreferrer">© 1987 Frankonia Group</a>
        </div>
      </footer>
    </main>
  );
}
