import { SPECIALIZATIONS, DOMAIN_ICON } from '../data/specializations.js';
import { t } from '../lib/i18n.js';
import { unlockAchievement } from '../lib/achievements.js';
import { injectIcons } from '../lib/icons.js';
import { initBullwhipSim, initPhSim, initRxnSim } from './sims.js';

const ACCENT_BADGE = {
  sky: 'badge--sky',
  coral: 'badge--coral',
  mint: 'badge--mint',
  purple: 'badge--purple',
  sunshine: 'badge--star'
};

function renderSpecializations() {
  const container = document.getElementById('specs-panels');
  if (!container) return;
  container.innerHTML = '';

  const hashId = window.location.hash.replace('#', '');
  const activeId = SPECIALIZATIONS.find(s => s.id === hashId) ? hashId : SPECIALIZATIONS[0].id;

  SPECIALIZATIONS.forEach(spec => {
    const panel = document.createElement('div');
    panel.className = 'specs__panel specs__panel--' + spec.accent + ' reveal';
    if (spec.id !== activeId) panel.classList.add('is-hidden');
    panel.id = spec.id;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', 'spec-tab-' + spec.id);

    const masteryPct = spec.mastery;
    const proofToken = t('spec.' + spec.id + '.mastery');
    const headline = t('spec.' + spec.id + '.headline');

    var featuredLinkHtml = spec.featuredUrl
      ? '<a class="btn btn--coral btn--small" href="' + spec.featuredUrl + '" target="_blank" rel="noopener" data-i18n="' + spec.featuredLinkKey + '">' + t(spec.featuredLinkKey) + ' ↗</a>'
      : '';

    var caseStudyLinkHtml = spec.caseStudyUrl
      ? '<a class="specs__case-study-link" href="' + spec.caseStudyUrl + '" data-i18n="spec.caseStudyLink">' + t('spec.caseStudyLink') + ' →</a>'
      : '';

    var hasFeaturedActions = featuredLinkHtml || caseStudyLinkHtml;

    function buildSecondaryCard(item) {
      var statusSlug = item.status ? item.status.toLowerCase().replace(/\s+/g, '-') : '';
      var statusHtml = item.status
        ? '<span class="pill pill--status pill--status--' + statusSlug + '" data-i18n="project.status.' + item.status + '">' + t('project.status.' + item.status) + '</span>'
        : '';
      var linkHtml = item.link
        ? '<a class="specs__secondary-link" href="' + item.link + '" target="_blank" rel="noopener"><span data-i18n="spec.liveLink">' + t('spec.liveLink') + '</span> ↗</a>'
        : '';
      // Secondary cards can carry a write-up too, not just featured ones.
      var secondaryCaseStudyHtml = item.caseStudyUrl
        ? '<a class="specs__secondary-link" href="' + item.caseStudyUrl + '" data-i18n="spec.caseStudyLink">' + t('spec.caseStudyLink') + ' →</a>'
        : '';
      var screenshotHtml = item.screenshot
        ? '<img class="specs__secondary-screenshot" src="' + item.screenshot + '" alt="" loading="lazy" />'
        : '';
      var footerHtml = (statusHtml || linkHtml || secondaryCaseStudyHtml)
        ? '<div class="specs__secondary-footer">' + statusHtml + linkHtml + secondaryCaseStudyHtml + '</div>'
        : '';
      return (
        '<div class="panel panel--hoverable specs__secondary-card' + (item.screenshot ? ' specs__secondary-card--has-img' : '') + '">'
        + screenshotHtml
        + '<div class="specs__secondary-body">'
        + '<h4 class="specs__secondary-title" data-i18n="' + item.titleKey + '">' + t(item.titleKey) + '</h4>'
        + '<p class="specs__secondary-desc" data-i18n="' + item.descKey + '">' + t(item.descKey) + '</p>'
        + '</div>'
        + footerHtml
        + '</div>'
      );
    }

    var pageSize = 4;
    var secondaryPages = [];
    for (var i = 0; i < spec.secondary.length; i += pageSize) {
      secondaryPages.push(spec.secondary.slice(i, i + pageSize));
    }

    var secondaryWrapHtml = '<div class="specs__secondary-wrap">';
    for (var pi = 0; pi < secondaryPages.length; pi++) {
      var pageHidden = pi > 0 ? ' is-hidden' : '';
      secondaryWrapHtml += '<div class="specs__secondary-page' + pageHidden + '"><div class="specs__secondary">';
      for (var j = 0; j < secondaryPages[pi].length; j++) {
        secondaryWrapHtml += buildSecondaryCard(secondaryPages[pi][j]);
      }
      secondaryWrapHtml += '</div></div>';
    }
    if (secondaryPages.length > 1) {
      secondaryWrapHtml += '<div class="specs__pager">';
      secondaryWrapHtml += '<button class="specs__pager-arrow specs__pager-arrow--prev" aria-label="Previous page">‹</button>';
      for (var d = 0; d < secondaryPages.length; d++) {
        var isActive = d === 0 ? ' is-active' : '';
        var ariaCurrent = d === 0 ? ' aria-current="true"' : '';
        secondaryWrapHtml += '<button class="specs__pager-dot' + isActive + '" aria-label="Page ' + (d + 1) + '"' + ariaCurrent + '></button>';
      }
      secondaryWrapHtml += '<button class="specs__pager-arrow specs__pager-arrow--next" aria-label="Next page">›</button>';
      secondaryWrapHtml += '</div>';
    }
    secondaryWrapHtml += '</div>';

    var certsHtml = '';
    if (spec.certs.length > 0) {
      certsHtml = '<div class="specs__certs">';
      certsHtml += '<p class="specs__certs-title"><span class="specs__certs-icon" data-icon="award" aria-hidden="true"></span> <span data-i18n="spec.certsTitle">' + t('spec.certsTitle') + '</span></p>';
      certsHtml += '<div class="specs__certs-strip">';
      for (var k = 0; k < spec.certs.length; k++) {
        var c = spec.certs[k];
        certsHtml += '<div class="specs__cert-thumb" data-cert="' + c.filename + '" data-cert-name="' + c.name + '">';
        certsHtml += '<div class="specs__cert-placeholder" style="background: var(--bg-primary); border-color: var(--' + spec.accent + ');">';
        certsHtml += '<img src="/assets/certs/' + c.filename + '.webp" alt="' + c.name + '" data-cert="' + c.filename + '" loading="lazy"';
        certsHtml += ' onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'\';"';
        certsHtml += ' onload="this.style.display=\'\';this.nextElementSibling.style.display=\'none\';">';
        certsHtml += '<span aria-hidden="true">' + c.icon + '</span>';
        certsHtml += '</div>';
        certsHtml += '<span class="specs__cert-caption">' + c.name + '</span>';
        certsHtml += '</div>';
      }
      certsHtml += '</div></div>';
    }

    var glassHtml = '<div class="panel panel--hoverable specs__featured-card">';
    glassHtml += '<div class="specs__featured-media">';
    if (spec.screenshot) {
      glassHtml += '<img class="specs__featured-media-img" src="' + spec.screenshot + '" alt="" loading="lazy" />';
    } else {
      glassHtml += '<div class="specs__featured-media-fallback" style="background: linear-gradient(135deg, var(--' + spec.accent + '), color-mix(in srgb, var(--' + spec.accent + ') 55%, var(--bg-panel)))"></div>';
    }
    glassHtml += '</div>';
    glassHtml += '<div class="specs__featured-glass">';
    glassHtml += '<span class="badge ' + (ACCENT_BADGE[spec.accent] || 'badge--ghost') + ' specs__featured-badge" data-i18n="spec.featuredLabel">' + t('spec.featuredLabel') + '</span>';
    glassHtml += '<h4 class="specs__featured-title" data-i18n="spec.' + spec.id + '.featuredTitle">' + t('spec.' + spec.id + '.featuredTitle') + '</h4>';
    glassHtml += '</div>';
    glassHtml += '</div>';

    var featuredMetaHtml = '<p class="specs__featured-desc" data-i18n="spec.' + spec.id + '.featuredDesc">' + t('spec.' + spec.id + '.featuredDesc') + '</p>';
    if (hasFeaturedActions) {
      featuredMetaHtml += '<div class="specs__featured-actions">' + featuredLinkHtml + caseStudyLinkHtml + '</div>';
    }

    var rxnHtml = '<div class="rxn-sim" id="rxn-sim">'
      + '<div class="rxn-sim__head">'
      + '<span class="rxn-sim__title">CSTR vs PFR</span>'
      + '<span class="rxn-sim__sub">which reactor wins at your residence time?</span>'
      + '</div>'
      + '<div class="rxn-sim__toggle">'
      + '<button class="rxn-sim__btn is-active" data-mode="CSTR">CSTR</button>'
      + '<button class="rxn-sim__btn" data-mode="PFR">PFR</button>'
      + '</div>'
      + '<div class="rxn-sim__tau-wrap">'
      + '<span class="rxn-sim__tau-label">τ = <strong id="rxn-tau-val">5.0</strong> min</span>'
      + '<input type="range" id="rxn-tau" min="0" max="10" step="0.1" value="5" class="rxn-sim__slider" aria-label="Residence time" />'
      + '</div>'
      + '<div class="rxn-sim__result">'
      + '<div class="rxn-sim__bar-track"><div class="rxn-sim__bar" id="rxn-bar"></div></div>'
      + '<span class="rxn-sim__pct" id="rxn-pct">71.4%</span>'
      + '</div>'
      + '<p class="rxn-sim__lbl" id="rxn-lbl"></p>'
      + '</div>';

    var miniSimHtml;
    if (spec.miniSim === 'lang-quiz') {
      miniSimHtml = '<div class="lang-quiz" id="lang-quiz">'
        + '<div class="lang-quiz__head">'
        + '<span class="lang-quiz__title" data-i18n="langquiz.title">' + t('langquiz.title') + '</span>'
        + '<span class="lang-quiz__sub" data-i18n="langquiz.sub">' + t('langquiz.sub') + '</span>'
        + '</div>'
        + '<div class="lang-quiz__phrase-wrap">'
        + '<p class="lang-quiz__phrase" id="lang-quiz-phrase" aria-live="polite"></p>'
        + '</div>'
        + '<div class="lang-quiz__choices" id="lang-quiz-choices"></div>'
        + '<p class="lang-quiz__score" id="lang-quiz-score"></p>'
        + '</div>';
    } else if (spec.miniSim === 'bullwhip') {
      miniSimHtml = '<div class="bullwhip-sim" id="bullwhip-sim">'
        + '<div class="bullwhip-sim__head">'
        + '<span class="bullwhip-sim__title" data-i18n="bullwhip.title">' + t('bullwhip.title') + '</span>'
        + '<span class="bullwhip-sim__sub" data-i18n="bullwhip.sub">' + t('bullwhip.sub') + '</span>'
        + '</div>'
        + '<div class="bullwhip-sim__controls">'
        + '<label class="bullwhip-sim__slider-label" for="bullwhip-slider"><span data-i18n="bullwhip.sliderLabel">' + t('bullwhip.sliderLabel') + '</span> <strong id="bullwhip-shock-val">10%</strong></label>'
        + '<input class="bullwhip-sim__slider" type="range" id="bullwhip-slider" min="0" max="40" value="10" aria-label="Demand shock %" />'
        + '</div>'
        + '<div class="bullwhip-sim__bars" id="bullwhip-bars"></div>'
        + '<p class="bullwhip-sim__insight" id="bullwhip-insight"></p>'
        + '</div>';
    } else if (spec.miniSim === 'ph') {
      miniSimHtml = '<div class="ph-sim" id="ph-sim">'
        + '<div class="ph-sim__head">'
        + '<span class="ph-sim__title" data-i18n="ph.title">' + t('ph.title') + '</span>'
        + '<span class="ph-sim__sub" data-i18n="ph.sub">' + t('ph.sub') + '</span>'
        + '</div>'
        + '<div class="ph-sim__swatch" id="ph-swatch">'
        + '<span class="ph-sim__value" id="ph-val">7.0</span>'
        + '<span class="ph-sim__regime" id="ph-regime">' + t('ph.regime.neutral') + '</span>'
        + '</div>'
        + '<div class="ph-sim__slider-wrap">'
        + '<span class="ph-sim__end-label" data-i18n="ph.acid">' + t('ph.acid') + '</span>'
        + '<input class="ph-sim__slider" type="range" id="ph-slider" min="0" max="14" step="0.1" value="7" aria-label="pH value" />'
        + '<span class="ph-sim__end-label" data-i18n="ph.base">' + t('ph.base') + '</span>'
        + '</div>'
        + '<div class="ph-sim__readings">'
        + '<span class="ph-sim__conc" id="ph-conc"></span>'
        + '<span class="ph-sim__substance" id="ph-substance"></span>'
        + '</div>'
        + '</div>';
    } else {
      miniSimHtml = '';
    }

    var hasSim = spec.miniSim || spec.miniSim2;
    var simBayHtml = '';
    if (hasSim) {
      simBayHtml = '<div class="specs__sim-bay">'
        + '<p class="specs__sim-bay-label"><span data-i18n="spec.simLabel">' + t('spec.simLabel') + '</span></p>'
        + '<div class="specs__sim-bay-content">'
        + miniSimHtml
        + (spec.miniSim2 === 'rxn' ? rxnHtml : '')
        + '</div>'
        + '</div>';
    }

    panel.innerHTML =
      '<div class="specs__panel-grid">'
      + '<div class="specs__panel-left">'
      + '<div class="specs__panel-header">'
      + '<span class="specs__panel-icon" data-icon="' + DOMAIN_ICON[spec.id] + '" aria-hidden="true"></span>'
      + '<h3 class="specs__panel-name"><span data-i18n="spec.tab.' + spec.id + '">' + t('spec.tab.' + spec.id) + '</span></h3>'
      + '</div>'
      + '<div class="specs__headline" data-i18n="spec.' + spec.id + '.headline">' + headline + '</div>'
      + '<div class="specs__mastery">'
      + '<span class="specs__mastery-label" data-i18n="spec.masteryLabel">' + t('spec.masteryLabel') + '</span>'
      + '<div class="progress" role="progressbar" aria-valuenow="' + masteryPct + '" aria-valuemin="0" aria-valuemax="100">'
      + '<div class="progress__fill progress__fill--' + spec.accent + '" style="width:' + masteryPct + '%"></div>'
      + '</div>'
      + '<span class="specs__mastery-pct">' + masteryPct + '%</span>'
      + '<span class="specs__mastery-proof" data-i18n="spec.' + spec.id + '.mastery">' + proofToken + '</span>'
      + '</div>'
      + secondaryWrapHtml
      + '</div>'
      + '<div class="specs__panel-right">'
      + glassHtml
      + featuredMetaHtml
      + certsHtml
      + '</div>'
      + '</div>'
      + simBayHtml;

    container.appendChild(panel);
  });

  injectIcons(container);
  initSecondaryPagination();
  initBullwhipSim();
  initPhSim();
  initRxnSim();
}

