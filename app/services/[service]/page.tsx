import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import citiesJson from "@/data/cities.json";
import statesJson from "@/data/states.json";
import type { City, StateRec } from "@/lib/site";
import { SITE, serviceHero, ogForService } from "@/lib/site";
import { SERVICES, SERVICE_BY_SLUG, fill } from "@/lib/content/services";
import {
  Breadcrumbs,
  Hero,
  TrustBar,
  Process,
  PriceTable,
  Faq,
  CtaBand,
  CityChips,
} from "@/components/Bits";
import { JsonLd, graph, orgNode, breadcrumbNode, faqNode, serviceNode } from "@/lib/schema";

const cities = citiesJson as City[];
const states = statesJson as StateRec[];

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ service: s.slug }));
}

type Props = { params: Promise<{ service: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: slug } = await params;
  const s = SERVICE_BY_SLUG.get(slug);
  if (!s) return {};
  const title = `${s.name} — 24/7 Nationwide Dispatch`;
  const description = `${s.blurb} Licensed local technicians in 836 cities across 28 states. Call ${SITE.phoneDisplay} for same-day service and a written quote.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/services/${s.slug}/` },
    openGraph: {
      title,
      description,
      url: `/services/${s.slug}/`,
      images: [{ url: ogForService(s.slug), width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogForService(s.slug)] },
  };
}

export default async function ServicePage({ params }: Props) {
  const { service: slug } = await params;
  const s = SERVICE_BY_SLUG.get(slug);
  if (!s) notFound();

  const image = serviceHero(s.slug, s.image.alt);
  const topCities = [...cities].sort((a, b) => b.population - a.population).slice(0, 24);
  const related = s.related.map((r) => SERVICE_BY_SLUG.get(r)).filter(Boolean) as typeof SERVICES;
  const faqs = s.faqs.map((f) => ({ q: fill(f.q, "your area", "", ""), a: fill(f.a, "your area", "", "") }));

  return (
    <>
      <JsonLd
        data={graph([
          orgNode(),
          breadcrumbNode([
            { name: "Home", href: "/" },
            { name: "Services", href: "/services/" },
            { name: s.name, href: `/services/${s.slug}/` },
          ]),
          serviceNode({
            name: s.name,
            description: s.blurb,
            slug: s.slug,
            image: `${SITE.url}${image.fallback}`,
          }),
          faqNode(faqs),
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services/" }, { name: s.name }]} />
      <Hero
        image={image}
        eyebrow={s.category === "commercial" ? "Commercial service" : s.category === "emergency" ? "24/7 emergency service" : "Garage door service"}
        h1={`${s.name} — licensed local technicians, nationwide dispatch`}
        sub={`${s.blurb} Licensed local technicians, written quotes before work starts and 24/7 emergency dispatch across the network.`}
      />
      <TrustBar />

      <section className="section">
        <div className="wrap">
          <div className="grid-2">
            <div className="prose">
              <p>{fill(s.intro[0], "your area", "", "")}</p>
              <p>{fill(s.intro[1], "your area", "", "")}</p>
              <h2>What {s.shortName.toLowerCase()} involves</h2>
              <p>{s.whatIs}</p>
              <h3>What is included</h3>
              <ul className="checklist">
                {s.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>

              <h3>Signs you need this service</h3>
              <ul className="signs">
                {s.signs.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>

              <h3>How the visit works</h3>
              <Process steps={s.process} />

              <h3>Typical price ranges</h3>
              <PriceTable rows={s.pricing} />

              <h3>Why homeowners call us instead of guessing</h3>
              <p>
                A garage door is a system: springs, cables, tracks, rollers, panels and the opener all affect
                each other. Replacing the part that broke without checking why it broke is how the same repair
                comes back a month later. Every dispatch starts with a diagnosis of the whole door, a written
                price and a test of the safety reverse before the technician leaves.
              </p>
              <p>
                The local company carries the licensing and insurance for the work, and qualifying repairs are
                backed by a one-year workmanship warranty. If a repair is not worth doing, you will hear that
                too — replacement is quoted honestly rather than pushed.
              </p>

              <h3>Coverage</h3>
              <p>
                {s.name} is available through partner companies in {states.length} states. Choose your state or
                city below to see local information, or call{" "}
                <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a> and we will confirm coverage for your ZIP code.
              </p>
            </div>

            <aside className="sidebar">
              <div className="panel">
                <h3>Book this service</h3>
                <p style={{ fontSize: 14, color: "var(--slate)" }}>
                  24/7 dispatch. Written quote before work begins.
                </p>
                <a className="btn btn-amber btn-block" href={SITE.phoneHref}>
                  Call {SITE.phoneDisplay}
                </a>
                <Link href="/contact/" className="btn btn-dark btn-block" style={{ marginTop: 8 }}>
                  Request a callback
                </Link>
              </div>
              <div className="panel">
                <h3>Related services</h3>
                <ul>
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/services/${r.slug}/`}>{r.name}</Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/services/">All services</Link>
                  </li>
                </ul>
              </div>
              <div className="panel">
                <h3>Popular cities</h3>
                <ul>
                  {topCities.slice(0, 8).map((c) => (
                    <li key={c.url}>
                      <Link href={`/services/${s.slug}/${c.stateSlug}/${c.citySlug}/`}>
                        {s.shortName} in {c.city}, {c.state}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <header className="sec-head">
            <h2>Cities where we dispatch {s.shortName.toLowerCase()}</h2>
            <p>
              Every city below has a dedicated page with local pricing, climate-specific problems and nearby
              areas. We cover 836 cities in 28 states.
            </p>
          </header>
          <CityChips
            links={topCities.map((c) => ({
              label: `${c.city}, ${c.state}`,
              href: `/services/${s.slug}/${c.stateSlug}/${c.citySlug}/`,
            }))}
          />
          <div style={{ marginTop: 22 }}>
            <Link href="/areas/" className="link-more">
              Browse all 836 cities by state →
            </Link>
          </div>
        </div>
      </section>

      <Faq items={faqs} title={`${s.shortName} questions`} />

      <section className="section">
        <div className="wrap">
          <header className="sec-head">
            <h2>Nationwide service coverage</h2>
            <p>
              Partner companies cover 836 cities across 28 states. Call {SITE.phoneDisplay} to confirm your
              address before booking.
            </p>
          </header>
          <div className="map-shell">
            <iframe
              title="Nationwide service coverage map"
              src="https://maps.google.com/maps?q=United%20States&z=4&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              width="100%"
              height="360"
            />
          </div>
          <p className="map-note">
            The map shows the general network footprint. It is not a physical office location.
          </p>
        </div>
      </section>

      <CtaBand
        title={`Need ${s.shortName.toLowerCase()} today?`}
        text={`Call ${SITE.phoneDisplay} and describe the door. We will confirm coverage and give you an arrival window.`}
      />
    </>
  );
}
