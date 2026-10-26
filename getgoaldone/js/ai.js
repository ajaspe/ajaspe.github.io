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
  const step = Math.min(WALK_SPEED * GAME_SPEED, dist);
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
    misses: 0,           // times in a row the smart CPU found no good shot
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
    cpu.aimWait -= GAME_SPEED;
    if (cpu.aimWait <= 0) {
      fire(index);
      cpu.thinkWait = randomBetween(cpu.level.thinkFrames[0], cpu.level.thinkFrames[1]);
    }
    return;
  }

  cpu.thinkWait -= GAME_SPEED;
  if (cpu.thinkWait > 0) {
    return;
  }

  const ready = team.chips.filter(canShoot);
  if (ready.length === 0) {
    return;
  }
  let plan = cpu.level.smart ? smartCpuShot(team, ready) : simpleCpuShot(team, ready);
  if (!plan) {
    // No good shot yet: wait a moment for the teammates to get behind the ball
    cpu.misses += 1;
    if (cpu.misses < CPU_MAX_WAITS) {
      cpu.thinkWait = CPU_WAIT_FRAMES;
      return;
    }
    plan = smartCpuShot(team, ready, CPU_LAST_RESORT_CUT) || safestCpuShot(team, ready);
  }
  cpu.misses = 0;
  const chip = plan.chip;
  team.selected = team.chips.indexOf(chip);

  const angle = Math.atan2(plan.hit.y - chip.y, plan.hit.x - chip.x) + randomBetween(-cpu.level.aimError, cpu.level.aimError);
  const power = MAX_SHOT_POWER * randomBetween(cpu.level.smart ? 0.85 : 0.7, 1);
  shots[index] = {
    chip: chip,
    pullX: chip.x - Math.cos(angle) * power / SHOT_POWER_PER_PIXEL,
    pullY: chip.y - Math.sin(angle) * power / SHOT_POWER_PER_PIXEL,
  };
  cpu.aimWait = CPU_AIM_FRAMES;
}

// The point to hit with the chip so the ball goes towards the target
function hitPoint(chip, ball, target) {
  const dist = Math.max(distance(ball, target), 1);
  const dx = (target.x - ball.x) / dist;
  const dy = (target.y - ball.y) / dist;
  return { x: ball.x - dx * (chip.radius + ball.radius), y: ball.y - dy * (chip.radius + ball.radius), dx: dx, dy: dy };
}

// Easy: the closest chip pushes the ball towards the goal, even from the wrong side
function simpleCpuShot(team, ready) {
  const chip = closestChipToBall(ready);
  return { chip: chip, hit: hitPoint(chip, game.ball, opponentGoal(team)) };
}

// Hit the ball dead centre with the chip that sends it furthest forward (or least backward)
function safestCpuShot(team, ready) {
  const forward = Math.sign(opponentGoal(team).x - CENTER_X);
  const ball = game.ball;
  const forwardness = chip => (ball.x - chip.x) * forward / Math.max(distance(chip, ball), 1);
  const chip = ready.reduce((best, chip) => forwardness(chip) > forwardness(best) ? chip : best);
  return { chip: chip, hit: ball };
}

// The smarter levels try every chip, every ball and every target (straight at the goal, off the
// top or bottom wall, or just clearing it forward) and pick the best shot. null = nothing sensible.
// minCut: the steepest cut it will try (a last resort tries steeper ones, and fast balls too).
function smartCpuShot(team, ready, minCut) {
  const lastResort = minCut !== undefined;
  let best = null;
  for (const ball of [game.ball, ...game.crazyBalls]) {
    if (!lastResort && speed(ball) > CPU_MAX_BALL_SPEED) continue;   // too hard to guess where it'll be
    for (const chip of ready) {
      const at = predictBall(ball, chip);
      for (const target of cpuTargets(team, at)) {
        const score = scoreCpuShot(chip, ball, at, target, lastResort ? minCut : CPU_MIN_CUT);
        if (score > 0 && (!best || score > best.score)) {
          best = { chip: chip, hit: hitPoint(chip, at, target), score: score };
        }
      }
    }
  }
  return best;
}

