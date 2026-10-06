// Shared by the hunt pages, the mockup and the QR card sheet. Station N is the code at omgitschaitanya.github.io/linkN.
// Source: "Team --> Clip" table (with Link No) in the Team 5 ideathon doc. Clips are masterclass.dev (staging) links.
// link1-11 follow the doc's Link No column; link12-20 are the remaining tables in table order.
const CLIP = id => `https://www.masterclass.dev/video?media=${id}`;
const STATIONS = [
  { k: "ql",  link: "link1",  name: "Questlove",          cls: "Teaches Hip-Hop Storytelling",             topic: "Music",          color: "#e32652", place: "Table 1",          team: "Team Emcee",                scene: "table",  prop: "record",   clip: CLIP("d4bead44-9e46-4e2d-b6f7-2dd8903f3712") },
  { k: "sr",  link: "link2",  name: "Shonda Rhimes",      cls: "Teaches Writing for Television",           topic: "Writing",        color: "#4721d0", place: "Table 2",          team: "You Can't Handle the Twos", scene: "table",  prop: "clapper",  clip: CLIP("b804bd1d-7b81-46a0-961b-384cb7e3c53f") },
  { k: "bi",  link: "link3",  name: "Bob Iger",           cls: "Teaches Business Strategy and Leadership", topic: "Business",       color: "#b8862b", place: "Table 4",          team: "Fantastic Four",            scene: "table",  prop: "chart",    clip: CLIP("14fd8790-aca9-41c3-a482-f9ff191cfe64") },
  { k: "sw",  link: "link4",  name: "Serena Williams",    cls: "Teaches Tennis",                           topic: "Sport",          color: "#3ebb70", place: "Table 10",         team: "PERFECT 10",                scene: "table",  prop: "ball",     clip: CLIP("31741602-19ec-481c-945c-1e10e5689eec") },
  { k: "cv",  link: "link5",  name: "Chris Voss",         cls: "Teaches the Art of Negotiation",           topic: "Negotiation",    color: "#3787ff", place: "Table 13",         team: "Cache us if you Can",       scene: "table",  prop: "bubbles",  clip: CLIP("d5a9f0f2-9389-46a1-b539-263d8b06b744") },
  { k: "tt",  link: "link6",  name: "Terence Tao",        cls: "Teaches Mathematical Thinking",            topic: "Math",           color: "#ff9000", place: "Table 14",         team: "Nth Degree",                scene: "table",  prop: "pi",       clip: CLIP("677f8bbf-8c3d-4caa-a8e2-76258fb796a7") },
  { k: "jg",  link: "link7",  name: "Jane Goodall",       cls: "Teaches Conservation",                     topic: "Science",        color: "#2f9e6e", place: "Table 15",         team: "Synergy Animals",           scene: "table",  prop: "leaf",     clip: CLIP("d568511f-0109-4cbb-919f-82c3fb3a37a4") },
  { k: "rp",  link: "link8",  name: "RuPaul",             cls: "Teaches Self-Expression and Authenticity", topic: "Self-Expression", color: "#d0559a", place: "Table 6",         team: "Camp Counselors",           scene: "table",  prop: "star",     clip: CLIP("d409e2b6-77dd-49ef-8ec7-f62338f8016d") },
  { k: "gh",  link: "link9",  name: "Gut Health",         cls: "A wellness lesson from the library",       topic: "Wellness",       color: "#1fa69a", place: "Men's bathroom",   team: "By the mirror",             scene: "mirror", prop: "drop",     clip: CLIP("97aaa490-b0ce-4252-8d7b-430c9531d6e8") },
  { k: "grf", link: "link10", name: "Gordon Ramsay",      cls: "Teaches Cooking",                          topic: "Cooking",        color: "#ef4562", place: "Food line",        team: "Grab a tray",               scene: "food",   prop: "pan",      clip: CLIP("893ff907-8313-4f9b-aac0-86c7838ca922") },
  { k: "mu",  link: "link11", name: "RuPaul",             cls: "Teaches Self-Expression and Authenticity", topic: "Make-up",         color: "#c2417f", place: "Women's bathroom", team: "By the mirror",             scene: "mirror", prop: "lipstick", clip: CLIP("bfad804a-e933-4992-91a3-c23e30148603") },
  { k: "us",  link: "link12", name: "Usher",              cls: "Teaches the Art of Performance",           topic: "Performance",    color: "#8a5cf6", place: "Table 3",          team: "Triple Threat",             scene: "table",  prop: "mic",      clip: CLIP("b34447ad-edc1-4bc8-8433-521bff49cafa") },
  { k: "mg",  link: "link13", name: "Malcolm Gladwell",   cls: "Teaches Writing",                          topic: "Curiosity",      color: "#2bb3d9", place: "Table 5",          team: "Twelve Open Tabs",          scene: "table",  prop: "book",     clip: CLIP("0e2ce03f-198b-4b79-ae5e-0459a0dfa44a") },
  { k: "aw",  link: "link14", name: "Anna Wintour",       cls: "Teaches Creativity and Leadership",        topic: "Fashion",        color: "#c45d3a", place: "Table 7",          team: "Members Only",              scene: "table",  prop: "glasses",  clip: CLIP("86b79fab-8dda-4b3a-b26d-ab70d33b535e") },
  { k: "wg",  link: "link15", name: "Wayne Gretzky",      cls: "Teaches the Athlete's Mindset",            topic: "Hockey",         color: "#5b8def", place: "Table 8",          team: "Team Gr8",                  scene: "table",  prop: "puck",     clip: CLIP("5ad7ef59-3146-4d4f-a318-730b248cd83f") },
  { k: "tk",  link: "link16", name: "Thomas Keller",      cls: "Teaches Cooking Techniques",               topic: "Fine Dining",    color: "#b45309", place: "Table 9",          team: "Fine 9",                    scene: "table",  prop: "whisk",    clip: CLIP("e6a1f004-8897-4f8f-922b-8a968c995dcb") },
  { k: "ch",  link: "link17", name: "Chris Hadfield",     cls: "Teaches Space Exploration",                topic: "Space",          color: "#4f46e5", place: "Table 12",         team: "Fantastic 12",              scene: "table",  prop: "star",     clip: "https://youtu.be/ZlmiCAGEGvI" },
  { k: "gk",  link: "link18", name: "Garry Kasparov",     cls: "Teaches Chess",                            topic: "Strategy",       color: "#94a3b8", place: "Table 16",         team: "Chair Masters",             scene: "table",  prop: "knight",   clip: CLIP("f264d413-f14a-4769-95ea-a37f266702f2") },
  { k: "rr",  link: "link19", name: "Robert Refkin",      cls: "Teaches Real Estate",                      topic: "Real Estate",    color: "#0ea5e9", place: "Table 17",         team: "Lot 17",                    scene: "table",  prop: "house",    clip: CLIP("6aedbeed-91f7-4d2c-afee-bb4268d6a69b") },
  { k: "gr2", link: "link20", name: "Gordon Ramsay",      cls: "Teaches Cooking",                          topic: "Cooking",        color: "#ef4562", place: "Table 18",         team: "ATE-TEEN",                  scene: "table",  prop: "pan",      clip: CLIP("893ff907-8313-4f9b-aac0-86c7838ca922") },
];

