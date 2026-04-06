(function () {
  // Apply saved theme immediately (before DOM paint)
  var saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);

  document.addEventListener('DOMContentLoaded', function () {
    var toggles = document.querySelectorAll('.fnav__theme-switch .toggle');
    toggles.forEach(function (t) {
      t.checked = saved === 'light';
      t.addEventListener('change', function () {
        var theme = t.checked ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        // Sync all toggles on page
        document.querySelectorAll('.fnav__theme-switch .toggle').forEach(function (other) {
          other.checked = theme === 'light';
        });
      });
    });
  });
})();
