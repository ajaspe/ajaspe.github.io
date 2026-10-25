// Online 2-player matches over WebRTC (PeerJS), peer to peer.
// The host runs the whole simulation and streams snapshots (~30 per second);
// the guest only sends its aim and shots, extrapolates motion between snapshots
// and plays sounds by spotting what changed.

const PEERJS_URL = "https://cdn.jsdelivr.net/npm/peerjs@1.5.4/dist/peerjs.min.js";
const PEER_PREFIX = "getgoaldone-";
const ROOM_CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";   // no 0/O or 1/I
const SNAPSHOT_EVERY_FRAMES = 2;
const AIM_EVERY_FRAMES = 3;

const Net = {
  role: null,             // null | "host" | "guest"
  status: "idle",         // idle | loading | hosting | joining | connected | error
  error: null,            // i18n key of the last error
  roomCode: null,
  localTeam: 0,
  peer: null,
  conn: null,
  peerSettings: null,     // the guest's team settings (host side)
  connectTimer: null,
  frame: 0,
  lastSentAim: null,
  lastSentSelected: null,
  previous: null,         // guest: previous snapshot summary, to detect events

  get active() {
    return this.role !== null;
  },

  setStatus(status, error) {
    this.status = status;
    this.error = error || null;
    onNetStatusChanged();
  },

  async loadLibrary() {
    if (window.Peer) return;
    await loadScript(PEERJS_URL, 10000);
  },

  // --- Host ---

  async host() {
    this.leave();
    this.setStatus("loading");
    try {
      await this.loadLibrary();
    } catch (error) {
      this.setStatus("error", "online.errorNetwork");
      return;
    }
    this.role = "host";
    this.localTeam = 0;
    if (!Ranking.profileLoaded) Ranking.loadProfile();   // needed to open rated matches
    this.openHostPeer(0);
  },

  openHostPeer(attempt) {
    this.roomCode = randomRoomCode();
    const peer = new Peer(PEER_PREFIX + this.roomCode, peerOptions());
    this.peer = peer;
    peer.on("open", () => this.setStatus("hosting"));
    peer.on("connection", conn => {
      if (this.conn) {
        conn.on("open", () => conn.close());   // the room is full
        return;
      }
      this.attach(conn);
    });
    peer.on("error", error => {
      if (error.type === "unavailable-id" && attempt < 3) {
        peer.destroy();
        this.openHostPeer(attempt + 1);   // code already taken: pick another
      } else if (this.peer === peer) {
        this.fail("online.errorNetwork");
      }
    });
  },

  // --- Guest ---

  async join(code) {
    this.leave();
    this.roomCode = code.trim().toUpperCase();
    this.setStatus("loading");
    try {
      await this.loadLibrary();
    } catch (error) {
      this.setStatus("error", "online.errorNetwork");
      return;
    }
    this.role = "guest";
    this.localTeam = 1;
    this.setStatus("joining");
    const peer = new Peer(peerOptions());
    this.peer = peer;
    // Some networks block peer-to-peer connections: don't leave the player waiting forever
    this.connectTimer = setTimeout(() => {
      if (this.peer === peer && this.status === "joining") this.fail("online.errorTimeout");
    }, ONLINE_CONNECT_TIMEOUT_MS);
    peer.on("open", () => {
      this.attach(peer.connect(PEER_PREFIX + this.roomCode, { reliable: true, serialization: "json" }));
    });
    peer.on("error", error => {
      if (this.peer !== peer) return;
      this.fail(error.type === "peer-unavailable" ? "online.errorNotFound" : "online.errorNetwork");
    });
  },

  // --- Connection ---

  attach(conn) {
    this.conn = conn;
    if (this.role === "host") {
      // A guest whose connection never opens mustn't keep the room "full"
      setTimeout(() => {
        if (this.conn === conn && !conn.open) {
          this.conn = null;
          conn.close();
        }
      }, ONLINE_CONNECT_TIMEOUT_MS);
    }
    conn.on("open", () => {
      clearTimeout(this.connectTimer);
      this.setStatus("connected");
      if (this.role === "guest") {
        const team = save.settings.team1;
        this.send({ t: "hello", colorId: team.colorId, name: team.name, style: save.progress.chipStyle });
      }
    });
    conn.on("data", message => this.receive(message));
    conn.on("close", () => this.conn === conn && this.onDisconnected());
    conn.on("error", () => this.conn === conn && this.onDisconnected());
  },

  send(message) {
    if (this.conn && this.conn.open) {
      this.conn.send(message);
    }
  },

  fail(errorKey) {
    this.cleanup();
    this.setStatus("error", errorKey);
  },

  onDisconnected() {
    if (!this.role) return;
    const wasPlaying = game.mode === "online";
    if (wasPlaying && isMatchInProgress()) {
      Ranking.report(this.role === "host" ? "guest" : "host");   // the other player abandoned
    }
    this.cleanup();
    if (wasPlaying) {
      endOnlineMatchLocally();
    }
    this.setStatus("error", "online.left");
  },

  leave() {
    if (this.conn) {
      this.send({ t: "bye" });
    }
    this.cleanup();
    this.setStatus("idle");
  },

  cleanup() {
    const peer = this.peer;
    clearTimeout(this.connectTimer);
    this.role = null;
    this.conn = null;
    this.peer = null;
    this.peerSettings = null;
    this.previous = null;
    this.lastSentAim = null;
    this.lastSentSelected = null;
    if (peer) {
      setTimeout(() => peer.destroy(), 200);   // let a last "bye" go out
    }
  },

  receive(message) {
    if (this.role === "host") {
      this.receiveAsHost(message);
    } else if (this.role === "guest") {
      this.receiveAsGuest(message);
    }
  },

  // --- Host side messages ---

  receiveAsHost(message) {
    switch (message.t) {
      case "hello":
        this.peerSettings = { colorId: message.colorId, name: message.name, style: message.style };
        startMatch("online");
        break;
      case "shot":
        applyRemoteShot(message);
        break;
      case "aim":
        applyRemoteAim(message);
        break;
      case "sel":
        if (game.teams[1] && message.i >= 0 && message.i < 3) game.teams[1].selected = message.i;
        break;
      case "rematch":
        if (game.state === "over") startMatch("online");
        break;
      case "bye":
        this.onDisconnected();
        break;
    }
  },

  sendSetup(minutes) {
    this.send({
      t: "setup",
      minutes: minutes,
      ballSkin: game.ball.skin,
      teams: game.teams.map(team => ({
        colorId: team.colorId,
        nameKey: team.nameKey,
        customName: team.customName,
        side: team.side,
        style: team.chips[0].style,
        names: team.chips.map(chip => chip.name),
      })),
    });
    this.sendSnapshot();
    Ranking.hostMatch();   // sends {t: "rated", id} once the server has created the match
  },

  sendSnapshot() {
    if (this.role === "host" && game.teams.length) {
      this.send(takeSnapshot());
    }
  },

  // Called every frame
  tick() {
    if (!this.role || !this.conn || !this.conn.open || game.mode !== "online") {
      return;
    }
    this.frame += 1;
    if (this.role === "host" && this.frame % SNAPSHOT_EVERY_FRAMES === 0) {
      this.sendSnapshot();
    }
    if (this.role === "guest" && this.frame % AIM_EVERY_FRAMES === 0) {
      this.sendAimAndSelection();
    }
  },

  // --- Guest side messages ---

  receiveAsGuest(message) {
    switch (message.t) {
      case "setup":
        setUpGuestMatch(message);
        break;
      case "rated":
        Ranking.joinMatch(message.id);
        break;
      case "s":
        if (game.mode === "online") applySnapshot(message);
        break;
      case "bye":
        this.onDisconnected();
        break;
    }
  },

  sendShot(chipIndex, force) {
    this.send({ t: "shot", c: chipIndex, vx: round2(force.x), vy: round2(force.y) });
  },

  sendAimAndSelection() {
    const shot = shots[1];
    const aim = shot ? [game.teams[1].chips.indexOf(shot.chip), Math.round(shot.pullX), Math.round(shot.pullY)] : null;
    const aimKey = JSON.stringify(aim);
    if (aimKey !== this.lastSentAim) {
      this.lastSentAim = aimKey;
      this.send(aim ? { t: "aim", c: aim[0], x: aim[1], y: aim[2] } : { t: "aim" });
    }
    const selected = game.teams[1] ? game.teams[1].selected : null;
    if (selected !== this.lastSentSelected) {
      this.lastSentSelected = selected;
      this.send({ t: "sel", i: selected });
    }
  },

  requestRematch() {
    this.send({ t: "rematch" });
  },
};

