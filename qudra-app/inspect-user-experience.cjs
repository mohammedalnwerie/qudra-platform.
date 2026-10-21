const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const results = {
    modalsEscapeKey: false,
    clickOutsideModal: false,
    emptyStateSearch: false,
    buttonStyles: [],
    microcopyAnalysis: {},
    passportSkillsCount: 0,
    workspaceDetails: {}
  };

  // 1. Test Freelancer Home Dashboard
  await page.goto('http://localhost:5173/?role=freelancer&module=M02', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));

  results.homeButtons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button')).map(b => ({
      text: b.innerText.trim().replace(/\n/g, ' '),
      className: b.className,
      height: Math.round(b.getBoundingClientRect().height),
      padding: window.getComputedStyle(b).padding
    })).filter(b => b.text.length > 0 && b.text.length < 50);
  });

  // 2. Test Browse Projects & Search Filter
  await page.goto('http://localhost:5173/?role=freelancer&module=M17', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));

  const searchInput = await page.$('input[placeholder*="المشاريع"], input[placeholder*="projects"]');
  if (searchInput) {
    await searchInput.type('xyz123nonexistentsearchterm');
    await new Promise(r => setTimeout(r, 400));
    results.emptyStateSearch = await page.evaluate(() => {
      const text = document.body.innerText;
      return text.includes('لا توجد مشاريع') || text.includes('لا توجد نتائج') || text.includes('No projects found');
    });
    // clear input
    await page.evaluate(el => el.value = '', searchInput);
    await searchInput.type(' ');
    await new Promise(r => setTimeout(r, 400));
  }

  // 3. Test Proposal Modal: Open, Escape Key, Click Outside
  await page.evaluate(() => {
    const applyBtns = Array.from(document.querySelectorAll('button')).filter(b => b.innerText.includes('تقديم'));
    if (applyBtns.length > 0) applyBtns[0].click();
  });
  await new Promise(r => setTimeout(r, 600));

  const modalOpenBeforeEscape = await page.evaluate(() => {
    return !!document.querySelector('div[style*="z-index: 9999"], div[style*="zIndex: 9999"]');
  });

  // Test Escape Key
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 500));
  const modalOpenAfterEscape = await page.evaluate(() => {
    return !!document.querySelector('div[style*="z-index: 9999"], div[style*="zIndex: 9999"]');
  });
  results.modalsEscapeKey = (modalOpenBeforeEscape && !modalOpenAfterEscape);

  // Re-open modal and test click outside (backdrop)
  await page.evaluate(() => {
    const applyBtns = Array.from(document.querySelectorAll('button')).filter(b => b.innerText.includes('تقديم'));
    if (applyBtns.length > 0) applyBtns[0].click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Click on backdrop (at coordinate 50, 50)
  await page.mouse.click(50, 50);
  await new Promise(r => setTimeout(r, 500));
  const modalOpenAfterBackdropClick = await page.evaluate(() => {
    return !!document.querySelector('div[style*="z-index: 9999"], div[style*="zIndex: 9999"]');
  });
  results.clickOutsideModal = !modalOpenAfterBackdropClick;

  // 4. Test Capability Passport
  await page.goto('http://localhost:5173/?role=freelancer&module=M06', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  results.passportSkillsCount = await page.evaluate(() => {
    return document.querySelectorAll('.card-interactive').length;
  });

  // 5. Test Project Workspace (M21)
  await page.goto('http://localhost:5173/?role=freelancer&module=M21', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  results.workspaceDetails = await page.evaluate(() => {
    const reviewBtns = Array.from(document.querySelectorAll('button')).filter(b => b.innerText.includes('مراجعة') || b.innerText.includes('اعتماد') || b.innerText.includes('Review'));
    return {
      reviewButtonsAvailable: reviewBtns.length,
      hasEscrowBanner: !!document.querySelector('.card'),
      title: document.querySelector('h1')?.innerText
    };
  });

  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
