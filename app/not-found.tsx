import Link from "next/link";
import { SITE } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="section" style={{ minHeight: "56vh" }}>
      <div className="wrap" style={{ maxWidth: 720 }}>
        <p className="eyebrow" style={{ color: "var(--amber-dark)" }}>404 — page not found</p>
        <h1>That page has moved off the track</h1>
        <p style={{ color: "var(--slate)" }}>
          The page you were looking for does not exist. Try the service directory or the area directory — every
          city and service has its own page.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
          <Link className="btn btn-dark" href="/services/">All services</Link>
          <Link className="btn btn-dark" href="/areas/">All service areas</Link>
          <a className="btn btn-amber" href={SITE.phoneHref}>Call {SITE.phoneDisplay}</a>
        </div>
      </div>
    </section>
  );
}
