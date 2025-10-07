(function () {
  const body = document.body;
  const nav = document.querySelector('.main-nav ul');
  const toggle = document.querySelector('.menu-toggle');
  const menuLinks = document.querySelectorAll('.main-nav a');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isExpanded));
      nav.classList.toggle('is-open');
      toggle.querySelector('.sr-only').textContent = !isExpanded ? 'Fermer le menu' : 'Ouvrir le menu';
      body.classList.toggle('menu-open');
    });

    menuLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.querySelector('.sr-only').textContent = 'Ouvrir le menu';
          body.classList.remove('menu-open');
        }
      });
    });

    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.querySelector('.sr-only').textContent = 'Ouvrir le menu';
        body.classList.remove('menu-open');
        toggle.focus();
      }
    });
  }

  const revealElements = document.querySelectorAll('[data-reveal]');
  if (revealElements.length && !prefersReducedMotion.matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('reveal-visible'));
  }

  const parallaxWrappers = document.querySelectorAll('.parallax-wrapper');

  const updateParallax = () => {
    if (prefersReducedMotion.matches) return;
    const scrollY = window.scrollY;
    parallaxWrappers.forEach((wrapper) => {
      const rect = wrapper.getBoundingClientRect();
      const offset = (rect.top + scrollY) * 0.05;
      const clamped = Math.max(-30, Math.min(30, offset - scrollY * 0.08));
      wrapper.style.setProperty('--parallax-offset', clamped.toFixed(2));
    });
  };

  if (parallaxWrappers.length) {
    updateParallax();
    window.addEventListener('scroll', updateParallax, { passive: true });
    window.addEventListener('resize', updateParallax);
  }

  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
})();
