import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/content/services";
import { SITE, IMAGES } from "@/lib/site";
import { Breadcrumbs, Hero, TrustBar, Faq, CtaBand } from "@/components/Bits";
import { JsonLd, graph, orgNode, breadcrumbNode, faqNode, serviceNode } from "@/lib/schema";
import { ServiceIcon } from "@/components/Bits";

export const metadata: Metadata = {
  title: "Garage Door Services — Repair, Installation, Openers & Commercial",
  description:
    "All 16 garage door services we dispatch: repair, installation, replacement, springs, cables, openers, tune-ups, emergency work and commercial doors. 836 cities, 28 states.",
  alternates: { canonical: "/services/" },
  openGraph: { url: "/services/" },
};

const faqs = [
  {
    q: "How do I know which service I need?",
    a: "Start with the symptom: a door that will not lift usually points to springs or cables; a door that opens unevenly points to a cable, roller or track; an opener that hums without moving is an opener or balance problem. The dispatcher asks a few questions and routes the job to the right specialist.",
  },
  {
    q: "Do all 16 services cover every city?",
    a: "Coverage varies by market. Residential repair, installation, openers and tune-ups are available almost everywhere in the network; commercial and specialty work depends on the local partner. The dispatcher confirms availability for your address before booking.",
  },
  {
    q: "Can two services be done in one visit?",
    a: "Yes, and it is usually cheaper. A spring replacement with a tune-up, or a new door with an opener install, is one trip and one call-out fee instead of two.",
  },
  {
    q: "What is the difference between repair and replacement?",
    a: "Repair keeps the existing door and replaces failed parts. Replacement removes the door and its hardware and installs a new system. If several sections are damaged or the door is over 20 years old, replacement is usually the better value.",
  },
];

export default function ServicesIndexPage() {
  return (
    <>
      <JsonLd
        data={graph([
          orgNode(),
          breadcrumbNode([{ name: "Home", href: "/" }, { name: "Services", href: "/services/" }]),
          faqNode(faqs),
          serviceNode({
            name: "Garage Door Services",
            description: "Repair, installation, replacement, opener, maintenance and commercial garage door services across the United States.",
            slug: "garage-door-repair",
            image: `${SITE.url}${IMAGES.heroes[0].fallback}`,
          }),
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Services" }]} />
      <Hero
        image={{ webp: IMAGES.heroes[1].webp, fallback: IMAGES.heroes[1].fallback, alt: IMAGES.heroes[1].alt }}
        eyebrow="Services"
        h1="Every garage door service, one dispatch number"
        sub="Repair, replacement, springs, cables, openers, tune-ups and commercial doors — each with a clear explanation of what is included, what it typically costs and when to call."
      />
      <TrustBar />

      <section className="section">
        <div className="wrap">
          <header className="sec-head">
            <h2>Choose the service that matches the problem</h2>
            <p>
              Each page below explains the work, the parts involved, typical price ranges and the questions
              homeowners ask most. If you are not sure, call {SITE.phoneDisplay} and describe the symptom.
            </p>
          </header>
          <div className="svc-grid">
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}/`} className="svc-card">
                <span className="svc-icon" aria-hidden="true">
                  <ServiceIcon slug={s.slug} />
                </span>
                <h3>{s.name}</h3>
                <p>{s.blurb}</p>
                <span className="svc-more">Read more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid-2">
            <div>
              <h2>Not sure what is wrong? Start with the symptom</h2>
              <ul className="signs">
                <li><strong>Will not lift at all</strong> — usually a broken spring or snapped cable. Do not keep running the opener.</li>
                <li><strong>Lifts a few inches and stops</strong> — spring tension, travel limits or a binding track.</li>
                <li><strong>Crooked or hanging on one side</strong> — cable, roller or track failure. Stop using the door.</li>
                <li><strong>Opener hums but nothing moves</strong> — stripped gear, broken trolley or a door too heavy for the unit.</li>
                <li><strong>Reverses before touching the floor</strong> — safety sensor or force setting, sometimes a binding door.</li>
                <li><strong>Loud bang from the garage</strong> — a torsion spring has broken; treat it as urgent.</li>
              </ul>
            </div>
            <div className="sidebar">
              <div className="panel">
                <h3>Emergency? Call first.</h3>
                <p style={{ fontSize: 14, color: "var(--slate)" }}>
                  A door stuck open, hanging off the track or trapping a vehicle should not wait for a
                  scheduled appointment.
                </p>
                <a className="btn btn-amber btn-block" href={SITE.phoneHref}>
                  Call {SITE.phoneDisplay}
                </a>
                <Link href="/services/emergency-garage-door-repair/" className="link-more" style={{ display: "block", marginTop: 12 }}>
                  Emergency repair details →
                </Link>
              </div>
              <div className="panel">
                <h3>Service areas</h3>
                <p style={{ fontSize: 14, color: "var(--slate)" }}>
                  We dispatch across 836 cities in 28 states. Find your city page for local information.
                </p>
                <Link href="/areas/" className="link-more">
                  Browse service areas →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Faq items={faqs} />
      <CtaBand />
    </>
  );
}
