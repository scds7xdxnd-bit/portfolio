// Park life: a few pixel creatures on the "My world" map that notice the
// visitor. Pigeons peck around the plaza and scatter when the cursor rushes at
// them (or on a tap); a cat follows the cursor with its eyes and purrs when you
// rest on it. Sprites are drawn from small grids so they sit on the map's own
// pixel grid. Static under reduced motion.

const COLORS = {
  b: '#8d90a0', d: '#5f6273', w: '#c3c6d1', h: '#6c7287', n: '#5f9c8c', e: '#16161b', k: '#e3a24a', y: '#c9706a',
  o: '#d9853b', s: '#a65a22', c: '#f1d9b0', p: '#e88f9a', l: '#f4e27a', q: '#222018', r: '#e85d75',
};

const PIGEON = {
  idle: ['......hh', '.....hek', '..wwwnh.', '.bbwwbb.', 'bbbbbbb.', '...y.y..'],
  peck: ['........', '........', '..wwwb..', '.bbwwbbn', 'bbbbbbhh', '...y.yek'],
  up: ['.w....w.', '.ww..ww.', '..wbbw..', '..bbbbhh', '...bbhek', '........'],
  down: ['........', '..bbbbhh', '.wwbbbek', 'ww....ww', 'w......w', '........'],
};
// Cat sitting, facing the viewer. Eyes are drawn separately so they can move.
const CAT = {
  body: [
    '.o.......o.', '.oo.....oo.', '.ooooooooo.', 'ooooooooooo', 'ooooooooooo', 'oooocpcoooo',
    '.oooocooo..', '..ooooooo..', '.osooooso..', '.ooccccoo..', '..oo...oo..',
  ],
  flat: ['...........', '...........', 'ooooooooooo', 'ooooooooooo'],
  tail: [['.oo', 'o..'], ['oo.', '..o']],
};
const HEART = ['.r.r.', 'rrrrr', 'rrrrr', '.rrr.', '..r..'];

const PIGEON_HOMES = [[45, 57.5], [47.5, 59], [50.2, 57.6], [52.8, 59.4], [54.2, 57.2], [48.6, 61]];
const CAT_HOME = [60.5, 47.5];

