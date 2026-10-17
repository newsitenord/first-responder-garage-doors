import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import citiesJson from "@/data/cities.json";
import type { City } from "@/lib/site";
import { SITE, serviceHero, ogForService, IMAGES, pickMany } from "@/lib/site";
import { SERVICES, SERVICE_BY_SLUG, fill } from "@/lib/content/services";
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
} from "@/components/Bits";
import { JsonLd, graph, orgNode, breadcrumbNode, faqNode, serviceNode } from "@/lib/schema";

const cities = citiesJson as City[];
const byStateCity = new Map(cities.map((c) => [`${c.stateSlug}/${c.citySlug}`, c]));
const BUILD_LIMIT = Number(process.env.BUILD_LIMIT || 0);
const buildCities = BUILD_LIMIT > 0 ? cities.slice(0, BUILD_LIMIT) : cities;

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { service: string; state: string; city: string }[] = [];
  for (const s of SERVICES) {
    for (const c of buildCities) {
      params.push({ service: s.slug, state: c.stateSlug, city: c.citySlug });
    }
  }
  return params;
}

type Props = { params: Promise<{ service: string; state: string; city: string }> };

async function resolve(params: Props["params"]) {
  const { service, state, city } = await params;
  const s = SERVICE_BY_SLUG.get(service);
  const c = byStateCity.get(`${state}/${city}`);
  if (!s || !c) return null;
  return { s, c };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = await resolve(params);
  if (!r) return {};
  const { s, c } = r;
  const title = fill(s.metaTitle, c.city, c.county, c.state);
  const description = fill(s.metaDescription, c.city, c.county, c.state);
  const path = `/services/${s.slug}/${c.stateSlug}/${c.citySlug}/`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      images: [{ url: ogForService(s.slug), width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogForService(s.slug)] },
  };
}

