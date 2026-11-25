const test = require('node:test');
const assert = require('node:assert/strict');
const { openSite } = require('./helpers/browser.cjs');
test('project dialogs show every detail, navigate images and stop video on close', async () => {
  const site = await openSite();
  try {
    const page = await site.browser.newPage({ reducedMotion: 'reduce' });
    const errors = []; page.on('pageerror', error => errors.push(error.message));
    await page.goto(site.url);
    const data = require('../content/projects.json');
    for (const p of data) {
      const row = page.locator(`[data-project-key="${p.id}"]`);
      await row.click();
      assert.equal(await page.locator('#project-detail-dialog').evaluate(el => el.open), true);
      assert.equal(await page.locator('#project-detail-title').textContent(), p.name);
      assert.equal(await page.locator('#project-detail-media .project-thumbnail').count(), p.images.length);
      assert.equal(await page.locator('#project-detail-media video').count(), p.videos.length);
      assert.ok((await page.locator('#project-detail-media').textContent()).includes(p.review));
      if(p.images.length) {
        const first = page.locator('.project-thumbnail').first();
        await first.click();
        await page.keyboard.press('ArrowLeft');
        assert.equal(await page.locator('#viewer-image').getAttribute('src'), p.images.at(-1).src);
        await page.keyboard.press('Escape');
        assert.equal(await first.evaluate(el => el === document.activeElement), true);
      }
      if(p.videos.length) await page.locator('video').first().evaluate(el => { el.dataset.pauseObserved = 'no'; el.pause = () => { el.dataset.pauseObserved = 'yes'; }; });
      await page.keyboard.press('Escape');
      await page.waitForFunction(() => !document.body.classList.contains('project-open'));
      if(p.videos.length) assert.equal(await page.locator('video').first().getAttribute('data-pause-observed'), 'yes');
      assert.equal(await row.evaluate(el => el === document.activeElement), true);
    }
    assert.deepEqual(errors, []);
  } finally { await site.close(); }
});
