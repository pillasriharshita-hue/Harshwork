/* ============================================================
   CAROUSEL.JS — Gallery6 horizontal-scroll carousel
   ─────────────────────────────────────────────────────────
   Embla-style drag + arrow navigation for "Other Works"
   ============================================================ */

'use strict';

(function initGallery6() {
  const viewport = document.getElementById('g6Viewport');
  const track    = document.getElementById('g6Track');
  const prevBtn  = document.getElementById('g6Prev');
  const nextBtn  = document.getElementById('g6Next');

  if (!track || !viewport) return;

  const slides = Array.from(track.querySelectorAll('.gallery6__slide'));
  if (!slides.length) return;

  let currentIndex = 0;

  /* ── Measure slide width + gap ──────────────────────────── */
  function getSlideStep() {
    const slide = slides[0];
    const style = getComputedStyle(track);
    const gap   = parseFloat(style.gap) || 20;
    return slide.offsetWidth + gap;
  }

  /* ── Scroll to a given index ────────────────────────────── */
  function scrollTo(index) {
    const maxIndex = slides.length - 1;
    currentIndex = Math.max(0, Math.min(index, maxIndex));

    const step = getSlideStep();
    const maxScroll = track.scrollWidth - viewport.offsetWidth;
    const targetScroll = Math.min(currentIndex * step, maxScroll);

    track.style.transform = `translateX(-${targetScroll}px)`;
    updateButtons();
  }

  /* ── Update arrow disabled states ───────────────────────── */
  function updateButtons() {
    const step = getSlideStep();
    const maxScroll = track.scrollWidth - viewport.offsetWidth;
    const currentScroll = currentIndex * step;

    if (prevBtn) prevBtn.disabled = currentIndex <= 0;
    if (nextBtn) nextBtn.disabled = currentScroll >= maxScroll;
  }

  /* ── Arrow clicks ───────────────────────────────────────── */
  if (prevBtn) prevBtn.addEventListener('click', () => scrollTo(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => scrollTo(currentIndex + 1));

  /* ── Drag / swipe support ───────────────────────────────── */
  let isDragging = false;
  let startX     = 0;
  let startScroll = 0;
  let dragDelta  = 0;

  function onPointerDown(e) {
    isDragging = true;
    startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    startScroll = currentIndex * getSlideStep();
    dragDelta = 0;
    track.classList.add('is-dragging');
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    dragDelta = startX - clientX;
    const maxScroll = track.scrollWidth - viewport.offsetWidth;
    const newScroll = Math.max(0, Math.min(startScroll + dragDelta, maxScroll));
    track.style.transform = `translateX(-${newScroll}px)`;
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('is-dragging');

    const step = getSlideStep();
    if (Math.abs(dragDelta) > step * 0.2) {
      if (dragDelta > 0) scrollTo(currentIndex + 1);
      else scrollTo(currentIndex - 1);
    } else {
      scrollTo(currentIndex);
    }
  }

  // Mouse events
  track.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  // Touch events
  track.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);

  // Prevent link clicks after drag
  track.addEventListener('click', (e) => {
    if (Math.abs(dragDelta) > 5) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  /* ── Recalculate on resize ──────────────────────────────── */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => scrollTo(currentIndex), 200);
  });

  /* ── Init ───────────────────────────────────────────────── */
  updateButtons();
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
