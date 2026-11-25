const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const pages = JSON.parse(fs.readFileSync(path.join(root, 'content/pages.json'), 'utf8'));
const escape = text => String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
function renderPage(slug, title, description, content) {
  let head = home.match(/<head>([\s\S]*?)<\/head>/)[1];
  head = head.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'WebPage',name:title,url:`https://lantonium.com/${slug}`,description,inLanguage:'es-CO',author:{'@type':'Person',name:'Luis Gonzalez'}})}</script>`);
  head = head.replace(/<title>.*?<\/title>/, `<title>${escape(title)} — Luis Gonzalez</title>`);
  head = head.replace(/(<meta (?:name="description"|property="og:description"|name="twitter:description") content=")[^"]*/g, `$1${escape(description)}`);
  head = head.replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*/g, `$1${escape(title)} — Luis Gonzalez`);
  head = head.replace('property="og:type" content="profile"','property="og:type" content="website"');
  head = head.replaceAll('href="https://lantonium.com/"',`href="https://lantonium.com/${slug}"`).replace('property="og:url" content="https://lantonium.com/"',`property="og:url" content="https://lantonium.com/${slug}"`);
  const nav = home.match(/<header[\s\S]*?<\/nav>/)[0].replaceAll('href="#', 'href="/#');
  const footer = home.match(/<footer[\s\S]*?<\/footer>/)[0].replaceAll('href="#', 'href="/#');
  return `<!doctype html>\n<html lang="es-CO"><head>${head}</head><body class="ai-portfolio legal-page"><a class="skip-link" href="#main-content">Saltar al contenido</a>${nav}<main id="main-content" class="legal-content section-shell">${content}</main>${footer}<script src="/assets/js/portfolio-ai.js?v=12" defer></script></body></html>\n`;
}
for (const [slug, page] of Object.entries(pages)) {
  const content = `<a class="legal-back" href="/">← Volver al portafolio</a><p class="eyebrow">LANTONIUM · SITIO PERSONAL</p><h1>${escape(page.title)}</h1><p class="legal-date">Última actualización: 25 de noviembre de 2026</p><p class="legal-intro">${escape(page.intro)}</p>${page.sections.map(section => `<section><h2>${escape(section.title)}</h2>${section.html}</section>`).join('\n')}`;
  fs.writeFileSync(path.join(root, slug + '.html'), renderPage(slug, page.title, page.description, content));
}
module.exports = { renderPage };
