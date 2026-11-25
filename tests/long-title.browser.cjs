const test = require('node:test');
const assert = require('node:assert/strict');
const { openSite } = require('./helpers/browser.cjs');
test('every project title and dialog fit narrow mobile screens', async () => {
  const site = await openSite();
  try {
    for(const width of [320,390]) {
      const page = await site.browser.newPage({viewport:{width,height:844},reducedMotion:'reduce'});
      await page.goto(site.url);
      for(const project of require('../content/projects.json')) {
        await page.locator(`[data-project-key="${project.id}"]`).click();
        const sizes = await page.locator('#project-detail-dialog').evaluate(dialog=>({client:dialog.clientWidth,scroll:dialog.scrollWidth,title:dialog.querySelector('h2').getBoundingClientRect().right,right:dialog.getBoundingClientRect().right}));
        assert.ok(sizes.scroll<=sizes.client, `${project.id} at ${width}px: ${JSON.stringify(sizes)}`);
        assert.ok(sizes.title<=sizes.right, `${project.id}: title fits the dialog`);
        await page.keyboard.press('Escape');
        await page.waitForFunction(()=>!document.body.classList.contains('project-open'));
      }
      await page.close();
    }
  } finally { await site.close(); }
});
