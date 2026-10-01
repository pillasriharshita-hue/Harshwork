/* Shared floating-nav behaviour: mobile menu, scrolled state, Calendly fallback */
(function () {
  var nav = document.querySelector('.fnav');
  var burger = document.querySelector('.fnav__burger');
  var menu = document.querySelector('.fnav__mobile');

  function setMenu(open) {
    if (!burger || !menu) return;
    burger.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (burger && menu) {
    burger.addEventListener('click', function () {
      setMenu(!menu.classList.contains('open'));
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        setMenu(false);
        burger.focus();
      }
    });
  }

  if (nav) {
    var onScroll = function () { nav.classList.toggle('fnav--scrolled', window.scrollY > 60); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Pages without their own Calendly modal fall back to opening the booking page. */
  if (typeof window.bookCall !== 'function') {
    window.bookCall = function () {
      window.open('https://calendly.com/pillasriharshita/30min', '_blank', 'noopener');
    };
  }
})();
