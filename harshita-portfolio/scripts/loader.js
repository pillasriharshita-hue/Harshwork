window.addEventListener('load', function () {
  var loader = document.getElementById('pageLoader');
  if (!loader) return;
  loader.classList.add('hidden');
  setTimeout(function () { loader.style.display = 'none'; }, 550);
});
