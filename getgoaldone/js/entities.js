// Chips, balls and teams.

function createChip(name, color, style) {
  return {
    name: name,
    color: color,
    style: style || "classic",
    x: 0, y: 0,
    vx: 0, vy: 0,
    radius: CHIP_RADIUS,
    mass: CHIP_MASS,
    bounce: BOUNCE,
    friction: FRICTION,
    role: null,            // "defender" | "attacker" | null (player-controlled)
  };
}

function createBall(color, skin) {
  return {
    isBall: true,
    color: color || "white",
    skin: skin || "classic",
    x: CENTER_X, y: CENTER_Y,
    vx: 0, vy: 0,
    radius: BALL_RADIUS,
    mass: BALL_MASS,
    bounce: BOUNCE,
    friction: FRICTION,
    onFire: 0,             // seconds left burning after a cannon hit
  };
}

// options: { colorId, nameKey, name, player, side, style, chipNames }
function createTeam(options) {
  const color = colorById(options.colorId).value;
  return {
    colorId: options.colorId,
    color: color,
    nameKey: options.nameKey || "team." + options.colorId,
    name: options.name || "",       // the team's own name, if the player gave it one in Settings
    player: options.player || "",   // the person playing it, if they typed a name
    side: options.side,              // the goal this team defends: "left" | "right"
    goals: 0,
    selected: 0,                     // index of the chip the player controls
    chips: options.chipNames.map(name => createChip(name, color, options.style)),
  };
}

// The team's name (its own, or its colour's: "Red Rockets"), with the player's name if we know it
// ("Martín's Red Rockets"). Used everywhere: scoreboard, goals, the commentator and the winner.
function teamName(team) {
  const name = team.name || t(team.nameKey);
  return team.player ? t("team.of", { name: team.player, team: name }) : name;
}

function randomChipNames(count, taken) {
  const pool = CHIP_NAMES[language].filter(name => !taken.includes(name));
  const names = [];
  for (let i = 0; i < count; i++) {
    const name = pickRandom(pool);
    names.push(name);
    pool.splice(pool.indexOf(name), 1);
  }
  return names;
}

// Kick-off positions, written for the left team (x: 0 own goal → 1 other goal) and mirrored for the right.
const KICKOFF_SPOTS = [
  { x: 0.1, y: 0.5 },     // defender, covering the goal
  { x: 0.27, y: 0.25 },
  { x: 0.42, y: 0.5 },    // striker, near the centre
];

function placeTeam(team) {
  team.chips.forEach((chip, i) => {
    const spot = KICKOFF_SPOTS[i];
    const x = team.side === "right" ? 1 - spot.x : spot.x;
    chip.x = LEFT + x * FIELD_WIDTH;
    chip.y = TOP + spot.y * FIELD_HEIGHT;
    chip.vx = 0;
    chip.vy = 0;
  });
}

function penaltyBoxOf(team) {
  const left = team.side === "right" ? RIGHT - BOX_WIDTH : LEFT;
  return { left: left, top: CENTER_Y - BOX_HEIGHT / 2 };
}