function initSecondaryPagination() {
  document.querySelectorAll('.specs__panel').forEach(function(panel) {
    var pages = panel.querySelectorAll('.specs__secondary-page');
    var pager = panel.querySelector('.specs__pager');
    if (!pages.length || !pager) return;

    var dots = pager.querySelectorAll('.specs__pager-dot');
    var prevBtn = pager.querySelector('.specs__pager-arrow--prev');
    var nextBtn = pager.querySelector('.specs__pager-arrow--next');
    var current = 0;

    function showPage(idx) {
      current = idx;
      for (var i = 0; i < pages.length; i++) {
        pages[i].classList.toggle('is-hidden', i !== idx);
      }
      for (var j = 0; j < dots.length; j++) {
        dots[j].classList.toggle('is-active', j === idx);
        dots[j].setAttribute('aria-current', j === idx ? 'true' : 'false');
      }
      if (prevBtn) {
        prevBtn.style.opacity = idx === 0 ? '0.5' : '';
        prevBtn.style.pointerEvents = idx === 0 ? 'none' : '';
      }
      if (nextBtn) {
        nextBtn.style.opacity = idx === pages.length - 1 ? '0.5' : '';
        nextBtn.style.pointerEvents = idx === pages.length - 1 ? 'none' : '';
      }
    }

    for (var d = 0; d < dots.length; d++) {
      dots[d].addEventListener('click', (function(idx) {
        return function() { showPage(idx); };
      })(d));
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        if (current > 0) showPage(current - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        if (current < pages.length - 1) showPage(current + 1);
      });
    }

    showPage(0);
  });
}

