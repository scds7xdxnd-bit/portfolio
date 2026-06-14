import { SPECIALIZATIONS } from '../data/specializations.js';
import { TRANSLATIONS } from '../data/i18n.js';
import { switchToLang } from '../lib/i18n.js';
import { copyEmail } from '../lib/dom.js';

function initCommandPalette() {
  const overlay = document.getElementById('cmdk');
  const input   = document.getElementById('cmdk-input');
  const list    = document.getElementById('cmdk-list');
  if (!overlay || !input || !list) return;

  function scrollTo(sel) {
    document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const STATIC = [
    { label: 'Jump to Specializations', icon: '⚔️',  cat: 'Navigate', action: () => scrollTo('#specializations') },
    { label: 'Jump to Linguist',         icon: '🌐',  cat: 'Navigate', action: () => scrollTo('#linguist') },
    { label: 'Jump to Engineer',         icon: '⚗️',  cat: 'Navigate', action: () => scrollTo('#engineer') },
    { label: 'Jump to Builder',          icon: '🔨',  cat: 'Navigate', action: () => scrollTo('#builder') },
    { label: 'Jump to Community',        icon: '👥',  cat: 'Navigate', action: () => scrollTo('#community') },
    { label: 'Jump to Scholar',          icon: '📚',  cat: 'Navigate', action: () => scrollTo('#scholar') },
    { label: 'Copy email address',       icon: '✉️',  cat: 'Action',   action: copyEmail },
    { label: 'Download CV',              icon: '📄',  cat: 'Action',   action: () => document.querySelector('[download]')?.click() },
    { label: 'Switch to 中文',           icon: '🇨🇳',  cat: 'Language', action: () => switchToLang('zh') },
    { label: 'Switch to 한국어',         icon: '🇰🇷',  cat: 'Language', action: () => switchToLang('ko') },
    { label: 'Switch to English',        icon: '🇬🇧',  cat: 'Language', action: () => switchToLang('en') },
    { label: 'View case studies',        icon: '📖',  cat: 'Navigate', action: () => { window.location.href = 'opinions/'; } },
    { label: 'Open terminal',            icon: '>_',  cat: 'Easter egg', action: () => document.getElementById('terminal-toggle')?.click() },
  ];

  const PROJECT_CMDS = [];
  SPECIALIZATIONS.forEach(spec => {
    if (spec.featuredUrl) PROJECT_CMDS.push({
      label: TRANSLATIONS['en']['spec.' + spec.id + '.featuredTitle'] || spec.id,
      icon: '⭐', cat: 'Project',
      action: () => window.open(spec.featuredUrl, '_blank', 'noopener'),
    });
    (spec.secondary || []).forEach(item => {
      if (item.link) PROJECT_CMDS.push({
        label: TRANSLATIONS['en'][item.titleKey] || item.titleKey,
        icon: '🔗', cat: 'Project',
        action: () => window.open(item.link, '_blank', 'noopener'),
      });
    });
  });

  const ALL = [...STATIC, ...PROJECT_CMDS];
  let filtered = [...ALL];
  let active = 0;
  let isOpen = false;

  function open() {
    isOpen = true;
    overlay.hidden = false;
    input.value = '';
    render('');
    requestAnimationFrame(() => { overlay.classList.add('is-open'); input.focus(); });
  }

  function close() {
    isOpen = false;
    overlay.classList.remove('is-open');
    overlay.addEventListener('transitionend', () => { if (!isOpen) overlay.hidden = true; }, { once: true });
  }

  function setActive(i) {
    active = Math.max(0, Math.min(filtered.length - 1, i));
    list.querySelectorAll('.cmdk__item').forEach((el, idx) => {
      el.classList.toggle('is-active', idx === active);
      el.setAttribute('aria-selected', String(idx === active));
    });
    list.querySelector('.cmdk__item.is-active')?.scrollIntoView({ block: 'nearest' });
  }

  function render(q) {
    q = q.toLowerCase().trim();
    filtered = q
      ? ALL.filter(c => c.label.toLowerCase().includes(q) || c.cat.toLowerCase().includes(q))
      : ALL;
    active = 0;
    if (!filtered.length) {
      list.innerHTML = `<li class="cmdk__empty">No matches for "${q}"</li>`;
      return;
    }
    list.innerHTML = filtered.map((c, i) =>
      `<li class="cmdk__item${i === 0 ? ' is-active' : ''}" role="option" aria-selected="${i === 0}" data-i="${i}">
        <span class="cmdk__item-icon">${c.icon}</span>
        <span class="cmdk__item-label">${c.label}</span>
        <span class="cmdk__item-cat">${c.cat}</span>
       </li>`
    ).join('');
    list.querySelectorAll('.cmdk__item').forEach(el => {
      el.addEventListener('mouseenter', () => setActive(+el.dataset.i));
      el.addEventListener('click', () => { filtered[+el.dataset.i]?.action?.(); close(); });
    });
  }

  input.addEventListener('input', () => render(input.value));
  input.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
    else if (e.key === 'Enter') { e.preventDefault(); filtered[active]?.action?.(); close(); }
    else if (e.key === 'Escape') close();
  });
  overlay.querySelector('.cmdk__backdrop').addEventListener('click', close);

  document.getElementById('cmdk-trigger')?.addEventListener('click', () => isOpen ? close() : open());

  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); isOpen ? close() : open(); }
  });
}


export { initCommandPalette };
