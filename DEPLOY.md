# Deploy — I can touch it website

Static HTML site deployed on Render as a **Static Site** (not Web Service — much simpler, no Python/Node).

## Render setup

1. Push this repo to `Buinho-Creative-Hub/icantouchit-website` on GitHub.
2. Render dashboard → **New +** → **Static Site**.
3. Connect the GitHub repo.
4. Configuration:
   - **Name:** `icantouchit-website`
   - **Region:** Frankfurt
   - **Branch:** `main`
   - **Root Directory:** _(leave empty)_
   - **Build Command:** _(leave empty — no build step)_
   - **Publish Directory:** `.` _(repo root)_
5. Click **Create Static Site**.

Render will deploy in ~30 seconds. Live at `https://icantouchit-website.onrender.com`.

## Custom domain

In Render → service → **Settings** → **Custom Domains** → add `icantouchit.buinho.eu` (or chosen subdomain).

Render will give you a CNAME target. In Webtuga DNS for `buinho.eu`:

- **Type:** CNAME
- **Name:** `icantouchit` _(or whatever subdomain)_
- **Target:** _(value Render gave you)_
- **TTL:** 60

Wait 10–30 min for propagation. Render auto-provisions Let's Encrypt SSL.

## ⚠️ DNS cleanup first

Before adding the CNAME, **remove any other records** for that subdomain in Webtuga (A, TXT, DKIM, CardDAV, CalDAV, etc). Mixed records will cause `CNAME and other data` errors and the SSL won't provision.

This was the root cause of the Braille Dome deploy headache — don't repeat it.

## Updates

Any push to `main` triggers automatic redeploy. ~30 seconds to go live.

## Local preview

```bash
cd icantouchit-website
python3 -m http.server 8000
# open http://localhost:8000
```

No build step needed — what you see locally is exactly what gets deployed.
