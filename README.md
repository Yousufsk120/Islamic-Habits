# Islamic Habits (Vite + React + Tailwind)

Ready-to-deploy minimal MVP:
- Tasbih counter
- Daily Salah tracker
- Sadaqah log

## Dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Deploy the `dist/` folder (e.g., Cloudflare Pages, Netlify).

**Cloudflare Pages settings**
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 20+

## Features added
- React Router with code-splitting (lazy pages)
- Install banner (A2HS)
- PWA cache + SPA navigation fallback
- Rewards system (XP, levels, badges) stored locally
- Cloudflare Web Analytics snippet (replace `YOUR-CLOUDFLARE-TOKEN` in `index.html`)

## Deploy (Cloudflare Pages)
- Build command: `npm run build`
- Output: `dist`
- Ensure routes are served as SPA (fallback to index.html). Cloudflare Pages does this automatically for SPA.