// Small drawn props, centered on (0,0), roughly 28px across. "C" is replaced with the station color.
const PROPS = {
  record:   '<circle r="14" fill="#111"/><circle r="9" fill="none" stroke="#333" stroke-width="1"/><circle r="4" fill="C"/><path d="M12 -14 L18 -18 M12 -14 L4 -2" stroke="#ddd" stroke-width="2" stroke-linecap="round"/>',
  clapper:  '<rect x="-13" y="-4" width="26" height="16" rx="2" fill="#f4f4f4"/><path d="M-13 -5 L12 -12 L13 -8 L-12 -1 Z" fill="#111"/><path d="M-7 -6.5 L-4 -2.5 M0 -8.5 L3 -4.5 M7 -10.5 L10 -6.5" stroke="#f4f4f4" stroke-width="2"/>',
  chart:    '<rect x="-13" y="-12" width="26" height="24" rx="2" fill="#f4f4f4"/><rect x="-8" y="2" width="4" height="6" fill="C"/><rect x="-2" y="-3" width="4" height="11" fill="C"/><rect x="4" y="-8" width="4" height="16" fill="C"/>',
  ball:     '<circle r="12" fill="#d7f05a"/><path d="M-11 -4 C-4 -2 -4 6 -9 9 M11 4 C4 2 4 -6 9 -9" stroke="#fff" stroke-width="2" fill="none"/>',
  bubbles:  '<rect x="-15" y="-13" width="18" height="12" rx="4" fill="#f4f4f4"/><path d="M-11 -1 L-12 4 L-6 -1 Z" fill="#f4f4f4"/><rect x="-3" y="-2" width="18" height="12" rx="4" fill="C"/><path d="M11 10 L12 15 L6 10 Z" fill="C"/>',
  pi:       '<text x="0" y="9" text-anchor="middle" font-family="Georgia, serif" font-size="28" font-weight="700" fill="C">π</text>',
  leaf:     '<path d="M-12 10 C-12 -8 0 -14 13 -13 C14 0 6 12 -12 10 Z" fill="C"/><path d="M-12 10 L6 -6" stroke="#f4f4f4" stroke-width="1.5"/>',
  lipstick: '<rect x="-5" y="-2" width="10" height="14" rx="1.5" fill="#d9b25b"/><path d="M-4 -2 L-4 -10 L4 -14 L4 -2 Z" fill="C"/>',
  drop:     '<path d="M0 -14 C6 -5 10 0 10 5 A10 10 0 0 1 -10 5 C-10 0 -6 -5 0 -14 Z" fill="C"/>',
  star:     '<path d="M0 -14 L4 -4 L14 -4 L6 2 L9 12 L0 6 L-9 12 L-6 2 L-14 -4 L-4 -4 Z" fill="C"/>',
  pan:      '<circle cx="-3" cy="0" r="11" fill="#2a2b30"/><circle cx="-3" cy="0" r="7" fill="#3a3c43"/><rect x="7" y="-2.5" width="11" height="5" rx="2.5" fill="C"/><circle cx="-5" cy="-1" r="3" fill="#f6c453"/>',
  mic:      '<rect x="-5" y="-14" width="10" height="16" rx="5" fill="C"/><path d="M-9 -2 A9 9 0 0 0 9 -2" stroke="#f4f4f4" stroke-width="2" fill="none"/><path d="M0 7 V13 M-5 13 H5" stroke="#f4f4f4" stroke-width="2" stroke-linecap="round"/>',
  book:     '<path d="M0 -9 C-5 -12 -11 -12 -14 -10 V10 C-11 8 -5 8 0 11 Z" fill="#f4f4f4"/><path d="M0 -9 C5 -12 11 -12 14 -10 V10 C11 8 5 8 0 11 Z" fill="C"/>',
  glasses:  '<rect x="-15" y="-6" width="13" height="10" rx="4" fill="#111"/><rect x="2" y="-6" width="13" height="10" rx="4" fill="#111"/><path d="M-2 -2 H2" stroke="#111" stroke-width="2"/><path d="M-13 -4 L-9 -4" stroke="C" stroke-width="2" stroke-linecap="round"/><path d="M4 -4 L8 -4" stroke="C" stroke-width="2" stroke-linecap="round"/>',
  puck:     '<ellipse cx="0" cy="4" rx="12" ry="5" fill="#111"/><rect x="-12" y="-2" width="24" height="6" fill="#111"/><ellipse cx="0" cy="-2" rx="12" ry="5" fill="#2a2b30"/><path d="M-14 -12 L4 2" stroke="C" stroke-width="3" stroke-linecap="round"/>',
  whisk:    '<path d="M0 2 C-9 -6 -7 -15 0 -15 C7 -15 9 -6 0 2 Z M0 2 C-4 -6 -3 -14 0 -15 M0 2 C4 -6 3 -14 0 -15" stroke="#f4f4f4" stroke-width="1.5" fill="none"/><rect x="-2" y="2" width="4" height="12" rx="2" fill="C"/>',
  knight:   '<path d="M-8 12 H9 V8 H-8 Z M-6 8 C-6 2 -2 0 -2 -3 L-8 -1 L-9 -5 L-2 -12 C4 -14 9 -8 8 0 L7 8 Z" fill="C"/><circle cx="1" cy="-7" r="1.3" fill="#111"/>',
  house:    '<path d="M-13 0 L0 -12 L13 0" stroke="#f4f4f4" stroke-width="2.5" fill="none" stroke-linejoin="round"/><rect x="-9" y="-1" width="18" height="13" fill="C"/><rect x="-3" y="4" width="6" height="8" fill="#f4f4f4"/>',
};

