import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { t } from '../lib/i18n.js';
import { currentLang } from '../data/i18n.js';
import { askInto } from '../lib/ask-api.js';
import { SPECIALIZATIONS } from '../data/specializations.js';
import { initLifeSystem } from './life-system.js';

const DOMAINS = SPECIALIZATIONS;

function readToken(name) {
  const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return val || null;
}

function isNight() {
  try {
    const hourStr = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Seoul',
      hour: 'numeric',
      hour12: false,
    }).format(new Date());
    const hour = parseInt(hourStr, 10);
    return hour >= 18 || hour < 6;
  } catch {
    return false;
  }
}

function isDarkTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export async function initOrrery() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !webglAvailable()) {
    initLifeSystem();
    return;
  }

  const container = document.getElementById('life-system');
  if (!container) return;

  container.innerHTML = '';

  const W = container.clientWidth || 560;
  const H = container.clientHeight || 400;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 30);
  camera.position.set(0, 2.6, 9);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H);
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute('aria-hidden', 'true');
  container.appendChild(renderer.domElement);

  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(W, H);
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0';
  labelRenderer.domElement.style.left = '0';
  labelRenderer.domElement.style.width = '100%';
  labelRenderer.domElement.style.height = '100%';
  labelRenderer.domElement.style.pointerEvents = 'none';
  labelRenderer.domElement.style.zIndex = '2';
  labelRenderer.domElement.style.overflow = 'hidden';
  container.style.position = 'relative';
  container.appendChild(labelRenderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.4;
  controls.minPolarAngle = 0.15;
  controls.maxPolarAngle = Math.PI / 2 - 0.15;
  controls.target.set(0, 0, 0);
  controls.update();

  /* ── Lighting ── */
  const ambient = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambient);

  const sunLight = new THREE.DirectionalLight(0xfff8e7, 0.6);
  sunLight.position.set(2, 3, 2);
  scene.add(sunLight);

  const fillLight = new THREE.DirectionalLight(0xddddff, 0.25);
  fillLight.position.set(-1, 0.5, -2);
  scene.add(fillLight);

  /* ── Starfield ── */
  let stars = null;
  function spawnStars() {
    if (stars) return;
    const geo = new THREE.BufferGeometry();
    const count = 200;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 14 + Math.random() * 4;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = Math.abs(r * Math.cos(phi));
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.06 });
    stars = new THREE.Points(geo, mat);
    scene.add(stars);
  }

  function removeStars() {
    if (stars) { scene.remove(stars); stars.geometry.dispose(); stars.material.dispose(); stars = null; }
  }

  function readColors() {
    return {
      ink: readToken('--ink') || '#1E1E1E',
      sunshine: readToken('--sunshine') || '#FFD859',
      sky: readToken('--sky') || '#6EC6FF',
      coral: readToken('--coral') || '#FF6B6B',
      mint: readToken('--mint') || '#7EE6A7',
      purple: readToken('--purple') || '#B084F5',
      bgPanel: readToken('--bg-panel') || '#FFFFFF',
    };
  }

  function getAccent(domainId) {
    const mapping = { linguist: 'sky', engineer: 'coral', builder: 'mint', community: 'purple', scholar: 'sunshine' };
    return mapping[domainId] || 'sky';
  }

  /* ── Orbital parameters ── */
  const PLANET_PARAMS = [
    { id: 'linguist',  orbitR: 2.4, speed: 0.05,  inclX: 0.06,  inclZ: -0.04 },
    { id: 'engineer',  orbitR: 3.2, speed: 0.038, inclX: -0.05, inclZ: 0.07  },
    { id: 'builder',   orbitR: 4.0, speed: 0.03,  inclX: 0.03,  inclZ: 0.05  },
    { id: 'community', orbitR: 4.8, speed: 0.024, inclX: -0.07, inclZ: -0.03 },
    { id: 'scholar',   orbitR: 5.6, speed: 0.018, inclX: 0.04,  inclZ: -0.06 },
  ];

  /* ── Helper: outline mesh (inverted hull) ── */
  function makeOutline(mesh, sceneGroup, inkColor) {
    const outline = mesh.clone();
    const geo = mesh.geometry.clone();
    outline.geometry = geo;
    outline.material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(inkColor),
      side: THREE.BackSide,
      depthTest: true,
      depthWrite: true,
    });
    outline.scale.set(1.08, 1.08, 1.08);
    outline.renderOrder = 1;
    sceneGroup.add(outline);
    return outline;
  }

  /* ── Sun ── */
  const sunGroup = new THREE.Group();
  scene.add(sunGroup);
  const colors = readColors();

  const sunGeo = new THREE.SphereGeometry(1.0, 48, 48);
  const sunMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(colors.sunshine) });
  const sunMesh = new THREE.Mesh(sunGeo, sunMat);
  sunGroup.add(sunMesh);

  const sunOutline = makeOutline(sunMesh, sunGroup, colors.ink);

  const rayGroup = new THREE.Group();
  sunGroup.add(rayGroup);
  const RAY_COUNT = 10;
  const rayMeshes = [];
  const rayOutlines = [];
  for (let i = 0; i < RAY_COUNT; i++) {
    const angle = (i / RAY_COUNT) * Math.PI * 2;
    const len = 0.45;
    const rayGeo = new THREE.ConeGeometry(0.08, len, 6, 1);
    rayGeo.translate(0, 1.0 + len / 2, 0);
    const rayMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(colors.sunshine) });
    const rayMesh = new THREE.Mesh(rayGeo, rayMat);
    rayMesh.rotation.z = angle;
    rayMeshes.push(rayMesh);
    rayGroup.add(rayMesh);

    const rayOutline = makeOutline(rayMesh, rayGroup, colors.ink);
    rayOutlines.push(rayOutline);
  }

  /* ── Orbit rings ── */
  const ringGroups = [];
  PLANET_PARAMS.forEach((p) => {
    const ringGroup = new THREE.Group();
    ringGroup.rotation.x = p.inclX;
    ringGroup.rotation.z = p.inclZ;
    scene.add(ringGroup);
    ringGroups.push(ringGroup);

    const pts = [];
    const N = 128;
    for (let i = 0; i <= N; i++) {
      const a = (i / N) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * p.orbitR, 0, Math.sin(a) * p.orbitR));
    }
    const ringGeo = new THREE.BufferGeometry().setFromPoints(pts);
    const ringLine = new THREE.Line(ringGeo, new THREE.LineDashedMaterial({
      color: new THREE.Color(colors.ink),
      dashSize: 0.35,
      gapSize: 0.25,
      transparent: true,
      opacity: 0.25,
      depthTest: true,
      depthWrite: false,
    }));
    ringLine.computeLineDistances();
    ringGroup.add(ringLine);
  });

  /* ── Planets ── */
  const planetData = [];
  const planetMeshes = [];
  const planetOutlines = [];
  const planetPivots = [];

  DOMAINS.forEach((domain, idx) => {
    const p = PLANET_PARAMS[idx];
    const pivot = new THREE.Group();
    scene.add(pivot);
    planetPivots.push(pivot);

    const radius = domain.id === 'scholar' ? 0.34 : 0.40;
    const geo = new THREE.SphereGeometry(radius, 36, 36);
    const accentKey = getAccent(domain.id);
    const mat = new THREE.MeshToonMaterial({ color: new THREE.Color(colors[accentKey]) });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(p.orbitR, 0, 0);
    pivot.add(mesh);
    planetMeshes.push(mesh);

    const outline = makeOutline(mesh, pivot, colors.ink);
    planetOutlines.push(outline);

    const labelDiv = document.createElement('div');
    labelDiv.className = 'orrery__label';
    labelDiv.textContent = t(`spec.tab.${domain.id}`);
    const labelObj = new CSS2DObject(labelDiv);
    labelObj.position.set(0, radius + 0.22, 0);
    mesh.add(labelObj);

    planetData.push({
      domain,
      pivot,
      mesh,
      outline,
      labelDiv,
      labelObj,
      params: p,
      miniMoonGroup: null,
    });
  });

  /* ── Sun label ── */
  const sunLabelDiv = document.createElement('div');
  sunLabelDiv.className = 'orrery__label';
  sunLabelDiv.textContent = '\uD0DC\uC591';
  const sunLabel = new CSS2DObject(sunLabelDiv);
  sunLabel.position.set(0, 1.55, 0);
  sunGroup.add(sunLabel);

  /* ── Raycaster for hover/click ── */
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let hoveredPlanetIdx = -1;
  const HOVER_SCALE = 1.2;

  function getPlanetIntersections(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    return raycaster.intersectObjects(planetMeshes);
  }

  renderer.domElement.addEventListener('mousemove', (event) => {
    const hits = getPlanetIntersections(event);
    if (hits.length > 0) {
      const idx = planetMeshes.indexOf(hits[0].object);
      if (idx !== hoveredPlanetIdx) {
        if (hoveredPlanetIdx >= 0) {
          planetMeshes[hoveredPlanetIdx].scale.set(1, 1, 1);
          planetOutlines[hoveredPlanetIdx].scale.set(1.08, 1.08, 1.08);
        }
        hoveredPlanetIdx = idx;
        planetMeshes[idx].scale.set(HOVER_SCALE, HOVER_SCALE, HOVER_SCALE);
        planetOutlines[idx].scale.set(1.08 * HOVER_SCALE, 1.08 * HOVER_SCALE, 1.08 * HOVER_SCALE);
        renderer.domElement.style.cursor = 'pointer';
      }
    } else if (hoveredPlanetIdx >= 0) {
      planetMeshes[hoveredPlanetIdx].scale.set(1, 1, 1);
      planetOutlines[hoveredPlanetIdx].scale.set(1.1, 1.1, 1.1);
      hoveredPlanetIdx = -1;
      renderer.domElement.style.cursor = '';
    }
  });

  renderer.domElement.addEventListener('click', (event) => {
    const hits = getPlanetIntersections(event);
    if (hits.length > 0) {
      const idx = planetMeshes.indexOf(hits[0].object);
      if (idx >= 0) {
        pulsePlanet(idx);
        triggerDomainNarration(idx);
      }
    }
  });

  function pulsePlanet(idx) {
    const mesh = planetMeshes[idx];
    const start = performance.now();
    const duration = 400;
    function pulse(now) {
      const t = (now - start) / duration;
      if (t >= 1) { mesh.scale.set(1, 1, 1); return; }
      const s = 1 + 0.25 * Math.sin(t * Math.PI);
      mesh.scale.set(s, s, s);
      requestAnimationFrame(pulse);
    }
    requestAnimationFrame(pulse);
  }

  const domainCache = {};

  async function triggerDomainNarration(idx) {
    const pd = planetData[idx];
    const domainId = pd.domain.id;
    const label = t(`spec.tab.${pd.domain.id}`);
    const q = `In 2-3 sentences, explain how Taeyang's '${label}' domain connects to and reinforces his other life-system domains.`;

    openModal(label, domainId);

    if (domainCache[domainId] !== undefined) {
      setModalContent(domainCache[domainId]);
      return;
    }

    const modalContent = modalEl.querySelector('.orrery-modal__text');
    await askInto(modalContent, q, currentLang, null);
    domainCache[domainId] = modalContent.textContent;
  }

  /* ── Modal ── */
  const modalEl = document.createElement('div');
  modalEl.className = 'orrery-modal';
  modalEl.hidden = true;
  modalEl.innerHTML = `
    <div class="orrery-modal__backdrop"></div>
    <div class="orrery-modal__panel">
      <button class="orrery-modal__close" aria-label="Close">&times;</button>
      <h3 class="orrery-modal__title"></h3>
      <div class="orrery-modal__text">…</div>
    </div>
  `;
  document.body.appendChild(modalEl);

  const modalTitle = modalEl.querySelector('.orrery-modal__title');
  const modalText = modalEl.querySelector('.orrery-modal__text');
  const modalClose = modalEl.querySelector('.orrery-modal__close');
  const modalBackdrop = modalEl.querySelector('.orrery-modal__backdrop');

  function setModalContent(text) {
    modalText.textContent = text;
  }

  function openModal(title, domainId) {
    modalTitle.textContent = title;
    modalTitle.style.setProperty('--accent', readToken(`--${getAccent(domainId)}`) || '');
    if (domainCache[domainId] !== undefined) {
      modalText.textContent = domainCache[domainId];
    } else {
      modalText.textContent = '…';
    }
    modalEl.hidden = false;
  }

  function closeModal() {
    modalEl.hidden = true;
  }

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalEl.hidden) closeModal();
  });

  /* ── Keyboard-accessible domain buttons ── */
  const srList = document.createElement('div');
  srList.className = 'sr-only';
  srList.setAttribute('role', 'list');
  srList.setAttribute('aria-label', t('life.narrate') || 'Life system domains');
  DOMAINS.forEach((d) => {
    const item = document.createElement('div');
    item.setAttribute('role', 'listitem');
    item.textContent = t(`spec.tab.${d.id}`);
    srList.appendChild(item);
  });
  container.appendChild(srList);

  const kbBtnsContainer = document.createElement('div');
  kbBtnsContainer.className = 'orrery__kb-btns';
  DOMAINS.forEach((d, idx) => {
    const btn = document.createElement('button');
    btn.className = 'orrery__kb-btn';
    btn.setAttribute('role', 'button');
    btn.setAttribute('tabindex', '0');
    btn.textContent = t(`spec.tab.${d.id}`);
    btn.style.setProperty('--accent', readToken(`--${getAccent(d.id)}`) || '');
    btn.addEventListener('click', () => {
      pulsePlanet(idx);
      triggerDomainNarration(idx);
    });
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        pulsePlanet(idx);
        triggerDomainNarration(idx);
      }
    });
    kbBtnsContainer.appendChild(btn);
  });
  container.appendChild(kbBtnsContainer);

  /* ── Day/Night + Theme ── */
  function updateDayNight() {
    const night = isNight();
    const dark = isDarkTheme();
    const showStars = night || dark;

    if (showStars) {
      ambient.intensity = 0.45;
      sunLight.intensity = 0.35;
      spawnStars();
    } else {
      ambient.intensity = 1.2;
      sunLight.intensity = 0.6;
      removeStars();
    }
  }

  function recolorAll() {
    const c = readColors();

    sunMat.color.set(c.sunshine);
    sunOutline.material.color.set(c.ink);
    rayMeshes.forEach((rm) => { rm.material.color.set(c.sunshine); });
    rayOutlines.forEach((ro) => { ro.material.color.set(c.ink); });

    planetData.forEach((pd) => {
      const accentKey = getAccent(pd.domain.id);
      pd.mesh.material.color.set(c[accentKey]);
      pd.outline.material.color.set(c.ink);
    });

    // Update orbit ring colors
    ringGroups.forEach((rg) => {
      rg.children.forEach((child) => {
        if (child.isLine) {
          child.material.color.set(c.ink);
        }
      });
    });
  }

  updateDayNight();
  recolorAll();

  const themeObserver = new MutationObserver(() => {
    recolorAll();
    updateDayNight();
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  /* ── Render loop ── */
  let rafId = null;
  let lastT = performance.now();
  const YAW_SPEED = 0.2;

  function animate(t) {
    rafId = requestAnimationFrame(animate);
    const dt = Math.min((t - lastT) / 1000, 0.1);
    lastT = t;

    controls.update();

    // Planet revolutions
    planetData.forEach((pd) => {
      pd.pivot.rotation.y += pd.params.speed * dt * 0.8;
      pd.mesh.rotation.y += dt * 0.5;
    });

    // Sun rays rotate
    rayGroup.rotation.z += dt * 0.3;

    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  }

  function startLoop() {
    if (rafId) return;
    lastT = performance.now();
    rafId = requestAnimationFrame(animate);
  }

  function stopLoop() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  }

  startLoop();

  /* ── Visibility pause ── */
  const visObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      startLoop();
    } else {
      stopLoop();
    }
  }, { threshold: 0.05, rootMargin: '100px' });
  visObs.observe(container);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopLoop();
    else startLoop();
  });

  /* ── Resize ── */
  function onResize() {
    const w = container.clientWidth || 560;
    const h = container.clientHeight || 400;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    labelRenderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);
  // Re-measure now that the canvas is in the DOM and `:has(canvas)` height applies
  onResize();

  /* ── Teardown ── */
  initOrrery._teardown = () => {
    stopLoop();
    visObs.disconnect();
    themeObserver.disconnect();
    window.removeEventListener('resize', onResize);
    controls.dispose();
    renderer.dispose();
    labelRenderer.domElement.remove();
    modalEl.remove();
    scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
    });
  };
}

export { askInto };
