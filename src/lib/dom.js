import { unlockAchievement } from './achievements.js';

export function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-revealed'); obs.unobserve(e.target); }
    });
  }, { threshold: 0, rootMargin: '0px 0px 80px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

export function initProgressAnimation() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const fills = e.target.querySelectorAll('.progress__fill');
        fills.forEach(f => {
          const targetW = f.style.width;
          f.style.width = '0%';
          f.classList.add('progress__fill--animate');
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              f.style.width = targetW;
            });
          });
        });
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.progress').forEach(el => obs.observe(el));
}

function bindDropdown(trigger, dropdown) {
  if (!trigger || !dropdown) return;

  const close = () => {
    if (dropdown.hasAttribute('hidden')) return;
    dropdown.setAttribute('hidden', '');
    trigger.setAttribute('aria-expanded', 'false');
  };

  trigger.addEventListener('click', e => {
    e.stopPropagation();
    if (!dropdown.hasAttribute('hidden')) {
      close();
    } else {
      dropdown.removeAttribute('hidden');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });

  dropdown.addEventListener('click', () => close());
  document.addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });
}

export function initLinksDropdown() {
  bindDropdown(
    document.querySelector('.hero__overflow-trigger'),
    document.querySelector('.hero__dropdown:not(.hero__cv-menu)'),
  );
  bindDropdown(
    document.querySelector('.hero__cv-trigger'),
    document.querySelector('.hero__cv-menu'),
  );
}

export function copyEmail() {
  const email = 'ammarhakimikm03@gmail.com';
  const btn = document.getElementById('copy-email-btn');

  function showCopied() {
    unlockAchievement('reachout');
    if (!btn) return;
    const orig = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = orig; }, 2000);
  }

  if (navigator.clipboard) {
    navigator.clipboard.writeText(email).then(showCopied).catch(showCopied);
  } else {
    const el = document.createElement('textarea');
    el.value = email;
    el.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
    document.body.appendChild(el);
    el.select();
    try { document.execCommand('copy'); } catch (err) {}
    document.body.removeChild(el);
    showCopied();
  }
}

export function initShimmerHover() {
  const btn = document.querySelector('.btn--primary');
  if (!btn) return;
  btn.addEventListener('mouseenter', () => {
    btn.classList.remove('shimmer-active');
    void btn.offsetWidth;
    btn.classList.add('shimmer-active');
  });
}

// §5.6 Subtle 3D tilt on spec panels and domain tiles — desktop + reduced-motion aware
export function initCardTilt() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const TILT_MAX = 4; // degrees

  function applyTilt(el) {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5; // -0.5 to 0.5
      const y = (e.clientY - r.top)  / r.height - 0.5;
      el.style.transform = `perspective(600px) rotateY(${(x * TILT_MAX).toFixed(2)}deg) rotateX(${(-y * TILT_MAX).toFixed(2)}deg) translateY(-2px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  }

  document.querySelectorAll('.domain-tile, .specs__featured-card').forEach(applyTilt);
}
