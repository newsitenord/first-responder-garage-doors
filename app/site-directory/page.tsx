import type { Metadata } from "next";
import Link from "next/link";
import citiesJson from "@/data/cities.json";
import statesJson from "@/data/states.json";
import type { City, StateRec } from "@/lib/site";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/content/services";
import { Breadcrumbs } from "@/components/Bits";

const cities = citiesJson as City[];
const states = statesJson as StateRec[];
const topCities = [...cities].sort((a, b) => b.population - a.population).slice(0, 120);

export const metadata: Metadata = {
  title: "Site Directory — All Services and Service Areas",
  description:
    "HTML site map for First Responder Garage Doors: every garage door service, all 28 states and 836 city service areas in one place.",
  alternates: { canonical: "/site-directory/" },
};

export default function SiteDirectoryPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Site Directory" }]} />
      <section className="page-head">
        <div className="wrap">
          <h1>Site directory</h1>
          <p className="lede">
            Every page on the site, organised by service and by location. {SERVICES.length} services,{" "}
            {states.length} states and {cities.length} city pages.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid-2">
            <div>
              <h2>Garage door services</h2>
              <ul className="dir-list">
                <li><Link href="/services/">All services</Link></li>
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}/`}>{s.name}</Link>
                  </li>
                ))}
              </ul>

              <h2 style={{ marginTop: 34 }}>Company pages</h2>
              <ul className="dir-list">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about/">About us</Link></li>
                <li><Link href="/contact/">Contact</Link></li>
                <li><Link href="/areas/">All service areas</Link></li>
                <li><Link href="/privacy-policy/">Privacy policy</Link></li>
                <li><Link href="/terms/">Terms &amp; conditions</Link></li>
              </ul>

              <h2 style={{ marginTop: 34 }}>States</h2>
              <ul className="dir-list cols">
                {states.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/areas/${s.slug}/`}>
                      {s.name} <span className="muted">({s.cityCount})</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2>Largest service areas</h2>
              <p style={{ color: "var(--slate)", fontSize: 14 }}>
                The 120 most populous cities in the network. The full list of {cities.length} cities is on the{" "}
                <Link href="/areas/">service areas page</Link>.
              </p>
              <ul className="dir-list cols">
                {topCities.map((c) => (
                  <li key={c.url}>
                    <Link href={c.url}>
                      {c.city}, {c.state}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="notice" style={{ marginTop: 30 }}>
            <strong>Looking for a specific service in a specific city?</strong> Open the city page from{" "}
            <Link href="/areas/">service areas</Link> — every city lists all {SERVICES.length} services with
            local links. Or call <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>.
          </div>
        </div>
      </section>
    </>
  );
}
