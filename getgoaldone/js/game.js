// Game state, rules, match flow and the main loop.

const game = {
  state: "idle",         // "idle" | "countdown" | "playing" | "goal" | "over"
  paused: false,
  mode: "quick",         // "quick" (vs CPU) | "cup" (vs CPU, progression) | "versus" (2 players) | "online"
  cupStage: 0,
  teams: [],
  ball: null,
  cpu: null,             // CPU controller, or null in 2-player mode
  totalTime: 0,
  timeLeft: 0,
  lastScorer: null,
  ownGoal: false,
  celebrationFrames: 0,
  kickoff: null,         // team index that must kick off (only it may shoot), or null
  kickoffWait: 0,        // seconds left before the kick-off happens by itself
  countdown: 0,          // seconds left on the start screen
  startedAt: 0,          // performance.now() at the end of the countdown, for the "GO!"
  lastTouch: null,       // last team to touch the ball, to detect own goals
  tutorial: false,

  freezeIcon: null, frozen: null, nextFreezeIconIn: 0,
  bigGoalIcon: null, bigGoal: null, goalHeights: null, nextBigGoalIconIn: 0,
  crazyIcon: null, crazy: null, crazyBalls: [], crazyShown: false, crazyAt: 0,
};

// --- Queries ---

// Teams controlled from this device: both in local 2-player, one against the CPU or online
function localTeams() {
  if (game.mode === "online") return [Net.localTeam];
  return game.cpu ? [0] : [0, 1];
}

function isLocalTeam(index) {
  return localTeams().includes(index);
}

function selectedChip(team) {
  return team.chips[team.selected];
}

function canTeamPlay(index) {
  if (game.state !== "playing" || game.paused) return false;
  if (isFrozen(game.teams[index])) return false;
  if (game.kickoff !== null && game.kickoff !== index) return false;
  if (game.crazy && game.crazy.phase !== "frenzy") return false;
  return true;
}

function teamOfChip(chip) {
  return game.teams.find(team => team.chips.includes(chip)) || null;
}

function allBodies() {
  return [game.ball, ...game.crazyBalls, ...game.teams[0].chips, ...game.teams[1].chips];
}

function closestChipToBall(chips) {
  let closest = chips[0];
  for (const chip of chips) {
    if (distance(chip, game.ball) < distance(closest, game.ball)) {
      closest = chip;
    }
  }
  return closest;
}

// --- Match setup ---

function startMatch(mode) {
  const settings = save.settings;
  const progress = save.progress;
  game.mode = mode;

  const homeColor = settings.team1.colorId;
  const home = createTeam({
    colorId: homeColor,
    customName: settings.team1.name,
    side: "left",
    style: progress.chipStyle,
    chipNames: randomChipNames(3, []),
  });

  let away;
  let level = null;
  if (mode === "online") {
    // Host only: the guest's team comes from its "hello" message
    const guest = Net.peerSettings;
    const colorId = guest.colorId !== homeColor ? guest.colorId : otherColor(homeColor);
    away = createTeam({ colorId: colorId, customName: guest.name, side: "right", style: guest.style,
                        chipNames: randomChipNames(3, home.chips.map(c => c.name)) });
  } else if (mode === "versus") {
    const colorId = settings.team2.colorId !== homeColor ? settings.team2.colorId : otherColor(homeColor);
    away = createTeam({ colorId: colorId, customName: settings.team2.name, side: "right", chipNames: randomChipNames(3, home.chips.map(c => c.name)) });
  } else if (mode === "cup") {
    game.cupStage = progress.cupStage;
    const opponent = CUP_OPPONENTS[game.cupStage];
    const colorId = opponent.colorId !== homeColor ? opponent.colorId : opponent.altColorId;
    away = createTeam({ colorId: colorId, nameKey: "cup." + opponent.id, side: "right", chipNames: randomChipNames(3, home.chips.map(c => c.name)) });
    level = opponent.level;
  } else {
    away = createTeam({ colorId: otherColor(homeColor), side: "right", chipNames: randomChipNames(3, home.chips.map(c => c.name)) });
    level = progress.matches === 0 ? "easy" : settings.level;   // a gentle first match
  }

  game.teams = [home, away];
  game.cpu = level ? createCpu(1, level) : null;
  game.ball = createBall("white", progress.ballSkin);
  const minutes = mode === "cup" ? CUP_MINUTES : settings.minutes;
  game.totalTime = minutes * 60;
  game.timeLeft = game.totalTime;
  game.tutorial = progress.tutorialShots < 3 && mode !== "online";

  resetFreeze();
  resetBigGoal();
  resetCrazy(minutes);
  for (const aim of keyAim) {
    aim.angle = null;
    aim.charging = false;
    aim.power = 0;
  }

  // First-time players kick off, so they can try the controls right away
  kickOff(game.tutorial ? 0 : (Math.random() < 0.5 ? 0 : 1));
  startCountdown();
  game.paused = false;
  hideOverlays();
  Platform.gameplayStart();
  if (mode === "online") {
    Net.sendSetup(minutes);
  }
}

