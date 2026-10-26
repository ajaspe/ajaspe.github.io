// 🥅 Big goal power-up: grab it and the other team's goal grows for a while.

function resetBigGoal() {
  game.bigGoalIcon = null;
  game.bigGoal = null;
  game.goalHeights = { left: GOAL_HEIGHT, right: GOAL_HEIGHT };
  scheduleNextBigGoalIcon();
}

function scheduleNextBigGoalIcon() {
  game.nextBigGoalIconIn = randomBetween(BIG_GOAL_SPAWN_SECONDS[0], BIG_GOAL_SPAWN_SECONDS[1]);
}

function goalHeight(side) {
  return game.goalHeights ? game.goalHeights[side] : GOAL_HEIGHT;
}

function updateBigGoal(seconds) {
  if (game.bigGoal) {
    game.bigGoal.seconds -= seconds;
    if (game.bigGoal.seconds <= 0) {
      game.bigGoal = null;
    }
    return;
  }
  if (game.bigGoalIcon) {
    game.bigGoalIcon.seconds -= seconds;
    if (game.bigGoalIcon.seconds <= 0) {
      game.bigGoalIcon = null;
      scheduleNextBigGoalIcon();
    }
    return;
  }
  game.nextBigGoalIconIn -= seconds;
  if (game.nextBigGoalIconIn <= 0) {
    const spot = findFreeSpot();
    game.bigGoalIcon = { x: spot.x, y: spot.y, seconds: BIG_GOAL_ICON_SECONDS };
  }
}

// Goals grow and shrink smoothly: each frame they close 5% of the gap
function animateGoalHeights() {
  for (const side of ["left", "right"]) {
    const target = game.bigGoal && game.bigGoal.side === side ? BIG_GOAL_HEIGHT : GOAL_HEIGHT;
    game.goalHeights[side] += (target - game.goalHeights[side]) * 0.05;
  }
}

function checkBigGoalPickup() {
  const icon = game.bigGoalIcon;
  if (!icon) {
    return;
  }
  for (let i = 0; i < 2; i++) {
    for (const chip of game.teams[i].chips) {
      if (distance(chip, icon) < chip.radius + BIG_GOAL_ICON_RADIUS) {
        const victim = game.teams[1 - i];
        game.bigGoal = { side: victim.side, victim: victim, by: game.teams[i], seconds: BIG_GOAL_SECONDS };
        game.bigGoalIcon = null;
        scheduleNextBigGoalIcon();
        playBigGoalSound();
        return;
      }
    }
  }
}

function drawBigGoalIcon() {
  const icon = game.bigGoalIcon;
  if (!icon) {
    return;
  }
  const now = performance.now();
  if (icon.seconds < 3 && Math.floor(now / 150) % 2 === 0) {
    return;
  }
  const radius = BIG_GOAL_ICON_RADIUS + Math.sin(now / 150) * 3;
  fillCircle(icon.x, icon.y, radius + 6, "rgba(105, 240, 174, 0.4)");
  fillCircle(icon.x, icon.y, radius, "#b9f6ca");
  strokeCircle(icon.x, icon.y, radius, "#00c853", 3);
  drawEmoji("🥅", icon.x, icon.y, 22);
}
