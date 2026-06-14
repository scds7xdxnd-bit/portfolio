import { ACHIEVEMENTS, BASE_ACH, ACH_KEY } from '../data/achievements.js';
import { t } from './i18n.js';

let _unlocked;

function _loadUnlocked() {
  if (_unlocked) return _unlocked;
  let saved = [];
  try { saved = JSON.parse(localStorage.getItem(ACH_KEY) || '[]'); } catch (e) {}
  _unlocked = new Set(Array.isArray(saved) ? saved : []);
  return _unlocked;
}

function unlockAchievement(id) {
  const set = _loadUnlocked();
  if (set.has(id)) return;
  if (!ACHIEVEMENTS.some(a => a.id === id)) return;
  set.add(id);
  try { localStorage.setItem(ACH_KEY, JSON.stringify([...set])); } catch (e) {}
  renderTrophyShelf();
  showAchievementToast(id);
  confettiBurst({ big: id === 'completionist' || id === 'secret' });
  if (id !== 'completionist' && BASE_ACH.every(b => set.has(b)) && !set.has('completionist')) {
    setTimeout(() => unlockAchievement('completionist'), 1400);
  }
}

function renderTrophyShelf() {
  const el = document.getElementById('achievements');
  if (!el) return;
  const set = _loadUnlocked();
  const count = ACHIEVEMENTS.filter(a => set.has(a.id)).length;
  el.innerHTML = `
    <p class="achievements__head">
      <span data-i18n="ach.title">${t('ach.title')}</span>
      <span class="achievements__count">${count}/${ACHIEVEMENTS.length}</span>
    </p>
    <div class="achievements__shelf">
      ${ACHIEVEMENTS.map(a => {
        const got = set.has(a.id);
        const label = got ? t(a.titleKey) : '???';
        const tip   = got ? t(a.descKey) : t('ach.locked');
        return `<div class="achievement ${got ? 'is-unlocked' : 'is-locked'}" title="${label} — ${tip}">
          <span class="achievement__icon">${got ? a.icon : '🔒'}</span>
          <span class="achievement__label">${label}</span>
        </div>`;
      }).join('')}
    </div>`;
}

function showAchievementToast(id) {
  const a = ACHIEVEMENTS.find(x => x.id === id);
  if (!a) return;
  const toast = document.createElement('div');
  toast.className = 'ach-toast';
  toast.setAttribute('role', 'status');
  toast.innerHTML = `
    <span class="ach-toast__icon">${a.icon}</span>
    <span class="ach-toast__body">
      <span class="ach-toast__kicker">${t('ach.unlocked')}</span>
      <span class="ach-toast__title">${t(a.titleKey)}</span>
    </span>`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('is-in'));
  setTimeout(() => {
    toast.classList.remove('is-in');
    setTimeout(() => toast.remove(), 400);
  }, 3400);
}

function confettiBurst(opts) {
  const big = opts && opts.big;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const colors = ['#FFD23F', '#FF6B6B', '#4ECDC4', '#5B8DEF', '#A66BFF'];
  const n = big ? 90 : 30;
  const layer = document.createElement('div');
  layer.className = 'confetti-layer';
  document.body.appendChild(layer);
  for (let i = 0; i < n; i++) {
    const p = document.createElement('span');
    p.className = 'confetti-piece';
    p.style.left = (50 + (Math.random() * 2 - 1) * (big ? 46 : 22)) + 'vw';
    p.style.background = colors[i % colors.length];
    p.style.setProperty('--dx', ((Math.random() * 2 - 1) * 28) + 'vw');
    p.style.setProperty('--dr', (Math.random() * 720 - 360) + 'deg');
    p.style.animationDelay = (Math.random() * 0.25) + 's';
    p.style.animationDuration = (1.2 + Math.random() * 0.9) + 's';
    layer.appendChild(p);
  }
  setTimeout(() => layer.remove(), big ? 2800 : 2300);
}

export { unlockAchievement, renderTrophyShelf };
