import { SPECIALIZATIONS } from '../data/specializations.js';
import { TRANSLATIONS } from '../data/i18n.js';
import { switchToLang } from '../lib/i18n.js';
import { copyEmail } from '../lib/dom.js';

// T3.4 — Lightweight keyword search corpus (no runtime API cost)
const SEARCH_CORPUS = [
  { label: 'LifeOS — personal life-management platform', icon: '💻', cat: 'Project', keywords: 'life os lifeos productivity finance health habits nextjs flask postgresql personal operating system', action: () => window.open('https://lifeos-wine.vercel.app', '_blank', 'noopener') },
  { label: 'Reaction Simulator — CSTR/PFR ChemE tool', icon: '⚗️', cat: 'Project', keywords: 'reaction simulator cstr pfr reactor chemical engineering levenspiel temperature conversion typescript react', action: () => window.open('https://reactionsimulator.vercel.app', '_blank', 'noopener') },
  { label: 'Fugacity Simulator — thermodynamics VLE', icon: '⚗️', cat: 'Project', keywords: 'fugacity thermodynamics vapor liquid equilibrium peng robinson eos pressure simulation canvas', action: () => window.open('https://fugacity-simulator.vercel.app', '_blank', 'noopener') },
  { label: 'Bullwhip Effect Simulator — supply chain', icon: '📦', cat: 'Project', keywords: 'bullwhip supply chain scm demand shock amplification retailer distributor manufacturer inventory', action: () => window.open('https://scmsimulator.vercel.app', '_blank', 'noopener') },
  { label: 'Apple SCM Analysis — supply chain strategy', icon: '📊', cat: 'Project', keywords: 'apple supply chain scm fisher framework strategic analysis bullwhip', action: () => window.open('https://apple-scm-web.vercel.app', '_blank', 'noopener') },
  { label: 'Process Game — ChemE educational sim', icon: '🎮', cat: 'Project', keywords: 'process game chemical engineering simulation students education react', action: () => window.open('https://process-design.vercel.app', '_blank', 'noopener') },
  { label: 'TOPIK 6 Korean proficiency (265/300)', icon: '🌐', cat: 'Skill', keywords: 'korean topik language proficiency fluency interpretation diplomat', action: () => document.querySelector('#linguist')?.scrollIntoView({ behavior: 'smooth' }) },
  { label: 'Official Korean–English–Malay interpreter', icon: '🌐', cat: 'Experience', keywords: 'interpreter interpreting korean english malay translation yonhap apec government diplomat', action: () => document.querySelector('#linguist')?.scrollIntoView({ behavior: 'smooth' }) },
  { label: 'Samsung Dream Scholarship (Global Hope)', icon: '🏆', cat: 'Award', keywords: 'scholarship samsung dream scholar award funding fellowship', action: () => document.querySelector('#scholar')?.scrollIntoView({ behavior: 'smooth' }) },
  { label: 'PALS President — 150+ mentees', icon: '🤝', cat: 'Leadership', keywords: 'pals president mentor mentoring leadership community students international', action: () => document.querySelector('#community')?.scrollIntoView({ behavior: 'smooth' }) },
  { label: 'Machine Learning — CNN emotion classifier', icon: '🤖', cat: 'Skill', keywords: 'machine learning cnn neural network tensorflow emotion classifier deep learning ai ml', action: () => document.querySelector('#builder')?.scrollIntoView({ behavior: 'smooth' }) },
  { label: 'Full-stack development (Next.js + Flask + PostgreSQL)', icon: '💻', cat: 'Skill', keywords: 'fullstack full stack web development nextjs react flask python postgresql backend frontend', action: () => document.querySelector('#builder')?.scrollIntoView({ behavior: 'smooth' }) },
  { label: 'Chemical Engineering + Business dual degree', icon: '⚗️', cat: 'Education', keywords: 'chemical engineering business dual degree sogang university cheme', action: () => document.querySelector('#engineer')?.scrollIntoView({ behavior: 'smooth' }) },
];

function semanticSearch(q) {
  if (q.length < 3) return [];
  const words = q.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  if (!words.length) return [];
  return SEARCH_CORPUS
    .map(item => {
      const hay = (item.label + ' ' + item.keywords).toLowerCase();
      const hits = words.filter(w => hay.includes(w)).length;
      return { ...item, hits };
    })
    .filter(item => item.hits > 0)
    .sort((a, b) => b.hits - a.hits)
    .slice(0, 5);
}

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
    { label: 'Open private brain',        icon: '🔐',  cat: 'Navigate', action: () => { window.open('https://private-brain-rho.vercel.app', '_blank', 'noopener,noreferrer'); } },
    { label: 'Open terminal',            icon: '>_',  cat: 'Easter egg', action: () => document.getElementById('terminal-toggle')?.click() },
    { label: 'Tailor portfolio to a role', icon: '🎯', cat: 'AI',       action: () => document.getElementById('tailor-panel')?.dispatchEvent(new CustomEvent('tailor:open')) },
    { label: 'Ask me anything (AI)',     icon: '🗣️',  cat: 'AI',        action: () => { document.getElementById('terminal-toggle')?.click(); setTimeout(() => { const inp = document.getElementById('terminal-input'); if (inp) { inp.value = 'ask '; inp.focus(); } }, 350); } },
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
    const qRaw = q.toLowerCase().trim();
    let base = qRaw
      ? ALL.filter(c => c.label.toLowerCase().includes(qRaw) || c.cat.toLowerCase().includes(qRaw))
      : ALL;

    // T3.4 semantic search: append results when no command matches or query is a phrase
    const semResults = qRaw.length > 4 ? semanticSearch(qRaw) : [];
    const semNew = semResults.filter(s => !base.some(b => b.label === s.label));
    filtered = [...base, ...semNew];

    active = 0;
    if (!filtered.length) {
      list.innerHTML = `<li class="cmdk__empty">No matches — try "ask ${qRaw}" in the terminal</li>`;
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
