import type { Metadata } from "next";
import Link from "next/link";
import citiesJson from "@/data/cities.json";
import statesJson from "@/data/states.json";
import type { City, StateRec } from "@/lib/site";
import { SITE, IMAGES } from "@/lib/site";
import { SERVICES } from "@/lib/content/services";
import {
  Hero,
  TrustBar,
  ServiceGrid,
  Process,
  Faq,
  CtaBand,
  Gallery,
  CityChips,
  CoverageStats,
  ImageFeature,
} from "@/components/Bits";
import { JsonLd, graph, orgNode, websiteNode, serviceNode, faqNode } from "@/lib/schema";

const cities = citiesJson as City[];
const states = statesJson as StateRec[];

const topCities = [...cities].sort((a, b) => b.population - a.population).slice(0, 12);

export const metadata: Metadata = {
  title: "24/7 Garage Door Repair & Installation | First Responder Garage Doors",
  description:
    "Garage door repair, installation and opener service in 836 cities across 28 states. Call (858) 726-5336 for same-day dispatch to a licensed local technician. Free estimates, 24/7 emergency line.",
  alternates: { canonical: "/" },
  verification: { google: SITE.gscVerification },
  openGraph: {
    title: "24/7 Garage Door Repair & Installation | First Responder Garage Doors",
    description:
      "Same-day garage door repair, installation and opener service from licensed local technicians. 836 cities, 28 states, 24/7 dispatch.",
    url: "/",
    images: [{ url: "/images/og-hero-a-residential-garage-door-installation-gated-driveway-1200x630.jpg", width: 1200, height: 630 }],
  },
};

const homeFaqs = [
  {
    q: "How does First Responder Garage Doors work?",
    a: "Call our 24/7 dispatch line or send a request through the website. We collect your address and the symptom, then connect you with a licensed local garage door company that covers your area. The local company confirms the appointment, diagnoses the door and quotes the repair before any work begins.",
  },
  {
    q: "Do you charge for estimates?",
    a: "Repair estimates are free when the job goes ahead; some markets charge a small diagnostic fee that is disclosed before the technician is dispatched. Installation quotes are always free. You approve a written price before any work starts.",
  },
  {
    q: "What garage door problems do you handle?",
    a: "Broken springs, snapped cables, off-track doors, dented panels, opener and remote faults, safety-sensor failures, weather seals, general tune-ups, full door replacement and commercial roll-up and overhead doors.",
  },
  {
    q: "Is there really someone available at night and on weekends?",
    a: "Yes. The dispatch line is answered 24/7. After-hours and holiday calls carry an additional fee that is quoted before the technician is sent, and availability for a specific hour depends on partner coverage in your area.",
  },
  {
    q: "Are the technicians licensed and insured?",
    a: "The local companies in our network are licensed and insured for the work they perform. Each company carries its own licensing and insurance; ask the technician for the licence number for your state before work starts.",
  },
  {
    q: "What warranty comes with the work?",
    a: "Qualifying repairs carry a one-year workmanship warranty from the local company, and replacement parts carry the manufacturer's warranty. The exact terms are shown on the written quote.",
  },
];

