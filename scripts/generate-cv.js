const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const VARIANTS = [
  { html: 'cv.html', pdf: 'cv.pdf' },       // Korean
  { html: 'cv-en.html', pdf: 'cv-en.pdf' }, // English
];

async function generateCV() {
  const browser = await puppeteer.launch();

  const projectRoot = path.resolve(__dirname, '..');
  const publicDir = path.resolve(projectRoot, 'public');

  for (const variant of VARIANTS) {
    const page = await browser.newPage();
    const cvPath = path.resolve(publicDir, variant.html);
    const pdfPath = path.resolve(publicDir, variant.pdf);

    let html = fs.readFileSync(cvPath, 'utf-8');

    // Replace all /assets/ image srcs with inline base64 to bypass Chrome's file:// restrictions
    html = html.replace(/src="(\/assets\/[^"]+)"/g, (match, assetPath) => {
      const filePath = path.resolve(publicDir, assetPath.slice(1));
      if (!fs.existsSync(filePath)) return match;
      const ext = path.extname(filePath).slice(1).replace('jpg', 'jpeg');
      const data = fs.readFileSync(filePath).toString('base64');
      return `src="data:image/${ext};base64,${data}"`;
    });

    await page.setContent(html, { waitUntil: 'networkidle0' });

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: { top: '13mm', right: '15mm', bottom: '13mm', left: '15mm' },
      printBackground: true,
    });

    await page.close();
    console.log(`✓ CV PDF generated: ${pdfPath}`);
  }

  await browser.close();
}

generateCV().catch(console.error);
