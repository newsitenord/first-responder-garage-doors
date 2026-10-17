export const SITE = {
  name: "First Responder Garage Doors",
  shortName: "First Responder",
  legalName: "First Responder Garage Doors",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://first-responder-garage-doors.pages.dev",
  phone: "+18587265336",
  phoneDisplay: "(858) 726-5336",
  phoneHref: "tel:+18587265336",
  email: "dispatch@firstrespondergaragedoors.com",
  tagline: "Nationwide garage door & opener repair, installation and maintenance",
  hours: "24/7 emergency dispatch · Office Mon–Sat 7:00 AM – 8:00 PM",
  warranty: "1-year workmanship warranty on qualifying repairs",
  gscVerification: "YMPN8C03Os8v5r1ChNT13G1MbjIwIdY4HoYsCicaCUw",
  foundedYear: 2026,
  serviceRadiusMiles: 35,
  responseWindow: "Same-day and next-day appointments",
  disclosure:
    "First Responder Garage Doors is a free referral and dispatch service. We connect homeowners and property managers with independent, licensed garage door companies in their area. Work is performed by the local company, which sets the final price and carries its own licensing and insurance.",
} as const;

export const OG_IMAGE = "/images/og-hero-a-residential-garage-door-installation-gated-driveway-1200x630.jpg";

export type City = {
  city: string;
  state: string;
  stateName: string;
  citySlug: string;
  stateSlug: string;
  county: string;
  countySlug: string;
  population: number;
  density: number;
  zipCount: number;
  payout: number;
  score: number;
  climate: string;
  url: string;
  nearby: { city: string; state: string; url: string }[];
  band: "25k_50k" | "15k_25k" | "10k_15k" | "under_10k";
  countyCount: number;
};

export type StateRec = {
  abbr: string;
  name: string;
  slug: string;
  climate: string;
  cityCount: number;
  population: number;
  topCities: { city: string; slug: string; url: string; population: number }[];
};

