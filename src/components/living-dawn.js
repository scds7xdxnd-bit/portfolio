// Living dawn: the hero painting follows Seoul's real time of day, and the
// visitor's cursor (or finger) acts as the sun, relighting the scene.
// Falls back to swapping the plain <img> when WebGL or motion is unavailable.

const PHASES = ['dawn', 'day', 'dusk', 'night'];
const LABELS = {
  en: { seoul: 'Seoul', dawn: 'dawn', day: 'midday', dusk: 'golden hour', night: 'night' },
  ko: { seoul: '서울', dawn: '새벽', day: '한낮', dusk: '노을', night: '밤' },
  zh: { seoul: '首尔', dawn: '清晨', day: '正午', dusk: '黄昏', night: '夜晚' },
};
const WEATHER_LABELS = {
  en: { overcast: 'overcast', fog: 'fog', rain: 'rain', storm: 'thunderstorm', snow: 'snow' },
  ko: { overcast: '흐림', fog: '안개', rain: '비', storm: '뇌우', snow: '눈' },
  zh: { overcast: '阴天', fog: '雾', rain: '雨', storm: '雷雨', snow: '雪' },
};
// How each kind of Seoul weather is drawn over the painting.
const WEATHER = {
  clear: { rain: 0, snow: 0, grey: 0 },
  overcast: { rain: 0, snow: 0, grey: .55 },
  fog: { rain: 0, snow: 0, grey: .9 },
  rain: { rain: .6, snow: 0, grey: .5 },
  storm: { rain: 1, snow: 0, grey: .7, flash: true },
  snow: { rain: 0, snow: 1, grey: .35 },
};
// Warm light colour the cursor casts in each phase.
const TINT = { dawn: [1, .78, .5], day: [1, .95, .82], dusk: [1, .58, .3], night: [1, .74, .4] };

const src = (phase, mobile) => `/assets/sun-of-korea/${phase}-${mobile ? 'mobile' : 'desktop'}.webp`;

