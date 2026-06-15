// T3.1 + T3.2 — Live status badge + GitHub pulse.

export function initStatusBadge() {
  const badge = document.getElementById('status-badge');
  if (!badge) return;

  const dot  = badge.querySelector('.status-badge__dot');
  const text = badge.querySelector('.status-badge__text');

  async function refresh() {
    // T3.1 — app uptime
    try {
      const res = await fetch('/api/status');
      if (!res.ok) throw new Error();
      const data = await res.json();
      const { liveCount, total } = data;

      badge.classList.remove('is-live', 'is-warn', 'is-down');
      if (liveCount === total)            badge.classList.add('is-live');
      else if (liveCount >= total * 0.7) badge.classList.add('is-warn');
      else                               badge.classList.add('is-down');

      // T3.2 — GitHub pulse (parallel, non-blocking)
      fetch('/api/github').then(r => r.ok ? r.json() : null).then(gh => {
        const ghStr = gh?.available ? ` · ${gh.summary}` : '';
        text.textContent = `${liveCount}/${total} systems live${ghStr}`;
      }).catch(() => {
        text.textContent = `${liveCount}/${total} systems live`;
      });
    } catch {
      text.textContent = 'status unavailable';
    }
  }

  refresh();
}
