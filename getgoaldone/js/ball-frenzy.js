// 🤪 Ball Frenzy: once per match an icon appears. Whoever grabs it starts a 20-second
// frenzy with lots of bouncy balls; every goal is a "crazy point" and the team with
// more frenzy points gets one real goal.
// Phases: "intro" (3-2-1 countdown) → "frenzy" → "result" (big crazy scoreboard).
// 💥 Ultimate: if the match ends in a draw, an Ultimate Ball Frenzy decides the winner.

function resetCrazy(minutes) {
  game.crazyIcon = null;
  game.crazy = null;
  game.crazyBalls = [];
  game.crazyShown = false;
  game.crazyAt = minutes * 60 * randomBetween(0.3, 0.8);   // time left when the icon appears
}

function updateCrazy(seconds) {
  if (!game.crazyShown && !game.crazy && game.timeLeft <= game.crazyAt) {
    game.crazyShown = true;
    game.crazyIcon = findFreeSpot();
  }

  const crazy = game.crazy;
  if (!crazy) {
    return;
  }
  const previousSecond = Math.ceil(crazy.seconds);
  crazy.seconds -= seconds;
  if (crazy.phase === "intro" && Math.ceil(crazy.seconds) < previousSecond && crazy.seconds > 0) {
    playCountdownBeep();
  }
  if (crazy.seconds > 0) {
    return;
  }
  if (crazy.phase === "intro") {
    startFrenzy();
  } else if (crazy.phase === "frenzy") {
    showCrazyResult();
  } else if (crazy.phase === "result") {
    finishCrazy();
  }
}

function checkCrazyPickup() {
  const icon = game.crazyIcon;
  if (!icon) {
    return;
  }
  for (const team of game.teams) {
    for (const chip of team.chips) {
      if (distance(chip, icon) < chip.radius + CRAZY_ICON_RADIUS) {
        startCrazy(false);
        return;
      }
    }
  }
}

function startCrazy(ultimate) {
  game.crazyIcon = null;
  game.crazy = { ultimate: ultimate, phase: "intro", seconds: CRAZY_INTRO_SECONDS, points: [0, 0], winner: null };
  game.frozen = null;
  game.kickoff = null;
  game.bigGoalIcon = null;
  game.bigGoal = null;
  game.freezeIcon = null;
  shots[0] = null;
  shots[1] = null;

  // The crazy balls wait in a ring around the centre, in rainbow colours
  const count = ultimate ? CRAZY_BALLS_ULTIMATE : CRAZY_BALLS;
  const ringRadius = Math.max(100, count * 5);
  game.crazyBalls = [];
  for (let i = 0; i < count; i++) {
    const angle = i / count * Math.PI * 2;
    const ball = createBall("hsl(" + (i * 360 / count) + ", 100%, 60%)", "classic");
    ball.bounce = CRAZY_BOUNCE;
    ball.friction = CRAZY_FRICTION;
    ball.x = CENTER_X + Math.cos(angle) * ringRadius;
    ball.y = CENTER_Y + Math.sin(angle) * ringRadius;
    ball.launchAngle = angle;
    game.crazyBalls.push(ball);
  }
  playCrazyStartSound(ultimate);
  playCountdownBeep();
}

function startFrenzy() {
  game.crazy.phase = "frenzy";
  game.crazy.seconds = CRAZY_SECONDS;
  for (const ball of game.crazyBalls) {
    const power = randomBetween(CRAZY_LAUNCH_SPEED[0], CRAZY_LAUNCH_SPEED[1]);
    ball.vx = Math.cos(ball.launchAngle) * power;
    ball.vy = Math.sin(ball.launchAngle) * power;
  }
  playStartWhistle(0.4);
}

function launchFromCenter(ball) {
  const angle = randomBetween(0, Math.PI * 2);
  const power = randomBetween(CRAZY_LAUNCH_SPEED[0], CRAZY_LAUNCH_SPEED[1]);
  ball.x = CENTER_X;
  ball.y = CENTER_Y;
  ball.vx = Math.cos(angle) * power;
  ball.vy = Math.sin(angle) * power;
}

// During the frenzy every ball that goes in is a crazy point
function checkCrazyGoals() {
  for (const ball of [game.ball, ...game.crazyBalls]) {
    const scorer = scoringTeam(ball);
    if (scorer) {
      game.crazy.points[game.teams.indexOf(scorer)] += 1;
      launchFromCenter(ball);
      playCrazyPointSound();
    }
  }
}

function showCrazyResult() {
  const crazy = game.crazy;
  crazy.phase = "result";
  crazy.seconds = CRAZY_RESULT_SECONDS;
  game.crazyBalls = [];
  if (crazy.points[0] > crazy.points[1]) crazy.winner = game.teams[0];
  if (crazy.points[1] > crazy.points[0]) crazy.winner = game.teams[1];
  if (crazy.winner) {
    crazy.winner.goals += 1;
  }
  announceCrazyResult(crazy);
}

