export const config = { runtime: 'edge' };

// T2.2 — "Tailor this portfolio to a role"
// Visitor pastes a JD → Claude Opus re-ranks projects and writes a fit summary.
// Uses structured output (output_config.format) for a typed JSON response.

const PROJECTS_CONTEXT = `
TAEYANG HAN — PROJECTS & DOMAINS:

DOMAINS: linguist · engineer · builder · community · scholar

PROJECTS (id | name | domain | description):
- lifeos | LifeOS | builder | Unified personal life-management platform. Next.js + Flask + PostgreSQL, LP macro optimizer, event-driven architecture.
- reaction-sim | Reaction Simulator | engineer | Interactive CSTR/PFR reactor network simulator. Levenspiel plots, conversion/temperature profiles. React + TypeScript.
- fugacity | Fugacity Simulator | engineer | Thermodynamics: vapor/liquid fugacity vs. pressure via Peng-Robinson EOS. Vanilla JS.
- bullwhip | Bullwhip Effect Simulator | builder | Supply-chain demand-shock simulator. 4-agent chain. Vanilla JS.
- apple-scm | Apple SCM Analysis | engineer | Interactive analysis of Apple's supply chain using Fisher (1997) framework.
- process-game | Process Game | engineer | Playful ChemE process simulations for students. React + TypeScript.
- accounting | Personal Accounting System | builder | Double-entry accounting app, 5+ years in production. Python + Flask + PostgreSQL.

EXPERIENCE AREAS:
- linguist: TOPIK 6 Korean (265/300), official KO-EN-Malay interpreter (Yonhap News), 7 organizations served
- engineer: Sogang University ChemE + Business dual degree, Teaching Assistant ×3
- builder: 5 years building, 6 deployed apps, full-stack + ML
- community: PALS President 2025, 150+ mentees, Samsung Dream Scholars President
- scholar: 7 scholarships across 4 institutions (Samsung Dream, Lee & Won Excellence, Sogang full-tuition)

SKILLS: Python · TypeScript · JavaScript · SQL · Next.js · React · Flask · PostgreSQL · TensorFlow · scikit-learn · ChemE · Supply Chain · Systems Design · Financial Modeling
LANGUAGES: English (native) · Korean (TOPIK 6) · Mandarin Chinese (BLCU) · Malay (professional) · Spanish (conversational)
STATUS: Student — open to internships & collaborations, not full-time until 2027
`;

export default async function handler(req) {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  let body;
  try { body = await req.json(); } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const { jd } = body;
  if (!jd || typeof jd !== 'string' || jd.trim().length < 50) {
    return new Response(JSON.stringify({ error: 'Provide a job description (at least 50 characters).' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Tailor feature not configured.' }), { status: 503, headers: { 'Content-Type': 'application/json' } });
  }

  const safeJd = jd.trim().slice(0, 3000);

  const systemPrompt = `You are an expert at matching Taeyang Han's portfolio to job descriptions.
Given a job description, you will:
1. Identify which of his domains are most relevant (ordered by relevance)
2. Identify which specific projects are most relevant (ordered by relevance)
3. Write a concise "why I fit" summary (2-3 sentences, first person, citing real work)
4. Identify any genuine gaps between the role and his background (be honest)
5. Give a brief strategic recommendation for how to present this application

Be specific — cite project names, real metrics, real skills. Do not make up credentials he doesn't have.

${PROJECTS_CONTEXT}`;

  const userMessage = `Job Description:\n${safeJd}\n\nPlease analyze fit and return a structured response.`;

  let res;
  try {
    res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-8',
        max_tokens: 1024,
        thinking: { type: 'adaptive' },
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }],
        output_config: {
          format: {
            type: 'json_schema',
            name: 'portfolio_fit',
            schema: {
              type: 'object',
              properties: {
                orderedDomains: {
                  type: 'array',
                  items: { type: 'string', enum: ['linguist', 'engineer', 'builder', 'community', 'scholar'] },
                  description: 'Domains ordered from most to least relevant for this JD',
                },
                highlightedProjects: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      name: { type: 'string' },
                      relevanceNote: { type: 'string', description: 'One sentence on why this project is relevant to the JD' },
                    },
                    required: ['id', 'name', 'relevanceNote'],
                  },
                  description: 'Top 3-4 most relevant projects ordered by relevance',
                },
                fitSummary: {
                  type: 'string',
                  description: '2-3 sentence first-person summary of why Taeyang fits this role, citing specific work',
                },
                gaps: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Honest gaps or areas where his background is weaker for this role',
                },
                recommendation: {
                  type: 'string',
                  description: 'Brief strategic advice on how to position this application',
                },
                matchScore: {
                  type: 'number',
                  minimum: 0,
                  maximum: 100,
                  description: 'Estimated fit percentage (0-100)',
                },
              },
              required: ['orderedDomains', 'highlightedProjects', 'fitSummary', 'gaps', 'recommendation', 'matchScore'],
            },
          },
        },
      }),
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Upstream error' }), { status: 503, headers: { 'Content-Type': 'application/json' } });
  }

  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    return new Response(JSON.stringify({ error: `Anthropic error ${res.status}` }), { status: 503, headers: { 'Content-Type': 'application/json' } });
  }

  const data = await res.json();
  const content = data.content?.find(b => b.type === 'text')?.text || data.content?.[0]?.text || '{}';

  let parsed;
  try { parsed = JSON.parse(content); } catch {
    return new Response(JSON.stringify({ error: 'Could not parse structured response', raw: content }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  return new Response(JSON.stringify(parsed), {
    headers: { 'Content-Type': 'application/json' },
  });
}
