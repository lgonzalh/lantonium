const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');

test('maintenance docs reference real content sources and preserve publication conditions', () => {
  const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
  const delivery = fs.readFileSync(path.join(root, 'docs/entrega-integracion.md'), 'utf8');
  const scripts = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')).scripts;
  const projects = JSON.parse(fs.readFileSync(path.join(root, 'content/projects.json'), 'utf8'));
  let previous = -1;
  for (const project of projects) {
    const position = readme.indexOf(`${projects.indexOf(project) + 1}. ${project.name}`);
    assert.ok(position > previous, `README preserves order: ${project.name}`);
    previous = position;
  }
  for (const command of ['build', 'test', 'test:browser']) {
    assert.ok(scripts[command], `${command} exists`);
    assert.ok(readme.includes(command === 'test' ? 'npm test' : `npm run ${command}`));
  }
  for (const file of ['content/projects.json', 'content/pages.json', 'scripts/build-portfolio.cjs', 'scripts/build-pages.cjs', 'scripts/seo_audit.py', 'docs/contenidos-proyectos.md']) {
    assert.ok(readme.includes(file), `README documents ${file}`);
    assert.ok(fs.existsSync(path.join(root, file)), `${file} exists`);
  }
  for (const text of [readme, delivery]) {
    assert.match(text, /No publicar en Firebase sin confirmación expresa/);
    assert.match(text, /developer/);
    assert.match(text, /main/);
    assert.match(text, /Reino Unido/);
    assert.match(text, /un test \+ un commit/);
    assert.doesNotMatch(text, /firebase deploy/);
  }
});
