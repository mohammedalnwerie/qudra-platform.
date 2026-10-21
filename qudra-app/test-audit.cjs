const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function runAudit() {
  console.log('=== STARTING AUTOMATED BROWSER AUDIT ===');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  const consoleWarnings = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    } else if (msg.type() === 'warning') {
      consoleWarnings.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push('PAGE_ERROR: ' + err.toString());
  });

  // 1. Test Desktop (1440x900)
  await page.setViewport({ width: 1440, height: 900 });
  console.log('\n[TEST 1] Loading http://localhost:5173/ (Desktop 1440x900)...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // Check if intro is present and dismiss it if so
  const skipButton = await page.$('.intro-skip-btn, button');
  if (skipButton) {
    try {
      await page.evaluate(() => {
        sessionStorage.setItem('qudra_intro_seen', 'true');
        const intro = document.querySelector('.cinematic-intro-overlay');
        if (intro) {
          const btn = intro.querySelector('button');
          if (btn) btn.click();
        }
      });
      await new Promise(r => setTimeout(r, 1000));
    } catch (e) {}
  }

  // 2. Check Home Dashboard in Freelancer mode
  console.log('\n[TEST 2] Verifying Freelancer Mode...');
  let bodyText = await page.evaluate(() => document.body.innerText);
  console.log('Contains Karim Elmenshawy:', bodyText.includes('كريم المنشاوي'));
  console.log('Contains 94% Trust Score:', bodyText.includes('94%'));

  // 3. Test Role Switching to Enterprise
  console.log('\n[TEST 3] Testing Role Switching to Enterprise...');
  await page.evaluate(() => {
    // Click on persona button in navbar
    const btns = Array.from(document.querySelectorAll('button'));
    const roleBtn = btns.find(b => b.innerText.includes('كريم المنشاوي') || b.title?.includes('تبديل'));
    if (roleBtn) roleBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  await page.evaluate(() => {
    // Click on Enterprise option
    const options = Array.from(document.querySelectorAll('button[role="menuitem"]'));
    const entOpt = options.find(o => o.innerText && o.innerText.includes('منشأة أعمال') && o.innerText.includes('شركة مسار'));
    if (entOpt) entOpt.click();
  });
  await new Promise(r => setTimeout(r, 2200));

  bodyText = await page.evaluate(() => document.body.innerText);
  const hasMasar = bodyText.includes('شركة مسار للتحول الرقمي');
  const hasEscrow60k = bodyText.includes('60,000 ر.س') || bodyText.includes('60,000');
  const hasSavings12k = bodyText.includes('12,000');
  console.log('Enterprise Dashboard Active:', hasMasar);
  console.log('Active Escrow 60,000 SAR shown:', hasEscrow60k);
  console.log('Commission Savings 12,000 SAR shown:', hasSavings12k);

  // 4. Test Role Switching to Student
  console.log('\n[TEST 4] Testing Role Switching to Student...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const roleBtn = btns.find(b => b.innerText.includes('شركة مسار') || (b.title && b.title.includes('تبديل')));
    if (roleBtn) roleBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.evaluate(() => {
    const options = Array.from(document.querySelectorAll('button[role="menuitem"]'));
    const studOpt = options.find(o => o.innerText && o.innerText.includes('طالب') && o.innerText.includes('سارة'));
    if (studOpt) studOpt.click();
  });
  await new Promise(r => setTimeout(r, 1500));

  bodyText = await page.evaluate(() => document.body.innerText);
  const hasSarah = bodyText.includes('سارة الزهراني');
  console.log('Student Dashboard Active (Sarah):', hasSarah);

  // 5. Test Dark Theme / Eye Comfort Toggle and Contrast Check
  console.log('\n[TEST 5] Testing Eye-Comfort Theme Toggle & Card Contrast...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const themeBtn = btns.find(b => b.getAttribute('aria-label')?.includes('Mode') || b.title?.includes('الراحة'));
    if (themeBtn) themeBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  const darkThemeInfo = await page.evaluate(() => {
    const docTheme = document.documentElement.getAttribute('data-theme');
    const cards = Array.from(document.querySelectorAll('.card'));
    const cardBgColors = cards.slice(0, 5).map(c => window.getComputedStyle(c).backgroundColor);
    return { docTheme, cardBgColors };
  });
  console.log('data-theme attribute:', darkThemeInfo.docTheme);
  console.log('Computed background colors of first 5 .card elements in dark mode:', darkThemeInfo.cardBgColors);

  // Switch back to light theme
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const themeBtn = btns.find(b => b.getAttribute('aria-label')?.includes('Mode') || b.title?.includes('الوضع'));
    if (themeBtn) themeBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // 6. Test Language Toggle (English LTR)
  console.log('\n[TEST 6] Testing Language Toggle to English (LTR)...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const langBtn = btns.find(b => b.innerText.includes('EN') || b.innerText.includes('عربي'));
    if (langBtn) langBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  const ltrInfo = await page.evaluate(() => {
    return {
      dir: document.documentElement.dir,
      lang: document.documentElement.lang,
      hasWelcome: document.body.innerText.includes('Welcome back')
    };
  });
  console.log('Dir attribute:', ltrInfo.dir);
  console.log('Lang attribute:', ltrInfo.lang);
  console.log('English Welcome text present:', ltrInfo.hasWelcome);

  // Switch back to Arabic RTL
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const langBtn = btns.find(b => b.innerText.includes('عربي') || b.innerText.includes('EN'));
    if (langBtn) langBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Switch back to Freelancer role for project tests
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const roleBtn = btns.find(b => b.innerText.includes('سارة') || b.title?.includes('تبديل'));
    if (roleBtn) roleBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.evaluate(() => {
    const options = Array.from(document.querySelectorAll('div, button'));
    const fOpt = options.find(o => o.innerText && o.innerText.includes('مستقل محترف') && o.innerText.includes('كريم'));
    if (fOpt) fOpt.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // 7. Test Browse Projects (M17) and Proposal Modal
  console.log('\n[TEST 7] Testing Browse Projects (M17) & Proposal Modal...');
  await page.goto('http://localhost:5173/?module=M17&state=1', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  bodyText = await page.evaluate(() => document.body.innerText);
  console.log('Projects Page loaded:', bodyText.includes('تصفح المشاريع والفرص الهندسية'));
  console.log('SAR Budget shown:', bodyText.includes('60,000 ر.س'));
  console.log('0% Commission badge shown:', bodyText.includes('0% عمولة'));

  // Click on "تقديم عبر الجواز الموثق"
  console.log('Opening Capability-Backed Proposal Modal...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const applyBtn = btns.find(b => b.innerText.includes('تقديم عبر الجواز'));
    if (applyBtn) applyBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  const modalOpen = await page.evaluate(() => {
    return document.body.innerText.includes('تقديم عرض مدعوم بالأدلة الرقمية') &&
           document.body.innerText.includes('تأكيد إرسال العرض الموثق');
  });
  console.log('Proposal Modal open with attached skills and escrow notice:', modalOpen);

  // Confirm submission
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const confirmBtn = btns.find(b => b.innerText.includes('تأكيد إرسال العرض الموثق'));
    if (confirmBtn) confirmBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  const isSubmittedState = await page.evaluate(() => {
    return document.body.innerText.includes('تم تقديم الملف الموثق') || document.body.innerText.includes('تم تقديم');
  });
  console.log('Proposal submitted state updated on card:', isSubmittedState);

  // 8. Test Capability Passport (M07) and Hire CTA
  console.log('\n[TEST 8] Testing Capability Passport (M07) & Client CTA...');
  await page.goto('http://localhost:5173/?module=M07&state=1', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  bodyText = await page.evaluate(() => document.body.innerText);
  const hasHireCta = bodyText.includes('توظيف المستقل بضمان بنكي (0% عمولة)');
  const hasDevApiTab = bodyText.includes('بيانات المطورين والـ API');
  console.log('Hire via Escrow CTA button present:', hasHireCta);
  console.log('Developer & API tab label updated:', hasDevApiTab);

  // Click Hire CTA - should navigate to M15
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const hireBtn = btns.find(b => b.innerText.includes('توظيف المستقل بضمان'));
    if (hireBtn) hireBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  const currentUrl = page.url();
  console.log('Navigated URL after Hire CTA click:', currentUrl);
  console.log('Successfully routed to M15:', currentUrl.includes('module=M15'));

  // 9. Test Project Workspace (M21) & Revision Workflow
  console.log('\n[TEST 9] Testing Project Workspace (M21) & Milestone Revision Flow...');
  await page.goto('http://localhost:5173/?module=M21&state=1', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  bodyText = await page.evaluate(() => document.body.innerText);
  console.log('4-Step Escrow Lifecycle Banner present:', bodyText.includes('إيداع الضمان البنكي') && bodyText.includes('تحويل الأرباح (0% عمولة)'));

  // Click Review & Release on Milestone 2
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const reviewBtn = btns.find(b => b.innerText.includes('اعتماد وصرف الدفعة'));
    if (reviewBtn) reviewBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  const releaseModalOpen = await page.evaluate(() => {
    return document.body.innerText.includes('اعتماد التسليم والإفراج عن الدفعة') &&
           document.body.innerText.includes('طلب تعديل مرحلي');
  });
  console.log('Milestone Review Modal open with Request Revision option:', releaseModalOpen);

  // Click Request Revision
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const revBtn = btns.find(b => b.innerText.includes('طلب تعديل مرحلي'));
    if (revBtn) revBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  const revModeActive = await page.evaluate(() => {
    return document.body.innerText.includes('طلب تعديل مرحلي على التسليم') &&
           document.body.innerText.includes('تجميد الضمان المالي أثناء التعديل');
  });
  console.log('Revision mode active with Escrow Hold notice:', revModeActive);

  // Confirm revision request
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const submitRevBtn = btns.find(b => b.innerText.includes('إرسال طلب التعديل وتجميد الضمان'));
    if (submitRevBtn) submitRevBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  bodyText = await page.evaluate(() => document.body.innerText);
  const milestoneShowsRevision = bodyText.includes('مطلوب تعديلات مرحلية');
  console.log('Milestone badge updated to Revision Requested:', milestoneShowsRevision);

  // 10. Test Mobile Viewport (390x844)
  console.log('\n[TEST 10] Testing Mobile Viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/?module=M02&state=1', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));

  const mobileCheck = await page.evaluate(() => {
    const scrollWidth = document.documentElement.scrollWidth;
    const clientWidth = document.documentElement.clientWidth;
    const bottomNavVisible = window.getComputedStyle(document.querySelector('.mobile-bottom-nav')).display !== 'none';
    const hamburgerVisible = window.getComputedStyle(document.querySelector('.mobile-menu-btn')).display !== 'none';
    return {
      hasHorizontalOverflow: scrollWidth > clientWidth,
      scrollWidth,
      clientWidth,
      bottomNavVisible,
      hamburgerVisible
    };
  });
  console.log('Mobile Horizontal Overflow:', mobileCheck.hasHorizontalOverflow, `(${mobileCheck.scrollWidth}px vs ${mobileCheck.clientWidth}px)`);
  console.log('Mobile Bottom Navigation Visible:', mobileCheck.bottomNavVisible);
  console.log('Mobile Hamburger Menu Button Visible:', mobileCheck.hamburgerVisible);

  console.log('\n=== CONSOLE SUMMARY ===');
  console.log('Console Errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Errors:', consoleErrors);
  }
  console.log('Console Warnings count:', consoleWarnings.length);
  if (consoleWarnings.length > 0) {
    console.log('Warnings (sample):', consoleWarnings.slice(0, 3));
  }

  await browser.close();
  console.log('\n=== AUDIT RUN COMPLETED ===');
}

runAudit().catch(err => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
