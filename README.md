# Exotic Car Rental 3D Walkthrough

Version: 1.0.7 (Deployment fix instructions)

## Why Your Screen Was Black
You deployed an index.html that still references `/src/main.jsx` (dev source), so the browser fetched raw JSX with MIME `text/jsx`, refused to execute, and no app booted.

## MUST-HAVE After Deployment
Open View Source of the live site:
- You SHOULD see a hashed bundle, e.g.:
  `<script type="module" crossorigin src="/3dcc/assets/index-ABCDE123.js"></script>`
- You should NOT see `<script ... src="/src/main.jsx">`

If you see `/src/main.jsx` → you published the unbuilt source.

## Correct Deployment (gh-pages)
```bash
npm install
npm run build
npm run deploy
# In GitHub: Settings > Pages > Source: gh-pages (root)
# Hard refresh browser (Ctrl+F5)
```

## Alternative (docs folder)
```bash
npm run build:docs
git add docs
git commit -m "docs: build"
git push
# Set Pages: main branch /docs folder
```

## Local Dev
```bash
npm run dev
```

## Build
```bash
npm run build
```

## Verification Commands
```bash
# After build:
grep -i "src/main.jsx" dist/index.html  # should return nothing
grep -i "assets/index" dist/index.html  # should show hashed bundle line
```

## Common Mistakes
| Symptom | Cause | Fix |
|---------|-------|-----|
| 404 /src/main.jsx | Raw source deployed | Deploy dist or docs output |
| Black screen no errors except 404 | Missing bundle | Same as above |
| 404 assets on Pages | Wrong base | Set `base: '/3dcc/'` and rebuild |
| Works locally only | Not building | Run `npm run build` |

## Next Enhancements (ask me to add)
- HDR environment lighting
- Day/night lighting cycle
- Mobile drag camera look
- Minimap / radar
- Car interior view
- Bloom / SSAO post effects
- Animated doors / lights

Ask for any feature and I’ll regenerate full project with it integrated.