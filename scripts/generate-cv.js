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

  // Read HTML and convert relative asset paths to absolute file paths
  let html = fs.readFileSync(cvPath, 'utf-8');
  html = html.replace(/src="\/assets\//g, `src="file://${publicDir}/assets/`);

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
