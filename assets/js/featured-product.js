(() => {
  const products = [
    {
      slug: 'sevetco', name: 'SEVETCO', category: 'WEB / ANDROID', href: '/sevetco.html',
      image: '/assets/img/sevetco/web/02-panel.png', alt: 'Panel de gestión de SEVETCO',
      description: 'Gestión operativa, servicios y proveedores desde una plataforma web y móvil.',
      width: 1280, height: 800, orientation: 'landscape',
    },
    {
      slug: 'paytollapp', name: 'PayTollApp', category: 'WEB / CLOUD', href: '/paytollapp.html',
      image: '/assets/img/paytollapp/pt01.png', alt: 'Interfaz de PayTollApp',
      description: 'Gestión automatizada de pagos de peaje y recargas electrónicas.',
      width: 482, height: 835, orientation: 'portrait',
    },
    {
      slug: 'condor', name: 'Condor', category: 'EN DESARROLLO', state: 'development', href: '/condor.html',
      image: '/assets/img/condor/condor.jpg', alt: 'Vista actual de Condor',
      description: 'Ingeniería de software local-first que preserva el contexto y el conocimiento de cada proyecto.',
      width: 1480, height: 760, orientation: 'landscape',
    },
    {
      slug: 'pixelados', name: 'Pixelados', category: 'ANDROID', href: '/pixelados.html',
      image: '/assets/img/pixelados/03-editor.png', alt: 'Editor de pixel art de Pixelados',
      description: 'Un lienzo táctil de pixel art con herramientas de dibujo y exportación PNG.',
      width: 420, height: 933, orientation: 'portrait',
    },
    {
      slug: 'pdfmas', name: 'PDF+', category: 'ESCRITORIO', href: '/pdfmas.html',
      image: '/assets/img/pdfmas/fotograma-00001.png', alt: 'Interfaz de PDF+',
      description: 'Herramientas de escritorio para editar, organizar y convertir documentos PDF.',
      width: 1202, height: 838, orientation: 'landscape',
    },
    {
      slug: 'vtf', name: 'Video to Frames', category: 'WEB', href: '/vtf.html',
      image: '/assets/img/vtf/fotograma-00016.png', alt: 'Interfaz de Video to Frames',
      description: 'Extrae fotogramas de videos MP4 y los guarda como imágenes JPG.',
      width: 1458, height: 966, orientation: 'landscape',
    },
    {
      slug: 'imbalances', name: 'Imbalances', category: 'ESCRITORIO', href: '/imbalances.html',
      image: '/assets/img/imbalances/ib00.jpg', alt: 'Panel de auditoría de Imbalances',
      description: 'Auditoría financiera intercompany y conciliación de balances desde Excel.',
      width: 554, height: 1080, orientation: 'portrait',
    },
    {
      slug: 'pdf-a-png-movil', name: 'PDF a PNG Móvil', category: 'ANDROID', href: '/pdf-a-png-movil.html',
      image: '/assets/img/pdf2png/Captura%20de%20pantalla%202026-09-07%20195538.png', alt: 'Conversión de PDF a imagen en la aplicación móvil',
      description: 'Convierte documentos PDF a imágenes PNG directamente desde el móvil.',
      width: 417, height: 956, orientation: 'portrait',
    },
    {
      slug: 'ofusercontrolapp', name: 'OFUserControlApp', category: 'WEB', href: '/ofusercontrolapp.html',
      image: '/assets/img/ofusercontrolapp/of01.jpeg', alt: 'Panel de OFUserControlApp',
      description: 'Auditoría y sincronización de identidades entre sistemas externos y Directorio Activo.',
      width: 1010, height: 1029, orientation: 'square',
    },
    {
      slug: 'ytclipper', name: 'YT Downloader - Clipper', category: 'ESCRITORIO', href: '/ytclipper.html',
      image: '/assets/img/ytclipper/yt01.png', alt: 'Interfaz de YT Downloader - Clipper',
      description: 'Descarga videos y extrae segmentos precisos de audio y video.',
      width: 872, height: 713, orientation: 'landscape',
    },
    {
      slug: 'docusheetbot', name: 'DocuSheetBot', category: 'ANDROID', href: '/docusheetbot.html',
      image: '/assets/img/docusheetbot/ds01.png', alt: 'Pantalla principal de DocuSheetBot',
      description: 'Automatiza documentos y sincroniza datos con IA desde Android.',
      width: 417, height: 925, orientation: 'portrait',
    },
    {
      slug: 'localtranscriptor', name: 'LocalTranscriptor', category: 'ANDROID', href: '/localtranscriptor.html',
      image: '/assets/img/localtranscriptor/lt01.png', alt: 'Pantalla de transcripción de LocalTranscriptor',
      description: 'Transcribe audio a texto en el dispositivo y mantiene el procesamiento local.',
      width: 441, height: 992, orientation: 'portrait',
    },
  ];

  const frame = document.querySelector('.showcase-frame[data-product-id]');
  const image = document.getElementById('showcase-image');
  const category = document.getElementById('showcase-category');
  const title = document.getElementById('showcase-title');
  const description = document.getElementById('showcase-description');
  const initial = document.getElementById('showcase-initial');
  const link = document.getElementById('showcase-link');
  if (!frame || !image || !category || !title || !description || !initial || !link) return;

  const storageKey = 'lantonium:featured-product';
  let lastProduct = frame.dataset.productId;

  const readLastProduct = () => {
    try {
      return localStorage.getItem(storageKey) || sessionStorage.getItem(storageKey) || lastProduct;
    } catch {
      try { return sessionStorage.getItem(storageKey) || lastProduct; } catch { return lastProduct; }
    }
  };

  const rememberProduct = (slug) => {
    lastProduct = slug;
    try {
      localStorage.setItem(storageKey, slug);
    } catch {
      try { sessionStorage.setItem(storageKey, slug); } catch { /* The in-memory order still rotates on bfcache returns. */ }
    }
  };

  const rotateProduct = () => {
    const previousSlug = readLastProduct();
    const previousIndex = products.findIndex((product) => product.slug === previousSlug);
    const nextIndex = ((previousIndex < 0 ? 0 : previousIndex) + 1) % products.length;
    const product = products[nextIndex];

    frame.classList.add('is-rotating');
    frame.dataset.productId = product.slug;
    category.textContent = product.category;
    title.textContent = product.name;
    description.textContent = product.description;
    initial.textContent = product.name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
    link.href = product.href;
    link.setAttribute('aria-label', `Ver la aplicación ${product.name}`);

    const badge = category.closest('.showcase-live');
    if (badge) badge.dataset.state = product.state || 'released';

    image.src = product.image;
    image.alt = product.alt;
    image.width = product.width;
    image.height = product.height;
    image.dataset.orientation = product.orientation;

    window.requestAnimationFrame(() => frame.classList.remove('is-rotating'));
    rememberProduct(product.slug);
  };

  rotateProduct();
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) rotateProduct();
  });
})();
