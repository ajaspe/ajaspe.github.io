// Drawing. The whole frame is redrawn every animation frame.

const canvas = document.getElementById("field");
let ctx = canvas.getContext("2d");   // swapped temporarily to draw locker previews
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const FONT = "Fredoka, 'Comic Sans MS', 'Trebuchet MS', sans-serif";

// Everything is drawn in field units (CANVAS_WIDTH x CANVAS_HEIGHT); the canvas itself has as many
// pixels as it covers on screen, so it stays sharp in fullscreen and on high-DPI screens.
function fitCanvas() {
  const box = canvas.getBoundingClientRect();
  const fit = Math.min(box.width / CANVAS_WIDTH, box.height / CANVAS_HEIGHT);
  if (!(fit > 0)) {
    return;
  }
  const scale = Math.min(fit * (window.devicePixelRatio || 1), MAX_CANVAS_PIXEL_WIDTH / CANVAS_WIDTH);
  const width = Math.round(CANVAS_WIDTH * scale);
  const height = Math.round(CANVAS_HEIGHT * scale);
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
}

if (window.ResizeObserver) {
  new ResizeObserver(fitCanvas).observe(canvas);
}
window.addEventListener("resize", fitCanvas);

function renderFrame() {
  ctx.setTransform(canvas.width / CANVAS_WIDTH, 0, 0, canvas.height / CANVAS_HEIGHT, 0, 0);
  ctx.fillStyle = "#1b5e20";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  if (!game.teams.length) {
    return;
  }

  ctx.save();
  if (game.crazy && game.crazy.phase === "frenzy") {
    ctx.translate(randomBetween(-3, 3), randomBetween(-3, 3));   // screen shake
  }

  drawField();
  drawGoals();
  drawDefenceWall();
  drawDiscoLights();
  drawShotArrow(shots[0], 0);
  drawShotArrow(shots[1], 1);
  drawKeyAimGuides();
  drawFreezeIcon();
  drawBigGoalIcon();
  drawMegaIcon();
  drawCannonIcon();
  drawWallIcon();
  drawCrazyIcon();
  drawCannonAura();

  game.teams.forEach((team, index) => {
    for (const chip of team.chips) {
      drawChip(chip, highlightColor(team, index, chip));
    }
  });
  drawIce();
  drawBall(game.ball);
  for (const ball of game.crazyBalls) {
    drawBall(ball);
  }
  drawSelectionMarkers();
  drawTutorialHand();

  drawScoreboard();
  drawClock();
  drawKickoffBanner();
  drawPowerUpStatus();
  drawCrazyOverlay();
  drawBottomLine();

  if (game.state === "goal") {
    drawGoalCelebration();
  }
  drawStartScreen();
  ctx.restore();
}

// --- Primitives ---

function fillCircle(x, y, radius, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function strokeCircle(x, y, radius, color, width) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
}

// Outlined text, readable on any background
function drawText(text, x, y, size, color, align) {
  ctx.font = "600 " + size + "px " + FONT;
  ctx.textAlign = align || "center";
  ctx.textBaseline = "middle";
  ctx.lineJoin = "round";
  ctx.lineWidth = Math.max(3, size / 7);
  ctx.strokeStyle = "rgba(0, 0, 0, 0.85)";
  ctx.strokeText(text, x, y);
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

// Centres the emoji's actual drawing on (x, y): each emoji font puts each glyph a bit off-centre
// (up to a tenth of its size), so measure it once and shift it back.
const emojiOffsets = new Map();   // emoji -> { x, y } offset for a 1px font

function drawEmoji(emoji, x, y, size) {
  ctx.font = size + "px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  if (!emojiOffsets.has(emoji)) {
    const box = ctx.measureText(emoji);
    emojiOffsets.set(emoji, {
      x: (box.actualBoundingBoxLeft - box.actualBoundingBoxRight) / 2 / size,
      y: (box.actualBoundingBoxAscent - box.actualBoundingBoxDescent) / 2 / size,
    });
  }
  const offset = emojiOffsets.get(emoji);
  ctx.fillText(emoji, x + offset.x * size, y + offset.y * size);
}

