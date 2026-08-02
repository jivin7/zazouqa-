# Zaqzouqa Marketing City

Flat static site — **all files in one folder**. No `public/`, no Next.js.

## Files

| File | What |
|------|------|
| `index.html` | Home page |
| `chat.html` | Chat with Zaqzouqa |
| `*.png` / `icon.svg` | Images (same folder as the HTML) |
| `vercel.json` | Vercel config |

Image paths are root-level, e.g. `/mascot.png`, `/hero-duo.png`.

## Local preview

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to GitHub + Vercel

```bash
git init
git add .
git commit -m "Flat static Zaqzouqa site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Then on [vercel.com/new](https://vercel.com/new): import the repo → **Deploy** (framework: Other / no build).

Or in an existing Vercel project: push, then **Redeploy**.

After deploy, check: `https://YOUR-SITE.vercel.app/mascot.png`
