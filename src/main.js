import { currentLang } from './data/i18n.js';
import { applyTranslations, updateLangToggleLabel, notePolyglot } from './lib/i18n.js';
import { injectIcons } from './lib/icons.js';
import { renderTrophyShelf } from './lib/achievements.js';
import { initScrollReveal, copyEmail, initLinksDropdown, initProgressAnimation, initShimmerHover } from './lib/dom.js';
import {
  initStickyNav, initMobileNavMenu, initNavDropdown, initLangToggle, initSeoulClock, initThemeToggle,
  initHeroAnimation, initHeroParallax, renderHeroBuilds, initHelloRotator, initNpcDialogue, initIdleAvatar, initAvatarEgg,
  renderSpecializations, renderDomainOverview, initSpecTabs, initSpecCertLightbox, initSkillTree, initDeepDiver,
  initLifeSystem,
  initGradientWaveText, initSpecialText, initSignature,
  initCommandPalette,
  initTerminal,
  initWorldBgParallax, initXpBar, initDistilCol, initConsoleEgg,
  initBullwhipSim, initPhSim, initRxnSim, initGuestbook,
  initStatusBadge, initTailor, initVisitorFraming,
} from './modules/index.js';

document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  updateLangToggleLabel();
  renderSpecializations();
  renderDomainOverview();
  injectIcons();
  initScrollReveal();
  initSpecTabs();
  initSpecCertLightbox();
  initHeroAnimation();
  initProgressAnimation();
  initLinksDropdown();
  initShimmerHover();
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) copyBtn.addEventListener('click', copyEmail);
  initStickyNav();
  initNavDropdown();
  initLangToggle();
  initThemeToggle();
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
  initLifeSystem();
  initConsoleEgg();
  initSeoulClock();
  initXpBar();
  initCommandPalette();
  initNpcDialogue();
  initIdleAvatar();
  initTerminal();
  initSkillTree();
  initDistilCol();
  initGuestbook();
  initWorldBgParallax();
  initBullwhipSim();
  initPhSim();
  initRxnSim();
  initStatusBadge();
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
