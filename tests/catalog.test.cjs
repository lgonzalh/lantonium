const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const projects = JSON.parse(fs.readFileSync(path.join(root, 'content/projects.json'), 'utf8'));
test('catalog preserves the approved order and real resources for all 15 projects', () => {
  assert.deepEqual(projects.map(p => p.id), ['condor','veripago','sevetco','pixelados','ofusercontrolapp','docusheetbot','localtranscriptor','paytollapp','pdfmas','vtf','imbalances','pdf-a-png-movil','ytclipper','yt2mp3','appsistemaclientes']);
  for (const project of projects) {
    for (const field of ['name','summary','description','review','stack','status']) assert.ok(project[field], `${project.id}: ${field}`);
    for (const media of [...project.images, ...project.videos]) assert.ok(fs.existsSync(path.join(root, media.src)), media.src);
    assert.ok(project.features.length > 0);
  }
  assert.equal(projects[1].status, 'En desarrollo');
  assert.equal(projects.filter(p => p.id === 'ytclipper').length, 1);
});