export default async function ServiceCityPage({ params }: Props) {
  const r = await resolve(params);
  if (!r) notFound();
  const { s, c } = r;

  const image = serviceHero(s.slug, `${s.name} in ${c.city}, ${c.state}`);
  const localProblems = cityClimateProblems(c);
  const nearby = c.nearby.slice(0, 6);
  const relatedServices = s.related.map((slug) => SERVICE_BY_SLUG.get(slug)).filter(Boolean) as typeof SERVICES;
  const cityFaqSet = cityFaqs(c);
  const faqs = [
    ...s.faqs.slice(0, 3).map((f) => ({
      q: fill(f.q, c.city, c.county, c.state),
      a: fill(f.a, c.city, c.county, c.state),
    })),
    ...cityFaqSet.slice(0, 3),
    {
      q: `Do you offer ${s.shortName.toLowerCase()} near ${c.city} on weekends?`,
      a: `Scheduled appointments run Monday to Saturday in ${c.county} County, and emergency dispatch covers nights, weekends and holidays. After-hours calls carry an additional fee that is quoted before the technician is sent.`,
    },
  ];

  const gallery = pickMany(IMAGES.gallery, `${c.city}${c.state}${s.slug}`, 3);
  const facts = cityFacts(c);

  return (
    <>
      <JsonLd
        data={graph([
          orgNode(),
          breadcrumbNode([
            { name: "Home", href: "/" },
            { name: "Services", href: "/services/" },
            { name: s.name, href: `/services/${s.slug}/` },
            { name: `${c.city}, ${c.state}`, href: `/services/${s.slug}/${c.stateSlug}/${c.citySlug}/` },
          ]),
          serviceNode({
            name: `${s.name} in ${c.city}, ${c.state}`,
            description: fill(s.metaDescription, c.city, c.county, c.state),
            slug: s.slug,
            city: c.city,
            state: c.state,
            stateName: c.stateName,
            county: c.county,
            image: `${SITE.url}${image.fallback}`,
          }),
          faqNode(faqs),
        ])}
      />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services/" },
          { name: s.shortName, href: `/services/${s.slug}/` },
          { name: `${c.city}, ${c.state}` },
        ]}
      />

      <Hero
        image={image}
        eyebrow={`${c.county} County, ${c.stateName}`}
        h1={`${s.name} in ${c.city}, ${c.state}`}
        sub={`Licensed local technicians for ${s.shortName.toLowerCase()} in ${c.city}. Same-day and next-day appointments, written quotes before work starts, and 24/7 emergency dispatch.`}
        city={c.city}
      />
      <TrustBar />

      <section className="section">
        <div className="wrap">
          <div className="grid-2">
            <div className="prose">
              <p>{fill(s.intro[0], c.city, c.county, c.state)}</p>
              <p>{cityIntro(c)[0]}</p>

              <h2>What we handle in {c.city}</h2>
              <p>{s.whatIs}</p>
              <ul className="checklist">
                {s.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>

              <h2>When to call for {s.shortName.toLowerCase()} in {c.city}</h2>
              <ul className="signs">
                {s.signs.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>

              <h2>How the {c.city} visit works</h2>
              <Process steps={s.process} />

              <h2>What {s.shortName.toLowerCase()} costs in {c.city}</h2>
              <p>
                Prices in {c.county} County follow the same structure as the rest of the network: a service or
                diagnostic fee, then parts and labour for the specific repair. The ranges below are typical for
                planning; the technician confirms the exact figure after inspecting the door.
              </p>
              <PriceTable rows={s.pricing} />
            </div>

            <aside className="sidebar">
              <div className="panel">
                <h3>{c.city} service snapshot</h3>
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
                <h3>Book {s.shortName.toLowerCase()}</h3>
                <p style={{ fontSize: 14, color: "var(--slate)" }}>
                  Tell us the symptom and your address. We confirm coverage before booking.
                </p>
                <a className="btn btn-amber btn-block" href={SITE.phoneHref}>
                  Call {SITE.phoneDisplay}
                </a>
                <Link href="/contact/" className="btn btn-dark btn-block" style={{ marginTop: 8 }}>
                  Request a callback
                </Link>
              </div>
              <div className="panel">
                <h3>More services in {c.city}</h3>
                <ul>
                  {relatedServices.map((rs) => (
                    <li key={rs.slug}>
                      <Link href={`/services/${rs.slug}/${c.stateSlug}/${c.citySlug}/`}>
                        {rs.name} in {c.city}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href={`/areas/${c.stateSlug}/${c.citySlug}/`}>
                      All garage door services in {c.city} →
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid-2">
            <div>
              <h2>Local conditions that affect doors in {c.city}</h2>
              <p>{cityLocalParagraph(c)}</p>
              <div className="gallery" style={{ gridTemplateColumns: "1fr 1fr" }}>
                {localProblems.slice(0, 4).map((p) => (
                  <div className="panel" key={p.title}>
                    <h3>{p.title}</h3>
                    <p style={{ fontSize: 14, color: "var(--slate)", margin: 0 }}>{p.text}</p>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: 18 }}>
                <strong>Timing note:</strong> {citySeasonal(c)}
              </p>
              <p>
                <strong>Door choice:</strong> {cityDoorAdvice(c)}
              </p>
              <p className="notice">
                <strong>Before the technician arrives:</strong> {cityTip(c)}
              </p>
            </div>
            <div className="sidebar">
              <div className="panel">
                <h3>Recent work</h3>
                <div style={{ display: "grid", gap: 12 }}>
                  {gallery.map((g) => (
                    <figure className="shot" key={g.src} style={{ margin: 0 }}>
                      <img src={`${g.src}-480w.webp`} alt={g.alt} width={480} height={360} loading="lazy" decoding="async" />
                      <figcaption>{g.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <header className="sec-head">
            <h2>Other garage door services in {c.city}</h2>
            <p>
              One dispatch can cover more than one problem. These are the services most often booked alongside{" "}
              {s.shortName.toLowerCase()} in {c.county} County.
            </p>
          </header>
          <div className="svc-grid">
            {SERVICES.filter((x) => x.slug !== s.slug)
              .slice(0, 8)
              .map((x) => (
                <Link key={x.slug} href={`/services/${x.slug}/${c.stateSlug}/${c.citySlug}/`} className="svc-card">
                  <span className="svc-icon" aria-hidden="true">
                    <ServiceIcon slug={x.slug} />
                  </span>
                  <h3>
                    {x.name} in {c.city}
                  </h3>
                  <p>{x.blurb}</p>
                  <span className="svc-more">Details →</span>
                </Link>
              ))}
          </div>
          <div style={{ marginTop: 18 }}>
            <Link href={`/areas/${c.stateSlug}/${c.citySlug}/`} className="link-more">
              See every service available in {c.city} →
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <header className="sec-head">
            <h2>Nearby areas for {s.shortName.toLowerCase()}</h2>
            <p>Technicians covering {c.city} also serve these communities in and around {c.county} County.</p>
          </header>
          <div className="chips">
            {nearby.map((n) => (
              <Link
                key={n.url}
                href={`/services/${s.slug}/${n.state.toLowerCase()}/${n.url.split("/").filter(Boolean).pop()}/`}
                className="chip"
              >
                {s.shortName} in {n.city}, {n.state}
              </Link>
            ))}
            <Link href={`/areas/${c.stateSlug}/`} className="chip">
              All {c.stateName} cities →
            </Link>
          </div>
        </div>
      </section>

      <Faq items={faqs} title={`${s.shortName} in ${c.city}: common questions`} />

      <MapEmbed city={c.city} state={c.state} label={`${s.shortName} service area — ${c.city}, ${c.state}`} />

      <CtaBand
        title={`${s.shortName} in ${c.city} — book it today`}
        text={`Call ${SITE.phoneDisplay} for a written quote from a licensed ${c.city} technician. Same-day and next-day appointments, 24/7 emergency dispatch.`}
        city={c.city}
      />
    </>
  );
}
