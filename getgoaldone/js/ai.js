// AI: teammates that move on their own, and the CPU opponent.

function goalCenter(side) {
  return { x: side === "left" ? LEFT : RIGHT, y: CENTER_Y };
}

function ownGoal(team) {
  return goalCenter(team.side);
}

function opponentGoal(team) {
  return goalCenter(team.side === "left" ? "right" : "left");
}

// The two chips the player isn't controlling get roles:
// the one closer to its own goal defends, the other gets behind the ball.
function thinkTeammates(team) {
  const selected = selectedChip(team);
  selected.role = null;

  const helpers = team.chips.filter(chip => chip !== selected);
  const goal = ownGoal(team);
  let defender = helpers[0];
  let attacker = helpers[1];
  if (distance(attacker, goal) < distance(defender, goal)) {
    defender = helpers[1];
    attacker = helpers[0];
  }

  defender.role = "defender";
  attacker.role = "attacker";
  walkTowards(defender, defenderSpot(team));
  walkTowards(attacker, attackerSpot(team));
}

// On the line between our goal and the ball
function defenderSpot(team) {
  const goal = ownGoal(team);
  const ball = game.ball;
  return {
    x: goal.x + (ball.x - goal.x) * DEFENDER_POSITION,
    y: goal.y + (ball.y - goal.y) * DEFENDER_POSITION,
  };
}

// Behind the ball, lined up with the opponent's goal
function attackerSpot(team) {
  const goal = opponentGoal(team);
  const ball = game.ball;
  const dist = distance(ball, goal);
  if (dist === 0) {
    return { x: ball.x, y: ball.y };
  }
  return clampToField({
    x: ball.x + (ball.x - goal.x) / dist * ATTACKER_DISTANCE,
    y: ball.y + (ball.y - goal.y) / dist * ATTACKER_DISTANCE,
  });
}

function clampToField(spot) {
  return {
    x: Math.max(LEFT + CHIP_RADIUS, Math.min(spot.x, RIGHT - CHIP_RADIUS)),
    y: Math.max(TOP + CHIP_RADIUS, Math.min(spot.y, BOTTOM - CHIP_RADIUS)),
  };
}

// Take a small step towards a spot, walking around the ball instead of pushing it
function walkTowards(chip, spot) {
  if (!canShoot(chip)) {
    return;   // still sliding from a hit
  }
  const dist = distance(chip, spot);
  if (dist < 2) {
    return;
  }
  const step = Math.min(WALK_SPEED, dist);
  const stepX = (spot.x - chip.x) / dist * step;
  const stepY = (spot.y - chip.y) / dist * step;
  const options = [
    { x: stepX, y: stepY },     // straight
    { x: -stepY, y: stepX },    // around one side
    { x: stepY, y: -stepX },    // around the other
  ];
  for (const option of options) {
    if (!wouldTouchBall(chip, option)) {
      chip.x += option.x;
      chip.y += option.y;
      return;
    }
  }
}

function wouldTouchBall(chip, step) {
  const next = { x: chip.x + step.x, y: chip.y + step.y };
  return distance(next, game.ball) < chip.radius + game.ball.radius + 2;
}

// --- CPU opponent ---

function createCpu(teamIndex, levelId) {
  return {
    teamIndex: teamIndex,
    level: CPU_LEVELS[levelId],
    thinkWait: 60,
    aimWait: 0,
  };
}

function playCpu(cpu) {
  const index = cpu.teamIndex;
  const team = game.teams[index];
  if (!canTeamPlay(index)) {
    return;
  }

  // Aiming: keep the arrow visible for a moment, then shoot
  if (shots[index]) {
    cpu.aimWait -= 1;
    if (cpu.aimWait <= 0) {
      fire(index);
      cpu.thinkWait = randomBetween(cpu.level.thinkFrames[0], cpu.level.thinkFrames[1]);
    }
    return;
  }

  cpu.thinkWait -= 1;
  if (cpu.thinkWait > 0) {
    return;
  }

  const ready = team.chips.filter(canShoot);
  if (ready.length === 0) {
    return;
  }
  const chip = closestChipToBall(ready);
  team.selected = team.chips.indexOf(chip);

  const force = cpuShot(team, chip, cpu.level.aimError);
  shots[index] = {
    chip: chip,
    pullX: chip.x - force.x / SHOT_POWER_PER_PIXEL,
    pullY: chip.y - force.y / SHOT_POWER_PER_PIXEL,
  };
  cpu.aimWait = CPU_AIM_FRAMES;
}

// Aim at the point behind the ball that sends it towards the opponent's goal
function cpuShot(team, chip, aimError) {
  const ball = game.ball;
  const goal = opponentGoal(team);
  const dist = distance(ball, goal);
  if (dist === 0) {
    return { x: 0, y: 0 };
  }
  const towardsGoalX = (goal.x - ball.x) / dist;
  const towardsGoalY = (goal.y - ball.y) / dist;
  const hitX = ball.x - towardsGoalX * (chip.radius + ball.radius);
  const hitY = ball.y - towardsGoalY * (chip.radius + ball.radius);

  const angle = Math.atan2(hitY - chip.y, hitX - chip.x) + randomBetween(-aimError, aimError);
  const power = MAX_SHOT_POWER * randomBetween(0.7, 1);
  return { x: Math.cos(angle) * power, y: Math.sin(angle) * power };
}
