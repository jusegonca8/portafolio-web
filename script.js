import { animate, inView, stagger } from 'https://cdn.jsdelivr.net/npm/motion@12.43.0/+esm';

const THEME_STORAGE_KEY = 'jsg-portfolio-theme';
const LANG_STORAGE_KEY = 'jsg-portfolio-lang';

(() => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
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

  const applyThemeState = (isLight) => {
    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeToggle.setAttribute('aria-label', isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
  };

  applyThemeState(document.body.classList.contains('light-mode'));

  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem(THEME_STORAGE_KEY, isLight ? 'light' : 'dark');
    applyThemeState(isLight);
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

  // Carrusel de Proyectos Destacados: navegación por botones y dots
  const carouselTrack = document.querySelector('[data-carousel-track]');
  if (carouselTrack) {
    const cards = Array.from(carouselTrack.children);
    const prevBtn = document.querySelector('[data-carousel-prev]');
    const nextBtn = document.querySelector('[data-carousel-next]');
    const dotsContainer = document.querySelector('[data-carousel-dots]');

    const dots = cards.map((card, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Ir al proyecto ${index + 1} de ${cards.length}`);
      dot.addEventListener('click', () => {
        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
      dotsContainer.appendChild(dot);
      return dot;
    });

    cards.forEach((card) => {
      card.addEventListener('click', (e) => {
        if (!card.classList.contains('is-active') && !e.target.closest('a, button')) {
          card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      });
    });

    // El padding lateral se calcula en JS para que la primera y última
    // tarjeta también puedan quedar perfectamente centradas al hacer scroll.
    const updateCarouselPadding = () => {
      const trackWidth = carouselTrack.clientWidth;
      const cardWidth = cards[0].getBoundingClientRect().width;
      const sidePad = Math.max((trackWidth - cardWidth) / 2, 24);
      carouselTrack.style.setProperty('--carousel-pad', `${sidePad}px`);
    };

    const getActiveIndex = () => {
      const trackRect = carouselTrack.getBoundingClientRect();
      const trackCenter = trackRect.left + trackRect.width / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;
      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(cardCenter - trackCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      return closestIndex;
    };

    const syncCarouselState = () => {
      const activeIndex = getActiveIndex();
      cards.forEach((card, index) => {
        card.classList.toggle('is-active', index === activeIndex);
      });
      dots.forEach((dot, index) => {
        dot.classList.toggle('is-active', index === activeIndex);
        dot.setAttribute('aria-selected', String(index === activeIndex));
      });
      if (prevBtn) prevBtn.disabled = activeIndex === 0;
      if (nextBtn) nextBtn.disabled = activeIndex === cards.length - 1;
    };

    const goToStep = (direction) => {
      const nextIndex = Math.min(Math.max(getActiveIndex() + direction, 0), cards.length - 1);
      cards[nextIndex].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    };

    prevBtn?.addEventListener('click', () => goToStep(-1));
    nextBtn?.addEventListener('click', () => goToStep(1));

    let scrollTimeout;
    carouselTrack.addEventListener('scroll', () => {
      window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(syncCarouselState, 100);
    });

    window.addEventListener('resize', () => {
      const activeBeforeResize = getActiveIndex();
      updateCarouselPadding();
      cards[activeBeforeResize].scrollIntoView({ behavior: 'auto', inline: 'center', block: 'nearest' });
      syncCarouselState();
    });

    updateCarouselPadding();
    syncCarouselState();
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EASE = [0.16, 1, 0.3, 1];

  if (!prefersReducedMotion) {
    // Efecto de brillo interactivo 3D en tarjetas, siguiendo al cursor
    document.addEventListener('mousemove', (e) => {
      document.querySelectorAll('.card, .architecture-card').forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    });

    // Entrada escalonada del Hero
    const heroEls = [
      '.hero-eyebrow',
      '.hero-title',
      '.hero-role',
      '.hero-pitch',
      '.hero-actions',
      '.hero-location',
    ]
      .map((selector) => document.querySelector(selector))
      .filter(Boolean);

    animate(
      heroEls,
      { opacity: [0, 1], y: [24, 0] },
      { duration: 0.6, delay: stagger(0.12), ease: EASE }
    );

    // Aparición escalonada al hacer scroll para grupos repetidos
    // (tarjetas de Logros/Proyectos/Toolkit, línea de tiempo, educación)
    const revealGroups = [
      { container: '.cards-grid', items: ':scope > *' },
      { container: '.projects-scroll', items: ':scope > *' },
      { container: '.timeline', items: ':scope > .timeline-item' },
      { container: '.education-grid', items: ':scope > *' },
    ];

    revealGroups.forEach(({ container, items }) => {
      document.querySelectorAll(container).forEach((group) => {
        const children = group.querySelectorAll(items);
        if (!children.length) return;

        const stopWatching = inView(
          group,
          () => {
            animate(
              children,
              { opacity: [0, 1], y: [24, 0] },
              { duration: 0.6, delay: stagger(0.08), ease: EASE }
            );
            stopWatching();
          },
          { amount: 0.2 }
        );
      });
    });
  }
});
