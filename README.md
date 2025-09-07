# Exotic Car Rental 3D Walkthrough

Immersive 3D exotic car rental walkthrough built with **React + Vite** and **Three.js**.

## Version
Current: 1.0.4 (Fix: removed deprecated `sRGBEncoding`, now using `SRGBColorSpace` + `outputColorSpace`)

## Recent Fix
Build error: `"sRGBEncoding" is not exported by three.module.js`  
Resolved by migrating to the newer Three.js color space API.

## Quick Start
```bash
rm -rf node_modules dist package-lock.json
npm install
npm run verify   # optional
npm run dev
```

## Build & Deploy
```bash
npm run build
npm run deploy
```
Ensure `base` in `vite.config.js` matches your repo name.

## Color Space Change (Three.js)
Older usage:
```js
renderer.outputEncoding = sRGBEncoding;
```
New usage (r152+):
```js
renderer.outputColorSpace = SRGBColorSpace;
```
This project uses the new API with a fallback for older versions.

## Directory Layout
```
index.html
public/
  assets/models/
  assets/textures/
  assets/icons/
src/
  components/
  App.jsx
  main.jsx
  styles.css
  config.js
scripts/
  verify-plugin-react.cjs
vite.config.js
```

## Controls
Desktop: WASD / Arrows, Shift (sprint), Click to lock mouse look, Click car  
Mobile: Joystick auto, Tap car to select

## Troubleshooting
| Problem | Fix |
|---------|-----|
| sRGBEncoding export error | Use v1.0.4+ (uses SRGBColorSpace) |
| Plugin not found | `npm run verify` then reinstall deps |
| index.html missing | Ensure root has `index.html` |
| Assets 404 on Pages | Adjust `base` in `vite.config.js` |
| Pointer not locking | Click scene and allow pointer lock |
| Models huge | Adjust scaling logic in `CarModel.jsx` |

## Enhancement Ideas (ask me to add)
- HDR environment (PMREM)
- Day/night cycle
- Touch drag look (currently pointer lock only)
- Minimap overlay
- Car interior camera switching
- Animated car lights/doors
- Bloom / SSAO postprocessing toggle

## License
MIT (replace if desired).