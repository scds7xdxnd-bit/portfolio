// World life: the "My world" map follows Seoul (time of day, weather, season)
// and each of the five places answers the visitor in its own way:
//   lab        hold the cursor on it and the reaction heats up (Arrhenius rate)
//   meeting    greetings in Korean, English and Malay meet in one bubble
//   workshop   the monitors switch on one by one and connect
//   courtyard  a lantern flame is handed from person to person
//   garden     fireflies follow you and carry light to the other places
// Three layers sit over the painting: a multiply tint (clipped to the painting's
// own alpha, so the transparent surroundings stay page-coloured), a screen-blended light
// canvas and a normal canvas for particles. Static under reduced motion.

import { seoulClock, phaseMix, seoulWeather } from './living-dawn.js';

// Positions are percentages of the painting.
const ZONES = {
  engineer: { c: [24, 23], r: [13, 14] },
  linguist: { c: [70, 27], r: [13, 10] },
  builder: { c: [26, 57], r: [15, 12] },
  community: { c: [80, 60], r: [14, 11] },
  scholar: { c: [50, 78], r: [12, 9] },
};
const TANKS = [[17.4, 12.6], [19.2, 12], [23.3, 10.6], [25.1, 11.2]];
const REACTOR = [21.3, 15.5], LAB_TAG = [31, 7.5];
const GREETINGS = [['안녕', [64.5, 19.5]], ['hello', [69.2, 17.6]], ['hai', [73.8, 19.5]]], MEET = [69.2, 15.4];
// Workshop screens as quads (TL, TR, BR, BL) traced from the painting, in switch-on order.
const SCREENS = [
  [[19.41, 60.59], [20.83, 60.41], [20.88, 62.12], [19.47, 62.33]],
  [[20.91, 59.78], [22.82, 59.47], [22.87, 61.56], [20.95, 61.94]],
  [[22.19, 53.19], [22.87, 53.65], [22.99, 55.39], [22.41, 54.93]],
  [[23.43, 56.92], [24.91, 57.99], [24.96, 59.98], [23.5, 58.88]],
  [[23.92, 48.5], [26.49, 47.73], [26.52, 50.59], [24.0, 51.36]],
  [[24.79, 51.1], [26.91, 50.39], [26.95, 51.92], [24.86, 52.43]],
  [[27.58, 52.12], [28.9, 51.92], [28.94, 53.4], [27.68, 53.65]],
  [[29.55, 51.48], [30.23, 51.66], [30.27, 52.89], [29.59, 53.09]],
  [[30.64, 56.08], [32.78, 55.77], [32.82, 57.61], [30.71, 57.99]],
];
const LANTERNS = [[72.3, 63.3], [75.6, 67.5], [79.7, 66.8], [79.8, 62.5], [81.7, 57], [84.5, 65.3]];
const STRING_LIGHTS = [[76, 53.4], [77.4, 53.9], [78.8, 53.6], [81.8, 52.6], [83.2, 53], [84.6, 53.5], [86, 54], [87.4, 54.5], [88.8, 54.9]];
const GARDEN = [[49, 85.5], [51.5, 86], [59.5, 83], [44.5, 84.5]];
const CHERRIES = [[9.8, 29], [15.6, 38], [54.7, 24.4], [42.3, 62.5]];
const TREES = [[7, 45], [33, 31], [60, 31], [91, 40], [9, 62], [92, 58], [30, 76], [63, 89], [38, 57], [88, 76], [55, 37]];
const STREAMS = [[39.7, 41], [84.6, 43], [24, 83], [66.5, 55], [36, 46], [70, 70]];
// Warm night windows: [x, y, size].
const WINDOWS = [[23.3, 21.5, 1], [18, 26, .6], [14, 28, .5], [29, 23, .6], [69, 26, 1.3], [64, 22, .7], [76, 24, .7],
  [50, 73, 1.1], [45, 72, .7], [56, 72, .7], [50.4, 68.6, .6], [26, 56, 1.2], [80, 61, 1.3]];
const BUILDINGS = [[59.5, 61.8, 7.5, 13], [56, 58, 10, 14], [63, 65.5, 8.7, 13], [70.8, 73.3, 8, 13], [77.8, 80.3, 8, 13.5], [81, 83.5, 10, 14.5], [74, 76.5, 10.5, 14], [51, 53, 11, 15], [84, 86, 12, 15]];
const TOWER = [68.3, 2.8], FOUNTAIN = [48, 41.5];

