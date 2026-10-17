import Link from "next/link";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/content/services";
import statesJson from "@/data/states.json";
import type { StateRec } from "@/lib/site";

const states = statesJson as StateRec[];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`logo${light ? " logo-light" : ""}`}>
      <svg width="34" height="34" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
        <rect x="2" y="2" width="36" height="36" rx="9" fill="#0b1b2b" />
        <path d="M11 30V17.5L20 11l9 6.5V30" stroke="#f5a524" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14.5 20.5h11M14.5 24h11M14.5 27.5h11" stroke="#f5a524" strokeWidth="1.6" strokeLinecap="round" opacity=".85" />
        <circle cx="20" cy="9" r="1.6" fill="#f5a524" />
      </svg>
      <span className="logo-text">
        <strong>First Responder</strong>
        <em>Garage Doors</em>
      </span>
    </span>
  );
}

export function Header() {
  return (
    <>
      <div className="topbar">
        <div className="wrap topbar-in">
          <span className="topbar-left">
            <span className="dot" aria-hidden="true" /> 24/7 emergency dispatch · licensed local technicians
          </span>
          <a className="topbar-phone" href={SITE.phoneHref}>
            Call now: {SITE.phoneDisplay}
          </a>
        </div>
      </div>
      <header className="site-header">
        <div className="wrap header-in">
          <Link href="/" className="brand" aria-label={`${SITE.name} home`}>
            <Logo />
          </Link>

          <nav className="nav-desktop" aria-label="Primary">
            <div className="nav-item has-menu">
              <Link href="/services/">Services</Link>
              <div className="dropdown" role="group" aria-label="Services">
                {SERVICES.slice(0, 10).map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}/`}>
                    {s.name}
                  </Link>
                ))}
                <Link href="/services/" className="dropdown-all">
                  View all 16 services →
                </Link>
              </div>
            </div>
            <Link href="/areas/">Service Areas</Link>
            <Link href="/about/">About</Link>
            <Link href="/contact/">Contact</Link>
            <Link href="/site-directory/" className="nav-muted">
              Site Map
            </Link>
          </nav>

          <div className="header-cta">
            <a className="phone-link" href={SITE.phoneHref}>
              <span className="phone-label">Call 24/7</span>
              <strong>{SITE.phoneDisplay}</strong>
            </a>
            <Link href="/contact/" className="btn btn-sm btn-dark">
              Book a repair
            </Link>
          </div>

          <details className="mobile-menu">
            <summary aria-label="Open menu">
              <span />
              <span />
              <span />
            </summary>
            <div className="mobile-panel">
              <Link href="/services/">All services</Link>
              <Link href="/areas/">Service areas</Link>
              <Link href="/about/">About us</Link>
              <Link href="/contact/">Contact</Link>
              <Link href="/site-directory/">Site directory</Link>
              <a className="btn btn-amber btn-block" href={SITE.phoneHref}>
                Call {SITE.phoneDisplay}
              </a>
            </div>
          </details>
        </div>
      </header>
    </>
  );
}

export function Footer() {
  const topStates = states.slice(0, 10);
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo light />
          <p className="footer-desc">
            Nationwide referral and dispatch network for garage door and opener repair, installation and
            maintenance. Call once and we connect you with a licensed local technician.
          </p>
          <a className="footer-phone" href={SITE.phoneHref}>
            {SITE.phoneDisplay}
          </a>
          <p className="footer-hours">{SITE.hours}</p>
        </div>

        <div>
          <h3 className="footer-h">Popular services</h3>
          <ul className="footer-list">
            {SERVICES.slice(0, 8).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}/`}>{s.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/services/">All services →</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="footer-h">Service areas</h3>
          <ul className="footer-list">
            {topStates.map((s) => (
              <li key={s.slug}>
                <Link href={`/areas/${s.slug}/`}>
                  {s.name} <span className="muted">({s.cityCount})</span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/areas/">All 836 cities →</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="footer-h">Company</h3>
          <ul className="footer-list">
            <li>
              <Link href="/about/">About us</Link>
            </li>
            <li>
              <Link href="/contact/">Contact & booking</Link>
            </li>
            <li>
              <Link href="/site-directory/">Site directory</Link>
            </li>
            <li>
              <Link href="/privacy-policy/">Privacy policy</Link>
            </li>
            <li>
              <Link href="/terms/">Terms & conditions</Link>
            </li>
          </ul>
          <p className="footer-note">
            Licensed and insured local technicians. Work is carried out by the local company, which sets the
            final price.
          </p>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <p>
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
        <p className="footer-disclosure">{SITE.disclosure}</p>
      </div>

      <div className="mobile-callbar" aria-label="Quick contact">
        <a className="btn btn-amber" href={SITE.phoneHref}>
          Call now
        </a>
        <Link className="btn btn-outline-light" href="/contact/">
          Request a quote
        </Link>
      </div>
    </footer>
  );
}
