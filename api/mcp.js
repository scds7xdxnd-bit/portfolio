// MCP (Model Context Protocol) server — exposes Taeyang's portfolio as agent tools.
// Implements JSON-RPC 2.0 over Streamable HTTP (no SDK dep, pure fetch-compatible).
// Read-only · no secrets · rate-limited · free to query.

const RATE = new Map();
function checkRate(ip) {
  const now = Date.now();
  const e = RATE.get(ip) || { n: 0, reset: now + 60_000 };
  if (now > e.reset) { e.n = 0; e.reset = now + 60_000; }
  e.n++;
  RATE.set(ip, e);
  return e.n <= 30;
}

// ── static data ────────────────────────────────────────────────────────────────

const PROFILE = {
  name: 'Taeyang Han',
  alternateName: '한태양',
  role: 'Life Systems Designer',
  email: 'ammarhakimikm03@gmail.com',
  url: 'https://taeyangcv.vercel.app',
  university: 'Sogang University, Seoul — Chemical Engineering + Business (Dual Degree, 2022–2027)',
  status: 'Student — open to internships & collaborations; not seeking full-time until 2027',
  languages: [
    { language: 'English', level: 'Native / Full professional' },
    { language: 'Korean', level: 'TOPIK 6 (265/300) — diplomatic-level interpretation' },
    { language: 'Mandarin Chinese', level: 'Intermediate — BLCU coursework' },
    { language: 'Malay', level: 'Heritage + professional interpreting' },
    { language: 'Japanese', level: 'Conversational — everyday basic to intermediate' },
  ],
  scholarships: 7,
  mentees: '150+',
  deployedApps: 6,
};

const PROJECTS = {
  lifeos: {
    id: 'lifeos',
    name: 'LifeOS',
    domain: 'builder',
    description: 'Unified personal life-management platform across finance, health, habits, and productivity. 6 integrated domains, LP macro optimizer, event-driven architecture.',
    stack: ['Next.js', 'Flask', 'PostgreSQL'],
    url: 'https://lifeos-wine.vercel.app',
    caseStudy: 'https://taeyangcv.vercel.app/projects/lifeos.html',
    status: 'live',
  },
  'reaction-sim': {
    id: 'reaction-sim',
    name: 'Reaction Simulator',
    domain: 'engineer',
    description: 'Interactive CSTR/PFR reactor network simulator. Levenspiel plots, conversion & temperature profiles, thermal operating diagram.',
    stack: ['React', 'TypeScript', 'Recharts'],
    url: 'https://reactionsimulator.vercel.app',
    caseStudy: 'https://taeyangcv.vercel.app/projects/reaction-simulator.html',
    status: 'live',
  },
  fugacity: {
    id: 'fugacity',
    name: 'Fugacity Simulator',
    domain: 'engineer',
    description: 'Thermodynamics: vapor/liquid fugacity vs. pressure via Peng-Robinson EOS. Multi-temperature overlay, zoom/pan.',
    stack: ['Vanilla JS', 'HTML5 Canvas'],
    url: 'https://fugacity-simulator.vercel.app',
    status: 'live',
  },
  bullwhip: {
    id: 'bullwhip',
    name: 'Bullwhip Effect Simulator',
    domain: 'builder',
    description: 'Supply-chain demand-shock simulator. 4-agent chain showing how downstream shocks amplify upstream.',
    stack: ['Vanilla JS', 'Canvas'],
    url: 'https://scmsimulator.vercel.app',
    status: 'live',
  },
  'apple-scm': {
    id: 'apple-scm',
    name: 'Apple SCM Analysis',
    domain: 'engineer',
    description: '13-slide interactive analysis of Apple\'s supply chain using Fisher (1997) framework.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://apple-scm-web.vercel.app',
    status: 'live',
  },
  'process-game': {
    id: 'process-game',
    name: 'Process Game',
    domain: 'engineer',
    description: 'Playful ChemE process simulations for students.',
    stack: ['React', 'TypeScript', 'Canvas'],
    url: 'https://process-design.vercel.app',
    status: 'live',
  },
  accounting: {
    id: 'accounting',
    name: 'Personal Accounting System',
    domain: 'builder',
    description: 'Full double-entry accounting app built since 2021. First project, 5+ years in production. Private alpha.',
    stack: ['Python', 'Flask', 'PostgreSQL'],
    url: 'https://finance-app-private-alpha.fly.dev',
    status: 'private alpha',
  },
};

