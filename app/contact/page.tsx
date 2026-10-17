import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/content/services";
import { Breadcrumbs, CtaBand, Faq } from "@/components/Bits";
import { JsonLd, graph, orgNode, breadcrumbNode, faqNode } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact — Book a Garage Door Repair or Estimate",
  description:
    "Call (858) 726-5336 24/7 or send a request. Tell us your address and what the garage door is doing, and we will dispatch a licensed local technician.",
  alternates: { canonical: "/contact/" },
  openGraph: { url: "/contact/" },
};

const faqs = [
  {
    q: "What should I have ready before calling?",
    a: "Your address or ZIP code, the door's make if you know it, and a description of what happens when you press the button. If the door is stuck open, say so first — it changes how the call is prioritised.",
  },
  {
    q: "How soon will someone call me back?",
    a: "Requests submitted through the form are routed to the dispatch desk during business hours and to the on-call line after hours. Urgent requests should always go through the phone line.",
  },
  {
    q: "Can I get an estimate without booking?",
    a: "Installation estimates are free. Repair pricing is confirmed on site after diagnosis; some markets charge a small diagnostic fee that is disclosed before dispatch.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={graph([
          orgNode(),
          breadcrumbNode([{ name: "Home", href: "/" }, { name: "Contact", href: "/contact/" }]),
          faqNode(faqs),
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />

      <section className="page-head">
        <div className="wrap">
          <h1>Contact First Responder Garage Doors</h1>
          <p className="lede">
            The fastest way to get a technician moving is to call. The form below works for estimates,
            scheduled work and non-urgent questions.
          </p>
          <div className="meta-row">
            <span className="pill">24/7 dispatch</span>
            <span className="pill">Written quotes</span>
            <span className="pill">Licensed local technicians</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid-2">
            <div>
              <h2>Request a callback</h2>
              <form className="lead-form" action="/api/lead" method="post">
                <input type="hidden" name="source" value="contact-page" />
                <div className="field-row">
                  <label>
                    Full name
                    <input type="text" name="name" autoComplete="name" required />
                  </label>
                  <label>
                    Phone
                    <input type="tel" name="phone" autoComplete="tel" inputMode="tel" required />
                  </label>
                </div>
                <div className="field-row">
                  <label>
                    Email
                    <input type="email" name="email" autoComplete="email" />
                  </label>
                  <label>
                    ZIP code
                    <input type="text" name="zip" autoComplete="postal-code" inputMode="numeric" required />
                  </label>
                </div>
                <label>
                  Street address (optional)
                  <input type="text" name="address" autoComplete="street-address" />
                </label>
                <label>
                  What do you need?
                  <select name="service" required defaultValue="">
                    <option value="" disabled>
                      Choose a service
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.name}
                      </option>
                    ))}
                    <option value="not-sure">Not sure — please advise</option>
                  </select>
                </label>
                <label>
                  What is the door doing?
                  <textarea name="message" rows={4} placeholder="e.g. door opens about a foot then stops, and the opener hums" />
                </label>
                <label className="checkbox">
                  <input type="checkbox" name="consent" value="yes" required />
                  <span>
                    I agree to be contacted by phone about this request, including by automated call or text,
                    and I have read the privacy policy.
                  </span>
                </label>
                <button type="submit" className="btn btn-amber btn-lg">
                  Send request
                </button>
                <p className="form-note">
                  For a door that is stuck open, hanging off the track or trapping a vehicle, call{" "}
                  <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a> instead — the phone line is answered 24/7.
                </p>
              </form>
            </div>

            <aside className="sidebar">
              <div className="panel">
                <h3>Call the dispatch line</h3>
                <p style={{ fontSize: 14, color: "var(--slate)" }}>
                  A live person answers every hour of every day.
                </p>
                <a className="btn btn-amber btn-block" href={SITE.phoneHref}>
                  {SITE.phoneDisplay}
                </a>
              </div>
              <div className="panel">
                <h3>Hours</h3>
                <dl className="kv">
                  <dt>Emergency line</dt>
                  <dd>24/7, 365 days</dd>
                  <dt>Scheduling desk</dt>
                  <dd>Mon–Sat, 7:00 AM – 8:00 PM</dd>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                  </dd>
                </dl>
              </div>
              <div className="panel">
                <h3>Service area</h3>
                <p style={{ fontSize: 14, color: "var(--slate)" }}>
                  We dispatch to 836 cities in 28 states. Coverage is confirmed by ZIP code before booking.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Faq items={faqs} />
      <CtaBand />
    </>
  );
}
