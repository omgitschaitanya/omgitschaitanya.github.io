// ===== Config (PLACEHOLDER content: swap for real classes, videos, discounts) =====
const VIDEO_ID = 'H-v0Mm74V5o';                 // hero clip for every station until each has its own
const DISCOUNT_PER_SCAN = 10;                    // % off earned per unique code found
const DISCOUNT_CAP = 50;                         // max % off
const CHECKOUT_URL = 'https://www.masterclass.com/';

// Same 10 stations as Code.gs. map = position on Your Map (% of box), geo = pin on World Map (% of box).
const STATIONS = [
  { id: 'kitchen',         img: 'gr',   name: 'Gordon Ramsay',             cls: 'Teaches Cooking',                     stn: 'The Kitchen',          pos: '90% 30%', map: [12, 30], geo: [48, 26], city: 'London' },
  { id: 'stage',           img: 'slj',  name: 'Samuel L. Jackson',         cls: 'Teaches Acting',                      stn: 'The Stage',            pos: '50% 30%', map: [30, 62], geo: [17, 33], city: 'Los Angeles' },
  { id: 'writers-room',    img: 'sr',   name: 'Shonda Rhimes',             cls: 'Teaches Writing for Television',      stn: "The Writers' Room",    pos: '50% 30%', map: [47, 24], geo: [27, 30], city: 'New York' },
  { id: 'booth',           img: 'dm',   name: 'deadmau5',                  cls: 'Teaches Electronic Music Production', stn: 'The Booth',            pos: '50% 30%', map: [64, 58], geo: [24, 26], city: 'Toronto' },
  { id: 'atelier',         img: 'dvf',  name: 'Diane von Furstenberg',     cls: 'Teaches Building a Fashion Brand',    stn: 'The Atelier',          pos: '50% 30%', map: [82, 28], geo: [50, 29], city: 'Paris' },
  { id: 'directors-chair', img: 'rh',   name: 'Ron Howard',                cls: 'Teaches Directing',                   stn: "The Director's Chair", pos: '30% 30%', map: [88, 70], geo: [72, 40], city: 'Mumbai' },
  { id: 'pass',            img: 'tk',   name: 'Thomas Keller',             cls: 'Teaches Cooking Techniques',          stn: 'The Pass',             pos: '50% 30%', map: [20, 82], geo: [33, 70], city: 'São Paulo' },
  { id: 'edit-bay',        img: 'wh',   name: 'Werner Herzog',             cls: 'Teaches Filmmaking',                  stn: 'The Edit Bay',         pos: '70% 30%', map: [40, 88], geo: [54, 24], city: 'Berlin' },
  { id: 'pastry-bench',    img: 'da',   name: 'Dominique Ansel',           cls: 'Teaches French Pastry Fundamentals',  stn: 'The Pastry Bench',     pos: '50% 30%', map: [58, 86], geo: [88, 34], city: 'Tokyo' },
  { id: 'war-room',        img: 'dakr', name: 'David Axelrod & Karl Rove', cls: 'Teach Campaign Strategy',             stn: 'The War Room',         pos: '50% 30%', map: [76, 90], geo: [89, 76], city: 'Sydney' },
];
// Extra locked avatars so Your Map feels full, like the design.
const FILLER = [[22, 14], [38, 44], [55, 40], [72, 12], [93, 46], [8, 60], [48, 66], [70, 76], [95, 88], [5, 92]];

// PLACEHOLDER skills for the "Skills You'll Learn" swiper.
const SKILLS = [
  { img: 'slj', pos: '50% 25%', t: 'Find the truth in every scene' },
  { img: 'gr',  pos: '85% 25%', t: 'Master the classics, then break the rules' },
  { img: 'rh',  pos: '30% 25%', t: 'Lead a set with confidence' },
];
const CHIPS = [
  [['gr', 'Negotiate<br>a raise'], ['tk', 'Cook pro<br>meals at home'], ['dm', 'Unlock your<br>creativity']],
  [['dvf', 'Build<br>a business'], ['sr', 'Write songs that<br>move people'], ['rh', 'Lead with<br>Confidence']],
];

