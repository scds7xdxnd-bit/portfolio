// T3.1 — Fetch live status from /api/status and update the badge in the manifesto section.

export function initStatusBadge() {
  const badge = document.getElementById('status-badge');
  if (!badge) return;

  const dot  = badge.querySelector('.status-badge__dot');
  const text = badge.querySelector('.status-badge__text');

  async function refresh() {
    try {
      const res = await fetch('/api/status');
      if (!res.ok) throw new Error('non-ok');
      const data = await res.json();
      const { liveCount, total } = data;

      text.textContent = `${liveCount}/${total} systems live`;
      badge.classList.remove('is-live', 'is-warn', 'is-down');
      if (liveCount === total)          badge.classList.add('is-live');
      else if (liveCount >= total * .7) badge.classList.add('is-warn');
      else                              badge.classList.add('is-down');
    } catch {
      text.textContent = 'status unavailable';
    }
  }

  refresh();
}
