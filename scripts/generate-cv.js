const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generateCV() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const projectRoot = path.resolve(__dirname, '..');
  const cvPath = path.resolve(projectRoot, 'public/cv.html');
  const pdfPath = path.resolve(projectRoot, 'public/cv.pdf');
  const publicDir = path.resolve(projectRoot, 'public');

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

  await browser.close();
  console.log(`✓ CV PDF generated: ${pdfPath}`);
}

generateCV().catch(console.error);
