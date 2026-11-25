const test = require('node:test');
const assert = require('node:assert/strict');
const { openSite } = require('./helpers/browser.cjs');

test('English home localizes project cards, galleries, dialog actions and language routes', async () => {
  const site = await openSite();
  try {
    const context = await site.browser.newContext({ viewport:{width:1280,height:900}, reducedMotion:'reduce' });
    const page = await context.newPage();
    await page.goto(`${site.url}/en/`);
    assert.equal(await page.locator('html').getAttribute('lang'), 'en');
    assert.equal(await page.locator('.language-indicator').getAttribute('href'), '/');
    assert.equal(await page.locator('[data-project-key="veripago"] h3').textContent(), 'VeriPago');
    assert.match(await page.locator('[data-project-key="veripago"]').textContent(), /Organizes QR payments/);
    await page.locator('[data-project-key="veripago"]').click();
    const dialog = page.locator('#project-detail-dialog');
    await dialog.waitFor({state:'visible'});
    assert.match(await dialog.textContent(), /VeriPago brings payment links/);
    assert.match(await dialog.textContent(), /Gallery · web version/);
    assert.match(await dialog.textContent(), /Gallery · Android app/);
    assert.equal(await dialog.locator('[data-gallery-platform="web"] img').count(), 2);
    assert.equal(await dialog.locator('[data-gallery-platform="mobile"] img').count(), 2);
    assert.doesNotMatch(await dialog.textContent(), /Reseña|Demostraciones en video|Galería ·/);
    assert.ok(await dialog.getByRole('link', {name:/Source code on GitHub/}).count());
    await context.close();
  } finally {
    await site.close();
  }
});
