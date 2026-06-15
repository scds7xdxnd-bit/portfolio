// T2.2 — "Tailor to a role" panel.
// Opens on command-palette trigger, sends JD to /api/tailor, shows structured result.
// On "Apply", re-orders the spec panels to lead with the matched domain.

import { SPECIALIZATIONS } from '../data/specializations.js';

let _lastResult = null;

function initTailor() {
  const panel    = document.getElementById('tailor-panel');
  const backdrop = panel?.querySelector('.tailor-panel__backdrop');
  const closeBtn = panel?.querySelector('.tailor-panel__close');
  const jdArea   = document.getElementById('tailor-jd');
  const submitBtn = document.getElementById('tailor-submit');
  const resultEl = document.getElementById('tailor-result');
  const errorEl  = document.getElementById('tailor-error');
  const scoreEl  = document.getElementById('tailor-score');
  const summaryEl = document.getElementById('tailor-summary');
  const projectsEl = document.getElementById('tailor-projects');
  const gapsEl   = document.getElementById('tailor-gaps');
  const gapsWrap = document.getElementById('tailor-gaps-wrap');
  const recEl    = document.getElementById('tailor-recommendation');
  const applyBtn = document.getElementById('tailor-apply');
  if (!panel || !jdArea || !submitBtn) return;

  function open() {
    panel.hidden = false;
    requestAnimationFrame(() => { panel.classList.add('is-open'); jdArea.focus(); });
  }

  function close() {
    panel.classList.remove('is-open');
    panel.addEventListener('transitionend', () => { if (!panel.classList.contains('is-open')) panel.hidden = true; }, { once: true });
  }

  panel.addEventListener('tailor:open', open);
  backdrop?.addEventListener('click', close);
  closeBtn?.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) close(); });

  submitBtn.addEventListener('click', async () => {
    const jd = jdArea.value.trim();
    if (jd.length < 50) {
      showError('Please paste at least a paragraph of the job description.');
      return;
    }

    submitBtn.textContent = 'Thinking…';
    submitBtn.disabled = true;
    resultEl.hidden = true;
    errorEl.hidden = true;

    try {
      const res = await fetch('/api/tailor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jd }),
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      _lastResult = data;
      showResult(data);
    } catch (err) {
      showError('Could not reach the AI — check that ANTHROPIC_API_KEY is configured.');
    } finally {
      submitBtn.textContent = 'Match →';
      submitBtn.disabled = false;
    }
  });

  applyBtn?.addEventListener('click', () => {
    if (!_lastResult) return;
    applyToPage(_lastResult.orderedDomains);
    close();
  });

  function showResult(data) {
    const score = Math.round(data.matchScore ?? 0);
    scoreEl.textContent = `${score}%`;
    scoreEl.style.color = score >= 70 ? '#4ECDC4' : score >= 45 ? '#FFD23F' : '#ff6b6b';

    summaryEl.textContent = data.fitSummary || '';

    projectsEl.innerHTML = (data.highlightedProjects || []).map(p =>
      `<li><strong>${p.name}</strong> — ${p.relevanceNote}</li>`
    ).join('');

    if (data.gaps?.length) {
      gapsEl.innerHTML = data.gaps.map(g => `<li>${g}</li>`).join('');
      gapsWrap.hidden = false;
    } else {
      gapsWrap.hidden = true;
    }

    recEl.textContent = data.recommendation || '';

    resultEl.hidden = false;
    errorEl.hidden = true;
  }

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.hidden = false;
    resultEl.hidden = true;
  }
}

// Re-order the spec panels (.spec-domain) in the DOM to lead with the matched domain.
function applyToPage(orderedDomains) {
  if (!orderedDomains?.length) return;
  const container = document.getElementById('specializations');
  if (!container) return;

  orderedDomains.forEach((domainId, idx) => {
    const panel = document.getElementById(domainId);
    if (!panel) return;
    panel.style.order = String(idx);
    if (idx === 0) {
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      panel.classList.add('is-tailored');
      setTimeout(() => panel.classList.remove('is-tailored'), 2500);
    }
  });
}

export { initTailor };
