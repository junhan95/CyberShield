import type { Metadata, Viewport } from "next";
import { company, LegalPage } from "../legal";
import { siteViewport } from "../site-metadata";
import { asset, isIndexable, route, siteOrigin } from "../site-config";

export const viewport: Viewport = siteViewport;

export const metadata: Metadata = {
  title: "Imprint | Frankonia CyberShield",
  description: "Legal notice and provider identification for the Frankonia CyberShield website.",
  icons: {
    icon: [
      { url: asset("/favicon.svg"), type: "image/svg+xml" },
      { url: asset("/favicon.ico"), sizes: "32x32 48x48" },
    ],
    apple: asset("/apple-touch-icon.png"),
  },
  manifest: asset("/site.webmanifest"),
  alternates: { canonical: `${siteOrigin}${route("/imprint")}` },
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
};

export default function Imprint() {
  return (
    <LegalPage
      title="Imprint"
      intro="Provider identification and legal notice for this website."
      updated="3 August 2026"
    >
      <section>
        <h2>1. Provider</h2>
        <p>
          {company.name}
          <br />
          {company.street}
          <br />
          {company.city}
          <br />
          {company.country}
        </p>
      </section>

      <section>
        <h2>2. Represented by</h2>
        <p>Managing Directors: {company.directors}</p>
      </section>

      <section>
        <h2>3. Contact</h2>
        <p>
          Telephone: {company.phone}
          <br />
          Fax: {company.fax}
          <br />
          E-mail: {company.email}
          <br />
          CyberShield enquiries: {company.salesEmail}
          <br />
          Website: {company.website}
        </p>
      </section>

      <section>
        <h2>4. Register entry</h2>
        <p>
          Register: Commercial register (Handelsregister)
          <br />
          Registering court: {company.registerCourt}
          <br />
          Registration number: {company.registerNumber}
        </p>
      </section>

      <section>
        <h2>5. VAT identification number</h2>
        <p>
          VAT identification number pursuant to § 27a of the German Value Added Tax Act:{" "}
          {company.vatId}
        </p>
      </section>

      <section>
        <h2>6. Responsible for editorial content</h2>
        <p>
          Responsible pursuant to § 18(2) of the German Interstate Media Treaty (MStV):
          <br />
          {company.directors}, {company.street}, {company.city}, {company.country}
        </p>
      </section>

      <section>
        <h2>7. Liability for content</h2>
        <p>
          The content of this website has been prepared with care. As a service provider we are
          responsible for our own content on these pages under general law. We are not obliged to
          monitor transmitted or stored third-party information, or to investigate circumstances
          that indicate unlawful activity. Obligations to remove or block the use of information
          under general law remain unaffected; liability in this respect begins only from the point
          at which a specific infringement becomes known. Where we become aware of any such
          infringement, we will remove the content promptly.
        </p>
        <p>
          Technical specifications, performance figures and standards referenced on this website
          describe the scope of our engineering solutions in general terms. The performance and
          certification scope applicable to a given project is determined by the agreed project
          configuration and by final on-site validation.
        </p>
      </section>

      <section>
        <h2>8. Liability for links</h2>
        <p>
          This website may reference external sites over which we have no control. We accept no
          responsibility for their content, which remains that of their respective operators. Linked
          pages were checked for unlawful content at the time of linking and none was apparent. A
          permanent review of linked pages is not reasonable without concrete indications of an
          infringement; where one becomes known, we will remove the link promptly.
        </p>
      </section>

      <section>
        <h2>9. Copyright</h2>
        <p>
          The content and works created by the site operator on these pages are subject to
          copyright. Reproduction, adaptation, distribution and any form of exploitation beyond the
          limits of copyright require our written consent. Downloads and copies of this site are
          permitted for private, non-commercial use only. Where content was not created by the
          operator, third-party rights are respected and such content is identified accordingly.
        </p>
        <p>
          Frankonia, CyberShield and Frankosorb are trademarks of the Frankonia group of
          companies.
        </p>
      </section>

      <section>
        <h2>10. Dispute resolution</h2>
        <p>
          The European Commission provides a platform for online dispute resolution, available at
          ec.europa.eu/consumers/odr. We are neither obliged nor willing to participate in dispute
          resolution proceedings before a consumer arbitration board.
        </p>
      </section>
    </LegalPage>
  );
}