// The start screen: who you are, then 3, 2, 1...
function startCountdown() {
  game.state = "countdown";
  game.countdown = COUNTDOWN_SECONDS;
  playCountdownStep(COUNTDOWN_SECONDS);
}

function updateCountdown(seconds) {
  const before = Math.ceil(game.countdown);
  game.countdown -= seconds;
  if (game.countdown <= 0) {
    game.state = "playing";
    game.startedAt = performance.now();
    playCountdownStep(0);
  } else if (Math.ceil(game.countdown) < before) {
    playCountdownStep(Math.ceil(game.countdown));
  }
}

function otherColor(colorId) {
  return pickRandom(TEAM_COLORS.filter(color => color.id !== colorId)).id;
}

// The field behind the main menu, before the first match
function showTitleField() {
  const homeColor = save.settings.team1.colorId;
  const home = createTeam({ colorId: homeColor, side: "left", style: save.progress.chipStyle, chipNames: randomChipNames(3, []) });
  const away = createTeam({ colorId: otherColor(homeColor), side: "right", chipNames: randomChipNames(3, home.chips.map(c => c.name)) });
  game.teams = [home, away];
  game.ball = createBall("white", save.progress.ballSkin);
  game.totalTime = save.settings.minutes * 60;
  game.timeLeft = game.totalTime;
  resetFreeze();
  resetBigGoal();
  resetCrazy(save.settings.minutes);
  kickOff(0);
  game.kickoff = null;
  game.state = "idle";
}

// Everybody back to their spots, ball in the centre; only the kicking team may shoot
function kickOff(teamIndex) {
  game.kickoff = teamIndex;
  game.kickoffWait = KICKOFF_AUTO_SECONDS;
  game.lastTouch = null;
  game.ball.x = CENTER_X;
  game.ball.y = CENTER_Y;
  game.ball.vx = 0;
  game.ball.vy = 0;
  for (const team of game.teams) {
    placeTeam(team);
    team.selected = team.chips.indexOf(closestChipToBall(team.chips));
  }
  shots[0] = null;
  shots[1] = null;
}

// Nobody kicked off in time: the chip closest to the ball taps it on its own
// (the closest one, because the attacker may have walked in between the striker and the ball)
function autoKickOff() {
  const index = game.kickoff;
  const team = game.teams[index];
  const ready = team.chips.filter(canShoot);
  const chip = closestChipToBall(ready.length ? ready : team.chips);
  team.selected = team.chips.indexOf(chip);
  const angle = Math.atan2(game.ball.y - chip.y, game.ball.x - chip.x);
  shots[index] = null;
  applyShot(chip, Math.cos(angle) * KICKOFF_AUTO_POWER, Math.sin(angle) * KICKOFF_AUTO_POWER, index);
}

function onHumanShot() {
  if (game.tutorial) {
    save.progress.tutorialShots += 1;
    if (save.progress.tutorialShots >= 3) {
      game.tutorial = false;
    }
    persist();
  }
}

// --- Per-frame update ---

function update() {
  if (isOnlineGuest()) {
    guestUpdate();   // the host runs the real simulation (see net.js)
    return;
  }
  if (game.state === "goal") {
    game.celebrationFrames -= 1;
    if (game.celebrationFrames <= 0) {
      afterGoal();
    }
    return;
  }
  if (game.state !== "playing") {
    return;
  }

  // Full time. A draw goes to Ball Frenzy Ultimate.
  if (game.timeLeft <= 0 && !game.crazy) {
    if (game.teams[0].goals === game.teams[1].goals) {
      startCrazy(true);
    } else {
      endMatch();
    }
    return;
  }
  if (game.crazy && game.crazy.phase !== "frenzy") {
    return;   // intro and result screens freeze the action
  }

  updateKeyboard();
  updateGamepads();
  if (game.cpu) {
    playCpu(game.cpu);
  }
  cancelShotsOfMovingChips();

  for (const team of game.teams) {
    if (!isFrozen(team)) {
      thinkTeammates(team);
    }
  }

  animateGoalHeights();
  const bodies = allBodies();
  for (const body of bodies) {
    move(body);
    bounceOffWalls(body, body.isBall);
  }
  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const impact = collide(bodies[i], bodies[j]);
      if (bodies[i].isBall && impact > 0.5) {
        playHitSound(impact);
      }
      if (bodies[i] === game.ball && impact > 0) {
        const toucher = teamOfChip(bodies[j]);
        if (toucher) game.lastTouch = toucher;
      }
    }
  }

  checkFreezePickup();
  checkBigGoalPickup();
  checkCrazyPickup();
  if (game.crazy) {
    checkCrazyGoals();
  } else {
    checkGoal();
  }
}

// The team that scores if this ball is in a goal, or null.
// A ball in the left goal is a goal for the right team, and vice versa.
function scoringTeam(ball) {
  if (ball.x < LEFT && isInFrontOfGoal(ball, "left")) return game.teams[1];
  if (ball.x > RIGHT && isInFrontOfGoal(ball, "right")) return game.teams[0];
  return null;
}

