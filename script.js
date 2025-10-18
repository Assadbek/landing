/* Roommate Finder Landing Page Scripts */

(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.querySelector('.primary-nav');
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Smooth scroll for data-scroll links
  document.querySelectorAll('[data-scroll]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Reveal on scroll
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  // Parallax effect (very subtle)
  const layers = Array.from(document.querySelectorAll('.parallax-layer'));
  const applyParallax = () => {
    if (prefersReducedMotion) return;
    const y = window.scrollY || window.pageYOffset;
    layers.forEach((layer, i) => {
      const depth = (i + 1) * 0.03; // subtle
      layer.style.transform = `translate3d(0, ${y * depth}px, 0)`;
    });
  };
  applyParallax();
  window.addEventListener('scroll', applyParallax, { passive: true });

  // Also react to mouse movement for hero area
  const hero = document.querySelector('.hero');
  if (hero && !prefersReducedMotion) {
    hero.addEventListener('pointermove', (e) => {
      const rect = hero.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width - 0.5;
      const my = (e.clientY - rect.top) / rect.height - 0.5;
      layers.forEach((layer, i) => {
        const depth = (i + 1) * 6; // px offset
        layer.style.transform = `translate3d(${mx * depth}px, ${my * depth}px, 0)`;
      });
    });
    hero.addEventListener('pointerleave', () => {
      layers.forEach((layer) => (layer.style.transform = 'translate3d(0,0,0)'));
    });
  }

  // Lazy load Yandex Map iframe
  const mapWrapper = document.getElementById('yandex-map');
  if (mapWrapper) {
    const loadMap = () => {
      if (mapWrapper.dataset.loaded === 'true') return;
      const src = mapWrapper.getAttribute('data-map-src');
      if (!src) return;
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.loading = 'lazy';
      iframe.decoding = 'async';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.title = 'Yandex Map - Roommate search by location';
      mapWrapper.innerHTML = '';
      mapWrapper.appendChild(iframe);
      mapWrapper.dataset.loaded = 'true';
    };

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadMap();
            io.disconnect();
          }
        });
      }, { rootMargin: '200px 0px' });
      io.observe(mapWrapper);
    } else {
      loadMap();
    }
  }

  // Email forms (basic validation + demo success)
  function handleEmailForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    const input = form.querySelector('input[type="email"]');
    const message = form.querySelector('.form-message');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = (input.value || '').trim();
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        message.textContent = 'Please enter a valid email address.';
        input.focus();
        return;
      }
      message.textContent = 'Submitting...';
      setTimeout(() => {
        try {
          localStorage.setItem('roommatefinder:email', email);
        } catch {}
        message.textContent = 'Thanks! You\'re on the list.';
        form.reset();
      }, 700);
    });
  }

  handleEmailForm('hero-email-form');
  handleEmailForm('cta-email-form');

  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
