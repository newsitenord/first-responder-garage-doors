import Link from "next/link";
import { SITE, IMAGES } from "@/lib/site";
import { SERVICES, type Service } from "@/lib/content/services";

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((it, i) => (
          <li key={`${it.name}-${i}`}>
            {it.href ? (
              <Link href={it.href}>{it.name}</Link>
            ) : (
              <span aria-current="page">{it.name}</span>
            )}
            {i < items.length - 1 && <span className="sep" aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Hero({
  image,
  eyebrow,
  h1,
  sub,
  city,
}: {
  image: { webp: string; fallback: string; alt: string };
  eyebrow: string;
  h1: string;
  sub: string;
  city?: string;
}) {
  return (
    <section className="hero">
      <picture>
        <source srcSet={image.webp} type="image/webp" />
        <img
          src={image.fallback}
          alt={image.alt}
          width={1600}
          height={900}
          fetchPriority="high"
          decoding="async"
          className="hero-img"
        />
      </picture>
      <div className="hero-shade" aria-hidden="true" />
      <div className="wrap hero-in">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{h1}</h1>
        <p className="hero-sub">{sub}</p>
        <div className="hero-actions">
          <a className="btn btn-amber btn-lg" href={SITE.phoneHref}>
            Call {SITE.phoneDisplay}
          </a>
          <Link className="btn btn-ghost btn-lg" href="/contact/">
            Request a quote
          </Link>
        </div>
        <ul className="hero-points">
          <li>Same-day & next-day appointments</li>
          <li>Licensed, insured local technicians</li>
          <li>24/7 emergency dispatch</li>
        </ul>
        {city && <p className="hero-city">Serving {city} and surrounding communities</p>}
      </div>
    </section>
  );
}

export function TrustBar() {
  const items = [
    { t: "24/7 dispatch", d: "A live person answers, day or night" },
    { t: "Licensed & insured", d: "Work done by vetted local companies" },
    { t: "Upfront pricing", d: "Written quote before work starts" },
    { t: "Workmanship warranty", d: "1 year on qualifying repairs" },
  ];
  return (
    <div className="trustbar">
      <div className="wrap trustbar-in">
        {items.map((i) => (
          <div className="trust" key={i.t}>
            <CheckIcon />
            <div>
              <strong>{i.t}</strong>
              <span>{i.d}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" className="check">
      <circle cx="12" cy="12" r="11" fill="#e8f5ef" />
      <path d="M7 12.5l3.2 3.2L17 8.8" fill="none" stroke="#12805c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ServiceGrid({
  services = SERVICES,
  hrefFor,
  title,
  intro,
  compact = false,
}: {
  services?: Service[];
  hrefFor?: (s: Service) => string;
  title?: string;
  intro?: string;
  compact?: boolean;
}) {
  return (
    <section className={`section${compact ? " section-tight" : ""}`}>
      <div className="wrap">
        {title && (
          <header className="sec-head">
            <h2>{title}</h2>
            {intro && <p>{intro}</p>}
          </header>
        )}
        <div className="svc-grid">
          {services.map((s) => (
            <Link key={s.slug} href={hrefFor ? hrefFor(s) : `/services/${s.slug}/`} className="svc-card">
              <span className="svc-icon" aria-hidden="true">
                <ServiceIcon slug={s.slug} />
              </span>
              <h3>{s.name}</h3>
              <p>{s.blurb}</p>
              <span className="svc-more">Details →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceIcon({ slug }: { slug: string }) {
  const common = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (slug.includes("opener") || slug.includes("smart")) {
    return (
      <svg {...common} aria-hidden="true">
        <rect x="7" y="3" width="10" height="5" rx="1.4" />
        <path d="M12 8v3M12 11l-5 5M12 11l5 5" />
        <path d="M3 21h18M5 18h14" />
      </svg>
    );
  }
  if (slug.includes("spring")) {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M3 6h18M5 6c0 3 14 3 14 6S5 15 5 18M19 6v12" />
        <path d="M3 18h7" />
      </svg>
    );
  }
  if (slug.includes("cable") || slug.includes("off-track")) {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M4 3v18M20 3v18" />
        <path d="M4 8c6 0 6 8 16 8" />
        <circle cx="4" cy="8" r="1.6" />
      </svg>
    );
  }
  if (slug.includes("commercial")) {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M3 21V8l9-4 9 4v13" />
        <path d="M7 21v-8h10v8M7 17h10" />
      </svg>
    );
  }
  if (slug.includes("emergency")) {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M12 3l9 16H3z" />
        <path d="M12 9v4M12 16.5v.5" />
      </svg>
    );
  }
  if (slug.includes("tune-up")) {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M14.7 6.3a4 4 0 015.1 5.1L9 22H3v-6z" />
        <path d="M15 8l1 1" />
      </svg>
    );
  }
  if (slug.includes("seal")) {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M3 8h18M3 16h18M5 12h14" />
        <path d="M3 8v8M21 8v8" />
      </svg>
    );
  }
  if (slug.includes("panel")) {
    return (
      <svg {...common} aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="1.5" />
        <path d="M3 9.3h18M3 14.6h18M9 9.3v5.3M15 9.3v5.3" />
      </svg>
    );
  }
  return (
    <svg {...common} aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M3 11h18M7 11v9M12 11v9M17 11v9" />
    </svg>
  );
}

export function PriceTable({ rows, note }: { rows: { job: string; range: string }[]; note?: string }) {
  return (
    <div className="price-wrap">
      <table className="price">
        <thead>
          <tr>
            <th scope="col">Typical job</th>
            <th scope="col">Usual range</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.job}>
              <td>{r.job}</td>
              <td>{r.range}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="price-note">
        {note ||
          "Ranges are typical for planning only. The local technician confirms the exact price after inspecting the door, and you approve it before any work starts."}
      </p>
    </div>
  );
}

export function Process({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="steps">
      {steps.map((s, i) => (
        <li key={s.title}>
          <span className="step-num">{i + 1}</span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function Faq({ items, title = "Frequently asked questions" }: { items: { q: string; a: string }[]; title?: string }) {
  return (
    <section className="section">
      <div className="wrap">
        <header className="sec-head">
          <h2>{title}</h2>
        </header>
        <div className="faq">
          {items.map((f, i) => (
            <details key={f.q} className="faq-item" open={i === 0 ? false : undefined}>
              <summary>
                {f.q}
                <span className="faq-plus" aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MapEmbed({ city, state, label }: { city: string; state: string; label?: string }) {
  const q = encodeURIComponent(`${city}, ${state}`);
  return (
    <section className="section">
      <div className="wrap">
        <header className="sec-head">
          <h2>{label || `Service area map — ${city}, ${state}`}</h2>
          <p>
            We dispatch licensed technicians across {city} and the surrounding communities. Call{" "}
            <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a> to confirm coverage for your address.
          </p>
        </header>
        <div className="map-shell">
          <iframe
            title={`Map of ${city}, ${state}`}
            src={`https://maps.google.com/maps?q=${q}&z=12&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            width="100%"
            height="360"
          />
        </div>
        <p className="map-note">
          Map shows the general service area. It is not a physical office location — technicians are dispatched
          from the nearest partner company.
        </p>
      </div>
    </section>
  );
}

export function Gallery({
  items,
  title = "Recent work",
  intro,
}: {
  items: { src: string; alt: string; caption: string }[];
  title?: string;
  intro?: string;
}) {
  return (
    <section className="section">
      <div className="wrap">
        <header className="sec-head">
          <h2>{title}</h2>
          {intro && <p>{intro}</p>}
        </header>
        <div className="gallery">
          {items.map((g) => (
            <figure key={g.src} className="shot">
              <img src={`${g.src}-900w.webp`} alt={g.alt} width={900} height={675} loading="lazy" decoding="async" />
              <figcaption>{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({
  title,
  text,
  city,
}: {
  title?: string;
  text?: string;
  city?: string;
}) {
  return (
    <section className="cta-band">
      <div className="wrap cta-in">
        <div>
          <h2>{title || "Need a garage door fixed today?"}</h2>
          <p>
            {text ||
              `Call ${SITE.phoneDisplay} for a free estimate. We answer 24/7 and dispatch a licensed local technician${city ? ` in ${city}` : ""}.`}
          </p>
        </div>
        <div className="cta-actions">
          <a className="btn btn-amber btn-lg" href={SITE.phoneHref}>
            Call {SITE.phoneDisplay}
          </a>
          <Link className="btn btn-ghost btn-lg" href="/contact/">
            Send a request
          </Link>
        </div>
      </div>
    </section>
  );
}

export function CityChips({ links }: { links: { label: string; href: string }[] }) {
  return (
    <div className="chips">
      {links.map((l) => (
        <Link key={l.href} href={l.href} className="chip">
          {l.label}
        </Link>
      ))}
    </div>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return <div className="prose">{children}</div>;
}

export function ImageFeature({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="feature">
      <img src={`${src}-900w.webp`} alt={alt} width={900} height={675} loading="lazy" decoding="async" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export function CoverageStats({ cities, states, services }: { cities: number; states: number; services: number }) {
  return (
    <div className="stats">
      <div>
        <strong>{cities}</strong>
        <span>cities served</span>
      </div>
      <div>
        <strong>{states}</strong>
        <span>states covered</span>
      </div>
      <div>
        <strong>{services}</strong>
        <span>service types</span>
      </div>
      <div>
        <strong>24/7</strong>
        <span>emergency dispatch</span>
      </div>
    </div>
  );
}

export const GALLERY_POOL = IMAGES.gallery;
