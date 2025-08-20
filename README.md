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

Deploy the `dist/` folder to any static hosting provider.

## Deployment

### Vercel (Recommended)
This project is optimized for Vercel deployment with:
- **Framework Detection**: Auto-detects as Vite project
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x+ (recommended 20.x)
- **SPA Routing**: Configured via `vercel.json` for React Router

**Vercel Deployment Steps:**
1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect the project settings
3. Deploy! All routes will work correctly with client-side routing

**Manual Vercel CLI:**
```bash
npx vercel
# Follow prompts, settings are pre-configured in vercel.json
```

### Cloudflare Pages
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 20+
- SPA routing: Automatic for Vite projects

### Netlify
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 20+
- Add `_redirects` file: `/* /index.html 200`

## Features added
- React Router with code-splitting (lazy pages)
- Install banner (A2HS)
- PWA cache + SPA navigation fallback
- Rewards system (XP, levels, badges) stored locally
- Optimized Vite build with chunk splitting
- Security headers in Vercel deployment
- Cloudflare Web Analytics snippet (replace `YOUR-CLOUDFLARE-TOKEN` in `index.html`)

## Configuration Files
- `vercel.json`: Vercel deployment configuration with SPA routing
- `vite.config.js`: Optimized build settings and chunk splitting
- `tailwind.config.js`: Tailwind CSS configuration
- `package.json`: Build scripts with fallback for missing sitemap generator
