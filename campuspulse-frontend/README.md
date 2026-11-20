# CampusPulse Frontend
React 19 + Vite + Bootstrap 5 + custom CSS + Axios + Recharts.

## Local
1. Install Node 20.19+ or 22+.
2. `cp .env.example .env` (on Windows: `copy .env.example .env`).
3. `npm install`
4. `npm run dev`
5. Open http://localhost:5173.

## Render Static Site
Build command: `npm ci && npm run build` (or `npm install && npm run build` if no lockfile).
Publish directory: `dist`.
Environment: `VITE_API_URL=https://YOUR-BACKEND.onrender.com/api` (no trailing slash).
SPA rewrite: `/*` -> `/index.html` (Rewrite); `public/_redirects` is included.
The app uses a JWT in sessionStorage: refresh persists within a tab, closing the tab removes it. This is susceptible to XSS; avoid third-party scripts and use strict CSP in production. See backend README.

Campus hero uses Unsplash source images, loaded directly by URL. Replace with campus-owned/licensed imagery for a production institution; gradient backgrounds are fallbacks.
