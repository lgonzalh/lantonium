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
  const spanishTarget = slug === 'proyectos' ? '/en/projects' : slug === '404' ? '/en/' : `/en/${slug}`;
  const nav = home.match(/<header[\s\S]*?<\/nav>/)[0].replaceAll('href="#', 'href="/#').replace('href="/en/"', `href="${spanishTarget}"`);
  const footer = home.match(/<footer[\s\S]*?<\/footer>/)[0].replaceAll('href="#', 'href="/#');
  return `<!doctype html>\n<html lang="es-CO"><head>${head}</head><body class="ai-portfolio legal-page"><a class="skip-link" href="#main-content">Saltar al contenido</a>${nav}<main id="main-content" class="legal-content section-shell">${content}</main>${footer}<script src="/assets/js/portfolio-ai.js?v=12" defer></script></body></html>\n`;
}
for (const [slug, page] of Object.entries(pages)) {
  const content = `<a class="legal-back" href="/">← Volver al portafolio</a><p class="eyebrow">LANTONIUM · SITIO PERSONAL</p><h1>${escape(page.title)}</h1><p class="legal-date">Última actualización: 25 de noviembre de 2026</p><p class="legal-intro">${escape(page.intro)}</p>${page.sections.map(section => `<section><h2>${escape(section.title)}</h2>${section.html}</section>`).join('\n')}`;
  const output = slug === 'license' ? path.join(root, 'license', 'index.html') : path.join(root, slug + '.html');
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, renderPage(slug, page.title, page.description, content));
  if (slug === 'license') fs.rmSync(path.join(root, 'license.html'), { force: true });
}
const projects = JSON.parse(fs.readFileSync(path.join(root, 'content/projects.json'), 'utf8'));
const projectContent = `<a class="legal-back" href="/">← Volver al portafolio</a><p class="eyebrow">15 PROYECTOS · DESARROLLO DE SOFTWARE</p><h1>Proyectos</h1><p class="legal-intro">Descripciones completas y recursos disponibles. También puedes explorar las fichas interactivas en el portafolio.</p>${projects.map(project => `<section id="${project.id}"><h2>${escape(project.name)}</h2><p>${escape(project.type)} · ${escape(project.year)} · ${escape(project.status)}</p><p>${escape(project.description)}</p><h3>Reseña</h3><p>${escape(project.review)}</p><h3>Funcionalidades</h3><ul>${project.features.map(text=>`<li>${escape(text)}</li>`).join('')}</ul><h3>Tecnologías</h3><p>${escape(project.stack)}</p>${project.images.length ? '<h3>Galería</h3><div class="project-gallery">'+project.images.map(image=>`<a href="${image.src}" aria-label="Ampliar ${escape(image.alt)}"><img src="${image.src}" alt="${escape(image.alt)}" loading="lazy" width="240" height="200" style="object-fit:contain"></a>`).join('')+'</div>' : ''}${project.videos.map(video=>`<p><a href="${video.src}">${escape(video.title)}</a></p>`).join('')}<p><a href="/?proyecto=${project.id}">Abrir ficha de ${escape(project.name)}</a>${project.github ? ` · <a href="${project.github}" target="_blank" rel="noopener noreferrer">Repositorio</a>` : ''}${project.downloadUrl ? ` · <a href="${project.downloadUrl}" target="_blank" rel="noopener noreferrer">Descargar aplicación</a>` : ''}${project.liveUrl ? ` · <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">Abrir aplicación</a>` : ''}</p></section>`).join('\n')}`;
fs.writeFileSync(path.join(root, 'proyectos.html'), renderPage('proyectos', 'Proyectos', 'Los quince proyectos web, móviles y de escritorio de Luis Gonzalez: reseñas, funcionalidades, tecnologías y galerías.', projectContent));
const notFound = renderPage('404', 'Página no encontrada', 'La dirección solicitada no existe. Vuelve al portafolio personal de Luis Gonzalez.', '<p class="eyebrow">ERROR 404</p><h1>Esta página no está aquí.</h1><p class="legal-intro">Puedes volver al inicio y explorar mis proyectos.</p><a href="/">← Volver al portafolio</a>');
fs.writeFileSync(path.join(root, '404.html'), notFound.replace('content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1"', 'content="noindex,follow"'));
let copy = '# Textos del portafolio personal\n\nContacto: lantonium@gmail.com\n\n';
for(const p of projects) copy += `## ${p.name}\n\n**Descripción breve:** ${p.summary}\n\n**Descripción:** ${p.description}\n\n**Reseña:** ${p.review}\n\n**Funcionalidades:**\n\n${p.features.map(f=>'- '+f).join('\n')}\n\n**Tecnologías:** ${p.stack}\n\n`;
fs.writeFileSync(path.join(root, 'docs/contenidos-proyectos.md'), copy);
module.exports = { renderPage };
