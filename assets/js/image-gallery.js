(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const page = document.querySelector('.app-detail-page');
    const gallery = document.getElementById('appImageGallery') || page;
    const modal = page?.querySelector('#imageModal') || document.getElementById('imageModal');
    const modalImage = modal?.querySelector('#modalImage');
    const previousButton = modal?.querySelector('#prevImageBtn');
    const nextButton = modal?.querySelector('#nextImageBtn');
    const closeButton = modal?.querySelector('[data-bs-dismiss="modal"], .modal-close-enhanced');
    const images = gallery ? Array.from(gallery.querySelectorAll('.gallery-img')) : [];

    if (!modal || !modalImage || !images.length) return;

    document.documentElement.classList.add('gallery-controller');
    if (!window.bootstrap?.Modal) document.documentElement.classList.add('no-bootstrap');

    let currentIndex = 0;
    let activeImages = images;
    let opener = null;

    const showImage = (index) => {
      currentIndex = (index + activeImages.length) % activeImages.length;
      const image = activeImages[currentIndex];
      modalImage.src = image.currentSrc || image.src;
      modalImage.alt = image.alt ? `Vista ampliada: ${image.alt}` : 'Captura ampliada';
    };

    const restoreFocus = () => {
      document.body.style.overflow = '';
      modal.setAttribute('aria-hidden', 'true');
      if (opener?.isConnected) opener.focus();
      opener = null;
    };

    const close = () => {
      modal.classList.remove('show');
      restoreFocus();
    };

    const open = (image) => {
      opener = image;
      const group = image.closest('[data-gallery-group]');
      const groupImages = group ? Array.from(group.querySelectorAll('.gallery-img')) : images;
      activeImages = groupImages.length ? groupImages : images;
      showImage(activeImages.indexOf(image));
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-hidden', 'false');

      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
      closeButton?.focus();
    };

    images.forEach((image) => {
      image.tabIndex = 0;
      image.setAttribute('role', 'button');
      image.setAttribute('aria-label', `Ampliar: ${image.alt || 'captura de pantalla'}`);
      image.addEventListener('click', () => open(image));
      image.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        open(image);
      });
    });

    previousButton?.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      showImage(currentIndex - 1);
    });
    nextButton?.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      showImage(currentIndex + 1);
    });
    closeButton?.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      close();
    });

    modal.addEventListener('click', (event) => {
      if (event.target === modal) close();
    });

    document.addEventListener('keydown', (event) => {
      if (!modal.classList.contains('show')) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showImage(currentIndex - 1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        showImage(currentIndex + 1);
      } else if (event.key === 'Tab') {
        const focusable = Array.from(modal.querySelectorAll('button:not([disabled]), [tabindex="0"]'));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    });

  });
})();
