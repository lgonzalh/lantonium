const test = require('node:test');
const assert = require('node:assert/strict');
const { openSite } = require('./helpers/browser.cjs');
test('VeriPago and SEVETCO have separate real web and Android galleries', async () => {
  const site = await openSite();
  try {
    const page = await site.browser.newPage({ reducedMotion: 'reduce' });
    for (const id of ['veripago','sevetco']) {
      await page.goto(`${site.url}/?proyecto=${id}`);
      for (const platform of ['web','mobile']) {
        const group = page.locator(`[data-gallery-platform="${platform}"]`);
        assert.ok(await group.locator('img').count() >= 2);
        await group.locator('img').first().evaluate(img => img.decode());
        assert.ok(await group.locator('img').first().evaluate(img => img.naturalWidth > 0));
      }
      assert.equal(await page.locator('#project-detail-dialog').evaluate(el => el.open), true);
    }
  } finally { await site.close(); }
});