const TINT = { dawn: [255, 222, 204], day: [255, 255, 255], dusk: [255, 184, 126], night: [62, 78, 146] };
const GLOW = { dawn: .3, day: 0, dusk: .55, night: 1 };
const SEASON_TINT = { spring: [255, 250, 250], summer: [255, 255, 244], autumn: [255, 238, 214], winter: [230, 238, 255] };
const SKY = { clear: {}, overcast: { grey: .5 }, fog: { grey: .4, fog: 1 }, rain: { rain: .6, grey: .45 }, storm: { rain: 1, grey: .6, flash: 1 }, snow: { snow: 1, grey: .25 } };
const LABELS = {
  en: { now: 'Seoul now', dawn: 'dawn', day: 'daytime', dusk: 'golden hour', night: 'night', spring: 'spring', summer: 'summer', autumn: 'autumn', winter: 'winter', overcast: 'overcast', fog: 'fog', rain: 'rain', storm: 'thunderstorm', snow: 'snow' },
  ko: { now: '지금 서울', dawn: '새벽', day: '낮', dusk: '노을', night: '밤', spring: '봄', summer: '여름', autumn: '가을', winter: '겨울', overcast: '흐림', fog: '안개', rain: '비', storm: '뇌우', snow: '눈' },
  zh: { now: '此刻首尔', dawn: '清晨', day: '白天', dusk: '黄昏', night: '夜晚', spring: '春', summer: '夏', autumn: '秋', winter: '冬', overcast: '阴天', fog: '雾', rain: '雨', storm: '雷雨', snow: '雪' },
};
const HEART = ['.r.r.', 'rrrrr', 'rrrrr', '.rrr.', '..r..'];
const OUTLINE = '#2b2430';

function seasonOf(dayOfYear) {
  const forced = new URLSearchParams(location.search).get('season');
  if (SEASON_TINT[forced]) return forced;
  if (dayOfYear >= 60 && dayOfYear < 152) return 'spring';
  if (dayOfYear >= 152 && dayOfYear < 244) return 'summer';
  if (dayOfYear >= 244 && dayOfYear < 335) return 'autumn';
  return 'winter';
}

