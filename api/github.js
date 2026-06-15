// T3.2 — GitHub public activity pulse.
// Returns days since last push + a small activity summary.
// No auth token needed for public data; cached 1 hour.

const GITHUB_USER = 'scrs7xdxnd-bit';

export default async function handler(req, res) {
  if (req.method !== 'GET') { res.status(405).end(); return; }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=300');

  try {
    const evRes = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=10`,
      { headers: { 'User-Agent': 'portfolio-status-check/1.0', Accept: 'application/vnd.github.v3+json' } }
    );

    if (!evRes.ok) {
      res.status(200).json({ available: false, reason: `GitHub API ${evRes.status}` });
      return;
    }

    const events = await evRes.json();
    const pushes = events.filter(e => e.type === 'PushEvent');
    const latest = pushes[0] || events[0];

    if (!latest) {
      res.status(200).json({ available: false, reason: 'no events' });
      return;
    }

    const lastDate = new Date(latest.created_at);
    const daysAgo = Math.floor((Date.now() - lastDate) / 86_400_000);
    const repo = latest.repo?.name?.replace(`${GITHUB_USER}/`, '') || '?';

    res.status(200).json({
      available: true,
      daysAgo,
      lastRepo: repo,
      lastDate: lastDate.toISOString().slice(0, 10),
      summary: daysAgo === 0 ? 'Shipped today' : daysAgo === 1 ? 'Last shipped yesterday' : `Last shipped ${daysAgo}d ago`,
    });
  } catch (err) {
    res.status(200).json({ available: false, reason: 'fetch error' });
  }
}
