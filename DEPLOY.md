# Why the site returned 404, and how to fix it

The 404 is not a code bug: `https://first-responder-garage-doors.pages.dev/robots.txt`
returns Cloudflare's own default file, and every other path (including `/_next/...` and
`/favicon.svg`) is a bare 404. That means **no build output was ever published to the
project** — Pages has a project but no successful deployment behind it.

There are only four realistic causes, in order of probability.

---

## Cause 1 — "Framework preset: Next.js" (most likely)

If the preset is set to **Next.js**, Cloudflare ignores the plain `next build` command, runs
`npx @cloudflare/next-on-pages@1` and expects `.vercel/output/static`.
This project uses `output: 'export'`, which `next-on-pages` does **not** support — the build
fails, nothing is published, every URL 404s.

**Fix**

Pages → your project → **Settings → Build configuration → Edit**

| Field | Value |
|---|---|
| Framework preset | **None** |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | *(leave empty / `/`)* |
| Node version | `20` (env var `NODE_VERSION=20` if the dropdown is missing) |

Save → **Deployments → Retry deployment** (or push any commit).

`wrangler.toml` is now in the repo with `pages_build_output_dir = "out"`, so even if the
dashboard field is wrong, Pages will read the correct directory from the file.

---

## Cause 2 — the build failed (timeout or memory)

14,264 pages is heavy. Cloudflare's free build limit is **20 minutes**; if the build is
cancelled, the project stays on "no deployment" and every URL 404s.

**How to confirm:** Pages → Deployments → open the latest → **View build log** → look for
`Build failed`, `timeout`, or `JavaScript heap out of memory`.

**Fix A — raise the heap**
Settings → Environment variables (Production) → add
`NODE_OPTIONS = --max-old-space-size=6144`

**Fix B — build on GitHub instead of Cloudflare** (recommended, unlimited time)
1. Repo → Settings → Secrets and variables → Actions → add
   `CLOUDFLARE_API_TOKEN` (Pages: Edit permission) and `CLOUDFLARE_ACCOUNT_ID`.
2. Actions tab → **Deploy to Cloudflare Pages** → Run workflow.
   `.github/workflows/deploy.yml` builds `out/` and uploads it with wrangler.
3. After the first successful run, set Pages → Settings → Build → **None** so the two
   pipelines don't overwrite each other.

---

## Cause 3 — output directory pointed somewhere else

If "Build output directory" is `.next`, `.`, `dist` or blank, Pages serves a folder with no
`index.html` at its root → 404 on `/`.

The build **must** produce `out/index.html`. Confirmed locally: `out/` contains
`index.html`, `404.html`, `services/`, `areas/`, `_next/`, `images/`, 14,267 `.html` files,
14,432 files total, 518 MB.

---

## Cause 4 — wrong project / branch

- The project name must be exactly `first-responder-garage-doors` for that hostname.
- The production branch must be `main` (the repo's default branch).
- If you renamed the project, set `NEXT_PUBLIC_SITE_URL` in the environment variables to the
  real URL **before** rebuilding — canonicals and sitemap URLs are generated from it.

---

## Verify it worked

```bash
curl -o /dev/null -w "%{http_code}\n" https://first-responder-garage-doors.pages.dev/
# expect 200
curl -s https://first-responder-garage-doors.pages.dev/ | grep -o '<title>[^<]*'
# expect: <title>24/7 Garage Door Repair &amp; Installation | First Responder Garage Doors
curl -o /dev/null -w "%{http_code}\n" https://first-responder-garage-doors.pages.dev/sitemap.xml
# expect 200
```

---

## Deploy without Git at all (fastest fallback)

On a machine with Node 20 and the repo cloned:

```bash
npm ci
npm run build                     # ~6–10 min, produces out/
npx wrangler pages deploy out --project-name=first-responder-garage-doors
```

Wrangler uploads 14,432 files in a few minutes and the site is live immediately, bypassing
Cloudflare's build entirely.
