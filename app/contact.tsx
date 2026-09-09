"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { BrandLockup } from "./brand";
import { copy } from "./copy";
import { asset, contactPath, languages, route } from "./site-config";
import type { Lang } from "./site-config";

type Inquiry = "consultation" | "quote";
type SendState = "idle" | "sending" | "sent" | "error";

/**
 * The enquiry form, on a page of its own rather than as the last band of the
 * landing page. It carries what the landing page used to hold — the two
 * request types, the brochure and the form — and adds what only a contact page
 * can: the sales address in plain sight and the two Frankonia sites this
 * product sits between.
 *
 * The field set follows the head-office quotation form at
 * frankonia-solutions.com/contact/quotation-and-info: company and postal
 * address, country, name, phone, e-mail, industry, what the enquiry concerns,
 * and a free-text field. The product checkboxes are the CyberShield lines
 * rather than the chamber catalogue, and the head office's "are you a human?"
 * question is replaced by the honeypot and fill-time check this endpoint
 * already runs — neither of which asks the visitor to prove anything.
 */
export function ContactPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [inquiry, setInquiry] = useState<Inquiry>("consultation");
  const [sendState, setSendState] = useState<SendState>("idle");
  const [fallbackHref, setFallbackHref] = useState("");
  // Bots submit instantly; the endpoint drops anything filled in faster than a
  // person could plausibly type it. Stamped on mount rather than during render,
  // which has to stay pure.
  const formOpenedAt = useRef(0);

  useEffect(() => {
    document.documentElement.lang = lang;
    formOpenedAt.current = Date.now();
  }, [lang]);

  // The landing page's calls to action arrive here with the request they meant.
  // The query string is an external system read once at mount — the page is
  // statically exported, so there is no request-time value to render from.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("request");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (requested === "quote") setInquiry("quote");
  }, []);

  const industries = [
    t.options.industryDatacenter,
    t.options.industryGovernment,
    t.options.industryEnterprise,
    t.options.industryResidential,
    t.options.industryOther,
  ];
  // The six product lines, named exactly as the ecosystem section names them.
  const interests = t.ecosystemCards.map(([title]) => title);

  /** The mailto this form used to be. Kept as the escape hatch for when the
   *  endpoint is unreachable, so a visitor is never left holding an inquiry
   *  with nowhere to put it. */
  const mailtoHref = (data: FormData) => {
    const subject =
      inquiry === "quote"
        ? "[CyberShield] Quote request"
        : "[CyberShield] Consultation request";
    const body = [
      `Request: ${inquiry}`,
      `Name: ${data.get("name")}`,
      `Company: ${data.get("company")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone")}`,
      `Address: ${[data.get("street"), data.get("zip"), data.get("city")].filter(Boolean).join(", ")}`,
      `Country / region: ${data.get("country")}`,
      `Industry: ${data.get("industry")}`,
      `Interest: ${data.getAll("interest").join(", ")}`,
      `Project type: ${data.get("project")}`,
      `Project stage: ${data.get("stage")}`,
      "",
      "Requirements:",
      String(data.get("message") || ""),
    ].join("\n");
    return `mailto:${t.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sendState === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setFallbackHref(mailtoHref(data));
    setSendState("sending");
    try {
      const response = await fetch(asset("/api/inquiry.php"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          request: inquiry,
          lang,
          name: data.get("name"),
          company: data.get("company"),
          email: data.get("email"),
          phone: data.get("phone"),
          street: data.get("street"),
          zip: data.get("zip"),
          city: data.get("city"),
          country: data.get("country"),
          industry: data.get("industry"),
          interest: data.getAll("interest"),
          project: data.get("project"),
          stage: data.get("stage"),
          message: data.get("message"),
          consent: data.get("consent") === "on",
          website: data.get("website"),
          elapsed: (Date.now() - formOpenedAt.current) / 1000,
        }),
      });
      const result = response.ok ? await response.json().catch(() => null) : null;
      if (!result?.ok) throw new Error("rejected");
      form.reset();
      setSendState("sent");
    } catch {
      setSendState("error");
    }
  };

  return (
    <main className="contact-page">
      <header className="site-header">
        <a className="brand" href={route("/")} aria-label="Frankonia CyberShield home">
          <BrandLockup decorative onLight />
        </a>
        <div className="header-actions">
          {/* No dropdown here: three plain links are shorter than the control
              that would hide them, and this page has no scroll-spy to keep. */}
          <nav className="contact-langs" aria-label={t.langLabel}>
            {languages.map(([code, short]) => (
              <a
                key={code}
                href={contactPath(code)}
                hrefLang={code}
                lang={code}
                className={code === lang ? "current" : ""}
                aria-current={code === lang ? "true" : undefined}
              >
                {short}
              </a>
            ))}
          </nav>
          <a className="text-link legal-back" href={route("/")}>
            {t.contactBack}<span>↗</span>
          </a>
        </div>
      </header>

      <section className="contact-section" id="contact">
        <div className="contact-intro">
          <p className="eyebrow">{t.contactEyebrow}</p>
          <h1>{t.contactTitle}</h1>
          <p className="contact-lead">{t.contactBody}</p>

          {/* On the landing page the address was deliberately withheld so the
              form stayed the only route in. A contact page is the one place it
              belongs, so here it is stated. */}
          <div className="contact-direct">
            <h2>{t.contactDirectTitle}</h2>
            <p>{t.contactDirectBody}</p>
            <a className="contact-email" href={`mailto:${t.contactEmail}`}>{t.contactEmail}</a>
          </div>

          <div className="brochure">
            <a
              className="brochure-link"
              href={asset("/downloads/frankonia-cybershield-2026.pdf")}
              download
            >
              <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 2.5v10" />
                <path d="M6 9l4 4 4-4" />
                <path d="M3.5 16.5h13" />
              </svg>
              {t.brochureLabel}
            </a>
            <p className="brochure-meta">{t.brochureMeta}</p>
          </div>

          <div className="contact-links">
            <h2>{t.contactLinksTitle}</h2>
            <ul>
              {t.contactLinks.map(([name, detail, href]) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noreferrer">
                    {name}<span aria-hidden="true">↗</span>
                  </a>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form onSubmit={submit} action={asset("/api/inquiry.php")} method="post">
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
            <label>{t.labels.company}<input required name="company" autoComplete="organization" /></label>
            <label>{t.labels.name}<input required name="name" autoComplete="name" /></label>
            <label>{t.labels.email}<input required type="email" name="email" autoComplete="email" /></label>
            <label>{t.labels.phone}<input required type="tel" name="phone" autoComplete="tel" /></label>
            {/* Optional, exactly as on the head-office form: an enquiry is not
                worth losing over a postal address. */}
            <label className="full">{t.labels.street}<input name="street" autoComplete="street-address" /></label>
            <label>{t.labels.zip}<input name="zip" autoComplete="postal-code" /></label>
            <label>{t.labels.city}<input name="city" autoComplete="address-level2" /></label>
            <label>{t.labels.country}<input required name="country" autoComplete="country-name" /></label>
            <label>{t.labels.industry}
              <select name="industry" required defaultValue="">
                <option value="" disabled>—</option>
                {industries.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
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
            <fieldset className="full interest-set">
              <legend>{t.labels.interest}</legend>
              <div className="interest-options">
                {interests.map((option) => (
                  <label key={option} className="check">
                    <input type="checkbox" name="interest" value={option} /> <span>{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="full">{t.labels.message}<textarea required name="message" rows={5} /></label>
          </div>
          <label className="consent"><input type="checkbox" name="consent" required /> <span>{t.labels.consent}</span></label>
          {/* Honeypot. Moved off-screen rather than display:none, because
              headless browsers routinely skip fields they cannot see. */}
          <div className="honeypot" aria-hidden="true">
            <label>{t.formHoneypot}<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
          </div>
          <button className="button submit" type="submit" disabled={sendState === "sending" || sendState === "sent"}>
            {sendState === "sending"
              ? t.formSending
              : inquiry === "quote" ? t.labels.submitQuote : t.labels.submitConsultation}
            <span>↗</span>
          </button>
          <p className="form-status" role="status" aria-live="polite">
            {sendState === "sent" && <span className="form-status-ok">{t.formSent}</span>}
            {sendState === "error" && (
              <span className="form-status-error">
                {t.formError} <a href={fallbackHref}>{t.formErrorAction}</a>
              </span>
            )}
          </p>
          <p className="email-note">{t.emailNote}</p>
        </form>
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
