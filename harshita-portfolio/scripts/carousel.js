/* ============================================================
   CAROUSEL.JS — Other Works carousel
   ─────────────────────────────────────────────────────────
   HTML uses: slideCarousel(-1/1) and goToSlide(n)
   Desktop ≥1024: show 3 at a time → 2 pages (3+1)
   Tablet  ≥768:  show 2 at a time → 2 pages
   Mobile  <768:  show 1 at a time → 4 pages
   ============================================================ */

'use strict';

(function initCarousel() {
  const grid    = document.getElementById('otherGrid');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');

  if (!grid) return;

  const allCards = Array.from(grid.querySelectorAll('.mini-card'));
  let currentPage  = 0;
  let cardsPerPage = getCardsPerPage();
  let totalPages   = allCards.length; // Each page shifts by 1 card, looping

  /* ── How many cards to show per breakpoint ───────────────── */
  function getCardsPerPage() {
    if (window.innerWidth >= 1200) return 3;
    if (window.innerWidth >= 900)  return 2;
    return 1;
  }

  /* ── Render current page (wrapping/looping) ──────────────── */
  function render() {
    const total = allCards.length;

    // Hide all first
    allCards.forEach((card) => {
      card.classList.add('mini-card--hidden');
      card.setAttribute('aria-hidden', 'true');
    });

    // Show cardsPerPage cards starting from currentPage, wrapping around
    for (let i = 0; i < cardsPerPage; i++) {
      const idx = (currentPage + i) % total;
      allCards[idx].classList.remove('mini-card--hidden');
      allCards[idx].removeAttribute('aria-hidden');
    }

    // Update prev / next button states — always enabled for continuous loop
    if (prevBtn) prevBtn.disabled = false;
    if (nextBtn) nextBtn.disabled = false;

    // Update dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.other__dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('other__dot--active', i === currentPage);
        dot.setAttribute('aria-selected', i === currentPage ? 'true' : 'false');
      });
    }

    // Rebuild dots if page count has changed
    syncDots();
  }

  /* ── Sync dots to current totalPages ─────────────────────── */
  function syncDots() {
    if (!dotsContainer) return;
    const currentDots = dotsContainer.querySelectorAll('.other__dot');
    if (currentDots.length === totalPages) return; // already correct

    // Rebuild
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('button');
      dot.className = 'other__dot' + (i === currentPage ? ' other__dot--active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-selected', i === currentPage ? 'true' : 'false');
      dot.setAttribute('aria-label', `Page ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  /* ── Public: called by HTML onclick ─────────────────────── */

  /**
   * slideCarousel(dir) — called by prev/next arrow buttons
   * @param {number} dir  -1 for previous, +1 for next
   */
  window.slideCarousel = function(dir) {
    let newPage = currentPage + dir;
    // Wrap around: continuous loop
    if (newPage < 0) {
      newPage = totalPages - 1;
    } else if (newPage >= totalPages) {
      newPage = 0;
    }
    currentPage = newPage;
    render();
  };

  /**
   * goToSlide(n) — called by dot buttons
   * @param {number} n  zero-based page index
   */
  window.goToSlide = function(n) {
    // Allow any page within bounds
    if (n >= 0 && n < totalPages) {
      currentPage = n;
      render();
    }
  };

  /* ── Touch / swipe support ───────────────────────────────── */
  let touchStartX = 0;

  grid.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  grid.addEventListener('touchend', (e) => {
    const delta = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(delta) > 50) {
      if (delta > 0) window.slideCarousel(1);
      else           window.slideCarousel(-1);
    }
  }, { passive: true });

  /* ── Recalculate on resize ───────────────────────────────── */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const newCpp = getCardsPerPage();
      if (newCpp !== cardsPerPage) {
        cardsPerPage = newCpp;
        totalPages   = allCards.length;
        currentPage  = 0;
        render();
      }
    }, 200);
  });

  /* ── Init ────────────────────────────────────────────────── */
  render();
})();

/* ============================================================
   RESEARCH CAROUSEL — Independent carousel for research papers
   ============================================================ */

(function initResearchCarousel() {
  const grid    = document.getElementById('researchGrid');
  const prevBtn = document.getElementById('researchPrev');
  const nextBtn = document.getElementById('researchNext');
  const dotsContainer = document.getElementById('researchDots');

  if (!grid) return;

  const allCards = Array.from(grid.querySelectorAll('.research__card'));
  let currentPage  = 0;
  let cardsPerPage = 1; // Always show 1 paper at a time
  let totalPages   = Math.max(1, Math.ceil(allCards.length / cardsPerPage));

  /* ── Render current page ─────────────────────────────────── */
  function render() {
    const start = currentPage * cardsPerPage;
    const end   = start + cardsPerPage;

    allCards.forEach((card, i) => {
      if (i >= start && i < end) {
        card.classList.remove('research__card--hidden');
        card.removeAttribute('aria-hidden');
      } else {
        card.classList.add('research__card--hidden');
        card.setAttribute('aria-hidden', 'true');
      }
    });

    // Update prev / next button states — always enabled for continuous loop
    if (prevBtn) prevBtn.disabled = false;
    if (nextBtn) nextBtn.disabled = false;

    // Update dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.research__dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('research__dot--active', i === currentPage);
        dot.setAttribute('aria-selected', i === currentPage ? 'true' : 'false');
      });
    }

    // Rebuild dots if page count has changed
    syncDots();
  }

  /* ── Sync dots to current totalPages ─────────────────────── */
  function syncDots() {
    if (!dotsContainer) return;
    const currentDots = dotsContainer.querySelectorAll('.research__dot');
    if (currentDots.length === totalPages) return; // already correct

    // Rebuild
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('button');
      dot.className = 'research__dot' + (i === currentPage ? ' research__dot--active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-selected', i === currentPage ? 'true' : 'false');
      dot.setAttribute('aria-label', `Paper ${i + 1}`);
      dot.addEventListener('click', () => goToResearchSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  /* ── Public: called by HTML onclick ─────────────────────── */

  /**
   * slideResearch(dir) — called by prev/next arrow buttons
   * @param {number} dir  -1 for previous, +1 for next
   */
  window.slideResearch = function(dir) {
    let newPage = currentPage + dir;
    // Wrap around: continuous loop
    if (newPage < 0) {
      newPage = totalPages - 1;
    } else if (newPage >= totalPages) {
      newPage = 0;
    }
    currentPage = newPage;
    render();
  };

  /**
   * goToResearchSlide(n) — called by dot buttons
   * @param {number} n  zero-based page index
   */
  window.goToResearchSlide = function(n) {
    // Allow any page within bounds
    if (n >= 0 && n < totalPages) {
      currentPage = n;
      render();
    }
  };

  /* ── Touch / swipe support ───────────────────────────────── */
  let touchStartX = 0;

  grid.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  grid.addEventListener('touchend', (e) => {
    const delta = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(delta) > 50) {
      if (delta > 0) window.slideResearch(1);
      else           window.slideResearch(-1);
    }
  }, { passive: true });

  /* ── Init ────────────────────────────────────────────────── */
  render();
})();