export function seoulClock() {
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
export function phaseMix({ hour, dayOfYear }) {
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

// Current Seoul weather kind, shared by the hero and the map so the page makes
// one request. ?weather=rain|snow|storm|fog|overcast overrides it for testing.
let weatherRequest, weatherAt = 0;
export function seoulWeather() {
  const forced = new URLSearchParams(location.search).get('weather');
  if (WEATHER[forced]) return Promise.resolve(forced);
  if (!weatherRequest || Date.now() - weatherAt > 10 * 60 * 1000) {
    weatherAt = Date.now();
    weatherRequest = fetch('/api/weather').then(r => r.json()).then(d => (WEATHER[d.kind] ? d.kind : 'clear')).catch(() => 'clear');
  }
  return weatherRequest;
}

// Inline script placed right after the hero <picture> in the prerendered page:
// chooses the time-of-day image before the browser fetches anything, so a
// night visitor never downloads the dawn painting first.
const SKY = { dawn: '#fff0d1', day: '#9cc8ef', dusk: '#e58a4e', night: '#0b1233' };
export function heroPhaseScript() {
  return `<script>(function(){var PHASES=${JSON.stringify(PHASES)};${seoulClock}${phaseMix}var m=phaseMix(seoulClock()),p=m.t<.5?m.a:m.b,a=document.currentScript.previousElementSibling,d='/assets/sun-of-korea/'+p;a.querySelector('source').srcset=d+'-mobile.webp';a.querySelector('img').src=d+'-desktop.webp';a.parentNode.style.background=${JSON.stringify(SKY)}[p]})()</script>`;
}

const VERT =`attribute vec2 p;varying vec2 v;void main(){v=vec2(p.x*.5+.5,.5-p.y*.5);gl_Position=vec4(p,0.,1.);}`;
const FRAG = `precision mediump float;
uniform sampler2D uA,uB;uniform float uMix,uPower,uNight,uTime,uRain,uSnow,uGrey,uFlash,uBlock;uniform vec2 uRes,uImg,uAlign,uLight;uniform vec3 uTint;varying vec2 v;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
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
  if(uGrey>0.){float l=dot(c,vec3(.299,.587,.114));vec3 g=vec3(l)*mix(.8,.95,uNight)+vec3(.035,.04,.055);c=mix(c,g,uGrey*.68);}
  vec2 b=floor(v*uRes/uBlock);
  if(uRain>0.){
    c*=1.-.1*uRain;
    for(int i=0;i<2;i++){
      float fi=float(i),L=34.+fi*14.,col=floor(b.x+b.y*.22)+fi*311.;
      float y=b.y-uTime*(95.+fi*35.)+hash(vec2(col,fi))*L;
      float cell=floor(y/L),f=mod(y,L);
      float on=step(hash(vec2(col,cell))*1.6,uRain)*step(f,4.+fi*2.);
      c=mix(c,mix(vec3(.6,.66,.78),vec3(.8,.85,.95),uNight),on*(.45-fi*.13));
    }
  }
  if(uSnow>0.){
    for(int i=0;i<2;i++){
      float fi=float(i),S=16.+fi*10.;
      vec2 q=b+vec2(sin(uTime*.6+b.y*.05+fi*2.)*2.,-uTime*(14.+fi*9.));
      vec2 cell=floor(q/S),pos=floor(vec2(hash(cell+fi),hash(cell+fi+7.))*(S-2.)),local=floor(mod(q,S));
      float on=step(hash(cell*1.3+fi),.7*uSnow)*(1.-step(1.-fi*.5,length(local-pos)));
      c=mix(c,vec3(.96,.97,1.),on*(.85-fi*.3));
    }
  }
  c+=vec3(.55,.6,.75)*uFlash;
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
  let weather = { kind: 'clear', ...WEATHER.clear }, flash = 0, nextFlash = 0, lastFrame = 0;
  const animated = () => !reduce && (weather.rain > 0 || weather.snow > 0);

  const dominant = () => (mix.t < .5 ? mix.a : mix.b);
  const applyPhase = () => {
    const night = (mix.a === 'night' ? 1 - mix.t : 0) + (mix.b === 'night' ? mix.t : 0);
    hero.style.setProperty('--night', night.toFixed(3));
    hero.dataset.phase = dominant();
    hero.style.background = SKY[dominant()];
    hero.classList.toggle('is-night', night > .5);
    const { hour } = seoulClock();
    const hh = String(Math.floor(hour) % 24).padStart(2, '0'), mm = String(Math.floor((hour % 1) * 60)).padStart(2, '0');
    const sky = (WEATHER_LABELS[lang] || WEATHER_LABELS.en)[weather.kind];
    clock.textContent = `${labels.seoul} · ${hh}:${mm} · ${labels[dominant()]}${sky ? ` · ${sky}` : ''}`;
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
    gl.uniform1f(u('uTime'), performance.now() / 1000);
    gl.uniform1f(u('uRain'), weather.rain);
    gl.uniform1f(u('uSnow'), weather.snow);
    gl.uniform1f(u('uGrey'), weather.grey);
    gl.uniform1f(u('uFlash'), flash);
    gl.uniform1f(u('uBlock'), 3 * dpr);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    canvas.classList.add('is-ready');
  };

  const tick = now => {
    raf = 0;
    const settling = Math.abs(light.tx - light.x) + Math.abs(light.ty - light.y) > .0005 || Math.abs(light.target - light.power) > .002;
    // Weather alone only needs ~30fps.
    if (!settling && animated() && now - lastFrame < 33) { raf = requestAnimationFrame(tick); return; }
    lastFrame = now;
    light.x += (light.tx - light.x) * .14;
    light.y += (light.ty - light.y) * .14;
    light.power += (light.target - light.power) * .08;
    if (weather.flash) {
      if (now > nextFlash) { flash = .9; nextFlash = now + 6000 + Math.random() * 9000; }
      flash *= .82;
    }
    draw();
    if (visible && (settling || animated() || flash > .01)) raf = requestAnimationFrame(tick);
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

  const loadWeather = async () => {
    const kind = await seoulWeather();
    if (!alive || !WEATHER[kind]) return;
    weather = { kind, ...WEATHER[kind] };
    nextFlash = performance.now() + 2500;
    applyPhase(); kick();
  };
  loadWeather();
  const weatherTimer = setInterval(loadWeather, 15 * 60 * 1000);

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
      cancelAnimationFrame(raf); clearInterval(timer); clearInterval(weatherTimer);
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
