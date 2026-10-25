// 💥 Cannon power-up: grab it and your next few shots are super shots. A chip fired by the
// cannon hits the ball so hard it catches fire. Unused shots are lost after a while.

function resetCannon() {
  game.cannonIcon = null;
  game.cannon = null;
  scheduleNextCannonIcon();
}

function scheduleNextCannonIcon() {
  game.nextCannonIconIn = randomBetween(CANNON_SPAWN_SECONDS[0], CANNON_SPAWN_SECONDS[1]);
}

// How many cannon shots this team has left
function cannonShotsOf(teamIndex) {
  return game.cannon && game.cannon.team === game.teams[teamIndex] ? game.cannon.shots : 0;
}

function updateCannon(seconds) {
  if (game.cannon) {
    game.cannon.seconds -= seconds;
    if (game.cannon.seconds <= 0) {
      game.cannon = null;
    }
    return;
  }
  if (game.cannonIcon) {
    game.cannonIcon.seconds -= seconds;
    if (game.cannonIcon.seconds <= 0) {
      game.cannonIcon = null;
      scheduleNextCannonIcon();
    }
    return;
  }
  game.nextCannonIconIn -= seconds;
  if (game.nextCannonIconIn <= 0) {
    const spot = findFreeSpot();
    game.cannonIcon = { x: spot.x, y: spot.y, seconds: CANNON_ICON_SECONDS };
  }
}

function checkCannonPickup() {
  const icon = game.cannonIcon;
  if (!icon) {
    return;
  }
  for (const team of game.teams) {
    for (const chip of team.chips) {
      if (distance(chip, icon) < chip.radius + CANNON_ICON_RADIUS) {
        game.cannon = { team: team, shots: CANNON_SHOTS, seconds: CANNON_SECONDS };
        game.cannonIcon = null;
        scheduleNextCannonIcon();
        playCannonPickupSound();
        return;
      }
    }
  }
}

// Called for every shot: returns the power multiplier, using up a cannon shot if the team has one
function useCannon(chip, teamIndex) {
  if (cannonShotsOf(teamIndex) === 0) {
    return 1;
  }
  game.cannon.shots -= 1;
  if (game.cannon.shots === 0) {
    game.cannon = null;
  }
  chip.cannon = true;   // until it stops: if it hits the ball, the ball catches fire
  playCannonSound();
  return CANNON_POWER;
}

function setBallOnFire() {
  game.ball.onFire = CANNON_FIRE_SECONDS;
}

// Every step: cannon chips cool down once they stop, the ball's fire burns out
function updateCannonChips() {
  for (const team of game.teams) {
    for (const chip of team.chips) {
      if (chip.cannon && canShoot(chip)) chip.cannon = false;
    }
  }
  if (game.ball.onFire > 0) {
    game.ball.onFire -= STEP_SECONDS;
  }
}

function drawCannonIcon() {
  const icon = game.cannonIcon;
  if (!icon) {
    return;
  }
  const now = performance.now();
  if (icon.seconds < 3 && Math.floor(now / 150) % 2 === 0) {
    return;   // blinking: about to disappear
  }
  const radius = CANNON_ICON_RADIUS + Math.sin(now / 150) * 3;
  fillCircle(icon.x, icon.y, radius + 6, "rgba(255, 145, 0, 0.45)");
  fillCircle(icon.x, icon.y, radius, "#fff3e0");
  strokeCircle(icon.x, icon.y, radius, "#ff6d00", 3);
  drawEmoji("💥", icon.x, icon.y, 22);
}

// The team with cannon shots glows like hot coals
function drawCannonAura() {
  if (!game.cannon) {
    return;
  }
  const glow = 0.35 + Math.sin(performance.now() / 90) * 0.15;
  for (const chip of game.cannon.team.chips) {
    fillCircle(chip.x, chip.y, chip.radius + 8, "rgba(255, 109, 0, " + glow + ")");
  }
}
