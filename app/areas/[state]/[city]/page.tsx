import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import citiesJson from "@/data/cities.json";
import type { City } from "@/lib/site";
import { SITE, IMAGES, pick, BANDS, formatPop } from "@/lib/site";
import { SERVICES, SERVICE_BY_SLUG } from "@/lib/content/services";
import {
  cityIntro,
  cityLocalParagraph,
  cityClimateProblems,
  citySeasonal,
  cityDoorAdvice,
  cityFaqs,
  cityFacts,
  cityTip,
} from "@/lib/content/city";
import {
  Breadcrumbs,
  Hero,
  TrustBar,
  Process,
  PriceTable,
  Faq,
  CtaBand,
  MapEmbed,
  ServiceIcon,
  ImageFeature,
} from "@/components/Bits";
import { JsonLd, graph, orgNode, breadcrumbNode, faqNode, serviceNode } from "@/lib/schema";

const cities = citiesJson as City[];
const byKey = new Map(cities.map((c) => [`${c.stateSlug}/${c.citySlug}`, c]));
const BUILD_LIMIT = Number(process.env.BUILD_LIMIT || 0);
const buildCities = BUILD_LIMIT > 0 ? cities.slice(0, BUILD_LIMIT) : cities;

export const dynamicParams = false;

export function generateStaticParams() {
  return buildCities.map((c) => ({ state: c.stateSlug, city: c.citySlug }));
}

type Props = { params: Promise<{ state: string; city: string }> };

async function resolve(params: Props["params"]) {
  const { state, city } = await params;
  return byKey.get(`${state}/${city}`) || null;
}

