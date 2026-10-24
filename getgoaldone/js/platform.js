// Platform layer: CrazyGames SDK v3 when running on CrazyGames, harmless no-ops everywhere
// else (local file, own website...). The game never calls the SDK directly.

const CRAZYGAMES_SDK_URL = "https://sdk.crazygames.com/crazygames-sdk-v3.js";

// The SDK is only loaded on CrazyGames, or when testing it with ?platform=crazygames
function isCrazyGamesHost() {
  const params = new URLSearchParams(location.search);
  return /(^|\.)crazygames\./.test(location.hostname) ||
         params.get("platform") === "crazygames" ||
         params.has("useLocalSdk");
}

function loadScript(url, timeoutMs) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const timer = setTimeout(() => reject(new Error("timeout loading " + url)), timeoutMs);
    script.src = url;
    script.onload = () => { clearTimeout(timer); resolve(); };
    script.onerror = () => { clearTimeout(timer); reject(new Error("failed loading " + url)); };
    document.head.appendChild(script);
  });
}

const Platform = {
  sdk: null,
  inGameplay: false,
  lastAdTime: 0,
  muted: false,

  async init() {
    try {
      if (isCrazyGamesHost()) {
        await loadScript(CRAZYGAMES_SDK_URL, 5000);
      }
      if (window.CrazyGames && window.CrazyGames.SDK) {
        // Never let a slow or failing SDK block the game from starting
        const timeout = new Promise((resolve, reject) => setTimeout(() => reject(new Error("SDK timeout")), 3000));
        await Promise.race([window.CrazyGames.SDK.init(), timeout]);
        const environment = window.CrazyGames.SDK.environment;
        if (environment === "crazygames" || environment === "local") {
          this.sdk = window.CrazyGames.SDK;
          this.muted = Boolean(this.sdk.game.settings && this.sdk.game.settings.muteAudio);
          this.sdk.game.addSettingsChangeListener(settings => {
            this.muted = Boolean(settings.muteAudio);
          });
        }
      }
    } catch (error) {
      this.sdk = null;   // the game works without the SDK
    }
    this.lastAdTime = Date.now();   // no ad in the first minutes of a session
  },

  call(action) {
    if (!this.sdk) return;
    try {
      action(this.sdk);
    } catch (error) {
      // never let the platform break the game
    }
  },

  loadingStart() { this.call(sdk => sdk.game.loadingStart()); },
  loadingStop() { this.call(sdk => sdk.game.loadingStop()); },

  gameplayStart() {
    if (this.inGameplay) return;
    this.inGameplay = true;
    this.call(sdk => sdk.game.gameplayStart());
  },

  gameplayStop() {
    if (!this.inGameplay) return;
    this.inGameplay = false;
    this.call(sdk => sdk.game.gameplayStop());
  },

  happytime() { this.call(sdk => sdk.game.happytime()); },

  // Invite links for online rooms: CrazyGames builds its own, elsewhere ?room=CODE
  inviteLink(roomCode) {
    if (this.sdk) {
      try {
        return this.sdk.game.inviteLink({ room: roomCode });
      } catch (error) {
        // fall back to a plain link
      }
    }
    return location.origin + location.pathname + "?room=" + roomCode;
  },

  invitedRoom() {
    if (this.sdk) {
      try {
        const room = this.sdk.game.getInviteParam("room");
        if (room) return room;
      } catch (error) {
        // fall back to the URL
      }
    }
    return new URLSearchParams(location.search).get("room");
  },

  // Midgame ad at a natural break (between matches), at most every few minutes.
  // Resolves when the game can continue, whether an ad played or not.
  showBreakAd() {
    return new Promise(resolve => {
      if (!this.sdk || Date.now() - this.lastAdTime < MIDGAME_AD_INTERVAL_MS) {
        resolve();
        return;
      }
      this.lastAdTime = Date.now();
      const done = () => {
        resumeAudioAfterAd();
        resolve();
      };
      try {
        this.sdk.ad.requestAd("midgame", {
          adStarted: () => pauseAudioForAd(),
          adFinished: done,
          adError: done,
        });
      } catch (error) {
        done();
      }
    });
  },

  // Cloud saves for logged-in CrazyGames players; localStorage otherwise
  loadData(key) {
    try {
      if (this.sdk && this.sdk.environment === "crazygames") {
        return this.sdk.data.getItem(key);
      }
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  },

  saveData(key, value) {
    try {
      if (this.sdk && this.sdk.environment === "crazygames") {
        this.sdk.data.setItem(key, value);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (error) {
      // saving is best-effort
    }
  },
};

function platformMuted() {
  return Platform.muted;
}