function initSpecTabs() {
  const tabs = document.querySelectorAll('.specs__tab');
  const specsSection = document.getElementById('specializations');
  const tabsNav = document.querySelector('.specs__tabs');
  // panels are re-created on every renderSpecializations() (e.g. language switch),
  // so they must be queried live rather than captured once here
  const getPanels = () => document.querySelectorAll('.specs__panel');
  if (!tabs.length || !getPanels().length || !specsSection || !tabsNav) return;

  let indicator = tabsNav.querySelector('.specs__tab-indicator');
  if (!indicator) {
    indicator = document.createElement('span');
    indicator.className = 'specs__tab-indicator';
    indicator.setAttribute('aria-hidden', 'true');
    tabsNav.insertBefore(indicator, tabsNav.firstChild);
  }

  function positionIndicator() {
    const active = tabsNav.querySelector('.specs__tab.is-active');
    if (!active) { indicator.classList.remove('is-ready'); return; }
    indicator.style.width  = active.offsetWidth + 'px';
    indicator.style.height = active.offsetHeight + 'px';
    indicator.style.transform = 'translate(' + active.offsetLeft + 'px, ' + active.offsetTop + 'px)';
    indicator.classList.add('is-ready');
    active.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  window._positionSpecIndicator = positionIndicator;

  // re-sync freshly rendered panels with whichever tab is currently active
  window._syncSpecPanel = () => {
    const active = tabsNav.querySelector('.specs__tab.is-active');
    if (active) showPanel(active.dataset.panel);
  };

  function setActiveTab(panelId) {
    tabs.forEach(t => {
      const isActive = t.dataset.panel === panelId;
      t.classList.toggle('is-active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
      t.setAttribute('tabindex', isActive ? '0' : '-1');
    });
    positionIndicator();
  }

  function showPanel(panelId) {
    getPanels().forEach(p => {
      if (p.id === panelId) {
        p.classList.remove('is-hidden');
        p.style.animation = 'none';
        p.offsetHeight;
        p.style.animation = '';
      } else {
        p.classList.add('is-hidden');
      }
    });
  }

  window.addEventListener('resize', positionIndicator);

  function activateFromHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const match = SPECIALIZATIONS.find(s => s.id === hash);
      if (match) {
        setActiveTab(hash);
        showPanel(hash);
      }
    }
  }

  activateFromHash();

  if (!tabsNav.querySelector('.specs__tab.is-active')) {
    const defaultId = SPECIALIZATIONS[0].id;
    setActiveTab(defaultId);
    showPanel(defaultId);
  }
  requestAnimationFrame(positionIndicator);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(positionIndicator);
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', e => {
      e.preventDefault();
      const panelId = tab.dataset.panel;
      setActiveTab(panelId);
      showPanel(panelId);
      history.replaceState(null, '', '#' + panelId);
    });
  });

  window.addEventListener('hashchange', activateFromHash);

  tabsNav.addEventListener('keydown', e => {
    const currentTab = document.activeElement;
    if (!currentTab || !currentTab.classList.contains('specs__tab')) return;
    const tabArray = Array.from(tabs);
    const idx = tabArray.indexOf(currentTab);
    let targetIdx = -1;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      targetIdx = (idx + 1) % tabArray.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      targetIdx = (idx - 1 + tabArray.length) % tabArray.length;
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const panelId = currentTab.dataset.panel;
      setActiveTab(panelId);
      showPanel(panelId);
      history.replaceState(null, '', '#' + panelId);
      return;
    }

    if (targetIdx >= 0) {
      tabArray[targetIdx].focus();
    }
  });

  tabs.forEach(tab => {
    tab.setAttribute('tabindex', tab.classList.contains('is-active') ? '0' : '-1');
  });
}

