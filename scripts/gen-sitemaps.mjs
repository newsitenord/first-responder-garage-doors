/**
 * Generates sitemap shards (max 1,000 URLs each), a sitemap index, an image sitemap
 * and robots.txt into /public before `next build` copies them to /out.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const SITE = process.env.SITE_URL || "https://first-responder-garage-doors.pages.dev";
const today = new Date().toISOString().slice(0, 10);
const SHARD = 1000;

const cities = JSON.parse(fs.readFileSync(path.join(root, "data/cities.json"), "utf8"));
const services = JSON.parse(fs.readFileSync(path.join(root, "data/services.index.json"), "utf8"));
const states = JSON.parse(fs.readFileSync(path.join(root, "data/states.json"), "utf8"));

const buildLimit = Number(process.env.BUILD_LIMIT || 0);
const useCities = buildLimit > 0 ? cities.slice(0, buildLimit) : cities;

const urls = [];
const push = (loc, priority, changefreq = "monthly") => urls.push({ loc, priority, changefreq, lastmod: today });

push("/", "1.0", "weekly");
push("/services/", "0.9", "weekly");
push("/areas/", "0.9", "weekly");
push("/site-directory/", "0.5", "monthly");
push("/about/", "0.6");
push("/contact/", "0.7");
push("/privacy-policy/", "0.3", "yearly");
push("/terms/", "0.3", "yearly");

for (const s of services) push(`/services/${s.slug}/`, "0.8", "weekly");
for (const st of states) push(`/areas/${st.slug}/`, "0.7", "weekly");

for (const c of useCities) {
  push(`/areas/${c.stateSlug}/${c.citySlug}/`, "0.7", "monthly");
  for (const s of services) push(`/services/${s.slug}/${c.stateSlug}/${c.citySlug}/`, "0.6", "monthly");
}

// ---- sitemap shards ----
const dir = path.join(root, "public");
fs.mkdirSync(dir, { recursive: true });
for (const f of fs.readdirSync(dir)) {
  if (/^sitemap.*\.xml$/.test(f)) fs.unlinkSync(path.join(dir, f));
}

const shards = [];
for (let i = 0; i < urls.length; i += SHARD) {
  const chunk = urls.slice(i, i + SHARD);
  const name = `sitemap-${shards.length + 1}.xml`;
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    chunk
      .map(
        (u) =>
          `  <url><loc>${SITE}${u.loc}</loc><lastmod>${u.lastmod}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`
      )
      .join("\n") +
    `\n</urlset>\n`;
  fs.writeFileSync(path.join(dir, name), body);
  shards.push(name);
}

const index =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  shards
    .map((s) => `  <sitemap><loc>${SITE}/${s}</loc><lastmod>${today}</lastmod></sitemap>`)
    .join("\n") +
  `\n</sitemapindex>\n`;
fs.writeFileSync(path.join(dir, "sitemap.xml"), index);

// ---- image sitemap (top surfaces) ----
const topCities = [...useCities].sort((a, b) => b.population - a.population).slice(0, 40);
const imgEntries = [];
imgEntries.push({
  loc: `${SITE}/`,
  img: `${SITE}/images/hero-a-residential-garage-door-installation-gated-driveway-1600x900.jpg`,
  title: "Residential garage doors on a gated driveway",
});
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
  `User-agent: *\nAllow: /\nDisallow: /thank-you/\n\nSitemap: ${SITE}/sitemap.xml\nSitemap: ${SITE}/image-sitemap.xml\n`
);

function escapeXml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

console.log(
  `sitemaps: ${shards.length} shards, ${urls.length} URLs, ${imgEntries.length} image entries -> ${SITE}`
);