function darken(alpha) {
  ctx.fillStyle = "rgba(0, 0, 0, " + alpha + ")";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

// --- Field ---

function drawField() {
  const stripes = 10;
  const stripeWidth = FIELD_WIDTH / stripes;
  for (let i = 0; i < stripes; i++) {
    ctx.fillStyle = i % 2 === 0 ? "#43a047" : "#4caf50";
    ctx.fillRect(LEFT + i * stripeWidth, TOP, stripeWidth, FIELD_HEIGHT);
  }
  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;
  ctx.strokeRect(LEFT, TOP, FIELD_WIDTH, FIELD_HEIGHT);
  ctx.beginPath();
  ctx.moveTo(CENTER_X, TOP);
  ctx.lineTo(CENTER_X, BOTTOM);
  ctx.stroke();
  strokeCircle(CENTER_X, CENTER_Y, 70, "white", 3);
  fillCircle(CENTER_X, CENTER_Y, 5, "white");
  for (const team of game.teams) {
    const box = penaltyBoxOf(team);
    ctx.strokeRect(box.left, box.top, BOX_WIDTH, BOX_HEIGHT);
  }
}

function drawGoals() {
  const goals = [
    { side: "left", x: LEFT - GOAL_DEPTH },
    { side: "right", x: RIGHT },
  ];
  for (const goal of goals) {
    const height = goalHeight(goal.side);
    const top = CENTER_Y - height / 2;
    const isBig = game.bigGoal && game.bigGoal.side === goal.side;

    ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
    ctx.fillRect(goal.x, top, GOAL_DEPTH, height);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 1;
    for (let y = top; y <= top + height; y += 12) {
      ctx.beginPath();
      ctx.moveTo(goal.x, y);
      ctx.lineTo(goal.x + GOAL_DEPTH, y);
      ctx.stroke();
    }
    ctx.strokeStyle = isBig ? "#ffd54f" : "white";
    ctx.lineWidth = isBig ? 6 : 4;
    ctx.strokeRect(goal.x, top, GOAL_DEPTH, height);
  }
}

// --- Chips ---

function highlightColor(team, index, chip) {
  if (chip !== selectedChip(team) || isFrozen(team) || game.state !== "playing") {
    return null;
  }
  return canShoot(chip) && canTeamPlay(index) ? "#ffeb3b" : "#9e9e9e";
}

function drawChip(chip, highlight) {
  fillCircle(chip.x + 3, chip.y + 3, chip.radius, "rgba(0, 0, 0, 0.3)");   // shadow
  if (highlight) {
    strokeCircle(chip.x, chip.y, chip.radius + 6, highlight, 4);
  }
  fillCircle(chip.x, chip.y, chip.radius, chip.color);
  drawChipStyle(chip);
  strokeCircle(chip.x, chip.y, chip.radius, "rgba(0, 0, 0, 0.5)", 3);

  // Role badge: what this teammate is thinking
  if (chip.role === "defender") drawEmoji("🛡️", chip.x + chip.radius * 0.75, chip.y - chip.radius * 0.75, 12);
  if (chip.role === "attacker") drawEmoji("⚔️", chip.x + chip.radius * 0.75, chip.y - chip.radius * 0.75, 12);

  drawText(chip.name, chip.x, chip.y + chip.radius + 14, 13, "white");
}

function drawChipStyle(chip) {
  const { x, y, radius } = chip;
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.clip();

  switch (chip.style) {
    case "stripes":
      ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
      ctx.translate(x, y);
      ctx.rotate(-Math.PI / 4);
      ctx.fillRect(-radius, -radius * 0.45, radius * 2, radius * 0.25);
      ctx.fillRect(-radius, radius * 0.2, radius * 2, radius * 0.25);
      break;
    case "star":
      drawStar(x, y, 5, radius * 0.62, radius * 0.27, "rgba(255, 255, 255, 0.9)");
      break;
    case "bolt":
      ctx.fillStyle = "#ffeb3b";
      ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x + radius * 0.15, y - radius * 0.75);
      ctx.lineTo(x - radius * 0.35, y + radius * 0.1);
      ctx.lineTo(x - radius * 0.02, y + radius * 0.1);
      ctx.lineTo(x - radius * 0.15, y + radius * 0.75);
      ctx.lineTo(x + radius * 0.35, y - radius * 0.1);
      ctx.lineTo(x + radius * 0.02, y - radius * 0.1);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      break;
    case "crown":
      strokeCircle(x, y, radius - 3, "#ffd54f", 4);
      ctx.fillStyle = "#ffd54f";
      ctx.beginPath();
      ctx.moveTo(x - radius * 0.5, y + radius * 0.3);
      ctx.lineTo(x - radius * 0.5, y - radius * 0.25);
      ctx.lineTo(x - radius * 0.25, y + radius * 0.02);
      ctx.lineTo(x, y - radius * 0.4);
      ctx.lineTo(x + radius * 0.25, y + radius * 0.02);
      ctx.lineTo(x + radius * 0.5, y - radius * 0.25);
      ctx.lineTo(x + radius * 0.5, y + radius * 0.3);
      ctx.closePath();
      ctx.fill();
      break;
    default:   // classic
      strokeCircle(x, y, radius * 0.65, "rgba(255, 255, 255, 0.5)", 2);
  }
  ctx.restore();
}