function checkGoal() {
  const scorer = scoringTeam(game.ball);
  if (scorer) {
    scoreGoal(scorer, game.lastTouch !== null && game.lastTouch !== scorer);
  }
}

function scoreGoal(team, ownGoal) {
  team.goals += 1;
  game.lastScorer = team;
  game.ownGoal = Boolean(ownGoal);
  game.ball.vx = 0;
  game.ball.vy = 0;
  game.frozen = null;
  game.state = "goal";
  game.celebrationFrames = CELEBRATION_FRAMES;
  celebrateGoal(team, game.ownGoal);
}

function afterGoal() {
  if (game.lastScorer.goals >= GOALS_TO_WIN) {
    endMatch();
    return;
  }
  kickOff(game.lastScorer === game.teams[0] ? 1 : 0);   // the team that conceded kicks off
  game.state = "playing";
  playStartWhistle(0.9);
}

function endMatch() {
  game.state = "over";
  const [home, away] = game.teams;
  let winner = null;
  if (home.goals > away.goals) winner = home;
  if (away.goals > home.goals) winner = away;
  celebrateFullTime(winner);
  Platform.gameplayStop();

  const progress = save.progress;
  const result = { mode: game.mode, winner: winner, unlocked: [], cupWon: false };
  progress.matches += 1;
  progress.goals += home.goals;
  if (game.mode !== "versus" && winner === home) {
    progress.wins += 1;
    if (progress.wins >= WINS_REWARD.wins && unlock(WINS_REWARD)) {
      result.unlocked.push(WINS_REWARD);
    }
  }
  if (game.mode === "online") {
    Net.sendSnapshot();   // make sure the guest sees the final whistle
  }
  if (game.mode === "cup" && winner === home) {
    const stage = progress.cupStage;
    if (unlock(CUP_OPPONENTS[stage].reward)) result.unlocked.push(CUP_OPPONENTS[stage].reward);
    progress.cupStage += 1;
    if (progress.cupStage >= CUP_OPPONENTS.length) {
      progress.cupStage = 0;
      progress.cupsWon += 1;
      result.cupWon = true;
      if (unlock(CUP_FINAL_BONUS)) result.unlocked.push(CUP_FINAL_BONUS);
      Platform.happytime();
    }
  }
  persist();
  game.overAt = performance.now();
  showResults(result);
  if (game.mode === "online") {
    Ranking.report(null);
  }
}

function pauseGame() {
  if (!isMatchInProgress() || game.paused) return;
  if (game.mode === "online") {
    showMenu();   // online matches can't be paused: the menu just opens on top
    return;
  }
  game.paused = true;
  shots[0] = null;
  shots[1] = null;
  Platform.gameplayStop();
  showMenu();
}

function resumeGame() {
  if (!game.paused) {
    hideOverlays();   // online: just close the menu
    return;
  }
  game.paused = false;
  hideOverlays();
  Platform.gameplayStart();
}

function isMatchInProgress() {
  return game.state === "countdown" || game.state === "playing" || game.state === "goal";
}

// Switching tabs or apps pauses a local match (online matches can't pause)
document.addEventListener("visibilitychange", function () {
  if (document.hidden && game.mode !== "online") {
    pauseGame();
  }
});

// --- Clock ---

function updateClock(seconds) {
  if (game.paused || isOnlineGuest()) {
    return;   // the guest gets the clock from the host
  }
  if (game.state === "countdown") {
    updateCountdown(seconds);
    return;
  }
  if (game.state !== "playing") {
    return;
  }
  // The match clock stops during the Ball Frenzy (it's extra time) and while waiting for the kick-off
  if (!game.crazy) {
    if (game.kickoff !== null) {
      game.kickoffWait -= seconds;
      if (game.kickoffWait <= 0) {
        autoKickOff();
      }
      return;
    }
    game.timeLeft = Math.max(0, game.timeLeft - seconds);
    updateFreeze(seconds);
    updateBigGoal(seconds);
  }
  updateCrazy(seconds);
}

// --- Main loop ---
// The simulation (input, AI, physics, timers) runs in fixed steps of 1/60 s, so the game plays
// the same on 60, 120 or 144 Hz screens. Drawing and audio happen once per animation frame.

let lastFrameTime = null;
let pendingSeconds = 0;

function step() {
  updateClock(STEP_SECONDS);
  if (!game.paused) {
    update();
  }
  Net.tick();
  handleMenuInput();
  rememberPadButtons();
  clearPressedKeys();
}

function frame(now) {
  if (lastFrameTime !== null) {
    pendingSeconds += Math.min(now - lastFrameTime, 250) / 1000;   // after a long hiccup, just carry on
  }
  lastFrameTime = now;
  // The small tolerance absorbs timer jitter on 60 Hz screens (otherwise some frames get 0 or 2 steps)
  while (pendingSeconds > STEP_SECONDS * 0.9) {
    step();
    pendingSeconds -= STEP_SECONDS;
  }
  renderFrame();
  updateAudio();
  requestAnimationFrame(frame);
}
