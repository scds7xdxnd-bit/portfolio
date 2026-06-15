// T3.1 + T3.2 — Live status badge + GitHub pulse. Also wires MCP CTA copy.

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

// MCP CTA — click to copy endpoint URL, show brief feedback
export function initMcpCta() {
  const btn = document.getElementById('mcp-cta');
  if (!btn) return;
  const MCP_URL = `${window.location.origin}/api/mcp`;
  const urlEl = btn.querySelector('.mcp-cta__url');
  if (urlEl) urlEl.textContent = `${window.location.hostname}/api/mcp`;

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(MCP_URL);
      btn.classList.add('is-copied');
      const strong = btn.querySelector('strong');
      const origText = strong?.textContent;
      if (strong) strong.textContent = 'Copied!';
      setTimeout(() => {
        btn.classList.remove('is-copied');
        if (strong && origText) strong.textContent = origText;
      }, 1800);
    } catch {
      window.open(MCP_URL, '_blank', 'noopener');
    }
  });
}
