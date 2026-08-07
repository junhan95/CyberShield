import { company } from "./legal";
import type { Lang } from "./site-config";
import { asset, langPath, route, siteOrigin } from "./site-config";

const url = (path: string) => `${siteOrigin}${route(path)}`;

const localeTag = { en: "en", de: "de", ko: "ko" } as const;

/**
 * Answer engines have to infer entities from prose unless they are stated
 * outright. Everything below is already on the page — the organisation details
 * come from the imprint, the questions from the FAQ section — so this only
 * restates it in a machine-readable form.
 */
export function StructuredData({
  lang,
  faqs,
  productLines,
  description,
}: {
  lang: Lang;
  faqs: readonly (readonly [string, string])[];
  // [name, description, spec] — the spec line is presentational only.
  productLines: readonly (readonly [string, string, string])[];
  description: string;
}) {
  const organisation = {
    "@type": "Organization",
    "@id": `${siteOrigin}${route("/")}#organization`,
    name: "Frankonia Group",
    legalName: company.name,
    url: `https://${company.website}/`,
    logo: `${siteOrigin}${asset("/frankonia-logo.svg")}`,
    foundingDate: "1987",
    vatID: company.vatId,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.street,
      postalCode: company.city.split(" ")[0],
      addressLocality: company.city.split(" ").slice(1).join(" "),
      addressCountry: "DE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: company.phone,
      email: company.salesEmail,
      availableLanguage: ["en", "de", "ko"],
    },
  };

  const graph = [
    organisation,
    {
      "@type": "WebSite",
      "@id": `${siteOrigin}${route("/")}#website`,
      url: url("/"),
      name: "Frankonia CyberShield",
      publisher: { "@id": organisation["@id"] },
      inLanguage: Object.values(localeTag),
    },
    {
      "@type": "WebPage",
      "@id": `${url(langPath(lang))}#webpage`,
      url: url(langPath(lang)),
      isPartOf: { "@id": `${siteOrigin}${route("/")}#website` },
      inLanguage: localeTag[lang],
      about: { "@id": `${siteOrigin}${route("/")}#product` },
      primaryImageOfPage: `${siteOrigin}${asset("/og.png")}`,
    },
    {
      "@type": "Product",
      "@id": `${siteOrigin}${route("/")}#product`,
      name: "Frankonia CyberShield",
      description,
      brand: { "@id": organisation["@id"] },
      manufacturer: { "@id": organisation["@id"] },
      category: "RF shielded enclosures for data centres",
      hasMeasurement: [
        {
          "@type": "QuantitativeValue",
          name: "Shielding attenuation, 100–400 MHz",
          value: 120,
          unitText: "dB",
        },
        {
          "@type": "QuantitativeValue",
          name: "Shielding attenuation, 10 kHz to 40 GHz",
          minValue: 90,
          value: 100,
          unitText: "dB",
        },
      ],
      isRelatedTo: productLines.map(([name, text]) => ({
        "@type": "Product",
        name,
        description: text,
      })),
      additionalProperty: [
        "EN 50147-1",
        "IEEE 299",
        "BSI TL-03305",
        "BSI TL-03306",
        "NATO SDIP-27 Level A",
        "MIL-STD-188-125-1",
        "MIL-STD-188-125-2",
        "ISO/IEC 27001",
      ].map((standard) => ({
        "@type": "PropertyValue",
        name: "Standard",
        value: standard,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${url(langPath(lang))}#faq`,
      inLanguage: localeTag[lang],
      mainEntity: faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      // The payload is built from literals in this repository, not user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
