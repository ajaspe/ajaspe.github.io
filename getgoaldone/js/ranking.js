// Online ranking (Elo) on Supabase, through its REST API (no library needed).
// Players are anonymous Supabase users, created lazily the first time they open
// the Online or Ranking pages. All rating logic runs on the server (supabase/schema.sql).

const SUPABASE_URL = "https://qafpxbkwgdetilifwwat.supabase.co";
const SUPABASE_KEY = "sb_publishable_wx6kp81OY2JSWTwgU2fciQ_p8C2O521";   // publishable: safe in client code
const AUTH_STORAGE_KEY = "getGoalDone.auth";

const Ranking = {
  session: null,          // { access_token, refresh_token, expires_at }
  profile: null,          // { nickname, rating, games, wins } or null if no nickname yet
  profileLoaded: false,
  available: true,        // false if the server can't be reached
  match: null,            // the rated match being played: { id, role, reported, outcome }

  async call(path, options) {
    const headers = { "apikey": SUPABASE_KEY, "Content-Type": "application/json" };
    if (options && options.auth && this.session) {
      headers["Authorization"] = "Bearer " + this.session.access_token;
    }
    const response = await fetch(SUPABASE_URL + path, {
      method: (options && options.method) || "POST",
      headers: headers,
      body: options && options.body ? JSON.stringify(options.body) : undefined,
    });
    const text = await response.text();
    const data = text ? JSON.parse(text) : null;
    if (!response.ok) {
      const message = (data && (data.message || data.msg || data.error_description)) || ("HTTP " + response.status);
      throw new Error(message);
    }
    return data;
  },

  // --- Session (anonymous user, kept in this browser) ---

  async ensureSession() {
    if (!this.session) {
      try {
        this.session = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY));
      } catch (error) {
        this.session = null;
      }
    }
    const now = Math.floor(Date.now() / 1000);
    if (this.session && this.session.expires_at - 60 > now) {
      return;
    }
    let data = null;
    if (this.session && this.session.refresh_token) {
      try {
        data = await this.call("/auth/v1/token?grant_type=refresh_token", { body: { refresh_token: this.session.refresh_token } });
      } catch (error) {
        data = null;   // refresh token no longer valid: start a new anonymous player
      }
    }
    if (!data) {
      data = await this.call("/auth/v1/signup", { body: {} });
    }
    this.session = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: data.expires_at || now + data.expires_in,
    };
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(this.session));
    } catch (error) {
      // the session just won't survive a reload
    }
  },

  async rpc(name, args) {
    await this.ensureSession();
    return this.call("/rest/v1/rpc/" + name, { body: args || {}, auth: true });
  },

  // --- Profile ---

  async loadProfile() {
    try {
      this.profile = await this.rpc("my_profile");
      this.available = true;
    } catch (error) {
      this.available = false;
    }
    this.profileLoaded = true;
    return this.profile;
  },

  // Returns null on success, or an i18n key describing the problem
  async setNickname(nickname) {
    try {
      this.profile = await this.rpc("set_nickname", { p_nickname: nickname });
      return null;
    } catch (error) {
      if (/taken/.test(error.message)) return "ranking.errorTaken";
      if (/inappropriate/.test(error.message)) return "ranking.errorInappropriate";
      if (/invalid/.test(error.message)) return "ranking.errorInvalid";
      return "ranking.errorNetwork";
    }
  },

  leaderboard() {
    return this.rpc("leaderboard");
  },

  // --- Rated online matches ---

  // Host: open a rated match and tell the guest its id
  async hostMatch() {
    this.match = null;
    if (!this.profile) return;
    try {
      const id = await this.rpc("create_match");
      this.match = { id: id, role: "host", reported: false, outcome: null };
      Net.send({ t: "rated", id: id });
    } catch (error) {
      this.match = null;
    }
  },

  // Guest: join the host's rated match
  async joinMatch(id) {
    this.match = null;
    if (!this.profileLoaded) await this.loadProfile();
    if (!this.profile) return;
    try {
      await this.rpc("join_match", { p_match: id });
      this.match = { id: id, role: "guest", reported: false, outcome: null };
    } catch (error) {
      this.match = null;
    }
  },

  // Report the final score; forfeitBy is "host" / "guest" when someone left
  async report(forfeitBy) {
    const match = this.match;
    if (!match || match.reported) return;
    match.reported = true;
    const [host, guest] = game.teams;
    try {
      match.outcome = await this.rpc("report_result", {
        p_match: match.id, p_host_goals: host.goals, p_guest_goals: guest.goals, p_forfeit_by: forfeitBy || null,
      });
      // The other player may not have reported yet: check again a few times
      for (const wait of [2000, 4000, 8000]) {
        if (match.outcome.status !== "playing") break;
        showRatingOutcome();
        await new Promise(resolve => setTimeout(resolve, wait));
        match.outcome = await this.rpc("match_status", { p_match: match.id });
      }
    } catch (error) {
      match.outcome = { status: "error" };
    }
    if (match.outcome && match.outcome.status === "done") {
      await this.loadProfile();
    }
    showRatingOutcome();
  },
};
