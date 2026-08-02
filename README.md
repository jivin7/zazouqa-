# Zaqzouqa Marketing City

Static marketing site + chat page for **Zaqzouqa Marketing City**.

## Pages

| URL | File |
|-----|------|
| `/` | `index.html` |
| `/chat` | `chat.html` |

Images live in `/public`.

## Local preview

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Or just open `index.html` in a browser (image paths still work).

## Deploy to GitHub + Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Publish Zaqzouqa Marketing City"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/zaqzouqa-marketing-city.git
git push -u origin main
```

### 2. Import on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repo
3. Leave settings as-is (this project is **static** — `vercel.json` sets `framework: null`)
4. Click **Deploy**

No build step required. Vercel serves `index.html` and `chat.html` directly.

## Mobile

- Responsive layout from phones to desktop
- Safe-area padding for notched devices
- Touch-friendly buttons and floating guide
- Chat page uses full viewport height (`100dvh`)

## Note about `/app` and `/components`

Those folders are leftover Next.js source from an earlier version. The **live site** is the static HTML files. Vercel is configured to ignore the Next.js framework so deploys stay simple and fast.
