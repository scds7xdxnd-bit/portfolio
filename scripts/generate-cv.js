const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const VARIANTS = [
  { lang: 'ko', html: 'cv.html', pdf: 'cv.pdf' },       // Korean
  { lang: 'en', html: 'cv-en.html', pdf: 'cv-en.pdf' }, // English
  { lang: 'zh', html: 'cv-zh.html', pdf: 'cv-zh.pdf' }, // Simplified Chinese
  { lang: 'zh-hant', html: 'cv-zh-hant.html', pdf: 'cv-zh-hant.pdf' }, // Traditional Chinese
];

async function generateCV() {
  // Omit the language to regenerate all PDFs, or use e.g. npm run generate-cv -- zh.
  const language = process.argv[2];
  const variants = language ? VARIANTS.filter(variant => variant.lang === language) : VARIANTS;
  if (!variants.length) throw new Error(`Unknown CV language: ${language}. Use ${VARIANTS.map(variant => variant.lang).join(', ')}.`);

  const browser = await puppeteer.launch();

  const projectRoot = path.resolve(__dirname, '..');
  const publicDir = path.resolve(projectRoot, 'public');

  for (const variant of variants) {
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
    await page.evaluate(() => document.fonts.ready);

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

generateCV().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
