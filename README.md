# First Responder Garage Doors — programmatic SEO site

Static, zero-JS, 14,264-page Next.js site for a pay-per-call garage door offer.
Phone: **(858) 726-5336** · Host: Cloudflare Pages (`*.pages.dev`) · Repo → Pages → live.

---

## 1. What is in this repo

```
app/
  layout.tsx                      header/footer, global metadata
  page.tsx                        homepage (GSC verification tag lives here only)
  services/page.tsx               /services/
  services/[service]/page.tsx     16 service hubs
  services/[service]/[state]/[city]/page.tsx   13,376 service × city pages
  areas/page.tsx                  /areas/ — all states + full city directory
  areas/[state]/page.tsx          28 state hubs
  areas/[state]/[city]/page.tsx   836 city money pages
  about, contact, privacy-policy, terms, thank-you, site-directory, not-found
components/                       Chrome.tsx (header/footer), Bits.tsx (hero, FAQ, map, tables …)
lib/
  site.ts                         brand, phone, images, hash helpers
  schema.tsx                      JSON-LD builders (Organization, Service, FAQ, Breadcrumb)
  content/services.ts             16 service content modules
  content/climate.ts              13 climate/regional profiles (unique local copy)
  content/city.ts                 city copy composer, facts, FAQs, tips
data/
  cities.json                     836 cities (filtered from LeadSmart CSV, payout ≥ $30)
  states.json                     28 states
  services.index.json             16 service slugs (single source for routes + sitemaps)
public/
  images/                         116 optimized assets (WebP + JPEG, hero crops, OG cards)
  sitemap.xml + sitemap-1…15.xml  sitemap index, 1,000 URLs per shard
  image-sitemap.xml               image sitemap (hero + service + top city images)
  robots.txt, _headers, favicon.svg
functions/api/lead.js             Cloudflare Pages Function for the contact form
scripts/
  gen-sitemaps.mjs                runs on prebuild — sitemaps + robots
  postbuild.mjs                   strips JS, deletes RSC payloads, checks the 20k file limit
```

**Page count**

| Type | Count |
|---|---|
| Home | 1 |
| Service hubs | 16 |
| Service × city | 836 × 16 = **13,376** |
| City pages | 836 |
| State hubs | 28 |
| Core (about, contact, legal, directory, thank-you) | 7 |
| **Total** | **14,264** (+ 404) |

---

## 2. Build & deploy on Cloudflare Pages

1. Push this repo to GitHub (already done).
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick the repo.
3. Settings (**Framework preset must be `None`** — the "Next.js" preset runs
   `@cloudflare/next-on-pages`, which cannot build a static export):
   - Build command: `npm ci && npm run build`
   - Build output directory: `out`
   - Node version: 20 (`.node-version`, `.nvmrc` and `engines` are all pinned)
   - Environment variables: `NODE_OPTIONS=--max-old-space-size=6144`

   Do **not** add a `wrangler.toml` with `pages_build_output_dir`: when Pages sees it, it ignores the
   dashboard build command (Pages wrangler config has no build-command field) and the build step is
   skipped entirely. See `DEPLOY.md` for the full post-mortem.
4. **Name the project `first-responder-garage-doors`** so the live URL matches the canonical
   `https://first-responder-garage-doors.pages.dev`. If you use a different project name, set
   `NEXT_PUBLIC_SITE_URL` in the Pages environment variables to the real URL before the first build —
   otherwise every canonical and sitemap entry will point at the wrong host.
5. Optional environment variable: `LEAD_WEBHOOK_URL` — POST target for form leads (CRM, Zapier, Make,
   Ringba custom webhook). Without it the form still redirects to `/thank-you/` and the lead is logged
   in the Pages function logs.

**Limits that matter (verified Oct 2026):** Cloudflare Pages Free = 20,000 files per deployment, 25 MiB
per file, 20-minute build timeout. This build produces ~14.3k files after `postbuild.mjs` deletes the RSC
`.txt` payloads (without that step it would be ~28.5k and the deploy would fail). Keep an eye on the
"postbuild:" line in the build log.

If build time on Cloudflare approaches 20 minutes, split the deploy: publish 8 services first
(`data/services.index.json`), then add the rest. Or move to Pro and use the 100k file limit.

---

## 3. SEO architecture

- **Static HTML for every URL** — no client-side rendering, no hydration (scripts stripped at build).
- **Canonicals** on every page, trailing-slash URLs, `metadataBase` set from `NEXT_PUBLIC_SITE_URL`.
- **Sitemap index** with 15 shards of ≤1,000 URLs + a separate image sitemap; `robots.txt` points at both.
- **Schema** on every template: `Organization` (phone, areaServed, contactPoint), `Service` with
  `areaServed` City/County/State, `FAQPage`, `BreadcrumbList`. No fake `LocalBusiness` address is
  invented — the network has no public storefront, so `Organization` + `Service` is used instead.
