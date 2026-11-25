const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('client-system architecture asset identifies its source and avoids pretending to be a screenshot', () => {
  const svg = fs.readFileSync(path.resolve(__dirname, '../assets/img/appsistemaclientes/arquitectura.svg'), 'utf8');
  assert.match(svg, /width="1440" height="1000" viewBox="0 0 1440 1000"/);
  assert.match(svg, /<title[^>]*>Esquema de arquitectura · AppSistemaClientes<\/title>/);
  assert.match(svg, /Diagrama basado en el código del proyecto; no es una captura de la aplicación/);
  for (const label of ['JavaFX / FXML', 'Servicio Spring', 'Spring Data JPA', 'MySQL', 'findAll()', 'findById(id)', 'save(cliente)', 'delete(cliente)']) {
    assert.ok(svg.includes(label), `Architecture includes ${label}`);
  }
  assert.doesNotMatch(svg, /<script\b|<foreignObject\b|(?:href|src)\s*=|\bon\w+\s*=/i);
  const project = require('../content/projects.json').find(item => item.id === 'appsistemaclientes');
  assert.equal(project.images[0].src, '/assets/img/appsistemaclientes/arquitectura.svg');
  assert.match(project.images[0].alt, /diagrama.*no es una captura/);
});
