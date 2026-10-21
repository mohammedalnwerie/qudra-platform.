const puppeteer = require('puppeteer-core');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\msi\\.gemini\\antigravity\\brain\\450d6894-70e4-4d01-98e6-eb762fdfd85b';
const BASE_URL = 'http://localhost:5173/';

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function setupPage(page) {
  await page.evaluate(() => {
    sessionStorage.setItem('qudra_intro_seen', 'true');
    const intro = document.querySelector('.cinematic-intro-overlay');
    if (intro) intro.style.display = 'none';
  });
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  console.log('Capturing independent audit screenshots...');

  // 1. لوحة تحكم المستقل (Desktop 1440x900)
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE_URL + '?role=freelancer&module=M02', { waitUntil: 'networkidle0' });
  await setupPage(page);
  await sleep(1800);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'audit_1_freelancer_dashboard.png') });
  console.log('1. Freelancer Dashboard captured');

  // 2. تصفح المشاريع والفرص (Desktop 1440x900)
  await page.goto(BASE_URL + '?role=freelancer&module=M17', { waitUntil: 'networkidle0' });
  await setupPage(page);
  await sleep(1200);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'audit_2_browse_projects.png') });
  console.log('2. Browse Projects captured');

  // 3. جواز القدرات (Tablet 820x1180)
  await page.setViewport({ width: 820, height: 1180 });
  await page.goto(BASE_URL + '?role=freelancer&module=M07', { waitUntil: 'networkidle0' });
  await setupPage(page);
  await sleep(1400);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'audit_3_capability_passport.png') });
  console.log('3. Capability Passport (Tablet) captured');

  // 4. مساحة عمل المشروع (Desktop 1440x900)
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE_URL + '?role=enterprise&module=M21', { waitUntil: 'networkidle0' });
  await setupPage(page);
  await sleep(1400);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'audit_4_project_workspace.png') });
  console.log('4. Project Workspace captured');

  // 5. لوحة المنشأة (Desktop 1440x900)
  await page.goto(BASE_URL + '?role=enterprise&module=M02', { waitUntil: 'networkidle0' });
  await setupPage(page);
  await sleep(1800);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'audit_5_enterprise_dashboard.png') });
  console.log('5. Enterprise Dashboard captured');

  // 6. القائمة الجانبية والتنقل على الهاتف (Mobile 390x844)
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(BASE_URL + '?role=freelancer&module=M02', { waitUntil: 'networkidle0' });
  await setupPage(page);
  await sleep(1000);
  // Open mobile sidebar drawer
  await page.evaluate(() => {
    const hamburger = document.querySelector('.mobile-menu-btn');
    if (hamburger) hamburger.click();
  });
  await sleep(600);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'audit_6_mobile_nav_drawer.png') });
  console.log('6. Mobile Navigation & Drawer captured');

  // 7. نافذة منبثقة ونموذج تفاعلي (Proposal Modal on Browse Projects - Desktop 1440x900)
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE_URL + '?role=freelancer&module=M17', { waitUntil: 'networkidle0' });
  await setupPage(page);
  await sleep(1000);
  // Click on apply proposal button
  await page.evaluate(() => {
    const applyBtns = Array.from(document.querySelectorAll('button')).filter(b => b.innerText.includes('تقديم عبر الجواز الموثق') || b.innerText.includes('تقديم'));
    if (applyBtns.length > 0) applyBtns[0].click();
  });
  await sleep(800);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'audit_7_interactive_modal.png') });
  console.log('7. Interactive Modal captured');

  // Close proposal modal
  await page.keyboard.press('Escape');
  await sleep(500);

  // 7b. نافذة تفاصيل نطاق المشروع (Project Scope Details Modal)
  await page.evaluate(() => {
    const scopeBtns = Array.from(document.querySelectorAll('button')).filter(b => b.innerText.includes('تفاصيل المتطلبات'));
    if (scopeBtns.length > 0) scopeBtns[0].click();
  });
  await sleep(800);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'audit_10_project_scope_modal.png') });
  console.log('7b. Project Scope Details Modal captured');
  await page.keyboard.press('Escape');
  await sleep(500);

  // 8. الوضع الداكن (Desktop 1440x900)
  await page.goto(BASE_URL + '?role=freelancer&module=M02', { waitUntil: 'networkidle0' });
  await setupPage(page);
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('qudra_theme', 'dark');
  });
  await sleep(1000);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'audit_8_dark_mode.png') });
  console.log('8. Dark Mode captured');

  // 9. الواجهة الإنجليزية (English LTR - Desktop 1440x900)
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('qudra_theme', 'light');
  });
  // Toggle language to English via clicking language switcher or evaluate
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const langBtn = btns.find(b => b.innerText.includes('EN') || (b.title && b.title.includes('English')));
    if (langBtn) langBtn.click();
  });
  await sleep(1000);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'audit_9_english_ltr.png') });
  console.log('9. English LTR captured');

  await browser.close();
  console.log('All 9 audit screenshots captured successfully!');
})();
