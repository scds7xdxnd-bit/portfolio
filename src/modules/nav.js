import { switchToLang } from '../lib/i18n.js';
import { currentLang } from '../data/i18n.js';

function initSeoulClock() {
  const el = document.getElementById('seoul-time');
  if (!el) return;
  function tick() {
    const seoul = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
    const h = seoul.getHours();
    const m = seoul.getMinutes().toString().padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = (h % 12 || 12).toString().padStart(2, '0');
    el.textContent = `${h12}:${m} ${ampm}`;
  }
  tick();
  setInterval(tick, 1000);
}

function initMobileNavMenu() {
  const hamburger = document.getElementById('nav-hamburger');
  const panel     = document.getElementById('mobile-nav-panel');
  const backdrop  = document.getElementById('mobile-nav-backdrop');
  const mobileLangBtn = document.getElementById('mobile-lang-toggle');
  if (!hamburger || !panel || !backdrop) return;

  function openMenu() {
    hamburger.setAttribute('aria-expanded', 'true');
    panel.classList.add('is-open');
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    const firstLink = panel.querySelector('.mobile-nav__link');
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    panel.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  hamburger.addEventListener('click', () => {
    panel.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  // Close on nav link click (also smooth-scroll for hash links)
  panel.querySelectorAll('.mobile-nav__link').forEach(link => {
    const href = link.getAttribute('href');
    link.addEventListener('click', e => {
      closeMenu();
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Close on backdrop click or Escape
  backdrop.addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) closeMenu();
  });

  // Sync mobile lang toggle with main lang toggle
  if (mobileLangBtn) {
    mobileLangBtn.addEventListener('click', () => {
      document.getElementById('lang-toggle').click();
    });
  }
}

function initLangToggle() {
  const btn = document.getElementById('lang-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    if (currentLang === 'en') switchToLang('zh');
    else if (currentLang === 'zh') switchToLang('ko');
    else switchToLang('en');
  });
}

function initNavDropdown() {
  const dd = document.querySelector('.site-nav__dropdown');
  if (!dd) return;
  const trigger = dd.querySelector('.site-nav__dropdown-trigger');
  const menu = dd.querySelector('.site-nav__dropdown-menu');
  if (!trigger || !menu) return;

  function close() {
    menu.setAttribute('hidden', '');
    trigger.setAttribute('aria-expanded', 'false');
  }
  function open() {
    menu.removeAttribute('hidden');
    trigger.setAttribute('aria-expanded', 'true');
  }

  trigger.addEventListener('click', e => {
    e.stopPropagation();
    menu.hasAttribute('hidden') ? open() : close();
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('click', () => { if (!menu.hasAttribute('hidden')) close(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !menu.hasAttribute('hidden')) { close(); trigger.focus(); }
  });
}

function initStickyNav() {
  const nav = document.getElementById('site-nav');
  const hero = document.getElementById('hero');

  const navObserver = new IntersectionObserver(entries => {
    nav.classList.toggle('is-visible', !entries[0].isIntersecting);
  }, { threshold: 0 });
  navObserver.observe(hero);

  nav.querySelectorAll('.site-nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}


export { initStickyNav, initMobileNavMenu, initNavDropdown, initLangToggle, initSeoulClock };
