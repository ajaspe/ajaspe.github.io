// 🍄 Mega chip power-up: grab the mushroom and your chips grow huge and heavy for a while.
// Big chips cover more of the goal, push the others around and hit the ball harder.

function resetMega() {
  game.megaIcon = null;
  game.mega = null;
  scheduleNextMegaIcon();
}

function scheduleNextMegaIcon() {
  game.nextMegaIconIn = randomBetween(MEGA_SPAWN_SECONDS[0], MEGA_SPAWN_SECONDS[1]);
}

function isMega(team) {
  return game.mega !== null && game.mega.team === team;
}

function updateMega(seconds) {
  if (game.mega) {
    game.mega.seconds -= seconds;
    if (game.mega.seconds <= 0) {
      game.mega = null;
      playMegaSound(false);
    }
    return;   // no new mushroom while a team is mega
  }
  if (game.megaIcon) {
    game.megaIcon.seconds -= seconds;
    if (game.megaIcon.seconds <= 0) {
      game.megaIcon = null;
      scheduleNextMegaIcon();
    }
    return;
  }
  game.nextMegaIconIn -= seconds;
  if (game.nextMegaIconIn <= 0) {
    const spot = findFreeSpot();
    game.megaIcon = { x: spot.x, y: spot.y, seconds: MEGA_ICON_SECONDS };
  }
}

function checkMegaPickup() {
  const icon = game.megaIcon;
  if (!icon) {
    return;
  }
  for (const team of game.teams) {
    for (const chip of team.chips) {
      if (distance(chip, icon) < chip.radius + MEGA_ICON_RADIUS) {
        game.mega = { team: team, seconds: MEGA_SECONDS };
        game.megaIcon = null;
        scheduleNextMegaIcon();
        playMegaSound(true);
        return;
      }
    }
  }
}

// Chips grow and shrink smoothly: each step they close 10% of the gap
function animateMegaChips() {
  for (const team of game.teams) {
    const mega = isMega(team);
    const target = mega ? CHIP_RADIUS * MEGA_SCALE : CHIP_RADIUS;
    for (const chip of team.chips) {
      chip.radius += (target - chip.radius) * 0.1;
      if (Math.abs(target - chip.radius) < 0.05) chip.radius = target;
      chip.mass = mega ? CHIP_MASS * MEGA_MASS : CHIP_MASS;
    }
  }
}

function drawMegaIcon() {
  const icon = game.megaIcon;
  if (!icon) {
    return;
  }
  const now = performance.now();
  if (icon.seconds < 3 && Math.floor(now / 150) % 2 === 0) {
    return;   // blinking: about to disappear
  }
  const radius = MEGA_ICON_RADIUS + Math.sin(now / 150) * 3;
  fillCircle(icon.x, icon.y, radius + 6, "rgba(255, 82, 82, 0.4)");
  fillCircle(icon.x, icon.y, radius, "#ffebee");
  strokeCircle(icon.x, icon.y, radius, "#e53935", 3);
  drawEmoji("🍄", icon.x, icon.y, 22);
}