function drawStar(x, y, points, outer, inner, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = -Math.PI / 2 + i * Math.PI / points;
    ctx.lineTo(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
  }
  ctx.closePath();
  ctx.fill();
}

// --- Balls ---

function drawBall(ball) {
  const { x, y, radius } = ball;

  if (ball.onFire > 0) {
    fillCircle(x, y, radius + 6 + Math.random() * 4, "rgba(255, 109, 0, 0.5)");   // flickering flames
  }
  if ((ball.skin === "fire" || ball.onFire > 0) && speed(ball) > 2) {
    // Flame trail behind a moving fire ball
    for (let i = 1; i <= 5; i++) {
      fillCircle(x - ball.vx * i * 1.4, y - ball.vy * i * 1.4, radius * (1 - i * 0.15),
                 "rgba(255, " + (140 - i * 20) + ", 0, " + (0.5 - i * 0.09) + ")");
    }
  }

  fillCircle(x + 2, y + 2, radius, "rgba(0, 0, 0, 0.3)");   // shadow

  switch (ball.skin) {
    case "beach": {
      const colors = ["#e53935", "#fafafa", "#fdd835", "#fafafa", "#1e88e5", "#fafafa"];
      colors.forEach((color, i) => {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, radius, i * Math.PI / 3, (i + 1) * Math.PI / 3);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
      });
      fillCircle(x, y, radius * 0.25, "white");
      break;
    }
    case "fire": {
      const gradient = ctx.createRadialGradient(x - 3, y - 3, 1, x, y, radius);
      gradient.addColorStop(0, "#fff59d");
      gradient.addColorStop(0.5, "#ff9800");
      gradient.addColorStop(1, "#d84315");
      fillCircle(x, y, radius, gradient);
      break;
    }
    case "gold": {
      const gradient = ctx.createRadialGradient(x - 4, y - 4, 1, x, y, radius);
      gradient.addColorStop(0, "#fffde7");
      gradient.addColorStop(0.45, "#ffd54f");
      gradient.addColorStop(1, "#c79100");
      fillCircle(x, y, radius, gradient);
      if (Math.floor(performance.now() / 300) % 4 === 0) {
        drawStar(x + radius * 0.4, y - radius * 0.4, 4, radius * 0.45, radius * 0.12, "white");
      }
      break;
    }
    default:
      fillCircle(x, y, radius, ball.color);
      fillCircle(x, y, radius * 0.35, "black");
  }
  strokeCircle(x, y, radius, "black", 2);
}

// --- Aiming ---

function drawShotArrow(shot, teamIndex) {
  if (!shot) {
    return;
  }
  const chip = shot.chip;
  const force = shotForce(shot);
  const cannon = cannonShotsOf(teamIndex) > 0;

  if (shot.source === "pointer") {
    // The rubber band, from the chip to the finger
    ctx.setLineDash([6, 6]);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(chip.x, chip.y);
    ctx.lineTo(shot.pullX, shot.pullY);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  let color = "#76ff03";
  if (force.size > MAX_SHOT_POWER * 0.4) color = "#ffeb3b";
  if (force.size > MAX_SHOT_POWER * 0.8) color = "#ff1744";
  if (cannon) {
    // A cannon shot: a longer, thicker, fiery arrow
    const length = 8 * CANNON_POWER;
    drawArrow(chip.x, chip.y, chip.x + force.x * length, chip.y + force.y * length, "#ff3d00", 10);
    drawEmoji("💥", chip.x + force.x * length, chip.y + force.y * length, 26);
    return;
  }
  drawArrow(chip.x, chip.y, chip.x + force.x * 8, chip.y + force.y * 8, color, 6);
}

function drawArrow(fromX, fromY, toX, toY, color, width) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
  const angle = Math.atan2(toY - fromY, toX - fromX);
  const head = width * 2.3;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(toX + Math.cos(angle) * head, toY + Math.sin(angle) * head);
  ctx.lineTo(toX + Math.cos(angle + 2.4) * head, toY + Math.sin(angle + 2.4) * head);
  ctx.lineTo(toX + Math.cos(angle - 2.4) * head, toY + Math.sin(angle - 2.4) * head);
  ctx.fill();
}

