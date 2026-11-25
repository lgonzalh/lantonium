const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
test('public interface uses Colombian Spanish and defers the English version', () => {
  const root=path.resolve(__dirname,'..');
  for(const page of ['index.html','privacy.html','license.html','proyectos.html','404.html']) {
    const html=fs.readFileSync(path.join(root,page),'utf8');
    assert.match(html, /<html lang="es-CO">/);
    assert.doesNotMatch(html, />MENU<|>PROJECT \/|SYSTEM STUDY|>INDEX ·|>CONTEXT</);
    assert.match(html, /Idioma: español de Colombia/);
    assert.doesNotMatch(html, /hreflang="en"|href="\/en(?:\/|")/);
  }
  assert.ok(!fs.existsSync(path.join(root,'en')));
});