- **Internal links**: home → services/areas → hubs → city pages → 16 service × city children; every combo
  page links back to its city page and its service hub; state hubs list all cities; `/areas/` is a full
  HTML directory. No orphan pages.
- **Unique metadata** per page: service templates × city tokens, three description variants for city pages,
  population/county/climate data in the copy.
- **Images**: 1600×900 hero crops, `srcset`-ready WebP + JPEG fallback, descriptive slugs, alt text with
  service + city, lazy loading everywhere except the hero (`fetchPriority="high"`).
- **Google Search Console**: `google-site-verification` meta tag is on the homepage only, as requested.

### Content uniqueness
Each city page combines: population, density, ZIP count, county, state, nearby cities (from the CSV) and
one of 13 climate/regional profiles. Service × city pages additionally inherit the full service module.
Shared boilerplate is unavoidable at 13k pages — the differentiators are data, climate, nearby links and
FAQ answers. **Do not switch the whole site to index at once** (see §7).

---

## 4. Editing content

| Want to change | Edit |
|---|---|
| Phone, email, hours, warranty, disclosure | `lib/site.ts` (`SITE`) |
| Service copy, prices, FAQs | `lib/content/services.ts` |
| Climate / regional copy | `lib/content/climate.ts` |
| City page copy and FAQs | `lib/content/city.ts` |
| Cities, states, payouts | `data/cities.json` / `data/states.json` (regenerate from CSV, keep the same shape) |
| Number of services / routes | `data/services.index.json` + `lib/content/services.ts` + sitemap script (all three) |
| Header/footer | `components/Chrome.tsx` |
| Colours, layout | `app/globals.css` |

Regenerate sitemaps any time with `node scripts/gen-sitemaps.mjs` (also runs automatically before build).

---

## 5. Lead form

`/contact/` posts natively (no JS) to `functions/api/lead.js`:
- validates phone + ZIP,
- forwards the lead as JSON to `LEAD_WEBHOOK_URL` if set (includes page, referer, UA, country, consent),
- redirects to `/thank-you/` (noindex).

Add call tracking, conversion pixels or a CRM integration inside that function — it is the only server-side
code on the site.

---

## 6. Reviews, ratings and “real business” signals — read this

You asked for a Yelp block (“25+ reviews, 4.3”) and a GMB block (“33+ reviews, 4.1”) with no outbound links.
**I did not fabricate them.** Two reasons:

1. Publishing invented review counts and star ratings is a deceptive practice under the FTC’s 2024 rule on
   fake reviews (civil penalties per violation), and Google’s review-snippet policy removes rich results and
   can downgrade sites that mark up ratings they cannot substantiate. For a pay-per-call site where Google
   already scrutinises “scaled content”, that is the fastest way to lose the whole domain.
2. The offer is a lead-gen network, not a storefront with its own GBP listing. Invented ratings are
   trivially checkable — and a competitor will check.

What is already in place instead: trust bar (24/7 dispatch, licensed & insured, written quotes, workmanship
warranty), a transparent referral disclosure in the footer and About page, a real phone number, and honest
pricing ranges.

**To enable real ratings** (recommended): create/claim the GBP and Yelp profiles, then fill
`lib/content/reviews.ts` (create it) and render it — the component slot is ready to be wired in one place.
I can add it the moment you have real profiles and want the badge with a link to the source. Links must be
present for compliance.

---

## 7. Indexing plan (important for a new `.pages.dev`)

1. **Week 1** — deploy, verify GSC, submit `sitemap.xml`, request indexing for home + 16 services +
   the top 40 city pages (highest population).
2. **Weeks 2–4** — let Google crawl shards 1–4 (the sitemaps are ordered: home, hubs, states, then cities
   with their 16 children). Watch *Indexed* vs *Discovered*.
3. **Weeks 4–8** — if indexation is healthy (>60% of submitted), continue. If not, reduce scope: drop
   commercial and low-intent services from the smallest cities first.
4. Never buy traffic to programmatic pages before they are indexed; call tracking on unindexed pages only
   burns spend.

`robots.txt` allows everything except `/thank-you/`. There is no noindex on city or combo pages.

---

## 8. Known limitations

- **Next.js ships ~100 kB of JS per page**; `postbuild.mjs` removes it because the site has no client
  components. If you later add a client component (slider, interactive quote wizard), remove the strip step
  or it will silently break.
- The map is a lazy-loaded Google Maps iframe (no API key, no JS bundle). It is the only third-party
  request on the page.
- Images are shared across pages by design (15 real photos). Alt text and captions vary, but Google will
  see the same image URLs on many pages — that is normal for service businesses; do not multiply the same
  photo with different filenames to fake variety.
- Prices are typical ranges, not quotes. Update them per market when you have real data.
- Legal pages are templates — have them reviewed.
