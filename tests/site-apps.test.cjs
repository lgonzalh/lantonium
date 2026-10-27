const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const readPage = (name) => fs.readFileSync(path.join(root, name), 'utf8');
const htmlPages = fs.readdirSync(root).filter((name) => name.endsWith('.html'));
const expectedMenu = [
  ['/apps.html', 'Apps'],
  ['/about.html', 'Acerca de'],
  ['/privacy.html', 'Privacidad'],
];

function readMenu(html, file) {
  const nav = html.match(/<nav\b[^>]*class="[^"]*site-header[^"]*"[^>]*>([\s\S]*?)<\/nav>/);
  assert.ok(nav, `${file} has the shared site header`);
  const inner = nav[1];
  const links = [...inner.matchAll(/<a class="nav-link"\s+href="([^"]+)">([\s\S]*?)<\/a>/g)]
    .map((match) => [match[1], match[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ')]);
  return { inner, links };
}

test('every page keeps the exact shared navigation order and structure', () => {
  const pagesWithHeader = htmlPages.filter((file) => /<nav\b[^>]*site-header/.test(readPage(file)));
  assert.ok(pagesWithHeader.includes('index.html'));
  assert.ok(pagesWithHeader.includes('about.html'));
  assert.ok(pagesWithHeader.length >= 15);

  for (const file of pagesWithHeader) {
    const html = readPage(file);
    const { inner, links } = readMenu(html, file);
    assert.match(inner, /data-bs-target="#navbarNavDropdown"/);
    assert.match(inner, /aria-controls="navbarNavDropdown"/);
    assert.match(inner, /id="navbarNavDropdown"/);
    assert.match(inner, /class="navbar-nav"/);
    assert.deepEqual(links, expectedMenu, `${file} keeps names, destinations, and order`);
    assert.match(html, /assets\/js\/content\.js" defer/, `${file} loads the shared theme toggle`);
  }
});

test('the fixed footer copy remains consistent across the site', () => {
  const expectedFooter = '© 2021- lantonium. Todos los derechos reservados.';
  const pagesWithHeader = htmlPages.filter((file) => /<nav\b[^>]*site-header/.test(readPage(file)));
  for (const file of pagesWithHeader) {
    const footer = readPage(file).match(/<footer\b[^>]*site-footer[^>]*>[\s\S]*?<\/footer>/)?.[0];
    const copy = footer?.match(/<div class="footer-copy">([\s\S]*?)<\/div>/)?.[1]
      ?.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    assert.equal(copy, expectedFooter, `${file} retains the persistent footer text`);
  }
});

test('the nonfunctional GoatCounter visitor widget and endpoint are removed', () => {
  for (const file of htmlPages) {
    const html = readPage(file);
    assert.doesNotMatch(html, /goatcounter|visit-count|visit-counter|Total de visitas|Visitante\s*<span/i, file);
  }
  const css = fs.readFileSync(path.join(root, 'assets/css/styles.css'), 'utf8');
  assert.doesNotMatch(css, /\.visit-counter/);
});

test('all local asset references resolve and every image declares alt text', () => {
  for (const file of htmlPages) {
    const html = readPage(file);
    for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^\"]+)"/g)) {
      const asset = decodeURIComponent(match[1].split('?')[0].slice(1));
      assert.ok(fs.existsSync(path.join(root, asset)), `${file}: ${match[1]}`);
    }
    for (const [, attributes] of html.matchAll(/<img\b([^>]*)>/g)) {
      assert.match(attributes, /\balt\s*=/, `${file} image declares alternative text`);
    }
  }
});

test('Firebase Hosting excludes local instructions and development-only files', () => {
  const config = JSON.parse(readPage('firebase.json'));
  const ignoredPaths = config.hosting.ignore;
  for (const path of ['AGENTS.md', 'README.md', 'docs/**', 'graft/**', 'scripts/**', 'tests/**']) {
    assert.ok(ignoredPaths.includes(path), `${path} is excluded from the public Hosting bundle`);
  }
});

test('the catalog contains all 12 products and only Condor is in development', () => {
  const html = readPage('apps.html');
  const cards = [...html.matchAll(/<article class="project-card card[^\"]*"[^>]*data-project-card[^>]*>([\s\S]*?)<\/article>/g)]
    .map(([, card]) => ({
      name: card.match(/class="project-card-title">([\s\S]*?)<\/span>/)?.[1]
        ?.replace(/<[^>]+>/g, '').replace(/↗/g, '').trim(),
      status: card.match(/class="project-status(?:\s+project-status--progress)?">([^<]+)<\/span>/)?.[1],
    }));

  assert.equal(cards.length, 12);
  for (const card of cards) {
    assert.ok(card.name && card.status, 'each app card has a name and status');
    assert.equal(card.status, card.name === 'Condor' ? 'En Desarrollo' : 'Desarrollado', card.name);
  }
});

test('the removed PDFr page is not linked, listed, or present in the sitemap', () => {
  assert.equal(fs.existsSync(path.join(root, 'pdfr.html')), false);
  assert.doesNotMatch(readPage('apps.html'), /href="\/pdfr\.html"|>PDFr</);
  assert.doesNotMatch(readPage('sitemap.xml'), /pdfr\.html/);
});

test('legacy profile URLs send visitors to the current pages with the shared menu', () => {
  const aboutAlias = readPage('acerca.html');
  const portfolioAlias = readPage('PortfolioLuisGonzalez.html');
  assert.match(aboutAlias, /url=about\.html/);
  assert.match(aboutAlias, /window\.location\.replace\("about\.html/);
  assert.match(portfolioAlias, /url=index\.html/);
  assert.match(portfolioAlias, /window\.location\.replace\("index\.html/);
  assert.deepEqual(readMenu(readPage('about.html'), 'about.html').links, expectedMenu);
  assert.deepEqual(readMenu(readPage('index.html'), 'index.html').links, expectedMenu);
});

test('all catalog previews and detail routes resolve to real local files', () => {
  const html = readPage('apps.html');
  const sitemap = readPage('sitemap.xml');
  const cards = [...html.matchAll(/<article class="project-card card[^\"]*"[^>]*data-project-card[^>]*>([\s\S]*?)<\/article>/g)];
  for (const [, card] of cards) {
    const image = card.match(/<img\s+src="([^"]+)"/)?.[1];
    const page = card.match(/<a class="project-card-link" href="([^"]+)"/)?.[1];
    assert.ok(image, 'each project has a real preview');
    assert.ok(page, 'each project links to a detail page');
    assert.ok(fs.existsSync(path.join(root, decodeURIComponent(image.replace(/^\//, '')))), image);
    assert.ok(fs.existsSync(path.join(root, page.replace(/^\//, ''))), page);
    assert.match(sitemap, new RegExp(`https://lantonium\\.com${page.replaceAll('/', '\\/')}`));
  }
});

test('the app list, canonical domain, and sitemap stay aligned', () => {
  const html = readPage('apps.html');
  const schema = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(schema, 'Apps includes structured data');
  const data = JSON.parse(schema);
  assert.equal(data.mainEntity.itemListElement.length, 12);
  assert.match(html, /<link rel="canonical" href="https:\/\/lantonium\.com\/apps\.html">/);
  assert.doesNotMatch(html, /https:\/\/lantonium\.web\.app/);
  assert.doesNotMatch(readPage('sitemap.xml'), /pdfr\.html|lantonium\.web\.app/);
});

test('project filters support search, platform categories, counts, and empty results', () => {
  const html = readPage('apps.html');
  const script = readPage('assets/js/projects.js');
  for (const category of ['all', 'web', 'escritorio', 'android']) {
    assert.match(html, new RegExp(`data-project-filter="${category}"`));
  }
  assert.match(html, /id="project-search"/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /data-project-empty/);
  assert.match(script, /normalize\(/);
  assert.match(script, /aria-pressed/);
});

test('the index keeps the original typeface, theme control, and real portfolio identity', () => {
  const html = readPage('index.html');
  const css = fs.readFileSync(path.join(root, 'assets/css/styles.css'), 'utf8');
  assert.match(html, /Luis Gonzalez/);
  assert.match(html, /SEVETCO/);
  assert.match(html, /id="main-content"/);
  assert.match(css, /font-family:\s*"Ford Antenna"/);
  assert.match(html, /assets\/js\/content\.js" defer/);
  const image = html.match(/class="showcase-image" src="([^"]+)"/)?.[1]
    || html.match(/<img class="showcase-image" src="([^"]+)"/)?.[1];
  assert.ok(image);
  assert.ok(fs.existsSync(path.join(root, decodeURIComponent(image.replace(/^\//, '')))));
});

test('dark theme keeps muted copy and profile stat cards readable', () => {
  const css = fs.readFileSync(path.join(root, 'assets/css/styles.css'), 'utf8');
  const about = readPage('about.html');
  const darkTokens = css.match(/:root\[data-theme="dark"\]\s*\{([^}]+)\}/)?.[1] || '';
  const darkCardTokens = css.match(/:root\[data-theme="dark"\]\s*\.card\s*\{([^}]+)\}/)?.[1] || '';
  const darkSmallCardTokens = css.match(/:root\[data-theme="dark"\]\s*:is\(\.subcard,\s*\.stat,\s*\.profile-job-card\)\s*\{([^}]+)\}/)?.[1] || '';

  assert.match(css, /:root\[data-theme="dark"\]\s*\.text-muted\s*\{[^}]*color:\s*var\(--color-muted\)\s*!important/s);
  assert.match(darkSmallCardTokens, /--color-text:\s*#edf3ff/i);
  assert.match(darkSmallCardTokens, /--color-muted:\s*#cbd5e1/i);
  assert.match(darkTokens, /--color-bg:\s*#111214/i);
  assert.match(darkTokens, /--color-text:\s*#e5e7eb/i);
  assert.match(darkCardTokens, /--color-text:\s*#edf3ff/i);
  assert.match(darkCardTokens, /--color-muted:\s*#b4bfd2/i);
  assert.match(about, /class="[^"]*text-muted[^"]*profile-summary/);

  const luminance = (hex) => {
    const channels = hex.match(/[\da-f]{2}/gi).map((value) => parseInt(value, 16) / 255);
    const linear = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  };
  const contrast = (foreground, background) => {
    const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
    return (values[0] + 0.05) / (values[1] + 0.05);
  };

  assert.ok(contrast('#cbd5e1', '#111214') >= 4.5, 'muted text remains readable on the dark page');
  assert.ok(contrast('#e5e7eb', '#111214') >= 4.5, 'primary text remains readable on the dark page');
  assert.ok(contrast('#edf3ff', '#202632') >= 4.5, 'profile headings remain readable on dark glass cards');
  assert.ok(contrast('#cbd5e1', '#202632') >= 4.5, 'profile stat labels remain readable on dark glass cards');
  assert.ok(contrast('#b4bfd2', '#121824') >= 4.5, 'profile summary remains readable on its translucent card');
});

test('the homepage product of the day rotates through all apps without immediate repeats', () => {
  const html = readPage('index.html');
  const script = readPage('assets/js/featured-product.js');
  const products = [...script.matchAll(/^\s*slug: '([^']+)'/gm)].map(([, slug]) => slug);
  const appRoutes = [...readPage('apps.html').matchAll(/<a class="project-card-link" href="([^\"]+)"/g)]
    .map(([, href]) => path.basename(href, '.html'));

  assert.match(html, /Producto del día/);
  assert.match(html, /assets\/js\/featured-product\.js" defer/);
  assert.deepEqual(products, appRoutes);
  assert.equal(products.length, 12);
  assert.match(script, /localStorage\.setItem\(storageKey, slug\)/);
  assert.match(script, /window\.addEventListener\('pageshow'/);
  assert.match(script, /if \(event\.persisted\) rotateProduct\(\)/);
  for (const [, image] of script.matchAll(/image: '(\/assets\/[^']+)'/g)) {
    assert.ok(fs.existsSync(path.join(root, decodeURIComponent(image.slice(1)))), image);
  }
});

test('VTF, PDF+, and Pixelados preserve image proportions in a shared lightbox', () => {
  const css = fs.readFileSync(path.join(root, 'assets/css/styles.css'), 'utf8');
  for (const [page, galleryClass] of [['vtf.html', 'gallery-vtf'], ['pdfmas.html', 'gallery-pdfmas'], ['pixelados.html', 'gallery-pixelados']]) {
    const html = readPage(page);
    assert.match(html, new RegExp(`id="appImageGallery"[^>]*\\b${galleryClass}\\b`));
    assert.match(html, /id="imageModal"/);
    assert.match(html, /assets\/js\/image-gallery\.js\?v=2" defer/);
  }
  assert.match(css, /\.app-detail-page \.gallery-img\s*\{[^}]*aspect-ratio:\s*auto/s);

  const pixelados = readPage('pixelados.html');
  const docusheet = readPage('docusheetbot.html');
  const gridClasses = (html) => html.match(/class="([^"]*row row-cols-2 row-cols-md-3 row-cols-lg-4[^"]*)"/)?.[1]
    .split(/\s+/)
    .filter((className) => className !== 'gallery-pixelados')
    .join(' ');
  assert.equal(gridClasses(pixelados), gridClasses(docusheet));
  assert.doesNotMatch(css, /\.gallery-pixelados \.gallery-img\s*\{[^}]*aspect-ratio:\s*417\s*\/\s*956/s);
});

test('app detail pages share the same content order and project resources panel', () => {
  const pages = [
    'condor.html', 'docusheetbot.html', 'imbalances.html', 'localtranscriptor.html',
    'ofusercontrolapp.html', 'paytollapp.html', 'pdf-a-png-movil.html', 'pdfmas.html',
    'pixelados.html', 'sevetco.html', 'vtf.html', 'ytclipper.html',
  ];

  for (const file of pages) {
    const html = readPage(file);
    const main = html.match(/<main class="section app-detail-page">([\s\S]*?)<\/main>/)?.[1];
    assert.ok(main, `${file} opts into the shared app detail layout`);
    const brief = main.match(/<p class="section-lead">([\s\S]*?)<\/p>/)?.[1]
      ?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    assert.ok(brief, `${file} has a one-sentence app description`);
    assert.equal((brief.match(/[.!?](?:\s|$)/g) || []).length, 1, `${file} keeps the brief to one sentence`);
    const order = ['<h1>', 'class="section-lead"', '<h2>Reseña</h2>', '<h2>Funcionalidades</h2>', 'Galería de la Aplicación', 'Tecnología y enlaces'];
    let previous = -1;
    for (const marker of order) {
      const position = main.indexOf(marker);
      assert.ok(position > previous, `${file} orders ${marker} after the prior section`);
      previous = position;
    }
    assert.equal((main.match(/class="project-resources"/g) || []).length, 1, `${file} has one resources panel`);
    assert.match(main, /Technology Stack/);
    assert.match(main, /Volver a Apps/);
    assert.match(main, /id="appImageGallery"/);
    assert.doesNotMatch(html, /id="stackModal"|data-bs-target="#stackModal"/);
    assert.match(html, /assets\/js\/image-gallery\.js\?v=2" defer/);
  }
});

test('SEVETCO has separate web and mobile screenshot groups with real assets', () => {
  const html = readPage('sevetco.html');
  assert.match(html, /gallery-sevetco-web[\s\S]*?gallery-sevetco-mobile/);
  assert.equal((html.match(/alt="SEVETCO web:/g) || []).length, 6);
  assert.equal((html.match(/alt="SEVETCO móvil:/g) || []).length, 6);
  assert.match(html, /assets\/js\/image-gallery\.js\?v=2" defer/);
  assert.match(html, /id="imageModal"/);
});

test('all 12 app galleries use one shared controller with working navigation and close controls', () => {
  const pages = [
    'condor.html', 'docusheetbot.html', 'imbalances.html', 'localtranscriptor.html',
    'ofusercontrolapp.html', 'paytollapp.html', 'pdf-a-png-movil.html', 'pdfmas.html',
    'pixelados.html', 'sevetco.html', 'vtf.html', 'ytclipper.html',
  ];
  const controller = readPage('assets/js/image-gallery.js');
  const sevetco = readPage('sevetco.html');

  for (const file of pages) {
    const html = readPage(file);
    assert.equal((html.match(/assets\/js\/image-gallery\.js\?v=2" defer/g) || []).length, 1, `${file} loads the shared gallery once`);
    assert.match(html, /id="imageModal"/, `${file} has the lightbox`);
    assert.match(html, /id="prevImageBtn"/, `${file} has previous navigation`);
    assert.match(html, /id="nextImageBtn"/, `${file} has next navigation`);
    assert.match(html, /data-bs-dismiss="modal"/, `${file} has a close control`);
    assert.doesNotMatch(html, /gallery-fallback\.js|new bootstrap\.Modal\s*\(\s*imageModalElement\s*\)/, `${file} has no competing gallery implementation`);
    const previous = html.match(/<button\b[^>]*id="prevImageBtn"[^>]*>/)?.[0] || '';
    const next = html.match(/<button\b[^>]*id="nextImageBtn"[^>]*>/)?.[0] || '';
    assert.match(previous, /type="button"[^>]*aria-label="Captura anterior"|aria-label="Captura anterior"[^>]*type="button"/);
    assert.match(next, /type="button"[^>]*aria-label="Captura siguiente"|aria-label="Captura siguiente"[^>]*type="button"/);
  }

  assert.match(controller, /currentIndex = \(index \+ activeImages\.length\) % activeImages\.length/);
  assert.match(controller, /image\.closest\('\[data-gallery-group\]'\)/);
  assert.match(sevetco, /data-gallery-group="web"[\s\S]*?gallery-sevetco-web/);
  assert.match(sevetco, /data-gallery-group="mobile"[\s\S]*?gallery-sevetco-mobile/);
  assert.match(controller, /event\.key === 'ArrowLeft'/);
  assert.match(controller, /event\.key === 'ArrowRight'/);
  assert.match(controller, /event\.key === 'Escape'/);
  assert.match(controller, /closeButton\?\.addEventListener\('click'/);
  assert.match(controller, /event\.target === modal/);
  assert.doesNotMatch(controller, /getOrCreateInstance|modalInstance/);
});

test('gallery controls work with and without Bootstrap: arrows wrap, close restores focus', () => {
  const source = readPage('assets/js/image-gallery.js');

  const mountGallery = (withBootstrap, grouped = false) => {
    const documentListeners = new Map();
    const active = { value: null };
    const makeClassList = () => {
      const values = new Set();
      return {
        add: (value) => values.add(value),
        remove: (value) => values.delete(value),
        contains: (value) => values.has(value),
      };
    };
    const makeElement = (name) => {
      const listeners = new Map();
      const attributes = new Map();
      return {
        name,
        src: '',
        currentSrc: '',
        alt: '',
        tabIndex: -1,
        isConnected: true,
        classList: makeClassList(),
        addEventListener(type, callback) {
          const callbacks = listeners.get(type) || [];
          callbacks.push(callback);
          listeners.set(type, callbacks);
        },
        dispatch(type, properties = {}) {
          const event = {
            target: this,
            preventDefault() {},
            stopPropagation() {},
            ...properties,
          };
          for (const callback of listeners.get(type) || []) callback(event);
        },
        setAttribute(name, value) { attributes.set(name, value); },
        getAttribute(name) { return attributes.get(name); },
        focus() { active.value = this; },
        closest() { return null; },
      };
    };

    const paths = grouped
      ? ['web-one.png', 'web-two.png', 'mobile-one.png', 'mobile-two.png']
      : ['one.png', 'two.png', 'three.png'];
    const galleryImages = paths.map((src, index) => {
      const image = makeElement(`image-${index + 1}`);
      image.src = `/${src}`;
      image.currentSrc = image.src;
      image.alt = `Capture ${index + 1}`;
      return image;
    });
    const webGroup = { querySelectorAll: () => galleryImages.slice(0, 2) };
    const mobileGroup = { querySelectorAll: () => galleryImages.slice(2) };
    if (grouped) {
      galleryImages.forEach((image, index) => {
        image.closest = () => index < 2 ? webGroup : mobileGroup;
      });
    }
    const gallery = { querySelectorAll: () => galleryImages };
    const modalImage = makeElement('modal-image');
    const previous = makeElement('previous');
    const next = makeElement('next');
    const closeButton = makeElement('close');
    const modal = makeElement('modal');
    modal.setAttribute('aria-hidden', 'true');
    modal.querySelector = (selector) => ({
      '#modalImage': modalImage,
      '#prevImageBtn': previous,
      '#nextImageBtn': next,
      '[data-bs-dismiss="modal"], .modal-close-enhanced': closeButton,
    })[selector] || null;
    const page = { querySelector: (selector) => selector === '#imageModal' ? modal : null };
    const doc = {
      body: { style: {} },
      documentElement: { classList: makeClassList() },
      get activeElement() { return active.value; },
      querySelector: (selector) => selector === '.app-detail-page' ? page : null,
      getElementById: (id) => id === 'appImageGallery' ? gallery : null,
      addEventListener(type, callback) {
        const callbacks = documentListeners.get(type) || [];
        callbacks.push(callback);
        documentListeners.set(type, callbacks);
      },
      dispatch(type, properties = {}) {
        const event = { target: this, preventDefault() {}, ...properties };
        for (const callback of documentListeners.get(type) || []) callback(event);
      },
    };
    const window = {};
    if (withBootstrap) {
      window.bootstrap = {
        Modal: {
          getOrCreateInstance() {
            return {
              show: () => modal.classList.add('show'),
              hide: () => {
                modal.classList.remove('show');
                modal.dispatch('hidden.bs.modal');
              },
            };
          },
        },
      };
    }

    vm.runInNewContext(source, { document: doc, window });
    doc.dispatch('DOMContentLoaded');
    return { doc, modal, modalImage, previous, next, closeButton, galleryImages };
  };

  for (const withBootstrap of [false, true]) {
    const gallery = mountGallery(withBootstrap);
    gallery.galleryImages[0].dispatch('click');
    assert.equal(gallery.modalImage.src, '/one.png');
    assert.equal(gallery.modal.classList.contains('show'), true);
    assert.equal(gallery.doc.documentElement.classList.contains('no-bootstrap'), !withBootstrap);

    gallery.next.dispatch('click');
    assert.equal(gallery.modalImage.src, '/two.png');
    gallery.next.dispatch('click');
    assert.equal(gallery.modalImage.src, '/three.png');
    gallery.next.dispatch('click');
    assert.equal(gallery.modalImage.src, '/one.png');
    gallery.previous.dispatch('click');
    assert.equal(gallery.modalImage.src, '/three.png');

    gallery.doc.dispatch('keydown', { key: 'ArrowRight' });
    assert.equal(gallery.modalImage.src, '/one.png');
    gallery.doc.dispatch('keydown', { key: 'Escape' });
    assert.equal(gallery.modal.classList.contains('show'), false);
    assert.equal(gallery.modal.getAttribute('aria-hidden'), 'true');
    assert.equal(gallery.doc.activeElement, gallery.galleryImages[0]);

    gallery.galleryImages[1].dispatch('click');
    gallery.closeButton.dispatch('click');
    assert.equal(gallery.modal.classList.contains('show'), false);

    gallery.galleryImages[2].dispatch('click');
    gallery.modal.dispatch('click', { target: gallery.modal });
    assert.equal(gallery.modal.classList.contains('show'), false);
  }

  const grouped = mountGallery(false, true);
  grouped.galleryImages[1].dispatch('click');
  assert.equal(grouped.modalImage.src, '/web-two.png');
  grouped.next.dispatch('click');
  assert.equal(grouped.modalImage.src, '/web-one.png');
  grouped.galleryImages[2].dispatch('click');
  assert.equal(grouped.modalImage.src, '/mobile-one.png');
  grouped.previous.dispatch('click');
  assert.equal(grouped.modalImage.src, '/mobile-two.png');
});

test('mobile navigation stays styled without Bootstrap and keeps the title scale restrained', () => {
  const css = fs.readFileSync(path.join(root, 'assets/css/styles.css'), 'utf8');
  const content = readPage('assets/js/content.js');
  assert.match(css, /\.site-header \.navbar-nav\s*\{[^}]*list-style:\s*none/s);
  assert.match(css, /\.site-header \.navbar-collapse\.show\s*\{\s*display:\s*block !important/s);
  assert.match(content, /function ensureNavigationFallback\(\)/);
  assert.match(content, /aria-expanded', String\(!expanded\)/);
  assert.match(css, /\.gallery-controller \.app-detail-page \.modal:not\(\.show\)\s*\{\s*display:\s*none/s);
  assert.match(readPage('assets/js/image-gallery.js'), /event\.key === 'Escape'/);
  assert.match(css, /\.app-detail-page > \.container > h1\s*\{[^}]*font-size:\s*clamp\(2rem, 4vw, 3\.1rem\)/s);
  assert.match(css, /\.projects-intro h1 \{ font-size: clamp\(2\.1rem, 4\.6vw, 3\.9rem\); \}/);
});

test('SEVETCO keeps separately framed web and mobile video showcases', () => {
  const html = readPage('sevetco.html');
  const css = fs.readFileSync(path.join(root, 'assets/css/styles.css'), 'utf8');
  assert.match(html, /sevetco-video-web[^>]*>[\s\S]*?\/assets\/mp4\/svw\.mp4/);
  assert.match(html, /sevetco-video-mobile[^>]*>[\s\S]*?\/assets\/mp4\/svm\.mp4/);
  assert.match(css, /\.sevetco-video-web\s*\{/);
  assert.match(css, /\.sevetco-video-mobile\s*\{/);
});

test('the particle animation caps density, pixel ratio, and redraw frequency', () => {
  const js = readPage('assets/js/cursor.js');
  assert.match(js, /FRAME_INTERVAL = 1000 \/ 30/);
  assert.match(js, /Math\.min\(window\.devicePixelRatio \|\| 1, this\.isMobile \? 1\.25 : 1\.5\)/);
  assert.match(js, /this\.isMobile \? 28 : 76/);
  assert.match(js, /prefers-reduced-motion: reduce/);
  assert.match(js, /document\.hidden/);
});
