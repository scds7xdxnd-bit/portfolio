import { t } from '../lib/i18n.js';
import { unlockAchievement } from '../lib/achievements.js';

function initBullwhipSim() {
  const sim     = document.getElementById('bullwhip-sim');
  if (!sim) return;
  const slider  = document.getElementById('bullwhip-slider');
  const valEl   = document.getElementById('bullwhip-shock-val');
  const barsEl  = document.getElementById('bullwhip-bars');
  const insight = document.getElementById('bullwhip-insight');
  if (!slider || !valEl || !barsEl || !insight) return;

  const AGENTS = [
    { labelKey: 'bullwhip.agent.retailer',     factor: 1.3, color: 'var(--mint)'     },
    { labelKey: 'bullwhip.agent.distributor',  factor: 2.1, color: 'var(--sunshine)' },
    { labelKey: 'bullwhip.agent.manufacturer', factor: 3.5, color: 'var(--coral)'    },
    { labelKey: 'bullwhip.agent.supplier',     factor: 5.8, color: 'var(--purple)'   },
  ];
  const MAX_W_PCT = 40 * 5.8;

  function update(shock) {
    valEl.textContent = shock + '%';
    barsEl.innerHTML = AGENTS.map(a => {
      const orderPct = Math.round(shock * a.factor);
      const barW     = shock === 0 ? 0 : Math.min(100, (orderPct / MAX_W_PCT) * 100);
      return `<div class="bullwhip-bar">
        <span class="bullwhip-bar__label">${t(a.labelKey)}</span>
        <div class="bullwhip-bar__track">
          <div class="bullwhip-bar__fill" style="width:${barW}%;background:${a.color}"></div>
        </div>
        <span class="bullwhip-bar__val">${shock === 0 ? '—' : '+' + orderPct + '%'}</span>
      </div>`;
    }).join('');
    insight.textContent = shock === 0
      ? t('bullwhip.insight.zero')
      : t('bullwhip.insight.active')
          .replace('{{shock}}', shock)
          .replace('{{amp}}', Math.round(shock * 5.8))
          .replace('{{factor}}', '5.8');
  }

  slider.addEventListener('input', () => {
    update(parseInt(slider.value, 10));
    unlockAchievement('tinkerer');
  });
  update(parseInt(slider.value, 10));
}

function initPhSim() {
  const sim      = document.getElementById('ph-sim');
  if (!sim) return;
  const slider   = document.getElementById('ph-slider');
  const valEl    = document.getElementById('ph-val');
  const swatchEl = document.getElementById('ph-swatch');
  const regimeEl = document.getElementById('ph-regime');
  const concEl   = document.getElementById('ph-conc');
  const substEl  = document.getElementById('ph-substance');
  if (!slider || !valEl || !swatchEl) return;

  // Universal-indicator colour stops, one per integer pH 0-14
  const STOPS = [
    '#E8000A','#F52000','#F75000','#E87500',
    '#D4A000','#A8B800','#22A244','#009966',
    '#0088BB','#0055AA','#2233AA','#5511AA',
    '#7711BB','#9900BB','#BB00AA',
  ];

  const SUBSTANCES = [
    'Battery acid (HCl)',   'Stomach acid',      'Lemon juice',
    'Vinegar',              'Tomato / coffee',   'Black coffee',
    'Milk / urine',         'Pure water ✓',      'Seawater',
    'Baking soda',          'Milk of magnesia',  'Ammonia',
    'Soapy water',          'Oven cleaner',      'Drain cleaner (NaOH)',
  ];

  function lerp(a, b, t) { return a + (b - a) * t; }

  function phToColor(ph) {
    const i  = Math.min(Math.floor(ph), 13);
    const t  = ph - i;
    const c1 = STOPS[i], c2 = STOPS[i + 1];
    const parse = h => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
    const [r1,g1,b1] = parse(c1), [r2,g2,b2] = parse(c2);
    return `rgb(${Math.round(lerp(r1,r2,t))},${Math.round(lerp(g1,g2,t))},${Math.round(lerp(b1,b2,t))})`;
  }

  function phToConc(ph) {
    const exp = Math.floor(-ph);
    const mant = Math.pow(10, -ph - Math.floor(-ph));
    return `[H⁺] = ${mant.toFixed(1)} × 10<sup>${exp}</sup> mol/L`;
  }

  function update(ph) {
    ph = parseFloat(ph);
    const color  = phToColor(ph);
    const regime = ph < 6.9 ? t('ph.regime.acidic') : ph > 7.1 ? t('ph.regime.basic') : t('ph.regime.neutral');
    const textCol = (ph >= 4 && ph <= 10) ? '#1A1A2E' : '#fff';

    valEl.textContent  = ph.toFixed(1);
    regimeEl.textContent = regime;
    valEl.style.color  = textCol;
    regimeEl.style.color = textCol;
    swatchEl.style.background = color;
    concEl.innerHTML   = phToConc(ph);
    substEl.textContent = SUBSTANCES[Math.round(Math.max(0, Math.min(14, ph)))];
    unlockAchievement('tinkerer');
  }

  slider.addEventListener('input', () => update(slider.value));
  update(slider.value);
}

