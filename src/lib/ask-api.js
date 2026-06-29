import { currentLang } from '../data/i18n.js';

export async function askInto(outputEl, question, lang, btnEl) {
  if (btnEl) {
    btnEl.dataset.loading = '1';
    btnEl.disabled = true;
  }
  outputEl.hidden = false;
  outputEl.textContent = '…';

  try {
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, lang: lang || currentLang }),
    });

    const ct = res.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      const data = await res.json().catch(() => ({}));
      outputEl.textContent = data.answer || data.error || '—';
    } else if (res.ok && res.body) {
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let answer = '', buf = '';
      outputEl.textContent = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split('\n');
        buf = lines.pop();
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const raw = line.slice(6).trim();
          if (raw === '[DONE]') break;
          try {
            const chunk = JSON.parse(raw);
            const delta = chunk.choices?.[0]?.delta?.content;
            if (delta) { answer += delta; outputEl.textContent = answer; }
          } catch { /* ignore */ }
        }
      }
    } else {
      outputEl.textContent = '—';
    }
  } catch {
    outputEl.textContent = '—';
  }

  if (btnEl) {
    delete btnEl.dataset.loading;
    btnEl.disabled = false;
  }
}
