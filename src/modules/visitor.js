// T3.3 — Visitor-aware framing.
// Detects UTM params + referrer on first visit and softly highlights the most
// relevant specialization. No tracking, no PII — purely first-paint relevance.
// Persists in sessionStorage (not localStorage) so it only affects this tab.

const DOMAIN_MAP = [
  // UTM source / medium / content hints
  { match: /linkedin/i,     domain: 'builder',   label: 'builder'    },
  { match: /cheme|chemical|aiche|engineer/i, domain: 'engineer', label: 'engineer' },
  { match: /scholar|academia|academic|research|phd/i, domain: 'scholar', label: 'scholar' },
  { match: /korean|topik|interpret|language|linguist/i, domain: 'linguist', label: 'linguist' },
  { match: /community|mentor|pals|volunteer/i, domain: 'community', label: 'community' },
];

function detectDomain() {
  const params = new URLSearchParams(window.location.search);
  const utmSource  = params.get('utm_source')  || '';
  const utmMedium  = params.get('utm_medium')  || '';
  const utmContent = params.get('utm_content') || '';
  const utmCampaign = params.get('utm_campaign') || '';
  const domainParam = params.get('domain') || '';
  const referrer   = document.referrer || '';

  // Explicit ?domain=X override
  if (domainParam && ['linguist','engineer','builder','community','scholar'].includes(domainParam)) {
    return domainParam;
  }

  const haystack = [utmSource, utmMedium, utmContent, utmCampaign, referrer].join(' ');
  for (const { match, domain } of DOMAIN_MAP) {
    if (match.test(haystack)) return domain;
  }
  return null;
}

export function initVisitorFraming() {
  const KEY = 'th_visitor_domain';
  // Only apply on first load of this session; don't override if already tailored by /api/tailor
  if (sessionStorage.getItem(KEY)) return;

  const domain = detectDomain();
  if (!domain) return;

  sessionStorage.setItem(KEY, domain);
}
