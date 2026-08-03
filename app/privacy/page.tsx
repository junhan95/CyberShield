import type { Metadata } from "next";
import { company, LegalPage } from "../legal";
import { asset, route, siteOrigin } from "../site-config";

export const metadata: Metadata = {
  title: "Privacy Policy | Frankonia CyberShield",
  description:
    "How Frankonia handles personal data in connection with the CyberShield website and enquiries.",
  icons: { icon: asset("/favicon.svg") },
  alternates: { canonical: `${siteOrigin}${route("/privacy")}` },
  robots: { index: true, follow: true },
};

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This policy explains what personal data is processed in connection with this website, on what legal basis, and what rights you have."
      updated="3 August 2026"
    >
      <section>
        <h2>1. Controller</h2>
        <p>
          The controller responsible for data processing on this website is {company.name},{" "}
          {company.street}, {company.city}, {company.country}. Telephone {company.phone}, e-mail{" "}
          {company.email}.
        </p>
        <p>
          The group data protection officer is {company.dpoName}, reachable at {company.dpoEmail} or
          by post at the address above. Please direct data protection enquiries there.
        </p>
      </section>

      <section>
        <h2>2. Data processed when you visit this website</h2>
        <p>
          When you open a page, your browser transmits technical information that the hosting
          infrastructure records in server log files. This typically includes the IP address, the
          date and time of the request, the page requested, the referring page, and the browser and
          operating system in use.
        </p>
        <p>
          This processing is necessary to deliver the website and to maintain its stability and
          security. The legal basis is Art. 6(1)(f) GDPR — our legitimate interest in operating a
          functioning and secure website. Log data is kept only for as long as it is needed for
          those purposes and is then deleted automatically.
        </p>
      </section>

      <section>
        <h2>3. Cookies and tracking</h2>
        <p>
          This website does not set cookies for analytics, advertising or profiling, and it does not
          embed third-party tracking or social media components.
        </p>
      </section>

      <section>
        <h2>4. Web fonts</h2>
        <p>
          Typefaces used on this site are loaded from Google Fonts, a service provided by Google
          Ireland Limited. When a page loads, your browser connects to Google servers, which means
          your IP address is transmitted to Google and may be processed on servers outside the
          European Economic Area. The legal basis is Art. 6(1)(f) GDPR — our legitimate interest in
          a consistent presentation of the site. If you prefer to avoid this transfer, the fonts can
          be self-hosted on request.
        </p>
      </section>

      <section>
        <h2>5. Contact form and enquiries</h2>
        <p>
          The enquiry form on this website does not transmit or store any data on our servers.
          Submitting the form opens your own e-mail application with the details you entered
          pre-filled, so that you can review and send the message yourself. No form data is
          collected by this website.
        </p>
        <p>
          Once you send us an e-mail, we process the data it contains — typically your name, company,
          e-mail address, country and the project details you describe — in order to respond to your
          enquiry. The legal basis is Art. 6(1)(b) GDPR where the enquiry relates to a contract or
          pre-contractual steps, and otherwise Art. 6(1)(f) GDPR. Correspondence is deleted once
          your enquiry has been dealt with and no further processing is required, unless commercial
          or tax retention obligations require us to keep it for longer.
        </p>
      </section>

      <section>
        <h2>6. Recipients and transfers</h2>
        <p>
          Personal data is disclosed only where it is necessary to operate this website or respond
          to your enquiry — for example to our hosting provider, which acts as a processor under a
          data processing agreement, or to affiliated Frankonia companies where they are responsible
          for your region. Data is not sold and is not passed on for advertising purposes.
        </p>
      </section>

      <section>
        <h2>7. Your rights</h2>
        <p>Under the GDPR you have the right to:</p>
        <ul>
          <li>obtain confirmation as to whether we process your data, and access to that data (Art. 15);</li>
          <li>have inaccurate data corrected (Art. 16);</li>
          <li>have your data erased (Art. 17);</li>
          <li>have processing restricted (Art. 18);</li>
          <li>receive your data in a portable format (Art. 20);</li>
          <li>object to processing based on legitimate interests (Art. 21); and</li>
          <li>withdraw any consent you have given, with effect for the future.</li>
        </ul>
        <p>
          To exercise these rights, contact {company.dpoEmail} or write to the address above. You
          also have the right to lodge a complaint with a supervisory authority — either the
          authority for your place of residence or workplace, or the one competent for us. As the
          company is established in Bavaria, that is the Bavarian Data Protection Authority
          (Bayerisches Landesamt für Datenschutzaufsicht), Ansbach.
        </p>
      </section>

      <section>
        <h2>8. Security</h2>
        <p>
          This website is delivered over an encrypted TLS connection. We maintain technical and
          organisational measures appropriate to the risk to protect data against loss, misuse and
          unauthorised access.
        </p>
      </section>

      <section>
        <h2>9. Changes to this policy</h2>
        <p>
          We may update this policy to reflect changes to the website or to legal requirements. The
          version published here, with the date shown above, is the one that applies.
        </p>
      </section>
    </LegalPage>
  );
}
