/* opinions.js — Scoped to opinions pages only. Does not load on main site. */

const OPINIONS_INDEX = [
  {
    id: 'chemical-potential',
    title: 'What does chemical potential actually mean?',
    summary: 'Why \u03BC\u1D62 behaves the way it does, what it means for two phases to share an equal chemical potential, and where the temperature-pressure analogy quietly breaks down.',
    domain: 'Thermodynamics',
    readTime: '9 min read',
    date: 'April 2026',
    href: 'chemical-potential.html',
    noteType: 'Thermodynamics Note',
    icon: '\u2697\uFE0F',
    status: 'Published',
    level: 'Intermediate',
    takeaway: 'Chemical potential as the direction of change'
  },
  {
    id: 'engineering-under-uncertainty',
    title: 'Engineering decisions under uncertainty',
    summary: 'How chemical engineers design for unknowns \u2014 Monte Carlo simulation, sensitivity analysis, and the discipline of committing before the data is complete.',
    domain: 'Engineering',
    readTime: '8 min read',
    date: 'April 2026',
    href: 'engineering-under-uncertainty.html',
    noteType: 'Engineering Note',
    icon: '\u26A1',
    status: 'Published',
    level: 'Practical',
    takeaway: 'Better decisions under incomplete information'
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

  /* Render Field Note cards */
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
        '<div class="op-card__icon-badge">' + (op.icon || '') + '</div>' +
        '<div class="op-card__note-type">' + (op.noteType || '') + '</div>' +
        '<h2 class="op-card__title">' + op.title + '</h2>' +
        '<p class="op-card__summary">' + op.summary + '</p>' +
        '<div class="op-card__meta-row">' +
          '<span>' + op.readTime + '</span>' +
          '<span class="op-card__meta-dot">&middot;</span>' +
          '<span>' + op.date + '</span>' +
          '<span class="op-card__meta-dot">&middot;</span>' +
          '<span class="op-card__level">' + (op.level || '') + '</span>' +
        '</div>' +
        '<div class="op-card__takeaway">' + (op.takeaway || '') + '</div>' +
        '<div class="op-card__cta">Read Note \u2192</div>';
      gridEl.appendChild(a);
    });
  }

  renderCards();
}

/* ── Article pages: tooltip toggle ── */
document.querySelectorAll('.term').forEach(t => {
  t.addEventListener('click', () => t.classList.toggle('active'));
});
