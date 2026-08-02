# Zaqzouqa Marketing City

Static marketing site + chat page for **Zaqzouqa Marketing City**.

## Pages

| URL | File |
|-----|------|
| `/` | `index.html` |
| `/chat` | `chat.html` |

Images live in the `public/` folder. In HTML they are referenced as `/public/...`.

**Why images broke on Vercel:** Vercel was still treating the repo like Next.js, which serves `public/` files at the **site root** (`/mascot.png`), while the HTML asked for `/public/mascot.png`. `vercel.json` now rewrites `/public/*` → `/*` so both layouts work. Always commit the `public/` folder (PNGs included).

## Local preview

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Opening `index.html` as a file (`file://`) may break `/public/...` paths — use `npm run dev` instead.

## Deploy to GitHub + Vercel

### 1. Push to GitHub (include images!)

```bash
git init
git add index.html chat.html vercel.json public package.json README.md .gitignore 404.html robots.txt sitemap.xml
git commit -m "Fix image paths for Vercel and GitHub"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Import / redeploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) (or open the existing project → **Redeploy**)
2. Framework preset: leave as detected, or set to **Other** — `vercel.json` sets `framework: null`
3. Click **Deploy**

No build step required. After deploy, check: `https://YOUR-SITE.vercel.app/public/mascot.png` (or `/mascot.png`) should load.

## Mobile

- Responsive layout from phones to desktop
- Safe-area padding for notched devices
- Touch-friendly buttons and floating guide
- Chat page uses full viewport height (`100dvh`)

## Note about `/app` and `/components`

Those folders are leftover Next.js source from an earlier version. The **live site** is the static HTML files. Vercel is configured to ignore the Next.js framework so deploys stay simple and fast.
