// Current Seoul weather for the living-dawn hero, reduced to the few kinds the
// artwork can show. Proxied (rather than called from the browser) so visitors
// never contact a third party, and cached 15 minutes at the edge.

const SOURCE = 'https://api.open-meteo.com/v1/forecast?latitude=37.5665&longitude=126.978&current=weather_code,cloud_cover&timezone=Asia%2FSeoul';

// WMO weather codes → what the hero renders.
function kindOf(code, cloud) {
  if ([95, 96, 99].includes(code)) return 'storm';
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'snow';
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'rain';
  if (code === 45 || code === 48) return 'fog';
  if (code === 3 || cloud >= 85) return 'overcast';
  return 'clear';
}

export default async function handler(req, res) {
  if (req.method !== 'GET') { res.status(405).end(); return; }
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const r = await fetch(SOURCE, { signal: controller.signal });
    clearTimeout(timeout);
    if (!r.ok) throw new Error(`upstream ${r.status}`);
    const { current } = await r.json();
    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=1800');
    res.status(200).json({ kind: kindOf(current.weather_code, current.cloud_cover), code: current.weather_code, time: current.time });
  } catch {
    // The hero simply shows clear sky when weather is unavailable.
    res.setHeader('Cache-Control', 's-maxage=120');
    res.status(200).json({ kind: 'clear', code: null, time: null });
  }
}
