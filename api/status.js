// Pings the 7 deployed apps and returns live/down status.
// Results cached 5 minutes via Cache-Control header.

const APPS = [
  { id: 'lifeos',        name: 'LifeOS',                   url: 'https://lifeos-wine.vercel.app' },
  { id: 'reaction-sim',  name: 'Reaction Simulator',        url: 'https://reactionsimulator.vercel.app' },
  { id: 'fugacity',      name: 'Fugacity Simulator',        url: 'https://fugacity-simulator.vercel.app' },
  { id: 'bullwhip',      name: 'Bullwhip Simulator',        url: 'https://scmsimulator.vercel.app' },
  { id: 'apple-scm',     name: 'Apple SCM Analysis',        url: 'https://apple-scm-web.vercel.app' },
  { id: 'process-game',  name: 'Process Game',              url: 'https://process-design.vercel.app' },
  { id: 'accounting',    name: 'Accounting (private alpha)', url: 'https://finance-app-private-alpha.fly.dev' },
];

async function ping(app) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(app.url, { method: 'HEAD', signal: controller.signal, redirect: 'follow' });
    clearTimeout(timeout);
    return { ...app, live: res.ok || res.status < 400, statusCode: res.status };
  } catch {
    return { ...app, live: false, statusCode: null };
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') { res.status(405).end(); return; }

  res.setHeader('Access-Control-Allow-Origin', '*');

  const results = await Promise.all(APPS.map(ping));
  const liveCount = results.filter(r => r.live).length;

  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60');
  res.status(200).json({
    checkedAt: new Date().toISOString(),
    summary: `${liveCount}/${APPS.length} systems live`,
    liveCount,
    total: APPS.length,
    apps: results,
  });
}
