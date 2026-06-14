import OPINIONS_INDEX from '../data/opinions-index.js';

const gridEl = document.getElementById('opinions-grid');
if (gridEl) {
  let activeFilter = 'all';
  const filtersEl = document.getElementById('opinions-filters');

  const domains = ['all', ...new Set(OPINIONS_INDEX.map(o => o.domain))];

  if (filtersEl) {
    filtersEl.innerHTML = '';
    domains.forEach(domain => {
      const btn = document.createElement('button');
      btn.className = 'op-filter-chip' + (domain === 'all' ? ' is-active' : '');
      btn.textContent = domain === 'all' ? 'All' : domain;
      btn.dataset.domain = domain;
      btn.addEventListener('click', () => {
        activeFilter = domain;
        filtersEl.querySelectorAll('.op-filter-chip').forEach(c =>
          c.classList.toggle('is-active', c.dataset.domain === domain)
        );
        renderCards();
      });
      filtersEl.appendChild(btn);
    });
  }

  function renderCards() {
    const items = activeFilter === 'all'
      ? OPINIONS_INDEX
      : OPINIONS_INDEX.filter(o => o.domain === activeFilter);

    gridEl.innerHTML = '';
    items.forEach(op => {
      const isProject = op.type === 'project';
      const a = document.createElement('a');
      a.className = 'op-card' + (isProject ? ' op-card--project' : '');
      a.href = op.href;
      a.setAttribute('aria-label', (isProject ? 'View case study: ' : 'Read: ') + op.title);

      const metaHtml = isProject
        ? '<span>' + (op.stack || '') + '</span>'
        : '<span>' + op.readTime + '</span>' +
          '<span class="op-card__meta-dot">&middot;</span>' +
          '<span>' + op.date + '</span>' +
          '<span class="op-card__meta-dot">&middot;</span>' +
          '<span class="op-card__level">' + (op.level || '') + '</span>';

      const ctaText = isProject ? 'View Case Study →' : 'Read Note →';

      a.innerHTML =
        '<div class="op-card__icon-badge">' + (op.icon || '') + '</div>' +
        '<div class="op-card__note-type' + (isProject ? ' op-card__note-type--project' : '') + '">' + (op.noteType || '') + '</div>' +
        '<h2 class="op-card__title">' + op.title + '</h2>' +
        '<p class="op-card__summary">' + op.summary + '</p>' +
        '<div class="op-card__meta-row">' + metaHtml + '</div>' +
        '<div class="op-card__takeaway">' + (op.takeaway || '') + '</div>' +
        '<div class="op-card__cta">' + ctaText + '</div>';
      gridEl.appendChild(a);
    });
  }

  renderCards();
}
