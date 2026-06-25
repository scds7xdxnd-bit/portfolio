export const config = { runtime: 'edge' };

// T2.2 — "Tailor this portfolio to a role"
// Visitor pastes a JD → DeepSeek re-ranks projects and writes a fit summary.
// Uses json_object response_format for a typed JSON response.

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
LANGUAGES: English (native) · Korean (TOPIK 6) · Mandarin Chinese (intermediate, BLCU) · Malay (professional) · Japanese (conversational)
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

  const apiKey = process.env.DEEPSEEK_API_KEY;
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

${PROJECTS_CONTEXT}

Respond ONLY with valid JSON matching this exact shape:
{
  "orderedDomains": ["<one of: linguist|engineer|builder|community|scholar>", ...],
  "highlightedProjects": [{ "id": "<id>", "name": "<name>", "relevanceNote": "<one sentence>" }, ...],
  "fitSummary": "<2-3 sentence first-person summary>",
  "gaps": ["<gap>", ...],
  "recommendation": "<brief strategic advice>",
  "matchScore": <0-100>
}`;

  const userMessage = `Job Description:\n${safeJd}\n\nPlease analyze fit and return a structured response.`;

  let res;
  try {
    res = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        max_tokens: 1024,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
      }),
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Upstream error' }), { status: 503, headers: { 'Content-Type': 'application/json' } });
  }

  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    return new Response(JSON.stringify({ error: `DeepSeek error ${res.status}` }), { status: 503, headers: { 'Content-Type': 'application/json' } });
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content || '{}';

  let parsed;
  try { parsed = JSON.parse(content); } catch {
    return new Response(JSON.stringify({ error: 'Could not parse structured response', raw: content }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  return new Response(JSON.stringify(parsed), {
    headers: { 'Content-Type': 'application/json' },
  });
}
