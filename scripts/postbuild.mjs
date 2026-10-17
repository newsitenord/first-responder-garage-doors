/**
 * Post-build cleanup for a true zero-JS static export on Cloudflare Pages.
 *
 * 1. Removes every <script> tag except JSON-LD (the site has no client components,
 *    so hydration is unnecessary and the shared Next runtime is dead weight).
 * 2. Removes the RSC payload .txt files Next writes beside every page — they double
 *    the file count and Cloudflare Pages Free allows 20,000 files per deployment.
 * 3. Reports the final file count and total size so the 20k / 25 MiB limits can be checked.
 */
import fs from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "out");
if (!fs.existsSync(OUT)) {
  console.error("postbuild: out/ not found — run next build first");
  process.exit(1);
}

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

const files = walk(OUT);
let htmlCount = 0;
let strippedScripts = 0;
let strippedPreloads = 0;
let removedTxt = 0;
let removedMaps = 0;

for (const p of files) {
  const ext = path.extname(p).toLowerCase();

  if (ext === ".html") {
    htmlCount++;
    let html = fs.readFileSync(p, "utf8");
    const before = html.length;

    // Strip <script> blocks that are not JSON-LD
    html = html.replace(/<script(?![^>]*type=["']application\/ld\+json["'])[^>]*>[\s\S]*?<\/script>/gi, "");
    // Strip script preload hints
    html = html.replace(/<link[^>]+rel=["'](?:preload|modulepreload)["'][^>]*as=["']script["'][^>]*>/gi, "");
    html = html.replace(/<link[^>]+as=["']script["'][^>]*rel=["'](?:preload|modulepreload)["'][^>]*>/gi, "");

    if (html.length !== before) {
      strippedScripts++;
      fs.writeFileSync(p, html);
    }
    continue;
  }

  if (ext === ".txt" && path.basename(p) !== "robots.txt" && path.basename(p) !== "sitemap.txt") {
    fs.unlinkSync(p);
    removedTxt++;
    continue;
  }

  if (ext === ".map") {
    fs.unlinkSync(p);
    removedMaps++;
  }
}

const remaining = walk(OUT);
let bytes = 0;
for (const f of remaining) bytes += fs.statSync(f).size;

console.log(
  `postbuild: ${htmlCount} html pages · scripts stripped on ${strippedScripts} pages · ${removedTxt} rsc .txt removed · ${removedMaps} maps removed`
);
console.log(
  `postbuild: ${remaining.length} files deployed · ${(bytes / 1024 / 1024).toFixed(1)} MB total (Cloudflare Free limit: 20,000 files)`
);

if (remaining.length > 20000) {
  console.error("postbuild: WARNING — over the 20,000 file Cloudflare Pages Free limit");
  process.exit(1);
}
