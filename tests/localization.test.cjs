const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
test('public interface keeps Colombian Spanish and provides the authorized English version', () => {
  const root=path.resolve(__dirname,'..');
  for(const [file,page] of [['index.html','index.html'],['privacy.html','privacy.html'],['license/index.html','license.html'],['proyectos.html','proyectos.html'],['404.html','404.html']]) {
    const html=fs.readFileSync(path.join(root,file),'utf8');
    assert.match(html, /<html lang="es-CO">/);
    assert.doesNotMatch(html, />MENU<|>PROJECT \/|SYSTEM STUDY|>INDEX ·|>CONTEXT</);
    assert.match(html, /href="\/en\//);
  }
  assert.equal(fs.existsSync(path.join(root,'license.html')), false, 'GitHub should detect only the canonical LICENSE.md');
  for(const page of ['index.html','privacy.html','license.html','projects.html','404.html']) {
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
  const catalogJSON=englishHome.match(/<script id="project-catalog" type="application\/json">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(catalogJSON, 'English project catalog is embedded');
  const catalog=JSON.parse(catalogJSON);
  assert.equal(catalog.length,15);
  for(const project of catalog) {
    for(const media of [...project.images,...project.videos]) assert.doesNotMatch(media.alt || media.title,/captura|demostración/i);
  }
  const englishProjectsPage=fs.readFileSync(path.join(root,'en/projects.html'),'utf8');
  const spanishProjects=require('../content/projects.json');
  for(const source of spanishProjects) {
    const project=englishProjects[source.id];
    assert.ok(englishProjectsPage.includes(project.description), `English project description: ${source.id}`);
    assert.ok(englishProjectsPage.includes(project.review), `English project review: ${source.id}`);
    for(const feature of project.features) assert.ok(englishProjectsPage.includes(feature), `English feature in ${source.id}: ${feature}`);
    for(const title of project.videoTitles || []) assert.ok(englishProjectsPage.includes(title), `English video label in ${source.id}: ${title}`);
  }
  assert.match(englishProjectsPage,/Full project descriptions and available resources/);
  assert.doesNotMatch(englishProjectsPage,/Descripciones completas|Funcionalidades|Reseña|Galería|Ampliar /);
  assert.doesNotMatch(englishHome,/Puedes consultar|Close menú|Close ficha del proyecto|Año y estado del proyecto|Imagen ampliada del proyecto/);
  const accessibilityLabels=[...englishHome.matchAll(/\b(?:aria-label|title|alt)="([^"]+)"/g)].map(match=>match[1]).join(' ');
  assert.doesNotMatch(accessibilityLabels,/Español|menú|proyecto|Año|Enlaces|Imagen ampliada|desarrollador|Ampliar|Interfaz|contacto|captura/i);
  const license=fs.readFileSync(path.join(root,'LICENSE.md'),'utf8');
  assert.match(license,/ALL RIGHTS RESERVED/);
  assert.match(license,/TODOS LOS DERECHOS RESERVADOS/);
  const readme=fs.readFileSync(path.join(root,'README.md'),'utf8');
  assert.match(readme,/## Sitio en español/);
  assert.match(readme,/## English version/);
  assert.match(readme,/\[`LICENSE\.md`\]\(LICENSE\.md\)/);
  const english404=fs.readFileSync(path.join(root,'en/404.html'),'utf8');
  assert.match(english404,/This page cannot be found/);
  assert.match(fs.readFileSync(path.join(root,'404.html'),'utf8'),/location\.pathname\.startsWith\('\/en\/'\)/);
});
