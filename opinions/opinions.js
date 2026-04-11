/* opinions.js — Scoped to opinions pages only. Does not load on main site. */

const OPINIONS_INDEX = [
  {
    id: 'chemical-potential',
    title: 'What does chemical potential actually mean?',
    summary: 'Why μᵢ behaves the way it does, what it means for two phases to share an equal chemical potential, and where the temperature-pressure analogy quietly breaks down.',
    domain: 'Thermodynamics',
    readTime: '9 min read',
    date: 'Spring 2026',
    href: 'chemical-potential.html'
  },
  {
    id: 'engineering-under-uncertainty',
    title: 'Engineering decisions under uncertainty',
    summary: 'How chemical engineers design for unknowns — Monte Carlo simulation, sensitivity analysis, and the discipline of committing before the data is complete.',
    domain: 'Engineering',
    readTime: '8 min read',
    date: 'April 2026',
    href: 'engineering-under-uncertainty.html'
  }
];

/* ── Hub page: render cards from OPINIONS_INDEX ── */
const gridEl = document.getElementById('opinions-grid');
if (gridEl) {
  let activeFilter = 'all';
  const filtersEl = document.getElementById('opinions-filters');

  /* Build unique domain list */
  const domains = ['all', ...new Set(OPINIONS_INDEX.map(o => o.domain))];

  /* Render filter chips */
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

  /* Render opinion cards */
  function renderCards() {
    const items = activeFilter === 'all'
      ? OPINIONS_INDEX
      : OPINIONS_INDEX.filter(o => o.domain === activeFilter);

    gridEl.innerHTML = '';
    items.forEach(op => {
      const a = document.createElement('a');
      a.className = 'op-card';
      a.href = op.href;
      a.setAttribute('aria-label', 'Read: ' + op.title);
      a.innerHTML =
        '<div class="op-card__meta">' +
          '<span class="op-card__domain">' + op.domain + '</span>' +
          '<span class="op-card__readtime">' + op.readTime + '</span>' +
        '</div>' +
        '<h2 class="op-card__title">' + op.title + '</h2>' +
        '<p class="op-card__summary">' + op.summary + '</p>' +
        '<div class="op-card__footer">' +
          '<span class="op-card__date">' + op.date + '</span>' +
          '<span class="op-card__cta">Read Essay \u2192</span>' +
        '</div>';
      gridEl.appendChild(a);
    });
  }

  renderCards();
}

/* ── Article pages: tooltip toggle ── */
document.querySelectorAll('.term').forEach(t => {
  t.addEventListener('click', () => t.classList.toggle('active'));
});