// A small place illustration (where the code is posted): a table seen from above, a bathroom mirror, or the food line.
function sceneSVG(s, opts = {}) {
  const c = s.color;
  const prop = (PROPS[s.prop] || "").replaceAll('"C"', `"${c}"`);
  const w = 200, h = 120;
  let body = "";
  if (s.scene === "table") {
    const n = s.place.replace(/\D/g, "");
    const chairs = Array.from({ length: 6 }, (_, i) => {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
      return `<rect x="${100 + Math.cos(a) * 46 - 9}" y="${62 + Math.sin(a) * 40 - 7}" width="18" height="14" rx="5" fill="#43454c"/>`;
    }).join("");
    body = `${chairs}
      <ellipse cx="100" cy="62" rx="36" ry="30" fill="#e9e3d6"/>
      <ellipse cx="100" cy="62" rx="36" ry="30" fill="none" stroke="${c}" stroke-width="3"/>
      <g transform="translate(100 47) scale(.85)">${prop}</g>
      <text x="100" y="85" text-anchor="middle" font-family="Oswald, Arial Narrow, sans-serif" font-weight="700" font-size="13" fill="#191c21">TABLE ${n}</text>`;
  } else if (s.scene === "mirror") {
    const female = s.place.startsWith("Women");
    const fig = female
      ? '<circle cx="0" cy="-9" r="4" fill="#f4f4f4"/><path d="M-6 7 L0 -4 L6 7 Z" fill="#f4f4f4"/>'
      : '<circle cx="0" cy="-9" r="4" fill="#f4f4f4"/><rect x="-4" y="-4" width="8" height="12" rx="2" fill="#f4f4f4"/>';
    body = `
      <rect x="0" y="0" width="${w}" height="${h}" fill="#272c33"/>
      <path d="M0 0 H200 V120 H0 Z" fill="url(#tiles)" opacity=".35"/>
      <rect x="62" y="12" width="76" height="62" rx="30" fill="#9fb6c4"/>
      <rect x="62" y="12" width="76" height="62" rx="30" fill="none" stroke="#d4d5d9" stroke-width="3"/>
      <path d="M80 26 L96 18 M80 36 L104 22" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".6"/>
      <g transform="translate(118 50)">${prop}</g>
      <rect x="54" y="84" width="92" height="12" rx="3" fill="#e9e3d6"/>
      <path d="M92 84 V78 H104" stroke="#d4d5d9" stroke-width="3" fill="none"/>
      <g transform="translate(26 36)"><circle r="14" fill="${c}"/>${fig}</g>`;
  } else {
    const trays = [40, 92, 144].map((x, i) =>
      `<rect x="${x}" y="58" width="44" height="22" rx="4" fill="#9ea0a9"/><g transform="translate(${x + 22} 66) scale(.6)">${i === 1 ? prop : '<circle r="8" fill="#e9e3d6"/>'}</g>`).join("");
    body = `
      <rect x="10" y="72" width="180" height="16" rx="3" fill="#e9e3d6"/>
      <rect x="10" y="88" width="180" height="22" fill="#43454c"/>
      ${trays}
      ${[24, 44, 64].map(x => `<circle cx="${x}" cy="36" r="7" fill="#565961"/><rect x="${x - 7}" y="44" width="14" height="10" rx="4" fill="#565961"/>`).join("")}
      <path d="M80 38 H176" stroke="${c}" stroke-width="3" stroke-dasharray="6 5" stroke-linecap="round"/>
      <path d="M170 32 L178 38 L170 44" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  const bg = s.scene === "mirror" ? "" : `<rect width="${w}" height="${h}" fill="#191c21"/><rect width="${w}" height="${h}" fill="${c}" opacity=".14"/>`;
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${s.place}" ${opts.cls ? `class="${opts.cls}"` : ""} preserveAspectRatio="xMidYMid slice">
    <defs><pattern id="tiles" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M16 0 H0 V16" fill="none" stroke="#9ea0a9" stroke-width="1"/></pattern></defs>
    ${bg}${body}</svg>`;
}
