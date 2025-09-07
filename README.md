# Exotic Car Rental 3D Walkthrough

Version: 1.0.5 (Deployment path fix)

## Why You Saw a Black Screen
On GitHub Pages under a project site (https://username.github.io/<repo>/), absolute paths like `/src/main.jsx` point to `https://username.github.io/src/main.jsx` (missing the `<repo>` segment).  
Your `index.html` referenced `/src/main.jsx`, which 404’d, so no JavaScript executed → black screen.

## Fixes in 1.0.5
- Set `base: '/3dcc/'` in `vite.config.js` (adjust if your repository has a different name).
- Made the entry script path relative: `./src/main.jsx`.
- Removed unnecessary preload that caused 404 in production.

## Deployment Sanity Checklist
1. Run build: `npm run build`
2. Inspect `dist/index.html` — scripts should look like:
   ```html
   <script type="module" crossorigin src="/3dcc/assets/index-xxxxx.js"></script>
   ```
3. Ensure gh-pages branch contains only the `dist` contents (not the raw `/src`).
4. Visit: `https://<user>.github.io/3dcc/`
5. Open DevTools Network tab: confirm 200 responses for `assets/index-*.js`.
6. No models yet? You should still see UI & ground (not pure black).

## If Still Black
| Symptom | Cause | Fix |
|---------|-------|-----|
| 404 on main bundle | Wrong base | Update `vite.config.js` base to repo name |
| 404 /src/main.jsx | Deployed raw source | Use `npm run build` then deploy `dist` |
| Favicon 404 | Base mismatch | Keep correct base or ignore (harmless) |
| Outline not visible | No car loaded/selected | Add models & click car |

## Quick Start
```bash
rm -rf node_modules dist package-lock.json
npm install
npm run dev     # local
npm run build   # production build
npm run deploy  # push dist to gh-pages
```

## Adding Car Models
Place `.glb` files in:
```
public/assets/models/
```
Adjust `CARS` array in `src/config.js` if you rename or add positions.

## Optional Next Enhancements
Ask and I can add (regenerating full project):
- HDR environment lighting (PMREM)
- Day/night cycle
- Mobile drag camera look (touch yaw/pitch)
- Minimap / radar overlay
- Car interior view toggle
- Bloom / SSAO
- Car interaction animations (doors open)

Let me know which you’d like next.