export const IMAGES = {
  heroes: [
    {
      id: "a",
      webp: "/images/hero-a-residential-garage-door-installation-gated-driveway-1600x900.webp",
      fallback: "/images/hero-a-residential-garage-door-installation-gated-driveway-1600x900.jpg",
      alt: "Gated residential driveway leading to a home and detached garage with matching black garage doors",
      src: "/images/residential-garage-door-installation-gated-driveway",
    },
    {
      id: "b",
      webp: "/images/hero-b-wood-panel-garage-door-stone-house-1600x900.webp",
      fallback: "/images/hero-b-wood-panel-garage-door-stone-house-1600x900.jpg",
      alt: "Wood-look carriage style garage door with windows on a stone home with a new concrete driveway",
      src: "/images/wood-panel-garage-door-stone-house",
    },
    {
      id: "c",
      webp: "/images/hero-c-black-aluminum-full-view-glass-garage-door-1600x900.webp",
      fallback: "/images/hero-c-black-aluminum-full-view-glass-garage-door-1600x900.jpg",
      alt: "Black aluminum full-view garage door with frosted glass panels on a brick home",
      src: "/images/black-aluminum-full-view-glass-garage-door",
    },
    {
      id: "d",
      webp: "/images/hero-d-modern-black-garage-door-replacement-white-facade-1600x900.webp",
      fallback: "/images/hero-d-modern-black-garage-door-replacement-white-facade-1600x900.jpg",
      alt: "New black raised-panel garage door with a row of windows on a white garage facade",
      src: "/images/modern-black-garage-door-replacement-white-facade",
    },
  ],
  gallery: [
    {
      src: "/images/black-aluminum-full-view-glass-garage-door",
      alt: "Black aluminum full-view garage door with frosted glass panels",
      caption: "Full-view aluminum door with frosted glass",
    },
    {
      src: "/images/custom-wood-barn-garage-door-carport",
      alt: "Custom wood plank barn-style garage door installed under a metal carport",
      caption: "Custom wood barn-style door built on site",
    },
    {
      src: "/images/wood-panel-garage-door-stone-house",
      alt: "Wood-look carriage garage door with window row on a stone and stucco home",
      caption: "Wood-look carriage door with matching window row",
    },
    {
      src: "/images/modern-black-garage-door-replacement-white-facade",
      alt: "Black raised-panel garage door with top windows replacing an older door",
      caption: "Insulated raised-panel replacement door",
    },
    {
      src: "/images/black-textured-contemporary-garage-door-glass-panel",
      alt: "Textured black contemporary garage door with a vertical glass panel column",
      caption: "Textured black door with a vertical glass column",
    },
    {
      src: "/images/black-modern-garage-door-horizontal-window-row",
      alt: "Modern black garage door with a stacked row of five horizontal windows",
      caption: "Modern black door with stacked window row",
    },
  ],
  commercial: [
    {
      src: "/images/commercial-roll-up-garage-doors-metal-building",
      alt: "Commercial metal building with black roll-up garage doors and steel walk doors",
      caption: "Commercial roll-up doors on a steel storage building",
    },
    {
      src: "/images/multi-bay-metal-building-roll-up-doors",
      alt: "Multi-bay steel building with three white roll-up garage doors and walk-in entries",
      caption: "Multi-bay steel building with three roll-up doors",
    },
    {
      src: "/images/steel-building-garage-door-opening-interior",
      alt: "Interior of a steel building with an open overhead garage door looking out to a rural road",
      caption: "Overhead door on a steel shop building",
    },
    {
      src: "/images/metal-garage-interior-open-overhead-door",
      alt: "Interior of a metal garage with an open overhead door and a clear-span ceiling",
      caption: "Shop interior with an open overhead door",
    },
  ],
  opener: {
    src: "/images/two-car-garage-door-openers-installation",
    alt: "Two white garage doors with window rows and two ceiling-mounted openers in an unfinished garage",
    caption: "Pair of openers installed and balanced on a two-car garage",
  },
  openerInterior: {
    src: "/images/frosted-glass-garage-door-interior-opener-installation",
    alt: "Frosted glass garage door seen from inside with a ceiling-mounted opener rail",
    caption: "Interior view of a glass door with a new opener",
  },
  repair: {
    src: "/images/garage-door-opener-track-repair-steel-building",
    alt: "Garage door opener rail and track assembly being serviced inside a steel building",
    caption: "Opener rail and track inspected during a repair call",
  },
} as const;

/** Deterministic 32-bit hash so every URL always gets the same variant. */
export function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function pick<T>(arr: readonly T[], seed: string): T {
  return arr[hash(seed) % arr.length];
}

export function pickMany<T>(arr: readonly T[], seed: string, n: number): T[] {
  const out: T[] = [];
  const used = new Set<number>();
  let i = 0;
  while (out.length < Math.min(n, arr.length)) {
    const idx = (hash(seed + ":" + i) + i * 7) % arr.length;
    if (!used.has(idx)) {
      used.add(idx);
      out.push(arr[idx]);
    }
    i++;
    if (i > 50) break;
  }
  return out;
}

export function heroFor(seed: string) {
  return IMAGES.heroes[hash(seed + "hero") % IMAGES.heroes.length];
}

export function formatPop(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, "") + " million";
  if (n >= 1000) return Math.round(n / 1000) + "k";
  return String(n);
}

export const BANDS: Record<City["band"], { label: string; response: string }> = {
  "25k_50k": { label: "mid-size city", response: "same-day appointments most weekdays" },
  "15k_25k": { label: "growing suburb", response: "same-day and next-day appointments" },
  "10k_15k": { label: "small city", response: "next-day appointments, with emergency dispatch available" },
  under_10k: { label: "close-knit community", response: "scheduled appointments with emergency dispatch available" },
};

export function serviceHero(slug: string, alt: string) {
  return {
    webp: `/images/svc-${slug}-1600x900.webp`,
    fallback: `/images/svc-${slug}-1600x900.jpg`,
    alt,
  };
}

export function ogForService(slug: string) {
  return `/images/og-svc-${slug}-1200x630.jpg`;
}
