import { t } from '../lib/i18n.js';

function initLifeSystem() {
  const container = document.getElementById('life-system');
  if (!container) return;

  const W = container.offsetWidth || 560;
  const H = container.offsetHeight || 260;
  const cx = W / 2, cy = H / 2;
  const r  = Math.min(W, H) * 0.33;
  const NR = 34; // node hit-radius (px from center)

  const NODES = [
    { id: 'linguist',  icon: '🗣️', color: 'var(--sky)',      label: t('spec.tab.linguist')  },
    { id: 'engineer',  icon: '⚗️', color: 'var(--coral)',    label: t('spec.tab.engineer')  },
    { id: 'builder',   icon: '💻', color: 'var(--mint)',     label: t('spec.tab.builder')   },
    { id: 'community', icon: '🤝', color: 'var(--purple)',   label: t('spec.tab.community') },
    { id: 'scholar',   icon: '📊', color: 'var(--sunshine)', label: t('spec.tab.scholar')   },
  ].map((n, i) => {
    const angle = -Math.PI / 2 + i * 2 * Math.PI / 5;
    return { ...n, x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), vx: 0, vy: 0 };
  });

  // Pure pentagon edges — symmetric so equilibrium is a regular pentagon
  const EDGES = [[0,1],[1,2],[2,3],[3,4],[4,0]];
  const REST_LEN = 2 * r * Math.sin(Math.PI / 5); // exact pentagon edge length
  const K = 0.05, DAMP = 0.88;
  const REPULSION_C = r * r * 3; // pairwise anti-overlap repulsion

  // SVG for edge lines
  const ns  = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('class', 'life-system__svg');
  svg.setAttribute('aria-hidden', 'true');
  container.appendChild(svg);

  const lines = EDGES.map(() => {
    const l = document.createElementNS(ns, 'line');
    l.setAttribute('class', 'life-system__edge');
    svg.appendChild(l);
    return l;
  });

  // Node DOM elements
  const nodeEls = NODES.map(n => {
    const el = document.createElement('div');
    el.className = 'life-system__node';
    el.style.setProperty('--nc', n.color);
    el.innerHTML = `<span class="life-system__icon">${n.icon}</span><span class="life-system__label" data-i18n="spec.tab.${n.id}">${n.label}</span>`;
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.dataset.domain = n.id;
    container.appendChild(el);
    return el;
  });

  let dragging = null, dragOx = 0, dragOy = 0;
  let rafId = null, lastT = 0, animating = false;

  function getXY(e) {
    const t = e.touches ? e.touches[0] : e;
    return [t.clientX, t.clientY];
  }

  function onDown(e) {
    const idx = nodeEls.indexOf(e.currentTarget);
    if (idx < 0) return;
    dragging = idx;
    const rect = container.getBoundingClientRect();
    const [cx, cy] = getXY(e);
    dragOx = cx - rect.left - NODES[idx].x;
    dragOy = cy - rect.top  - NODES[idx].y;
    nodeEls[idx].classList.add('is-dragging');
    if (!animating) startSim();
    e.preventDefault();
  }

  function onMove(e) {
    if (dragging === null) return;
    const rect = container.getBoundingClientRect();
    const [cx, cy] = getXY(e);
    NODES[dragging].x = Math.max(NR, Math.min(W - NR, cx - rect.left - dragOx));
    NODES[dragging].y = Math.max(NR, Math.min(H - NR, cy - rect.top  - dragOy));
    NODES[dragging].vx = 0; NODES[dragging].vy = 0;
    e.preventDefault();
  }

  function onUp() {
    if (dragging !== null) nodeEls[dragging].classList.remove('is-dragging');
    dragging = null;
  }

  nodeEls.forEach(el => {
    el.addEventListener('mousedown',  onDown);
    el.addEventListener('touchstart', onDown, { passive: false });
  });
  document.addEventListener('mousemove',  onMove);
  document.addEventListener('touchmove',  onMove, { passive: false });
  document.addEventListener('mouseup',    onUp);
  document.addEventListener('touchend',   onUp);

  function tick(t) {
    const dt = Math.min((t - lastT) / 16, 3);
    lastT = t;

    // Spring attraction along edges
    EDGES.forEach(([ai, bi]) => {
      const a = NODES[ai], b = NODES[bi];
      const dx = b.x - a.x, dy = b.y - a.y;
      const dist = Math.hypot(dx, dy) || 1;
      const f = K * (dist - REST_LEN);
      const fx = (dx / dist) * f, fy = (dy / dist) * f;
      if (dragging !== ai) { a.vx += fx * dt; a.vy += fy * dt; }
      if (dragging !== bi) { b.vx -= fx * dt; b.vy -= fy * dt; }
    });

    // Pairwise repulsion between ALL nodes — prevents any two from overlapping
    for (let i = 0; i < NODES.length; i++) {
      for (let j = i + 1; j < NODES.length; j++) {
        const a = NODES[i], b = NODES[j];
        const dx = b.x - a.x, dy = b.y - a.y;
        const dist2 = Math.max(dx * dx + dy * dy, 1);
        const dist  = Math.sqrt(dist2);
        const f  = REPULSION_C / dist2;
        const fx = (dx / dist) * f, fy = (dy / dist) * f;
        if (dragging !== i) { a.vx -= fx * dt; a.vy -= fy * dt; }
        if (dragging !== j) { b.vx += fx * dt; b.vy -= fy * dt; }
      }
    }

    let moving = false;
    NODES.forEach((n, i) => {
      if (dragging === i) return;
      n.vx *= Math.pow(DAMP, dt); n.vy *= Math.pow(DAMP, dt);
      n.x += n.vx * dt;           n.y += n.vy * dt;
      n.x = Math.max(NR, Math.min(W - NR, n.x));
      n.y = Math.max(NR, Math.min(H - NR, n.y));
      if (Math.abs(n.vx) > 0.05 || Math.abs(n.vy) > 0.05) moving = true;
    });

    nodeEls.forEach((el, i) => {
      el.style.transform = `translate(${NODES[i].x - NR}px, ${NODES[i].y - NR}px)`;
    });
    EDGES.forEach(([ai, bi], i) => {
      lines[i].setAttribute('x1', NODES[ai].x); lines[i].setAttribute('y1', NODES[ai].y);
      lines[i].setAttribute('x2', NODES[bi].x); lines[i].setAttribute('y2', NODES[bi].y);
    });

    // keep running while dragging or nodes are still moving
    if (moving || dragging !== null) {
      rafId = requestAnimationFrame(tick);
    } else {
      animating = false;
    }
  }

  function startSim() {
    if (animating) return;
    animating = true;
    lastT = performance.now();
    rafId = requestAnimationFrame(tick);
  }

  // Initial draw (static)
  nodeEls.forEach((el, i) => {
    el.style.transform = `translate(${NODES[i].x - NR}px, ${NODES[i].y - NR}px)`;
  });
  EDGES.forEach(([ai, bi], i) => {
    lines[i].setAttribute('x1', NODES[ai].x); lines[i].setAttribute('y1', NODES[ai].y);
    lines[i].setAttribute('x2', NODES[bi].x); lines[i].setAttribute('y2', NODES[bi].y);
  });

  // Gentle nudge on first scroll-in
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      NODES.forEach(n => { n.vx = (Math.random() - 0.5) * 1.4; n.vy = (Math.random() - 0.5) * 1.4; });
      startSim();
      obs.disconnect();
    }
  }, { threshold: 0.4 });
  obs.observe(container);

}

export { initLifeSystem };
