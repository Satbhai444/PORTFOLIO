const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:5174/contact', { waitUntil: 'networkidle' });
  await page.waitForSelector('.input-group', { timeout: 5000 });
  await page.screenshot({ path: 'contact-form.png', fullPage: false });
  console.log('Screenshot saved');
  await browser.close();
})();
