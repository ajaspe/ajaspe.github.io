// Game configuration: every tunable number lives here.

// Shown small in the menu. Bump it with every release and add the changes to CHANGELOG.md:
// 2.0.1 for small fixes and tweaks, 2.1.0 for new features, 3.0.0 for big changes.
const GAME_VERSION = "2.0.0";

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
// Pace of the action: 1 = original. Chips, balls, teammates and the CPU all go this much faster;
// the match clock and power-up timers stay in real seconds.
const GAME_SPEED = 1.25;
const MAX_MOVE_PER_SUBSTEP = 12; // fast bodies move in smaller substeps so they can't jump through each other

// --- Teammate AI ---
const DEFENDER_POSITION = 0.35;  // 0 = on the goal line, 1 = on the ball
const ATTACKER_DISTANCE = 50;    // how far behind the ball the attacker waits

// --- CPU opponent ---
// thinkFrames: delay before each shot (min, max, at 60 fps)
// aimError: random aim error in radians
// smart: picks the best chip and shot (wall bounces, clearances, a rolling ball) instead of
// pushing the ball from the closest chip
const CPU_LEVELS = {
  easy:   { thinkFrames: [90, 180], aimError: 0.35, smart: false },
  normal: { thinkFrames: [45, 95],  aimError: 0.12, smart: true },
  hard:   { thinkFrames: [25, 55],  aimError: 0.06, smart: true },
  expert: { thinkFrames: [12, 35],  aimError: 0.03, smart: true },
};
const CPU_AIM_FRAMES = 35;       // how long the CPU's aim arrow is shown before it shoots
const CPU_MIN_CUT = 0.4;         // steepest cut the CPU tries (cosine: 1 = only right behind the ball)
const CPU_LAST_RESORT_CUT = 0.1; // ...and when it has waited long enough for a better one
const CPU_BANK_VALUE = 0.7;      // how much it likes a shot off the wall compared to a straight one
const CPU_CLEAR_VALUE = 0.35;    // ...and just clearing the ball forward
const CPU_MAX_BALL_SPEED = 3;    // the smart CPU doesn't shoot at a ball going faster than this
const CPU_WAIT_FRAMES = 20;     // with no good shot, look again this much later...
const CPU_MAX_WAITS = 4;         // ...but not more times than this; then it just hits the ball

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

// --- Mega chip power-up 🍄 ---
const MEGA_SPAWN_SECONDS = [25, 40];
const MEGA_ICON_SECONDS = 10;
const MEGA_SECONDS = 15;
const MEGA_SCALE = 1.7;          // your chips grow this much...
const MEGA_MASS = 2.5;           // ...and get this much heavier
const MEGA_ICON_RADIUS = 20;

// --- Cannon power-up 💥 ---
const CANNON_SPAWN_SECONDS = [25, 40];
const CANNON_ICON_SECONDS = 10;
const CANNON_SECONDS = 20;       // cannon shots not used by then are lost
const CANNON_SHOTS = 3;
const CANNON_POWER = 1.8;        // shot power multiplier
const CANNON_FIRE_SECONDS = 1.5; // the ball burns this long after a cannon hit
const CANNON_ICON_RADIUS = 20;

// --- Defence wall power-up 🧱 ---
const WALL_SPAWN_SECONDS = [25, 40];
const WALL_ICON_SECONDS = 10;
const WALL_SECONDS = 15;
const WALL_LENGTH = 90;          // covers about half of a normal goal
const WALL_THICKNESS = 16;
const WALL_PERIOD_SECONDS = 3;   // time to slide down and back up again
const WALL_ICON_RADIUS = 20;

// --- Ball Frenzy 🤪 (and the Armageball tie-break ☄️ when it's a draw at full time) ---
const CRAZY_INTRO_SECONDS = 3;
const CRAZY_SECONDS = 20;
const CRAZY_RESULT_SECONDS = 4;
const CRAZY_BALLS = 15;
const CRAZY_BALLS_ULTIMATE = 22;
const CRAZY_BOUNCE = 0.93;
const CRAZY_FRICTION = 0.993;
const CRAZY_LAUNCH_SPEED = [7, 13];
const CRAZY_ICON_RADIUS = 22;
const GAUGE_MAX_TILT = 1.25;     // radians the needle leans at most towards the leader (~70°)
const GAUGE_LEAD_FOR_FULL_TILT = 4;   // a lead of this many points leans it most of the way
const GAUGE_SPRING = 90;         // how hard the needle is pulled to where it should point...
const GAUGE_DAMPING = 7;         // ...and how fast its swinging dies down

// --- Match ---
const GOALS_TO_WIN = 10;
const CELEBRATION_FRAMES = 120;
const MATCH_MINUTES = [1, 2, 3];
const DEFAULT_MINUTES = 2;
const TUTORIAL_HINT_SECONDS = 15;
const COUNTDOWN_SECONDS = 3;     // "you are this team" screen before every match
const KICKOFF_AUTO_SECONDS = 5;  // the clock waits for the kick-off; after this the chip kicks off by itself
const KICKOFF_AUTO_POWER = 8;

// --- Main loop ---
const STEP_SECONDS = 1 / 60;     // the simulation runs at 60 steps per second on any screen
const MAX_CANVAS_PIXEL_WIDTH = 2880;   // sharp on big and high-DPI screens, but not too slow

// --- Touch ---
const TOUCH_GRAB_PIXELS = 30;    // a finger this close (screen pixels) to the edge of a chip still grabs it

// --- Audio ---
const MASTER_VOLUME = 0.8;
const MUSIC_VOLUME = 0.25;
const CROWD_VOLUME = 0.15;
const MUSIC_STEP_START = 0.28;   // seconds per music step at kick-off...
const MUSIC_STEP_END = 0.15;     // ...and at the final whistle

// --- Commentator ---
const COMMENTATOR_VOICES = ["human", "robot", "off"];
// Speech synthesis can only change speed and pitch, so that's how the lines get their feeling.
// A little randomness on top keeps the same line from sounding identical every time.
const VOICE_MOODS = {
  excited: { rate: 1.1,  pitch: 1.2 },
  happy:   { rate: 1.05, pitch: 1.1 },
  sad:     { rate: 0.85, pitch: 0.7 },
  robot:   { rate: 0.9,  pitch: 0.1 },
};
const VOICE_MOOD_JITTER = 0.06;
const LINE_MOODS = { ownGoal: "sad", crazyTie: "sad", finalDraw: "happy", crazyTieUltimate: "happy" };   // the rest: excited

// --- Platform ---
const MIDGAME_AD_INTERVAL_MS = 3 * 60 * 1000;

// --- Players ---
const NAME_MAX_LENGTH = 18;      // a player's (or team's) name

// --- Online ---
const ONLINE_CONNECT_TIMEOUT_MS = 15000;
// null = PeerJS defaults (Google STUN; its free TURN relay no longer exists). To add a relay:
// [{ urls: "stun:stun.l.google.com:19302" }, { urls: "turn:host:3478", username: "...", credential: "..." }]
const ONLINE_ICE_SERVERS = null;

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
