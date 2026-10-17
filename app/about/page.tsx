import type { Metadata } from "next";
import Link from "next/link";
import statesJson from "@/data/states.json";
import type { StateRec } from "@/lib/site";
import { SITE, IMAGES } from "@/lib/site";
import { Breadcrumbs, Hero, TrustBar, CtaBand, Faq } from "@/components/Bits";
import { JsonLd, graph, orgNode, breadcrumbNode, faqNode } from "@/lib/schema";

const states = statesJson as StateRec[];

export const metadata: Metadata = {
  title: "About First Responder Garage Doors",
  description:
    "How First Responder Garage Doors works: a nationwide dispatch and referral service connecting homeowners with licensed local garage door companies in 836 cities.",
  alternates: { canonical: "/about/" },
  openGraph: { url: "/about/" },
};

const faqs = [
  {
    q: "Is First Responder Garage Doors the company doing the work?",
    a: "No. We are a dispatch and referral service. The repair or installation is performed by an independent, licensed local garage door company that covers your address. That company sets the final price and carries its own licence and insurance.",
  },
  {
    q: "How do you choose the companies in the network?",
    a: "Partners are checked for active licensing, liability insurance, service coverage in their market and response capability. Companies that do not meet the standard are not dispatched.",
  },
  {
    q: "Does the referral cost me anything?",
    a: "No. The service is free to homeowners. The local company pays for the introduction, and you pay the company directly for the work at the price you approved.",
  },
  {
    q: "What if something goes wrong with the work?",
    a: "The local company is responsible for the work and its warranty. Qualifying repairs carry a one-year workmanship warranty. If there is a dispute, contact us and we will help you reach the company that performed the work.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph([
          orgNode(),
          breadcrumbNode([{ name: "Home", href: "/" }, { name: "About", href: "/about/" }]),
          faqNode(faqs),
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />
      <Hero
        image={{ webp: IMAGES.heroes[0].webp, fallback: IMAGES.heroes[0].fallback, alt: IMAGES.heroes[0].alt }}
        eyebrow="About us"
        h1="A dispatch service built for the moment your garage door stops working"
        sub="One number, a real person, and a licensed local technician who covers your address — in 836 cities across 28 states."
      />
      <TrustBar />

      <section className="section">
        <div className="wrap">
          <div className="grid-2">
            <div className="prose">
              <h2>Why this service exists</h2>
              <p>
                Garage doors fail at the worst times: the morning of a flight, the night before a move, the
                weekend a relative is visiting. In that moment most homeowners do the same thing — search,
                open five tabs, leave two voicemails and wait. The door is still broken, and the car is still
                trapped.
              </p>
              <p>
                {SITE.name} exists to collapse that into one call. We take the address and the symptom, confirm
                which partner company covers the area, and hand the job to a licensed local technician with the
                right parts for that failure.
              </p>

              <h2>How the network works</h2>
              <ol>
                <li>
                  <strong>You call or request a callback.</strong> A dispatcher answers 24/7, records the
                  address and asks what the door is doing.
                </li>
                <li>
                  <strong>We match the job locally.</strong> The dispatch goes to a licensed company covering
                  that ZIP code, with a realistic arrival window.
                </li>
                <li>
                  <strong>The technician quotes in writing.</strong> Diagnosis first, then a written price you
                  approve before any work starts.
                </li>
                <li>
                  <strong>The local company does the work.</strong> It holds the licence, the insurance and the
                  workmanship warranty for the repair.
                </li>
              </ol>

              <h2>What we will not do</h2>
              <ul>
                <li>Quote a repair over the phone without seeing the door.</li>
                <li>Promise a specific arrival time before coverage is confirmed.</li>
                <li>Send an unlicensed company or an uninsured subcontractor.</li>
                <li>Hide the after-hours fee — it is disclosed before dispatch.</li>
                <li>Publish invented reviews, ratings or credentials.</li>
              </ul>

              <h2>Coverage</h2>
              <p>
                The network currently covers 836 cities in 28 states, from {states[0].name} to{" "}
                {states[states.length - 1].name}. Each state and city page lists the local service information,
                the climate conditions that affect doors there and the nearby communities we also cover.
              </p>
              <p>
                <Link href="/areas/">Browse service areas →</Link>
              </p>

              <h2>Business disclosure</h2>
              <p>{SITE.disclosure}</p>
              <p>
                Contact: <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a> ·{" "}
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </p>
            </div>
            <aside className="sidebar">
              <div className="panel">
                <h3>At a glance</h3>
                <dl className="kv">
                  <dt>Coverage</dt>
                  <dd>836 cities · 28 states</dd>
                  <dt>Services</dt>
                  <dd>16 garage door services</dd>
                  <dt>Dispatch</dt>
                  <dd>24/7, including holidays</dd>
                  <dt>Warranty</dt>
                  <dd>1 year on qualifying repairs</dd>
                  <dt>Phone</dt>
                  <dd>
                    <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
                  </dd>
                </dl>
              </div>
              <div className="panel">
                <h3>Need help now?</h3>
                <p style={{ fontSize: 14, color: "var(--slate)" }}>
                  A live dispatcher answers day or night.
                </p>
                <a className="btn btn-amber btn-block" href={SITE.phoneHref}>
                  Call {SITE.phoneDisplay}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Faq items={faqs} />
      <CtaBand />
    </>
  );
}
