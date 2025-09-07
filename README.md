# Exotic Car Rental 3D Walkthrough

Version: 1.0.6 (Deployment clarity)

## Why You Saw a Black Screen
You published the raw development `index.html` (still pointing to `/src/main.jsx`), so GitHub Pages served that JSX file with a non-JS MIME type (`text/jsx`). The browser refuses to execute it. A correct Vite build rewrites the script to something like:
```html
<script type="module" crossorigin src="/3dcc/assets/index-<hash>.js"></script>
```
If you still see `/src/main.jsx` in View Source after deployment, you did NOT deploy `dist/`.

## Correct Deployment (Manual)
```bash
rm -rf dist
npm run build
npm run deploy
# Wait ~30s, hard refresh https://<user>.github.io/3dcc/
```

## Automatic Deployment (GitHub Actions)
1. Commit the workflow at `.github/workflows/deploy.yml`.
2. Push to `main`.
3. Action builds and publishes to `gh-pages` branch.
4. Set GitHub Pages source to `gh-pages` branch (if not automatic).

## Sanity Check After Deploy
1. Open site → View Source.
2. Verify script tag references `/3dcc/assets/index-<hash>.js`.
3. DevTools Network tab: main JS returns 200, type = `application/javascript`.
4. Console: no "Failed to load module script" errors.

## Local Dev
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## (Optional) Deploy from docs/ instead of gh-pages
```bash
npm run build:docs   # produces docs/
# Commit docs/ and set Pages to 'main /docs'
```

## Models
Add GLB files:
```
public/assets/models/car1.glb
```
Edit `CARS` in `src/config.js` if new IDs or positions.

## Common Deployment Mistakes
| Symptom | Cause | Fix |
|---------|-------|-----|
| MIME type text/jsx | Deployed source | Deploy dist (build first) |
| 404 /src/main.jsx | Same as above | Deploy dist |
| Works locally only | Base mismatch | Set `base: '/3dcc/'` & rebuild |
| 404 assets on Pages | Cached old index | Hard refresh / clear cache |
| Blank but no errors | JS bundle blocked by extension or CSP | Check console/network |

## Next Enhancements (ask to add any)
- HDR environment lighting
- Day/night cycle
- Minimap / radar
- Touch drag look (camera)
- Interior view switching
- Bloom / SSAO toggle
- Door / light animations

Let me know which you want next; I’ll regenerate full project with it integrated.