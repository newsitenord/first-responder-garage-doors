import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { Breadcrumbs } from "@/components/Bits";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How First Responder Garage Doors collects, uses and shares the information you submit when requesting garage door service.",
  alternates: { canonical: "/privacy-policy/" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Privacy Policy" }]} />
      <section className="page-head">
        <div className="wrap">
          <h1>Privacy Policy</h1>
          <p className="lede">Last updated: October 2026</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap prose">
          <p>
            {SITE.name} ("we", "us") operates this website and a dispatch service that connects homeowners with
            independent garage door companies. This policy explains what we collect, why we collect it and who
            we share it with.
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li><strong>Contact details</strong> you submit: name, phone number, email, address and ZIP code.</li>
            <li><strong>Service details</strong> you describe: the door problem, service requested and any notes.</li>
            <li><strong>Technical data</strong> collected automatically by our hosting provider, such as IP address, browser type, pages visited and referring URL.</li>
            <li><strong>Call data</strong> when you call our tracking number, including the time, duration and the number that connected the call.</li>
          </ul>

          <h2>How we use it</h2>
          <ul>
            <li>To confirm service coverage and route your request to a licensed local company.</li>
            <li>To contact you about your request, including by phone, SMS or email.</li>
            <li>To measure advertising and referral performance in aggregate.</li>
            <li>To prevent fraud, comply with the law and enforce our terms.</li>
          </ul>

          <h2>Who we share it with</h2>
          <p>
            When you submit a request, your contact and service details are shared with the independent local
            company that will perform the work, so it can contact you and provide a quote. We also use service
            providers for hosting, call tracking and analytics. We do not sell your personal information to
            unrelated third parties.
          </p>

          <h2>Cookies and analytics</h2>
          <p>
            This site uses minimal cookies and may use third-party analytics or call-tracking scripts. You can
            block cookies in your browser settings; the site will still work.
          </p>

          <h2>Your choices</h2>
          <p>
            You can ask us to access, correct or delete the information you submitted by calling{" "}
            <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a> or emailing{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. California residents may have additional rights
            under the CCPA/CPRA, including the right to know and the right to delete.
          </p>

          <h2>Data retention and security</h2>
          <p>
            We keep request records for as long as needed to operate the service and meet legal obligations.
            We use industry-standard measures to protect data, but no method of transmission over the internet
            is completely secure.
          </p>

          <h2>Children</h2>
          <p>This service is intended for adults. We do not knowingly collect information from children under 13.</p>

          <h2>Changes</h2>
          <p>We may update this policy from time to time. The date at the top shows the latest revision.</p>

          <h2>Contact</h2>
          <p>
            {SITE.name} · <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a> ·{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
          <p className="notice">
            This page is a general template and not legal advice. Have it reviewed against the laws that apply
            to your business before publishing.
          </p>
        </div>
      </section>
    </>
  );
}
