// Controllers (standard gamepad mapping).
// Against the CPU any controller plays for the human team. In 2-player mode the first
// controller to press a button becomes P1 and the next one P2 (Steam can expose "ghost"
// duplicates of a controller, so a short delay stops one press from claiming both slots).

const PAD_A = 0;
const PAD_LB = 4;
const PAD_RB = 5;
const PAD_RT = 7;
const PAD_START = 9;
const PAD_UP = 12;
const PAD_DOWN = 13;
const PAD_LEFT = 14;
const PAD_RIGHT = 15;
const STICK_DEAD_ZONE = 0.2;
const PAD_CLAIM_DELAY_MS = 500;

const padOwner = [null, null];        // gamepad index assigned to each team (2-player mode)
let rememberedPads = [null, null];    // { index, id } from a previous session
let lastClaimTime = 0;
const previousButtons = {};

function connectedPads() {
  return [...navigator.getGamepads()].filter(pad => pad !== null);
}

function isPressed(pad, button) {
  return Boolean(pad.buttons[button] && pad.buttons[button].pressed);
}

function justPressed(pad, button) {
  const before = previousButtons[pad.index] || [];
  return isPressed(pad, button) && !before[button];
}

function anyButtonJustPressed(pad) {
  return pad.buttons.some((button, i) => button.pressed && !(previousButtons[pad.index] || [])[i]);
}

function stickDirection(pad) {
  let x = pad.axes[0] || 0;
  let y = pad.axes[1] || 0;
  if (Math.hypot(x, y) < STICK_DEAD_ZONE) {
    x = 0;
    y = 0;
  }
  if (isPressed(pad, PAD_LEFT)) x = -1;
  if (isPressed(pad, PAD_RIGHT)) x = 1;
  if (isPressed(pad, PAD_UP)) y = -1;
  if (isPressed(pad, PAD_DOWN)) y = 1;
  return { x: x, y: y };
}

// The team a controller plays for, or null
function teamOfPad(pad) {
  const teams = localTeams();
  if (teams.length === 1) {
    return teams[0];   // vs CPU or online: every controller plays for our team
  }
  const owner = padOwner.indexOf(pad.index);
  return owner === -1 ? null : owner;
}

function claimPads() {
  if (localTeams().length === 1) {
    return;
  }
  for (const pad of connectedPads()) {
    if (padOwner.includes(pad.index)) {
      continue;
    }
    // A controller remembered from last time gets its slot back automatically
    const remembered = rememberedPads.findIndex(r => r && r.index === pad.index && r.id === pad.id);
    if (remembered !== -1 && padOwner[remembered] === null) {
      padOwner[remembered] = pad.index;
      continue;
    }
    const freeSlot = padOwner.indexOf(null);
    const now = performance.now();
    if (freeSlot !== -1 && anyButtonJustPressed(pad) && now - lastClaimTime > PAD_CLAIM_DELAY_MS) {
      padOwner[freeSlot] = pad.index;
      lastClaimTime = now;
      saveControllers();
    }
  }
}

function resetPads() {
  padOwner[0] = null;
  padOwner[1] = null;
  rememberedPads = [null, null];
  saveControllers();
}

function padsForSaving() {
  const pads = navigator.getGamepads();
  return padOwner.map((index, slot) => {
    if (index !== null && pads[index]) {
      return { index: index, id: pads[index].id };
    }
    return rememberedPads[slot];
  });
}

// Aim with the stick, shoot with A / RT, switch chip with LB / RB
function updateGamepads() {
  claimPads();
  for (const pad of connectedPads()) {
    const index = teamOfPad(pad);
    if (index === null || !isLocalTeam(index)) {
      continue;
    }
    if (shots[index] && shots[index].source !== "pad" && shots[index].pad !== pad.index) {
      continue;   // another device is aiming for this team
    }
    if (!canTeamPlay(index)) {
      if (shots[index] && shots[index].pad === pad.index) shots[index] = null;
      continue;
    }

    if (justPressed(pad, PAD_RB)) selectNextChip(index, 1);
    if (justPressed(pad, PAD_LB)) selectNextChip(index, -1);

    const chip = selectedChip(game.teams[index]);
    const stick = stickDirection(pad);
    const aiming = stick.x !== 0 || stick.y !== 0;
    if (aiming && canShoot(chip)) {
      // The arrow points where the stick points; push further for more power
      const power = Math.min(1, Math.hypot(stick.x, stick.y)) * MAX_SHOT_POWER;
      shots[index] = shotFromAngle(chip, Math.atan2(stick.y, stick.x), power, "pad");
      shots[index].pad = pad.index;
    } else if (shots[index] && shots[index].pad === pad.index) {
      shots[index] = null;
    }

    if ((justPressed(pad, PAD_A) || justPressed(pad, PAD_RT)) && shots[index] && shots[index].pad === pad.index) {
      fire(index);
    }
  }
}

// For menus: did any controller just press this button?
function anyPadJustPressed(button) {
  return connectedPads().some(pad => justPressed(pad, button));
}

function controllerNames() {
  const pads = navigator.getGamepads();
  return padOwner.map(index => (index !== null && pads[index]) ? pads[index].id : null);
}

function rememberPadButtons() {
  for (const pad of connectedPads()) {
    previousButtons[pad.index] = pad.buttons.map(button => button.pressed);
  }
}
