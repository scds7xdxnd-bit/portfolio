import { currentLang } from './data/i18n.js';
import { applyTranslations, updateLangToggleLabel, notePolyglot, switchToLang } from './lib/i18n.js';
import { injectIcons } from './lib/icons.js';
import { renderTrophyShelf } from './lib/achievements.js';
import { initScrollReveal, copyEmail, initLinksDropdown, initProgressAnimation, initShimmerHover, initCardTilt } from './lib/dom.js';
import {
  initStickyNav, initMobileNavMenu, initNavDropdown, initLangToggle, initSeoulClock, initThemeToggle,
  initHeroAnimation, initHeroParallax, renderHeroBuilds, initHelloRotator, initNpcDialogue, initIdleAvatar, initAvatarEgg, initCursorSpotlight,
  renderSpecializations, initSpecTabs, initSpecCertLightbox, initSkillTree, initDeepDiver,
  initLifeSystem,
  initGradientWaveText, initSpecialText, initSignature,
  initCommandPalette,
  initTerminal,
  initWorldBgParallax, initXpBar, initDistilCol, initConsoleEgg,
  initBullwhipSim, initPhSim, initRxnSim, initGuestbook, initLangQuiz,
  initStatusBadge, initMcpCta, initTailor, initVisitorFraming,
} from './modules/index.js';

function lazyInitOrrery() {
  const section = document.getElementById('life-system');
  if (!section) return;
  let loaded = false;
  const obs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !loaded) {
      loaded = true;
      obs.disconnect();
      import('./modules/orrery.js').then(({ initOrrery }) => {
        initOrrery();
      }).catch(() => {
        initLifeSystem();
      });
    }
  }, { rootMargin: '200px' });
  obs.observe(section);
}


document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  updateLangToggleLabel();
  renderSpecializations();
  injectIcons();
  initScrollReveal();
  initSpecTabs();
  initSpecCertLightbox();
  initHeroAnimation();
  initProgressAnimation();
  initLinksDropdown();
  initShimmerHover();
  initCardTilt();
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) copyBtn.addEventListener('click', copyEmail);
  initStickyNav();
  initNavDropdown();
  initLangToggle();
  initThemeToggle();
  const heroLangBtn = document.getElementById('hero-lang-toggle');
  if (heroLangBtn) {
    heroLangBtn.addEventListener('click', () => {
      if (currentLang === 'en') switchToLang('zh');
      else if (currentLang === 'zh') switchToLang('ko');
      else switchToLang('en');
    });
  }
  initHeroParallax();
  initGradientWaveText();
  initSpecialText();
  renderHeroBuilds();
  initMobileNavMenu();
  initSignature();
  renderTrophyShelf();
  initDeepDiver();
  initHelloRotator();
  initAvatarEgg();
  lazyInitOrrery();
  initConsoleEgg();
  initSeoulClock();
  initXpBar();
  initCommandPalette();
  initNpcDialogue();
  initIdleAvatar();
  initCursorSpotlight();
  initTerminal();
  initSkillTree();
  initDistilCol();
  initGuestbook();
  initWorldBgParallax();
  initBullwhipSim();
  initPhSim();
  initRxnSim();
  initLangQuiz();
  initStatusBadge();
  initMcpCta();
  initTailor();
  initVisitorFraming();

  window._heroInView = true;
  const _heroObs = new IntersectionObserver(([e]) => {
    window._heroInView = e.isIntersecting;
  }, { threshold: 0.1 });
  const _heroEl = document.getElementById('hero');
  if (_heroEl) _heroObs.observe(_heroEl);

  notePolyglot();
});