function finishCrazy() {
  const winner = game.crazy.winner;
  const ultimate = game.crazy.ultimate;
  game.crazy = null;

  if (ultimate) {
    if (winner) {
      endMatch();
    } else {
      startCrazy(true);   // tied again: another Ultimate
    }
    return;
  }
  if (winner) {
    if (winner.goals >= GOALS_TO_WIN) {
      endMatch();
      return;
    }
    kickOff(winner === game.teams[0] ? 1 : 0);
    playStartWhistle(0.9);
  }
}

// --- Drawing ---

// A colour that cycles through the rainbow over time
function rainbow(offset, alpha) {
  const hue = (performance.now() / 1000 * 250 + offset) % 360;
  return "hsla(" + hue + ", 100%, 60%, " + alpha + ")";
}

function drawDiscoLights() {
  if (!game.crazy) {
    return;
  }
  ctx.fillStyle = rainbow(0, 0.25);
  ctx.fillRect(LEFT, TOP, FIELD_WIDTH, FIELD_HEIGHT);

  const time = performance.now() / 1000;
  const corners = [
    { x: LEFT, y: TOP }, { x: RIGHT, y: TOP },
    { x: RIGHT, y: BOTTOM }, { x: LEFT, y: BOTTOM },
  ];
  corners.forEach((corner, i) => {
    const angle = time * 1.5 + i * Math.PI / 2;
    const length = 1300;
    ctx.fillStyle = rainbow(i * 90, 0.3);
    ctx.beginPath();
    ctx.moveTo(corner.x, corner.y);
    ctx.lineTo(corner.x + Math.cos(angle - 0.15) * length, corner.y + Math.sin(angle - 0.15) * length);
    ctx.lineTo(corner.x + Math.cos(angle + 0.15) * length, corner.y + Math.sin(angle + 0.15) * length);
    ctx.closePath();
    ctx.fill();
  });
}

function drawCrazyIcon() {
  const icon = game.crazyIcon;
  if (!icon) {
    return;
  }
  const radius = CRAZY_ICON_RADIUS + Math.sin(performance.now() / 120) * 4;
  fillCircle(icon.x, icon.y, radius + 8, rainbow(0, 0.5));
  fillCircle(icon.x, icon.y, radius, rainbow(180, 1));
  strokeCircle(icon.x, icon.y, radius, "white", 3);
  drawEmoji("🤪", icon.x, icon.y, 26);
}

function crazyTitle() {
  return t(game.crazy.ultimate ? "crazy.titleUltimate" : "crazy.title");
}

function drawCrazyOverlay() {
  const crazy = game.crazy;
  if (!crazy) {
    return;
  }
  const pulse = Math.sin(performance.now() / 100);

  if (crazy.phase === "intro") {
    darken(0.5);
    drawText(crazyTitle(), CENTER_X, CENTER_Y - 110, 56 + pulse * 4, rainbow(0, 1));
    drawText(t(crazy.ultimate ? "crazy.introUltimate" : "crazy.intro"), CENTER_X, CENTER_Y - 50, 24, "white");
    drawText(String(Math.ceil(crazy.seconds)), CENTER_X, CENTER_Y + 70, 130, "#ffeb3b");
  }

  if (crazy.phase === "frenzy") {
    drawText(crazyTitle(), CENTER_X, TOP + 35, 30 + pulse * 4, rainbow(0, 1));
    const [team1, team2] = game.teams;
    const score = teamName(team1) + "  " + crazy.points[0] + " - " + crazy.points[1] +
                  "  " + teamName(team2) + "      ⏱️ " + Math.ceil(crazy.seconds);
    drawText(score, CENTER_X, TOP + 75, 24, "white");
  }

  if (crazy.phase === "result") {
    drawCrazyScoreboard(crazy, pulse);
  }
}

function drawCrazyScoreboard(crazy, pulse) {
  const [team1, team2] = game.teams;
  darken(0.65);
  drawText(crazyTitle(), CENTER_X, CENTER_Y - 170, 44, rainbow(0, 1));

  const size1 = crazy.winner === team1 ? 120 + pulse * 10 : 110;
  const size2 = crazy.winner === team2 ? 120 + pulse * 10 : 110;
  drawText(String(crazy.points[0]), CENTER_X - 170, CENTER_Y - 30, size1, team1.color);
  drawText("-", CENTER_X, CENTER_Y - 30, 90, "white");
  drawText(String(crazy.points[1]), CENTER_X + 170, CENTER_Y - 30, size2, team2.color);
  drawText(teamName(team1), CENTER_X - 170, CENTER_Y + 50, 30, team1.color);
  drawText(teamName(team2), CENTER_X + 170, CENTER_Y + 50, 30, team2.color);

  let message = t("crazy.tie");
  if (crazy.ultimate && !crazy.winner) {
    message = t("crazy.tieUltimate");
  } else if (crazy.ultimate) {
    message = t("crazy.winsMatch", { team: teamName(crazy.winner) });
  } else if (crazy.winner) {
    message = t("crazy.winsGoal", { team: teamName(crazy.winner) });
  }
  drawText(message, CENTER_X, CENTER_Y + 140, 38, "#ffeb3b");
}
