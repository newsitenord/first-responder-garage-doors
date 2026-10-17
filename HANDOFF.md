# Handoff — First Responder Garage Doors

**Repo:** https://github.com/newsitenord/first-responder-garage-doors (public, `main`)
**Pages generated:** 14,264 · **Files deployed:** 14,432 · **Total:** 518 MB
**Phone wired everywhere:** +1 (858) 726-5336
**GSC verification:** `9PT-7-EXbP8-UGnEKPcJcqD7IrU_dBzjOp_0aSJzsMc` — homepage only, exactly as asked.

---

## 1. Connect Cloudflare Pages (5 minutes)

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
2. Repo: `newsitenord/first-responder-garage-doors`, branch `main`.
3. Build settings:
   - Framework preset: **None**
   - Build command: `npm run build`
   - Build output directory: `out`
   - Node version: **20** (`.nvmrc` already in the repo)
4. **Project name must be `first-responder-garage-doors`.**
   That makes the live URL `https://first-responder-garage-doors.pages.dev`, which is what every
   canonical, sitemap URL and schema `@id` already points to. If Cloudflare forces a different
   project name, add an environment variable **before the first build**:
   `NEXT_PUBLIC_SITE_URL = https://<your-real-project>.pages.dev`, then redeploy — otherwise every
   canonical will point at the wrong host.
5. Optional: `LEAD_WEBHOOK_URL` — where the contact form posts leads (Zapier / Make / CRM / Ringba
   custom webhook). Without it the form still works and redirects to `/thank-you/`.

**Build will take 10–15 minutes** (14k pages). Cloudflare's free build timeout is 20 minutes, so it fits
— but it is close. If it ever times out, remove 4 services from `data/services.index.json` and
`lib/content/services.ts`, rebuild, then add them back later.

---

## 2. After the first deploy — checklist

- [ ] Open `https://first-responder-garage-doors.pages.dev/` — check the hero, phone button, mobile call bar.
- [ ] Open `/sitemap.xml` — confirm 15 shards load.
- [ ] Open `/robots.txt` — confirm sitemap lines point at the live domain.
- [ ] Google Search Console → add property → verify (the meta tag is already on the homepage).
- [ ] Submit `sitemap.xml` in GSC.
- [ ] URL Inspection → request indexing for: homepage, `/services/`, `/areas/`, and the 20 biggest city pages.
- [ ] Check `/contact/` — submit a test lead, confirm `/thank-you/` loads and the webhook fires.
- [ ] Ringba: confirm the tracking number forwards to your buyer flow.

---

## 3. What is on the site

| Template | Count | URL pattern |
|---|---|---|
| Home | 1 | `/` |
| Service index | 1 | `/services/` |
| Service hubs | 16 | `/services/garage-door-repair/` |
| **Service × city** | **13,376** | `/services/garage-door-repair/ma/gardner/` |
| **City pages** | **836** | `/areas/ma/gardner/` |
| State hubs | 28 | `/areas/ma/` |
| All areas + directory | 2 | `/areas/`, `/site-directory/` |
| Core | 6 | `/about/`, `/contact/`, `/privacy-policy/`, `/terms/`, `/thank-you/`, 404 |

Each city page carries: population, density, county, ZIP-area count, state, nearby cities (from your
CSV), a climate profile (13 variants) driving the "common problems" blocks, 5 city FAQs, a map, and a
16-service grid linking to every service × city child page.

Each service × city page carries: the full service module (what's included, signs, process, price
table, FAQs) plus the local climate section, nearby areas, map and breadcrumbs.

---

## 4. Data filter you asked for

- CSV rows: 854 → **836 cities** used.
- Filter: **CPL payout ≥ $30** (your instruction). Range in the data: **$31.00 – $90.00**.
- Removed: 17 cities below $30 + 1 duplicate (King of Prussia appeared twice).
- States: 28 (SC dropped — its only city was below the payout floor).
- Population covered: 15.6M.

**About "top $170.10":** the LeadSmart CSV tops out at **$90 CPL**. The $170.10 figure is almost
certainly a Ringba revenue-per-call or a different vertical's payout — it is not in this dataset, so no
page promises it. If you have the real live payout table, drop it in as a CSV and I will re-rank and
re-generate the priority order.

**About the ZIP list:** the CSV has a **ZIP count** column (1,095 total across all cities), not actual
ZIP codes, and no separate ZIP file came through. Every page uses ZIP *areas*, never invented codes.
Send the real ZIP list and I will add ZIP-level blocks or ZIP pages.

---

## 5. Reviews — why the site does not claim 25+/4.3 and 33+/4.1

You asked for Yelp and GMB badges with those numbers, without links. I did not publish them.

- Fabricated review counts and star ratings are explicitly covered by the FTC's fake-review rule
  (civil penalties per violation), and Google removes review rich results — and can demote the whole
  site — for ratings that cannot be substantiated.
- On a pay-per-call site, Google already scrutinises "scaled content". Invented ratings on a
  `.pages.dev` subdomain are the single easiest thing for a competitor to report.
- The business has no public GBP/Yelp listing to point at, so the numbers would be unverifiable by
  design.

What is live instead: a trust bar (24/7 dispatch, licensed & insured, upfront pricing, warranty), a
real phone number on every page, written-price language, and a clear referral disclosure in the footer
and on `/about/`. That is the safe version of the same conversion signal.

**To turn real ratings on:** claim the GBP and Yelp profiles → send me the URLs + real counts → I add a
badge component that links to each source (links are required for compliance). 10 minutes of work.

---

## 6. Files you can download

- `deliverables/first-responder-sitemaps.zip` — `sitemap.xml` (index) + 15 shards + `image-sitemap.xml`
  + `robots.txt`. This is the file you asked for.
- The site itself lives in the GitHub repo; Cloudflare builds it from there.

---

## 7. Known limits / next moves

1. **Zero JS build**: `scripts/postbuild.mjs` strips the Next runtime because the site has no client
   components. If you add an interactive quote wizard later, delete the strip step or it will break.
2. **20,000-file limit**: the build lands at 14,432 files. You have ~5,500 files of headroom —
   enough for ~80 more cities × 16 services, not enough for a full national 20k-city expansion.
3. **Indexing velocity**: do not ask GSC to crawl 13k pages in week one. Submit, then let the sitemap
   shards feed in. Watch the "Indexed" count weekly.
4. **Duplicate content risk**: 836 city pages share structure. The differentiators are the CSV data +
   climate + nearby links + FAQs. If indexation stalls, the fastest fix is dropping the weakest 200
   cities rather than adding more pages.
5. **Prices** are planning ranges, not live market data. Update `lib/content/services.ts` when you have
   real buyer pricing per market.
