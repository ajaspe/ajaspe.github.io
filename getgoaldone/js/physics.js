// Movement, walls and collisions.

function move(body) {
  body.x += body.vx;
  body.y += body.vy;
  body.vx *= body.friction;
  body.vy *= body.friction;
  if (Math.abs(body.vx) + Math.abs(body.vy) < 0.05) {
    body.vx = 0;
    body.vy = 0;
  }
}

function speed(body) {
  return Math.hypot(body.vx, body.vy);
}

function canShoot(chip) {
  return speed(chip) < MAX_SPEED_TO_SHOOT;
}

function distance(a, b) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

// Is the body level with the goal mouth on that side? (each goal can have its own size)
function isInFrontOfGoal(body, side) {
  const height = goalHeight(side);
  return body.y > CENTER_Y - height / 2 && body.y < CENTER_Y + height / 2;
}

// Keep bodies inside the field. Balls may pass through the goal mouths.
function bounceOffWalls(body, canEnterGoals) {
  const throughLeftGoal = canEnterGoals && isInFrontOfGoal(body, "left");
  const throughRightGoal = canEnterGoals && isInFrontOfGoal(body, "right");

  if (body.y - body.radius < TOP) {
    body.y = TOP + body.radius;
    body.vy = -body.vy * body.bounce;
  }
  if (body.y + body.radius > BOTTOM) {
    body.y = BOTTOM - body.radius;
    body.vy = -body.vy * body.bounce;
  }
  if (body.x - body.radius < LEFT && !throughLeftGoal) {
    body.x = LEFT + body.radius;
    body.vx = -body.vx * body.bounce;
  }
  if (body.x + body.radius > RIGHT && !throughRightGoal) {
    body.x = RIGHT - body.radius;
    body.vx = -body.vx * body.bounce;
  }
}

// Elastic-ish collision between two circles. Returns the impact speed (0 = no impact).
function collide(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy);
  const minDist = a.radius + b.radius;
  if (dist >= minDist || dist === 0) {
    return 0;
  }

  const nx = dx / dist;
  const ny = dy / dist;

  // Push them apart; the lighter one moves more
  const totalMass = a.mass + b.mass;
  const overlap = minDist - dist;
  a.x -= nx * overlap * (b.mass / totalMass);
  a.y -= ny * overlap * (b.mass / totalMass);
  b.x += nx * overlap * (a.mass / totalMass);
  b.y += ny * overlap * (a.mass / totalMass);

  const approachSpeed = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
  if (approachSpeed > 0) {
    return 0;   // already separating
  }

  const restitution = Math.max(a.bounce, b.bounce);
  const impulse = -(1 + restitution) * approachSpeed / (1 / a.mass + 1 / b.mass);
  a.vx -= impulse * nx / a.mass;
  a.vy -= impulse * ny / a.mass;
  b.vx += impulse * nx / b.mass;
  b.vy += impulse * ny / b.mass;
  return -approachSpeed;
}
