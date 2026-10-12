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
  const targetModule = process.argv[2] || 'M02';
  const filePrefix = process.argv[3] || 'redesign';
  const url = `http://localhost:5173/?module=${targetModule}&state=1`;

  console.log(`Using browser: ${executablePath}`);
  console.log(`Capturing ${targetModule} from ${url} with prefix '${filePrefix}'`);

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // 1. Desktop (1440x900)
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
  // Wait a short moment for animations/fonts to settle
  await new Promise(r => setTimeout(r, 1000));
  const desktopFile = `${filePrefix}-desktop.png`;
  await page.screenshot({ path: path.join(outputDir, desktopFile), fullPage: false });
  console.log(`Saved ${desktopFile}`);

  // 2. Tablet (820x1180)
  await page.setViewport({ width: 820, height: 1180 });
  await new Promise(r => setTimeout(r, 500));
  const tabletFile = `${filePrefix}-tablet.png`;
  await page.screenshot({ path: path.join(outputDir, tabletFile), fullPage: false });
  console.log(`Saved ${tabletFile}`);

  // 3. Mobile (390x844)
  await page.setViewport({ width: 390, height: 844 });
  await new Promise(r => setTimeout(r, 500));
  const mobileFile = `${filePrefix}-mobile.png`;
  await page.screenshot({ path: path.join(outputDir, mobileFile), fullPage: false });
  console.log(`Saved ${mobileFile}`);

  await browser.close();
  console.log(`Capture complete for ${targetModule}!`);
}

capture().catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});
