const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
test('public interface keeps Colombian Spanish and provides the authorized English version', () => {
  const root=path.resolve(__dirname,'..');
  for(const page of ['index.html','privacy.html','license.html','proyectos.html','404.html']) {
    const html=fs.readFileSync(path.join(root,page),'utf8');
    assert.match(html, /<html lang="es-CO">/);
    assert.doesNotMatch(html, />MENU<|>PROJECT \/|SYSTEM STUDY|>INDEX ·|>CONTEXT</);
    assert.match(html, /href="\/en\//);
  }
  for(const page of ['index.html','privacy.html','license.html','projects.html']) {
    const html=fs.readFileSync(path.join(root,'en',page),'utf8');
    assert.match(html, /<html lang="en">/);
    assert.match(html, /Switch to Spanish/);
    assert.match(html, /href="\/" hreflang="es-CO"/);
  }
});