export default function HomePage() {
  const hero = IMAGES.heroes[0];

  return (
    <>
      <JsonLd
        data={graph([
          orgNode(),
          websiteNode(),
          serviceNode({
            name: "Garage Door Repair and Installation",
            description:
              "Nationwide referral and dispatch service for garage door repair, installation, opener service and commercial overhead doors.",
            slug: "garage-door-repair",
            image: `${SITE.url}${IMAGES.heroes[0].fallback}`,
          }),
          faqNode(homeFaqs),
        ])}
      />

      <Hero
        image={{ webp: hero.webp, fallback: hero.fallback, alt: hero.alt }}
        eyebrow="Nationwide garage door service"
        h1="Garage door repair, installation and opener service you can book in one call"
        sub="Broken spring, snapped cable, door off the track or an opener that will not respond — call once and we dispatch a licensed local technician to your door, day or night."
      />
      <TrustBar />

      <section className="section">
        <div className="wrap">
          <div className="grid-2">
            <div>
              <h2>One call connects you to a licensed local garage door technician</h2>
              <p>
                {SITE.name} is a nationwide dispatch and referral service for garage door work. Instead of
                searching through pages of listings while your car sits in the garage, you call one number,
                tell us what the door is doing, and we route the job to a licensed company that covers your
                address.
              </p>
              <p>
                We handle the first conversation, the appointment window and the follow-up. The local company
                handles the diagnosis, the repair and the warranty on the work — and quotes you a written price
                before anything is removed or replaced.
              </p>
              <ul className="checklist">
                <li>Springs, cables, tracks, rollers, panels and hinges</li>
                <li>Opener repair, replacement and smart openers</li>
                <li>New door installation and full replacement</li>
                <li>Commercial roll-up and overhead doors</li>
                <li>24/7 emergency dispatch for unsafe doors</li>
                <li>Coverage in 836 cities across 28 states</li>
              </ul>
              <div style={{ marginTop: 22 }}>
                <Link href="/services/" className="link-more">
                  Browse all 16 services →
                </Link>
              </div>
            </div>
            <div className="sidebar">
              <ImageFeature
                src={IMAGES.heroes[1].src}
                alt={IMAGES.heroes[1].alt}
                caption="Wood-look carriage door installed on a new build"
              />
              <div className="panel">
                <h3>Call the dispatch line</h3>
                <p style={{ fontSize: 14, color: "var(--slate)" }}>
                  A live person answers 24 hours a day, every day of the year.
                </p>
                <a className="btn btn-amber btn-block" href={SITE.phoneHref}>
                  {SITE.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid
        title="What we dispatch for"
        intro="Sixteen service types, one phone number. Every service page lists what is included, typical price ranges and the questions homeowners ask most."
      />

      <section className="section">
        <div className="wrap">
          <header className="sec-head">
            <h2>How the dispatch works</h2>
            <p>Four steps from the first call to a working door.</p>
          </header>
          <Process
            steps={[
              { title: "Call or request online", text: "Tell us your address and what the door is doing. We confirm coverage in your area before booking." },
              { title: "Get matched locally", text: "The job goes to a licensed company that covers your ZIP code, with a realistic arrival window." },
              { title: "Approve the price", text: "The technician diagnoses the door and gives you a written quote before any repair begins." },
              { title: "Repair and test", text: "The work is completed, the door is balanced and the safety reverse is tested before handover." },
            ]}
          />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <header className="sec-head">
            <h2>Coverage that reaches 836 cities in 28 states</h2>
            <p>
              Each state and city has its own page with local service information, climate-specific door
              problems and nearby areas — so you can check coverage before you call.
            </p>
          </header>
          <CoverageStats cities={836} states={28} services={16} />
          <div style={{ marginTop: 30 }}>
            <h3>Popular service areas</h3>
            <CityChips links={topCities.map((c) => ({ label: `${c.city}, ${c.state}`, href: c.url }))} />
          </div>
          <div style={{ marginTop: 26 }}>
            <h3>Browse by state</h3>
            <div className="city-cols">
              {states.map((s) => (
                <Link key={s.slug} href={`/areas/${s.slug}/`}>
                  {s.name} <span className="muted">({s.cityCount})</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid-2">
            <div>
              <h2>What we look for before anyone quotes a repair</h2>
              <p>
                Most expensive garage door mistakes come from guessing: replacing an opener when the door is
                simply out of balance, or swapping a panel when the track is what bent it. The dispatch
                conversation is built to catch that early.
              </p>
              <ul className="signs">
                <li>The door is heavy by hand but the opener still runs — often a spring problem, not a motor.</li>
                <li>The door closes crooked — usually a cable, roller or track issue on one side.</li>
                <li>The opener reverses at the floor — force settings, travel limits or a binding door.</li>
                <li>A bang from the garage followed by a door that will not lift — a broken torsion spring.</li>
                <li>A door that hangs open with a cable unwound — do not use the opener; call for emergency service.</li>
              </ul>
              <p style={{ marginTop: 18 }}>
                <Link href="/services/emergency-garage-door-repair/" className="link-more">
                  What counts as an emergency →
                </Link>
              </p>
            </div>
            <div className="panel">
              <h3>What the local company brings</h3>
              <ul>
                <li>State licensing and liability insurance</li>
                <li>Common parts on the truck: springs, cables, rollers, hinges, sensors</li>
                <li>Written quote before work begins</li>
                <li>One-year workmanship warranty on qualifying repairs</li>
                <li>Clean-up and a full safety test before leaving</li>
              </ul>
              <p className="notice" style={{ marginTop: 16 }}>
                <strong>Not sure what is wrong?</strong> Describe the symptom on the call — the dispatcher
                routes the job to a technician with the right parts for that failure.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Gallery
        items={IMAGES.gallery.slice(0, 3)}
        title="Recent installs and repairs"
        intro="Real job-site photos from residential and commercial work — insulated steel, carriage, full-view glass and custom wood doors."
      />

      <section className="section">
        <div className="wrap">
          <header className="sec-head">
            <h2>Residential and commercial work under one number</h2>
            <p>
              The same network handles a single garage door on a house and a multi-bay roll-up on a warehouse.
              Commercial calls are prioritised because a blocked bay costs money by the hour.
            </p>
          </header>
          <div className="gallery">
            {IMAGES.commercial.slice(0, 3).map((g) => (
              <figure className="shot" key={g.src}>
                <img src={`${g.src}-900w.webp`} alt={g.alt} width={900} height={675} loading="lazy" decoding="async" />
                <figcaption>{g.caption}</figcaption>
              </figure>
            ))}
          </div>
          <div style={{ marginTop: 18, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/services/commercial-garage-door-repair/" className="btn btn-dark">
              Commercial door repair
            </Link>
            <Link href="/services/commercial-garage-door-installation/" className="btn btn-dark">
              Commercial door installation
            </Link>
          </div>
        </div>
      </section>

      <Faq items={homeFaqs} />

      <section className="section">
        <div className="wrap">
          <header className="sec-head">
            <h2>Nationwide coverage map</h2>
            <p>
              We dispatch across 28 states and 836 cities. Call {SITE.phoneDisplay} to confirm coverage for
              your address — the map shows the general network footprint, not a physical office.
            </p>
          </header>
          <div className="map-shell">
            <iframe
              title="Nationwide garage door service coverage map"
              src="https://maps.google.com/maps?q=United%20States&z=4&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              width="100%"
              height="380"
            />
          </div>
        </div>
      </section>

      <CtaBand
        title="Talk to a dispatcher in the next 60 seconds"
        text="Tell us what the door is doing and your ZIP code. We confirm coverage, give you an arrival window and send a licensed local technician."
      />
    </>
  );
}