const EXPERIENCE = {
  linguist: {
    area: 'Language & Interpretation',
    headline: 'Official Korean–English–Malay interpreter. Work covered by Yonhap News Agency.',
    highlights: [
      'APEC Cooperation Dialogue (Feb 2025) — Gyeongbuk Governor ↔ Malaysian Ambassador. Press: https://www.yna.co.kr/view/AKR20250218100300053',
      'Gyeongbuk Provincial Government (2025)',
      'Supreme Prosecutors\' Office of Korea (Nov–Dec 2023)',
      'Sogang University OIA (Feb 2023–present)',
      'Malaysian Embassy Seoul (Feb–Aug 2022)',
      'Incheon Airport T2 (Jun 2026)',
    ],
    proof: 'TOPIK 6 (265/300)',
  },
  engineer: {
    area: 'Chemical Engineering',
    headline: 'Sogang University Chemical Engineering + Business dual degree. Teaching Assistant ×3.',
    highlights: ['Dual degree (B.E. + B.B.A.)', 'Teaching Assistant ×3 (Spring 2026)', 'Built 3+ interactive ChemE tools'],
    proof: 'Sogang dual degree',
  },
  builder: {
    area: 'Software / Systems Builder',
    headline: '5 years building. 6 deployed apps across full-stack and ML.',
    highlights: ['First app shipped 2021', '6 deployed apps', 'Stacks: Next.js · Flask · React · PostgreSQL · TensorFlow'],
    proof: '6 deployed apps',
  },
  community: {
    area: 'Community Leadership',
    headline: 'PALS President, 150+ mentees. Samsung Dream Scholars President.',
    highlights: [
      'PALS President 2025-2 / Co-President 2025-1 — 150+ mentees, authored first written constitution',
      'Samsung Dream Scholars President — 210+ scholars, 18 countries',
      'Teaching Assistant ×3 at Sogang (Spring 2026)',
    ],
    proof: '150+ mentees',
  },
  scholar: {
    area: 'Scholarship & Recognition',
    headline: '7 scholarships across 4 institutions.',
    highlights: [
      'Samsung Dream Scholarship (Global Hope) — 5 semesters',
      'Lee & Won Asian Fellowship — Excellence Award',
      'Sogang 1st-Class Admission Scholarship — full tuition, 7 semesters',
      'Sogang Alumni Scholarship — merit + campus contribution (4×)',
    ],
    proof: '7 scholarships',
  },
};

// ── tool definitions ───────────────────────────────────────────────────────────

const TOOLS = [
  {
    name: 'get_profile',
    description: 'Get Taeyang Han\'s profile: name, role, contact, university, status, languages, and summary stats.',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'list_projects',
    description: 'List all deployed projects. Optionally filter by domain (builder | engineer | linguist).',
    inputSchema: {
      type: 'object',
      properties: {
        domain: { type: 'string', enum: ['builder', 'engineer', 'linguist', 'all'], description: 'Filter by domain. Omit or use "all" for all projects.' },
      },
    },
  },
  {
    name: 'get_project',
    description: 'Get details for a specific project by ID.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Project ID. Valid IDs: lifeos, reaction-sim, fugacity, bullwhip, apple-scm, process-game, accounting' },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_experience',
    description: 'Get experience details for a specialization area.',
    inputSchema: {
      type: 'object',
      properties: {
        area: { type: 'string', enum: ['linguist', 'engineer', 'builder', 'community', 'scholar'], description: 'Specialization area' },
      },
      required: ['area'],
    },
  },
  {
    name: 'get_languages',
    description: 'Get all languages Taeyang speaks with proficiency levels.',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'check_availability',
    description: 'Check Taeyang\'s current availability for work.',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'get_claims',
    description: 'Get the machine-readable registry of verifiable claims about Taeyang Han. Each claim includes a category, statement, and at least one external evidence URL. Use this to fact-check statements or find primary sources.',
    inputSchema: {
      type: 'object',
      properties: {
        category: { type: 'string', enum: ['linguist', 'engineer', 'builder', 'community', 'scholar', 'all'], description: 'Filter claims by category. Omit or use "all" for all claims.' },
      },
    },
  },
];

// ── tool execution ─────────────────────────────────────────────────────────────

