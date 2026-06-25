import { currentLang, TRANSLATIONS, setCurrentLang } from '../data/i18n.js';
import { renderTrophyShelf, unlockAchievement } from './achievements.js';
import { initScrollReveal } from './dom.js';
import { renderSpecializations } from '../modules/specs.js';

export function t(key) {
  const lang = TRANSLATIONS[currentLang];
  if (lang && Object.prototype.hasOwnProperty.call(lang, key)) return lang[key];
  if (Object.prototype.hasOwnProperty.call(TRANSLATIONS.en, key)) return TRANSLATIONS.en[key];
  return key;
}

export function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.documentElement.lang = currentLang === 'ko' ? 'ko' : currentLang === 'zh' ? 'zh' : 'en';
}

export function switchToLang(lang) {
  setCurrentLang(lang);
  updateLangToggleLabel();
  applyTranslations();
  renderSpecializations();
  renderTrophyShelf();
  initScrollReveal();
  notePolyglot();
  // tab labels changed width — re-measure the sliding indicator
  requestAnimationFrame(() => window._positionSpecIndicator?.());
}

const _langsSeen = new Set();
export function notePolyglot() {
  _langsSeen.add(currentLang);
  if (_langsSeen.size >= 3) unlockAchievement('polyglot');
}

export function updateLangToggleLabel() {
  const labels = { en: 'EN', zh: '中文', ko: '한국어' };
  const btn = document.getElementById('lang-toggle');
  if (!btn) return;
  btn.innerHTML = Object.entries(labels)
    .map(([code, label]) =>
      `<span${currentLang === code ? ' style="text-decoration:underline;text-underline-offset:3px;"' : ''}>${label}</span>`
    )
    .join('<span aria-hidden="true"> &middot; </span>');
}

export function initLangToggle() {
  const btn = document.getElementById('lang-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    if (currentLang === 'en') setCurrentLang('zh');
    else if (currentLang === 'zh') setCurrentLang('ko');
    else setCurrentLang('en');
    updateLangToggleLabel();
    applyTranslations();
    renderSpecializations();
    renderDomainOverview();
    renderTrophyShelf();
    initScrollReveal();
    notePolyglot();
    requestAnimationFrame(() => window._positionSpecIndicator?.());
  });
}
