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

test('English project directory translates every feature, media label and gallery action', async () => {
  const site = await openSite();
  try {
    const context = await site.browser.newContext({ viewport:{width:1280,height:900}, reducedMotion:'reduce' });
    const page = await context.newPage();
    await page.goto(`${site.url}/en/projects`);
    assert.equal(await page.locator('html').getAttribute('lang'), 'en');
    assert.match(await page.locator('body').innerText(), /Full project descriptions and available resources/);
    assert.doesNotMatch(await page.locator('body').innerText(), /Descripciones completas|Funcionalidades|Reseña|Galería|Ampliar /);
    const translations=require('../content/projects.en.json');
    const sourceProjects=require('../content/projects.json');
    for(const [id,project] of Object.entries(translations)) {
      const section=page.locator(`section#${id}`);
      assert.equal(await section.locator('ul li').count(),project.features.length,`${id} feature list`);
      const text=await section.innerText();
      for(const feature of project.features) assert.ok(text.includes(feature),`${id}: ${feature}`);
      for(const title of project.videoTitles || []) assert.ok(text.includes(title),`${id}: ${title}`);
      const expectedImages=sourceProjects.find(item=>item.id===id).images.length;
      const imageLinks=section.locator('a[aria-label^="Enlarge "]');
      assert.equal(await imageLinks.count(),expectedImages,`${id} image gallery labels`);
      for(const label of await imageLinks.evaluateAll(nodes=>nodes.map(node=>node.getAttribute('aria-label')))) assert.doesNotMatch(label,/Ampliar|captura/i);
    }
    await context.close();
  } finally {
    await site.close();
  }
});

test('unknown English routes keep the 404 status and render English navigation and copy', async () => {
  const site = await openSite();
  try {
    const context = await site.browser.newContext({ viewport:{width:1280,height:900}, reducedMotion:'reduce' });
    const page = await context.newPage();
    const response = await page.goto(`${site.url}/en/missing-page`);
    assert.equal(response.status(),404);
    assert.equal(await page.locator('html').getAttribute('lang'),'en');
    assert.match(await page.locator('body').innerText(),/This page cannot be found/);
    assert.equal(await page.locator('.language-indicator').getAttribute('href'),'/');
    assert.equal(await page.locator('.language-indicator').getAttribute('title'),'Spanish');
    assert.doesNotMatch(await page.locator('body').innerText(),/Esta página|Puedes volver|Volver al portafolio/);
    await context.close();
  } finally {
    await site.close();
  }
});
