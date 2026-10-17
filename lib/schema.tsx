import { SITE } from "@/lib/site";

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function orgNode() {
  return {
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    description: SITE.disclosure,
    areaServed: { "@type": "Country", name: "United States" },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        contactType: "customer service",
        availableLanguage: "English",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
      },
    ],
    knowsAbout: [
      "Garage door repair",
      "Garage door installation",
      "Garage door springs",
      "Garage door openers",
      "Commercial overhead doors",
    ],
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en-US",
  };
}

export function serviceNode(opts: {
  name: string;
  description: string;
  slug: string;
  city?: string;
  state?: string;
  stateName?: string;
  county?: string;
  image?: string;
}) {
  const { name, description, slug, city, state, stateName, county, image } = opts;
  const url = city && state ? `${SITE.url}/services/${slug}/${state.toLowerCase()}/${citySlug(city)}/` : `${SITE.url}/services/${slug}/`;
  const node: Record<string, unknown> = {
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    serviceType: name,
    url,
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: city
      ? [
          { "@type": "City", name: city, containedInPlace: { "@type": "State", name: stateName || state } },
          { "@type": "AdministrativeArea", name: `${county} County` },
        ]
      : { "@type": "Country", name: "United States" },
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: { "@type": "ContactPoint", telephone: SITE.phone, contactType: "customer service" },
      serviceUrl: url,
    },
  };
  if (image) node.image = image;
  return node;
}

export function faqNode(items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbNode(items: { name: string; href?: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.href ? { item: `${SITE.url}${it.href}` } : {}),
    })),
  };
}

export function graph(nodes: unknown[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function citySlug(city: string): string {
  return city
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
