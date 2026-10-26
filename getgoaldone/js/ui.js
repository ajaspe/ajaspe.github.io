// Menus and overlays (HTML on top of the canvas).

const menuOverlay = document.getElementById("menu");
const menuPage = document.getElementById("menuPage");
const resultsOverlay = document.getElementById("results");
const pauseButton = document.getElementById("pauseButton");
let currentPage = "main";
let lastResult = null;

function hideOverlays() {
  menuOverlay.hidden = true;
  resultsOverlay.hidden = true;
  document.getElementById("confetti").innerHTML = "";
  pauseButton.hidden = false;
}

function showMenu(page) {
  currentPage = page || "main";
  resultsOverlay.hidden = true;
  document.getElementById("confetti").innerHTML = "";
  menuOverlay.hidden = false;
  pauseButton.hidden = true;
  renderMenuPage();
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function renderMenuPage() {
  const pages = { main: mainPageHtml, settings: settingsPageHtml, locker: lockerPageHtml, help: helpPageHtml,
                  online: onlinePageHtml, ranking: rankingPageHtml, about: aboutPageHtml };
  menuPage.innerHTML = pages[currentPage]();
  menuOverlay.classList.toggle("compact", currentPage !== "main");   // the logo only on the main page
  if (currentPage === "locker") {
    drawLockerPreviews();
  }
}

// --- Main page ---

function mainPageHtml() {
  const progress = save.progress;
  const opponent = CUP_OPPONENTS[progress.cupStage];
  const cupHint = progress.cupStage === 0 && progress.cupsWon > 0
    ? t("menu.cupChampion", { n: progress.cupsWon })
    : t("menu.cupStage", { n: progress.cupStage + 1, total: CUP_OPPONENTS.length }) + " · " + t("cup." + opponent.id);

  const inMatch = isMatchInProgress();
  const inOnlineMatch = inMatch && game.mode === "online";
  const quickHint = t("menu.quickMatchHint") + " · " + t("level." + save.settings.level);
  // Between matches: your name, then Quick match as the big "play" button; during a match that's Resume
  return `
    <button class="byline" data-action="page" data-page="about">${t("menu.by")} <b>AlMart</b> <span class="version">v${GAME_VERSION}</span></button>
    ${inMatch ? `<button class="big-button" data-action="resume">▶ ${t("menu.resume")}</button>` : `
      <input class="team-name player-name" data-slot="team1" maxlength="${NAME_MAX_LENGTH}" aria-label="${t("settings.team1")}"
             placeholder="${t("settings.namePlaceholder")}" value="${escapeHtml(save.settings.team1.name)}">
      <button class="big-button play-button" data-action="quick">
        <span class="mode-title">⚽ ${t("menu.quickMatch")}</span>
        <span class="mode-hint">${quickHint}</span>
      </button>`}
    ${inOnlineMatch ? `<div class="menu-row"><button class="secondary-button" data-action="leave">🚪 ${t("online.leave")}</button></div>` : ""}
    <div class="mode-buttons ${inMatch ? "two-by-two" : ""}">
      ${inMatch ? `
        <button class="mode-button" data-action="quick">
          <span class="mode-title">⚽ ${t("menu.quickMatch")}</span>
          <span class="mode-hint">${quickHint}</span>
        </button>` : ""}
      <button class="mode-button" data-action="cup">
        <span class="mode-title">🏆 ${t("menu.cup")}</span>
        <span class="mode-hint">${escapeHtml(cupHint)}</span>
      </button>
      <button class="mode-button" data-action="versus">
        <span class="mode-title">👫 ${t("menu.versus")}</span>
        <span class="mode-hint">${t("menu.versusHint")}</span>
      </button>
      <button class="mode-button" data-action="page" data-page="online">
        <span class="mode-title">🌐 ${t("menu.online")} <span class="beta">BETA</span></span>
        <span class="mode-hint">${t("menu.onlineHint")}</span>
      </button>
    </div>
    <div class="menu-row">
      <button class="secondary-button" data-action="page" data-page="locker">🎨 ${t("menu.locker")}</button>
      <button class="secondary-button" data-action="page" data-page="settings">⚙️ ${t("menu.settings")}</button>
      <button class="secondary-button" data-action="page" data-page="help">❓ ${t("menu.howToPlay")}</button>
      <button class="secondary-button" data-action="page" data-page="ranking">🏆 ${t("ranking.title")}</button>
    </div>
    <div class="menu-row">
      ${toggleHtml("sound", save.settings.sound ? "🔊" : "🔇", t("settings.sound"))}
      ${toggleHtml("music", save.settings.music ? "🎵" : "🎵🚫", t("settings.music"))}
    </div>
    <p class="stats">${t("menu.stats", { wins: progress.wins, goals: progress.goals, cups: progress.cupsWon })}</p>
  `;
}

function toggleHtml(setting, icon, label) {
  const on = save.settings[setting];
  return `<button class="toggle ${on ? "on" : ""}" data-action="toggle" data-setting="${setting}">${icon} ${label}</button>`;
}

// --- Settings page ---

function optionButtons(action, options, current) {
  return options.map(option =>
    `<button class="option ${option.value === current ? "chosen" : ""}" data-action="${action}" data-value="${option.value}">${option.label}</button>`
  ).join("");
}

function teamSettingsHtml(slot, label) {
  const team = save.settings[slot];
  const swatches = TEAM_COLORS.map(color =>
    `<button class="swatch ${color.id === team.colorId ? "chosen" : ""}" style="background:${color.value}"
             data-action="color" data-slot="${slot}" data-value="${color.id}" aria-label="${color.id}"></button>`
  ).join("");
  return `
    <div class="setting">
      <div class="setting-label">${label}</div>
      <div class="swatches">${swatches}</div>
      <input class="team-name" data-slot="${slot}" maxlength="${NAME_MAX_LENGTH}"
             placeholder="${escapeHtml(t("settings.namePlaceholder"))}" value="${escapeHtml(team.name)}">
    </div>`;
}

function settingsPageHtml() {
  const names = controllerNames();
  const pads = names.some(Boolean)
    ? names.map((name, i) => name ? t("settings.controllerOf", { n: i + 1, name: escapeHtml(name.slice(0, 32)) }) : "").filter(Boolean).join("<br>")
    : t("settings.noControllers");

  return `
    <h2>⚙️ ${t("menu.settings")}</h2>
    <div class="settings-grid">
      ${teamSettingsHtml("team1", t("settings.team1"))}
      ${teamSettingsHtml("team2", t("settings.team2"))}
      <div class="setting">
        <div class="setting-label">${t("settings.language")}</div>
        ${optionButtons("language", LANGUAGES.map(l => ({ value: l.id, label: l.label })), language)}
      </div>
      <div class="setting">
        <div class="setting-label">${t("settings.difficulty")}</div>
        ${optionButtons("level", Object.keys(CPU_LEVELS).map(id => ({ value: id, label: t("level." + id) })), save.settings.level)}
      </div>
      <div class="setting">
        <div class="setting-label">${t("settings.length")}</div>
        ${optionButtons("minutes", MATCH_MINUTES.map(n => ({ value: String(n), label: t("settings.minutes", { n: n }) })), String(save.settings.minutes))}
      </div>
      <div class="setting">
        <div class="setting-label">${t("settings.sound")} · ${t("settings.music")}</div>
        ${toggleHtml("sound", save.settings.sound ? "🔊" : "🔇", t("settings.sound"))}
        ${toggleHtml("music", save.settings.music ? "🎵" : "🎵🚫", t("settings.music"))}
      </div>
      <div class="setting">
        <div class="setting-label">${t("settings.voice")}</div>
        ${optionButtons("voice", COMMENTATOR_VOICES.map(id => ({ value: id, label: t("voice." + id) })), save.settings.voice)}
      </div>
      <div class="setting wide">
        <div class="setting-label">🎮 ${t("settings.controllers")}</div>
        <div class="pads">${pads}</div>
        <button class="secondary-button" data-action="resetPads">🔄 ${t("settings.resetControllers")}</button>
      </div>
    </div>
    <button class="secondary-button" data-action="page" data-page="main">← ${t("menu.back")}</button>
  `;
}

// --- Locker page ---

function lockerTile(kind, id, index) {
  const unlocked = isUnlocked(kind, id);
  const chosen = kind === "chipStyle" ? save.progress.chipStyle === id : save.progress.ballSkin === id;
  const label = t((kind === "chipStyle" ? "style." : "ball.") + id);
  const condition = lockCondition(kind, id);
  return `
    <button class="tile ${chosen ? "chosen" : ""} ${unlocked ? "" : "locked"}"
            data-action="${unlocked ? "equip" : ""}" data-kind="${kind}" data-value="${id}">
      <canvas class="preview" width="80" height="80" data-kind="${kind}" data-value="${id}"></canvas>
      <span>${unlocked ? label : "🔒 " + escapeHtml(condition)}</span>
    </button>`;
}

function lockCondition(kind, id) {
  if (CUP_FINAL_BONUS.kind === kind && CUP_FINAL_BONUS.id === id) {
    return t("locker.lockedFinal");
  }
  if (WINS_REWARD.kind === kind && WINS_REWARD.id === id) {
    return t("locker.lockedWins", { n: WINS_REWARD.wins });
  }
  const stage = CUP_OPPONENTS.findIndex(o => o.reward.kind === kind && o.reward.id === id);
  return stage === CUP_OPPONENTS.length - 1 ? t("locker.lockedFinal") : t("locker.lockedCup", { n: stage + 1 });
}

function lockerPageHtml() {
  return `
    <h2>🎨 ${t("menu.locker")}</h2>
    <div class="setting-label">${t("locker.chips")}</div>
    <div class="tiles">${CHIP_STYLES.map(id => lockerTile("chipStyle", id)).join("")}</div>
    <div class="setting-label">${t("locker.balls")}</div>
    <div class="tiles">${BALL_SKINS.map(id => lockerTile("ballSkin", id)).join("")}</div>
    <button class="secondary-button" data-action="page" data-page="main">← ${t("menu.back")}</button>
  `;
}

// Draw the previews with the game's own drawing functions
function drawLockerPreviews() {
  const gameCtx = ctx;
  for (const preview of menuPage.querySelectorAll("canvas.preview")) {
    ctx = preview.getContext("2d");
    ctx.clearRect(0, 0, 80, 80);
    if (preview.dataset.kind === "chipStyle") {
      const chip = createChip("", colorById(save.settings.team1.colorId).value, preview.dataset.value);
      chip.x = 40; chip.y = 38; chip.radius = 28;
      drawChip(chip, null);
    } else {
      const ball = createBall("white", preview.dataset.value);
      ball.x = 40; ball.y = 40; ball.radius = 26;
      drawBall(ball);
    }
  }
  ctx = gameCtx;
}

// --- Online page ---

let typedRoomCode = "";

function onlinePageHtml() {
  let status = "";
  switch (Net.status) {
    case "loading":
      status = `<p class="online-status">⏳ ${t("online.loading")}</p>`;
      break;
    case "hosting":
      status = `
        <p class="online-status">${t("online.waiting")}</p>
        <div class="room-code">${Net.roomCode}</div>
        <div class="menu-row">
          <input class="invite-link" readonly value="${escapeHtml(Platform.inviteLink(Net.roomCode))}">
          <button class="secondary-button" data-action="copyLink">📋 ${t("online.copy")}</button>
        </div>
        <p class="online-hint">${t("online.shareHint")}</p>
        <button class="secondary-button" data-action="leave">✖ ${t("online.cancel")}</button>`;
      break;
    case "joining":
      status = `<p class="online-status">⏳ ${t("online.joining", { code: escapeHtml(Net.roomCode) })}</p>
                <button class="secondary-button" data-action="leave">✖ ${t("online.cancel")}</button>`;
      break;
    case "connected":
      status = `<p class="online-status">✅ ${t("online.connected")}</p>`;
      break;
    case "error":
      status = `<p class="online-status error">⚠️ ${t(Net.error)}</p>`;
      break;
  }

  const busy = Net.status === "hosting" || Net.status === "joining" || Net.status === "connected" || Net.status === "loading";
  return `
    <h2>🌐 ${t("online.title")} <span class="beta">BETA</span></h2>
    ${busy ? "" : `
      <input class="team-name player-name" data-slot="team1" maxlength="${NAME_MAX_LENGTH}" aria-label="${t("settings.team1")}"
             placeholder="${t("settings.namePlaceholder")}" value="${escapeHtml(save.settings.team1.name)}">`}
    ${profileHtml()}
    <p>${t("online.intro")}</p>
    <p class="online-hint">${t("online.betaHint")}</p>
    ${busy ? "" : `
      <div class="online-choices">
        <div class="setting">
          <button class="big-button" data-action="hostRoom">➕ ${t("online.create")}</button>
        </div>
        <div class="setting">
          <input class="room-input" maxlength="5" placeholder="${t("online.codePlaceholder")}" value="${escapeHtml(typedRoomCode)}">
          <button class="big-button" data-action="joinRoom">🔗 ${t("online.join")}</button>
        </div>
      </div>`}
    ${status}
    <button class="secondary-button" data-action="page" data-page="main">← ${t("menu.back")}</button>
  `;
}

// --- Ranking: profile box, leaderboard page, rating after online matches ---

let editingNickname = false;
let nicknameError = null;
let leaderboardData = null;      // null = loading, false = failed

function refreshIfShowing(page) {
  if (!menuOverlay.hidden && currentPage === page) renderMenuPage();
}

function profileHtml() {
  if (!Ranking.profileLoaded) {
    Ranking.loadProfile().then(() => refreshIfShowing(currentPage));
    return `<div class="profile">⏳ ${t("ranking.loading")}</div>`;
  }
  if (!Ranking.available) {
    return `<div class="profile muted">${t("ranking.unavailable")}</div>`;
  }
  const profile = Ranking.profile;
  if (!profile || editingNickname) {
    return `
      <div class="profile">
        <div>${profile ? "" : t("ranking.setNickname")}</div>
        <div class="menu-row">
          <input class="nickname-input" maxlength="16" placeholder="${t("ranking.nicknamePlaceholder")}"
                 value="${escapeHtml(profile ? profile.nickname : save.settings.team1.name.slice(0, 16))}">
          <button class="secondary-button" data-action="saveNickname">💾 ${t("ranking.save")}</button>
        </div>
        ${nicknameError ? `<div class="online-status error">⚠️ ${t(nicknameError)}</div>` : ""}
      </div>`;
  }
  return `
    <div class="profile">
      👤 <b>${escapeHtml(profile.nickname)}</b> · ⭐ ${profile.rating} · ${t("ranking.games", { n: profile.games })}
      <button class="link-button" data-action="editNickname">✏️</button>
      <button class="link-button" data-action="page" data-page="ranking">🏆 ${t("ranking.title")}</button>
    </div>`;
}

function rankingPageHtml() {
  if (leaderboardData === null) {
    Ranking.leaderboard()
      .then(data => { leaderboardData = data; Ranking.available = true; })
      .catch(() => { leaderboardData = false; })
      .then(() => refreshIfShowing("ranking"));
  }
  let body = `<p>⏳ ${t("ranking.loading")}</p>`;
  if (leaderboardData === false) {
    body = `<p class="muted">${t("ranking.unavailable")}</p>`;
  } else if (leaderboardData) {
    const me = leaderboardData.me;
    const rows = leaderboardData.top.map((player, i) => `
      <tr class="${me && player.nickname === me.nickname ? "me" : ""}">
        <td>${i + 1}</td><td class="name">${escapeHtml(player.nickname)}</td>
        <td>⭐ ${player.rating}</td><td>${player.games}</td><td>${player.wins}</td>
      </tr>`).join("");
    body = leaderboardData.top.length
      ? `<div class="table-wrap"><table class="leaderboard">
           <tr><th>#</th><th class="name">${t("ranking.player")}</th><th>${t("ranking.rating")}</th>
               <th>${t("ranking.gamesColumn")}</th><th>${t("ranking.wins")}</th></tr>${rows}
         </table></div>`
      : `<p>${t("ranking.empty")}</p>`;
    if (me && me.games > 0) {
      body += `<p class="online-status">${t("ranking.yourRank", { rank: me.rank, rating: me.rating })}</p>`;
    }
  }
  return `
    <h2>🏆 ${t("ranking.title")}</h2>
    <p class="muted">${t("ranking.rule")}</p>
    ${body}
    <div class="menu-row">
      <button class="secondary-button" data-action="page" data-page="online">🌐 ${t("menu.online")}</button>
      <button class="secondary-button" data-action="page" data-page="main">← ${t("menu.back")}</button>
    </div>`;
}

// The rating line on the results screen of an online match
function showRatingOutcome() {
  const line = document.getElementById("ratingLine");
  if (!line) return;
  const match = Ranking.match;
  let text = "";
  if (!match) {
    text = Ranking.available ? t("ranking.notRated") : "";
  } else if (!match.outcome) {
    text = t("ranking.saving");
  } else {
    const outcome = match.outcome;
    const host = match.role === "host";
    if (outcome.status === "playing") {
      text = t("ranking.waiting");
    } else if (outcome.status === "done" && outcome.rated) {
      const delta = host ? outcome.host_delta : outcome.guest_delta;
      const rating = host ? outcome.host_rating : outcome.guest_rating;
      text = t(delta >= 0 ? "ranking.up" : "ranking.down", { delta: (delta >= 0 ? "+" : "") + delta, rating: rating });
    } else if (outcome.status === "done") {
      text = t("ranking.limit");
    } else if (outcome.status === "void") {
      text = t("ranking.void");
    } else {
      text = t("ranking.error");
    }
  }
  line.textContent = text;
}

function onNetStatusChanged() {
  if (!menuOverlay.hidden && currentPage === "online") {
    renderMenuPage();
  }
}

// --- Help page ---

function helpPageHtml() {
  const lines = ["help.goal", "help.mouse", "help.keys1", "help.keys2", "help.pad", "help.fullscreen", "help.ai",
                 "help.kickoff", "help.freeze", "help.bigGoal", "help.mega", "help.cannon", "help.wall", "help.crazy", "help.ultimate"];
  return `
    <h2>❓ ${t("help.title")}</h2>
    <ul class="help">${lines.map(key => `<li>${t(key)}</li>`).join("")}</ul>
    <button class="secondary-button" data-action="page" data-page="main">← ${t("menu.back")}</button>
  `;
}

// --- About page: who made the game ---

function aboutPageHtml() {
  return `
    <h2>${t("about.title")}</h2>
    <div class="about">
      <img class="about-photo" src="assets/almart.jpg" alt="${t("about.photoAlt")}">
      <div class="about-text">
        <p>${t("about.p1")}</p>
        <p>${t("about.p2")}</p>
        <p>${t("about.p3")}</p>
      </div>
    </div>
    <button class="secondary-button" data-action="page" data-page="main">← ${t("menu.back")}</button>
  `;
}

// --- Menu actions ---

let startingMatch = false;

// A natural break between matches: maybe a midgame ad first (see Platform.showBreakAd)
function startFromMenu(mode) {
  if (startingMatch) return;
  startingMatch = true;
  if (Net.active) Net.leave();   // starting a local match leaves any online room
  Platform.showBreakAd().then(() => {
    startingMatch = false;
    startMatch(mode);
  });
}

menuPage.addEventListener("click", function (event) {
  const button = event.target.closest("[data-action]");
  if (!button || !button.dataset.action) {
    return;
  }
  unlockAudio();
  const { action, value } = button.dataset;

  switch (action) {
    case "resume": resumeGame(); return;
    case "quick":
    case "cup":
    case "versus":
      startFromMenu(action);
      return;
    case "hostRoom": Net.host(); return;
    case "joinRoom": {
      const code = (menuPage.querySelector(".room-input").value || "").trim().toUpperCase();
      if (code.length === 5) Net.join(code);
      return;
    }
    case "copyLink": copyInviteLink(button); return;
    case "editNickname": editingNickname = true; nicknameError = null; break;
    case "saveNickname": saveNickname(); return;
    case "leave":
      if (game.mode === "online" && isMatchInProgress()) {
        Ranking.report(Net.role);   // leaving mid-match counts as a forfeit
      }
      Net.leave();
      if (game.mode === "online") endOnlineMatchLocally();
      currentPage = "online";
      break;
    case "page":
      currentPage = button.dataset.page;
      if (currentPage === "ranking") leaderboardData = null;   // always fresh
      break;
    case "toggle": save.settings[button.dataset.setting] = !save.settings[button.dataset.setting]; break;
    case "language": save.settings.language = value; setLanguage(value); applyStaticTexts(); preloadVoiceClips(); break;
    case "voice": save.settings.voice = value; commentate("goal", { team: playerName() || t("team." + save.settings.team1.colorId) }); break;
    case "level": save.settings.level = value; break;
    case "minutes": save.settings.minutes = Number(value); break;
    case "color":
      save.settings[button.dataset.slot].colorId = value;
      if (game.state === "idle") showTitleField();   // the field behind the menu shows your colour
      break;
    case "resetPads": resetPads(); break;
    case "equip": equip(button.dataset.kind, value); break;
  }
  persist();
  renderMenuPage();
});

function copyInviteLink(button) {
  const link = menuPage.querySelector(".invite-link");
  const done = () => { button.textContent = "✅ " + t("online.copied"); };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(link.value).then(done, () => { link.select(); document.execCommand("copy"); done(); });
  } else {
    link.select();
    document.execCommand("copy");
    done();
  }
}

