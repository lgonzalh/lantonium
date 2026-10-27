(() => {
  const preview = document.querySelector('.project-preview');
  const previewImage = document.getElementById('project-preview-image');
  const previewCount = document.getElementById('project-preview-count');
  const previewType = document.getElementById('project-preview-type');
  const previewTitle = document.getElementById('project-preview-title');
  const grid = document.querySelector('[data-project-grid]');
  const search = document.getElementById('project-search');
  const filters = document.querySelectorAll('[data-project-filter]');

  if (!preview || !previewImage || !grid || !previewTitle) return;

  const cards = Array.from(grid.querySelectorAll('[data-project-card]'));
  let updateToken = 0;

  cards.forEach((card, index) => {
    card.dataset.projectIndex = String(index + 1).padStart(2, '0');
  });

  const setPreview = (card) => {
    if (!card || card.hidden) return;
    if (card.classList.contains('is-preview-active')) return;
    preview.classList.remove('is-empty');

    const source = card.querySelector('.project-card-media img');
    const title = card.querySelector('.project-card-title');
    const type = card.querySelector('.project-type');
    if (!source || !title) return;

    cards.forEach((item) => item.classList.toggle('is-preview-active', item === card));
    previewTitle.textContent = title.textContent.replace(/\s*↗\s*$/, '').trim();
    if (previewType && type) previewType.textContent = type.textContent.trim();
    if (previewCount) {
      previewCount.textContent = `${card.dataset.projectIndex} / ${String(cards.length).padStart(2, '0')}`;
    }

    const sourceUrl = source.currentSrc || source.src;
    if (previewImage.src === sourceUrl) return;

    const token = ++updateToken;
    const image = new Image();
    preview.classList.add('is-changing');
    image.onload = () => {
      if (token !== updateToken) return;
      previewImage.src = sourceUrl;
      previewImage.width = source.naturalWidth || source.width;
      previewImage.height = source.naturalHeight || source.height;
      requestAnimationFrame(() => preview.classList.remove('is-changing'));
    };
    image.onerror = () => {
      if (token === updateToken) preview.classList.remove('is-changing');
    };
    image.src = sourceUrl;
  };

  const syncVisibleCard = () => {
    window.setTimeout(() => {
      const next = cards.find((card) => !card.hidden);
      preview.classList.toggle('is-empty', !next);
      if (next) {
        setPreview(next);
      } else {
        cards.forEach((card) => card.classList.remove('is-preview-active'));
        previewTitle.textContent = 'Sin coincidencias';
        if (previewType) previewType.textContent = 'AJUSTA LA BÚSQUEDA O LOS FILTROS';
        if (previewCount) previewCount.textContent = `00 / ${String(cards.length).padStart(2, '0')}`;
      }
    }, 0);
  };

  grid.addEventListener('pointerover', (event) => {
    const card = event.target.closest('[data-project-card]');
    if (card && grid.contains(card)) setPreview(card);
  });

  grid.addEventListener('focusin', (event) => {
    const card = event.target.closest('[data-project-card]');
    if (card && grid.contains(card)) setPreview(card);
  });

  filters.forEach((filter) => filter.addEventListener('click', syncVisibleCard));
  search?.addEventListener('input', syncVisibleCard);

  setPreview(cards.find((card) => !card.hidden));
})();
