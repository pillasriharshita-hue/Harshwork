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

/* ─── Hamburger menu toggle (mobile only) ─── */
(function initHamburgerMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMobile = document.getElementById('navMobile');
  const navLinks = navMobile ? navMobile.querySelectorAll('.nav-mobile__link') : [];
  
  if (!hamburgerBtn || !navMobile) return;

  // Toggle menu on hamburger click
  hamburgerBtn.addEventListener('click', () => {
    const isOpen = navMobile.classList.contains('active');
    if (isOpen) {
      navMobile.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    } else {
      navMobile.classList.add('active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
    }
  });

  // Close menu on link click
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMobile.classList.contains('active')) {
      navMobile.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu on window resize (if resizing back to desktop)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 599) {
        navMobile.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    }, 250);
  });
})();

/* ─── Calendly popup trigger (popup modal approach) ─── */
window.bookCall = function bookCall() {
  const modal = document.getElementById('calendlyModal');
  const content = document.getElementById('calendlyContent');
  const closeBtn = document.getElementById('calendlyClose');
  
  if (!modal) {
    console.error('Calendly modal element not found');
    return;
  }

  // Clear previous content
  content.innerHTML = '';
  
  // Create inline calendar embed
  const calendarDiv = document.createElement('div');
  calendarDiv.className = 'calendly-inline-widget';
  calendarDiv.setAttribute('data-url', 'https://calendly.com/pillasriharshita/30min?hide_event_type_details=1&hide_gdpr_banner=1');
  content.appendChild(calendarDiv);
  
  // Show modal
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  
  // Reload Calendly widget to render the new embed
  if (typeof Calendly !== 'undefined') {
    Calendly.initInlineWidget({
      url: 'https://calendly.com/pillasriharshita/30min?hide_event_type_details=1&hide_gdpr_banner=1',
      parentElement: calendarDiv
    });
  }
  
  // Close modal on close button click
  if (closeBtn && !closeBtn.hasListener) {
    closeBtn.addEventListener('click', closeCalendlyModal);
    closeBtn.hasListener = true;
  }
  
  // Close modal on background click
  if (!modal.hasBackdropListener) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeCalendlyModal();
      }
    });
    modal.hasBackdropListener = true;
  }
  
  // Close modal on ESC key
  const escapeListener = (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeCalendlyModal();
      document.removeEventListener('keydown', escapeListener);
    }
  };
  document.addEventListener('keydown', escapeListener);
};

/* ─── Close Calendly modal ─── */
window.closeCalendlyModal = function closeCalendlyModal() {
  const modal = document.getElementById('calendlyModal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
};
