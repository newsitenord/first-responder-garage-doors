# Deploy notes — read this before touching the Cloudflare settings

## What actually failed (17 Oct, build log)

```
Found wrangler.toml file. Reading build configuration...
pages_build_output_dir: out
No build command specified. Skipping build step.        ← build never ran
Found Functions directory at /functions. Uploading.
Error: Output directory "out" not found.
Failed: build output directory not found
```

**Cause:** the `wrangler.toml` I added on the previous commit.

When Cloudflare Pages finds a `wrangler.toml`, it stops using the dashboard's Build configuration and
reads the build settings from that file instead. But a **Pages** `wrangler.toml` only supports
`pages_build_output_dir` — it has **no field for the build command** (Cloudflare documents this; the
`[build]` table is a *Workers* feature and is rejected for Pages). So Pages read the output directory,
found no command, skipped the build, then failed validation because `out/` had never been created.

The site itself was never broken — `out/` was simply never built on Cloudflare.

**Fix applied:** `wrangler.toml` has been deleted from the repository. Node is pinned with
`.node-version`, `.nvmrc` and `engines` in `package.json` instead. The build command now comes from the
dashboard, which is the only place Pages accepts it.

---

## Plan A — fix the Git integration (2 minutes)

Pages project → **Settings → Build configuration → Edit**

| Field | Value |
|---|---|
| Framework preset | **None** |
| **Build command** | `npm ci && npm run build` |
| **Build output directory** | `out` |
| Root directory | *(empty)* |

Then **Settings → Environment variables → Production** → add:

| Variable | Value |
|---|---|
| `NODE_VERSION` | `20` |
| `NODE_OPTIONS` | `--max-old-space-size=6144` |

Save → **Deployments → Retry deployment**.

`npm ci` is included deliberately: with the “None” preset, Cloudflare does not run an install step for
you, so the command must install dependencies and build in one line.

Expected log on success:

```
Installing dependencies... npm ci
> first-responder-garage-doors@1.0.0 prebuild
> node scripts/gen-sitemaps.mjs
sitemaps: 15 shards, 14264 URLs, 57 image entries
> next build && node scripts/postbuild.mjs
postbuild: 14267 html pages · scripts stripped on 14267 pages
postbuild: 14432 files deployed · 517.8 MB total
Success: Build command completed
Uploading... (14432/14432)
Success: Your site was deployed!
```

Build time is 8–14 minutes. Cloudflare's limit is 20 minutes — it fits, but it is not a lot of slack.

---

## Plan B — deploy from GitHub Actions (no Cloudflare build at all)

Use this if the Cloudflare build keeps timing out or you want deployments that cannot be broken by a
dashboard setting.

1. Create a Cloudflare API token: **My Profile → API Tokens → Create Token → Custom token**
   - Permissions: **Account → Cloudflare Pages → Edit**
   - Account resources: your account
2. Get the Account ID from the Cloudflare dashboard URL (`dash.cloudflare.com/<ACCOUNT_ID>/...`).
3. GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
4. Repo → **Actions** → *Deploy to Cloudflare Pages* → **Run workflow**.

`.github/workflows/deploy.yml` builds `out/` on an Ubuntu runner (no 20-minute cap) and uploads it with
`wrangler pages deploy out --project-name=first-responder-garage-doors`. After the first successful run,
set Pages → Settings → Build → **None** so the two pipelines do not overwrite each other.

---

## Plan C — deploy from your own machine (fastest, no CI at all)

```bash
git clone https://github.com/newsitenord/first-responder-garage-doors.git
cd first-responder-garage-doors
npm ci
npm run build                      # ~8 min, produces out/ (14,267 html, 14,432 files)
npx wrangler pages deploy out --project-name=first-responder-garage-doors
```

Wrangler opens a browser for login on first run. Uploads in a few minutes and the site is live
immediately, completely bypassing Cloudflare's builder.

---

## Things that must stay true

- The Cloudflare **project name is `first-responder-garage-doors`**. Every canonical, every sitemap
  `<loc>` and every schema `@id` is built from `https://first-responder-garage-doors.pages.dev`.
  If the project is ever renamed, set `NEXT_PUBLIC_SITE_URL` to the real URL and rebuild.
- **No `wrangler.toml` in the repo** unless it only declares `name`, `pages_build_output_dir` and
  `compatibility_date`, and you are happy for the dashboard build settings to be ignored.
- **Build output directory must be `out`** — it is a Next.js static export (`output: 'export'`), not
  `.next` and not `.vercel/output/static`. Do not select the “Next.js” framework preset: it runs
  `@cloudflare/next-on-pages`, which does not support static export.

---

## Verify after deploy

```bash
curl -o /dev/null -w "%{http_code}\n" https://first-responder-garage-doors.pages.dev/
# 200

curl -s https://first-responder-garage-doors.pages.dev/ | grep -o '<title>[^<]*'
# <title>24/7 Garage Door Repair &amp; Installation | First Responder Garage Doors

curl -o /dev/null -w "%{http_code}\n" https://first-responder-garage-doors.pages.dev/robots.txt
# 200, and the content must be 188 bytes with your sitemap line — if it is the
# 1,248-byte Cloudflare default, the deploy still has not published.

curl -o /dev/null -w "%{http_code}\n" https://first-responder-garage-doors.pages.dev/sitemap.xml
# 200
```

The `robots.txt` check is the fastest tell: Cloudflare serves a built-in default until a real deployment
goes live.
