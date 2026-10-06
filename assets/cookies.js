// Cookie tracking shared by every /linkN/ page (path=/ so all pages see the same cookies).
//   scanned      unique link numbers, in the order first visited ("3,1,7")
//   visit_log    last 50 visits as "link@unixSeconds"
//   visit_count  total page loads across all links
//   first_visit / last_visit  ISO timestamps
const ONE_YEAR = 60 * 60 * 24 * 365;
const MAX_LOG = 50;
const MAX_LINK = 20;   // /link1/ ... /link20/
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
  const isLink = link >= 1 && link <= MAX_LINK;
  const now = new Date();
  const previous = getCookie('last_visit');
  const scanned = getList('scanned').map(Number).filter(n => n >= 1 && n <= MAX_LINK);
  let count = parseInt(getCookie('visit_count'), 10) || 0;
  let first = getCookie('first_visit');

  const revisit = isLink && scanned.includes(link);
  if (isLink) {
    if (!revisit) scanned.push(link);
    const log = [...getList('visit_log'), `${link}@${Math.floor(now / 1000)}`].slice(-MAX_LOG);
    count += 1;
    first = first || now.toISOString();
    setCookie('scanned', scanned.join(','), ONE_YEAR);
    setCookie('visit_log', log.join(','), ONE_YEAR);
    setCookie('visit_count', count, ONE_YEAR);
    setCookie('first_visit', first, ONE_YEAR);
    setCookie('last_visit', now.toISOString(), ONE_YEAR);
  }
  return { link: isLink ? link : null, scanned, revisit, count, first, previous };
}

// Earlier versions scoped cookies to /my-site or /link1; on /link1/ those would shadow the path=/ ones.
['scans', 'visit_count', 'first_visit', 'last_visit'].forEach(name => {
  document.cookie = `${name}=; max-age=0; path=/link1; Secure`;
});

// ?reset=1 clears the hunt cookies before recording this visit (handy for testing).
function clearHuntCookies() { HUNT_COOKIES.forEach(name => setCookie(name, '', 0)); }
if (new URLSearchParams(location.search).has('reset')) clearHuntCookies();

window.HUNT_STATE = recordVisit();
