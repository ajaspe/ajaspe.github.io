// 🧱 Defence wall power-up: grab the bricks and a wall slides up and down in front of your
// own goal for a while. It covers about half the goal, so the other team has to time its shots.

function resetWall() {
  game.wallIcon = null;
  game.wall = null;
  scheduleNextWallIcon();
}

function scheduleNextWallIcon() {
  game.nextWallIconIn = randomBetween(WALL_SPAWN_SECONDS[0], WALL_SPAWN_SECONDS[1]);
}

function updateWall(seconds) {
  if (game.wall) {
    game.wall.seconds -= seconds;
    if (game.wall.seconds <= 0) {
      game.wall = null;
    }
    return;   // no new bricks while a wall is up
  }
  if (game.wallIcon) {
    game.wallIcon.seconds -= seconds;
    if (game.wallIcon.seconds <= 0) {
      game.wallIcon = null;
      scheduleNextWallIcon();
    }
    return;
  }
  game.nextWallIconIn -= seconds;
  if (game.nextWallIconIn <= 0) {
    const spot = findFreeSpot();
    game.wallIcon = { x: spot.x, y: spot.y, seconds: WALL_ICON_SECONDS };
  }
}

function checkWallPickup() {
  const icon = game.wallIcon;
  if (!icon) {
    return;
  }
  for (const team of game.teams) {
    for (const chip of team.chips) {
      if (distance(chip, icon) < chip.radius + WALL_ICON_RADIUS) {
        game.wall = { team: team, side: team.side, seconds: WALL_SECONDS, phase: 0, y: CENTER_Y };
        game.wallIcon = null;
        scheduleNextWallIcon();
        playWallSound();
        return;
      }
    }
  }
}

// Every step: the wall slides along the goal mouth (which may be a giant goal right now)
function slideWall() {
  const wall = game.wall;
  if (!wall) {
    return;
  }
  wall.phase += STEP_SECONDS * GAME_SPEED * Math.PI * 2 / WALL_PERIOD_SECONDS;
  const range = Math.max(0, goalHeight(wall.side) / 2 - WALL_LENGTH / 2);
  wall.y = CENTER_Y + Math.sin(wall.phase) * range;
}

// The wall is a short vertical bar just in front of the goal line
function wallBar() {
  const wall = game.wall;
  return {
    x: wall.side === "left" ? LEFT + WALL_THICKNESS / 2 : RIGHT - WALL_THICKNESS / 2,
    top: wall.y - WALL_LENGTH / 2,
    bottom: wall.y + WALL_LENGTH / 2,
  };
}

// Balls and chips bounce off the wall. Returns the impact speed (0 = no impact).
function bounceOffDefenceWall(body) {
  if (!game.wall) {
    return 0;
  }
  const bar = wallBar();
  const closestY = Math.max(bar.top, Math.min(body.y, bar.bottom));
  const dx = body.x - bar.x;
  const dy = body.y - closestY;
  const dist = Math.hypot(dx, dy);
  const minDist = body.radius + WALL_THICKNESS / 2;
  if (dist >= minDist) {
    return 0;
  }
  // Push it out, away from the closest point of the bar (straight out into the field if dead centre)
  const nx = dist === 0 ? (game.wall.side === "left" ? 1 : -1) : dx / dist;
  const ny = dist === 0 ? 0 : dy / dist;
  body.x = bar.x + nx * minDist;
  body.y = closestY + ny * minDist;
  const approachSpeed = body.vx * nx + body.vy * ny;
  if (approachSpeed >= 0) {
    return 0;   // already moving away
  }
  body.vx -= (1 + body.bounce) * approachSpeed * nx;
  body.vy -= (1 + body.bounce) * approachSpeed * ny;
  return -approachSpeed;
}

function drawWallIcon() {
  const icon = game.wallIcon;
  if (!icon) {
    return;
  }
  const now = performance.now();
  if (icon.seconds < 3 && Math.floor(now / 150) % 2 === 0) {
    return;   // blinking: about to disappear
  }
  const radius = WALL_ICON_RADIUS + Math.sin(now / 150) * 3;
  fillCircle(icon.x, icon.y, radius + 6, "rgba(141, 110, 99, 0.5)");
  fillCircle(icon.x, icon.y, radius, "#efebe9");
  strokeCircle(icon.x, icon.y, radius, "#6d4c41", 3);
  drawEmoji("🧱", icon.x, icon.y, 22);
}

// Red bricks with the owner's colour around them; blinking when it's about to fall
function drawDefenceWall() {
  const wall = game.wall;
  if (!wall || (wall.seconds < 3 && Math.floor(performance.now() / 150) % 2 === 0)) {
    return;
  }
  const bar = wallBar();
  const left = bar.x - WALL_THICKNESS / 2;
  ctx.fillStyle = "#c62828";
  ctx.fillRect(left, bar.top, WALL_THICKNESS, WALL_LENGTH);
  ctx.strokeStyle = "#ffccbc";
  ctx.lineWidth = 1.5;
  const brick = 10;
  for (let row = 0; row * brick < WALL_LENGTH; row++) {
    const y = bar.top + row * brick;
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(left + WALL_THICKNESS, y);
    const joint = left + (row % 2 === 0 ? WALL_THICKNESS / 2 : WALL_THICKNESS / 4);   // staggered like real bricks
    ctx.moveTo(joint, y);
    ctx.lineTo(joint, Math.min(y + brick, bar.bottom));
    ctx.stroke();
  }
  ctx.strokeStyle = wall.team.color;
  ctx.lineWidth = 3;
  ctx.strokeRect(left, bar.top, WALL_THICKNESS, WALL_LENGTH);
}