async function saveNickname() {
  const input = menuPage.querySelector(".nickname-input");
  const button = menuPage.querySelector('[data-action="saveNickname"]');
  button.disabled = true;
  nicknameError = await Ranking.setNickname(input.value);
  if (!nicknameError) {
    editingNickname = false;
  }
  renderMenuPage();
}

menuPage.addEventListener("keydown", function (event) {
  if (event.target.classList.contains("room-input") && event.key === "Enter") {
    menuPage.querySelector('[data-action="joinRoom"]').click();
  }
  if (event.target.classList.contains("nickname-input") && event.key === "Enter") {
    saveNickname();
  }
});

menuPage.addEventListener("input", function (event) {
  if (event.target.classList.contains("room-input")) {
    event.target.value = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    typedRoomCode = event.target.value;
    return;
  }
  if (event.target.classList.contains("team-name")) {
    save.settings[event.target.dataset.slot].name = event.target.value.trim();
    persist();
    if (game.state === "idle" && event.target.dataset.slot === "team1") {
      game.teams[0].player = playerName();   // the field behind the menu shows it straight away
    }
  }
});

// Equipping a cosmetic also updates the match in progress
function equip(kind, id) {
  if (kind === "chipStyle") {
    save.progress.chipStyle = id;
    if (game.teams[0]) game.teams[0].chips.forEach(chip => chip.style = id);
  } else {
    save.progress.ballSkin = id;
    if (game.ball) game.ball.skin = id;
  }
}

