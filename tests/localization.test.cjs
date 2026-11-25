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
    const expectedSpanishPath = page === 'privacy.html' ? '/privacy' : page === 'license.html' ? '/license' : page === 'projects.html' ? '/proyectos' : '/';
    assert.ok(html.includes(`href="${expectedSpanishPath}" hreflang="es-CO"`));
  }
  const englishHome=fs.readFileSync(path.join(root,'en/index.html'),'utf8');
  const englishProjects=require('../content/projects.en.json');
  for(const project of Object.values(englishProjects)) {
    assert.ok(englishHome.includes(`>${project.name}</h3>`), `English project title: ${project.name}`);
    assert.ok(englishHome.includes(project.summary), `English project summary: ${project.name}`);
  }
});
