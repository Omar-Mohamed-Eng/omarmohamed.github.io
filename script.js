'use strict';

/* ============ THEME TOGGLE ============ */

const root = document.documentElement;
const themeToggle = document.querySelector('[data-theme-toggle]');
const THEME_KEY = 'portfolio-theme';

function applyTheme(theme) {
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
    themeToggle.setAttribute('aria-pressed', 'true');
  } else {
    root.removeAttribute('data-theme');
    themeToggle.setAttribute('aria-pressed', 'false');
  }
}

// Respect saved preference, else system preference, else dark default.
let savedTheme = null;
try { savedTheme = window.localStorage.getItem(THEME_KEY); } catch (e) { /* storage unavailable */ }

if (savedTheme) {
  applyTheme(savedTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
  applyTheme('light');
}

themeToggle.addEventListener('click', function () {
  const isLight = root.getAttribute('data-theme') === 'light';
  const next = isLight ? 'dark' : 'light';
  applyTheme(next);
  try { window.localStorage.setItem(THEME_KEY, next); } catch (e) { /* storage unavailable */ }
});


/* ============ SCROLL-SPY NAVIGATION ============ */

const navLinks = document.querySelectorAll('[data-nav-link]');
const sections = document.querySelectorAll('[data-section]');

function setActiveLink(id) {
  navLinks.forEach(function (link) {
    const isActive = link.getAttribute('href') === '#' + id;
    link.classList.toggle('active', isActive);
  });
}

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(function (section) { observer.observe(section); });
}
