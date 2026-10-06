// Live link page: records this scan in cookies (/assets/cookies.js), then renders the unlock screen.
// Each linkN/index.html sets <body data-station="key">. Progress lives in cookies, per phone and browser.
(function () {
  const app = document.getElementById("app");
  const station = document.body.dataset.station;
  const valid = k => STATIONS.some(s => s.k === k);

  if (!valid(station)) {
    app.innerHTML = `<div class="body" style="margin-top:40px"><div class="earned"><h3>This code isn't part of the hunt</h3><p>Try scanning another code.</p></div></div>`;
    return;
  }

  // cookies.js stores link numbers in scan order; /linkN/ is STATIONS[N - 1].
  const state = window.HUNT_STATE;
  const found = state.scanned.map(n => STATIONS[n - 1]).filter(Boolean).map(s => s.k);
  if (!found.includes(station)) found.push(station);
  const revisit = state.revisit;

  function resetHTML(confirming) {
    return confirming
      ? `<span>Clear your progress on this phone?</span><button type="button" data-act="yes">Clear it</button><button type="button" data-act="no">Keep it</button>`
      : `<button type="button" data-act="ask">Start over on this phone</button>`;
  }

  app.innerHTML = `
    <div class="mchead"><img src="${HUNT_ASSETS.icon.mark}" alt="MasterClass"></div>
    ${HUNT.unlockHTML(station, found, { revisit })}
    <div class="body below">
      ${HUNT.ladderHTML(found)}
      ${HUNT.journeyHTML()}
      <div class="reset">${resetHTML(false)}</div>
    </div>
    ${HUNT.stickybarHTML(found.length)}`;

  // Only the reset row re-renders, so the hero video keeps playing.
  const reset = app.querySelector(".reset");
  reset.addEventListener("click", e => {
    const act = e.target.closest("[data-act]")?.dataset.act;
    if (act === "ask") reset.innerHTML = resetHTML(true);
    if (act === "no") reset.innerHTML = resetHTML(false);
    if (act === "yes") { clearHuntCookies(); location.reload(); }   // the reload records this code again as scan 1
  });
})();
