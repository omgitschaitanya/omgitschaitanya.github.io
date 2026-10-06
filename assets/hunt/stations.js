// Shared by the hunt page and the QR card sheet. Station N is the code at omgitschaitanya.github.io/linkN.
// Source: "Team --> Clip" table in the Team 5 ideathon doc. Clips are masterclass.dev (staging) links.
const STATIONS = [
  { k: "ql",  link: "link1",  name: "Questlove",        cls: "Teaches Hip-Hop Storytelling",           topic: "Music",        color: "#e32652",
    place: "Table 1",          team: "Team Emcee",                 scene: "table", prop: "record",
    clip: "https://www.masterclass.dev/video?media=d4bead44-9e46-4e2d-b6f7-2dd8903f3712" },
  { k: "sr",  link: "link2",  name: "Shonda Rhimes",    cls: "Teaches Writing for Television",         topic: "Writing",      color: "#4721d0",
    place: "Table 2",          team: "You Can't Handle the Twos",  scene: "table", prop: "clapper",
    clip: "https://www.masterclass.dev/video?media=b804bd1d-7b81-46a0-961b-384cb7e3c53f" },
  { k: "bi",  link: "link3",  name: "Bob Iger",         cls: "Teaches Business Strategy and Leadership", topic: "Business",   color: "#b8862b",
    place: "Table 4",          team: "Fantastic Four",             scene: "table", prop: "chart",
    clip: "https://www.masterclass.dev/video?media=14fd8790-aca9-41c3-a482-f9ff191cfe64" },
  { k: "sw",  link: "link4",  name: "Serena Williams",  cls: "Teaches Tennis",                         topic: "Sport",        color: "#3ebb70",
    place: "Table 10",         team: "PERFECT 10",                 scene: "table", prop: "ball",
    clip: "https://www.masterclass.dev/video?media=31741602-19ec-481c-945c-1e10e5689eec" },
  { k: "cv",  link: "link5",  name: "Chris Voss",       cls: "Teaches the Art of Negotiation",         topic: "Negotiation",  color: "#3787ff",
    place: "Table 13",         team: "Cache us if you Can",        scene: "table", prop: "bubbles",
    clip: "https://www.masterclass.dev/video?media=d5a9f0f2-9389-46a1-b539-263d8b06b744" },
  { k: "tt",  link: "link6",  name: "Terence Tao",      cls: "Teaches Mathematical Thinking",          topic: "Math",         color: "#ff9000",
    place: "Table 14",         team: "Nth Degree",                 scene: "table", prop: "pi",
    clip: "https://www.masterclass.dev/video?media=677f8bbf-8c3d-4caa-a8e2-76258fb796a7" },
  { k: "jg",  link: "link7",  name: "Jane Goodall",     cls: "Teaches Conservation",                   topic: "Science",      color: "#2f9e6e",
    place: "Table 15",         team: "Synergy Animals",            scene: "table", prop: "leaf",
    clip: "https://www.masterclass.dev/video?media=d568511f-0109-4cbb-919f-82c3fb3a37a4" },
  { k: "mu",  link: "link8",  name: "Make-up Artistry", cls: "A beauty lesson from the library",       topic: "Beauty",       color: "#d0559a",
    place: "Women's bathroom", team: "By the mirror",              scene: "mirror", prop: "lipstick",
    clip: "https://www.masterclass.dev/video?media=bfad804a-e933-4992-91a3-c23e30148603" },
  { k: "gh",  link: "link9",  name: "Gut Health",       cls: "A wellness lesson from the library",     topic: "Wellness",     color: "#1fa69a",
    place: "Men's bathroom",   team: "By the mirror",              scene: "mirror", prop: "drop",
    clip: "https://www.masterclass.dev/video?media=97aaa490-b0ce-4252-8d7b-430c9531d6e8" },
  { k: "gl",  link: "link10", name: "GLP-1 & Nutrition", cls: "A nutrition lesson from the library",   topic: "Nutrition",    color: "#ef4562",
    place: "Food line",        team: "Grab a tray",                scene: "food", prop: "apple",
    clip: "https://www.masterclass.dev/video?media=893ff907-8313-4f9b-aac0-86c7838ca922" },
];

// Small drawn props, centered on (0,0), roughly 28px across.
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
  apple:    '<circle cx="-4" cy="3" r="9" fill="C"/><circle cx="4" cy="3" r="9" fill="C"/><path d="M0 -6 C1 -10 3 -12 5 -13" stroke="#6b4a2a" stroke-width="2" fill="none"/><path d="M1 -8 C5 -12 9 -11 10 -9 C6 -6 3 -7 1 -8 Z" fill="#3ebb70"/>',
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