// True while playing an online match as the guest (the host simulates everything)
function isOnlineGuest() {
  return Net.role === "guest" && game.mode === "online";
}

function peerOptions() {
  return ONLINE_ICE_SERVERS ? { debug: 0, config: { iceServers: ONLINE_ICE_SERVERS } } : { debug: 0 };
}

function randomRoomCode() {
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += ROOM_CODE_CHARS[Math.floor(Math.random() * ROOM_CODE_CHARS.length)];
  }
  return code;
}

function round1(value) {
  return Math.round(value * 10) / 10;
}

function round2(value) {
  return Math.round(value * 100) / 100;
}

// --- Host: applying the guest's input ---

function applyRemoteShot(message) {
  const team = game.teams[1];
  if (!team || !canTeamPlay(1)) return;
  const chip = team.chips[message.c];
  if (!chip || !canShoot(chip)) return;
  // Never trust the other side blindly: clamp the power
  let vx = Number(message.vx) || 0;
  let vy = Number(message.vy) || 0;
  const size = Math.hypot(vx, vy);
  if (size > MAX_SHOT_POWER) {
    vx = vx / size * MAX_SHOT_POWER;
    vy = vy / size * MAX_SHOT_POWER;
  }
  team.selected = message.c;
  shots[1] = null;
  const power = useCannon(chip, 1);
  applyShot(chip, vx * power, vy * power, 1);
}

