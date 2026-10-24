// Player input: shots, mouse / touch and keyboard. (Controllers live in gamepads.js.)

// The shot each team is preparing: { chip, pullX, pullY, source } or null.
// The chip flies away from the pull point, like a slingshot.
const shots = [null, null];

function shotForce(shot) {
  let x = (shot.chip.x - shot.pullX) * SHOT_POWER_PER_PIXEL;
  let y = (shot.chip.y - shot.pullY) * SHOT_POWER_PER_PIXEL;
  let size = Math.hypot(x, y);
  if (size > MAX_SHOT_POWER) {
    x = x / size * MAX_SHOT_POWER;
    y = y / size * MAX_SHOT_POWER;
    size = MAX_SHOT_POWER;
  }
  return { x: x, y: y, size: size };
}

// A shot defined by an angle (where the chip goes) and a power
function shotFromAngle(chip, angle, power, source) {
  const pull = power / SHOT_POWER_PER_PIXEL;
  return {
    chip: chip,
    pullX: chip.x - Math.cos(angle) * pull,
    pullY: chip.y - Math.sin(angle) * pull,
    source: source,
  };
}

function fire(teamIndex) {
  const shot = shots[teamIndex];
  const force = shotForce(shot);
  shots[teamIndex] = null;
  if (force.size <= 1) {
    return;   // barely pulled: not a shot
  }
  if (isOnlineGuest()) {
    Net.sendShot(game.teams[teamIndex].chips.indexOf(shot.chip), force);   // the host applies it
    return;
  }
  applyShot(shot.chip, force.x, force.y, teamIndex);
  if (isLocalTeam(teamIndex)) {
    onHumanShot();
  }
}

function applyShot(chip, vx, vy, teamIndex) {
  chip.vx = vx;
  chip.vy = vy;
  if (game.kickoff === teamIndex) {
    game.kickoff = null;
  }
}

// A shot is cancelled if its chip gets hit while aiming
function cancelShotsOfMovingChips() {
  for (let i = 0; i < 2; i++) {
    if (shots[i] && !canShoot(shots[i].chip)) {
      shots[i] = null;
    }
  }
}

function selectNextChip(teamIndex, direction) {
  const team = game.teams[teamIndex];
  team.selected = (team.selected + direction + team.chips.length) % team.chips.length;
  keyAim[teamIndex].angle = null;
}

// --- Mouse and touch (several fingers at once on tablets) ---

const pointerTeams = new Map();   // pointerId -> team index

// Canvas coordinates of a pointer. The canvas is letterboxed (object-fit: contain).
function canvasPoint(event) {
  const box = canvas.getBoundingClientRect();
  const scale = Math.min(box.width / canvas.width, box.height / canvas.height);
  const offsetX = (box.width - canvas.width * scale) / 2;
  const offsetY = (box.height - canvas.height * scale) / 2;
  return {
    x: (event.clientX - box.left - offsetX) / scale,
    y: (event.clientY - box.top - offsetY) / scale,
  };
}

canvas.addEventListener("pointerdown", function (event) {
  unlockAudio();
  if (game.state !== "playing" || game.paused) {
    return;
  }
  const point = canvasPoint(event);
  for (const index of localTeams()) {
    if (!canTeamPlay(index) || pointerTeamsHas(index)) {
      continue;
    }
    const team = game.teams[index];
    for (const chip of team.chips) {
      if (distance(point, chip) < chip.radius * 1.4 && canShoot(chip)) {
        shots[index] = { chip: chip, pullX: point.x, pullY: point.y, source: "pointer" };
        team.selected = team.chips.indexOf(chip);
        pointerTeams.set(event.pointerId, index);
        try {
          canvas.setPointerCapture(event.pointerId);   // keep receiving moves outside the canvas
        } catch (error) {
          // the pointer may already be gone; aiming still works
        }
        return;
      }
    }
  }
});

function pointerTeamsHas(teamIndex) {
  for (const index of pointerTeams.values()) {
    if (index === teamIndex) return true;
  }
  return false;
}

