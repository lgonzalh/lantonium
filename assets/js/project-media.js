/* One gallery controller, scoped to the project dialog and its image viewer. */
(() => {
  const dialog = document.getElementById('project-detail-dialog');
  const viewer = document.getElementById('image-viewer');
  if (!dialog || !viewer) return;
  const container = document.getElementById('project-detail-media');
  const enlarged = document.getElementById('viewer-image');
  const caption = document.getElementById('viewer-caption');
  let images = [];
  let current = 0;
  let opener;
  const show = index => {
    current = (index + images.length) % images.length;
    enlarged.src = images[current].src;
    enlarged.alt = images[current].alt;
    caption.textContent = `${current + 1} / ${images.length} · ${images[current].alt}`;
  };
  const close = () => viewer.close();
  document.getElementById('viewer-close').addEventListener('click', close);
  document.getElementById('viewer-prev').addEventListener('click', () => show(current - 1));
  document.getElementById('viewer-next').addEventListener('click', () => show(current + 1));
  viewer.addEventListener('click', event => { if (event.target === viewer) close(); });
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); show(current + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  viewer.addEventListener('close', () => opener?.focus());
  const stop = () => container.querySelectorAll('video').forEach(video => video.pause());
  dialog.addEventListener('close', () => {
    stop();
    if (viewer.open) viewer.close();
    document.body.classList.remove('project-open');
  });
  const element = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  const section = title => {
    const node = element('section', '', 'project-media-section');
    node.append(element('h3', title));
    container.append(node);
    return node;
  };
  window.renderProjectMedia = project => {
    stop();
    container.replaceChildren();
    images = project.images || [];
    section('Reseña').append(element('p', project.review));
    if (project.features?.length) {
      const list = element('ul');
      project.features.forEach(feature => list.append(element('li', feature)));
      section('Funcionalidades').append(list);
    }
    if (project.videos?.length) {
      const videos = section('Demostraciones en video');
      project.videos.forEach((media, index) => {
        const figure = element('figure', '', 'project-video');
        const video = element('video');
        video.controls = true;
        video.preload = 'none';
        video.playsInline = true;
        video.src = media.src;
        video.setAttribute('aria-label', `${media.title} ${index + 1}`);
        video.append(element('p', 'Tu navegador no permite reproducir este video.'));
        const download = element('a', 'Abrir video ↗');
        download.href = media.src;
        download.target = '_blank';
        download.rel = 'noopener noreferrer';
        figure.append(video, element('figcaption', `${media.title} ${index + 1}`), download);
        videos.append(figure);
      });
    }
    if (images.length) {
      const gallery = element('div', '', 'project-gallery');
      section('Galería de imágenes').append(gallery);
      images.forEach((media, index) => {
        const button = element('button', '', 'project-thumbnail');
        button.type = 'button';
        button.setAttribute('aria-label', `Ampliar ${media.alt}`);
        const image = element('img');
        image.src = media.src; image.alt = media.alt; image.loading = 'lazy';
        button.append(image);
        button.addEventListener('click', () => { opener = button; show(index); viewer.showModal(); });
        gallery.append(button);
      });
    }
  };
})();
