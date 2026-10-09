/* Other works: build filter tabs from the tile categories and filter the grid */
(function () {
  var section = document.getElementById('other-works');
  if (!section) return;
  var filters = section.querySelector('.ow__filters');
  var tiles = Array.prototype.slice.call(section.querySelectorAll('.ow-tile'));

  var cats = [];
  tiles.forEach(function (t) {
    var c = t.getAttribute('data-category');
    if (c && cats.indexOf(c) === -1) cats.push(c);
  });

  ['All'].concat(cats).forEach(function (name, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'ow__filter' + (i === 0 ? ' is-active' : '');
    b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
    b.textContent = name;
    b.addEventListener('click', function () {
      filters.querySelectorAll('.ow__filter').forEach(function (f) {
        var on = f === b;
        f.classList.toggle('is-active', on);
        f.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      tiles.forEach(function (t) {
        t.hidden = name !== 'All' && t.getAttribute('data-category') !== name;
      });
    });
    filters.appendChild(b);
  });

  var grid = section.querySelector('.ow__grid');
  function step(dir) {
    var tile = tiles.filter(function (t) { return !t.hidden; })[0];
    var w = tile ? tile.getBoundingClientRect().width + 20 : 400;
    grid.scrollBy({ left: dir * w, behavior: 'smooth' });
  }
  var prev = document.getElementById('owPrev');
  var next = document.getElementById('owNext');
  if (prev) prev.addEventListener('click', function () { step(-1); });
  if (next) next.addEventListener('click', function () { step(1); });
})();
