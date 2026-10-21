const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE_URL = 'http://localhost:5173/';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runVerifications() {
  console.log('====================================================');
  console.log('   QUDRA AUTOMATED COMPREHENSIVE VERIFICATION SUITE  ');
  console.log('====================================================\n');

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const network404s = [];
  const consoleErrors = [];

  page.on('response', response => {
    if (response.status() === 404) {
      network404s.push(response.url());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  const results = [];

  try {
    // -----------------------------------------------------------------
    // TEST 1: FAVICON & ASSET 404 VERIFICATION
    // -----------------------------------------------------------------
    console.log('[TEST 1] Testing Favicon and Static Asset Requests...');
    await page.setViewport({ width: 1440, height: 900 });
    
    // Explicitly test /favicon.ico and /favicon.svg
    const icoResponse = await page.goto(BASE_URL + 'favicon.ico');
    const icoStatus = icoResponse.status();
    const svgResponse = await page.goto(BASE_URL + 'favicon.svg');
    const svgStatus = svgResponse.status();

    await page.goto(BASE_URL, { waitUntil: 'networkidle0' });

    // Dismiss cinematic intro if present
    await page.evaluate(() => {
      sessionStorage.setItem('qudra_intro_seen', 'true');
      const intro = document.querySelector('.cinematic-intro-overlay');
      if (intro) intro.style.display = 'none';
    });
    await sleep(500);

    const validIco = [200, 304].includes(icoStatus);
    const validSvg = [200, 304].includes(svgStatus);
    const faviconOk = validIco && validSvg && !network404s.some(u => u.includes('favicon'));

    results.push({
      test: 'Favicon and Asset 404 Status',
      passed: faviconOk,
      detail: `ico: ${icoStatus}, svg: ${svgStatus}, 404 count: ${network404s.length}`
    });
    console.log(` -> Favicon & Assets: ${faviconOk ? 'PASS' : 'FAIL'} (${icoStatus}, ${svgStatus})\n`);

    // -----------------------------------------------------------------
    // TEST 2: DARK MODE BACKGROUND / CONTRAST
    // -----------------------------------------------------------------
    console.log('[TEST 2] Verifying Dark Mode Cards & Inline Styles...');
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('qudra_theme', 'dark');
    });
    await sleep(500);

    const cardBgInfo = await page.evaluate(() => {
      let whiteCount = 0;
      let darkCardBg = '';
      
      const sampleCard = document.querySelector('.card');
      if (sampleCard) {
        darkCardBg = window.getComputedStyle(sampleCard).backgroundColor;
      }

      document.querySelectorAll('.card, .metric-card, .action-panel, .activity-item').forEach(el => {
        const bg = window.getComputedStyle(el).backgroundColor;
        if (bg === 'rgb(255, 255, 255)') {
          whiteCount++;
        }
      });

      return { sampleCardBg: darkCardBg, whiteCardCount: whiteCount };
    });

    const isDarkBgValid = cardBgInfo.sampleCardBg === 'rgb(17, 24, 39)' && cardBgInfo.whiteCardCount === 0;
    results.push({
      test: 'Dark Mode Card Surfaces',
      passed: isDarkBgValid,
      detail: `Sample .card bg: ${cardBgInfo.sampleCardBg}, unexpected white elements: ${cardBgInfo.whiteCardCount}`
    });
    console.log(` -> Dark Mode Surfaces: ${isDarkBgValid ? 'PASS' : 'FAIL'} (${cardBgInfo.sampleCardBg})\n`);

    // Reset to light theme for subsequent functional tests
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('qudra_theme', 'light');
    });

    // -----------------------------------------------------------------
    // TEST 3: GSAP COUNTERS IN ENTERPRISE MODE
    // -----------------------------------------------------------------
    console.log('[TEST 3] Verifying Enterprise Counter Values after GSAP Animation...');
    await page.goto(BASE_URL + '?role=enterprise&module=M02', { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      sessionStorage.setItem('qudra_intro_seen', 'true');
      const intro = document.querySelector('.cinematic-intro-overlay');
      if (intro) intro.style.display = 'none';
    });
    await sleep(2200); // Allow GSAP counter animation to complete

    const enterpriseMetrics = await page.evaluate(() => {
      const text = document.body.innerText;
      const has60k = text.includes('60,000') || text.includes('60000');
      const has12k = text.includes('12,000') || text.includes('12000');
      return { has60k, has12k };
    });

    const countersOk = enterpriseMetrics.has60k && enterpriseMetrics.has12k;
    results.push({
      test: 'Enterprise Animated Counters',
      passed: countersOk,
      detail: `60,000 present: ${enterpriseMetrics.has60k}, 12,000 present: ${enterpriseMetrics.has12k}`
    });
    console.log(` -> Enterprise Counters: ${countersOk ? 'PASS' : 'FAIL'} (60k: ${enterpriseMetrics.has60k}, 12k: ${enterpriseMetrics.has12k})\n`);

    // -----------------------------------------------------------------
    // TEST 4: ROLE-SPECIFIC ACTIVITY FEEDS
    // -----------------------------------------------------------------
    console.log('[TEST 4] Verifying Role-Specific Activity Feed for all 4 Roles...');
    const roles = [
      { role: 'freelancer', expected: 'اعتماد توثيق سد ثغرة حماية السحابة في منصة التحديات' },
      { role: 'enterprise', expected: 'إيداع دفعة الضمان البنكي لمرحلة معمارية السحابة' },
      { role: 'student', expected: 'اجتياز تحدي فحص أمان واجهات API واكتساب أول إثبات رسمي' },
      { role: 'verifier', expected: 'اعتماد التدقيق البرمجي لمعمارية السحابة وإصدار التوقيع الرقمي' }
    ];

    let allRolesPassed = true;
    for (const r of roles) {
      await page.goto(`${BASE_URL}?role=${r.role}&module=M02`, { waitUntil: 'networkidle0' });
      await sleep(1000);

      const found = await page.evaluate((exp) => {
        return document.body.innerText.includes(exp);
      }, r.expected);

      console.log(`   - Role [${r.role}]: ${found ? 'PASS' : 'FAIL'}`);
      if (!found) allRolesPassed = false;
    }

    results.push({
      test: 'Role-Specific Activity Feed (4 Roles)',
      passed: allRolesPassed,
      detail: allRolesPassed ? 'All 4 roles display distinct verifiable records' : 'One or more roles failed'
    });
    console.log(` -> Role Activity Feeds: ${allRolesPassed ? 'PASS' : 'FAIL'}\n`);

    // -----------------------------------------------------------------
    // TEST 5: PROPOSAL SUBMISSION PERSISTENCE (BrowseProjects M17)
    // -----------------------------------------------------------------
    console.log('[TEST 5] Testing Proposal Persistence in BrowseProjects (M17)...');
    await page.goto(`${BASE_URL}?role=freelancer&module=M17`, { waitUntil: 'networkidle0' });
    await sleep(1000);

    // Click "تقديم عبر الجواز الموثق"
    const applyClicked = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('تقديم عبر الجواز الموثق'));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });

    if (applyClicked) {
      await sleep(500);
      // Click modal submit
      await page.evaluate(() => {
        const confirmBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('تأكيد إرسال العرض الموثق'));
        if (confirmBtn) confirmBtn.click();
      });
      await sleep(1000);
    }

    // Check localStorage
    const appliedIds = await page.evaluate(() => {
      return localStorage.getItem('qudra_demo_applied_proposals');
    });

    // Reload page
    await page.reload({ waitUntil: 'networkidle0' });
    await sleep(1000);

    const hasAppliedBadge = await page.evaluate(() => {
      return document.body.innerText.includes('تم تقديم الملف الموثق');
    });

    const proposalOk = Boolean(hasAppliedBadge && appliedIds && JSON.parse(appliedIds).length > 0);
    results.push({
      test: 'Proposal Submission Persistence',
      passed: proposalOk,
      detail: `Badge visible: ${hasAppliedBadge}, localStorage: ${appliedIds}`
    });
    console.log(` -> Proposal Persistence: ${proposalOk ? 'PASS' : 'FAIL'} (${appliedIds})\n`);

    // -----------------------------------------------------------------
    // TEST 6: PROJECT WORKSPACE MILESTONE REVISION PERSISTENCE (M21)
    // -----------------------------------------------------------------
    console.log('[TEST 6] Testing Milestone Revision Persistence in ProjectWorkspace (M21)...');
    await page.goto(`${BASE_URL}?role=enterprise&module=M21`, { waitUntil: 'networkidle0' });
    await sleep(1000);

    // Click "اعتماد وصرف الدفعة" on the ready review milestone
    const reviewBtnClicked = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('اعتماد وصرف الدفعة'));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });

    if (reviewBtnClicked) {
      await sleep(500);
      // Click "طلب تعديل مرحلي" inside the modal
      await page.evaluate(() => {
        const revToggleBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('طلب تعديل مرحلي'));
        if (revToggleBtn) revToggleBtn.click();
      });
      await sleep(500);

      // Enter feedback and submit revision
      await page.evaluate(() => {
        const textarea = document.querySelector('textarea');
        if (textarea) {
          textarea.value = 'الرجاء فحص زمن الاستجابة في معمارية الدفع.';
          textarea.dispatchEvent(new Event('input', { bubbles: true }));
        }
        const submitRevBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('إرسال طلب التعديل وتجميد الضمان'));
        if (submitRevBtn) submitRevBtn.click();
      });
      await sleep(1000);
    }

    const savedMilestones = await page.evaluate(() => {
      return localStorage.getItem('qudra_demo_workspace_milestones');
    });

    // Reload page
    await page.reload({ waitUntil: 'networkidle0' });
    await sleep(1000);

    const hasRevisionBadge = await page.evaluate(() => {
      return document.body.innerText.includes('مطلوب تعديلات');
    });

    const milestoneOk = Boolean(hasRevisionBadge && savedMilestones);
    results.push({
      test: 'Milestone Revision Persistence',
      passed: milestoneOk,
      detail: `Badge visible: ${hasRevisionBadge}, saved in localStorage: ${Boolean(savedMilestones)}`
    });
    console.log(` -> Milestone Persistence: ${milestoneOk ? 'PASS' : 'FAIL'}\n`);

    // -----------------------------------------------------------------
    // TEST 7: RESPONSIVE VIEWPORT TESTING (Zero Horizontal Scroll)
    // -----------------------------------------------------------------
    console.log('[TEST 7] Testing Responsive Viewports (Zero Horizontal Scroll)...');
    const viewports = [
      { name: 'Desktop (1440x900)', width: 1440, height: 900 },
      { name: 'Tablet (820x1180)', width: 820, height: 1180 },
      { name: 'Mobile (390x844)', width: 390, height: 844 }
    ];

    let allViewportsNoOverflow = true;
    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await sleep(500);
      const overflow = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        return { docWidth, winWidth, hasOverflow: docWidth > winWidth };
      });
      console.log(`   - Viewport ${vp.name}: ScrollWidth=${overflow.docWidth}, WindowWidth=${overflow.winWidth}, Overflow=${overflow.hasOverflow}`);
      if (overflow.hasOverflow) allViewportsNoOverflow = false;
    }

    results.push({
      test: 'Responsive Layout (Zero Horizontal Scroll)',
      passed: allViewportsNoOverflow,
      detail: allViewportsNoOverflow ? 'No horizontal scroll on Desktop, Tablet, or Mobile' : 'Overflow detected'
    });
    console.log(` -> Viewport Overflow Check: ${allViewportsNoOverflow ? 'PASS' : 'FAIL'}\n`);

    // -----------------------------------------------------------------
    // TEST 8: ZERO EMOJI COMPLIANCE
    // -----------------------------------------------------------------
    console.log('[TEST 8] Testing Zero Emoji Compliance across src/ ...');
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    const modifiedFiles = [
      'src/App.jsx',
      'src/components/modules/HomeDashboard.jsx',
      'src/components/modules/BrowseProjects.jsx',
      'src/components/modules/ProjectWorkspace.jsx',
      'src/components/modules/CapabilityPassport.jsx',
      'src/components/layout/Navbar.jsx',
      'src/styles/design-system.css',
      'index.html'
    ];

    let emojiFound = false;
    for (const f of modifiedFiles) {
      const fullPath = path.resolve(__dirname, f);
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (emojiRegex.test(content)) {
          console.log(`   - File ${f} contains emoji!`);
          emojiFound = true;
        }
      }
    }

    results.push({
      test: 'Zero Emoji Compliance',
      passed: !emojiFound,
      detail: emojiFound ? 'Emojis detected in modified files' : 'Zero emojis in all modified files'
    });
    console.log(` -> Emoji Check: ${!emojiFound ? 'PASS' : 'FAIL'}\n`);

  } catch (err) {
    console.error('Test Suite encountered an error:', err);
    results.push({
      test: 'Test Suite Execution',
      passed: false,
      detail: err.message
    });
  } finally {
    await browser.close();
  }

  console.log('====================================================');
  console.log('                 FINAL TEST REPORT                  ');
  console.log('====================================================');
  console.table(results);
  console.log('\nNetwork 404s total:', network404s.length);
}

runVerifications();