function applyRemoteAim(message) {
  const team = game.teams[1];
  if (!team) return;
  const chip = team.chips[message.c];
  shots[1] = chip && canTeamPlay(1) && canShoot(chip)
    ? { chip: chip, pullX: message.x, pullY: message.y, source: "remote" }
    : null;
}

// --- Snapshots ---

const PHASES = ["intro", "frenzy", "result"];
const ROLES = [null, "defender", "attacker"];

function bodyState(body) {
  return [round1(body.x), round1(body.y), round2(body.vx), round2(body.vy)];
}

function takeSnapshot() {
  const teamIndex = team => (team ? game.teams.indexOf(team) : -1);
  const crazy = game.crazy;
  const shot = shots[0];
  return {
    t: "s",
    st: game.state,
    tl: round1(game.timeLeft),
    cd: round1(game.countdown),
    ko: game.kickoff,
    kw: round1(game.kickoffWait),
    g: [game.teams[0].goals, game.teams[1].goals],
    sel: game.teams[0].selected,
    b: bodyState(game.ball),
    c: game.teams.flatMap(team => team.chips.map(chip => [...bodyState(chip), ROLES.indexOf(chip.role), round1(chip.radius)])),
    bf: round1(game.ball.onFire),
    cb: game.crazyBalls.map(bodyState),
    fi: game.freezeIcon ? [round1(game.freezeIcon.x), round1(game.freezeIcon.y), round1(game.freezeIcon.seconds)] : null,
    fz: game.frozen ? [teamIndex(game.frozen.team), round1(game.frozen.seconds)] : null,
    bi: game.bigGoalIcon ? [round1(game.bigGoalIcon.x), round1(game.bigGoalIcon.y), round1(game.bigGoalIcon.seconds)] : null,
    bg: game.bigGoal ? [game.bigGoal.side, round1(game.bigGoal.seconds)] : null,
    gh: [round1(game.goalHeights.left), round1(game.goalHeights.right)],
    mi: game.megaIcon ? [round1(game.megaIcon.x), round1(game.megaIcon.y), round1(game.megaIcon.seconds)] : null,
    mg: game.mega ? [teamIndex(game.mega.team), round1(game.mega.seconds)] : null,
    ni: game.cannonIcon ? [round1(game.cannonIcon.x), round1(game.cannonIcon.y), round1(game.cannonIcon.seconds)] : null,
    cn: game.cannon ? [teamIndex(game.cannon.team), game.cannon.shots, round1(game.cannon.seconds)] : null,
    wi: game.wallIcon ? [round1(game.wallIcon.x), round1(game.wallIcon.y), round1(game.wallIcon.seconds)] : null,
    wl: game.wall ? [teamIndex(game.wall.team), round1(game.wall.seconds), round1(game.wall.y)] : null,
    ci: game.crazyIcon ? [round1(game.crazyIcon.x), round1(game.crazyIcon.y)] : null,
    cz: crazy ? [PHASES.indexOf(crazy.phase), round1(crazy.seconds), crazy.points[0], crazy.points[1],
                 crazy.ultimate ? 1 : 0, teamIndex(crazy.winner)] : null,
    ls: teamIndex(game.lastScorer),
    og: game.ownGoal ? 1 : 0,
    a: shot ? [game.teams[0].chips.indexOf(shot.chip), Math.round(shot.pullX), Math.round(shot.pullY)] : null,
  };
}

