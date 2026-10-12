import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const executablePath = fs.existsSync('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe')
  ? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  : 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

const outputDir = path.resolve('..', 'docs', 'visual-reviews');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function capture() {
  console.log(`Using browser: ${executablePath}`);
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // 1. Desktop Redesign (Home Dashboard M02)
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 15000 });
  await page.screenshot({ path: path.join(outputDir, 'redesign-desktop-home.png'), fullPage: false });
  console.log('Saved redesign-desktop-home.png');

  // 2. Tablet Redesign (820x1180)
  await page.setViewport({ width: 820, height: 1180 });
  await page.screenshot({ path: path.join(outputDir, 'redesign-tablet-home.png'), fullPage: false });
  console.log('Saved redesign-tablet-home.png');

  // 3. Mobile Redesign (390x844)
  await page.setViewport({ width: 390, height: 844 });
  await page.screenshot({ path: path.join(outputDir, 'redesign-mobile-home.png'), fullPage: false });
  console.log('Saved redesign-mobile-home.png');

  await browser.close();
  console.log('Post-redesign capture complete!');
}

capture().catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});