// Keyboard players see a thin guide showing where they're aiming
function drawKeyAimGuides() {
  if (game.state !== "playing") {
    return;
  }
  const now = performance.now();
  for (const index of localTeams()) {
    const aim = keyAim[index];
    if (aim.angle === null || shots[index] || now - aim.lastUsed > KEY_AIM_GUIDE_SECONDS * 1000) {
      continue;
    }
    const chip = selectedChip(game.teams[index]);
    if (!canShoot(chip)) {
      continue;
    }
    ctx.setLineDash([4, 6]);
    drawArrow(chip.x, chip.y,
              chip.x + Math.cos(aim.angle) * 70, chip.y + Math.sin(aim.angle) * 70,
              "rgba(255, 255, 255, 0.8)", 3);
    ctx.setLineDash([]);
  }
}

// A small triangle above the chip each team controls
function drawSelectionMarkers() {
  if (game.state !== "playing") {
    return;
  }
  game.teams.forEach((team, index) => {
    if (isFrozen(team)) {
      return;
    }
    const chip = selectedChip(team);
    const y = chip.y - chip.radius - 12;
    ctx.fillStyle = team.color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(chip.x, y);
    ctx.lineTo(chip.x - 10, y - 14);
    ctx.lineTo(chip.x + 10, y - 14);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });
}

// First-time players see a hand showing how to pull back and shoot
function drawTutorialHand() {
  if (!game.tutorial || game.state !== "playing" || game.crazy) {
    return;
  }
  const chip = selectedChip(game.teams[0]);
  if (!canShoot(chip)) {
    return;
  }
  const angle = Math.atan2(game.ball.y - chip.y, game.ball.x - chip.x);
  const cycle = (performance.now() % 1600) / 1600;           // 0 → 1 every 1.6 s
  const pull = Math.min(cycle / 0.7, 1) * 80;                 // drag back, then hold
  const handX = chip.x - Math.cos(angle) * pull;
  const handY = chip.y - Math.sin(angle) * pull;

  ctx.globalAlpha = cycle > 0.85 ? 0 : 0.9;
  drawArrow(chip.x, chip.y, chip.x + Math.cos(angle) * pull * 1.2, chip.y + Math.sin(angle) * pull * 1.2, "#ffeb3b", 5);
  drawEmoji("👆", handX + 6, handY + 14, 36);
  ctx.globalAlpha = 1;
}

// --- HUD ---

function drawScoreboard() {
  const [team1, team2] = game.teams;
  const y = MARGIN / 2;
  drawText(teamName(team1), CENTER_X - 60, y, 24, team1.color, "right");
  drawText(team1.goals + " - " + team2.goals, CENTER_X, y, 30, "white");
  drawText(teamName(team2), CENTER_X + 60, y, 24, team2.color, "left");
}

function drawClock() {
  const secondsLeft = Math.ceil(game.timeLeft);
  const text = Math.floor(secondsLeft / 60) + ":" + String(secondsLeft % 60).padStart(2, "0");
  drawText("⏱️ " + text, LEFT, MARGIN / 2, 26, secondsLeft <= 30 ? "#ff5252" : "white", "left");
}

function drawKickoffBanner() {
  if (game.kickoff === null || game.state !== "playing") {
    return;
  }
  const team = game.teams[game.kickoff];
  const seconds = Math.max(1, Math.ceil(game.kickoffWait));
  drawText(t("hud.kickoff", { team: playerOrTeamName(team), s: seconds }), CENTER_X, TOP + 25, 24, team.color);
}