// --- Guest: building and updating the match from the host ---

function setUpGuestMatch(setup) {
  game.mode = "online";
  game.cpu = null;
  game.teams = setup.teams.map(team => createTeam({
    colorId: team.colorId,
    nameKey: team.nameKey,
    customName: team.customName,
    side: team.side,
    style: team.style,
    chipNames: team.names,
  }));
  game.ball = createBall("white", setup.ballSkin);
  game.totalTime = setup.minutes * 60;
  game.timeLeft = game.totalTime;
  game.tutorial = false;
  game.paused = false;
  game.lastScorer = null;
  game.crazyBalls = [];
  resetPowerUps(setup.minutes);
  for (const team of game.teams) {
    placeTeam(team);
  }
  shots[0] = null;
  shots[1] = null;
  Net.previous = null;
  Ranking.match = null;   // the host sends the new rated match id separately
  hideOverlays();
  startCountdown();       // the host's snapshots keep it in sync
  Platform.gameplayStart();
}

function applySnapshot(s) {
  const before = Net.previous;
  const team = index => (index >= 0 ? game.teams[index] : null);

  game.state = s.st;
  game.timeLeft = s.tl;
  game.countdown = s.cd;
  game.kickoff = s.ko;
  game.kickoffWait = s.kw;
  game.teams[0].goals = s.g[0];
  game.teams[1].goals = s.g[1];
  game.teams[0].selected = s.sel;   // our own selection (team 1) stays local
  setBody(game.ball, s.b);

  const chips = [...game.teams[0].chips, ...game.teams[1].chips];
  chips.forEach((chip, i) => {
    setBody(chip, s.c[i]);
    chip.role = ROLES[s.c[i][4]] || null;
    chip.radius = s.c[i][5];
  });
  game.ball.onFire = s.bf;

  // Crazy balls: (re)create them when their number changes
  if (game.crazyBalls.length !== s.cb.length) {
    game.crazyBalls = s.cb.map((state, i) => createBall("hsl(" + (i * 360 / s.cb.length) + ", 100%, 60%)", "classic"));
  }
  game.crazyBalls.forEach((ball, i) => setBody(ball, s.cb[i]));

  game.freezeIcon = s.fi ? { x: s.fi[0], y: s.fi[1], seconds: s.fi[2] } : null;
  game.frozen = s.fz ? { team: team(s.fz[0]), by: team(1 - s.fz[0]), seconds: s.fz[1] } : null;
  game.bigGoalIcon = s.bi ? { x: s.bi[0], y: s.bi[1], seconds: s.bi[2] } : null;
  game.bigGoal = s.bg
    ? { side: s.bg[0], seconds: s.bg[1],
        victim: game.teams.find(t => t.side === s.bg[0]), by: game.teams.find(t => t.side !== s.bg[0]) }
    : null;
  game.goalHeights = { left: s.gh[0], right: s.gh[1] };
  game.megaIcon = s.mi ? { x: s.mi[0], y: s.mi[1], seconds: s.mi[2] } : null;
  game.mega = s.mg ? { team: team(s.mg[0]), seconds: s.mg[1] } : null;
  game.cannonIcon = s.ni ? { x: s.ni[0], y: s.ni[1], seconds: s.ni[2] } : null;
  game.cannon = s.cn ? { team: team(s.cn[0]), shots: s.cn[1], seconds: s.cn[2] } : null;
  game.wallIcon = s.wi ? { x: s.wi[0], y: s.wi[1], seconds: s.wi[2] } : null;
  game.wall = s.wl ? { team: team(s.wl[0]), side: team(s.wl[0]).side, seconds: s.wl[1], y: s.wl[2] } : null;
  game.crazyIcon = s.ci ? { x: s.ci[0], y: s.ci[1] } : null;
  game.crazy = s.cz
    ? { phase: PHASES[s.cz[0]], seconds: s.cz[1], points: [s.cz[2], s.cz[3]], ultimate: s.cz[4] === 1, winner: team(s.cz[5]) }
    : null;
  game.lastScorer = team(s.ls);
  game.ownGoal = s.og === 1;

  if (s.a && canShoot(game.teams[0].chips[s.a[0]])) {
    shots[0] = { chip: game.teams[0].chips[s.a[0]], pullX: s.a[1], pullY: s.a[2], source: "remote" };
  } else {
    shots[0] = null;
  }
  if (!canTeamPlay(1) && shots[1]) {
    shots[1] = null;
  }

  playGuestEvents(before, s);
  Net.previous = s;
}

