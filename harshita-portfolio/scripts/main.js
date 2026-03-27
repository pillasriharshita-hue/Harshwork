/* ============================================================
   MAIN.JS — Top bar time, nav scroll reveal, active links, reveal
   ============================================================ */

'use strict';

/* ─── Live clock in topbar ─── */
(function initTopBarTime() {
  const el = document.getElementById('topBarTime');
  if (!el) return;
  function tick() {
    const now = new Date();
    const h = now.getHours();
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = String(h % 12 || 12).padStart(2, '0');
    el.textContent = `${h12}:${m}:${s} ${ampm}`;
  }
  tick();
  setInterval(tick, 1000);
})();

/* ─── scrollToSection(selector) ─── */
window.scrollToSection = function scrollToSection(selector) {
  const target = document.querySelector(selector);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
  window.scrollTo({ top, behavior: 'smooth' });
};

/* ─── Nav appears on scroll, topbar hides ─── */
(function initScrollNav() {
  const nav = document.getElementById('mainNav');
  const topbar = document.getElementById('topBar');
  if (!nav) return;

  const SCROLL_THRESHOLD = 300; // px before nav appears
  let ticking = false;

  function onScroll() {
    const scrollY = window.pageYOffset;

    if (scrollY > SCROLL_THRESHOLD) {
      nav.classList.remove('nav--hidden');
      nav.classList.add('nav--visible');
      if (topbar) topbar.classList.add('topbar--hidden');
    } else {
      nav.classList.add('nav--hidden');
      nav.classList.remove('nav--visible');
      if (topbar) topbar.classList.remove('topbar--hidden');
    }
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  onScroll();
})();

/* ─── Nav link active state on scroll ─── */
(function initNavActiveLinks() {
  const sections = ['home', 'work', 'other-works', 'contact'];
  const links = document.querySelectorAll('.nav__link[href^="#"]');
  if (!links.length) return;

  function updateActive() {
    let current = '';
    const scrollY = window.pageYOffset;
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (el.offsetTop - 120 <= scrollY) {
        current = id;
      }
    });
    links.forEach((link) => {
      link.classList.remove('nav__link--active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('nav__link--active');
      }
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActive();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  updateActive();
})();

/* ─── Staggered reveal on scroll ─── */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll(
    '.card, .mini-card:not(.mini-card--hidden), .works__head, .other__title, .footer'
  );
  if (!revealEls.length) return;

  revealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s cubic-bezier(0.4,0,0.2,1) ${i * 0.06}s`;
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
})();
