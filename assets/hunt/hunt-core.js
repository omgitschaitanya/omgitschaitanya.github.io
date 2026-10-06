// The unlock screen, shared by the Lavish mockup and the live link pages.
// Needs stations.js loaded first, and a global HUNT_ASSETS = { img: {key: url}, icon: {mark, wordmark, lock, replay, mute, faces: [url]} }.
const HUNT = (() => {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const byKey = Object.fromEntries(STATIONS.map((s, i) => [s.k, { ...s, n: i + 1 }]));
  const JOIN_URL = "https://www.masterclass.com/";

  // Placeholder copy; swap in real class names.
  const COPY = {
    ql: { t: "Hip-Hop",      tag: "Tell your story",             d: "Questlove shows how a beat, a sample and a verse become a story worth telling, and how to find your own voice in it." },
    sr: { t: "Shondaland",   tag: "Writing for television",      d: "Shonda Rhimes takes you inside the writers' room: how to pitch, build characters and keep an audience coming back." },
    bi: { t: "Leadership",   tag: "Business strategy",           d: "Bob Iger shares what running Disney taught him about bold bets, decisive calls and leading through change." },
    sw: { t: "Tennis",       tag: "Play like a champion",        d: "Serena Williams breaks down the footwork, the serve and the mindset behind 23 Grand Slam titles." },
    cv: { t: "Negotiation",  tag: "The art of negotiation",      d: "Former FBI hostage negotiator Chris Voss teaches the listening tactics that get you to yes." },
    tt: { t: "Math",         tag: "Mathematical thinking",       d: "Fields Medalist Terence Tao shows how mathematicians break a hard problem into ones they can solve." },
    jg: { t: "Conservation", tag: "Hope for the planet",         d: "Jane Goodall shares six decades of field work with chimpanzees and what each of us can do for the wild." },
    rp: { t: "Be Yourself",  tag: "Self-expression",             d: "RuPaul on finding your voice, owning your story and putting on a show only you could give." },
    my: { t: "Malala",       tag: "Changing your world",         d: "The world's youngest Nobel Peace Prize winner, teaching you how to make noise that matters." },
    gh: { t: "Gut Health",   tag: "Feel better from the inside", d: "What your gut is doing all day, and the everyday food choices that help it." },
    us: { t: "Performance",  tag: "The art of performance",      d: "Usher breaks down how he builds a show: the vocals, the moves and the connection with a crowd." },
    mg: { t: "Curiosity",    tag: "Follow the rabbit hole",      d: "Malcolm Gladwell on chasing a question until it turns into a story people can't stop telling." },
    aw: { t: "Fashion",      tag: "Creativity and leadership",   d: "Anna Wintour on spotting talent, making decisions fast and leading a creative team." },
    wg: { t: "The Great One", tag: "The athlete's mindset",      d: "Wayne Gretzky on skating to where the puck is going and the habits behind a record-breaking career." },
    tk: { t: "Fine Dining",  tag: "Cooking techniques",          d: "Thomas Keller on the techniques and the patience behind a perfect plate." },
    ch: { t: "Space",        tag: "Space exploration",           d: "Astronaut Chris Hadfield on what life in orbit teaches about preparation, teamwork and staying calm under pressure." },
    gk: { t: "Chess",        tag: "Think moves ahead",           d: "Garry Kasparov on strategy, calculation and how to make decisions under pressure." },
    rr: { t: "Real Estate",  tag: "Know a good lot",             d: "How to read a property, a neighborhood and a deal before you make your move." },
  };
  // The three Gordon Ramsay codes share one clip and one description.
  COPY.gr = COPY.gr2 = COPY.grf = { t: "Kitchen", tag: "Cooking fundamentals", d: "Gordon Ramsay shows the knife skills, timing and confidence that make a great home cook." };
  const TOTAL = STATIONS.length;

  // Placeholder ladder: unlocks 1-10 climb to half off; every unlock after that adds a prize-draw entry.
  const DISCOUNT = [10, 15, 20, 25, 30, 33, 36, 40, 45, 50];
  const pct = n => DISCOUNT[Math.min(Math.max(n, 1), DISCOUNT.length) - 1];
  const entries = n => Math.max(0, n - DISCOUNT.length);

  // Seating plan from "Find your table" (1920x1080 px), shifted so the map starts at (OX, OY).
  const OX = 780, OY = 170, MW = 1130, MH = 830;
  const TABLES = [
    ["Judges", 979, 374],
    [1, 1112, 425], [2, 1251, 487], [3, 1403, 511], [4, 1559, 437], [5, 1705, 408], [6, 1843, 358],
    [7, 971, 526], [8, 1121, 592], [9, 1269, 641], [10, 1439, 704], [12, 1552, 617], [13, 1680, 552], [14, 1830, 517],
    [15, 987, 679], [16, 1137, 745], [17, 1580, 782], [18, 1691, 698],
  ];
  // Codes that sit on a table (every table has one). The bathroom and food-line codes are off the map.
  const SPOT = Object.fromEntries(STATIONS.filter(s => s.scene === "table").map(s => [s.k, +s.place.replace(/\D/g, "")]));
  const tableXY = n => { const t = TABLES.find(t => t[0] === n); return [t[1] - OX, t[2] - OY]; };

  // Where the face sits across each photo (0 = left edge, 1 = right edge), so crops keep it in frame.
  const FOCUS = { gr: .86, gr2: .86, grf: .86, tk: .55 };
  const focus = k => FOCUS[k] ?? .5;
  const glyph = (s, color = "#ffffff") => (PROPS[s.prop] || "").replaceAll('"C"', `"${color}"`);
  const img = k => HUNT_ASSETS.img[k];

  function media(s) {
    if (img(s.k)) return `<img src="${img(s.k)}" alt="" style="object-position:${focus(s.k) * 100}% 30%">`;
    return `<div class="poster" style="--c:${s.color}"><svg viewBox="-20 -20 40 40" aria-hidden="true">${glyph(s)}</svg></div>`;
  }

  function roomSVG(inner, defs = "") {
    const X = x => x - OX, Y = y => y - OY;
    return `<svg viewBox="0 0 ${MW} ${MH}" role="img" aria-label="Seating plan">
      <defs>${defs}</defs>
      <rect x="${X(1180)}" y="${Y(190)}" width="418" height="100" rx="6" fill="#eb3864" opacity=".9"/>
      <text x="${X(1389)}" y="${Y(252)}" text-anchor="middle" font-size="40" font-weight="600" fill="#fff" letter-spacing="2">STAGE</text>
      <rect x="${X(848)}" y="${Y(930)}" width="1022" height="36" rx="4" fill="#eb3864" opacity=".75"/>
      <text x="${X(1359)}" y="${Y(956)}" text-anchor="middle" font-size="22" fill="#fff" letter-spacing="2">DOORS</text>
      ${inner}</svg>`;
  }

  function faintTables(skip = []) {
    return TABLES.filter(t => !skip.includes(t[0])).map(([n, x, y]) => {
      const label = typeof n === "string";
      return `<circle cx="${x - OX}" cy="${y - OY}" r="${label ? 54 : 50}" fill="rgba(255,255,255,.07)"/>
        <text x="${x - OX}" y="${y - OY + (label ? 8 : 12)}" text-anchor="middle" font-size="${label ? 24 : 34}" font-weight="600" fill="rgba(255,255,255,.28)">${n}</text>`;
    }).join("");
  }

  // Your Map: codes you've found show the instructor with a check; the rest are locked. The latest one pulses.
  function mapSVG(found, curKey, id = "m") {
    const onMap = STATIONS.filter(s => SPOT[s.k]);
    const pins = onMap.map(s => {
      const [cx, cy] = tableXY(SPOT[s.k]), r = 52;
      let face;
      if (found.includes(s.k)) {
        face = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${img(s.k) ? `url(#${id}-${s.k})` : s.color}"/>
          ${img(s.k) ? "" : `<g transform="translate(${cx} ${cy}) scale(1.5)">${glyph(s)}</g>`}
          <circle cx="${cx + 38}" cy="${cy - 38}" r="20" fill="#25b565" stroke="#000" stroke-width="4"/>
          <path d="M${cx + 29} ${cy - 38} l6 6 l12 -12" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
      } else {
        face = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${s.color}" opacity=".55" filter="url(#${id}-soft)"/>
          <circle cx="${cx}" cy="${cy}" r="${r}" fill="rgba(0,0,0,.35)"/>
          <image href="${HUNT_ASSETS.icon.lock}" x="${cx - 24}" y="${cy - 24}" width="48" height="48"/>`;
      }
      const ring = s.k === curKey ? `<circle class="pulse" cx="${cx}" cy="${cy}" r="${r + 10}" fill="none" stroke="#eb3864" stroke-width="6"/>` : "";
      return ring + face;
    }).join("");
    const defs = onMap.filter(s => img(s.k)).map(s =>
      `<pattern id="${id}-${s.k}" patternContentUnits="objectBoundingBox" width="1" height="1"><image href="${img(s.k)}" x="${(-0.9 * focus(s.k)).toFixed(3)}" y="0" width="1.9" height="1" preserveAspectRatio="xMidYMid meet"/></pattern>`).join("")
      + `<filter id="${id}-soft"><feGaussianBlur stdDeviation="6"/></filter>`;
    return roomSVG(faintTables(Object.values(SPOT)) + pins, defs);
  }

  // Where a code goes, for the QR card sheet: every table faint, this one lit up.
  function locatorSVG(s) {
    const [cx, cy] = tableXY(SPOT[s.k]);
    return roomSVG(faintTables([SPOT[s.k]]) + `
      <circle cx="${cx}" cy="${cy}" r="78" fill="none" stroke="${s.color}" stroke-width="8" opacity=".5"/>
      <circle cx="${cx}" cy="${cy}" r="58" fill="${s.color}"/>
      <text x="${cx}" y="${cy + 15}" text-anchor="middle" font-size="44" font-weight="700" fill="#fff">${SPOT[s.k]}</text>`);
  }

  // The codes that aren't on the map, as found/locked chips under it.
  function offMapHTML(found) {
    const chips = STATIONS.filter(s => !SPOT[s.k]).map(s => {
      const open = found.includes(s.k);
      return `<span class="chip ${open ? "open" : ""}" style="--c:${s.color}">${open ? "✓" : `<img src="${HUNT_ASSETS.icon.lock}" alt="">`}${esc(s.place)}</span>`;
    }).join("");
    return `<div class="offmap"><span>Also hidden around the venue</span><div class="chips">${chips}</div></div>`;
  }

  const entryWord = k => `${k} prize ${k === 1 ? "entry" : "entries"}`;
  function earned(n, revisit) {
    const e = entries(n);
    if (revisit) return { h: `Already unlocked`, p: `You've found ${n} of ${TOTAL} and earned ${pct(n)}% off${e ? ` and ${entryWord(e)}` : ""}. Find another code for more.` };
    const amt = t => `<em class="reward__amount">${t}</em>`;
    if (n === TOTAL) return { h: `All ${TOTAL} found. ${amt(`${pct(n)}% off + ${entryWord(e)}`)}`, p: "You're a Hunt Master." };
    if (e) return { h: `You earned ${amt("a prize entry")}`, p: `${pct(n)}% off, plus ${entryWord(e)} in the draw. Keep hunting for more.` };
    if (n === DISCOUNT.length) return { h: `You earned ${amt(`${pct(n)}% off`)}`, p: "That's half off. Every code from here adds a prize-draw entry." };
    return { h: `You earned ${amt(`${pct(n)}% off`)}`, p: "Continue your adventure for more savings." };
  }

  // Hero + title + "You earned" + Your Map. `found` is the ordered list of keys found so far, ending with `cur` unless revisiting.
  function unlockHTML(curKey, found, { revisit = false, id = "m" } = {}) {
    const cur = byKey[curKey], c = COPY[curKey], n = found.length, e = earned(n, revisit);
    return `
      <div class="hero"><div class="media">${media(cur)}</div><div class="fadetop"></div><div class="fade"></div>
        <a class="play" href="${cur.clip}" target="_blank" rel="noopener" aria-label="Play the clip"></a>
        <button class="glass replay" type="button" aria-label="Replay"><img src="${HUNT_ASSETS.icon.replay}" alt=""></button>
        <button class="glass mute" type="button" aria-label="Unmute"><img src="${HUNT_ASSETS.icon.mute}" alt=""></button>
      </div>
      <div class="body">
        <div class="titlerow">
          <div class="nameplate"><span class="t">${esc(c.t)}</span><span class="tag">${esc(c.tag)}</span></div>
          <div class="byline"><b>${esc(cur.name)}</b><span>${revisit ? "Found earlier" : `Unlock ${n} of ${TOTAL}`} · ${esc(cur.place)}</span></div>
        </div>
        <p class="desc">${esc(c.d)}</p>
        <div class="rule"></div>
        <div class="earned"><h3>${e.h}</h3><p class="reward__sub">${e.p}</p></div>
        <div class="mapblock">
          <div class="tabs"><span>Your Map</span></div>
          <div class="mapcard">${mapSVG(found, curKey, id)}</div>
          ${offMapHTML(found)}
          <p class="mapnote">${n} of ${TOTAL} found · ${TOTAL - n} still locked</p>
        </div>
      </div>`;
  }

  function ladderHTML(found) {
    const n = found.length;
    const rung = i => `<div class="rung ${i < n ? "done" : ""} ${i === n - 1 ? "now" : ""}">
        <span class="n">${i + 1}</span><span class="r">${i < n ? esc(byKey[found[i]].name) : "Find another code"}</span>
        <span class="pct">${i < DISCOUNT.length ? DISCOUNT[i] + "% off" : "+1 entry"}</span></div>`;
    const idx = [...Array(TOTAL).keys()];
    return `<div class="ladder"><h4>Every code adds to your discount</h4>${idx.slice(0, DISCOUNT.length).map(rung).join("")}
      <h5>Then every code is a prize-draw entry</h5><p class="ladnote">Raffle tickets, live events, dinners with chefs.</p>${idx.slice(DISCOUNT.length).map(rung).join("")}</div>`;
  }

  const journeyHTML = () => `<div class="journey"><h4>Start Your Journey Today</h4><p>From $10/month (billed annually)</p>
    <a class="join" href="${JOIN_URL}" target="_blank" rel="noopener">Join Now</a></div>`;

  function stickybarHTML(n) {
    const faces = HUNT_ASSETS.icon.faces.map(f => `<img src="${f}" alt="">`).join("");
    return `<div class="stickybar"><div class="txt"><div class="faces">${faces}</div><b>Get ${pct(n)}% off all classes</b><span>Starting at $10/month billed annually</span></div>
      <a class="getmc" href="${JOIN_URL}" target="_blank" rel="noopener">Get <img src="${HUNT_ASSETS.icon.wordmark}" alt="MasterClass"></a></div>`;
  }

  // Milestones get the bigger celebration: half off, and all codes found.
  const isMilestone = n => n === DISCOUNT.length || n === TOTAL;
  return { esc, byKey, SPOT, TOTAL, isMilestone, unlockHTML, ladderHTML, journeyHTML, stickybarHTML, locatorSVG, earned };
})();
