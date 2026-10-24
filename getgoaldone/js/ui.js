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
  const pages = { main: mainPageHtml, settings: settingsPageHtml, locker: lockerPageHtml, help: helpPageHtml, online: onlinePageHtml };
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

  const inOnlineMatch = isMatchInProgress() && game.mode === "online";
  return `
    ${isMatchInProgress() ? `<button class="big-button" data-action="resume">▶ ${t("menu.resume")}</button>` : ""}
    ${inOnlineMatch ? `<div class="menu-row"><button class="secondary-button" data-action="leave">🚪 ${t("online.leave")}</button></div>` : ""}
    <div class="mode-buttons">
      <button class="mode-button" data-action="quick">
        <span class="mode-title">⚽ ${t("menu.quickMatch")}</span>
        <span class="mode-hint">${t("menu.quickMatchHint")} · ${t("level." + save.settings.level)}</span>
      </button>
      <button class="mode-button" data-action="cup">
        <span class="mode-title">🏆 ${t("menu.cup")}</span>
        <span class="mode-hint">${escapeHtml(cupHint)}</span>
      </button>
      <button class="mode-button" data-action="versus">
        <span class="mode-title">👫 ${t("menu.versus")}</span>
        <span class="mode-hint">${t("menu.versusHint")}</span>
      </button>
      <button class="mode-button" data-action="page" data-page="online">
        <span class="mode-title">🌐 ${t("menu.online")}</span>
        <span class="mode-hint">${t("menu.onlineHint")}</span>
      </button>
    </div>
    <div class="menu-row">
      <button class="secondary-button" data-action="page" data-page="locker">🎨 ${t("menu.locker")}</button>
      <button class="secondary-button" data-action="page" data-page="settings">⚙️ ${t("menu.settings")}</button>
      <button class="secondary-button" data-action="page" data-page="help">❓ ${t("menu.howToPlay")}</button>
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
      <input class="team-name" data-slot="${slot}" maxlength="18"
             placeholder="${escapeHtml(t("team." + team.colorId))}" value="${escapeHtml(team.name)}">
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
      ${teamSettingsHtml("team1", t("settings.team1"))}
      ${teamSettingsHtml("team2", t("settings.team2"))}
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
    <h2>🌐 ${t("online.title")}</h2>
    <p>${t("online.intro")}</p>
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

function onNetStatusChanged() {
  if (!menuOverlay.hidden && currentPage === "online") {
    renderMenuPage();
  }
}

// --- Help page ---

function helpPageHtml() {
  const lines = ["help.goal", "help.mouse", "help.keys1", "help.keys2", "help.pad", "help.ai",
                 "help.kickoff", "help.freeze", "help.bigGoal", "help.crazy", "help.ultimate"];
  return `
    <h2>❓ ${t("help.title")}</h2>
    <ul class="help">${lines.map(key => `<li>${t(key)}</li>`).join("")}</ul>
    <button class="secondary-button" data-action="page" data-page="main">← ${t("menu.back")}</button>
  `;
}

// --- Menu actions ---

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
      if (Net.active) Net.leave();   // starting a local match leaves any online room
      startMatch(action);
      return;
    case "hostRoom": Net.host(); return;
    case "joinRoom": {
      const code = (menuPage.querySelector(".room-input").value || "").trim().toUpperCase();
      if (code.length === 5) Net.join(code);
      return;
    }
    case "copyLink": copyInviteLink(button); return;
    case "leave":
      Net.leave();
      if (game.mode === "online") endOnlineMatchLocally();
      currentPage = "online";
      break;
    case "page": currentPage = button.dataset.page; break;
    case "toggle": save.settings[button.dataset.setting] = !save.settings[button.dataset.setting]; break;
    case "language": save.settings.language = value; setLanguage(value); applyStaticTexts(); break;
    case "level": save.settings.level = value; break;
    case "minutes": save.settings.minutes = Number(value); break;
    case "color": save.settings[button.dataset.slot].colorId = value; break;
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

menuPage.addEventListener("keydown", function (event) {
  if (event.target.classList.contains("room-input") && event.key === "Enter") {
    menuPage.querySelector('[data-action="joinRoom"]').click();
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

// Keyboard and controller shortcuts for menus: P / Start pause, A / Enter confirm
function handleMenuInput() {
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
  if (game.paused && !menuOverlay.hidden && currentPage === "main" && confirmPressed) {
    resumeGame();
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
    title = result.winner === mine ? t("results.youWin") : t("results.youLose", { team: teamName(theirs) });
  } else if (result.winner) {
    title = t("results.win", { team: teamName(result.winner) });
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
  document.getElementById("resultExtra").innerHTML = extra.map(line => `<div>${escapeHtml(line)}</div>`).join("");

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
    speak(t("speech.cupWon"));
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
