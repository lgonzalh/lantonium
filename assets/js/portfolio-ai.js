(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  if (!reduceMotion) {
    root.classList.add('has-ai-motion');
    requestAnimationFrame(() => window.setTimeout(() => root.classList.add('is-ready'), 80));
  }

  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('portfolio-menu');
  const menuClose = menu?.querySelector('.menu-close');

  const closeMenu = (restoreFocus = true) => {
    if (!menu || menu.hidden) return;
    menu.hidden = true;
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    document.body.style.removeProperty('overflow');
    if (restoreFocus) menuToggle?.focus();
  };

  menuToggle?.addEventListener('click', () => {
    if (!menu) return;
    if (!menu.hidden) {
      closeMenu();
      return;
    }
    menu.hidden = false;
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
    menuClose?.focus();
  });

  menuClose?.addEventListener('click', () => closeMenu());
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu(false)));

  menu?.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = [...menu.querySelectorAll('a, button')].filter((element) => !element.disabled);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const previewImage = document.getElementById('project-preview-image');
  const previewIndex = document.getElementById('preview-index');
  const previewType = document.getElementById('preview-type');
  const previewTitle = document.getElementById('preview-title');
  const projectRows = [...document.querySelectorAll('[data-project-row]')];

  const setActiveProject = (row) => {
    if (!row || !previewImage) return;
    projectRows.forEach((item) => item.classList.toggle('is-active', item === row));
    const source = row.dataset.previewSrc;
    const title = row.querySelector('h3')?.textContent.trim();
    if (previewIndex) previewIndex.textContent = row.dataset.projectIndex || '01';
    if (previewType) previewType.textContent = row.dataset.projectType || '';
    if (previewTitle && title) previewTitle.textContent = title;
    if (!source || previewImage.getAttribute('src') === source) return;

    const nextImage = new Image();
    previewImage.classList.add('is-changing');
    nextImage.onload = () => {
      previewImage.src = source;
      previewImage.alt = row.dataset.previewAlt || title || 'Vista previa del proyecto';
      requestAnimationFrame(() => previewImage.classList.remove('is-changing'));
    };
    nextImage.onerror = () => previewImage.classList.remove('is-changing');
    nextImage.src = source;
  };

  projectRows.forEach((row) => {
    row.addEventListener('pointerenter', () => setActiveProject(row));
    row.addEventListener('focus', () => setActiveProject(row));
  });

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        activeObserver.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -5% 0px' });
    document.querySelectorAll('.reveal-item, .approach-item').forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 3, 2) * 70}ms`;
      observer.observe(item);
    });
  } else {
    document.querySelectorAll('.reveal-item, .approach-item').forEach((item) => item.classList.add('is-visible'));
  }

  const year = document.getElementById('current-year');
  if (year) year.textContent = String(new Date().getFullYear());

  const canvas = document.getElementById('signal-canvas');
  const context = canvas?.getContext('2d', { alpha: true });
  if (!canvas || !context || reduceMotion) return;

  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let points = [];
  let pointer = { x: -1000, y: -1000 };
  let frameId = 0;
  let lastFrame = 0;
  const maxFpsInterval = 1000 / 24;
  const pointCount = () => Math.min(window.innerWidth < 700 ? 20 : 42, Math.max(12, Math.round((width * height) / 33000)));

  const resizeCanvas = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    points = Array.from({ length: pointCount() }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.23,
      vy: (Math.random() - 0.5) * 0.23,
      radius: Math.random() * 1.1 + 0.55,
    }));
  };

  const draw = (timestamp) => {
    if (document.hidden) {
      frameId = 0;
      return;
    }
    if (timestamp - lastFrame < maxFpsInterval) {
      frameId = requestAnimationFrame(draw);
      return;
    }
    lastFrame = timestamp;
    context.clearRect(0, 0, width, height);
    context.lineWidth = 0.7;

    for (let index = 0; index < points.length; index += 1) {
      const point = points[index];
      point.x += point.vx;
      point.y += point.vy;
      if (point.x < -8 || point.x > width + 8) point.vx *= -1;
      if (point.y < -8 || point.y > height + 8) point.vy *= -1;

      for (let next = index + 1; next < points.length; next += 1) {
        const other = points[next];
        const distance = Math.hypot(point.x - other.x, point.y - other.y);
        if (distance < 126) {
          context.strokeStyle = `rgba(215, 213, 206, ${0.13 * (1 - distance / 126)})`;
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }
      }

      const pointerDistance = Math.hypot(point.x - pointer.x, point.y - pointer.y);
      if (pointerDistance < 150) {
        context.strokeStyle = `rgba(238, 237, 232, ${0.24 * (1 - pointerDistance / 150)})`;
        context.beginPath();
        context.moveTo(point.x, point.y);
        context.lineTo(pointer.x, pointer.y);
        context.stroke();
      }

      context.fillStyle = 'rgba(226, 224, 217, 0.64)';
      context.beginPath();
      context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
      context.fill();
    }
    frameId = requestAnimationFrame(draw);
  };

  const startAnimation = () => {
    if (!frameId && !document.hidden) frameId = requestAnimationFrame(draw);
  };
  const stopAnimation = () => {
    if (frameId) cancelAnimationFrame(frameId);
    frameId = 0;
  };

  resizeCanvas();
  startAnimation();
  window.addEventListener('resize', resizeCanvas, { passive: true });
  window.addEventListener('pointermove', (event) => {
    pointer = { x: event.clientX, y: event.clientY };
  }, { passive: true });
  document.addEventListener('pointerleave', () => { pointer = { x: -1000, y: -1000 }; });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAnimation();
    else startAnimation();
  });
})();