function setBody(body, state) {
  body.x = state[0];
  body.y = state[1];
  body.vx = state[2];
  body.vy = state[3];
}

// The guest plays the same sounds as the host by spotting what changed
function playGuestEvents(before, s) {
  if (!before) return;
  const team = index => (index >= 0 ? game.teams[index] : null);

  if (s.st === "goal" && before.st !== "goal") {
    celebrateGoal(team(s.ls), s.og === 1);
  }
  if (before.st === "goal" && s.st === "playing") {
    playStartWhistle(0.9);
  }
  if (s.st === "countdown" && before.st === "countdown" && Math.ceil(s.cd) < Math.ceil(before.cd)) {
    playCountdownStep(Math.ceil(s.cd));
  }
  if (before.st === "countdown" && s.st === "playing") {
    game.startedAt = performance.now();
    playCountdownStep(0);
  }
  if (s.fz && !before.fz) {
    playMagicSound();
  }
  if (s.bg && !before.bg) {
    playBigGoalSound();
  }
  if (Boolean(s.mg) !== Boolean(before.mg)) {
    playMegaSound(Boolean(s.mg));
  }
  if (s.cn && !before.cn) {
    playCannonPickupSound();
  }
  if (s.wl && !before.wl) {
    playWallSound();
  }
  // A cannon shot was used (not the timer running out, nor a Ball Frenzy clearing it)
  if (before.cn && (s.cn ? s.cn[1] < before.cn[1] : before.cn[2] > 0.2 && !s.cz)) {
    playCannonSound();
  }

  const phase = s.cz ? s.cz[0] : -1;
  const previousPhase = before.cz ? before.cz[0] : -1;
  if (phase === 0 && previousPhase !== 0) playCrazyStartSound(s.cz[4] === 1);
  if (phase === 0 && previousPhase === 0 && Math.ceil(s.cz[1]) < Math.ceil(before.cz[1])) playCountdownBeep();
  if (phase === 1 && previousPhase === 0) playStartWhistle(0.4);
  if (phase === 2 && previousPhase === 1) announceCrazyResult(game.crazy);
  if (phase === 1 && previousPhase === 1 && s.cz[2] + s.cz[3] > before.cz[2] + before.cz[3]) playCrazyPointSound();

  // A sudden change in the ball's speed means something hit it
  const kick = Math.hypot(s.b[2] - before.b[2], s.b[3] - before.b[3]);
  if (kick > 2 && s.st === "playing") {
    playHitSound(kick);
  }

  if (s.st === "over" && before.st !== "over") {
    finishGuestMatch();
  }
}

function finishGuestMatch() {
  const [home, away] = game.teams;
  let winner = null;
  if (home.goals > away.goals) winner = home;
  if (away.goals > home.goals) winner = away;
  celebrateFullTime(winner);
  Platform.gameplayStop();
  save.progress.matches += 1;
  if (winner === game.teams[Net.localTeam]) save.progress.wins += 1;
  save.progress.goals += game.teams[Net.localTeam].goals;
  persist();
  game.overAt = performance.now();
  showResults({ mode: "online", winner: winner, unlocked: [], cupWon: false });
  Ranking.report(null);
}

// Between snapshots the guest keeps things moving smoothly on its own
function guestUpdate() {
  if (game.state !== "playing") {
    return;
  }
  updateKeyboard();
  updateGamepads();
  cancelShotsOfMovingChips();
  if (game.crazy && game.crazy.phase !== "frenzy") {
    return;
  }
  for (const body of allBodies()) {
    move(body, GAME_SPEED);
    bounceOffWalls(body, body.isBall);
  }
}

// When the connection drops in the middle of a match
function endOnlineMatchLocally() {
  game.state = "idle";
  game.mode = "quick";
  game.paused = false;
  shots[0] = null;
  shots[1] = null;
  Platform.gameplayStop();
  showMenu("online");
}
