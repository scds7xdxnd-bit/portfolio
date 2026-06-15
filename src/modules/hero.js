import { t } from '../lib/i18n.js';
import { unlockAchievement } from '../lib/achievements.js';
import { currentLang } from '../data/i18n.js';

function initHeroAnimation() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = document.querySelectorAll('.hero__blur-item');
  items.forEach((el, i) => {
    const idx = parseInt(el.dataset.revealIndex ?? i, 10);
    const delay = prefersReduced ? 0 : idx * 75;
    setTimeout(() => el.classList.add('is-visible'), delay);
  });
}

function initHeroParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const mediaEl = document.querySelector('.hero__media');
  const contentEl = document.querySelector('.hero__content');
  const hero = document.getElementById('hero');
  if (!mediaEl || !contentEl || !hero) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const heroH = hero.offsetHeight;
      if (scrollY <= heroH) {
        // media drifts slightly faster (appears in foreground)
        const mediaY = Math.min(scrollY * 0.08, 32);
        // content drifts more subtly
        const contentY = Math.min(scrollY * 0.04, 20);
        mediaEl.style.transform = `translateY(${-mediaY}px)`;
        contentEl.style.transform = `translateY(${-contentY}px)`;
      } else {
        mediaEl.style.transform = '';
        contentEl.style.transform = '';
      }
      ticking = false;
    });
  }, { passive: true });
}

const HERO_BUILDS = [
  { label: 'LifeOS — unified life OS',           checked: true  },
  { label: 'CNN emotion → color AI',             checked: true  },
  { label: 'Scholarship writing system',         checked: false },
  { label: 'Bullwhip effect simulator',          checked: true  },
];

function renderHeroBuilds() {
  const container = document.getElementById('hero-builds');
  if (!container) return;

  HERO_BUILDS.forEach(item => {
    const div = document.createElement('div');
    div.className = 'hero__build-item' + (item.checked ? ' is-checked' : '');
    div.setAttribute('role', 'checkbox');
    div.setAttribute('aria-checked', item.checked ? 'true' : 'false');
    div.setAttribute('tabindex', '0');

    const PATH_LEN = 14.5;
    const initialOffset = item.checked ? 0 : PATH_LEN;

    div.innerHTML = `
      <div class="hero__build-box">
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path
            class="hero__build-check"
            d="M 5 10.5 L 8.5 14 L 15 7"
            style="stroke-dasharray:${PATH_LEN};stroke-dashoffset:${initialOffset}"
          />
        </svg>
      </div>
      <div class="hero__build-label-wrap">
        <span class="hero__build-label">${item.label}</span>
        <span class="hero__build-strike"
              style="width:${item.checked ? '100%' : '0'}"></span>
      </div>`;

    div.addEventListener('click', () => toggleBuildItem(div));
    div.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleBuildItem(div);
      }
    });

    container.appendChild(div);
  });
}

function toggleBuildItem(div) {
  const isChecked = div.classList.toggle('is-checked');
  div.setAttribute('aria-checked', isChecked ? 'true' : 'false');

  const path   = div.querySelector('.hero__build-check');
  const strike = div.querySelector('.hero__build-strike');
  const PATH_LEN = 14.5;

  if (path)   path.style.strokeDashoffset = isChecked ? 0 : PATH_LEN;
  if (strike) strike.style.width = isChecked ? '100%' : '0';
}

function initHelloRotator() {
  const word = document.querySelector('.hero__hello-word');
  if (!word) return;
  const greetings = [
    { text: 'Hi',         lang: 'en' },
    { text: '안녕하세요',  lang: 'ko' },
    { text: 'こんにちは',  lang: 'ja' },
    { text: '你好',        lang: 'zh' },
    { text: 'Apa khabar', lang: 'ms' },
    { text: 'Hola',       lang: 'es' },
  ];
  let i = 0;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  setInterval(() => {
    word.classList.add('is-swapping');
    setTimeout(() => {
      i = (i + 1) % greetings.length;
      word.textContent = greetings[i].text;
      word.lang        = greetings[i].lang;
      word.classList.remove('is-swapping');
    }, 260);
  }, 3500);
}

