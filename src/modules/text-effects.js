function initGradientWaveText() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const el = document.querySelector('.hero__bio-gradient');
  if (!el) return;

  const SPEED = 0.8;
  const RANGE = 200;
  let gi = -25;
  let last = performance.now();
  let rafId;

  function tick(now) {
    const dt = Math.min(64, now - last);
    last = now;
    gi += (dt * SPEED) / 16.6667;
    if (gi >= RANGE) gi -= RANGE;
    el.style.setProperty('--gi', gi.toFixed(2));
    rafId = requestAnimationFrame(tick);
  }

  rafId = requestAnimationFrame(tick);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      last = performance.now();
      rafId = requestAnimationFrame(tick);
    }
  });
}

function initSpecialText() {
  const SESSION_KEY = 'hero_name_scrambled';
  if (sessionStorage.getItem(SESSION_KEY)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const el = document.querySelector('.hero__full-name');
  if (!el) return;

  const RANDOM_CHARS = '_!X$0-+*#';
  const SPEED = 22;
  const targetText = el.textContent;

  el.style.minWidth = el.offsetWidth + 'px';
  el.classList.add('is-scrambling');

  let phase = 1;
  let step = 0;
  let intervalId = null;

  function getRandomChar(prev) {
    let c;
    do { c = RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)]; }
    while (c === prev);
    return c;
  }

  function buildPhase1() {
    const len = Math.min(step + 1, targetText.length);
    let chars = [];
    for (let i = 0; i < len; i++) {
      chars.push(getRandomChar(chars[i - 1]));
    }
    while (chars.length < targetText.length) chars.push('\u00A0');
    return chars.join('');
  }

  function buildPhase2() {
    const revealed = Math.floor(step / 2);
    let chars = [];
    for (let i = 0; i < revealed && i < targetText.length; i++) {
      chars.push(targetText[i]);
    }
    if (revealed < targetText.length) {
      chars.push(step % 2 === 0 ? '_' : getRandomChar());
    }
    while (chars.length < targetText.length) {
      chars.push(getRandomChar(chars[chars.length - 1]));
    }
    return chars.join('');
  }

  function tick() {
    if (phase === 1) {
      el.textContent = buildPhase1();
      step++;
      if (step >= targetText.length * 2) {
        phase = 2;
        step = 0;
      }
    } else {
      const text = buildPhase2();
      if (Math.floor(step / 2) >= targetText.length) {
        clearInterval(intervalId);
        el.textContent = targetText;
        el.classList.remove('is-scrambling');
        el.style.minWidth = '';
        sessionStorage.setItem(SESSION_KEY, '1');
        return;
      }
      el.textContent = text;
      step++;
    }
  }

  setTimeout(() => {
    intervalId = setInterval(tick, SPEED);
  }, 450);
}

function initSignature() {
  const sig  = document.querySelector('.signature');
  const path = document.querySelector('.signature__flourish path');
  if (!sig || !path) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const len = path.getTotalLength();
  path.style.strokeDasharray = len;
  path.style.strokeDashoffset = reduced ? 0 : len;

  if (reduced) { sig.classList.add('is-signed'); return; }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      sig.classList.add('is-signed');
      requestAnimationFrame(() => { path.style.strokeDashoffset = 0; });
      obs.unobserve(e.target);
    });
  }, { threshold: 0.4 });
  obs.observe(sig);
}


export { initGradientWaveText, initSpecialText, initSignature };
