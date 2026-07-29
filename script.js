const THEME_STORAGE_KEY = 'jsg-portfolio-theme';
const LANG_STORAGE_KEY = 'jsg-portfolio-lang';

(() => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  const navLinks = nav.querySelectorAll('.nav-link');
  const themeToggle = document.getElementById('theme-toggle');
  const langToggle = document.getElementById('lang-toggle');
  const translatableEls = document.querySelectorAll('[data-es][data-en]');

  const applyLanguage = (lang) => {
    document.documentElement.lang = lang;
    translatableEls.forEach((el) => {
      el.textContent = el.getAttribute(lang === 'en' ? 'data-en' : 'data-es');
    });
    langToggle.textContent = lang === 'en' ? 'ES' : 'EN';
    langToggle.setAttribute('data-lang', lang);
    langToggle.setAttribute('aria-label', lang === 'en' ? 'Cambiar a español' : 'Switch to English');
  };

  const savedLang = localStorage.getItem(LANG_STORAGE_KEY) || 'es';
  applyLanguage(savedLang);

  langToggle.addEventListener('click', () => {
    const nextLang = document.documentElement.lang === 'en' ? 'es' : 'en';
    localStorage.setItem(LANG_STORAGE_KEY, nextLang);
    applyLanguage(nextLang);
  });

  const applyThemeState = (isDark) => {
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  };

  applyThemeState(document.body.classList.contains('dark-mode'));

  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
    applyThemeState(isDark);
  });

  const closeNav = () => {
    nav.classList.remove('is-open');
    navToggle.classList.remove('is-active');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => link.addEventListener('click', closeNav));

  document.getElementById('year').textContent = new Date().getFullYear();

  // Efecto de brillo interactivo 3D en tarjetas[cite: 7]
  document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.card, .architecture-card');
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
});