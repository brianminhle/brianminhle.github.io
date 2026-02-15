(function () {
  const STORAGE_KEY = 'theme';
  const DARK = 'dark';
  const LIGHT = 'light';

  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    toggle.setAttribute('aria-label', theme === DARK ? 'Switch to light mode' : 'Switch to dark mode');
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function getPreferredTheme() {
    const stored = getStoredTheme();
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
  }

  toggle.addEventListener('click', function () {
    const current = html.getAttribute('data-theme') || LIGHT;
    setTheme(current === DARK ? LIGHT : DARK);
  });

  setTheme(getPreferredTheme());
})();

(function () {
  const allContents = document.querySelectorAll('.abstract-content');
  document.querySelectorAll('.abstract-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const id = this.getAttribute('data-abstract');
      const content = document.getElementById(id);
      if (content) {
        const isCollapsed = content.classList.contains('abstract-collapsed');
        allContents.forEach(function (c) {
          c.classList.add('abstract-collapsed');
          c.setAttribute('aria-hidden', 'true');
        });
        document.querySelectorAll('.abstract-toggle').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
        if (isCollapsed) {
          content.classList.remove('abstract-collapsed');
          content.setAttribute('aria-hidden', 'false');
          btn.setAttribute('aria-expanded', 'true');
        }
      }
    });
  });
})();