canvas.addEventListener("pointermove", function (event) {
  const index = pointerTeams.get(event.pointerId);
  if (index !== undefined && shots[index]) {
    const point = canvasPoint(event);
    shots[index].pullX = point.x;
    shots[index].pullY = point.y;
  }
});

function releasePointer(event, shoot) {
  const index = pointerTeams.get(event.pointerId);
  if (index === undefined) {
    return;
  }
  pointerTeams.delete(event.pointerId);
  if (shots[index] && shots[index].source === "pointer") {
    if (shoot) {
      fire(index);
    } else {
      shots[index] = null;
    }
  }
}

canvas.addEventListener("pointerup", event => releasePointer(event, true));
canvas.addEventListener("pointercancel", event => releasePointer(event, false));

// --- Keyboard ---
// Uses physical key positions (event.code), so WASD also works on AZERTY keyboards.

const KEY_SCHEMES = [
  { left: "KeyA", right: "KeyD", charge: "KeyW", switch: "KeyS" },
  { left: "ArrowLeft", right: "ArrowRight", charge: "ArrowUp", switch: "ArrowDown" },
];

const keysDown = new Set();
const keysPressed = new Set();   // pressed this frame

// Keyboard aim per team: angle (radians, null = not aiming yet), charge power, last use
const keyAim = [
  { angle: null, power: 0, charging: false, chargingScheme: null, lastUsed: -Infinity },
  { angle: null, power: 0, charging: false, chargingScheme: null, lastUsed: -Infinity },
];

window.addEventListener("keydown", function (event) {
  if (event.code.startsWith("Arrow") || event.code === "Space") {
    event.preventDefault();
  }
  unlockAudio();
  if (!event.repeat) {
    keysPressed.add(event.code);
  }
  keysDown.add(event.code);
});

window.addEventListener("keyup", event => keysDown.delete(event.code));
window.addEventListener("blur", () => keysDown.clear());

// Which team does each keyboard scheme control?
// With a single local team (vs CPU, online) both schemes control it.
function schemeTeam(schemeIndex) {
  const teams = localTeams();
  return teams.length === 1 ? teams[0] : schemeIndex;
}

function updateKeyboard() {
  for (let s = 0; s < KEY_SCHEMES.length; s++) {
    const keys = KEY_SCHEMES[s];
    const index = schemeTeam(s);
    const aim = keyAim[index];
    const busy = shots[index] && shots[index].source !== "keys";
    if (!canTeamPlay(index) || busy) {
      if (aim.charging && !busy) shots[index] = null;
      aim.charging = false;
      aim.power = 0;
      continue;
    }

    if (keysPressed.has(keys.switch)) {
      selectNextChip(index, 1);
      aim.lastUsed = performance.now();
    }

    const chip = selectedChip(game.teams[index]);
    const turning = (keysDown.has(keys.right) ? 1 : 0) - (keysDown.has(keys.left) ? 1 : 0);
    if (turning !== 0) {
      if (aim.angle === null) aim.angle = defaultAimAngle(chip);
      aim.angle += turning * KEY_AIM_SPEED;
      aim.lastUsed = performance.now();
    }

    if (keysDown.has(keys.charge) && canShoot(chip)) {
      if (aim.angle === null) aim.angle = defaultAimAngle(chip);
      aim.charging = true;
      aim.chargingScheme = s;
      aim.power = Math.min(MAX_SHOT_POWER, aim.power + MAX_SHOT_POWER / (60 * KEY_CHARGE_SECONDS));
      aim.lastUsed = performance.now();
      shots[index] = shotFromAngle(chip, aim.angle, Math.max(aim.power, 1.5), "keys");
    } else if (aim.charging && aim.chargingScheme === s) {
      aim.charging = false;
      aim.power = 0;
      if (shots[index] && shots[index].source === "keys") {
        fire(index);
      }
    }
  }
}

// By default, aim at the ball
function defaultAimAngle(chip) {
  return Math.atan2(game.ball.y - chip.y, game.ball.x - chip.x);
}

function clearPressedKeys() {
  keysPressed.clear();
}