// Before each match: which team you are and where you attack, then 3, 2, 1, GO!
function drawStartScreen() {
  if (game.state === "countdown") {
    darken(0.55);
    const mine = localTeams();
    const pulse = Math.sin(performance.now() / 120);
    game.teams.forEach((team, index) => {
      const x = LEFT + FIELD_WIDTH * (team.side === "left" ? 0.25 : 0.75);
      const y = CENTER_Y + 115;
      let label = null;
      if (mine.length === 1 && mine[0] === index) label = t("countdown.you");
      if (mine.length === 2) label = team.player || t("countdown.player", { n: index + 1 });

      if (!label) {
        drawText(teamName(team), x, y + 20, 30, team.color);
        return;
      }
      for (const chip of team.chips) {
        strokeCircle(chip.x, chip.y, chip.radius + 9 + pulse * 2, team.color, 4);
        drawChip(chip, null);
      }
      drawText(label, x, y, 58 + pulse * 3, team.color);
      drawText(teamName(team), x, y + 48, 26, "white");
      const direction = team.side === "left" ? 1 : -1;
      drawArrow(x - direction * 70, y + 92, x + direction * 70, y + 92, team.color, 8);
      drawText(t("countdown.attack"), x, y + 126, 18, "white");
    });
    drawText(String(Math.ceil(game.countdown)), CENTER_X, CENTER_Y - 10, 150, "#ffeb3b");
    return;
  }
  const sinceStart = performance.now() - game.startedAt;
  if (game.state === "playing" && sinceStart < 700) {
    ctx.globalAlpha = 1 - sinceStart / 700;
    drawText(t("countdown.go"), CENTER_X, CENTER_Y - 10, 150 + sinceStart / 10, "#76ff03");
    ctx.globalAlpha = 1;
  }
}

// Below each team's half: the power-ups it has, just what and how long ("🍄 Mega 12s")
function drawPowerUpStatus() {
  if (game.state !== "playing" || game.crazy) {
    return;
  }
  const items = [];
  const add = (team, key, seconds, params) => items.push({ team, seconds, text: t(key, { s: Math.ceil(seconds), ...params }) });
  if (game.frozen) add(game.frozen.by, "power.freeze", game.frozen.seconds);
  if (game.bigGoal) add(game.bigGoal.by, "power.bigGoal", game.bigGoal.seconds);
  if (game.mega) add(game.mega.team, "power.mega", game.mega.seconds);
  if (game.cannon) add(game.cannon.team, "power.cannon", game.cannon.seconds, { n: game.cannon.shots });
  if (game.wall) add(game.wall.team, "power.wall", game.wall.seconds);

  // The tutorial hint takes the line below the field, so then they go just inside it
  const y = game.tutorial ? BOTTOM - 22 : BOTTOM + MARGIN / 2;
  const inset = game.tutorial ? 12 : 0;
  const blink = Math.floor(performance.now() / 250) % 2 === 0;
  for (const team of game.teams) {
    const left = team.side === "left";
    let x = left ? LEFT + inset : RIGHT - inset;
    for (const item of items.filter(item => item.team === team)) {
      ctx.globalAlpha = item.seconds < 3 && blink ? 0.35 : 1;   // about to run out
      drawText(item.text, x, y, 22, team.color, left ? "left" : "right");
      ctx.globalAlpha = 1;
      x += (left ? 1 : -1) * (ctx.measureText(item.text).width + 28);
    }
  }
}

// Below the field: the tutorial hint, or the cup progress
function drawBottomLine() {
  const y = BOTTOM + MARGIN / 2;
  if (game.tutorial) {
    drawText(t("hud.tutorialMouse"), CENTER_X, y - 10, 20, "#ffeb3b");
    drawText(t("hud.tutorialKeys"), CENTER_X, y + 14, 15, "white");
  } else if (game.mode === "cup") {
    drawText(t("hud.cupStage", { n: game.cupStage + 1, total: CUP_OPPONENTS.length }), CENTER_X, y, 18, "#ffd54f");
  }
}

function drawGoalCelebration() {
  darken(0.4);
  drawText(t("hud.goal"), CENTER_X, CENTER_Y - 30, 90, "#ffeb3b");
  if (game.ownGoal) {
    const unlucky = game.lastScorer === game.teams[0] ? game.teams[1] : game.teams[0];
    drawText(t("hud.ownGoal"), CENTER_X, CENTER_Y + 45, 44, "#ff8a80");
    drawText(t("hud.ownGoalBy", { team: playerOrTeamName(unlucky) }), CENTER_X, CENTER_Y + 100, 26, unlucky.color);
  } else {
    drawText(t("hud.goalBy", { team: playerOrTeamName(game.lastScorer) }), CENTER_X, CENTER_Y + 50, 40, game.lastScorer.color);
  }
}
