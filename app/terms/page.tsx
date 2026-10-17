import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { Breadcrumbs } from "@/components/Bits";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms of use for the First Responder Garage Doors website and referral service, including service limitations, pricing and warranty responsibility.",
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Terms & Conditions" }]} />
      <section className="page-head">
        <div className="wrap">
          <h1>Terms &amp; Conditions</h1>
          <p className="lede">Last updated: October 2026</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap prose">
          <h2>1. What this service is</h2>
          <p>
            {SITE.name} operates a referral and dispatch service. We connect visitors with independent,
            licensed garage door companies. We are not the contractor performing the work and we do not employ
            the technicians who arrive at your property.
          </p>

          <h2>2. Quotes and pricing</h2>
          <p>
            Prices shown on this website are typical ranges for planning and are not offers. The local company
            provides the binding quote after inspecting the door. You approve that quote before work begins.
            After-hours, emergency and diagnostic fees are disclosed before dispatch.
          </p>

          <h2>3. Contract with the local company</h2>
          <p>
            The contract for the work is between you and the local company. That company is responsible for
            licensing, insurance, workmanship, permits, warranty and any damage caused during the work.
          </p>

          <h2>4. Warranty</h2>
          <p>
            Qualifying repairs carry a one-year workmanship warranty from the local company. Replacement parts
            carry the manufacturer's warranty. Warranty terms are stated on the written quote.
          </p>

          <h2>5. Your responsibilities</h2>
          <ul>
            <li>Provide accurate contact and address information.</li>
            <li>Give safe access to the door, garage and power supply.</li>
            <li>Disclose known hazards, pets or property restrictions.</li>
            <li>Do not operate a door that is visibly damaged, off track or hanging.</li>
          </ul>

          <h2>6. No guarantee of availability</h2>
          <p>
            Coverage, arrival windows and service availability depend on the partner network in your area and
            on weather, traffic and parts availability. We confirm coverage before booking but cannot guarantee
            a specific arrival time.
          </p>

          <h2>7. Website content</h2>
          <p>
            Content on this site is provided for general information. It is not a substitute for an on-site
            inspection by a qualified technician. We aim to keep information accurate but make no warranty that
            every statement applies to your specific door, opener or jurisdiction.
          </p>

          <h2>8. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, {SITE.name} is not liable for indirect, incidental or
            consequential damages arising from use of this website or from work performed by an independent
            local company.
          </p>

          <h2>9. Intellectual property</h2>
          <p>
            Text, layout, images and code on this site are owned by {SITE.name} or its licensors and may not be
            copied for commercial use without permission.
          </p>

          <h2>10. Governing terms</h2>
          <p>
            These terms are governed by the laws of the state in which the business is registered. If any
            provision is found unenforceable, the remaining provisions stay in effect.
          </p>

          <h2>Contact</h2>
          <p>
            {SITE.name} · <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a> ·{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
          <p className="notice">
            This page is a general template and not legal advice. Have it reviewed by a qualified attorney
            before publishing.
          </p>
        </div>
      </section>
    </>
  );
}
