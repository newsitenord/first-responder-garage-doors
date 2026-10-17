import type { City } from "@/lib/site";
import { BANDS, formatPop, hash, pick } from "@/lib/site";
import { climateFor } from "@/lib/content/climate";

const DENSITY_LINES: { max: number; text: (c: City) => string }[] = [
  {
    max: 500,
    text: (c) =>
      `At roughly ${c.density} residents per square mile, ${c.city} spreads across a wide area, so the technician needs the full street address to give an accurate arrival window.`,
  },
  {
    max: 1500,
    text: (c) =>
      `With about ${c.density} residents per square mile, ${c.city} has a mix of detached houses, townhomes and small commercial buildings — which means we see both single doors and paired doors on the same street.`,
  },
  {
    max: 100000,
    text: (c) =>
      `${c.city} runs at roughly ${c.density} residents per square mile, so attached garages and shared driveways are common. Expect tighter appointment windows and more door-to-door traffic on the door.`,
  },
];


/** Replace {city}, {county}, {countyLabel} and {state} tokens in any climate copy. */
export function fillClimate(text: string, city: City): string {
  return text
    .replaceAll("{county} County", `${city.county} County`)
    .replaceAll("{countyLabel}", `${city.county} County`)
    .replaceAll("{county}", city.county)
    .replaceAll("{city}", city.city)
    .replaceAll("{state}", city.stateName)
    .replaceAll("{ST}", city.state);
}

export function cityIntro(city: City): string[] {
  const c = climateFor(city.climate);
  const band = BANDS[city.band];
  const densityLine = (DENSITY_LINES.find((d) => city.density < d.max) || DENSITY_LINES[2]).text(city);
  const zipText = city.zipCount === 1 ? "the local ZIP code area" : `about ${city.zipCount} ZIP codes`;
  return [
    `${city.city} is a ${band.label} in ${city.county} County, ${city.stateName}, with a population of around ${formatPop(city.population)} across ${zipText}. Garage doors here work harder than most homeowners realise — they are the largest moving part of the house, they run every day, and they take the full force of ${c.label.toLowerCase()}. ${densityLine}`,
    fillClimate(c.paragraphs[0], city),
  ];
}

export function cityLocalParagraph(city: City): string {
  const c = climateFor(city.climate);
  return fillClimate(c.paragraphs[1], city);
}

export function cityClimateProblems(city: City) {
  return climateFor(city.climate).problems.map((p) => ({ title: fillClimate(p.title, city), text: fillClimate(p.text, city) }));
}

export function citySeasonal(city: City): string {
  return fillClimate(climateFor(city.climate).seasonal, city);
}

export function cityDoorAdvice(city: City): string {
  return fillClimate(climateFor(city.climate).doorAdvice, city);
}

export function cityFaqs(city: City) {
  const c = climateFor(city.climate);
  const band = BANDS[city.band];
  return [
    {
      q: `How fast can a technician reach ${city.city}, ${city.state}?`,
      a: `${city.county} County addresses are covered by ${band.response}. Emergency dispatch runs 24/7 for doors that are stuck open, hanging off the track or trapping a vehicle.`,
    },
    {
      q: `What does garage door repair cost in ${city.city}?`,
      a: `Most repairs fall between $120 and $400 depending on the part. A spring pair is typically $220–$400, a cable pair $150–$300 and an opener repair $120–$350. You get a written quote on site before any work starts.`,
    },
    {
      q: `Which garage door problems are most common around ${city.city}?`,
      a: `${c.problems[0].title}, ${c.problems[1].title.toLowerCase()} and ${c.problems[2].title.toLowerCase()} are the calls we see most often in this climate. ${c.seasonal}`,
    },
    {
      q: `Do you cover the communities around ${city.city}?`,
      a: `Yes. Technicians cover ${city.city} and neighbouring areas including ${city.nearby
        .slice(0, 4)
        .map((n) => n.city)
        .join(", ")}. Give the dispatcher your address and we confirm coverage before booking.`,
    },
    {
      q: `Is the work guaranteed?`,
      a: `Qualifying repairs carry a one-year workmanship warranty, and replacement parts carry the manufacturer's warranty. The technician explains both before starting, in writing.`,
    },
  ];
}

/** Snapshot panel data for a city page. */
export function cityFacts(city: City) {
  return [
    { k: "City", v: `${city.city}, ${city.state}` },
    { k: "County", v: `${city.county} County` },
    { k: "Population", v: city.population.toLocaleString("en-US") },
    { k: "ZIP areas", v: String(city.zipCount) },
    { k: "Coverage", v: `~${city.density > 1200 ? 25 : 35} mile radius` },
    { k: "Dispatch", v: "24/7 emergency line" },
  ];
}

/** Deterministic local insight so no two city pages carry the same opening tip. */
export function cityTip(city: City): string {
  const tips = [
    `Before you call, check whether the door is locked, whether the opener is unplugged, and whether anything is blocking the safety beam. About one in ten "dead door" calls is a tripped breaker or a sensor knocked out of line.`,
    `If the door is open and will not close, disconnect the opener with the release cord and lower the door by hand only if it moves freely. If it feels heavy or binds, leave it and call — a heavy door usually means a spring or cable has failed.`,
    `Note the door's make and the colour of the springs before the technician arrives. It speeds up parts selection and often shortens the visit by 20–30 minutes.`,
    `Test the safety reverse monthly: place a roll of paper towels under the door and close it. If the door does not reverse on contact, the opener needs adjustment before someone gets hurt.`,
    `Keep the area around the tracks clear and avoid storing items against the door panels. Bent tracks from stored ladders and bikes are one of the most common avoidable repairs.`,
  ];
  return tips[hash(city.city + city.state) % tips.length];
}

export function nearbyLinks(city: City, prefix = "") {
  return city.nearby.map((n) => ({
    label: `${n.city}, ${n.state}`,
    href: prefix ? `${prefix}${n.url.replace("/areas/", "")}` : n.url,
  }));
}

export const HERO_VARIANT_KEYS = ["a", "b", "c", "d"] as const;
export function pickHero(seed: string) {
  return HERO_VARIANT_KEYS[hash(seed) % 4];
}

export function randomGallerySeed(city: City) {
  return pick(["g1", "g2", "g3", "g4", "g5", "g6"], city.city + city.state);
}
