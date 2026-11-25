const test = require('node:test');
const assert = require('node:assert/strict');
const { openSite } = require('./helpers/browser.cjs');

test('late preview images cannot overwrite the most recently selected project', async () => {
  const site = await openSite();
  let releaseSlow;
  try {
    const page = await site.browser.newPage({ reducedMotion: 'reduce' });
    // Routing disables the browser HTTP cache. Gate the first image until the
    // second selection has already rendered, rather than relying on network speed.
    const slowImage = '/assets/img/sevetco/web/02-panel.png';
    const fastImage = '/assets/img/pixelados/03-editor.png';
    let signalSlow;
    const slowRequested = new Promise(resolve => { signalSlow = resolve; });
    const slowGate = new Promise(resolve => { releaseSlow = resolve; });
    await page.route(`**${slowImage}`, async route => {
      signalSlow();
      await slowGate;
      await route.continue();
    });
    await page.goto(site.url);
    await page.locator('[data-project-key="sevetco"]').dispatchEvent('pointerenter');
    await slowRequested;
    await page.locator('[data-project-key="pixelados"]').dispatchEvent('pointerenter');
    await page.waitForFunction(src => document.querySelector('#project-preview-image').getAttribute('src') === src, fastImage);
    const slowFinished = page.waitForEvent('requestfinished', request => request.url().endsWith(slowImage));
    releaseSlow();
    await slowFinished;
    // Let the image load callback and its animation-frame updates complete.
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    assert.equal(await page.locator('.project-row.is-active').getAttribute('data-project-key'), 'pixelados');
    assert.equal(await page.locator('#preview-title').textContent(), 'Pixelados');
    assert.equal(await page.locator('#project-preview-image').getAttribute('src'), fastImage);
    assert.equal(await page.locator('#project-preview-image').getAttribute('alt'), 'Pixelados');
  } finally {
    releaseSlow?.();
    await site.close();
  }
});
