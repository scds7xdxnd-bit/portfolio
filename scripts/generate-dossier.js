const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// One PDF per print profile. `all` keeps every sheet.
const PROFILES = [
  { profile: 'process',  pdf: 'dossier-process.pdf'  },
  { profile: 'global',   pdf: 'dossier-global.pdf'   },
  { profile: 'ra',       pdf: 'dossier-research.pdf' },
  { profile: 'onepager', pdf: 'dossier-onepager.pdf' },
  { profile: 'all',      pdf: 'dossier.pdf'          },
];

async function generateDossier() {
  const projectRoot = path.resolve(__dirname, '..');
  const publicDir = path.resolve(projectRoot, 'public');
  const source = path.resolve(publicDir, 'dossier.html');

  let html = fs.readFileSync(source, 'utf-8');

  // Inline /assets/ images as base64 so Chrome's file:// restrictions don't drop them
  html = html.replace(/src="(\/assets\/[^"]+)"/g, (match, assetPath) => {
    const filePath = path.resolve(publicDir, assetPath.slice(1));
    if (!fs.existsSync(filePath)) return match;
    const ext = path.extname(filePath).slice(1).replace('jpg', 'jpeg');
    const data = fs.readFileSync(filePath).toString('base64');
    return `src="data:image/${ext};base64,${data}"`;
  });

  const browser = await puppeteer.launch();

  for (const variant of PROFILES) {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // The inline script defaults to `process`; override after it has run.
    await page.evaluate((profile) => {
      if (profile === 'all') document.body.removeAttribute('data-profile');
      else document.body.setAttribute('data-profile', profile);
    }, variant.profile);

    const pdfPath = path.resolve(publicDir, variant.pdf);
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: { top: '14mm', right: '15mm', bottom: '14mm', left: '15mm' },
      printBackground: true,
    });

    await page.close();
    console.log(`✓ ${variant.profile.padEnd(8)} → ${path.basename(pdfPath)}`);
  }

  await browser.close();
}

generateDossier().catch((err) => { console.error(err); process.exit(1); });
