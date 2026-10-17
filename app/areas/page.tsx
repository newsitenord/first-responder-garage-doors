import type { Metadata } from "next";
import Link from "next/link";
import citiesJson from "@/data/cities.json";
import statesJson from "@/data/states.json";
import type { City, StateRec } from "@/lib/site";
import { SITE, IMAGES } from "@/lib/site";
import { Breadcrumbs, Hero, TrustBar, CtaBand, Faq } from "@/components/Bits";
import { JsonLd, graph, orgNode, breadcrumbNode, faqNode } from "@/lib/schema";

const cities = citiesJson as City[];
const states = statesJson as StateRec[];

export const metadata: Metadata = {
  title: "Garage Door Service Areas — 836 Cities in 28 States",
  description:
    "Find garage door repair, installation and opener service in your city. 836 cities across 28 states with local pages, pricing and 24/7 dispatch.",
  alternates: { canonical: "/areas/" },
  openGraph: { url: "/areas/" },
};

const faqs = [
  {
    q: "How do I check if you cover my address?",
    a: "Find your state and city in the directory, then call the dispatch line with your full address. Coverage is confirmed against the partner network before an appointment is booked.",
  },
  {
    q: "Why are some cities listed but not others?",
    a: "The network covers the cities on this page. Neighbouring towns are often covered by the same technicians — call and we will check your ZIP code against the nearest partner.",
  },
  {
    q: "Do prices change by city?",
    a: "The structure is the same everywhere, but labour rates and call-out fees vary by market. Your city page lists typical ranges and the technician confirms the exact price on site.",
  },
];

export default function AreasIndexPage() {
  const byState = states.map((s) => ({
    state: s,
    cities: cities.filter((c) => c.state === s.abbr),
  }));

  return (
    <>
      <JsonLd
        data={graph([
          orgNode(),
          breadcrumbNode([{ name: "Home", href: "/" }, { name: "Service Areas", href: "/areas/" }]),
          faqNode(faqs),
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Service Areas" }]} />
      <Hero
        image={{ webp: IMAGES.heroes[2].webp, fallback: IMAGES.heroes[2].fallback, alt: IMAGES.heroes[2].alt }}
        eyebrow="Service areas"
        h1="Garage door service in 836 cities across 28 states"
        sub="Every city has its own page with local pricing, climate-specific door problems, nearby areas and direct dispatch details."
      />
      <TrustBar />

      <section className="section">
        <div className="wrap">
          <header className="sec-head">
            <h2>Browse by state</h2>
            <p>
              {states.reduce((n, s) => n + s.cityCount, 0)} cities, {states.length} states. Choose a state for
              its city list, or open the full directory below.
            </p>
          </header>
          <div className="svc-grid">
            {states.map((s) => (
              <Link key={s.slug} href={`/areas/${s.slug}/`} className="svc-card">
                <h3>{s.name}</h3>
                <p>
                  {s.cityCount} cities · {Math.round(s.population / 1000)}k residents covered
                </p>
                <span className="svc-more">View cities →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <header className="sec-head">
            <h2>Full city directory</h2>
            <p>All 836 service areas, grouped by state. Select a city for local garage door information.</p>
          </header>
          {byState.map(({ state, cities: list }) => (
            <details key={state.slug} className="faq-item" style={{ marginBottom: 10 }}>
              <summary>
                {state.name} <span className="muted">— {list.length} cities</span>
                <span className="faq-plus" aria-hidden="true" />
              </summary>
              <div className="city-cols" style={{ padding: "4px 0 18px" }}>
                {list.map((c) => (
                  <Link key={c.url} href={c.url}>
                    {c.city}
                  </Link>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="split-cta">
            <div className="panel">
              <h2 style={{ fontSize: "1.25rem" }}>Not sure about your area?</h2>
              <p style={{ color: "var(--slate)", fontSize: 14.5 }}>
                Call {SITE.phoneDisplay} with your ZIP code. If a partner covers the address, we book it; if
                not, we tell you straight away.
              </p>
              <a className="btn btn-amber" href={SITE.phoneHref}>
                Call {SITE.phoneDisplay}
              </a>
            </div>
            <div className="panel">
              <h2 style={{ fontSize: "1.25rem" }}>Browse by service</h2>
              <p style={{ color: "var(--slate)", fontSize: 14.5 }}>
                Every service has its own page with what is included, typical prices and common questions.
              </p>
              <Link className="btn btn-dark" href="/services/">
                All 16 services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Faq items={faqs} />
      <CtaBand />
    </>
  );
}
