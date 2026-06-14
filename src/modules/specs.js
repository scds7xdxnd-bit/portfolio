import { SPECIALIZATIONS, DOMAIN_ICON } from '../data/specializations.js';
import { t } from '../lib/i18n.js';
import { unlockAchievement } from '../lib/achievements.js';
import { injectIcons } from '../lib/icons.js';
import { initBullwhipSim, initPhSim, initRxnSim } from './sims.js';

function renderSpecializations() {
  const container = document.getElementById('specs-panels');
  if (!container) return;
  container.innerHTML = '';

  SPECIALIZATIONS.forEach(spec => {
    const panel = document.createElement('div');
    panel.className = `specs__panel specs__panel--${spec.accent} reveal`;
    panel.id = spec.id;

    const statKeys = ['stat1', 'stat2', 'stat3'];
    const statsHtml = statKeys.map(k =>
      `<span class="specs__stat" data-i18n="spec.${spec.id}.${k}">${t(`spec.${spec.id}.${k}`)}</span>`
    ).join('');

    const masteryKey = `spec.${spec.id}.mastery`;
    const masteryPct = t(masteryKey);

    const featuredLinkHtml = spec.featuredUrl
      ? `<a class="specs__featured-link" href="${spec.featuredUrl}" target="_blank" rel="noopener" data-i18n="${spec.featuredLinkKey}">${t(spec.featuredLinkKey)} ↗</a>`
      : '';

    const caseStudyLinkHtml = spec.caseStudyUrl
      ? `<a class="specs__case-study-link" href="${spec.caseStudyUrl}" data-i18n="spec.caseStudyLink">${t('spec.caseStudyLink')} →</a>`
      : '';

    const secondaryHtml = spec.secondary.map((item) => {
      const statusHtml = item.status
        ? `<span class="pill pill--status pill--status--in-development" data-i18n="project.status.${item.status}">${t('project.status.' + item.status)}</span>`
        : '';
      const linkHtml = item.link
        ? `<a class="specs__secondary-link" href="${item.link}" target="_blank" rel="noopener"><span data-i18n="spec.liveLink">${t('spec.liveLink')}</span> ↗</a>`
        : '';
      const screenshotHtml = item.screenshot
        ? (item.link
          ? `<a class="specs__secondary-shot" href="${item.link}" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true"><img class="specs__secondary-screenshot" src="${item.screenshot}" alt="" loading="lazy" /></a>`
          : `<img class="specs__secondary-screenshot" src="${item.screenshot}" alt="" loading="lazy" />`)
        : '';
      const footerHtml = (statusHtml || linkHtml)
        ? `<div class="specs__secondary-footer">${statusHtml}${linkHtml}</div>`
        : '';
      return `
        <div class="specs__secondary-card${item.screenshot ? ' specs__secondary-card--has-img' : ''}">
          ${screenshotHtml}
          <div class="specs__secondary-body">
            <h4 class="specs__secondary-title" data-i18n="${item.titleKey}">${t(item.titleKey)}</h4>
            <p class="specs__secondary-desc" data-i18n="${item.descKey}">${t(item.descKey)}</p>
          </div>
          ${footerHtml}
        </div>`;
    }).join('');

    const certsHtml = spec.certs.length > 0 ? `
      <div class="specs__certs">
        <p class="specs__certs-title"><span class="specs__certs-icon" data-icon="award" aria-hidden="true"></span> <span data-i18n="spec.certsTitle">${t('spec.certsTitle')}</span></p>
        <div class="specs__certs-strip">
          ${spec.certs.map(c => `
            <div class="specs__cert-thumb" data-cert="${c.filename}" data-cert-name="${c.name}">
              <div class="specs__cert-placeholder" style="background: var(--bg-primary); border-color: var(--${spec.accent});">
                <img src="/assets/certs/${c.filename}.webp" alt="${c.name}" data-cert="${c.filename}" loading="lazy"
                  onerror="this.style.display='none';this.nextElementSibling.style.display='';"
                  onload="this.style.display='';this.nextElementSibling.style.display='none';">
                <span aria-hidden="true">${c.icon}</span>
              </div>
              <span class="specs__cert-caption">${c.name}</span>
            </div>
          `).join('')}
        </div>
      </div>` : '';

    const featuredScreenshotHtml = spec.screenshot
      ? (spec.featuredUrl
        ? `<a class="specs__featured-shot" href="${spec.featuredUrl}" target="_blank" rel="noopener" aria-label="${t('demo.visit')}">
            <img class="specs__featured-screenshot" src="${spec.screenshot}" alt="" loading="lazy" />
            <span class="specs__featured-shot__overlay"><span data-i18n="demo.visit">${t('demo.visit')}</span> ↗</span>
          </a>`
        : `<img class="specs__featured-screenshot" src="${spec.screenshot}" alt="" loading="lazy" />`)
      : '';

    const rxnHtml = `
      <div class="rxn-sim" id="rxn-sim">
        <div class="rxn-sim__head">
          <span class="rxn-sim__title">CSTR vs PFR</span>
          <span class="rxn-sim__sub">which reactor wins at your residence time?</span>
        </div>
        <div class="rxn-sim__toggle">
          <button class="rxn-sim__btn is-active" data-mode="CSTR">CSTR</button>
          <button class="rxn-sim__btn" data-mode="PFR">PFR</button>
        </div>
        <div class="rxn-sim__tau-wrap">
          <span class="rxn-sim__tau-label">τ = <strong id="rxn-tau-val">5.0</strong> min</span>
          <input type="range" id="rxn-tau" min="0" max="10" step="0.1" value="5" class="rxn-sim__slider" aria-label="Residence time" />
        </div>
        <div class="rxn-sim__result">
          <div class="rxn-sim__bar-track"><div class="rxn-sim__bar" id="rxn-bar"></div></div>
          <span class="rxn-sim__pct" id="rxn-pct">71.4%</span>
        </div>
        <p class="rxn-sim__lbl" id="rxn-lbl"></p>
      </div>`;

    const miniSimHtml =
      spec.miniSim === 'bullwhip' ? `
      <div class="bullwhip-sim" id="bullwhip-sim">
        <div class="bullwhip-sim__head">
          <span class="bullwhip-sim__title" data-i18n="bullwhip.title">${t('bullwhip.title')}</span>
          <span class="bullwhip-sim__sub" data-i18n="bullwhip.sub">${t('bullwhip.sub')}</span>
        </div>
        <div class="bullwhip-sim__controls">
          <label class="bullwhip-sim__slider-label" for="bullwhip-slider"><span data-i18n="bullwhip.sliderLabel">${t('bullwhip.sliderLabel')}</span> <strong id="bullwhip-shock-val">10%</strong></label>
          <input class="bullwhip-sim__slider" type="range" id="bullwhip-slider" min="0" max="40" value="10" aria-label="Demand shock %" />
        </div>
        <div class="bullwhip-sim__bars" id="bullwhip-bars"></div>
        <p class="bullwhip-sim__insight" id="bullwhip-insight"></p>
      </div>` :
      spec.miniSim === 'ph' ? `
      <div class="ph-sim" id="ph-sim">
        <div class="ph-sim__head">
          <span class="ph-sim__title" data-i18n="ph.title">${t('ph.title')}</span>
          <span class="ph-sim__sub" data-i18n="ph.sub">${t('ph.sub')}</span>
        </div>
        <div class="ph-sim__swatch" id="ph-swatch">
          <span class="ph-sim__value" id="ph-val">7.0</span>
          <span class="ph-sim__regime" id="ph-regime">${t('ph.regime.neutral')}</span>
        </div>
        <div class="ph-sim__slider-wrap">
          <span class="ph-sim__end-label" data-i18n="ph.acid">${t('ph.acid')}</span>
          <input class="ph-sim__slider" type="range" id="ph-slider" min="0" max="14" step="0.1" value="7" aria-label="pH value" />
          <span class="ph-sim__end-label" data-i18n="ph.base">${t('ph.base')}</span>
        </div>
        <div class="ph-sim__readings">
          <span class="ph-sim__conc" id="ph-conc"></span>
          <span class="ph-sim__substance" id="ph-substance"></span>
        </div>
      </div>` :
      '';

    panel.innerHTML = `
      <div class="specs__panel-header">
        <h3 class="specs__panel-name">
          <span class="specs__panel-icon" data-icon="${DOMAIN_ICON[spec.id]}" aria-hidden="true"></span>
          <span data-i18n="spec.tab.${spec.id}">${t(`spec.tab.${spec.id}`)}</span>
        </h3>
        <div class="specs__stats">${statsHtml}</div>
      </div>
      <div class="specs__proof">
        <span class="specs__proof-label" data-i18n="spec.masteryLabel">${t('spec.masteryLabel')}</span>
        <span class="specs__proof-value specs__proof-value--${spec.accent}">
          <span class="specs__proof-icon" data-icon="check" aria-hidden="true"></span>
          <span data-i18n="${masteryKey}">${masteryPct}</span>
        </span>
      </div>
      <div class="specs__headline" data-i18n="spec.${spec.id}.headline">${t(`spec.${spec.id}.headline`)}</div>
      <div class="specs__featured specs__featured--${spec.accent}${spec.screenshot ? ' specs__featured--has-img' : ''}">
        <div class="specs__featured-content">
          <h4 class="specs__featured-title" data-i18n="spec.${spec.id}.featuredTitle">${t(`spec.${spec.id}.featuredTitle`)}</h4>
          <p class="specs__featured-desc" data-i18n="spec.${spec.id}.featuredDesc">${t(`spec.${spec.id}.featuredDesc`)}</p>
          <div class="specs__featured-actions">
            ${featuredLinkHtml}
            ${caseStudyLinkHtml}
          </div>
        </div>
        ${featuredScreenshotHtml}
      </div>
      <div class="specs__secondary">${secondaryHtml}</div>
      ${miniSimHtml}
      ${spec.miniSim2 === 'rxn' ? rxnHtml : ''}
      ${certsHtml}
    `;

    container.appendChild(panel);
  });

  injectIcons(container);
  initBullwhipSim();
  initPhSim();
  initRxnSim();
}

