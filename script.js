
(() => {
  'use strict';

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // 1. Scroll reveal animations
  const revealItems = document.querySelectorAll(
    '.reveal, main section[id]:not(#home)'
  );

  if ('IntersectionObserver' in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  // 2. Navigation active state
  const navLinks = [
    ...document.querySelectorAll('.rail nav a[href^="#"]')
  ];

  const sections = [
    ...document.querySelectorAll('main section[id]')
  ];

  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          navLinks.forEach(link => {
            const isActive = link.hash === `#${entry.target.id}`;

            link.classList.toggle('active', isActive);

            if (isActive) {
              link.setAttribute('aria-current', 'location');
            } else {
              link.removeAttribute('aria-current');
            }
          });
        });
      },
      {
        rootMargin: '-35% 0px -55% 0px',
        threshold: 0
      }
    );

    sections.forEach(section => navObserver.observe(section));
  }

  // 3. Smooth internal navigation
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const hash = link.getAttribute('href');

      if (!hash || hash === '#') return;

      const target = document.getElementById(
        hash.substring(1)
      );

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });

      if (window.location.hash !== hash) {
        history.replaceState(null, '', hash);
      }
    });
  });

  // 4. Intro screen accessibility
  const introScreen = document.getElementById('introScreen');

  if (introScreen) {
    introScreen.setAttribute('aria-label', 'Portfolio introduction');
  }

  // 5. Update copyright year automatically
  const yearElements = document.querySelectorAll('[data-current-year]');

  yearElements.forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  // 6. Initial navigation state
  const currentHash = window.location.hash;

  if (currentHash) {
    const activeLink = navLinks.find(link => link.hash === currentHash);

    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

})();