// ===== State from cookies (cookies.js): /linkN/ is station N; found = every unique station this browser has scanned =====
const found = window.HUNT.scanned.map(n => STATIONS[n - 1]);
const current = window.HUNT.link ? STATIONS[window.HUNT.link - 1] : found[found.length - 1] || STATIONS[0];
if (!found.length) found.push(current);
const scans = found.length;
const pct = Math.min(scans * DISCOUNT_PER_SCAN, DISCOUNT_CAP);

const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const img = (k, pos = '50% 30%', alt = '') => `<img src="/images/${k}.jpg" alt="${esc(alt)}" style="object-position:${pos}" loading="lazy">`;
const LOCK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';

// ---- Hero + class info (PLACEHOLDER copy derived from the station) ----
$('title').textContent = current.cls.replace(/^Teach(es)? /, '').split(' ')[0];
$('tagline').textContent = current.stn;
$('instructor').textContent = current.name;
$('meta').textContent = '20 Lessons · 1hr 30 mins';
$('desc').textContent = `${current.name} ${current.cls.charAt(0).toLowerCase() + current.cls.slice(1)}. Placeholder description: replace with the class summary for this station.`;
$('poster').src = `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`;

// Muted autoplay loop; the buttons talk to the player through the YouTube iframe API.
let muted = true;
const yt = document.createElement('iframe');
yt.allow = 'autoplay; encrypted-media; picture-in-picture';
yt.title = 'Class preview';
yt.src = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1`;
$('hero').insertBefore(yt, $('poster'));
// Keep the thumbnail up until YouTube reports the player is actually playing (state 1).
yt.addEventListener('load', () => yt.contentWindow.postMessage(JSON.stringify({ event: 'listening' }), '*'));
window.addEventListener('message', e => {
  if (e.source !== yt.contentWindow) return;
  try {
    const d = JSON.parse(e.data);
    const state = d.info && (d.info.playerState ?? (d.event === 'onStateChange' ? d.info : undefined));
    if (state === 1) $('hero').classList.add('playing');
  } catch (err) {}
});
const ytCmd = (func, args = []) => yt.contentWindow && yt.contentWindow.postMessage(JSON.stringify({ event: 'command', func, args }), '*');
$('replay').onclick = () => { ytCmd('seekTo', [0, true]); ytCmd('playVideo'); };
$('mute').onclick = () => {
  muted = !muted;
  ytCmd(muted ? 'mute' : 'unMute');
  $('mute').setAttribute('aria-label', muted ? 'Unmute' : 'Mute');
  $('muteIcon').innerHTML = muted
    ? '<path d="M11 5 6 9H2v6h4l5 4z" fill="#fff"/><path d="m23 9-6 6M17 9l6 6"/>'
    : '<path d="M11 5 6 9H2v6h4l5 4z" fill="#fff"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>';
};

// ---- Earned discount ----
$('pct').textContent = `${pct}% off`;
$('earnedSub').textContent = pct < DISCOUNT_CAP
  ? `${scans} of ${STATIONS.length} found. Continue your adventure for more savings.`
  : `${scans} of ${STATIONS.length} found. You've unlocked the maximum discount.`;
$('stickyTitle').textContent = `Get ${pct}% off all classes`;
[$('joinBtn'), $('getBtn')].forEach(a => a.href = CHECKOUT_URL);

// ---- Your Map: found instructors glow, the rest stay locked ----
$('yourMap').innerHTML =
  FILLER.map(([x, y], i) => `<div class="av locked ${i % 2 ? 'alt' : ''}" style="left:${x}%;top:${y}%">${LOCK}</div>`).join('') +
  STATIONS.map(s => {
    const got = found.includes(s);
    return `<div class="av ${got ? 'found' : 'locked'} ${s === current ? 'just' : ''}" style="left:${s.map[0]}%;top:${s.map[1]}%" title="${got ? esc(s.name) : 'Locked'}">
      ${got ? img(s.img, s.pos, s.name) : LOCK}</div>`;
  }).join('');

