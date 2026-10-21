const puppeteer = require('puppeteer-core');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\msi\\.gemini\\antigravity\\brain\\98c14a3f-b3b6-486b-9e26-4c3fa2c9cebe';

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Home Dashboard
  await page.goto('http://localhost:5173/?role=freelancer&module=M02', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    sessionStorage.setItem('qudra_intro_seen', 'true');
    const intro = document.querySelector('.cinematic-intro-overlay');
    if (intro) intro.style.display = 'none';
  });
  await sleep(1000);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screen_home_freelancer.png'), fullPage: false });
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screen_home_freelancer_full.png'), fullPage: true });

  // 2. Enterprise Dashboard
  await page.goto('http://localhost:5173/?role=enterprise&module=M02', { waitUntil: 'networkidle0' });
  await sleep(1000);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screen_home_enterprise.png'), fullPage: false });

  // 3. Browse Projects M17
  await page.goto('http://localhost:5173/?role=freelancer&module=M17', { waitUntil: 'networkidle0' });
  await sleep(1000);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screen_browse_projects.png'), fullPage: false });

  // 4. Capability Passport M06
  await page.goto('http://localhost:5173/?role=freelancer&module=M06', { waitUntil: 'networkidle0' });
  await sleep(1000);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screen_capability_passport.png'), fullPage: false });

  // 5. Mobile Viewport (390x844)
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/?role=freelancer&module=M02', { waitUntil: 'networkidle0' });
  await sleep(1000);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screen_mobile_home.png'), fullPage: false });

  console.log('Screenshots captured successfully to artifact directory!');
  await browser.close();
}

capture();
