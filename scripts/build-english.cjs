const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const projectsEs = JSON.parse(fs.readFileSync(path.join(root, 'content/projects.json'), 'utf8'));
const translations = JSON.parse(fs.readFileSync(path.join(root, 'content/projects.en.json'), 'utf8'));
const replaceText = (html, pairs) => pairs.reduce((out, [es, en]) => out.replaceAll(es, en), html);
const escapeHtml = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const pairs = [
 ['Luis Gonzalez — Desarrollador de Software','Luis Gonzalez — Software Developer'],['Saltar al contenido','Skip to content'],['Luis Gonzalez, inicio del portafolio','Luis Gonzalez, portfolio home'],['DESARROLLADOR DE SOFTWARE · BOGOTÁ','SOFTWARE DEVELOPER · BOGOTÁ'],['PORTAFOLIO PERSONAL','PERSONAL PORTFOLIO'],['Cambiar entre modo claro y oscuro','Switch between light and dark mode'],['Cambiar tema','Switch theme'],['Idioma: español de Colombia','Language: English'],['Español (Colombia)','English'],['MENÚ','MENU'],['ÍNDICE · 01—04','INDEX · 01—04'],['CERRAR','CLOSE'],['Proyectos','Projects'],['Acerca de','About'],['Enfoque','Approach'],['Contacto','Contact'],['Desarrollo de software, datos, automatización e inteligencia artificial aplicada.','Software development, data, automation, and applied artificial intelligence.'],['DESARROLLO DE SOFTWARE','SOFTWARE DEVELOPMENT'],['BOGOTÁ, COLOMBIA','BOGOTÁ, COLOMBIA'],['Software útil','Useful software'],['de principio a fin.','from start to finish.'],['Desarrollo aplicaciones web, móviles y de escritorio que conectan personas, datos y procesos. Integro automatización e inteligencia artificial donde aportan valor.','I build web, mobile, and desktop applications that connect people, data, and processes. I bring in automation and artificial intelligence where they add value.'],['Explorar proyectos','Explore projects'],['WEB · MÓVIL · ESCRITORIO','WEB · MOBILE · DESKTOP'],['DATOS E INTEGRACIÓN','DATA & INTEGRATION'],['AUTOMATIZACIÓN E IA','AUTOMATION & AI'],['PROYECTO · 001','PROJECT · 001'],['FLUJO CON MODELOS LOCALES','LOCAL MODEL WORKFLOW'],['EXPLORA LOS PROYECTOS','EXPLORE PROJECTS'],['15 PROYECTOS','15 PROJECTS'],['Áreas de trabajo','Areas of work'],['01 / ÍNDICE DE PROYECTOS · 15 PROYECTOS','01 / PROJECT INDEX · 15 PROJECTS'],['Ideas que se convierten en software.','Ideas turned into software.'],['Quince proyectos web, móviles y de escritorio: gestión, automatización, datos y herramientas para el día a día.','Fifteen web, mobile, and desktop projects across management, automation, data, and everyday tools.'],['Vista previa del proyecto seleccionado','Selected project preview'],['IA LOCAL','LOCAL AI'],['Sistemas construidos alrededor del contexto y los datos.','Systems built around context and data.'],['Proyectos de desarrollo de software','Software development projects'],['Filtrar proyectos por plataforma','Filter projects by platform'],['Todos','All'],['Escritorio','Desktop'],['Buscar entre los proyectos','Search projects'],['Buscar proyecto','Search projects'],['15 proyectos','15 projects'],['No hay proyectos con esos criterios. Prueba otra búsqueda o categoría.','No projects match those filters. Try another search or category.'],['VER FICHA +','VIEW DETAILS +'],['Acerca de mí','About me'],['Mi enfoque','My approach'],['Hablemos','Let’s talk'],['Desarrollador de software','Software developer'],['Bogotá, Colombia','Bogotá, Colombia'],['Enviar correo','Email me'],['Volver al portafolio','Back to portfolio'],['LANTONIUM · SITIO PERSONAL','LANTONIUM · PERSONAL WEBSITE'],['Última actualización: 25 de noviembre de 2026','Last updated: November 25, 2026'],['Funcionalidades','Features'],['Tecnologías','Technologies'],['Reseña','Overview'],['Galería','Gallery'],['Abrir ficha de','Open project details for'],['Repositorio','Repository'],['Descargar aplicación','Download app'],['Abrir aplicación','Open app']
];
function englishFlag(target = '/') { return `<a class="language-indicator" href="${target}" hreflang="es-CO" lang="es-CO" aria-label="Switch to Spanish" title="Spanish"><svg width="24" height="16" viewBox="0 0 60 30" aria-hidden="true"><clipPath id="uk"><path d="M0 0h60v30H0z"/></clipPath><g clip-path="url(#uk)"><path fill="#012169" d="M0 0h60v30H0z"/><path stroke="#fff" stroke-width="6" d="m0 0 60 30M60 0 0 30"/><path stroke="#c8102e" stroke-width="2" d="m0 0 60 30M60 0 0 30"/><path stroke="#fff" stroke-width="10" d="M30 0v30M0 15h60"/><path stroke="#c8102e" stroke-width="6" d="M30 0v30M0 15h60"/></g></svg></a>`; }
function page(html, route, title) {
 let out = replaceText(html, pairs);
 out = replaceText(out, [
  ['Privacidad','Privacy'],['Licencia','License'],['Correo ↗','Email ↗'],
  ['Tecnología útil, desde el software hasta la IA.','Useful technology, from software to AI.'],
  ['Desarrollo web · móvil · escritorio','Web · mobile · desktop development'],
  ['Soy Luis Gonzalez, desarrollador de software, tecnólogo en Análisis y Desarrollo de Software del SENA y estudiante de Ingeniería de Software en el Politécnico Grancolombiano.','I am Luis Gonzalez, a software developer, SENA graduate technologist in Software Analysis and Development, and Software Engineering student at Politécnico Grancolombiano.'],
  ['Desarrollo aplicaciones web, móviles y de escritorio que conectan interfaces, servicios y bases de datos. Mi experiencia en operaciones, análisis de información y proyectos tecnológicos me permite comprender las necesidades detrás de cada solución y transformar procesos manuales en herramientas útiles.','I build web, mobile, and desktop applications that connect interfaces, services, and databases. My experience in operations, information analysis, and technology projects helps me understand the needs behind each solution and turn manual processes into useful tools.'],
  ['Trabajo con .NET/C#, SQL, automatización e inteligencia artificial aplicada, con atención a la arquitectura, la calidad y la privacidad de los datos.','I work with .NET/C#, SQL, automation, and applied artificial intelligence, with attention to architecture, quality, and data privacy.'],
  ['Desarrollo de aplicaciones','Application development'],['Interfaces, servicios y bases de datos para soluciones web, móviles y de escritorio.','Interfaces, services, and databases for web, mobile, and desktop solutions.'],
  ['Datos e integración','Data and integration'],['SQL, procesos ETL y análisis de información para conectar sistemas y apoyar decisiones.','SQL, ETL processes, and information analysis to connect systems and support decisions.'],
  ['Automatización e IA aplicada','Automation and applied AI'],['Herramientas para reducir tareas manuales y aprovechar modelos de IA con propósito.','Tools that reduce manual tasks and put AI models to purposeful use.'],
  ['Volver al inicio','Back to home'],['El portafolio personal de Luis Gonzalez.','The personal portfolio of Luis Gonzalez.'],
  ['Español','Spanish'],['menú','menu'],['Ampliar','Enlarge'],['Proyectos de desarrollo de software','Software development projects'],['Projects de desarrollo de software','Software development projects'],['Close menú','Close menu'],['Close ficha del proyecto','Close project details'],['ficha del proyecto','project details'],['Año y estado del proyecto','Project year and status'],['Enlaces del proyecto','Project links'],['Imagen ampliada del proyecto','Enlarged project image'],['Luis Gonzalez, desarrollador de software en Bogotá','Luis Gonzalez, software developer in Bogotá'],['Otros enlaces de contacto','Other contact links'],['Interfaz de Cóndor','Condor interface'],['Interfaz de Condor','Condor interface'],
  ['Descripciones completas y recursos disponibles. También puedes explorar las fichas interactivas en el portafolio.','Full project descriptions and available resources. You can also explore the interactive project details on the portfolio.'],
  ['ÍNDICE DE PROYECTOS','PROJECT INDEX'],['PROYECTO /','PROJECT /'],['CONTEXTO','CONTEXT'],['15 PROYECTOS','15 PROJECTS'],
  ['02 / ACERCA DE · LUIS GONZALEZ','02 / ABOUT · LUIS GONZALEZ'],['DESARROLLO INTEGRAL · SOFTWARE','END-TO-END SOFTWARE DEVELOPMENT'],
  ['03 / FORMA DE TRABAJO','03 / APPROACH'],['CONTEXTO · CALIDAD · PRIVACIDAD','CONTEXT · QUALITY · PRIVACY'],['DE LA NECESIDAD A LA SOLUCIÓN','FROM NEED TO SOLUTION'],
  ['Comprender, construir y mejorar.','Understand, build, and improve.'],['Comienzo por entender el proceso y sus datos. Después diseño la solución, verifico su comportamiento y documento las decisiones para facilitar su evolución.','I start by understanding the process and its data. Then I design a solution, verify its behavior, and document decisions so it can evolve.'],
  ['Contexto persistente','Persistent context'],['Documentación y trazabilidad para conservar decisiones y estructura en herramientas asistidas por LLM.','Documentation and traceability preserve decisions and structure in LLM-assisted tools.'],
  ['Datos estructurados','Structured data'],['Captura documentos, extrae campos y organiza la información para que pueda analizarse y sincronizarse.','Captures documents, extracts fields, and organizes information for analysis and synchronization.'],
  ['Procesamiento privado','Private processing'],['Experiencias de transcripción que mantienen el procesamiento de audio en el dispositivo Android.','Transcription experiences that keep audio processing on the Android device.'],
  ['04 / CONTACTO','04 / CONTACT'],['¿UN PROCESO QUE PODEMOS MEJORAR?','A PROCESS WE CAN IMPROVE?'],['Construyamos algo útil.','Let’s build something useful.'],
  ['CORREO ·','EMAIL ·'],['PERFIL GLOBAL','PROFILE'],['DESARROLLADOR DE SOFTWARE','SOFTWARE DEVELOPER'],['Privacidad','Privacy'],['Licencia','License'],
  ['AÑO DE DESARROLLO','YEAR'],['ESTADO','STATUS'],['TECNOLOGÍAS','TECHNOLOGIES'],['Cerrar','Close'],
  ['Activa JavaScript para abrir las fichas interactivas. Puedes consultar las descripciones completas de los proyectos','Enable JavaScript to open interactive project details. You can read the full project descriptions'],
  [' · Bogotá · Colombia',' · Bogotá · Colombia'],['CALIDAD','QUALITY'],['PRIVACIDAD','PRIVACY'],['IA DOCUMENTAL','DOCUMENT AI'],['VOZ','VOICE'],['CÓNDOR','CONDOR'],['PDF A PNG MÓVIL','PDF TO PNG MOBILE'],['Activa JavaScript para abrir las fichas interactivas.','Enable JavaScript to open interactive project details.'],['descripciones completas de los proyectos','full project descriptions'],['Puedes consultar','You can browse'],['las full project descriptions','the full project descriptions'],['Áreas de trabajo','Areas of work'],['Navegación del portafolio','Portfolio navigation'],['Vista de Condor, un sistema local-first asistido por modelos de lenguaje','View of Condor, a local-first system assisted by language models'],['Pantalla de Condor con un flujo de ingeniería asistida por IA','Condor screen showing an AI-assisted engineering workflow'],
  ['Hola%20Luis%2C%20quiero%20hablar%20sobre%20un%20proyecto.','Hi%20Luis%2C%20I%27d%20like%20to%20discuss%20a%20project.'],['IA / 01','AI / 01'],['Puedes consultar las','You can read the'],['Let’s talk..','Let’s talk']
 ]);
 out = out.replace(/<html lang="es-CO">/, '<html lang="en">');
 out = out.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="https://lantonium.com${route}">`);
 const localizedTitle = title.startsWith('Luis Gonzalez') ? title : `${title} — Luis Gonzalez`;
 out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${localizedTitle}</title>`);
 out = out.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${localizedTitle}">`);
 out = out.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${localizedTitle}">`);
 out = out.replace(/property="og:url" content="[^"]*"/, `property="og:url" content="https://lantonium.com${route}"`);
 const englishDescription = 'Luis Gonzalez, software developer in Bogotá, Colombia. Web, mobile, desktop, automation, and applied AI projects.';
 out = out.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${englishDescription}">`);
 out = out.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${englishDescription}">`);
 out = out.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${englishDescription}">`);
 out = out.replace(/<meta property="og:locale" content="[^"]*">/, '<meta property="og:locale" content="en_US">');
 out = out.replaceAll('href="/?proyecto=', 'href="/en/?proyecto=').replaceAll('href="/privacy"','href="/en/privacy"').replaceAll('href="/license"','href="/en/license"').replaceAll('href="/proyectos"','href="/en/projects"');
 const spanishTargets = {'/en/':'/','/en/privacy':'/privacy','/en/license':'/license','/en/projects':'/proyectos'};
 out = out.replace(/<(?:span|a) class="language-indicator"[\s\S]*?<\/(?:span|a)>/, englishFlag(spanishTargets[route] || '/'));
 out = out.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'Person',name:'Luis Gonzalez',jobTitle:'Software Developer',url:'https://lantonium.com/en/',email:'lantonium@gmail.com',address:{'@type':'PostalAddress',addressLocality:'Bogotá',addressCountry:'CO'},sameAs:['https://www.linkedin.com/in/lantonium/','https://github.com/lgonzalh']})}</script>`);
 return out;
}
function mediaLabel(text, projectName) {
 return String(text).replace(/^Demostración de\s*/i, '').replace(/captura\s+(\d+)/gi, 'screenshot $1').replace(/página promocional web/gi, 'promotional website page').replace(/sección promocional web/gi, 'promotional website section').replace(/sobre las formas de cobro/gi, 'about payment methods').replace(/no es el panel de la aplicación/gi, 'not an application dashboard').replace(/no es una pantalla del panel/gi, 'not a dashboard screen').replace(/Android/gi, 'Android').replace(/cobro rápido con selección de billetera/gi, 'quick charge with wallet selection').replace(/formulario de productos e impuestos/gi, 'product and tax form').replace(/tabla con tres registros de demostración/gi, 'table with three demo records').replace(/formulario de cliente seleccionado y tabla de registros/gi, 'selected customer form and records table').replace(/diagrama de arquitectura basado en el código; no es una captura de la aplicación/gi, 'architecture diagram based on source code; not an application screenshot').replace(/diagrama del flujo CRUD, basado en el código y no una captura/gi, 'CRUD flow diagram based on source code, not a screenshot').replace(/esquema de persistencia de Cliente en MySQL, basado en el código y no una captura/gi, 'MySQL customer persistence schema based on source code, not a screenshot').replace(/Demostración/gi, 'Demo').replace(/versión web/gi, 'web version').replace(/versión Android/gi, 'Android version').replace(/pantalla inicial y selección de lista/gi, 'home screen and playlist selection').replace(/Móvil/gi, 'Mobile').replace(/Aplicación/gi, 'App').replace(/captura/gi, 'screenshot').replace(/\s+/g, ' ').trim();
}
let enHome = page(home, '/en/', 'Luis Gonzalez — Software Developer');
for (const project of projectsEs) {
 const id = project.id;
 const t = translations[id]; if (!t) continue;
 const row = new RegExp(`<a class="project-row[^>]*data-project-key="${id}"[\\s\\S]*?<\\/a>`);
 enHome = enHome.replace(row, match => replaceText(match, pairs)
  .replaceAll(project.name, t.name).replace(project.type, t.type).replace(project.summary, t.summary)
  .replace(/(<span class="row-status">)[^<]*/, `$1${t.status.toUpperCase()}`)
  .replace(/(<span class="row-meta"><span>)[^<]*/, `$1${t.type}`));
}
// Localize project content data embedded in the page; media paths and galleries remain shared.
const marker = /<script id="project-catalog" type="application\/json">[\s\S]*?<\/script>/;
const catalog = projectsEs.map(p => ({...p, ...(translations[p.id] || {}), repoNote:translations[p.id]?.repoNote || (p.repoNote ? 'Private repository; source code is not publicly available.' : ''), images:p.images.map((image, i) => ({...image, alt:translations[p.id]?.imageAlts?.[i] || mediaLabel(image.alt,p.name)})), videos:p.videos.map((video,i)=>({...video,title:translations[p.id]?.videoTitles?.[i] || `${mediaLabel(video.title,p.name)} demo`}))}));
enHome = enHome.replace(marker, `<script id="project-catalog" type="application/json">${JSON.stringify(catalog)}</script>`);
fs.mkdirSync(path.join(root,'en'), {recursive:true});
fs.writeFileSync(path.join(root,'en/index.html'), enHome);
const legal = {
 privacy: { title:'Privacy Policy', description:'Privacy information for this personal website and its software projects.', intro:'This policy explains how personal information may be handled when you visit this website, contact me, or use one of my applications.', sections:[
  ['Data controller','The data controller is Luis Gonzalez, an independent software developer in Colombia. Contact: <a href="mailto:lantonium@gmail.com">lantonium@gmail.com</a>. This policy applies to this personal portfolio and the projects described here. Individual projects may provide additional notices.'],
  ['Information collected','This site does not require an account. If you contact me, I receive the information you choose to send, such as your name, email address, and message. Hosting providers may process standard technical logs needed to deliver and secure the site.'],
  ['Applications and storage','Each application handles only the information needed for its stated functions. Depending on the project, information may be stored locally on your device or in configured cloud services. Reasonable technical and organizational safeguards are used to protect stored data against unauthorized access, alteration, loss, or disclosure. No internet service can guarantee absolute security.'],
  ['Google sign-in and Firebase','Where an application offers “Continue with Google”, Google Authentication processes sign-in according to Google’s own privacy terms. The application receives authentication information such as a user identifier and, where permitted, basic profile details. If Firebase services are used, data may be processed by Firebase Authentication, Cloud Firestore, Cloud Functions, or related configured services under Google’s terms and security practices. Only data necessary for the application’s functions should be stored.'],
  ['Colombian privacy framework','Personal data is handled with respect for applicable Colombian rules, including Law 1581 of 2012 and its implementing regulations, such as Decree 1074 of 2015. Subject to legal requirements, you may request access, correction, updating, or deletion of your personal data, or submit a question or complaint, by writing to the contact email above.'],
  ['Sharing, retention and changes','Personal information is not sold. It may be processed by hosting, authentication, database, or infrastructure providers needed to operate a service, and may be disclosed when legally required. Data is retained only as long as reasonably needed for the stated purpose or legal obligations. This policy may be updated when the site or projects change.']
 ]},
 license:{title:'License and Copyright',description:'Copyright and license terms for projects published by Luis Gonzalez.',intro:'Unless an individual project states otherwise, original software, code, designs, documentation, and other materials presented on this website are reserved to their author.',sections:[
 ['All Rights Reserved','© 2026 Luis Gonzalez. All rights reserved. No license is granted to copy, reproduce, modify, distribute, publish, sublicense, sell, or create derivative works from the projects or materials on this website without prior written permission, except for uses permitted by applicable law.'],
 ['Project repositories','A public repository does not by itself grant permission to reuse its contents. If a repository contains its own LICENSE file or an explicit license notice, that license governs the material it covers and takes precedence over this general notice. Private repositories are not available for public use.'],
 ['Third-party materials','Projects may use third-party libraries, frameworks, images, fonts, or other resources. Those materials remain subject to their respective owners and license terms. This notice does not claim ownership of third-party works.'],
 ['Permission requests','For permission, collaboration, or licensing questions, contact <a href="mailto:lantonium@gmail.com">lantonium@gmail.com</a> and identify the project and intended use.'],
 ['No warranty','Projects are provided for portfolio and informational purposes. Unless an applicable written agreement says otherwise, they are provided “as is”, without warranties to the extent allowed by law.']
 ]}
};
function legalHtml(slug, data) {
 let out = page(home, `/en/${slug}`, `${data.title} | Lantonium`);
 const head = out.match(/<head>[\s\S]*?<\/head>/)[0].replace('<html lang="en">','');
 const nav = out.match(/<header[\s\S]*?<\/nav>/)[0].replaceAll('href="#','href="/en/#');
 const footer = out.match(/<footer[\s\S]*?<\/footer>/)[0].replaceAll('href="#','href="/en/#').replaceAll('href="/privacy"','href="/en/privacy"').replaceAll('href="/license"','href="/en/license"');
 const content = `<a class="legal-back" href="/en/">← Back to portfolio</a><p class="eyebrow">LANTONIUM · PERSONAL WEBSITE</p><h1>${data.title}</h1><p class="legal-date">Last updated: November 25, 2026</p><p class="legal-intro">${data.intro}</p>${data.sections.map(([title,body])=>`<section><h2>${title}</h2><p>${body}</p></section>`).join('')}`;
 return `<!doctype html><html lang="en">${head}<body class="ai-portfolio legal-page"><a class="skip-link" href="#main-content">Skip to content</a>${nav}<main id="main-content" class="legal-content section-shell">${content}</main>${footer}<script src="/assets/js/portfolio-ai.js?v=12" defer></script></body></html>`;
}
for(const [slug,data] of Object.entries(legal)) fs.writeFileSync(path.join(root,'en',`${slug}.html`),legalHtml(slug,data));
let projectPage = fs.readFileSync(path.join(root,'proyectos.html'),'utf8');
for (const es of projectsEs) {
 const t = translations[es.id];
 if (!t) continue;
 const section = new RegExp(`<section id="${es.id}">[\\s\\S]*?<\\/section>`);
 projectPage = projectPage.replace(section, block => {
  const replacements = [];
  for (const key of ['summary','description','review','stack','name','type','status']) if (es[key] && t[key]) replacements.push([es[key],t[key]]);
  if (es.repoNote) replacements.push([es.repoNote,t.repoNote || 'Private repository; source code is not publicly available.']);
  es.features.forEach((feature, i) => { if (t.features?.[i]) replacements.push([feature,t.features[i]]); });
  es.images.forEach((image, i) => replacements.push([image.alt,t.imageAlts?.[i] || mediaLabel(image.alt,es.name)]));
  es.videos.forEach((video, i) => replacements.push([video.title,t.videoTitles?.[i] || `${mediaLabel(video.title,es.name)} demo`]));
  replacements.sort((a,b)=>b[0].length-a[0].length);
  for (const [from,to] of replacements) block=block.replaceAll(escapeHtml(from),escapeHtml(to));
  return block;
 });
}
projectPage = page(projectPage,'/en/projects','Projects | Lantonium');
fs.writeFileSync(path.join(root,'en/projects.html'),projectPage);
const notFoundSpanish = fs.readFileSync(path.join(root,'404.html'),'utf8');
const notFoundPairs = [['Página no encontrada','Page not found'],['Esta página no está aquí.','This page cannot be found.'],['Puedes volver al inicio y explorar mis proyectos.','Return to the home page to explore my projects.']];
fs.writeFileSync(path.join(root,'en/404.html'),replaceText(page(notFoundSpanish,'/en/404','Page not found | Lantonium'),notFoundPairs));
const runtimePairs = [...pairs,...notFoundPairs,['menú','menu'],['Privacidad','Privacy'],['Licencia','License'],['Correo ↗','Email ↗'],['Otros enlaces de contacto','Other contact links']];
const safePairs = JSON.stringify(runtimePairs).replaceAll('<','\\u003c');
const safeEnglishFlag = JSON.stringify(englishFlag('/')).replaceAll('<','\\u003c');
const notFoundLocalization = `<script>(function(){if(!location.pathname.startsWith('/en/'))return;document.documentElement.lang='en';document.title='Page not found — Luis Gonzalez';const pairs=${safePairs};const translate=value=>pairs.reduce((text,[from,to])=>text.replaceAll(from,to),value);const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);while(walker.nextNode())walker.currentNode.nodeValue=translate(walker.currentNode.nodeValue);document.querySelectorAll('[aria-label],[title],[alt]').forEach(node=>{for(const attr of ['aria-label','title','alt'])if(node.hasAttribute(attr))node.setAttribute(attr,translate(node.getAttribute(attr)))});document.querySelectorAll('a[href^="/#"]').forEach(a=>a.setAttribute('href',a.getAttribute('href').replace('/#','/en/#')));document.querySelectorAll('a[href="/privacy"]').forEach(a=>a.setAttribute('href','/en/privacy'));document.querySelectorAll('a[href="/license"]').forEach(a=>a.setAttribute('href','/en/license'));document.querySelectorAll('a[href="/"]').forEach(a=>a.setAttribute('href','/en/'));const language=document.querySelector('.language-indicator');if(language)language.outerHTML=${safeEnglishFlag};const description=document.querySelector('meta[name="description"]');if(description)description.content='The requested page could not be found. Return to Luis Gonzalez’s personal software development portfolio.';document.querySelector('link[rel="canonical"]')?.remove()})();</script>`;
fs.writeFileSync(path.join(root,'404.html'),notFoundSpanish.replace('</body>',`${notFoundLocalization}</body>`));