function initAvatarEgg() {
  const avatar = document.querySelector('.player-avatar__img');
  if (!avatar) return;
  avatar.style.cursor = 'pointer';
  let taps = 0, timer = null;
  avatar.addEventListener('click', () => {
    taps++;
    clearTimeout(timer);
    if (taps >= 5) { taps = 0; unlockAchievement('secret'); }
    else { timer = setTimeout(() => { taps = 0; }, 1800); }
  });
}

function initNpcDialogue() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const el = document.querySelector('.hero__speech p');
  const bubble = document.querySelector('.hero__speech');
  if (!el) return;
  const LINES = {
    en: [
      null, // filled from i18n on first run
      'Five languages. Two degrees. Six deployed apps.',
      "If it can't be built, I'll figure out why.",
      'Currently in Seoul, probably in a flow state.',
      'I optimize for clarity — not cleverness.',
      '← click to ask me anything',
    ],
    ko: [
      null,
      '시스템이 의지력을 이깁니다.',
      '다섯 개 언어, 여섯 개 앱, 하나의 이야기.',
      '서울에서 코딩 중 — 아마 플로우 상태.',
      '명확함을 위해 최적화합니다.',
      '← 뭐든지 물어보세요',
    ],
    zh: [
      null,
      '系统胜过意志力。',
      '五种语言，六个应用，一个故事。',
      '在首尔写代码，可能处于心流状态。',
      '我追求清晰，而非聪明。',
      '← 有什么想问的都可以',
    ],
  };
  let idx = 0;
  el.style.transition = 'opacity 280ms';
  setInterval(() => {
    if (!window._heroInView) return;
    const pool = LINES[currentLang] || LINES.en;
    if (!pool[0]) pool[0] = el.textContent;
    idx = (idx + 1) % pool.length;
    el.style.opacity = '0';
    setTimeout(() => { el.textContent = pool[idx] ?? pool[0]; el.style.opacity = '1'; }, 280);
  }, 10000);

  // T4.1 — click speech bubble to open terminal and pre-fill "ask "
  if (bubble) {
    bubble.style.cursor = 'pointer';
    bubble.title = 'Click to ask me anything';
    bubble.addEventListener('click', () => {
      const toggle = document.getElementById('terminal-toggle');
      const inp = document.getElementById('terminal-input');
      toggle?.click();
      setTimeout(() => {
        if (inp) { inp.value = 'ask '; inp.focus(); }
      }, 350);
    });
  }
}

function initIdleAvatar() {
  const img = document.querySelector('.player-avatar__img');
  if (!img) return;
  let t;
  const reset = () => {
    img.classList.remove('is-idle');
    clearTimeout(t);
    t = setTimeout(() => {
      if (window._heroInView) img.classList.add('is-idle');
    }, 12000);
  };
  ['mousemove', 'keydown', 'touchstart', 'scroll'].forEach(ev =>
    document.addEventListener(ev, reset, { passive: true })
  );
  reset();
}


// §5.6 Cursor spotlight — desktop hero only, reduced-motion aware
function initCursorSpotlight() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip touch devices

  const hero = document.getElementById('hero');
  if (!hero) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pctX = (x / rect.width * 100).toFixed(1);
    const pctY = (y / rect.height * 100).toFixed(1);
    hero.style.setProperty('--spotlight-x', `${pctX}%`);
    hero.style.setProperty('--spotlight-y', `${pctY}%`);
    hero.classList.add('has-spotlight');
  });

  hero.addEventListener('mouseleave', () => {
    hero.classList.remove('has-spotlight');
  });
}

export { initHeroAnimation, initHeroParallax, renderHeroBuilds, initHelloRotator, initNpcDialogue, initIdleAvatar, initAvatarEgg, initCursorSpotlight };