function cpuTargets(team, ball) {
  const side = team.side === "left" ? "right" : "left";
  const goal = goalCenter(side);
  const spread = goalHeight(side) * 0.3;
  const forward = Math.sign(goal.x - CENTER_X);
  // A wall bounce keeps only BOUNCE of the speed across, so aim at a mirror point a bit further out
  const topWall = TOP + BALL_RADIUS;
  const bottomWall = BOTTOM - BALL_RADIUS;
  const targets = [
    { x: goal.x, y: CENTER_Y, value: 1, onGoal: true },
    { x: goal.x, y: CENTER_Y - spread, value: 1, onGoal: true },
    { x: goal.x, y: CENTER_Y + spread, value: 1, onGoal: true },
    { x: goal.x, y: topWall - (CENTER_Y - topWall) / BOUNCE, value: CPU_BANK_VALUE, onGoal: true },
    { x: goal.x, y: bottomWall + (bottomWall - CENTER_Y) / BOUNCE, value: CPU_BANK_VALUE, onGoal: true },
  ];
  for (const degrees of [-60, -30, 0, 30, 60]) {
    const angle = degrees * Math.PI / 180;
    targets.push({
      x: ball.x + Math.cos(angle) * forward * 300,
      y: ball.y + Math.sin(angle) * 300,
      value: CPU_CLEAR_VALUE * Math.cos(angle),
    });
  }
  return targets;
}

// How good a shot is (0 or less = don't). Cutting the ball at a steep angle is risky, so straight
// behind the ball scores best; far chips and chips in the way count against it.
function scoreCpuShot(chip, ball, at, target, minCut) {
  const hit = hitPoint(chip, at, target);
  const length = Math.hypot(hit.x - chip.x, hit.y - chip.y);
  if (length < 1) return 0;
  const cut = ((hit.x - chip.x) * hit.dx + (hit.y - chip.y) * hit.dy) / length;   // 1 = right behind it
  if (cut < minCut) return 0;
  if (pathBlocked(chip, hit, chip.radius, [chip, ball])) return 0;
  let score = target.value * (0.5 + 0.5 * (cut - minCut) / (1 - minCut)) - length / 3000;
  if (target.onGoal && pathBlocked(at, target, ball.radius, [chip, ball])) score *= 0.4;
  return score;
}

// Is any other body in the way of something this big going from one point to another?
function pathBlocked(from, to, radius, ignore) {
  const length = Math.max(distance(from, to), 1);
  const dx = (to.x - from.x) / length;
  const dy = (to.y - from.y) / length;
  return allBodies().some(body => {
    if (ignore.includes(body)) return false;
    const along = Math.max(0, Math.min(length, (body.x - from.x) * dx + (body.y - from.y) * dy));
    const gap = Math.hypot(body.x - (from.x + dx * along), body.y - (from.y + dy * along));
    return gap < radius + body.radius;
  });
}

// Where a rolling ball will be when the chip gets there (ignoring wall bounces)
function predictBall(ball, chip) {
  if (speed(ball) < 0.3) return ball;
  const frames = distance(chip, ball) / (MAX_SHOT_POWER * 0.7 * GAME_SPEED);
  const friction = Math.pow(ball.friction, GAME_SPEED);
  const travel = GAME_SPEED * (1 - Math.pow(friction, frames)) / (1 - friction);
  return {
    x: Math.max(LEFT + ball.radius, Math.min(ball.x + ball.vx * travel, RIGHT - ball.radius)),
    y: Math.max(TOP + ball.radius, Math.min(ball.y + ball.vy * travel, BOTTOM - ball.radius)),
    radius: ball.radius,
  };
}
