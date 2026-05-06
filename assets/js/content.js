
async function applyContent(data) {
  if (!data) return;

  if (data.text) {
    Object.entries(data.text).forEach(([key, value]) => {
      document.querySelectorAll(`[data-key="${key}"]`).forEach(el => {
        el.textContent = value;
      });
    });
  }

  if (data.attrs) {
    Object.entries(data.attrs).forEach(([key, attrs]) => {
      document.querySelectorAll(`[data-attr-key="${key}"]`).forEach(el => {
        Object.entries(attrs).forEach(([attr, val]) => {
          el.setAttribute(attr, val);
          if (attr === 'href' && el.tagName === 'A' && val.startsWith('mailto:')) {
             el.innerText = val.replace('mailto:', '');
          }
        });
      });
    });
  }

  if (data.html) {
    Object.entries(data.html).forEach(([key, value]) => {
       document.querySelectorAll(`[data-html="${key}"]`).forEach(el => {
         el.innerHTML = value;
       });
    });
  }

  if (data.lists) {
    Object.entries(data.lists).forEach(([key, items]) => {
      document.querySelectorAll(`[data-list="${key}"]`).forEach(el => {
        if (Array.isArray(items)) {
          el.innerHTML = items.map(item => `<li>${item}</li>`).join('');
        }
      });
    });
  }

  const pathParts = window.location.pathname.split('/');
  let currentPage = pathParts[pathParts.length - 1] || 'index.html';
  if (!currentPage.endsWith('.html')) currentPage += '.html';

  if (data.dynamic_overrides && data.dynamic_overrides[currentPage]) {
    Object.entries(data.dynamic_overrides[currentPage]).forEach(([selector, changes]) => {
      try {
        const el = document.querySelector(selector);
        if (el) {
          if (changes.text !== undefined) el.innerText = changes.text;
          if (changes.href !== undefined) el.setAttribute('href', changes.href);
          if (changes.src !== undefined) el.setAttribute('src', changes.src);
          if (changes.style) {
            Object.entries(changes.style).forEach(([prop, val]) => {
              el.style.setProperty(prop, val, 'important');
            });
          }
          if (changes.move === 'up' && el.previousElementSibling) {
            el.parentNode.insertBefore(el, el.previousElementSibling);
          } else if (changes.move === 'down' && el.nextElementSibling) {
            el.parentNode.insertBefore(el.nextElementSibling, el);
          }
        }
      } catch (e) {}
    });
  }

  if (data.settings && window.updateAndys) {
     window.updateAndys({
        count: data.settings.andyCount,
        color: data.settings.andyColor,
        visible: data.settings.andyVisible
     });
  }

  if (data.theme) {
    Object.entries(data.theme).forEach(([prop, val]) => {
      document.documentElement.style.setProperty('--' + prop, val);
    });
  }
}

function getInitialTheme() {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
}

function ensureThemeToggle() {
  const navList = document.querySelector('.site-header .navbar-nav');
  if (!navList) return;
  if (navList.querySelector('.theme-toggle')) return;

  const li = document.createElement('li');
  li.className = 'nav-item d-flex align-items-center me-2';
  li.innerHTML = `
    <button type="button" class="theme-toggle" aria-label="Cambiar tema" title="Cambiar tema">
      <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"></path>
      </svg>
      <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="M4.93 4.93l1.41 1.41"></path>
        <path d="M17.66 17.66l1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="M4.93 19.07l1.41-1.41"></path>
        <path d="M17.66 6.34l1.41-1.41"></path>
      </svg>
    </button>
  `.trim();

  navList.insertBefore(li, navList.firstChild);
  li.querySelector('.theme-toggle').addEventListener('click', toggleTheme);
}

async function loadContent() {
  applyTheme(getInitialTheme());
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    ensureThemeToggle();
  } else {
    document.addEventListener('DOMContentLoaded', ensureThemeToggle, { once: true });
  }

  const fetchOptions = { cache: 'no-cache' };
  
  const safeFetch = async (url) => {
    try {
      const fullUrl = url + '?t=' + Date.now();
      const res = await fetch(fullUrl, fetchOptions);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Skip: " + url);
    }
    return null;
  };

  const siteData = await safeFetch('/content/site.json');
  if (siteData) await applyContent(siteData);

  if (window.location.pathname.includes('privacy')) {
    const privacyData = await safeFetch('/content/privacy.json');
    if (privacyData) await applyContent(privacyData);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadContent);
} else {
  loadContent();
}
