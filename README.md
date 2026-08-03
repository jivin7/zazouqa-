# Zaqzouqa Marketing City

Flat static HTML site — all files in one folder.

## Deploy on Vercel (important)

Your Vercel project may still be set to **Next.js**. That causes deploy failures now that Next is gone.

### Fix in Vercel dashboard

1. Open the project → **Settings** → **General**
2. **Framework Preset** → set to **Other**
3. **Build Command** → enable Override → leave **empty**
4. **Output Directory** → enable Override → set to `.`  (or leave empty)
5. **Install Command** → enable Override → leave **empty**
6. Save → **Deployments** → Redeploy (or push again)

### Or push this repo

`vercel.json` already forces: no framework, no build, no install, output `.`

## Local preview

Open `index.html` after a local static server, or:

```bash
npx serve .
```

## Pages

- `/` → `index.html`
- `/chat` → `chat.html`
- Images → same folder (`/mascot.png`, `/hero-duo.png`, …)
