function initXpBar() {
  const fill = document.getElementById('xp-fill');
  if (!fill) return;

  function update() {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;
    const pct = Math.min(100, (scrolled / maxScroll) * 100);
    fill.style.width = pct + '%';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

function initDistilCol() {
  const fill = document.getElementById('distil-fill');
  const pctEl = document.getElementById('distil-pct');
  if (!fill) return;
  window.addEventListener('scroll', () => {
    const p = Math.min(100, (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
    fill.style.height = p.toFixed(1) + '%';
    if (pctEl) pctEl.textContent = Math.round(p) + '%';
  }, { passive: true });
}

function initConsoleEgg() {
  try {
    console.log('%c👋 Hey, you opened the console.', 'font-size:14px;font-weight:700;color:#FF6B6B;');
    console.log('%cThat makes you exactly the kind of person I built this for.\nLet\'s build something → ammarhakimikm03@gmail.com', 'font-size:12px;color:#4ECDC4;line-height:1.5;');
    console.log('%cP.S. there\'s a hidden achievement. Try tapping the avatar 5×.', 'font-size:11px;color:#999;');
  } catch (e) {}
}

function initWorldBgParallax() {
  const img = document.querySelector('.world-bg img');
  if (!img) return;
  function update() {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;
    const pct = (window.scrollY / maxScroll) * 100;
    img.style.objectPosition = `center ${pct}%`;
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}


export { initWorldBgParallax, initXpBar, initDistilCol, initConsoleEgg };