function renderDomainOverview() {
  const container = document.getElementById('domain-overview');
  if (!container) return;
  container.innerHTML = SPECIALIZATIONS.map(spec => `
    <a class="domain-tile domain-tile--${spec.accent}" href="#${spec.id}">
      <span class="domain-tile__icon" data-icon="${DOMAIN_ICON[spec.id]}" aria-hidden="true"></span>
      <span class="domain-tile__body">
        <span class="domain-tile__name" data-i18n="spec.tab.${spec.id}">${t(`spec.tab.${spec.id}`)}</span>
        <span class="domain-tile__proof" data-i18n="spec.${spec.id}.mastery">${t(`spec.${spec.id}.mastery`)}</span>
      </span>
    </a>
  `).join('');
  injectIcons(container);
}

function initSpecTabs() {
  const tabs = document.querySelectorAll('.specs__tab');
  const panels = document.querySelectorAll('.specs__panel');
  const specsSection = document.getElementById('specializations');
  const tabsNav = document.querySelector('.specs__tabs');
  if (!tabs.length || !panels.length || !specsSection || !tabsNav) return;

  // Sliding "liquid" indicator that glides between tabs
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
    indicator.style.transform = `translate(${active.offsetLeft}px, ${active.offsetTop}px)`;
    indicator.classList.add('is-ready');
    active.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
  // expose so language switches can re-measure after labels change width
  window._positionSpecIndicator = positionIndicator;

  function setActiveTab(panelId) {
    tabs.forEach(t => {
      const isActive = t.dataset.panel === panelId;
      t.classList.toggle('is-active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    positionIndicator();
  }

  window.addEventListener('resize', positionIndicator);

  function activateFromHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const match = SPECIALIZATIONS.find(s => s.id === hash);
      if (match) setActiveTab(hash);
    }
  }

  activateFromHash();

  // Default the indicator onto the first tab so it has somewhere to slide from
  if (!tabsNav.querySelector('.specs__tab.is-active')) {
    setActiveTab(tabs[0].dataset.panel);
  }
  requestAnimationFrame(positionIndicator);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(positionIndicator);
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', e => {
      const panelId = tab.dataset.panel;
      const target = document.getElementById(panelId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', '#' + panelId);
        setActiveTab(panelId);
      }
    });
  });

  window.addEventListener('hashchange', activateFromHash);

  const panelObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) setActiveTab(e.target.id);
    });
  }, { threshold: 0.2, rootMargin: '-120px 0px -40% 0px' });

  panels.forEach(p => panelObserver.observe(p));
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
    img.src = `assets/certs/${filename}.webp`;
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
      const node = document.querySelector(`.life-system__node[data-domain="${id}"]`);
      if (!node) return;
      node.classList.remove('is-pulse');
      void node.offsetWidth; // force reflow
      node.classList.add('is-pulse');
      setTimeout(() => node.classList.remove('is-pulse'), 700);
    });
  });
}


export { renderSpecializations, renderDomainOverview, initSpecTabs, initSpecCertLightbox, initSkillTree, initDeepDiver };
