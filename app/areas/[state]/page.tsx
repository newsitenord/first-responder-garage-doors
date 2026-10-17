import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import citiesJson from "@/data/cities.json";
import statesJson from "@/data/states.json";
import type { City, StateRec } from "@/lib/site";
import { SITE, IMAGES } from "@/lib/site";
import { SERVICES } from "@/lib/content/services";
import { climateFor } from "@/lib/content/climate";
import { Breadcrumbs, Hero, TrustBar, CtaBand, Faq, MapEmbed } from "@/components/Bits";
import { JsonLd, graph, orgNode, breadcrumbNode, faqNode, serviceNode } from "@/lib/schema";

const cities = citiesJson as City[];
const states = statesJson as StateRec[];

function fillState(text: string, stateName: string): string {
  return text
    .replaceAll("{county} County", stateName)
    .replaceAll("{countyLabel}", stateName)
    .replaceAll("{county}", stateName)
    .replaceAll("{city}", stateName)
    .replaceAll("{state}", stateName);
}

export const dynamicParams = false;

export function generateStaticParams() {
  return states.map((s) => ({ state: s.slug }));
}

type Props = { params: Promise<{ state: string }> };

async function getState(params: Props["params"]) {
  const { state } = await params;
  const s = states.find((x) => x.slug === state);
  if (!s) return null;
  return { s, list: cities.filter((c) => c.state === s.abbr) };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = await getState(params);
  if (!r) return {};
  const { s, list } = r;
  const title = `Garage Door Repair in ${s.name} — ${list.length} Cities Covered`;
  const description = `Garage door repair, installation and opener service across ${s.name}. Licensed local technicians in ${list.length} cities, 24/7 dispatch and written quotes. Call ${SITE.phoneDisplay}.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/areas/${s.slug}/` },
    openGraph: { title, description, url: `/areas/${s.slug}/` },
  };
}

export default async function StatePage({ params }: Props) {
  const r = await getState(params);
  if (!r) notFound();
  const { s, list } = r;
  const climate = climateFor(s.climate);
  const top = [...list].sort((a, b) => b.population - a.population);

  const faqs = [
    {
      q: `Which cities in ${s.name} do you cover?`,
      a: `We dispatch in ${list.length} ${s.name} cities, including ${top.slice(0, 5).map((c) => c.city).join(", ")}. Choose your city above for local details, or call with your ZIP code to confirm.`,
    },
    {
      q: `What garage door problems are most common in ${s.name}?`,
      a: `${climate.problems[0].title}, ${climate.problems[1].title.toLowerCase()} and ${climate.problems[2].title.toLowerCase()} are the most frequent calls here. ${climate.seasonal}`,
    },
    {
      q: `How much does garage door repair cost in ${s.name}?`,
      a: `Typical repairs run $120–$400. Spring pairs are usually $220–$400, cable pairs $150–$300 and opener repairs $120–$350. You approve a written quote before any work begins.`,
    },
    {
      q: `Is emergency service available across ${s.name}?`,
      a: `Yes. Emergency dispatch runs 24/7 for doors that are stuck open, off track or trapping a vehicle. After-hours fees are quoted before a technician is sent.`,
    },
  ];

  return (
    <>
      <JsonLd
        data={graph([
          orgNode(),
          breadcrumbNode([
            { name: "Home", href: "/" },
            { name: "Service Areas", href: "/areas/" },
            { name: s.name, href: `/areas/${s.slug}/` },
          ]),
          serviceNode({
            name: `Garage Door Repair in ${s.name}`,
            description: `Garage door repair, installation and opener service across ${s.name}.`,
            slug: "garage-door-repair",
            state: s.abbr,
            stateName: s.name,
            county: "",
          }),
          faqNode(faqs),
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Service Areas", href: "/areas/" }, { name: s.name }]} />
      <Hero
        image={{
          webp: IMAGES.heroes[3].webp,
          fallback: IMAGES.heroes[3].fallback,
          alt: `Garage door service across ${s.name}`,
        }}
        eyebrow={`${s.name} · ${list.length} cities`}
        h1={`Garage door repair and installation in ${s.name}`}
        sub={`Licensed local technicians across ${list.length} ${s.name} cities. ${climate.label}, so expect ${climate.problems[0].title.toLowerCase()} and ${climate.problems[1].title.toLowerCase()} to be the most common calls.`}
      />
      <TrustBar />

      <section className="section">
        <div className="wrap">
          <div className="grid-2">
            <div className="prose">
              <h2>Local conditions across {s.name}</h2>
              <p>{climate.paragraphs[0].replaceAll("{county} County", s.name).replaceAll("{countyLabel}", s.name).replaceAll("{county}", s.name).replaceAll("{city}", s.name)}</p>
              <p>{climate.paragraphs[1].replaceAll("{county} County", s.name).replaceAll("{countyLabel}", s.name).replaceAll("{county}", s.name).replaceAll("{city}", s.name)}</p>

              <h3>What we see most in {s.name}</h3>
              <ul className="signs">
                {climate.problems.map((p) => (
                  <li key={p.title}>
                    <strong>{fillState(p.title, s.name)}.</strong> {fillState(p.text, s.name)}
                  </li>
                ))}
              </ul>

              <h3>Services available across {s.name}</h3>
              <div className="chips">
                {SERVICES.map((sv) => (
                  <Link key={sv.slug} href={`/services/${sv.slug}/`} className="chip">
                    {sv.name}
                  </Link>
                ))}
              </div>

              <h3>Seasonal advice</h3>
              <p>{climate.seasonal}</p>
              <p>{climate.doorAdvice}</p>
            </div>

            <aside className="sidebar">
              <div className="panel">
                <h3>{s.name} at a glance</h3>
                <dl className="kv">
                  <dt>Cities covered</dt>
                  <dd>{list.length}</dd>
                  <dt>Population covered</dt>
                  <dd>{s.population.toLocaleString("en-US")}</dd>
                  <dt>Climate</dt>
                  <dd>{climate.label}</dd>
                  <dt>Dispatch</dt>
                  <dd>24/7 emergency line</dd>
                </dl>
              </div>
              <div className="panel">
                <h3>Book a visit</h3>
                <p style={{ fontSize: 14, color: "var(--slate)" }}>
                  Tell us the city and the symptom. Coverage is confirmed before booking.
                </p>
                <a className="btn btn-amber btn-block" href={SITE.phoneHref}>
                  Call {SITE.phoneDisplay}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <header className="sec-head">
            <h2>Cities we serve in {s.name}</h2>
            <p>
              {list.length} cities with dedicated local pages. Open your city for pricing, climate notes and
              nearby areas.
            </p>
          </header>
          <div className="city-cols">
            {top.map((c) => (
              <Link key={c.url} href={c.url}>
                {c.city} <span className="muted">({Math.round(c.population / 1000)}k)</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Faq items={faqs} title={`${s.name} garage door questions`} />
      <MapEmbed city={s.name} state="" label={`${s.name} service area`} />
      <CtaBand title={`Garage door service across ${s.name}`} city={s.name} />
    </>
  );
}
