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

export function initLinksDropdown() {
  const trigger = document.querySelector('.hero__overflow-trigger');
  const dropdown = document.querySelector('.hero__dropdown');
  if (!trigger || !dropdown) return;

  trigger.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = !dropdown.hasAttribute('hidden');
    if (isOpen) {
      dropdown.setAttribute('hidden', '');
      trigger.setAttribute('aria-expanded', 'false');
    } else {
      dropdown.removeAttribute('hidden');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });

  document.addEventListener('click', () => {
    if (!dropdown.hasAttribute('hidden')) {
      dropdown.setAttribute('hidden', '');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !dropdown.hasAttribute('hidden')) {
      dropdown.setAttribute('hidden', '');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
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
