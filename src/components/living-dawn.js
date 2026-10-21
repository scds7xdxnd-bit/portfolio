// Living dawn: the hero painting follows Seoul's real time of day, and the
// visitor's cursor (or finger) acts as the sun, relighting the scene.
// Falls back to swapping the plain <img> when WebGL or motion is unavailable.

const PHASES = ['dawn', 'day', 'dusk', 'night'];
const LABELS = {
  en: { seoul: 'Seoul', dawn: 'dawn', day: 'midday', dusk: 'golden hour', night: 'night' },
  ko: { seoul: '서울', dawn: '새벽', day: '한낮', dusk: '노을', night: '밤' },
  zh: { seoul: '首尔', dawn: '清晨', day: '正午', dusk: '黄昏', night: '夜晚' },
};
// Warm light colour the cursor casts in each phase.
const TINT = { dawn: [1, .78, .5], day: [1, .95, .82], dusk: [1, .58, .3], night: [1, .74, .4] };

const src = (phase, mobile) => `/assets/sun-of-korea/${phase}-${mobile ? 'mobile' : 'desktop'}.webp`;

function seoulClock() {
  const override = Number(new URLSearchParams(location.search).get('hour'));
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hourCycle: 'h23',
  }).formatToParts(new Date()).map(p => [p.type, p.value]));
  const start = Date.UTC(+parts.year, 0, 0), now = Date.UTC(+parts.year, +parts.month - 1, +parts.day);
  const dayOfYear = (now - start) / 864e5;
  const hour = Number.isFinite(override) && new URLSearchParams(location.search).has('hour') ? override : +parts.hour + +parts.minute / 60;
  return { hour, dayOfYear };
}

// Seoul sunrise/sunset drift between ~5:10/19:55 (June) and ~7:45/17:15 (December).
function phaseMix({ hour, dayOfYear }) {
  const season = Math.cos(2 * Math.PI * (dayOfYear - 172) / 365);
  const rise = 6.5 - 1.3 * season, set = 18.6 + 1.3 * season;
  const keys = [[rise - 1.2, 3], [rise - .2, 0], [rise + 1.8, 0], [rise + 3.2, 1], [set - 2.2, 1], [set - .8, 2], [set + .3, 2], [set + 1.2, 3]];
  for (let i = 0; i < keys.length - 1; i++) {
    const [t0, a] = keys[i], [t1, b] = keys[i + 1];
    if (hour >= t0 && hour < t1) {
      const t = (hour - t0) / (t1 - t0), s = t * t * (3 - 2 * t);
      return { a: PHASES[a], b: PHASES[b], t: s };
    }
  }
  return { a: 'night', b: 'night', t: 0 };
}

const VERT = `attribute vec2 p;varying vec2 v;void main(){v=vec2(p.x*.5+.5,.5-p.y*.5);gl_Position=vec4(p,0.,1.);}`;
const FRAG = `precision mediump float;
uniform sampler2D uA,uB;uniform float uMix,uPower,uNight;uniform vec2 uRes,uImg,uAlign,uLight;uniform vec3 uTint;varying vec2 v;
vec2 cover(vec2 s){float sa=uRes.x/uRes.y,ia=uImg.x/uImg.y;vec2 k=sa>ia?vec2(1.,ia/sa):vec2(sa/ia,1.);return (s-uAlign)*k+uAlign;}
vec3 tex(vec2 u){return mix(texture2D(uA,u).rgb,texture2D(uB,u).rgb,uMix);}
float lum(vec2 u){return dot(tex(u),vec3(.299,.587,.114));}
void main(){
  vec2 u=cover(v);vec3 c=tex(u);
  if(uPower>.001){
    float sa=uRes.x/uRes.y;vec2 e=2./uImg;
    vec3 n=normalize(vec3((lum(u-vec2(e.x,0.))-lum(u+vec2(e.x,0.)))*3.,(lum(u-vec2(0.,e.y))-lum(u+vec2(0.,e.y)))*3.,1.));
    vec2 d=(uLight-v)*vec2(sa,1.);float dist=length(d);
    float diff=max(dot(n,normalize(vec3(d,.55))),0.);
    float wide=exp(-dist*2.4),core=exp(-dist*dist*38.),dayP=uPower*(1.-uNight);
    c*=mix(1.,.84+.32*diff,.55*uPower);
    c*=1.-dayP*.22*(1.-wide);
    c=mix(c,c*(1.+uTint*.5),wide*dayP);
    c+=uTint*core*.38*dayP;
    c=mix(c,c*(.55+1.4*wide*uTint),uNight*uPower);
  }
  gl_FragColor=vec4(c,1.);
}`;

