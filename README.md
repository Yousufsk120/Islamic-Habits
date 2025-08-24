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

Deploy the `dist/` folder to Vercel, Netlify, or other static hosting providers.

**Vercel deployment**
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 20+

## Features added
- React Router with code-splitting (lazy pages)
- PWA manifest for install banner (A2HS)
- Rewards system (XP, levels, badges) stored locally
- SPA routing configuration for Vercel

## Deploy (Vercel)
- Build command: `npm run build`
- Output: `dist`
- Vercel automatically handles SPA routing via the included `vercel.json` configuration.
