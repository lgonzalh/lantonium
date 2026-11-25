// Regenerate static, searchable project cards and the runtime catalog from one source.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const projects = JSON.parse(fs.readFileSync(path.join(root, 'content/projects.json'), 'utf8'));
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const rows = projects.map((p, i) => {
  const index = String(i + 1).padStart(2, '0');
  return `<a class="project-row${i ? '' : ' is-active'} reveal-item" href="/?proyecto=${p.id}" data-project-row data-project-key="${p.id}" data-project-categories="${p.categories.join(' ')}" data-preview-src="${escape(p.image || '')}" data-preview-alt="${escape(p.name)}" data-project-index="${index}" data-project-type="${escape(p.type)}" aria-haspopup="dialog" aria-controls="project-detail-dialog">
<span class="row-number">${index}</span><span class="row-meta"><span>${escape(p.type)}</span><span class="row-status">${escape(p.status.toLocaleUpperCase('es-CO'))}</span><span aria-hidden="true">＋</span></span><h3>${escape(p.name)}</h3><p>${escape(p.summary)}</p><span class="row-action" aria-hidden="true">VER FICHA +</span></a>`;
}).join('\n');
html = html.replace(/<!-- projects:start -->[\s\S]*?<!-- projects:end -->/, `<!-- projects:start -->\n${rows}\n<!-- projects:end -->`);
html = html.replace(/<!-- ticker:start -->[\s\S]*?<!-- ticker:end -->/, `<!-- ticker:start -->${projects.map(p => `<span>${escape(p.name.toLocaleUpperCase('es-CO'))}</span><b>✳</b>`).join('')}<!-- ticker:end -->`);
for (const filter of ['all','web','escritorio','android']) {
  const count = projects.filter(p => filter === 'all' || p.categories.includes(filter)).length;
  html = html.replace(new RegExp(`(data-project-filter="${filter}"[^>]*>[^<]*<span>)\\d+`), `$1${count}`);
}
html = html.replace(/(<script id="project-catalog" type="application\/json">)[\s\S]*?(<\/script>)/, (_, start, end) => start + JSON.stringify(projects).replace(/</g, '\\u003c') + end);
fs.writeFileSync(path.join(root, 'index.html'), html);
