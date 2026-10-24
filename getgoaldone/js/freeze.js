// ⏰ Freeze power-up: grab the clock and the other team is frozen for a while.
// Frozen chips can't shoot or think, but they still slide if they get hit.

function resetFreeze() {
  game.freezeIcon = null;
  game.frozen = null;
  scheduleNextFreezeIcon();
}

function scheduleNextFreezeIcon() {
  game.nextFreezeIconIn = randomBetween(FREEZE_SPAWN_SECONDS[0], FREEZE_SPAWN_SECONDS[1]);
}

function isFrozen(team) {
  return game.frozen !== null && game.frozen.team === team;
}

function updateFreeze(seconds) {
  if (game.frozen) {
    game.frozen.seconds -= seconds;
    if (game.frozen.seconds <= 0) {
      game.frozen = null;
    }
    return;   // no new clock while someone is frozen
  }
  if (game.freezeIcon) {
    game.freezeIcon.seconds -= seconds;
    if (game.freezeIcon.seconds <= 0) {
      game.freezeIcon = null;
      scheduleNextFreezeIcon();
    }
    return;
  }
  game.nextFreezeIconIn -= seconds;
  if (game.nextFreezeIconIn <= 0) {
    const spot = findFreeSpot();
    game.freezeIcon = { x: spot.x, y: spot.y, seconds: FREEZE_ICON_SECONDS };
  }
}

// A random spot on the field that isn't on top of anything
function findFreeSpot() {
  let spot = null;
  for (let attempt = 0; attempt < 20; attempt++) {
    spot = {
      x: randomBetween(LEFT + 80, RIGHT - 80),
      y: randomBetween(TOP + 60, BOTTOM - 60),
    };
    if (allBodies().every(body => distance(body, spot) > 70)) {
      break;
    }
  }
  return spot;
}

function checkFreezePickup() {
  const icon = game.freezeIcon;
  if (!icon) {
    return;
  }
  for (let i = 0; i < 2; i++) {
    for (const chip of game.teams[i].chips) {
      if (distance(chip, icon) < chip.radius + FREEZE_ICON_RADIUS) {
        const other = 1 - i;
        game.frozen = { team: game.teams[other], by: game.teams[i], seconds: FREEZE_SECONDS };
        shots[other] = null;
        game.freezeIcon = null;
        scheduleNextFreezeIcon();
        playMagicSound();
        return;
      }
    }
  }
}

function drawFreezeIcon() {
  const icon = game.freezeIcon;
  if (!icon) {
    return;
  }
  const now = performance.now();
  if (icon.seconds < 3 && Math.floor(now / 150) % 2 === 0) {
    return;   // blinking: about to disappear
  }
  const radius = FREEZE_ICON_RADIUS + Math.sin(now / 150) * 3;
  fillCircle(icon.x, icon.y, radius + 6, "rgba(255, 235, 59, 0.4)");
  fillCircle(icon.x, icon.y, radius, "#fff59d");
  strokeCircle(icon.x, icon.y, radius, "#ff9800", 3);
  drawEmoji("⏰", icon.x, icon.y, 22);
}

function drawIce() {
  if (!game.frozen) {
    return;
  }
  for (const chip of game.frozen.team.chips) {
    fillCircle(chip.x, chip.y, chip.radius + 4, "rgba(179, 229, 252, 0.7)");
    strokeCircle(chip.x, chip.y, chip.radius + 4, "white", 2);
    drawEmoji("❄️", chip.x, chip.y, 18);
  }
}

function drawFrozenBanner() {
  if (!game.frozen) {
    return;
  }
  const text = t("hud.frozen", {
    team: teamName(game.frozen.team),
    s: Math.ceil(game.frozen.seconds),
    other: teamName(game.frozen.by),
  });
  drawText(text, CENTER_X, TOP + 25, 22, "#b3e5fc");
}
