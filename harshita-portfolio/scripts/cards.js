/* ============================================================
   CARDS.JS — Light/dark toggle for cards (kept for future use)
   ============================================================ */

'use strict';

window.toggleCard = function(id) {
  const card = document.getElementById(id);
  if (!card) return;
  card.classList.toggle('card--light');
};

window.toggleMini = function(id) {
  const card = document.getElementById(id);
  if (!card) return;
  card.classList.toggle('mini-card--light');
};