// ---- World Map: dotted continents + a pin per station ----
const WORLD = [
  '      ######      ####     ##########       ',
  '  ############   ###    ##################  ',
  ' ##############  #     ##################### ',
  '  ############        ###################  #',
  '   ##########         ##################    ',
  '    ########         ####################   ',
  '     ######          ### ##############     ',
  '      ####          ######  ##########      ',
  '       ###         ########  ######  #      ',
  '        ####       #########   ##    ##     ',
  '          #####     #######     #     #     ',
  '          #######    #####             ##   ',
  '           ######    ####          #####    ',
  '            ####     ###          #######   ',
  '            ###       ##           ######   ',
  '            ##                       ##     ',
  '            #                               ',
];
const cols = 44, rows = WORLD.length, cw = 361 / cols, ch = 190 / (rows + 2);
let dots = '';
WORLD.forEach((r, y) => [...r].forEach((c, x) => {
  if (c === '#') dots += `<circle cx="${(x + .5) * cw}" cy="${(y + 1.5) * ch}" r="2.6"/>`;
}));
$('worldMap').innerHTML = `<svg viewBox="0 0 361 190" preserveAspectRatio="none" aria-hidden="true"><g fill="#4a4c53">${dots}</g></svg>` +
  STATIONS.map(s => `<span class="pin ${found.includes(s) ? 'found' : ''}" style="left:${s.geo[0]}%;top:${s.geo[1]}%" data-l="${esc(s.city)}" title="${esc(s.city)}"></span>`).join('');

document.querySelector('.tabs').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  document.querySelectorAll('.tabs button').forEach(x => x.setAttribute('aria-selected', String(x === b)));
  $('yourMap').classList.toggle('hidden', b.dataset.tab !== 'your');
  $('worldMap').classList.toggle('hidden', b.dataset.tab !== 'world');
});

// ---- Skills swiper ----
$('skills').innerHTML = SKILLS.map(s => `<div><div class="bigcard">${img(s.img, s.pos)}<div class="cap">${esc(s.t)}</div></div></div>`).join('');
$('skillDots').innerHTML = SKILLS.map((_, i) => `<i class="${i ? '' : 'on'}"></i>`).join('');
$('skills').addEventListener('scroll', () => {
  const i = Math.round($('skills').scrollLeft / $('skills').clientWidth);
  [...$('skillDots').children].forEach((d, j) => d.classList.toggle('on', i === j));
}, { passive: true });

// ---- Instructor carousel (found instructors first) ----
const order = [...found.slice().reverse(), ...STATIONS.filter(s => !found.includes(s))];
$('carousel').innerHTML = order.map(s => `
  <article class="icard">
    ${img(s.img, s.pos, s.name)}
    <svg class="logo" viewBox="0 0 34 22" aria-hidden="true"><path fill="#e32652" d="M0 22 9 0h5l3 9 3-9h5l9 22h-6L22 8l-3 9h-4l-3-9-6 14z"/></svg>
    <div class="body">
      <h3 class="nm">${esc(s.name)}</h3>
      <div class="dash"></div>
      <p class="cl">${esc(s.cls)}</p>
      <a class="trailer" href="https://www.youtube.com/watch?v=${VIDEO_ID}" target="_blank" rel="noopener">
        <svg width="10" height="12" viewBox="0 0 10 12"><path fill="currentColor" d="M0 0v12l10-6z"/></svg>Watch Trailer</a>
    </div>
  </article>`).join('');

// ---- Membership chips + sticky avatars ----
$('chipRows').innerHTML = CHIPS.map(row => `<div>${row.map(([k, t]) => `<span class="chip">${img(k)}<span>${t}</span></span>`).join('')}</div>`).join('');
$('stack').innerHTML = ['gr', 'sr', 'slj', 'dvf', 'rh'].map(k => img(k)).join('');
