/* Verifies @vitejs/plugin-react is installed */
const fs = require('fs');
const path = require('path');
const p = path.join(process.cwd(), 'node_modules', '@vitejs', 'plugin-react', 'package.json');
if (fs.existsSync(p)) {
  const pkg = JSON.parse(fs.readFileSync(p, 'utf8'));
  console.log('[OK] @vitejs/plugin-react version:', pkg.version);
} else {
  console.error('[ERROR] @vitejs/plugin-react NOT FOUND.');
  process.exit(1);
}