function initSpecCertLightbox() {
  const lb = document.getElementById('certificate-lightbox');
  const img = document.getElementById('certificate-lightbox-image');
  const caption = document.getElementById('certificate-lightbox-caption');
  if (!lb || !img || !caption) return;

  const panelsEl = document.getElementById('specs-panels');
  if (!panelsEl) return;

  panelsEl.addEventListener('click', e => {
    const thumb = e.target.closest('.specs__cert-thumb');
    if (!thumb) return;
    const filename = thumb.dataset.cert;
    const name = thumb.dataset.certName || '';
    img.src = 'assets/certs/' + filename + '.webp';
    img.alt = name;
    caption.textContent = name;
    lb.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  });

  function closeLightbox() {
    lb.setAttribute('hidden', '');
    document.body.style.overflow = '';
    img.src = '';
  }

  lb.querySelectorAll('[data-lightbox-close]').forEach(el => {
    el.addEventListener('click', closeLightbox);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !lb.hasAttribute('hidden')) closeLightbox();
  });
}

function initDeepDiver() {
  document.addEventListener('click', e => {
    if (e.target.closest && e.target.closest('.specs__case-study-link')) {
      unlockAchievement('deepdiver');
    }
  });
}

function initSkillTree() {
  document.querySelectorAll('.specs__tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const id = tab.dataset.panel;
      const node = document.querySelector('.life-system__node[data-domain="' + id + '"]');
      if (!node) return;
      node.classList.remove('is-pulse');
      void node.offsetWidth;
      node.classList.add('is-pulse');
      setTimeout(() => node.classList.remove('is-pulse'), 700);
    });
  });
}


export { renderSpecializations, initSpecTabs, initSpecCertLightbox, initSkillTree, initDeepDiver };
