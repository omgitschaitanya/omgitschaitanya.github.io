const COOKIE_NAME = 'clicks';
const ONE_YEAR = 60 * 60 * 24 * 365;

function setCookie(name, value, maxAgeSeconds) {
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAgeSeconds}; path=/my-site; SameSite=Lax; Secure`;
}

function getCookie(name) {
  const match = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
}

function deleteCookie(name) {
  setCookie(name, '', 0);
}

let clicks = parseInt(getCookie(COOKIE_NAME), 10) || 0;
const countEl = document.getElementById('count');

function render() {
  countEl.textContent = `Clicks: ${clicks}`;
}

document.getElementById('btn').addEventListener('click', () => {
  clicks++;
  setCookie(COOKIE_NAME, clicks, ONE_YEAR);
  render();
});

document.getElementById('reset').addEventListener('click', () => {
  clicks = 0;
  deleteCookie(COOKIE_NAME);
  render();
});

render();