export function mountLivingDawn(hero, lang = 'en') {
  if (!hero) return { destroy() {} };
  const art = hero.querySelector('.sun-hero-art');
  const img = art.querySelector('img');
  const mq = window.matchMedia('(max-width: 600px)');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const labels = LABELS[lang] || LABELS.en;
  const clock = document.createElement('p');
  clock.className = 'sun-clock';
  clock.setAttribute('aria-live', 'off');
  hero.append(clock);

  let mix = phaseMix(seoulClock());
  let gl, prog, canvas, raf = 0, timer = 0, alive = true, visible = true, observer;
  const textures = new Map();
  const light = { x: .77, y: .3, tx: .77, ty: .3, power: 0, target: 0 };

  const dominant = () => (mix.t < .5 ? mix.a : mix.b);
  const applyPhase = () => {
    const night = (mix.a === 'night' ? 1 - mix.t : 0) + (mix.b === 'night' ? mix.t : 0);
    hero.style.setProperty('--night', night.toFixed(3));
    hero.dataset.phase = dominant();
    hero.classList.toggle('is-night', night > .5);
    const { hour } = seoulClock();
    const hh = String(Math.floor(hour) % 24).padStart(2, '0'), mm = String(Math.floor((hour % 1) * 60)).padStart(2, '0');
    clock.textContent = `${labels.seoul} · ${hh}:${mm} · ${labels[dominant()]}`;
    // Plain-image fallback (also what shows before WebGL is ready).
    const source = art.querySelector('source'), mobileSrc = src(dominant(), true), desktopSrc = src(dominant(), false);
    if (source && source.getAttribute('srcset') !== mobileSrc) source.setAttribute('srcset', mobileSrc);
    if (img.getAttribute('src') !== desktopSrc) img.setAttribute('src', desktopSrc);
  };

  const loadTexture = phase => {
    const key = `${phase}-${mq.matches}`;
    if (!textures.has(key)) textures.set(key, new Promise((resolve, reject) => {
      const im = new Image();
      im.decoding = 'async';
      im.onload = () => {
        if (!gl) return reject(new Error('no gl'));
        const t = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, t);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, im);
        resolve({ t, w: im.naturalWidth, h: im.naturalHeight });
      };
      im.onerror = reject;
      im.src = src(phase, mq.matches);
    }));
    return textures.get(key);
  };

  const draw = async () => {
    if (!gl || !alive) return;
    const want = `${mix.a}|${mix.b}|${mq.matches}`;
    const [A, B] = await Promise.all([loadTexture(mix.a), loadTexture(mix.b)]);
    // A newer draw owns the frame if the phase or breakpoint changed while loading.
    if (!alive || want !== `${mix.a}|${mix.b}|${mq.matches}`) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    gl.viewport(0, 0, w, h);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, A.t);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, B.t);
    const u = name => gl.getUniformLocation(prog, name);
    gl.uniform1i(u('uA'), 0); gl.uniform1i(u('uB'), 1);
    gl.uniform1f(u('uMix'), mix.t);
    gl.uniform2f(u('uRes'), w, h);
    gl.uniform2f(u('uImg'), A.w, A.h);
    gl.uniform2f(u('uAlign'), mq.matches ? 1 : .5, 1);
    gl.uniform2f(u('uLight'), light.x, light.y);
    gl.uniform1f(u('uPower'), light.power);
    gl.uniform1f(u('uNight'), parseFloat(hero.style.getPropertyValue('--night')) || 0);
    const ta = TINT[mix.a], tb = TINT[mix.b];
    gl.uniform3f(u('uTint'), ...ta.map((x, i) => x + (tb[i] - x) * mix.t));
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    canvas.classList.add('is-ready');
  };

  const tick = () => {
    raf = 0;
    light.x += (light.tx - light.x) * .14;
    light.y += (light.ty - light.y) * .14;
    light.power += (light.target - light.power) * .08;
    draw();
    const settling = Math.abs(light.tx - light.x) + Math.abs(light.ty - light.y) > .0005 || Math.abs(light.target - light.power) > .002;
    if (settling && visible) raf = requestAnimationFrame(tick);
  };
  const kick = () => { if (!raf && gl) raf = requestAnimationFrame(tick); };

  const onMove = e => {
    const r = hero.getBoundingClientRect();
    light.tx = (e.clientX - r.left) / r.width;
    light.ty = (e.clientY - r.top) / r.height;
    light.target = 1;
    kick();
  };
  const onLeave = () => { light.target = 0; kick(); };
  const onTouch = e => { const t = e.touches[0]; if (t) onMove(t); };
  const onTouchEnd = () => setTimeout(onLeave, 900);
  const onResize = () => kick();
  const onBreakpoint = () => { applyPhase(); kick(); };

  applyPhase();
  timer = setInterval(() => { mix = phaseMix(seoulClock()); applyPhase(); kick(); }, 30000);
  mq.addEventListener('change', onBreakpoint);

  if (!reduce) {
    canvas = document.createElement('canvas');
    canvas.className = 'sun-hero-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    art.append(canvas);
    gl = canvas.getContext('webgl', { antialias: false, alpha: false, preserveDrawingBuffer: false });
    if (gl) {
      const sh = (type, code) => { const s = gl.createShader(type); gl.shaderSource(s, code); gl.compileShader(s); return s; };
      prog = gl.createProgram();
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) gl = null;
    }
    if (gl) {
      gl.useProgram(prog);
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, 'p');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      hero.addEventListener('pointermove', onMove);
      hero.addEventListener('pointerleave', onLeave);
      hero.addEventListener('touchmove', onTouch, { passive: true });
      hero.addEventListener('touchend', onTouchEnd, { passive: true });
      window.addEventListener('resize', onResize);
      observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) kick(); });
      observer.observe(hero);
      kick();
    } else canvas.remove();
  }

  return {
    destroy() {
      alive = false;
      cancelAnimationFrame(raf); clearInterval(timer);
      observer?.disconnect();
      mq.removeEventListener('change', onBreakpoint);
      window.removeEventListener('resize', onResize);
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
      hero.removeEventListener('touchmove', onTouch);
      hero.removeEventListener('touchend', onTouchEnd);
      gl?.getExtension('WEBGL_lose_context')?.loseContext();
    },
  };
}
