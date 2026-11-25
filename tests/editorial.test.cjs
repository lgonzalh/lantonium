const test = require('node:test');
const assert = require('node:assert/strict');
const projects = require('../content/projects.json');

test('project copy explains capabilities and limits without unsupported outcome guarantees', () => {
  const ids = ['ofusercontrolapp', 'paytollapp', 'imbalances', 'localtranscriptor', 'pdf-a-png-movil', 'ytclipper'];
  const selected = projects.filter(project => ids.includes(project.id));
  assert.equal(selected.length, ids.length);
  for (const project of selected) {
    const copy = [project.description, project.review, ...project.features].join(' ');
    assert.doesNotMatch(copy, /garantiza|asegurando el cumplimiento|alta disponibilidad|latencia mínima|sin interrupciones|sin necesidad de post-procesamiento|reduce significativamente/i, project.id);
    assert.ok(project.review.split(/\s+/).length <= 95, `${project.id}: keep the review readable`);
    assert.ok(project.features.length >= 3, `${project.id}: explain concrete capabilities`);
    assert.ok(project.images.length && project.videos.length, `${project.id}: retain its visual evidence`);
  }
  assert.match(selected.find(project => project.id === 'paytollapp').description, /Proyecto de grado.*SENA/);
  assert.match(selected.find(project => project.id === 'pdf-a-png-movil').review, /no implica reducir/);
  assert.match(selected.find(project => project.id === 'ytclipper').review, /contenido propio, autorizado/);
});
