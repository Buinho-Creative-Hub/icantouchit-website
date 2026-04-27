# Deploy notes — Fingers Read Space website

The site is a plain static bundle (HTML + CSS + JS + one SVG) — no build step, no backend, no environment variables.

## Where it runs

- **Host:** Render (region: Frankfurt)
- **Service type:** Static Site (Free plan — Render serves static sites from a global CDN with no cold starts)
- **Repository:** `Buinho-Creative-Hub/icantouchit-website`
- **Branch:** `main`
- **Publish path:** `.` (the repo root)
- **Build Command:** *(empty)* — there is no build step
- **Custom domain:** `touchit.buinho.eu`
- **Direct Render URL:** `https://icantouchit-website.onrender.com`

> Repo and live domain still carry the original "icantouchit" / "touchit" naming because both predate the rename to *Fingers Read Space*. The user-facing project name across the site itself is *Fingers Read Space · I Can Touch It*. We keep the existing repo and DNS to avoid touching working infrastructure.

## DNS

Subdomain `touchit.buinho.eu` is configured in the Webtuga DNS panel:

```
Type:   CNAME
Name:   touchit
Target: icantouchit-website.onrender.com
TTL:    60
```

Render handles SSL automatically via Let's Encrypt once the CNAME is verified.

## Pushing changes

1. Edit content directly in the repo (or in a local working copy) and commit to `main`.
2. Render auto-deploys within 1–2 minutes.
3. Verify: <https://touchit.buinho.eu> (EN) and <https://touchit.buinho.eu/pt/> (PT).

## Past pitfalls (lessons learned)

- **Wrong repo / wrong branch.** Earlier deploys pointed at `BuinhoHub/AI` on a stale branch with a Gradio prototype. The Render service must be wired to `Buinho-Creative-Hub/icantouchit-website` on `main`. Verify in the Render dashboard before debugging anything else.
- **Stale DNS records.** New subdomains work first time. Reused subdomains (e.g. anything that had a previous A/TXT/MX/CalDAV/CardDAV record) need the old records cleared in Webtuga before the CNAME will accept. `touchit` was an unused subdomain when the site went live, so this did not bite us — but watch out if the site is ever moved.
- **Build Command.** A static site has no build step. Leaving the Build Command empty is correct; do not paste `npm install` or `pip install -r requirements.txt` here.

## Versioning

- **v1** — original "I Can Touch It" multi-page placeholder (Apr 2026, ahead of the Gris identity manual). Preserved as Git tag `v1` for historical reference.
- **v2 (current)** — Fingers Read Space identity (Gris, D1.5 — Nov 2025), bilingual EN + PT.

## Local preview

Any HTTP server works. Quickest:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Opening the HTML files directly via `file://` mostly works but can break the relative paths between the EN root and the `/pt/` directory.
