const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
test('one public site retains legacy routes and resolves every public local resource', () => {
  const config = JSON.parse(read('firebase.json')).hosting;
  const projects = JSON.parse(read('content/projects.json'));
  for(const p of projects.filter(p=>!['veripago','yt2mp3','appsistemaclientes'].includes(p.id))) {
    for(const suffix of ['', '.html']) assert.ok(config.redirects.some(r=>r.source === '/'+p.id+suffix && r.type===301 && r.destination === '/?proyecto='+p.id));
  }
  assert.ok(config.redirects.some(r=>r.source==='/PortfolioLuisGonzalez' && r.destination==='/'));
  for(const name of ['apps.html','about.html','PortfolioLuisGonzalez.html']) assert.ok(!fs.existsSync(path.join(root,name)));
  for(const page of ['index.html','proyectos.html','privacy.html','license.html','404.html']) {
    const html=read(page);
    assert.doesNotMatch(html, /googletagmanager|gtag\(|lgonzalh@outlook|(?:src|href)="[^"]*bootstrap/i);
    assert.match(html, /portfolio-ai\.css/);
    for(const m of html.matchAll(/(?:src|href)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
      const route=decodeURIComponent(m[1]);
      if(route === '/') continue;
      assert.ok(fs.existsSync(path.join(root,route)) || fs.existsSync(path.join(root,route+'.html')), `${page}: ${route}`);
    }
    for(const m of html.matchAll(/<img\b[^>]*>/g)) assert.match(m[0], /alt="[^"]*"/);
  }
  assert.match(read('robots.txt'), /https:\/\/lantonium.com\/sitemap.xml/);
  assert.doesNotMatch(read('sitemap.xml'), /PortfolioLuisGonzalez|apps\.html|web\.app/);
  assert.ok(config.ignore.includes('content/**'));
});
