// Game configuration: every tunable number lives here.

// --- Field geometry (canvas pixels) ---
const FIELD_WIDTH = 1000;
const FIELD_HEIGHT = 560;
const MARGIN = 60;               // room around the field for the HUD and the goals

const GOAL_HEIGHT = 170;
const GOAL_DEPTH = 35;
const BOX_WIDTH = 130;           // penalty box (decoration only)
const BOX_HEIGHT = 320;

// --- Chips and ball ---
const CHIP_RADIUS = 22;
const BALL_RADIUS = 12;
const CHIP_MASS = 1;
const BALL_MASS = 0.5;

// --- Physics ---
const FRICTION = 0.985;          // velocity multiplier per frame
const BOUNCE = 0.8;              // restitution
const SHOT_POWER_PER_PIXEL = 0.12;
const MAX_SHOT_POWER = 18;
const MAX_PULL_DISTANCE = MAX_SHOT_POWER / SHOT_POWER_PER_PIXEL;
const WALK_SPEED = 0.8;          // AI-controlled chips walk this fast
const MAX_SPEED_TO_SHOOT = 1.5;  // a chip can only be flicked when (almost) stopped

// --- Teammate AI ---
const DEFENDER_POSITION = 0.35;  // 0 = on the goal line, 1 = on the ball
const ATTACKER_DISTANCE = 50;    // how far behind the ball the attacker waits

// --- CPU opponent ---
// thinkFrames: delay before each shot (min, max, at 60 fps)
// aimError: random aim error in radians
const CPU_LEVELS = {
  easy:   { thinkFrames: [90, 180], aimError: 0.35 },
  normal: { thinkFrames: [50, 110], aimError: 0.18 },
  hard:   { thinkFrames: [25, 60],  aimError: 0.08 },
  expert: { thinkFrames: [15, 40],  aimError: 0.04 },
};
const CPU_AIM_FRAMES = 35;       // how long the CPU's aim arrow is shown before it shoots

// --- Keyboard aiming ---
const KEY_AIM_SPEED = 0.05;      // radians per frame
const KEY_CHARGE_SECONDS = 1.0;  // time to reach full power
const KEY_AIM_GUIDE_SECONDS = 3; // the aim guide stays visible this long after a key press

// --- Freeze power-up ⏰ ---
const FREEZE_SPAWN_SECONDS = [15, 25];
const FREEZE_ICON_SECONDS = 10;
const FREEZE_SECONDS = 10;
const FREEZE_ICON_RADIUS = 18;

// --- Big goal power-up 🥅 ---
const BIG_GOAL_SPAWN_SECONDS = [20, 35];
const BIG_GOAL_ICON_SECONDS = 10;
const BIG_GOAL_SECONDS = 20;
const BIG_GOAL_HEIGHT = 320;
const BIG_GOAL_ICON_RADIUS = 20;

// --- Crazy Martini 🤪 ---
const CRAZY_INTRO_SECONDS = 3;
const CRAZY_SECONDS = 20;
const CRAZY_RESULT_SECONDS = 4;
const CRAZY_BALLS = 15;
const CRAZY_BALLS_ULTIMATE = 22;
const CRAZY_BOUNCE = 0.93;
const CRAZY_FRICTION = 0.993;
const CRAZY_LAUNCH_SPEED = [7, 13];
const CRAZY_ICON_RADIUS = 22;

// --- Match ---
const GOALS_TO_WIN = 10;
const CELEBRATION_FRAMES = 120;
const MATCH_MINUTES = [1, 2, 3];
const DEFAULT_MINUTES = 2;
const TUTORIAL_HINT_SECONDS = 15;

// --- Audio ---
const MASTER_VOLUME = 0.8;
const MUSIC_VOLUME = 0.25;
const CROWD_VOLUME = 0.15;
const MUSIC_STEP_START = 0.28;   // seconds per music step at kick-off...
const MUSIC_STEP_END = 0.15;     // ...and at the final whistle

// --- Platform ---
const MIDGAME_AD_INTERVAL_MS = 3 * 60 * 1000;

// --- Team colors ---
const TEAM_COLORS = [
  { id: "red",    value: "#e53935" },
  { id: "blue",   value: "#1e88e5" },
  { id: "yellow", value: "#fdd835" },
  { id: "white",  value: "#fafafa" },
  { id: "black",  value: "#212121" },
  { id: "purple", value: "#8e24aa" },
  { id: "orange", value: "#fb8c00" },
  { id: "pink",   value: "#f06292" },
];

// --- Cosmetics (unlocked by winning cup matches) ---
const CHIP_STYLES = ["classic", "stripes", "star", "bolt", "crown"];
const BALL_SKINS = ["classic", "beach", "fire", "gold"];

// --- The Cup: five CPU opponents, each harder than the last ---
const CUP_OPPONENTS = [
  { id: "snails",  colorId: "pink",   altColorId: "yellow", level: "easy",   reward: { kind: "chipStyle", id: "stripes" } },
  { id: "pandas",  colorId: "white",  altColorId: "orange", level: "normal", reward: { kind: "ballSkin",  id: "beach" } },
  { id: "tigers",  colorId: "orange", altColorId: "purple", level: "normal", reward: { kind: "chipStyle", id: "star" } },
  { id: "sharks",  colorId: "black",  altColorId: "blue",   level: "hard",   reward: { kind: "ballSkin",  id: "fire" } },
  { id: "robots",  colorId: "purple", altColorId: "red",    level: "expert", reward: { kind: "chipStyle", id: "crown" } },
];
const CUP_FINAL_BONUS = { kind: "ballSkin", id: "gold" };
const WINS_REWARD = { kind: "chipStyle", id: "bolt", wins: 10 };   // for quick-match players too
const CUP_MINUTES = 2;

// --- Derived geometry ---
const LEFT = MARGIN;
const RIGHT = MARGIN + FIELD_WIDTH;
const TOP = MARGIN;
const BOTTOM = MARGIN + FIELD_HEIGHT;
const CENTER_X = MARGIN + FIELD_WIDTH / 2;
const CENTER_Y = MARGIN + FIELD_HEIGHT / 2;
const CANVAS_WIDTH = FIELD_WIDTH + 2 * MARGIN;
const CANVAS_HEIGHT = FIELD_HEIGHT + 2 * MARGIN;

function colorById(id) {
  return TEAM_COLORS.find(color => color.id === id) || TEAM_COLORS[0];
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
