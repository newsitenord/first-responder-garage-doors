import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request received",
  description: "Your garage door service request has been received.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="section" style={{ minHeight: "52vh" }}>
      <div className="wrap" style={{ maxWidth: 720 }}>
        <div className="panel" style={{ padding: 34 }}>
          <p className="eyebrow" style={{ color: "var(--amber-dark)" }}>Request received</p>
          <h1 style={{ fontSize: "2rem" }}>Thanks — your request is in the queue</h1>
          <p style={{ color: "var(--slate)" }}>
            A dispatcher will review your details and call you back. If the door is stuck open, hanging off the
            track or trapping a vehicle, call now instead — the phone line is answered 24/7.
          </p>
          <a className="btn btn-amber btn-lg" href={SITE.phoneHref}>
            Call {SITE.phoneDisplay}
          </a>
          <p style={{ marginTop: 20, fontSize: 14 }}>
            <Link href="/">Back to homepage</Link> · <Link href="/services/">Browse services</Link> ·{" "}
            <Link href="/areas/">Service areas</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