pauseButton.addEventListener("click", function () {
  unlockAudio();
  if (isMatchInProgress()) {
    pauseGame();
  } else {
    showMenu();
  }
});

// --- Fullscreen ---

const fullscreenButton = document.getElementById("fullscreenButton");

function fullscreenElement() {
  return document.fullscreenElement || document.webkitFullscreenElement || null;
}

function toggleFullscreen() {
  unlockAudio();
  try {
    if (fullscreenElement()) {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    } else {
      const root = document.documentElement;
      const request = root.requestFullscreen || root.webkitRequestFullscreen;
      const result = request.call(root);
      if (result && result.catch) result.catch(() => {});
    }
  } catch (error) {
    // fullscreen refused (e.g. inside an iframe without permission)
  }
}

// Hidden where fullscreen isn't available (iPhone Safari) and on CrazyGames, which has its own button
function updateFullscreenButton() {
  const supported = document.fullscreenEnabled || document.webkitFullscreenEnabled;
  fullscreenButton.hidden = !supported || Platform.sdk !== null;
  fullscreenButton.classList.toggle("active", Boolean(fullscreenElement()));
  fullscreenButton.setAttribute("aria-label", fullscreenElement() ? "Exit fullscreen" : "Fullscreen");
}

fullscreenButton.addEventListener("click", toggleFullscreen);
document.addEventListener("fullscreenchange", updateFullscreenButton);
document.addEventListener("webkitfullscreenchange", updateFullscreenButton);

