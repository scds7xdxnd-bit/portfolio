import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { renderSunPage } from '../src/components/sun-world.js';

// Static English HTML keeps the complete portfolio readable without JavaScript.
// Interactive enhancements and the user's saved language attach in sun-main.js.
const root = new URL('../', import.meta.url);
const template = await readFile(new URL('src/home-template.html', root), 'utf8');
if (!template.includes('<!-- SUN_PAGE -->')) throw new Error('Homepage template marker missing');
const html = template.replace('<!-- SUN_PAGE -->', () => renderSunPage('en'));
const destination = new URL('index.html', root);
await writeFile(destination, html);
console.log(`Rendered ${fileURLToPath(destination)}`);
