// Visit tracking with cookies: how many times this browser has loaded the page, plus first and previous visit times.
const COOKIE_PATH = '/link1';
const ONE_YEAR = 60 * 60 * 24 * 365;

function setCookie(name, value, maxAgeSeconds) {
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAgeSeconds}; path=${COOKIE_PATH}; SameSite=Lax; Secure`;
}

function getCookie(name) {
  const row = document.cookie.split('; ').find(r => r.startsWith(`${name}=`));
  return row ? decodeURIComponent(row.slice(name.length + 1)) : null;
}

function deleteCookie(name) {
  setCookie(name, '', 0);
}

function fmt(iso) {
  return iso ? new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : '—';
}

function recordVisit() {
  const now = new Date().toISOString();
  const count = (parseInt(getCookie('visit_count'), 10) || 0) + 1;
  const first = getCookie('first_visit') || now;
  const previous = getCookie('last_visit');

  setCookie('visit_count', count, ONE_YEAR);
  setCookie('first_visit', first, ONE_YEAR);
  setCookie('last_visit', now, ONE_YEAR);

  return { count, first, previous };
}

function renderVisits({ count, first, previous }) {
  const el = document.getElementById('visits');
  el.innerHTML = `
    <span class="pill primary">${count === 1 ? 'First visit' : `Visit #${count}`}</span>
    <span class="xs muted">First visit: <b>${fmt(first)}</b></span>
    <span class="xs muted">Previous visit: <b>${fmt(previous)}</b></span>
    <button class="btn-ghost" id="clear-visits" type="button">Clear visit cookies</button>`;
  document.getElementById('clear-visits').addEventListener('click', () => {
    ['visit_count', 'first_visit', 'last_visit'].forEach(deleteCookie);
    renderVisits({ count: 0, first: null, previous: null });
    el.querySelector('.pill').textContent = 'Cookies cleared';
  });
}

renderVisits(recordVisit());
