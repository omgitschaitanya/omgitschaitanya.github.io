// Hero video: a muted, looping YouTube clip behind the unlock screen, driven by the YouTube IFrame API.
// The poster (photo or drawn prop) stays on top until the clip is actually playing.
(function () {
  // YouTube clip per station (keys from stations.js); stations not listed use DEFAULT_VIDEO.
  const DEFAULT_VIDEO = "H-v0Mm74V5o";
  const VIDEOS = {
    sr: "1yZ3KS0yqoo",   // link2 · Shonda Rhimes
    bi: "3hWFsMIai1k",   // link3 · Bob Iger
    sw: "OCTaxjfIBIs",   // link4 · Serena Williams
    cv: "8iiG4KEYodY",   // link5 · Chris Voss
    tt: "5OaHQ-rdfDI",   // link6 · Terence Tao
    jg: "XpIwFxhUOhw",   // link7 · Jane Goodall
    mu: "4VKyvUc6j2Y",   // link8 · Make-up Artistry
    gh: "3Myr95PSa9o",   // link9 · Gut Health
    gl: "lNfo3APF_BU",   // link10 · GLP-1 & Nutrition
  };
  const VIDEO_ID = VIDEOS[document.body.dataset.station] || DEFAULT_VIDEO;
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const ICON = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4v16l13-8z" fill="#fff"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" fill="#fff"/><rect x="14" y="5" width="4" height="14" rx="1" fill="#fff"/></svg>',
    soundOn: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4z" fill="#fff"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/></svg>',
  };

  // Video layer under the poster; the wrapper ignores taps so the buttons above always get them.
  const media = hero.querySelector(".media");
  const layer = document.createElement("div");
  layer.className = "yt";
  layer.innerHTML = '<div id="yt-player"></div>';
  media.prepend(layer);

  // The reference's centre "play" link opened a staff-only clip; it becomes the play button for this video.
  const big = document.createElement("button");
  big.type = "button";
  big.className = "play";
  big.setAttribute("aria-label", "Play");
  hero.querySelector(".play").replaceWith(big);

  const pauseBtn = document.createElement("button");
  pauseBtn.type = "button";
  pauseBtn.className = "glass pause";
  pauseBtn.innerHTML = ICON.pause;
  pauseBtn.setAttribute("aria-label", "Pause");
  hero.querySelector(".glass.replay").before(pauseBtn);

  const replayBtn = hero.querySelector(".glass.replay");
  const muteBtn = hero.querySelector(".glass.mute");
  const muteOffHTML = muteBtn.innerHTML;

  let player = null;
  let playing = false;

  function setPlaying(p) {
    playing = p;
    hero.classList.toggle("playing", p);
    hero.classList.toggle("paused", !p);
    pauseBtn.innerHTML = p ? ICON.pause : ICON.play;
    pauseBtn.setAttribute("aria-label", p ? "Pause" : "Play");
  }
  function setMuted(m) {
    muteBtn.innerHTML = m ? muteOffHTML : ICON.soundOn;
    muteBtn.setAttribute("aria-label", m ? "Unmute" : "Mute");
  }
  setPlaying(false);

  const togglePlay = () => {
    if (!player) return;
    if (playing) { player.pauseVideo(); setPlaying(false); } else { player.playVideo(); setPlaying(true); }
  };
  pauseBtn.addEventListener("click", togglePlay);
  big.addEventListener("click", togglePlay);
  replayBtn.addEventListener("click", () => { if (!player) return; player.seekTo(0, true); player.playVideo(); setPlaying(true); });
  muteBtn.addEventListener("click", () => {
    if (!player) return;
    if (player.isMuted()) { player.unMute(); setMuted(false); } else { player.mute(); setMuted(true); }
  });

  window.onYouTubeIframeAPIReady = () => {
    player = new YT.Player("yt-player", {
      videoId: VIDEO_ID,
      playerVars: { autoplay: 1, mute: 1, loop: 1, playlist: VIDEO_ID, controls: 0, playsinline: 1, rel: 0, modestbranding: 1, origin: location.origin },
      events: {
        onReady: e => { e.target.mute(); e.target.playVideo(); },
        // Video can't play here (private, removed, or embedding turned off): keep the poster and drop the video controls.
        onError: () => { hero.classList.add("novideo"); layer.remove(); },
        // 1 playing, 2 paused, 0 ended (loop restarts it). Buffering (3) keeps the current button.
        onStateChange: e => {
          if (e.data === YT.PlayerState.PLAYING) { setPlaying(true); hero.classList.add("started"); }
          if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) setPlaying(false);
        },
      },
    });
  };
  const s = document.createElement("script");
  s.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(s);
})();