export function mountParkLife(map) {
  const art = map?.querySelector('.sun-map-art');
  if (!art) return { destroy() {} };
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.createElement('canvas');
  canvas.className = 'sun-park';
  canvas.setAttribute('aria-hidden', 'true');
  art.after(canvas);
  const ctx = canvas.getContext('2d');

  let W = 0, H = 0, P = 2, dpr = 1, raf = 0, visible = false, alive = true, last = 0;
  const pointer = { x: -1, y: -1, inside: false, speed: 0, t: 0, still: 0 };
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pigeons = PIGEON_HOMES.map(([hx, hy]) => ({ hx, hy, x: hx, y: hy, vx: 0, vy: 0, face: Math.random() < .5 ? 1 : -1, state: 'idle', frame: 'idle', next: rnd(300, 2000), back: 0 }));
  const cat = { startled: 0, purr: 0, hearts: [], blink: rnd(2000, 5000), tail: 0 };

  const resize = () => {
    const r = art.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
    canvas.style.left = `${art.offsetLeft}px`; canvas.style.top = `${art.offsetTop}px`;
    P = Math.max(.8, W / 650);
    draw(0);
  };

  const px = (pct, size) => (pct / 100) * size;
  // Dark outline first (like the painting's own sprites), then the fill.
  const sprite = (grid, x, y, flip = false, outline = '#2b2430') => {
    const s = P * dpr, w = grid[0].length;
    if (outline) {
      ctx.fillStyle = outline;
      for (let r = 0; r < grid.length; r++) for (let c = 0; c < w; c++) {
        if (grid[r][flip ? w - 1 - c : c] === '.') continue;
        for (const [ox, oy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) ctx.fillRect(Math.round(x * dpr + (c + ox) * s), Math.round(y * dpr + (r + oy) * s), Math.ceil(s), Math.ceil(s));
      }
    }
    for (let r = 0; r < grid.length; r++) for (let c = 0; c < w; c++) {
      const ch = grid[r][flip ? w - 1 - c : c];
      if (ch === '.') continue;
      ctx.fillStyle = COLORS[ch];
      ctx.fillRect(Math.round(x * dpr + c * s), Math.round(y * dpr + r * s), Math.ceil(s), Math.ceil(s));
    }
  };
  const dot = (color, x, y, w = 1, h = 1) => {
    const s = P * dpr;
    ctx.fillStyle = COLORS[color];
    ctx.fillRect(Math.round(x * dpr), Math.round(y * dpr), Math.ceil(s * w), Math.ceil(s * h));
  };

  const update = (now, dt) => {
    // Pigeons
    for (const g of pigeons) {
      const gx = px(g.x, W), gy = px(g.y, H);
      const dx = gx - pointer.x, dy = gy - pointer.y, dist = Math.hypot(dx, dy);
      const scare = pointer.inside && ((dist < 70 && pointer.speed > .6) || (pointer.tap && dist < 90));
      if (g.state !== 'fly' && g.state !== 'gone' && scare) {
        g.state = 'fly'; g.face = dx >= 0 ? 1 : -1;
        const a = Math.atan2(dy, dx);
        g.vx = Math.cos(a) * rnd(.22, .32) * 100 / W; g.vy = -rnd(.18, .28) * 100 / H;
      }
      if (g.state === 'idle') {
        g.next -= dt;
        if (g.next <= 0) {
          g.frame = g.frame === 'peck' ? 'idle' : (Math.random() < .55 ? 'peck' : 'idle');
          if (Math.random() < .25) g.face *= -1;
          if (Math.random() < .3) g.x += g.face * rnd(.2, .6);
          g.x += (g.hx - g.x) * .2;
          g.next = rnd(250, 1600);
        }
      } else if (g.state === 'fly') {
        g.x += g.vx * dt; g.y += g.vy * dt; g.vy -= .00001 * dt;
        g.frame = Math.floor(now / 90) % 2 ? 'up' : 'down';
        if (g.y < -8 || g.x < -8 || g.x > 108) { g.state = 'gone'; g.back = now + rnd(3500, 7000); }
      } else if (g.state === 'gone' && now > g.back) {
        g.state = 'land'; g.x = g.hx + (Math.random() < .5 ? -30 : 30); g.y = g.hy - 35; g.face = g.x < g.hx ? 1 : -1;
      } else if (g.state === 'land') {
        g.x += (g.hx - g.x) * .0035 * dt; g.y += (g.hy - g.y) * .0035 * dt;
        g.frame = Math.floor(now / 110) % 2 ? 'up' : 'down';
        if (Math.abs(g.hx - g.x) + Math.abs(g.hy - g.y) < .4) { g.x = g.hx; g.y = g.hy; g.state = 'idle'; g.frame = 'idle'; }
      }
    }
    // Cat
    const cx = px(CAT_HOME[0], W) + 5.5 * P, cy = px(CAT_HOME[1], H) + 4 * P;
    const near = pointer.inside ? Math.hypot(pointer.x - cx, pointer.y - cy) : Infinity;
    if (near < 80 && pointer.speed > .9) cat.startled = 1200;
    cat.startled = Math.max(0, cat.startled - dt);
    cat.purr = near < 30 && pointer.speed < .15 && !cat.startled ? cat.purr + dt : 0;
    if (cat.purr > 700 && now - (cat.lastHeart || 0) > 650) { cat.hearts.push({ x: cx + rnd(-4, 4) * P, y: cy - 7 * P, t: 0 }); cat.lastHeart = now; }
    cat.hearts = cat.hearts.filter(h => (h.t += dt) < 1400);
    cat.blink -= dt; if (cat.blink < -140) cat.blink = rnd(2500, 6000);
    cat.tail = Math.floor(now / (cat.purr > 700 ? 260 : 600)) % 2;
    pointer.tap = false;
    pointer.speed *= .85;
  };

  const shadow = (x, y, w) => { ctx.fillStyle = 'rgba(60,40,20,.28)'; ctx.fillRect(Math.round(x * dpr), Math.round(y * dpr), Math.ceil(w * P * dpr), Math.ceil(P * dpr)); };
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const g of pigeons) {
      if (g.state === 'gone') continue;
      if (g.state === 'idle') shadow(px(g.x, W) - 3 * P, px(g.y, H) + .5 * P, 6);
      sprite(PIGEON[g.frame], px(g.x, W) - 4 * P, px(g.y, H) - 6 * P, g.face < 0);
    }
    // Cat body, ears, tail
    const x = px(CAT_HOME[0], W), y = px(CAT_HOME[1], H);
    shadow(x - P, y + 11.5 * P, 13);
    sprite(CAT.body, x, y);
    if (cat.startled) sprite(CAT.flat, x, y, false, null);
    sprite(CAT.tail[cat.tail], x + 9 * P, y + 7 * P);
    // Eyes: closed when purring or blinking, otherwise looking at the cursor.
    const closed = cat.purr > 700 || cat.blink < 0;
    for (const ex of [2, 7]) {
      if (closed) { dot('s', x + ex * P, y + 4 * P, 2, 1); continue; }
      dot('l', x + ex * P, y + 3 * P, 2, 2);
      let ox = 0, oy = 0;
      if (pointer.inside) {
        const dx = pointer.x - (x + (ex + 1) * P), dy = pointer.y - (y + 4 * P);
        ox = dx > 6 ? 1 : 0; oy = dy > 6 ? 1 : 0;
        if (Math.abs(dx) <= 6) ox = 0;
      } else { ox = 1; oy = 1; }
      dot('q', x + (ex + ox) * P, y + (3 + oy) * P, 1, cat.startled ? 2 : 1);
    }
    for (const h of cat.hearts) {
      ctx.globalAlpha = 1 - h.t / 1400;
      sprite(HEART, h.x - 2.5 * P, h.y - h.t * .03 * P, false, '#7a2234');
      ctx.globalAlpha = 1;
    }
  };

  const loop = now => {
    raf = 0;
    if (!alive || !visible) return;
    const dt = Math.min(now - (last || now), 60);
    if (now - last >= 33) { update(now, dt); draw(); last = now; }
    raf = requestAnimationFrame(loop);
  };
  const start = () => { if (!raf && !reduce && visible) { last = 0; raf = requestAnimationFrame(loop); } };

  const toLocal = e => { const r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  const onMove = e => {
    const [x, y] = toLocal(e), now = performance.now();
    if (pointer.inside) pointer.speed = Math.max(pointer.speed, Math.hypot(x - pointer.x, y - pointer.y) / Math.max(now - pointer.t, 8));
    Object.assign(pointer, { x, y, t: now, inside: true });
  };
  const onDown = e => { onMove(e); pointer.tap = true; };
  const onLeave = () => { pointer.inside = false; pointer.speed = 0; };
  map.addEventListener('pointermove', onMove);
  map.addEventListener('pointerdown', onDown);
  map.addEventListener('pointerleave', onLeave);
  const ro = new ResizeObserver(resize);
  ro.observe(art);
  const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; start(); });
  io.observe(map);
  if (art.complete) resize(); else art.addEventListener('load', resize, { once: true });

  return {
    destroy() {
      alive = false; cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      map.removeEventListener('pointermove', onMove);
      map.removeEventListener('pointerdown', onDown);
      map.removeEventListener('pointerleave', onLeave);
    },
  };
}
