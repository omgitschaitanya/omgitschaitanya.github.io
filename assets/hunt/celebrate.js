// Unlock celebration, adapted from the MC Connexions prototype (celebrate.js):
// a confetti burst from the reward line, then the discount rolls up on an odometer.
// Call HUNT_CELEBRATE(rootEl, { big }) after the unlock screen renders. It does nothing when
// the viewer prefers reduced motion, and every effect ends on the page's resting design.
const HUNT_CELEBRATE = (() => {
  const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  const center = el => { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; };

  // Canvas confetti with gravity, drag and a 3D tumble. Removes itself when done.
  function confetti({ origin, delay = 0, count = 120, angle, speed, curve = 1, lift = 3, shape, life = 3100 }) {
    const canvas = document.createElement("canvas");
    canvas.className = "confetti-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.append(canvas);
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = () => { canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    size();
    addEventListener("resize", size);

    const colors = ["#eb3864", "#e32652", "#ff7d9c", "#25b565", "#ffffff"];
    const weights = [0.32, 0.24, 0.14, 0.18, 0.12];
    const pick = () => { let r = Math.random(); for (let i = 0; i < colors.length; i++) if ((r -= weights[i]) <= 0) return colors[i]; return colors[0]; };
    const between = ([lo, hi]) => lo + Math.random() * (hi - lo);

    const pieces = Array.from({ length: count }, (_, i) => {
      const a = between(angle) * Math.PI / 180;
      // curve > 1 biases toward slow pieces so a radial burst fills in instead of ringing.
      const v = speed[0] + (speed[1] - speed[0]) * Math.pow(Math.random(), curve);
      return {
        x: origin.x, y: origin.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - lift, ...shape(),
        rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.35,
        flip: Math.random() * Math.PI, vf: 0.12 + Math.random() * 0.2,
        color: pick(), delay: i < count * 0.6 ? 0 : 90, // a second, smaller volley
      };
    });

    const start = performance.now() + delay;
    let last = start;
    const fadeAt = life - 500;
    const tick = now => {
      if (now < start) return requestAnimationFrame(tick);
      const t = now - start, dt = Math.min((now - last) / 16.67, 2.5);
      last = now;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      let alive = 0;
      for (const p of pieces) {
        if (t < p.delay) { alive++; continue; }
        p.vx *= Math.pow(0.975, dt);
        p.vy = p.vy * Math.pow(0.975, dt) + 0.32 * dt;
        p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.vr * dt; p.flip += p.vf * dt;
        if (p.y > innerHeight + 20) continue;
        alive++;
        ctx.save();
        ctx.globalAlpha = t > fadeAt ? Math.max(0, 1 - (t - fadeAt) / 500) : 1;
        ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.scale(1, Math.cos(p.flip));
        ctx.fillStyle = p.color;
        if (p.round) { ctx.beginPath(); ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2); ctx.fill(); }
        else ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (alive && t < life) requestAnimationFrame(tick);
      else { removeEventListener("resize", size); canvas.remove(); }
    };
    requestAnimationFrame(tick);
    // Backstop: animation frames pause in background tabs, so never leave a canvas behind.
    setTimeout(() => { removeEventListener("resize", size); canvas.remove(); }, delay + life + 600);
  }

  // Rebuild "33% off" as digit reels that roll into place, starting `offset` ms later.
  // Text with no leading digits (e.g. "a prize entry") is left as it is.
  function odometer(amount, offset = 0) {
    const label = amount.textContent;
    const m = label.match(/^(\d+)(.*)$/s);
    if (!m) return;
    const [, num, rest] = m;
    const reel = (target, laps, delay, dur) => {
      const digits = [];
      for (let l = 0; l < laps; l++) for (let n = 0; n < 10; n++) digits.push(n);
      for (let n = 0; n <= target; n++) digits.push(n);
      const r = document.createElement("span");
      r.className = "odo-reel";
      r.innerHTML = `<span class="odo-col" style="--to:${-(digits.length - 1) * 1.16}em; --delay:${delay + offset}ms; --dur:${dur}ms">${digits.map(n => `<span>${n}</span>`).join("")}</span>`;
      return r;
    };
    const tail = document.createElement("span");
    tail.className = "odo-tail";
    tail.textContent = rest;
    const visual = document.createElement("span");
    visual.setAttribute("aria-hidden", "true");
    // Left digits spin longer and land last, like a real odometer.
    [...num].forEach((d, i) => visual.append(reel(+d, num.length - i + 1, 200, 1100 + (num.length - 1 - i) * 150)));
    visual.append(tail);
    // Size each reel to the digit it lands on so the number keeps its natural spacing.
    const probe = document.createElement("span");
    probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre";
    amount.append(probe);
    visual.querySelectorAll(".odo-reel").forEach((r, i) => { probe.textContent = num[i]; r.style.width = `${probe.getBoundingClientRect().width}px`; });
    probe.remove();
    const sr = document.createElement("span");
    sr.className = "visually-hidden";
    sr.textContent = label;
    amount.replaceChildren(sr, visual);
  }

  return function celebrate(root, { big = false } = {}) {
    if (reduced()) return;
    const amount = root.querySelector(".reward__amount");
    if (!amount) return;
    root.classList.add("celebrating");
    confetti({
      origin: center(amount), delay: 120, count: big ? 280 : 160,
      angle: [-180, 180], speed: big ? [2, 24] : [1.5, 18], curve: 1.7, lift: 5, life: big ? 4200 : 3100,
      shape: () => {
        const r = Math.random();
        if (r < 0.6) return { w: 8 + Math.random() * 7, h: 3 + Math.random() * 1.5 };
        if (r < 0.85) { const d = 5 + Math.random() * 3; return { w: d, h: d }; }
        return { w: 6, h: 6, round: true };
      },
    });
    if (big) {
      // A second burst from each side for the milestone moments (half off, all found).
      const { y } = center(amount);
      for (const [x, ang] of [[0, [-70, -20]], [innerWidth, [-160, -110]]])
        confetti({ origin: { x, y: y + 80 }, delay: 500, count: 90, angle: ang, speed: [10, 26], lift: 4, life: 3600,
          shape: () => ({ w: 8 + Math.random() * 6, h: 3 + Math.random() * 2 }) });
    }
    odometer(amount, 450);
  };
})();