// Keyboard and controller shortcuts for menus: P / Start pause, A / Enter confirm, F fullscreen
function handleMenuInput() {
  if (keysPressed.has("KeyF") && !fullscreenButton.hidden) {
    toggleFullscreen();
  }
  const pausePressed = keysPressed.has("KeyP") || anyPadJustPressed(PAD_START);
  const confirmPressed = keysPressed.has("Enter") || anyPadJustPressed(PAD_A);

  if (!resultsOverlay.hidden) {
    if (confirmPressed && performance.now() - game.overAt > 1500) {
      document.getElementById("resultPrimary").click();
    }
    return;
  }
  if (pausePressed && isMatchInProgress()) {
    const menuOpen = game.paused || !menuOverlay.hidden;   // online matches never pause
    if (menuOpen) resumeGame(); else pauseGame();
    return;
  }
  // Enter / A on the main menu: resume, or start a quick match (unless a focused button gets the Enter)
  const focusedButton = document.activeElement && document.activeElement.tagName === "BUTTON";
  if (!menuOverlay.hidden && currentPage === "main" && confirmPressed && !focusedButton) {
    if (game.paused) {
      resumeGame();
    } else if (!isMatchInProgress()) {
      startFromMenu("quick");
    }
  }
}

// --- Results ---

function showResults(result) {
  lastResult = result;
  const [home, away] = game.teams;
  // With a single local team (vs CPU or online) the results speak to "you"
  const mine = localTeams().length === 1 ? game.teams[localTeams()[0]] : null;
  const theirs = mine === home ? away : home;

  let title = t("results.draw");
  if (result.cupWon) {
    title = t("results.cupWon");
  } else if (result.winner && mine) {
    title = result.winner === mine ? t("results.youWin") : t("results.youLose", { team: playerOrTeamName(theirs) });
  } else if (result.winner) {
    title = t("results.win", { team: playerOrTeamName(result.winner) });
  }
  document.getElementById("resultTitle").textContent = title;

  [home, away].forEach((team, i) => {
    const box = document.getElementById("scoreBox" + (i + 1));
    box.style.background = team.color;
    box.querySelector(".score-goals").textContent = team.goals;
    box.querySelector(".score-name").textContent = teamName(team);
    box.classList.toggle("winner", team === result.winner);
    box.classList.toggle("loser", result.winner !== null && team !== result.winner);
  });

  // Rewards and what's next
  const extra = [];
  for (const reward of result.unlocked) {
    const name = t((reward.kind === "chipStyle" ? "style." : "ball.") + reward.id);
    extra.push("✨ " + t(reward.kind === "chipStyle" ? "results.unlockedChip" : "results.unlockedBall", { name: name }));
  }
  const homeWon = result.winner === home;
  if (result.mode === "online" && !Net.active) {
    extra.push("⚠️ " + t("online.left"));
  }
  if (result.mode === "cup" && homeWon && !result.cupWon) {
    const next = CUP_OPPONENTS[save.progress.cupStage];
    extra.push(t("results.nextOpponent", { team: t("cup." + next.id) }));
  }
  document.getElementById("resultExtra").innerHTML = extra.map(line => `<div>${escapeHtml(line)}</div>`).join("") +
    (result.mode === "online" ? `<div id="ratingLine"></div>` : "");
  showRatingOutcome();

  let primary = t("results.playAgain");
  if (result.mode === "cup" && !result.cupWon) {
    primary = homeWon ? t("results.next") : t("results.retry");
  }
  const primaryButton = document.getElementById("resultPrimary");
  primaryButton.textContent = "▶ " + primary;
  primaryButton.disabled = result.mode === "online" && !Net.active;
  document.getElementById("resultMenu").textContent = t("results.menu");

  const partyColor = result.winner ? result.winner.color : "#ffd54f";
  resultsOverlay.style.background = "radial-gradient(closest-side, " + partyColor + "77, rgba(0, 0, 0, 0.55))";
  if (!mine || result.winner === mine) {
    throwConfetti(partyColor);
  }
  if (result.cupWon) {
    playFanfare();
    commentate("cupWon");
  }
  menuOverlay.hidden = true;
  pauseButton.hidden = true;
  resultsOverlay.hidden = false;
}