export function mountWorldLife(map, { lang = 'en', places = [] } = {}) {
  const art = map?.querySelector('.sun-map-art');
  if (!art) return { destroy() {} };
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const labels = LABELS[lang] || LABELS.en;
  const color = Object.fromEntries(places.map(p => [p.id, p.color]));

  const tint = document.createElement('canvas');
  tint.className = 'sun-map-tint';
  const glowCanvas = document.createElement('canvas');
  glowCanvas.className = 'sun-world-glow';
  const fxCanvas = document.createElement('canvas');
  fxCanvas.className = 'sun-world-fx';
  const now = document.createElement('p');
  now.className = 'sun-map-now';
  for (const el of [tint, glowCanvas, fxCanvas]) el.setAttribute('aria-hidden', 'true');
  art.after(tint, glowCanvas, fxCanvas);
  map.append(now);
  const g = glowCanvas.getContext('2d'), fx = fxCanvas.getContext('2d'), tx = tint.getContext('2d');
  let tintColor = '#fff';

  let W = 0, H = 0, P = 2, dpr = 1, raf = 0, last = 0, visible = false, alive = true;
  let env = { phase: 'day', glow: 0, season: 'autumn', kind: 'clear', sky: SKY.clear };
  const pointer = { x: -1, y: -1, inside: false, sticky: 0 };
  const forced = {};
  const rnd = (a, b) => a + Math.random() * (b - a);
  const X = p => (p / 100) * W, Y = p => (p / 100) * H;
  const inZone = (id, x, y) => { const z = ZONES[id]; return ((x / W * 100 - z.c[0]) / z.r[0]) ** 2 + ((y / H * 100 - z.c[1]) / z.r[1]) ** 2 < 1; };
  const inIsland = (x, y) => ((x / W * 100 - 50) / 45) ** 2 + ((y / H * 100 - 49) / 45) ** 2 < 1;
  const active = (id, t) => forced[id] > t || ((pointer.inside || t < pointer.sticky) && inZone(id, pointer.x, pointer.y));

  // ---- Seoul: time, season, weather -------------------------------------------------
  const applyEnv = () => {
    const clock = seoulClock(), mix = phaseMix(clock);
    const w = { dawn: 0, day: 0, dusk: 0, night: 0 };
    w[mix.a] += 1 - mix.t; w[mix.b] += mix.t;
    const season = seasonOf(clock.dayOfYear), sky = SKY[env.kind] || SKY.clear;
    const c = [0, 1, 2].map(i => {
      let v = Object.keys(w).reduce((s, k) => s + w[k] * TINT[k][i], 0) * SEASON_TINT[season][i] / 255;
      v *= 1 - (sky.grey || 0) * [.34, .32, .26][i];
      return Math.round(v);
    });
    tintColor = `rgb(${c})`; paintTint();
    const phase = Object.keys(w).reduce((a, b) => (w[a] >= w[b] ? a : b));
    env = { ...env, phase, season, sky, glow: Object.keys(w).reduce((s, k) => s + w[k] * GLOW[k], 0) + (sky.grey || 0) * .15 };
    map.dataset.night = env.glow > .6 ? '1' : '';
    const hh = String(Math.floor(clock.hour) % 24).padStart(2, '0'), mm = String(Math.floor((clock.hour % 1) * 60)).padStart(2, '0');
    now.innerHTML = `<span aria-hidden="true"></span>${labels.now} · ${hh}:${mm} · ${labels[phase]} · ${labels[season]}${labels[env.kind] ? ` · ${labels[env.kind]}` : ''}`;
    if (reduce) draw(performance.now());
  };
  const loadWeather = async () => {
    const kind = await seoulWeather();
    if (!alive) return;
    env.kind = kind; applyEnv();
  };

  // ---- State ------------------------------------------------------------------------
  const lab = { heat: 0, acc: 0, puffs: [], sparks: [], flash: 0 };
  const meet = { t: 0, fade: 0 };
  const shop = { prog: 0 };
  const yard = { prog: 0, trail: [] };
  const flies = [], gifts = [];
  let delivered = '', flyClock = 0;
  const parts = [], drops = [], ripples = [], settled = [];
  let flash = 0, nextFlash = 0;
  const stars = BUILDINGS.flatMap(([x0, x1, y0, y1]) => Array.from({ length: 6 }, () => ({ x: rnd(x0, x1), y: rnd(y0, y1), k: Math.random() * 6.28 })));

  const arrhenius = T => Math.exp(6000 * (1 / 293.15 - 1 / (T + 273.15)));

  const update = (t, dt) => {
    // Lab: heat builds while you stay, the rate follows Arrhenius.
    lab.heat = Math.min(1, Math.max(0, lab.heat + (active('engineer', t) ? dt / 4000 : -dt / 7000)));
    const T = 20 + 70 * lab.heat, k = arrhenius(T);
    lab.T = T; lab.k = k;
    lab.acc += dt / 1000 * Math.min(.35 * k, 14);
    while (lab.acc >= 1) {
      lab.acc -= 1;
      const [tx, ty] = TANKS[Math.floor(Math.random() * TANKS.length)];
      lab.puffs.push({ x: X(tx) + rnd(-2, 2), y: Y(ty), vx: rnd(.004, .012) * P, vy: -rnd(.012, .02) * P * (1 + lab.heat), s: 2, life: 0, max: rnd(1600, 2600) });
    }
    if (lab.heat >= 1) {
      lab.heat = .35; lab.flash = 1;
      const cols = ['#5ec8f2', '#2580ad', '#a8ecff', '#ffffff', '#f4e27a'];
      for (let i = 0; i < 34; i++) { const a = rnd(-Math.PI, 0); lab.sparks.push({ x: X(REACTOR[0]), y: Y(REACTOR[1]), vx: Math.cos(a) * rnd(.04, .12) * P, vy: Math.sin(a) * rnd(.06, .16) * P, c: cols[i % cols.length], life: 0, max: rnd(700, 1300) }); }
    }
    lab.flash = Math.max(0, lab.flash - dt / 600);
    for (const p of lab.puffs) { p.life += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.s = 3 + 4 * p.life / p.max; }
    lab.puffs = lab.puffs.filter(p => p.life < p.max);
    for (const p of lab.sparks) { p.life += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += .00025 * P * dt; }
    lab.sparks = lab.sparks.filter(p => p.life < p.max);

    // Meeting table: three greetings, then one shared heart.
    if (active('linguist', t)) { meet.t += dt; meet.fade = Math.min(1, meet.fade + dt / 200); if (meet.t > 5400) meet.t = 0; }
    else { meet.fade = Math.max(0, meet.fade - dt / 250); if (!meet.fade) meet.t = 0; }

    // Workshop: monitors switch on along a wire.
    shop.prog = Math.min(SCREENS.length + 3, Math.max(0, shop.prog + (active('builder', t) ? dt / 170 : -dt / 110)));

    // Courtyard: a flame hops from lantern to lantern.
    yard.prog = Math.min(LANTERNS.length + 1.5, Math.max(0, yard.prog + (active('community', t) ? dt / 430 : -dt / 320)));
    const f = flame();
    if (f) yard.trail.push({ ...f, life: 0 });
    for (const p of yard.trail) p.life += dt;
    yard.trail = yard.trail.filter(p => p.life < 260);

    // Garden: fireflies follow the cursor and deliver light to other places.
    flyClock -= dt;
    if (active('scholar', t) && flyClock <= 0 && flies.filter(f => f.state === 'follow').length < 3) {
      const [gx, gy] = GARDEN[Math.floor(Math.random() * GARDEN.length)];
      flies.push({ x: X(gx), y: Y(gy), vx: 0, vy: -.05, state: 'follow', k: Math.random() * 6.28, life: 1 });
      flyClock = 900;
    }
    const zone = (pointer.inside || t < pointer.sticky) ? Object.keys(ZONES).find(id => inZone(id, pointer.x, pointer.y)) : '';
    if (zone !== delivered) {
      delivered = '';
      const carrier = zone && zone !== 'scholar' && flies.find(f => f.state === 'follow');
      if (carrier) { carrier.state = 'deliver'; carrier.to = zone; delivered = zone; }
    }
    for (const f of flies) {
      f.k += dt / 300;
      let tx, ty;
      if (f.state === 'deliver') { tx = X(ZONES[f.to].c[0]); ty = Y(ZONES[f.to].c[1]); }
      else if (pointer.inside) { tx = pointer.x + Math.cos(f.k) * 16; ty = pointer.y + Math.sin(f.k * 1.3) * 12 - 10; }
      else { const [gx, gy] = GARDEN[0]; tx = X(gx) + Math.cos(f.k) * 20; ty = Y(gy) + Math.sin(f.k) * 8; f.life -= dt / 3000; }
      const pull = f.state === 'deliver' ? .00006 : .00003;
      f.vx = (f.vx + (tx - f.x) * pull * dt) * .92; f.vy = (f.vy + (ty - f.y) * pull * dt) * .92;
      f.x += f.vx * dt; f.y += f.vy * dt;
      if (f.state === 'deliver' && Math.hypot(tx - f.x, ty - f.y) < 8) {
        f.life = 0;
        gifts.push({ x: tx, y: ty, c: color[f.to] || '#f4e27a', life: 0 });
        for (let i = 0; i < 16; i++) { const a = i / 16 * 6.28; parts.push({ kind: 'spark', x: tx, y: ty, vx: Math.cos(a) * .05 * P, vy: Math.sin(a) * .05 * P, c: '#fbf3a0', life: 0, max: 700 }); }
      }
    }
    for (let i = flies.length - 1; i >= 0; i--) if (flies[i].life <= 0) flies.splice(i, 1);
    for (const gft of gifts) gft.life += dt;
    for (let i = gifts.length - 1; i >= 0; i--) if (gifts[i].life > 1400) gifts.splice(i, 1);

    // Season.
    const sp = env.season, cap = 30;
    if (sp === 'spring' && parts.length < cap && Math.random() < dt / 350) {
      const [x, y] = CHERRIES[Math.floor(Math.random() * CHERRIES.length)];
      parts.push({ kind: 'petal', x: X(x) + rnd(-12, 12), y: Y(y) + rnd(-6, 6), vx: rnd(.008, .02) * P, vy: rnd(.008, .014) * P, c: Math.random() < .5 ? '#f6b6c8' : '#fbd7e0', life: 0, max: rnd(4000, 6500), k: Math.random() * 6 });
    }
    if (sp === 'autumn' && parts.length < cap && Math.random() < dt / 450) {
      const [x, y] = TREES[Math.floor(Math.random() * TREES.length)];
      parts.push({ kind: 'leaf', x: X(x) + rnd(-10, 10), y: Y(y) + rnd(-6, 6), vx: rnd(.006, .018) * P, vy: rnd(.01, .016) * P, c: [['#e08a3a', '#b45f22'], ['#c9502f', '#963520'], ['#e9b844', '#b88a26'], ['#b5652f', '#84461c']][Math.floor(Math.random() * 4)], life: 0, max: rnd(3500, 5500), k: Math.random() * 6 });
    }
    if (sp === 'summer') {
      const kind = env.glow > .5 ? 'bug' : 'butterfly', count = parts.filter(p => p.kind === kind).length;
      if (count < (kind === 'bug' ? 8 : 3) && Math.random() < dt / 900) {
        const [x, y] = (kind === 'bug' ? STREAMS : GARDEN)[Math.floor(Math.random() * 4)];
        parts.push({ kind, x: X(x) + rnd(-15, 15), y: Y(y) + rnd(-10, 10), vx: 0, vy: 0, c: Math.random() < .5 ? '#fff6d8' : '#f4e27a', life: 0, max: rnd(6000, 10000), k: Math.random() * 6 });
      }
    }
    for (const p of parts) {
      p.life += dt; p.k = (p.k || 0) + dt / 400;
      if (p.kind === 'petal' || p.kind === 'leaf') { p.x += (p.vx + Math.sin(p.k) * .01 * P) * dt; p.y += p.vy * dt; }
      else if (p.kind === 'bug' || p.kind === 'butterfly') { p.x += Math.cos(p.k * .7) * .012 * P * dt; p.y += Math.sin(p.k) * .008 * P * dt; }
      else { p.x += p.vx * dt; p.y += p.vy * dt; }
    }
    for (let i = parts.length - 1; i >= 0; i--) if (parts[i].life > parts[i].max || !inIsland(parts[i].x, parts[i].y)) parts.splice(i, 1);

    // Weather.
    const { rain = 0, snow = 0, flash: storm = 0 } = env.sky;
    const want = Math.round(rain * 130 + snow * 120);
    while (drops.length < want) drops.push(newDrop(snow > 0, true));
    if (drops.length > want) drops.length = want;
    for (let i = 0; i < drops.length; i++) {
      const d = drops[i];
      d.x += d.vx * dt; d.y += d.vy * dt;
      if (d.snow) d.x += Math.sin((t + d.k) / 600) * .01 * P * dt;
      if (d.y > d.end) {
        if (d.snow && settled.length < 140) settled.push({ x: d.x, y: d.y, life: 0 });
        drops[i] = newDrop(d.snow, false);
      }
    }
    for (const s of settled) s.life += dt;
    while (settled.length && settled[0].life > 4000) settled.shift();
    if (rain && Math.random() < dt * rain / 250) { const [x, y] = STREAMS[Math.floor(Math.random() * STREAMS.length)]; ripples.push({ x: X(x) + rnd(-14, 14), y: Y(y) + rnd(-6, 6), life: 0 }); }
    for (const r of ripples) r.life += dt;
    while (ripples.length && ripples[0].life > 900) ripples.shift();
    if (storm && t > nextFlash) { flash = 1; nextFlash = t + rnd(6000, 14000); }
    flash = Math.max(0, flash - dt / 380);
  };
  const newDrop = (snow, anywhere) => {
    const x = rnd(8, 92), end = Y(rnd(20, 92));
    let y = anywhere ? rnd(Y(5), end) : Y(rnd(2, 10));
    if (!inIsland(X(x), end)) return newDrop(snow, anywhere);
    return snow
      ? { snow, x: X(x), y, end, vx: .004 * P, vy: rnd(.018, .032) * P, k: Math.random() * 4000, s: Math.random() < .3 ? 1.5 : 1 }
      : { snow, x: X(x), y, end, vx: .06 * P, vy: rnd(.32, .42) * P };
  };
  const flame = () => {
    const p = yard.prog;
    if (p <= 0 || p >= LANTERNS.length - 1) return null;
    const s = Math.floor(p), f = p - s, a = LANTERNS[s], b = LANTERNS[s + 1];
    return { x: X(a[0] + (b[0] - a[0]) * f), y: Y(a[1] + (b[1] - a[1]) * f) - Math.sin(f * Math.PI) * Y(4) };
  };

  // ---- Drawing ----------------------------------------------------------------------
  const glowCache = new Map();
  const glowSprite = c => {
    if (!glowCache.has(c)) {
      const s = document.createElement('canvas'); s.width = s.height = 64;
      const x = s.getContext('2d'), gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
      gr.addColorStop(0, c); gr.addColorStop(.35, c + 'aa'); gr.addColorStop(1, c + '00');
      x.fillStyle = gr; x.fillRect(0, 0, 64, 64); glowCache.set(c, s);
    }
    return glowCache.get(c);
  };
  const glow = (x, y, r, c, a) => { if (a <= .01) return; g.globalAlpha = Math.min(1, a); g.drawImage(glowSprite(c), x - r, y - r, r * 2, r * 2); g.globalAlpha = 1; };
  const rect = (ctx, c, x, y, w, h) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x * dpr) / dpr, Math.round(y * dpr) / dpr, Math.max(1 / dpr, Math.round(w * dpr) / dpr), Math.max(1 / dpr, Math.round(h * dpr) / dpr)); };
  // A two-tone pixel (colour plus a darker lower edge), the painting's own shading style.
  const dot = (c, x, y, w = P, h = P, shade) => { rect(fx, c, x, y, w, h); if (shade) rect(fx, shade, x, y + h - Math.min(h / 2, P * .6), w, Math.min(h / 2, P * .6)); };
  const quad = (pts, c, a) => { if (a <= .01) return; g.globalAlpha = Math.min(1, a); g.fillStyle = c; g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(X(x), Y(y)) : g.moveTo(X(x), Y(y)))); g.closePath(); g.fill(); g.globalAlpha = 1; };
  const blob = (x, y, s, c) => { const w = s * P; rect(fx, c, x - w / 2, y - w / 2 + P, w, w - 2 * P); rect(fx, c, x - w / 2 + P, y - w / 2, w - 2 * P, w); };
  const sprite = (grid, x, y, colors, s = P) => {
    for (let r = 0; r < grid.length; r++) for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === '.') continue;
      for (const [ox, oy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) rect(fx, OUTLINE, x + (c + ox) * s, y + (r + oy) * s, s, s);
    }
    for (let r = 0; r < grid.length; r++) for (let c = 0; c < grid[r].length; c++) if (grid[r][c] !== '.') rect(fx, colors[grid[r][c]], x + c * s, y + r * s, s, s);
  };
  const font = (px, mono) => `${mono ? '700' : '600'} ${Math.max(10, px)}px ${mono ? 'ui-monospace, Menlo, monospace' : '"DM Sans", system-ui, sans-serif'}`;
  const bubble = (text, cx, cy, scale, alpha, heart) => {
    if (alpha <= .01 || scale <= .01) return;
    fx.save(); fx.globalAlpha = alpha; fx.translate(cx, cy); fx.scale(scale, scale);
    fx.font = font(5.6 * P);
    const w = heart ? 13 * P : fx.measureText(text).width + 8 * P, h = heart ? 12 * P : Math.max(10, 5.6 * P) + 5 * P;
    rect(fx, OUTLINE, -w / 2 - P, -h - P, w + 2 * P, h + 2 * P);
    rect(fx, '#fffbf1', -w / 2, -h, w, h);
    rect(fx, OUTLINE, -P, 0, 3 * P, 2 * P); rect(fx, '#fffbf1', 0, -P, P, 2 * P);
    if (heart) sprite(HEART, -3.75 * P, -h + 2.5 * P, { r: '#e85d75' }, 1.5 * P);
    else { fx.fillStyle = '#2b2430'; fx.textAlign = 'center'; fx.textBaseline = 'middle'; fx.fillText(text, 0, -h / 2 + .5); }
    fx.restore();
  };

  const draw = t => {
    g.setTransform(dpr, 0, 0, dpr, 0, 0); fx.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, W, H); fx.clearRect(0, 0, W, H);
    const n = env.glow, u = W / 100;

    // Seoul lights.
    for (const [x, y, s] of WINDOWS) glow(X(x), Y(y), s * 2.8 * u, '#ffc66b', n * .8);
    if (n > .02) {
      g.save(); g.globalAlpha = n;
      for (const st of stars) if (Math.sin(t / 900 + st.k) > -.6) rect(g, '#ffe3a1', X(st.x), Y(st.y), P, P);
      g.restore();
      glow(X(TOWER[0]), Y(TOWER[1]), 1.6 * u, '#ff5a4a', n * (Math.sin(t / 500) > 0 ? 1 : .35));
    }
    glow(X(FOUNTAIN[0]), Y(FOUNTAIN[1]), 6 * u, '#ffd36b', .18 + .55 * n + Math.sin(t / 1400) * .06);

    // Lab.
    for (const p of lab.puffs) {
      const a = 1 - p.life / p.max, s2 = Math.round(p.s);
      fx.globalAlpha = a * .35; blob(p.x, p.y, s2 + 2, '#b9ae9a');
      fx.globalAlpha = a; blob(p.x, p.y, s2, '#fbf8f1');
    }
    fx.globalAlpha = 1;
    for (const p of lab.sparks) dot(p.c, p.x, p.y, P, P);
    glow(X(REACTOR[0]), Y(REACTOR[1]), 5 * u, '#5ec8f2', lab.heat * .7 + lab.flash);
    if (lab.heat > .03) {
      const a = Math.min(1, lab.heat * 4), label = `${Math.round(lab.T)}°C · k×${lab.k < 10 ? lab.k.toFixed(1) : Math.round(lab.k)}`;
      fx.save(); fx.globalAlpha = a; fx.font = font(4.3 * P, true);
      const tw = fx.measureText(label).width, w = tw + 9 * P, h = Math.max(10, 4.3 * P) + 5 * P, x = X(LAB_TAG[0]) - w / 2, y = Y(LAB_TAG[1]) - h / 2;
      rect(fx, OUTLINE, x - P, y - P, w + 2 * P, h + 2 * P); rect(fx, '#fffbf1', x, y, w, h);
      rect(fx, OUTLINE, x + 2 * P, y + 1.5 * P, 2 * P, h - 3 * P);
      const fill = (h - 4 * P) * lab.heat; rect(fx, '#e85d4a', x + 2.5 * P, y + h - 2 * P - fill, P, fill);
      fx.fillStyle = OUTLINE; fx.textBaseline = 'middle'; fx.fillText(label, x + 6 * P, y + h / 2 + .5);
      fx.restore();
    }

    // Meeting table.
    if (meet.fade > 0) {
      const mt = meet.t, merge = Math.min(1, Math.max(0, (mt - 1900) / 700)), e = merge * merge * (3 - 2 * merge);
      GREETINGS.forEach(([text, [x, y]], i) => {
        const appear = Math.min(1, Math.max(0, (mt - 150 - i * 350) / 220));
        const bx = X(x + (MEET[0] - x) * e), by = Y(y + (MEET[1] - y) * e);
        bubble(text, bx, by, (appear < 1 ? .6 + .4 * appear : 1) * (1 - e * .4), meet.fade * appear * (1 - e), false);
      });
      const heart = Math.min(1, Math.max(0, (mt - 2400) / 300)) * (1 - Math.min(1, Math.max(0, (mt - 4900) / 400)));
      bubble('', X(MEET[0]), Y(MEET[1]), .7 + .3 * heart + Math.sin(mt / 160) * .03 * heart, meet.fade * heart, true);
    }

    // Workshop.
    const lit = i => Math.min(1, Math.max(0, shop.prog - i));
    SCREENS.forEach((pts, i) => {
      const a = lit(i); if (!a) return;
      const flicker = .82 + .18 * Math.sin(t / 55 + i * 3) * Math.sin(t / 170 + i);
      quad(pts, '#5fb8e6', a * flicker);
      const [cx, cy] = pts.reduce(([sx, sy], [x, y]) => [sx + x / 4, sy + y / 4], [0, 0]);
      glow(X(cx), Y(cy), 1.6 * u, '#6fd3ff', a * .6);
    });
    glow(X(26), Y(55), 9 * u, '#a77be0', Math.max(0, shop.prog - SCREENS.length) / 3 * (.3 + Math.sin(t / 300) * .06));

    // Courtyard.
    LANTERNS.forEach(([x, y], i) => {
      const a = i === 0 ? Math.min(1, yard.prog * 3) : Math.min(1, Math.max(0, (yard.prog - i) * 3));
      glow(X(x), Y(y), 2.6 * u, '#ffae45', a * (.85 + Math.sin(t / 90 + i) * .1));
      if (a > .5) dot(Math.sin(t / 70 + i * 2) > 0 ? '#fff1b8' : '#ffd36b', X(x) - P / 2, Y(y) - P / 2, P, P);
    });
    const strings = Math.min(1, Math.max(0, yard.prog - (LANTERNS.length - 1)));
    STRING_LIGHTS.forEach(([x, y], i) => glow(X(x), Y(y), u, '#fff0b0', Math.max(strings, n * .8) * (.7 + .3 * Math.sin(t / 200 + i * 1.7))));
    for (const p of yard.trail) { const k = 1 - p.life / 300; dot(p.life < 80 ? '#fff3c4' : '#ffae45', p.x - P * k / 2, p.y - P * k / 2, P * k, P * k); }
    const fl = flame(); if (fl) glow(fl.x, fl.y, 1.8 * u, '#ffcf70', 1);

    // Garden fireflies and the light they deliver.
    for (const f of flies) {
      const blink = .55 + .45 * Math.sin(f.k * 3);
      glow(f.x, f.y, 1.5 * u, '#e9ff8a', blink * Math.min(1, f.life));
      dot(blink > .6 ? '#fbffd0' : '#d6f25e', f.x - P / 2, f.y - P / 2, P, P);
    }
    for (const gft of gifts) glow(gft.x, gft.y, 6 * u, gft.c, (1 - gft.life / 1400) * .9);

    // Season and weather particles.
    for (const p of parts) {
      const a = Math.min(1, (p.max - p.life) / 600);
      if (p.kind === 'bug') { glow(p.x, p.y, 1.6 * u, '#e9ff8a', a * (.5 + .5 * Math.sin(p.k * 2))); continue; }
      fx.globalAlpha = a;
      if (p.kind === 'petal') dot(p.c, p.x, p.y, (Math.sin(p.k) > 0 ? 1.5 : 1) * P, P, '#e290aa');
      else if (p.kind === 'leaf') { const flip = Math.sin(p.k * 1.4) > 0; dot(p.c[0], p.x, p.y, (flip ? 1.5 : 1) * P, (flip ? 1 : 1.5) * P, p.c[1]); }
      else if (p.kind === 'butterfly') { const up = Math.sin(p.k * 6) > 0; rect(fx, p.c, p.x - (up ? 1.5 : 2) * P, p.y - (up ? P : 0), (up ? 1 : 1.5) * P, P); rect(fx, p.c, p.x + P, p.y - (up ? P : 0), (up ? 1 : 1.5) * P, P); rect(fx, OUTLINE, p.x, p.y, P, P); }
      else dot(p.c, p.x, p.y, P, P);
      fx.globalAlpha = 1;
    }
    if (drops.length) {
      fx.strokeStyle = 'rgba(48,66,104,.62)'; fx.lineWidth = Math.max(1.3, P * .75); fx.beginPath();
      for (const d of drops) {
        if (d.snow) { dot('#ffffff', d.x, d.y, d.s * P, d.s * P, '#c9d5ea'); continue; }
        fx.moveTo(d.x, d.y); fx.lineTo(d.x - d.vx * 30, d.y - d.vy * 30);
      }
      fx.stroke();
    }
    for (const s of settled) { fx.globalAlpha = 1 - s.life / 4000; rect(fx, '#ffffff', s.x, s.y, 1.5 * P, P); }
    fx.globalAlpha = 1;
    if (ripples.length) {
      fx.strokeStyle = 'rgba(235,244,255,.9)'; fx.lineWidth = Math.max(1, P * .6);
      for (const r of ripples) { const k = r.life / 900; fx.globalAlpha = 1 - k; fx.beginPath(); fx.ellipse(r.x, r.y, (1 + k * 4) * P, (.5 + k * 2) * P, 0, 0, 6.28); fx.stroke(); }
      fx.globalAlpha = 1;
    }
    if (env.sky.fog) for (let i = 0; i < 5; i++) {
      const x = ((t / 90 + i * 260) % (W + 400)) - 200, y = Y(22 + i * 14);
      fx.globalAlpha = .32; fx.drawImage(glowSprite('#ffffff'), x - 26 * u, y - 7 * u, 52 * u, 14 * u); fx.globalAlpha = 1;
    }
    if (flash) glow(W / 2, H / 2, W * .6, '#dfe8ff', flash * .6);
  };

  // Fill with the Seoul tint, then keep it only where the painting is opaque.
  const paintTint = () => {
    if (!W || !art.complete) return;
    tx.setTransform(1, 0, 0, 1, 0, 0);
    const w = tint.width, h = tint.height, gr = tx.createRadialGradient(0, 0, 0, 0, 0, w * .5);
    // Full tint over the island, easing to none at the leafy rim so night fades into the page.
    gr.addColorStop(0, tintColor); gr.addColorStop(.62, tintColor); gr.addColorStop(1, '#fff');
    tx.globalCompositeOperation = 'source-over'; tx.fillStyle = '#fff'; tx.fillRect(0, 0, w, h);
    tx.translate(w / 2, h * .48); tx.scale(1, 1.08 * h / w); tx.fillStyle = gr; tx.fillRect(-w, -w, w * 2, w * 2);
    tx.setTransform(1, 0, 0, 1, 0, 0);
    tx.globalCompositeOperation = 'destination-in'; tx.drawImage(art, 0, 0, tint.width, tint.height);
    tx.globalCompositeOperation = 'source-over';
  };

  // ---- Loop, sizing and input -------------------------------------------------------
  const resize = () => {
    const r = art.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2); W = r.width; H = r.height; P = Math.max(.8, W / 580);
    for (const el of [tint, glowCanvas, fxCanvas]) Object.assign(el.style, { left: `${art.offsetLeft}px`, top: `${art.offsetTop}px`, width: `${W}px`, height: `${H}px` });
    for (const c of [glowCanvas, fxCanvas]) { c.width = Math.round(W * dpr); c.height = Math.round(H * dpr); }
    tint.width = Math.round(W); tint.height = Math.round(H); paintTint();
    draw(performance.now());
  };
  const loop = t => {
    raf = 0;
    if (!alive || !visible) return;
    const dt = Math.min(t - (last || t), 60);
    if (t - last >= 33) { update(t, dt); draw(t); last = t; }
    raf = requestAnimationFrame(loop);
  };
  const start = () => { if (!raf && !reduce && visible) { last = 0; raf = requestAnimationFrame(loop); } };
  const local = e => { const r = fxCanvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  const onMove = e => { const [x, y] = local(e); Object.assign(pointer, { x, y, inside: true }); };
  const onDown = e => { onMove(e); if (e.pointerType !== 'mouse') pointer.sticky = performance.now() + 3500; };
  const onLeave = () => { pointer.inside = false; };
  const onMenu = e => e.preventDefault();
  const onClick = e => { const id = e.target.closest?.('[data-place]')?.dataset.place; if (id) forced[id] = performance.now() + 3200; };
  const onFocus = e => { const b = e.target.closest?.('[data-place]'); if (b && b.matches(':focus-visible')) forced[b.dataset.place] = Infinity; };
  const onBlur = e => { const id = e.target.closest?.('[data-place]')?.dataset.place; if (id && forced[id] === Infinity) forced[id] = 0; };
  map.addEventListener('pointermove', onMove);
  map.addEventListener('pointerdown', onDown);
  map.addEventListener('pointerleave', onLeave);
  map.addEventListener('click', onClick);
  map.addEventListener('contextmenu', onMenu);
  map.addEventListener('focusin', onFocus);
  map.addEventListener('focusout', onBlur);
  const ro = new ResizeObserver(resize); ro.observe(art);
  const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; start(); }); io.observe(map);
  if (art.complete) resize(); else art.addEventListener('load', resize, { once: true });
  applyEnv(); loadWeather();
  const clockTimer = setInterval(applyEnv, 60000), weatherTimer = setInterval(loadWeather, 15 * 60 * 1000);

  return {
    destroy() {
      alive = false; cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); clearInterval(clockTimer); clearInterval(weatherTimer);
      map.removeEventListener('pointermove', onMove); map.removeEventListener('pointerdown', onDown); map.removeEventListener('pointerleave', onLeave);
      map.removeEventListener('click', onClick); map.removeEventListener('contextmenu', onMenu); map.removeEventListener('focusin', onFocus); map.removeEventListener('focusout', onBlur);
      tint.remove(); glowCanvas.remove(); fxCanvas.remove(); now.remove();
    },
  };
}