const META_VARIANTS = [
  (c: City) =>
    `Garage door repair in ${c.city}, ${c.state}. Springs, cables, openers, tracks and panels repaired by licensed local technicians in ${c.county} County. Call ${SITE.phoneDisplay}.`,
  (c: City) =>
    `Need a garage door fixed in ${c.city}, ${c.state}? Same-day dispatch for broken springs, opener faults, off-track doors and panel damage across ${c.county} County. Call ${SITE.phoneDisplay}.`,
  (c: City) =>
    `${c.city}, ${c.state} garage door service: repair, installation, replacement and 24/7 emergency dispatch. Licensed local technicians in ${c.county} County. Call ${SITE.phoneDisplay}.`,
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = await resolve(params);
  if (!c) return {};
  const title = `Garage Door Repair in ${c.city}, ${c.state} | 24/7 Dispatch`;
  const description = pick(META_VARIANTS, c.city + c.state)(c);
  const path = `/areas/${c.stateSlug}/${c.citySlug}/`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      images: [{ url: "/images/og-hero-b-wood-panel-garage-door-stone-house-1200x630.jpg", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CityPage({ params }: Props) {
  const c = await resolve(params);
  if (!c) notFound();

  const hero = pick(IMAGES.heroes, c.city + c.state);
  const repairService = SERVICE_BY_SLUG.get("garage-door-repair")!;
  const band = BANDS[c.band];
  const problems = cityClimateProblems(c);
  const faqs = cityFaqs(c);
  const facts = cityFacts(c);

  return (
    <>
      <JsonLd
        data={graph([
          orgNode(),
          breadcrumbNode([
            { name: "Home", href: "/" },
            { name: "Service Areas", href: "/areas/" },
            { name: c.stateName, href: `/areas/${c.stateSlug}/` },
            { name: c.city, href: `/areas/${c.stateSlug}/${c.citySlug}/` },
          ]),
          serviceNode({
            name: `Garage Door Repair in ${c.city}, ${c.state}`,
            description: `Garage door repair, installation and opener service in ${c.city}, ${c.county} County, ${c.stateName}.`,
            slug: "garage-door-repair",
            city: c.city,
            state: c.state,
            stateName: c.stateName,
            county: c.county,
            image: `${SITE.url}${hero.fallback}`,
          }),
          faqNode(faqs),
        ])}
      />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/areas/" },
          { name: c.stateName, href: `/areas/${c.stateSlug}/` },
          { name: c.city },
        ]}
      />

      <Hero
        image={{ webp: hero.webp, fallback: hero.fallback, alt: hero.alt }}
        eyebrow={`${c.county} County · ${c.stateName}`}
        h1={`Garage Door Repair in ${c.city}, ${c.state}`}
        sub={`${c.city} homeowners can book a licensed local technician for spring, cable, opener, track and panel repairs — plus new door installation. ${band.response[0].toUpperCase()}${band.response.slice(1)}.`}
        city={c.city}
      />
      <TrustBar />

      <section className="section">
        <div className="wrap">
          <div className="grid-2">
            <div className="prose">
              <p>{cityIntro(c)[0]}</p>
              <p>{cityIntro(c)[1]}</p>
              <p>{cityLocalParagraph(c)}</p>

              <h2>Garage door services available in {c.city}</h2>
              <p>
                Every service below can be booked through the same dispatch line and is performed by a
                licensed local company covering {c.city} and {c.county} County.
              </p>
              <div className="svc-grid" style={{ marginBottom: 8 }}>
                {SERVICES.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}/${c.stateSlug}/${c.citySlug}/`}
                    className="svc-card"
                  >
                    <span className="svc-icon" aria-hidden="true">
                      <ServiceIcon slug={s.slug} />
                    </span>
                    <h3>{s.shortName}</h3>
                    <p>{s.blurb}</p>
                  </Link>
                ))}
              </div>

              <h2>Common garage door problems in {c.city}</h2>
              <p>
                These are the failures we see most often around {c.county} County, based on the local climate
                and how doors are used here.
              </p>
              <div className="gallery" style={{ gridTemplateColumns: "1fr 1fr", marginBottom: 18 }}>
                {problems.map((p) => (
                  <div className="panel" key={p.title}>
                    <h3>{p.title}</h3>
                    <p style={{ fontSize: 14, color: "var(--slate)", margin: 0 }}>{p.text}</p>
                  </div>
                ))}
              </div>

              <h2>How a repair call works in {c.city}</h2>
              <Process steps={repairService.process} />

              <h2>What garage door repair costs in {c.city}</h2>
              <p>
                Repair pricing in {c.city} follows the standard structure: a service call, then parts and
                labour. The figures below are typical for the network and are confirmed in writing on site.
              </p>
              <PriceTable rows={repairService.pricing} />

              <h2>Why {c.city} homeowners call us</h2>
              <p>
                One call gets you a licensed local technician instead of a list of companies to phone in
                order. You get a written quote before work starts, a one-year workmanship warranty on
                qualifying repairs, and a technician who tests the safety reverse before leaving.
              </p>
              <p>
                If the door does not need replacing, we say so. If a repair is unsafe or not worth the money,
                we say that too — and quote a replacement only when it genuinely makes more sense.
              </p>

              <h2>Local timing for {c.city}</h2>
              <p>{citySeasonal(c)}</p>
              <p>{cityDoorAdvice(c)}</p>
              <p className="notice">
                <strong>Before you call:</strong> {cityTip(c)}
              </p>
            </div>

            <aside className="sidebar">
              <div className="panel">
                <h3>{c.city} at a glance</h3>
                <dl className="kv">
                  {facts.map((f) => (
                    <div key={f.k} style={{ display: "contents" }}>
                      <dt>{f.k}</dt>
                      <dd>{f.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="panel">
                <h3>Dispatch</h3>
                <p style={{ fontSize: 14, color: "var(--slate)" }}>
                  24/7 line, real person. Coverage confirmed before booking.
                </p>
                <a className="btn btn-amber btn-block" href={SITE.phoneHref}>
                  Call {SITE.phoneDisplay}
                </a>
                <Link href="/contact/" className="btn btn-dark btn-block" style={{ marginTop: 8 }}>
                  Request a callback
                </Link>
              </div>
              <ImageFeature
                src={IMAGES.opener.src}
                alt={IMAGES.opener.alt}
                caption={`Openers and doors serviced across ${c.county} County`}
              />
            </aside>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <header className="sec-head">
            <h2>Nearby areas we also serve</h2>
            <p>
              Technicians covering {c.city} also work in these communities. Choose one for local details.
            </p>
          </header>
          <div className="chips">
            {c.nearby.map((n) => (
              <Link key={n.url} href={n.url} className="chip">
                {n.city}, {n.state}
              </Link>
            ))}
            <Link href={`/areas/${c.stateSlug}/`} className="chip">
              All {c.stateName} cities →
            </Link>
          </div>
          <p style={{ marginTop: 16, color: "var(--slate)", fontSize: 14 }}>
            {c.city} covers about {formatPop(c.population)} residents across {c.zipCount} ZIP code
            {c.zipCount === 1 ? "" : "s"}. Door styles vary street to street, so the technician quotes by door
            type and condition rather than by neighbourhood.
          </p>
        </div>
      </section>

      <Faq items={faqs} title={`Garage door questions in ${c.city}`} />
      <MapEmbed city={c.city} state={c.state} />
      <CtaBand
        title={`Garage door repair in ${c.city}, ${c.state}`}
        text={`Call ${SITE.phoneDisplay} and describe the door. We confirm coverage for ${c.county} County and give you an arrival window.`}
        city={c.city}
      />
    </>
  );
}
