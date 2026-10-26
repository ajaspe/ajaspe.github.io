// Saved settings and progress.

const SAVE_KEY = "getGoalDone.save.v1";

function defaultSave() {
  return {
    settings: {
      language: null,            // null = follow the browser
      sound: true,
      music: true,
      level: "normal",
      minutes: DEFAULT_MINUTES,
      // name: the team's own name (Settings; empty = its colour's name). player: who plays it (start screen).
      team1: { colorId: "red", name: "", player: "" },
      team2: { colorId: "blue", name: "", player: "" },
      pads: [null, null],
    },
    progress: {
      cupStage: 0,               // next cup match (0-4)
      cupsWon: 0,
      unlockedStyles: ["classic"],
      unlockedBalls: ["classic"],
      chipStyle: "classic",
      ballSkin: "classic",
      matches: 0,
      wins: 0,
      goals: 0,
      tutorialShots: 0,          // the tutorial hint disappears after a few shots
    },
  };
}

let save = defaultSave();

function loadSave() {
  try {
    const stored = JSON.parse(Platform.loadData(SAVE_KEY));
    if (stored) {
      const fresh = defaultSave();
      save = {
        settings: Object.assign(fresh.settings, stored.settings),
        progress: Object.assign(fresh.progress, stored.progress),
      };
      delete save.settings.voice;   // the old commentator setting
      for (const team of [save.settings.team1, save.settings.team2]) {
        if (team.player === undefined) {   // older saves kept the player's name as the team's name
          team.player = team.name || "";
          team.name = "";
        }
      }
    }
  } catch (error) {
    save = defaultSave();
  }
  if (save.settings.language) {
    setLanguage(save.settings.language);
  }
  rememberedPads = save.settings.pads || [null, null];
}

function persist() {
  Platform.saveData(SAVE_KEY, JSON.stringify(save));
}

function saveControllers() {
  save.settings.pads = padsForSaving();
  persist();
}

function unlock(reward) {
  const list = reward.kind === "chipStyle" ? save.progress.unlockedStyles : save.progress.unlockedBalls;
  if (list.includes(reward.id)) {
    return false;
  }
  list.push(reward.id);
  return true;
}

function isUnlocked(kind, id) {
  const list = kind === "chipStyle" ? save.progress.unlockedStyles : save.progress.unlockedBalls;
  return list.includes(id);
}
