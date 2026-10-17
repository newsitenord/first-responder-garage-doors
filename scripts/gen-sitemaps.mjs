/**
 * Generates SEO files into /public before `next build` copies them to /out:
 *
 *   sitemap.xml       — ONE file, every URL (Google allows 50,000 URLs / 50 MB)
 *   sitemap.txt       — same URL list as plain text (one URL per line)
 *   image-sitemap.xml — image entries for the top surfaces
 *   robots.txt        — points at both sitemaps
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://first-responder-garage-doors.pages.dev").replace(/\/$/, "");
const today = new Date().toISOString().slice(0, 10);

const cities = JSON.parse(fs.readFileSync(path.join(root, "data/cities.json"), "utf8"));
const services = JSON.parse(fs.readFileSync(path.join(root, "data/services.index.json"), "utf8"));
const states = JSON.parse(fs.readFileSync(path.join(root, "data/states.json"), "utf8"));

const buildLimit = Number(process.env.BUILD_LIMIT || 0);
const useCities = buildLimit > 0 ? cities.slice(0, buildLimit) : cities;

const urls = [];
const push = (loc, priority, changefreq) => urls.push({ loc, priority, changefreq });

push("/", "1.0", "weekly");
push("/services/", "0.9", "weekly");
push("/areas/", "0.9", "weekly");
push("/site-directory/", "0.5", "monthly");
push("/about/", "0.6", "monthly");
push("/contact/", "0.7", "monthly");
push("/privacy-policy/", "0.3", "yearly");
push("/terms/", "0.3", "yearly");

for (const s of services) push(`/services/${s.slug}/`, "0.8", "weekly");
for (const st of states) push(`/areas/${st.slug}/`, "0.7", "weekly");

for (const c of useCities) {
  push(`/areas/${c.stateSlug}/${c.citySlug}/`, "0.7", "monthly");
  for (const s of services) push(`/services/${s.slug}/${c.stateSlug}/${c.citySlug}/`, "0.6", "monthly");
}

const dir = path.join(root, "public");
fs.mkdirSync(dir, { recursive: true });

// clear any sitemap files from a previous run (including old shards)
for (const f of fs.readdirSync(dir)) {
  if (/^sitemap.*\.(xml|txt)$/i.test(f) || /^image-sitemap\.xml$/i.test(f)) {
    fs.unlinkSync(path.join(dir, f));
  }
}

// ---- sitemap.xml : single file, all URLs ----
const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url><loc>${SITE}${u.loc}</loc><lastmod>${today}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`
    )
    .join("\n") +
  `\n</urlset>\n`;
fs.writeFileSync(path.join(dir, "sitemap.xml"), xml);

// ---- sitemap.txt : same list, plain text ----
fs.writeFileSync(path.join(dir, "sitemap.txt"), urls.map((u) => `${SITE}${u.loc}`).join("\n") + "\n");

// ---- image sitemap (top surfaces only) ----
const topCities = [...useCities].sort((a, b) => b.population - a.population).slice(0, 40);
const imgEntries = [
  {
    loc: `${SITE}/`,
    img: `${SITE}/images/hero-a-residential-garage-door-installation-gated-driveway-1600x900.jpg`,
    title: "Residential garage doors on a gated driveway",
  },
];
for (const s of services) {
  imgEntries.push({
    loc: `${SITE}/services/${s.slug}/`,
    img: `${SITE}/images/svc-${s.slug}-1600x900.jpg`,
    title: `${s.name} by First Responder Garage Doors`,
  });
}
for (const c of topCities) {
  imgEntries.push({
    loc: `${SITE}/areas/${c.stateSlug}/${c.citySlug}/`,
    img: `${SITE}/images/hero-b-wood-panel-garage-door-stone-house-1600x900.jpg`,
    title: `Garage door repair in ${c.city}, ${c.state}`,
  });
}
const imageMap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
  imgEntries
    .map(
      (e) =>
        `  <url><loc>${e.loc}</loc><image:image><image:loc>${e.img}</image:loc><image:title>${escapeXml(
          e.title
        )}</image:title></image:image></url>`
    )
    .join("\n") +
  `\n</urlset>\n`;
fs.writeFileSync(path.join(dir, "image-sitemap.xml"), imageMap);

// ---- robots.txt ----
fs.writeFileSync(
  path.join(dir, "robots.txt"),
  `User-agent: *\nAllow: /\nDisallow: /thank-you/\n\nSitemap: ${SITE}/sitemap.xml\nSitemap: ${SITE}/sitemap.txt\n`
);

function escapeXml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

console.log(
  `sitemaps: sitemap.xml (${urls.length} URLs, ${(xml.length / 1048576).toFixed(2)} MB) · sitemap.txt (${urls.length} lines) · image-sitemap.xml (${imgEntries.length}) -> ${SITE}`
);