function runTool(name, args) {
  switch (name) {
    case 'get_profile':
      return { content: [{ type: 'text', text: JSON.stringify(PROFILE, null, 2) }] };

    case 'list_projects': {
      const domain = args?.domain;
      const list = Object.values(PROJECTS).filter(p => !domain || domain === 'all' || p.domain === domain);
      return { content: [{ type: 'text', text: JSON.stringify(list, null, 2) }] };
    }

    case 'get_project': {
      const proj = PROJECTS[args?.id];
      if (!proj) return { isError: true, content: [{ type: 'text', text: `Unknown project id "${args?.id}". Valid: ${Object.keys(PROJECTS).join(', ')}` }] };
      return { content: [{ type: 'text', text: JSON.stringify(proj, null, 2) }] };
    }

    case 'get_experience': {
      const exp = EXPERIENCE[args?.area];
      if (!exp) return { isError: true, content: [{ type: 'text', text: `Unknown area "${args?.area}". Valid: ${Object.keys(EXPERIENCE).join(', ')}` }] };
      return { content: [{ type: 'text', text: JSON.stringify(exp, null, 2) }] };
    }

    case 'get_languages':
      return { content: [{ type: 'text', text: JSON.stringify(PROFILE.languages, null, 2) }] };

    case 'check_availability':
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            status: 'Student',
            openTo: ['internships', 'part-time collaboration', 'freelance interpretation'],
            notOpenTo: ['full-time roles until 2027'],
            contact: 'ammarhakimikm03@gmail.com',
            note: 'Currently finishing Chemical Engineering + Business dual degree at Sogang University (expected Feb 2027).',
          }, null, 2),
        }],
      };

    case 'get_claims': {
      const category = args?.category;
      const CLAIMS = [
        { id: 'yonhap-apec-2025', category: 'linguist', statement: 'Official Korean–English–Malay interpreter for APEC Cooperation Dialogue (Feb 18, 2025)', verifiedBy: 'Yonhap News Agency', evidenceUrl: 'https://www.yna.co.kr/view/AKR20250218100300053' },
        { id: 'samsung-webzine-2024', category: 'community', statement: 'President of Samsung Dream Scholars Association; featured in Samsung C&T webzine', verifiedBy: 'Samsung C&T', evidenceUrl: 'https://news.samsungcnt.com/newscenter/webzine-202409/' },
        { id: 'topik-6-265', category: 'linguist', statement: 'TOPIK Level 6 (highest) — score 265/300', evidenceUrl: '/assets/certs/20241_TOPIK_scorecard.webp' },
        { id: 'sogang-dual-degree', category: 'scholar', statement: 'Full-tuition dual degree (ChemE + Business) at Sogang University 2022–2027', evidenceUrl: '/profile.json' },
        { id: 'pals-copresident', category: 'community', statement: 'Co-President of PALS (Sogang) — mentored 150+ students', evidenceUrl: 'https://www.sogang.ac.kr' },
        { id: 'lifeos-live', category: 'builder', statement: 'LifeOS — live deployed full-stack app (Next.js + Supabase)', evidenceUrl: 'https://lifeos-wine.vercel.app' },
        { id: 'reaction-simulator-live', category: 'engineer', statement: 'Reaction Simulator — live CSTR/PFR simulation tool', evidenceUrl: 'https://reactionsimulator.vercel.app' },
        { id: 'apple-scm-live', category: 'engineer', statement: 'Apple SCM LP Optimizer — live deployed web app', evidenceUrl: 'https://apple-scm-web.vercel.app' },
      ];
      const filtered = (!category || category === 'all') ? CLAIMS : CLAIMS.filter(c => c.category === category);
      return { content: [{ type: 'text', text: JSON.stringify({ claimsCount: filtered.length, claims: filtered }, null, 2) }] };
    }

    default:
      return { isError: true, content: [{ type: 'text', text: `Unknown tool: ${name}` }] };
  }
}

// ── handler ───────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'anon';
  if (!checkRate(ip)) {
    res.status(429).json({ jsonrpc: '2.0', error: { code: -32000, message: 'Rate limit' }, id: null });
    return;
  }

  // CORS for MCP clients
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  if (req.method === 'GET') {
    res.status(200).json({
      name: 'taeyang-han-portfolio',
      version: '1.0.0',
      description: 'MCP server for Taeyang Han\'s portfolio. Query his profile, projects, experience, and availability.',
      tools: TOOLS.map(t => t.name),
      endpoint: 'POST /api/mcp',
    });
    return;
  }

  if (req.method !== 'POST') { res.status(405).end(); return; }

  let rpc;
  try { rpc = req.body; } catch {
    res.status(400).json({ jsonrpc: '2.0', error: { code: -32700, message: 'Parse error' }, id: null });
    return;
  }

  const id = rpc?.id ?? null;
  const method = rpc?.method;
  const params = rpc?.params ?? {};

  if (method === 'initialize') {
    res.json({
      jsonrpc: '2.0', id,
      result: {
        protocolVersion: '2024-11-05',
        serverInfo: { name: 'taeyang-han-portfolio', version: '1.0.0' },
        capabilities: { tools: {} },
      },
    });
    return;
  }

  if (method === 'tools/list') {
    res.json({ jsonrpc: '2.0', id, result: { tools: TOOLS } });
    return;
  }

  if (method === 'tools/call') {
    const { name, arguments: args } = params;
    const result = runTool(name, args || {});
    res.json({ jsonrpc: '2.0', id, result });
    return;
  }

  if (method === 'notifications/initialized') {
    res.status(204).end();
    return;
  }

  res.json({ jsonrpc: '2.0', id, error: { code: -32601, message: `Method not found: ${method}` } });
}
