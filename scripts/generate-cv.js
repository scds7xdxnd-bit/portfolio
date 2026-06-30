const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generateCV() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const cvPath = path.resolve(__dirname, '../public/cv.html');
  const pdfPath = path.resolve(__dirname, '../public/cv.pdf');

  await page.goto(`file://${cvPath}`, { waitUntil: 'networkidle0' });

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