function initRxnSim() {
  const sim = document.getElementById('rxn-sim');
  if (!sim) return;
  const tau   = document.getElementById('rxn-tau');
  const tauLbl= document.getElementById('rxn-tau-val');
  const bar   = document.getElementById('rxn-bar');
  const pctEl = document.getElementById('rxn-pct');
  const lbl   = document.getElementById('rxn-lbl');
  if (!tau) return;
  const k = 0.5; // first-order rate constant, min⁻¹
  let mode = 'CSTR';

  function X(t) { return mode === 'CSTR' ? (k*t)/(1+k*t) : 1 - Math.exp(-k*t); }

  function update() {
    const t = +tau.value;
    const conv = X(t);
    tauLbl.textContent = t.toFixed(1);
    bar.style.width = (conv*100).toFixed(1) + '%';
    bar.style.background = mode === 'CSTR' ? 'var(--sky)' : 'var(--coral)';
    pctEl.textContent = (conv*100).toFixed(1) + '%';
    lbl.textContent = mode === 'CSTR'
      ? `CSTR: X = kτ/(1+kτ)  —  well-mixed, lower efficiency`
      : `PFR: X = 1−e^(−kτ)  —  plug flow, always beats CSTR`;
    unlockAchievement('tinkerer');
  }

  sim.querySelectorAll('.rxn-sim__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      mode = btn.dataset.mode;
      sim.querySelectorAll('.rxn-sim__btn').forEach(b => b.classList.toggle('is-active', b === btn));
      update();
    });
  });
  tau.addEventListener('input', update);
  update();
}

function initGuestbook() {
  const canvas = document.getElementById('doodle-canvas');
  if (!canvas) return;
  const ctx  = canvas.getContext('2d');
  const wall = document.getElementById('guestbook-wall');
  const MAX  = 12;
  let drawing = false, color = '#1A1A2E', size = 3;

  ctx.fillStyle = '#FFF7E6'; ctx.fillRect(0, 0, canvas.width, canvas.height);

  function pos(e) {
    const r = canvas.getBoundingClientRect(), s = e.touches ? e.touches[0] : e;
    return [(s.clientX - r.left) * (canvas.width / r.width), (s.clientY - r.top) * (canvas.height / r.height)];
  }
  function draw(e) {
    if (!drawing) return;
    const [x, y] = pos(e);
    ctx.lineTo(x, y); ctx.strokeStyle = color; ctx.lineWidth = size;
    ctx.lineCap = 'round'; ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y);
  }
  function start(e) { e.preventDefault?.(); drawing = true; const [x,y] = pos(e); ctx.beginPath(); ctx.moveTo(x,y); }

  canvas.addEventListener('mousedown', start);
  canvas.addEventListener('mousemove', draw);
  ['mouseup','mouseleave'].forEach(ev => canvas.addEventListener(ev, () => drawing = false));
  canvas.addEventListener('touchstart', start, { passive: false });
  canvas.addEventListener('touchmove', e => { e.preventDefault(); draw(e); }, { passive: false });
  canvas.addEventListener('touchend', () => drawing = false);

  document.getElementById('doodle-color').addEventListener('input', e => color = e.target.value);
  document.getElementById('doodle-size').addEventListener('input', e => size = +e.target.value);
  document.getElementById('doodle-clear').addEventListener('click', () => {
    ctx.fillStyle = '#FFF7E6'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  });
  document.getElementById('doodle-submit').addEventListener('click', () => {
    const url = canvas.toDataURL('image/png');
    const entries = JSON.parse(localStorage.getItem('th_guestbook') || '[]');
    entries.unshift({ url, ts: Date.now() });
    if (entries.length > MAX) entries.pop();
    localStorage.setItem('th_guestbook', JSON.stringify(entries));
    ctx.fillStyle = '#FFF7E6'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    renderWall(entries);
  });

  function renderWall(entries) {
    wall.innerHTML = entries.length
      ? entries.map(e => `<img class="guestbook__entry" src="${e.url}" alt="Guest mark" loading="lazy">`).join('')
      : `<p class="guestbook__empty">No marks yet — be the first.</p>`;
  }
  renderWall(JSON.parse(localStorage.getItem('th_guestbook') || '[]'));
}


export { initBullwhipSim, initPhSim, initRxnSim, initGuestbook };
