const test = require('node:test');
const assert = require('node:assert/strict');
const { openSite } = require('./helpers/browser.cjs');
test('themes, filters, menus and legacy links work on desktop and mobile without overflow', async () => {
  const site = await openSite();
  try {
    for(const width of [1440,390,320]) {
      const context = await site.browser.newContext({ viewport:{width,height:900},colorScheme:'light',reducedMotion:'reduce' });
      const page = await context.newPage();
      const errors=[]; page.on('pageerror',e=>errors.push(e.message));
      const analytics=[];page.on('request',req=>{if(/google-analytics|googletagmanager/.test(req.url()))analytics.push(req.url());});
      await page.goto(site.url);
      assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
      assert.equal((await page.locator('#theme-toggle').textContent()).trim(),'');
      assert.equal(await page.locator('.language-indicator').getAttribute('aria-label'),'Idioma: español de Colombia');
      await page.locator('#theme-toggle').click();
      assert.equal(await page.locator('html').getAttribute('data-theme'),'light');
      await page.reload();
      assert.equal(await page.locator('html').getAttribute('data-theme'),'light');
      const search=page.locator('#portfolio-project-search');
      await search.fill('veripago');
      assert.equal(await page.locator('[data-project-row]:visible').count(),1);
      await search.fill('no existe este proyecto');
      assert.equal(await page.locator('#project-empty').isVisible(),true);
      await search.fill('');
      await page.locator('[data-project-filter="android"]').click();
      assert.equal(await page.locator('[data-project-row]:visible').count(),7);
      await page.locator('[data-project-filter="all"]').click();
      await page.locator('#menu-toggle').click();
      assert.equal(await page.locator('#portfolio-menu').isVisible(),true);
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('#menu-toggle').evaluate(el=>el===document.activeElement),true);
      for(const slug of ['','privacy','license','proyectos']) {
        await page.goto(`${site.url}/${slug}`);
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${width}px ${slug}`);
      }
      const response = await page.goto(`${site.url}/sevetco.html`);
      assert.equal(response.status(),200);
      assert.equal(await page.locator('#project-detail-title').textContent(),'SEVETCO');
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
      assert.deepEqual(errors,[]);assert.deepEqual(analytics,[]);
      await context.close();
    }
  } finally { await site.close(); }
});
