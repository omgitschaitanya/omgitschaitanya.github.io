// Cookie tracking shared by every /linkN/ page (path=/ so all pages see the same cookies).
//   scanned      unique link numbers, in the order first visited ("3,1,7")
//   visit_log    last 50 visits as "link@unixSeconds"
//   visit_count  total page loads across all links
//   first_visit / last_visit  ISO timestamps
const ONE_YEAR = 60 * 60 * 24 * 365;
const MAX_LOG = 50;
const HUNT_COOKIES = ['scanned', 'visit_log', 'visit_count', 'first_visit', 'last_visit'];

function setCookie(name, value, maxAgeSeconds) {
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAgeSeconds}; path=/; SameSite=Lax; Secure`;
}

function getCookie(name) {
  const row = document.cookie.split('; ').find(r => r.startsWith(`${name}=`));
  return row ? decodeURIComponent(row.slice(name.length + 1)) : null;
}

const getList = name => (getCookie(name) || '').split(',').filter(Boolean);

function recordVisit() {
  const link = parseInt((location.pathname.match(/\/link(\d+)\/?/) || [])[1], 10);
  const isLink = link >= 1 && link <= 10;
  const now = new Date();
  const previous = getCookie('last_visit');
  const scanned = getList('scanned').map(Number).filter(n => n >= 1 && n <= 10);
  let count = parseInt(getCookie('visit_count'), 10) || 0;
  let first = getCookie('first_visit');

  if (isLink) {
    if (!scanned.includes(link)) scanned.push(link);
    const log = [...getList('visit_log'), `${link}@${Math.floor(now / 1000)}`].slice(-MAX_LOG);
    count += 1;
    first = first || now.toISOString();
    setCookie('scanned', scanned.join(','), ONE_YEAR);
    setCookie('visit_log', log.join(','), ONE_YEAR);
    setCookie('visit_count', count, ONE_YEAR);
    setCookie('first_visit', first, ONE_YEAR);
    setCookie('last_visit', now.toISOString(), ONE_YEAR);
  }
  return { link: isLink ? link : null, scanned, count, first, previous };
}

// Earlier versions scoped cookies to /my-site or /link1; on /link1/ those would shadow the path=/ ones.
['scans', 'visit_count', 'first_visit', 'last_visit'].forEach(name => {
  document.cookie = `${name}=; max-age=0; path=/link1; Secure`;
});

window.HUNT = recordVisit();

const fmt = iso => iso ? new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : '—';

// Rendered after hunt.js has loaded, since station names live there.
document.addEventListener('DOMContentLoaded', () => {
  const { link, scanned, count, first, previous } = window.HUNT;
  const stn = n => STATIONS[n - 1].stn.replace(/^The /, '');
  document.getElementById('visits').innerHTML = `
    ${link ? `<span class="pill primary">Link ${link} · ${esc(STATIONS[link - 1].stn)}</span>` : ''}
    <span class="pill gold">${scanned.length} / 10 unique scans</span>
    <span class="xs muted">Scanned: <b>${scanned.length ? esc(scanned.map(stn).join(' → ')) : '—'}</b></span>
    <span class="xs muted">Visits: <b>${count}</b></span>
    <span class="xs muted">First visit: <b>${fmt(first)}</b></span>
    <span class="xs muted">Previous visit: <b>${fmt(previous)}</b></span>
    <button class="btn-ghost" id="clear-visits" type="button">Clear cookies</button>`;
  document.getElementById('clear-visits').addEventListener('click', () => {
    HUNT_COOKIES.forEach(name => setCookie(name, '', 0));
    location.reload();
  });
});
