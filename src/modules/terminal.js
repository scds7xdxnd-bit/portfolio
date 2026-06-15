import { unlockAchievement } from '../lib/achievements.js';
import { t } from '../lib/i18n.js';
import { currentLang } from '../data/i18n.js';
import { copyEmail } from '../lib/dom.js';

function initTerminal() {
  const term   = document.getElementById('terminal');
  const toggle = document.getElementById('terminal-toggle');
  const output = document.getElementById('terminal-output');
  const input  = document.getElementById('terminal-input');
  if (!term || !toggle) return;

  const PROJECTS = {
    lifeos:         { desc: 'Personal OS — Next.js + Supabase. Habit tracking, journaling, goal cascading.', url: 'https://lifeos-wine.vercel.app' },
    'reaction-sim': { desc: 'CSTR/PFR reactor network simulator. Interactive ChemE tool. Python + Plotly.', url: 'https://reactionsimulator.vercel.app' },
    fugacity:       { desc: 'Thermodynamic VLE calculator. Fugacity coefficients via Peng-Robinson EOS.', url: 'https://fugacity-simulator.vercel.app' },
    bullwhip:       { desc: 'Supply chain amplification toy. Shows how demand spikes cascade upstream.', url: 'https://scmsimulator.vercel.app' },
    scm:            { desc: 'Apple supply chain LP optimizer. Python + Gurobi. Cost vs lead-time tradeoffs.', url: 'https://apple-scm-web.vercel.app' },
    accounting:     { desc: 'Double-entry accounting app. Private alpha — 5 yrs in production.', url: 'https://finance-app-private-alpha.fly.dev' },
    'process-game': { desc: 'Interactive process design simulator for ChemE students.', url: 'https://process-design.vercel.app' },
  };

  const CMDS = {
    help:       () => "→ whoami · about · education · skills · where · contact · projects · <project-name> · open <project> · ask <question> · clear",
    whoami:     "→ Taeyang Han (한태양). Life Systems Designer. Sogang University, Seoul.",
    about:      "→ Born in Malaysia. Moved to Seoul for university. Dual degree ChemE + Business. First app shipped 2021. Still shipping.",
    education:  "→ Sogang University 2022-27 — ChemE + Business, full-tuition scholarship. TOPIK 6 · BLCU exchange · IELTS 8.5.",
    skills:     "→ EN KO ZH MS ES  |  Python · Flask · Next.js · PostgreSQL  |  ChemE ∩ CS",
    where:      () => `→ Seoul — ${document.getElementById('seoul-time')?.textContent ?? 'KST'}. Usually coding or teaching.`,
    contact:    () => { copyEmail(); return '→ ammarhakimikm03@gmail.com — copied ✓'; },
    projects:   "→ " + Object.keys(PROJECTS).join(' · ') + "\n  (type a name for details, or 'open <name>')",
    ask:        '→ ask <your question> — queries the AI about my background, projects, and skills.',
    clear:      null,
    secret:     () => { unlockAchievement('secret'); return '🕹️ Achievement unlocked: Secret Finder!'; },
    ...Object.fromEntries(Object.entries(PROJECTS).map(([k, v]) =>
      [k, `→ ${v.desc}\n  open ${k} → ${v.url}`]
    )),
  };

  function print(text, cls = '') {
    let last;
    text.split('\n').forEach(line => {
      const d = document.createElement('div');
      d.className = 'terminal__line' + (cls ? ' terminal__line--' + cls : '');
      d.textContent = line;
      output.appendChild(d);
      last = d;
    });
    output.scrollTop = output.scrollHeight;
    return last;
  }

  // Stream answer from /api/ask
  async function streamAsk(question) {
    const thinking = print(t('terminal.ask.thinking'), 'ai');

    let res;
    try {
      res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, lang: currentLang }),
      });
    } catch {
      thinking.textContent = t('terminal.ask.error');
      thinking.className = 'terminal__line terminal__line--err';
      return;
    }

    if (res.status === 429) {
      thinking.textContent = t('terminal.ask.ratelimit');
      thinking.className = 'terminal__line terminal__line--err';
      return;
    }

    // Fallback JSON mode (no DEEPSEEK_API_KEY configured)
    const ct = res.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      const data = await res.json().catch(() => ({}));
      thinking.textContent = '→ ' + (data.answer || data.error || t('terminal.ask.error'));
      return;
    }

    if (!res.ok || !res.body) {
      thinking.textContent = t('terminal.ask.error');
      thinking.className = 'terminal__line terminal__line--err';
      return;
    }

    // SSE streaming — DeepSeek/OpenAI format
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let answer = '';
    let buf = '';

    thinking.className = 'terminal__line terminal__line--ai';
    thinking.textContent = '→ ';

    try {
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
            if (delta) {
              answer += delta;
              thinking.textContent = '→ ' + answer;
              output.scrollTop = output.scrollHeight;
            }
          } catch { /* ignore malformed chunks */ }
        }
      }
    } catch { /* network abort */ }

    if (!answer) {
      thinking.textContent = t('terminal.ask.error');
      thinking.className = 'terminal__line terminal__line--err';
      return;
    }

    output.scrollTop = output.scrollHeight;
    unlockAchievement('interrogator');
  }

  function run(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    print('$ ' + cmd, 'cmd');
    if (cmd === 'clear') { output.innerHTML = ''; return; }

    if (cmd.startsWith('open ')) {
      const key = cmd.slice(5).trim();
      const proj = PROJECTS[key];
      if (proj) { window.open(proj.url, '_blank', 'noopener'); print(`→ opening ${key}…`); }
      else print(`→ no project named "${key}". try 'projects'.`, 'err');
      return;
    }

    // 'ask <question>' or '? <question>'
    const askMatch = raw.trim().match(/^(?:ask|[?])\s+(.+)/is);
    if (askMatch) {
      streamAsk(askMatch[1].trim());
      return;
    }

    if (!(cmd in CMDS)) {
      print(`not found: "${cmd}". type 'help' or 'ask <question>'.`, 'err');
      return;
    }
    const h = CMDS[cmd];
    if (h !== null) print(typeof h === 'function' ? h() : h);
  }

  const suggestBox = document.getElementById('terminal-suggestions');
  const ALL_CMDS = Object.keys(CMDS);

  function showSuggestions(list) {
    suggestBox.innerHTML = '';
    list.forEach(cmd => {
      const btn = document.createElement('button');
      btn.className = 'terminal__suggest-chip';
      btn.textContent = cmd;
      btn.addEventListener('mousedown', e => {
        e.preventDefault();
        input.value = cmd === 'ask' ? 'ask ' : cmd;
        input.focus();
        hideSuggestions();
      });
      suggestBox.appendChild(btn);
    });
    suggestBox.hidden = list.length === 0;
  }

  function hideSuggestions() {
    suggestBox.hidden = true;
    suggestBox.innerHTML = '';
  }

  function commonPrefix(strs) {
    if (!strs.length) return '';
    return strs.reduce((a, b) => {
      let i = 0;
      while (i < a.length && a[i] === b[i]) i++;
      return a.slice(0, i);
    });
  }

  function open()  { term.hidden = false; requestAnimationFrame(() => { term.classList.add('is-open'); input.focus(); }); }
  function close() { hideSuggestions(); term.classList.remove('is-open'); term.addEventListener('transitionend', () => { if (!term.classList.contains('is-open')) term.hidden = true; }, { once: true }); }

  toggle.addEventListener('click', () => term.hidden ? open() : close());
  document.getElementById('terminal-close').addEventListener('click', close);
  input.addEventListener('blur', () => { setTimeout(hideSuggestions, 150); });
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      run(input.value);
      input.value = '';
      hideSuggestions();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const val = input.value.trim().toLowerCase();
      if (!val) {
        showSuggestions(ALL_CMDS);
      } else {
        const matches = ALL_CMDS.filter(c => c.startsWith(val));
        if (matches.length === 1) {
          input.value = matches[0] === 'ask' ? 'ask ' : matches[0];
          hideSuggestions();
        } else if (matches.length > 1) {
          const prefix = commonPrefix(matches);
          if (prefix.length > val.length) input.value = prefix;
          showSuggestions(matches);
        } else {
          hideSuggestions();
        }
      }
    } else if (e.key === 'Escape') {
      if (!suggestBox.hidden) { hideSuggestions(); return; }
    }
  });
  input.addEventListener('input', () => {
    if (suggestBox.hidden) return;
    const val = input.value.trim().toLowerCase();
    showSuggestions(val ? ALL_CMDS.filter(c => c.startsWith(val)) : ALL_CMDS);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !term.hidden) close(); });

  print("Life Systems Terminal v2.0 — type 'help' or 'ask <question>'");
}

export { initTerminal };