document.getElementById("resultPrimary").addEventListener("click", function () {
  if (lastResult.mode === "online") {
    if (!Net.active) return;
    if (Net.role === "guest") {
      // The host starts the rematch; we wait for its "setup" message
      Net.requestRematch();
      this.textContent = "⏳ " + t("online.waitingHost");
      this.disabled = true;
    } else {
      startMatch("online");
    }
    return;
  }
  resultsOverlay.hidden = true;
  Platform.showBreakAd().then(() => startMatch(lastResult.mode));
});

document.getElementById("resultMenu").addEventListener("click", function () {
  if (lastResult && lastResult.mode === "online") {
    Net.leave();
    game.mode = "quick";
  }
  showMenu("main");
});

function throwConfetti(mainColor) {
  const confetti = document.getElementById("confetti");
  confetti.innerHTML = "";
  const colors = [mainColor, mainColor, "#ffd54f", "#ffffff"];
  for (let i = 0; i < 100; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti";
    piece.style.left = randomBetween(0, 100) + "%";
    piece.style.background = colors[i % colors.length];
    piece.style.animationDuration = randomBetween(2.5, 5) + "s";
    piece.style.animationDelay = randomBetween(-5, 0) + "s";
    piece.style.opacity = randomBetween(0.6, 1);
    confetti.appendChild(piece);
  }
}

// Texts that live in the HTML rather than in the canvas
function applyStaticTexts() {
  document.documentElement.lang = language;
  document.getElementById("rotateHint").textContent = t("rotate");
}
