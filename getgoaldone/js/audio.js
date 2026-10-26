// Audio: everything is synthesized with Web Audio (no sound files), plus speech synthesis
// for the commentator.

let audioCtx = null;
let masterGain = null;
let musicGain = null;
let crowdGain = null;
let crowdFilter = null;
let noiseBuffer = null;
let adPlaying = false;

function soundEnabled() {
  return save.settings.sound && !platformMuted() && !adPlaying;
}

// Browsers only allow audio after a user gesture: called on the first click / key / touch.
function unlockAudio() {
  if (audioCtx) {
    if (audioCtx.state === "suspended" && !adPlaying) audioCtx.resume();
    return;
  }
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return;
  }
  audioCtx = new AudioContextClass();
  masterGain = audioCtx.createGain();
  masterGain.connect(audioCtx.destination);
  musicGain = audioCtx.createGain();
  musicGain.gain.value = 0;
  musicGain.connect(masterGain);
  noiseBuffer = createNoise();
  setUpCrowd();
}

// Ads must play in silence
function pauseAudioForAd() {
  adPlaying = true;
  stopCommentator();
  if (audioCtx) audioCtx.suspend();
}

function resumeAudioAfterAd() {
  adPlaying = false;
  if (audioCtx && !document.hidden) audioCtx.resume();
}

// Silence in a background tab (the crowd is a loop that would keep going)
document.addEventListener("visibilitychange", function () {
  if (!audioCtx) return;
  if (document.hidden) {
    stopCommentator();
    audioCtx.suspend();
  } else if (!adPlaying) {
    audioCtx.resume();
  }
});

function createNoise() {
  const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 2, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

function midiToFrequency(note) {
  return 440 * Math.pow(2, (note - 69) / 12);
}

// A note with a quick attack and an exponential decay
function playTone(frequency, when, duration, volume, waveform, destination) {
  const osc = audioCtx.createOscillator();
  osc.type = waveform;
  osc.frequency.value = frequency;
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, when);
  gain.gain.linearRampToValueAtTime(volume, when + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + duration);
  osc.connect(gain);
  gain.connect(destination || masterGain);
  osc.start(when);
  osc.stop(when + duration + 0.05);
  return osc;
}

function noiseHit(when, filterType, frequency, duration, volume, destination) {
  const source = audioCtx.createBufferSource();
  source.buffer = noiseBuffer;
  const filter = audioCtx.createBiquadFilter();
  filter.type = filterType;
  filter.frequency.value = frequency;
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(volume, when);
  gain.gain.exponentialRampToValueAtTime(0.001, when + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(destination || masterGain);
  source.start(when);
  source.stop(when + duration + 0.01);
}

function kickDrum(when, volume, destination) {
  const osc = playTone(150, when, 0.3, volume || 0.6, "sine", destination);
  osc.frequency.exponentialRampToValueAtTime(40, when + 0.25);
}

function hiHat(when, volume, destination) {
  noiseHit(when, "highpass", 7000, 0.05, volume || 0.15, destination);
}

function snare(when, volume, destination) {
  noiseHit(when, "bandpass", 1800, 0.15, volume || 0.4, destination);
}

// --- Crowd: filtered noise with a slow murmur; louder and brighter near the goals ---

function setUpCrowd() {
  const source = audioCtx.createBufferSource();
  source.buffer = noiseBuffer;
  source.loop = true;
  crowdFilter = audioCtx.createBiquadFilter();
  crowdFilter.type = "bandpass";
  crowdFilter.frequency.value = 350;
  crowdFilter.Q.value = 0.8;

  const murmur = audioCtx.createGain();
  murmur.gain.value = 0.7;
  for (const rate of [0.4, 1.1, 2.3]) {
    const lfo = audioCtx.createOscillator();
    lfo.frequency.value = rate;
    const depth = audioCtx.createGain();
    depth.gain.value = 0.12;
    lfo.connect(depth);
    depth.connect(murmur.gain);
    lfo.start();
  }
  crowdGain = audioCtx.createGain();
  crowdGain.gain.value = 0;
  source.connect(crowdFilter);
  crowdFilter.connect(murmur);
  murmur.connect(crowdGain);
  crowdGain.connect(masterGain);
  source.start();
}

function crowdExcitement() {
  const ball = game.ball;
  const nearest = Math.min(distance(ball, goalCenter("left")), distance(ball, goalCenter("right")));
  return Math.max(0, 1 - nearest / 400);
}

function crowdRoar() {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const source = audioCtx.createBufferSource();
  source.buffer = noiseBuffer;
  source.loop = true;
  const filter = audioCtx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 1200;
  filter.Q.value = 0.6;
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.45, now + 0.3);
  gain.gain.setValueAtTime(0.45, now + 1.5);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 3.5);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  source.start(now);
  source.stop(now + 3.6);
}

// --- Commentator ---
// Recorded clips (assets/voice/<language>/<line>.mp3, listed in js/voice-clips.js) when we
// have them; otherwise the browser's speech synthesis reads the "speech.<line>" text.

const voiceClips = {};       // "en/goal" -> Audio element
let currentClip = null;

function voiceClip(line) {
  if (!(VOICE_CLIPS[language] || []).includes(line)) return null;
  const key = language + "/" + line;
  if (!voiceClips[key]) {
    voiceClips[key] = new Audio("assets/voice/" + key + ".mp3");
    voiceClips[key].preload = "auto";
  }
  return voiceClips[key];
}

function preloadVoiceClips() {
  for (const line of VOICE_CLIPS[language] || []) voiceClip(line);
}

// Say one of the commentator's lines. Lines without a "speech.*" text (like the countdown) are clip-only.
// The robot never uses the recorded clips.
function commentate(line, params) {
  const voice = save.settings.voice;
  if (!soundEnabled() || voice === "off") return;
  const clip = voice === "human" && voiceClip(line);
  if (clip) {
    stopCommentator();
    clip.currentTime = 0;
    clip.volume = MASTER_VOLUME;
    currentClip = clip;
    clip.play().catch(() => {});
    return;
  }
  if (STRINGS.en["speech." + line]) {
    if (voice === "robot") playRobotChirp();
    speak(pickVariant(line, t("speech." + line, params)), voice === "robot" ? "robot" : LINE_MOODS[line] || "excited");
  }
}

// A "speech.*" text can hold several ways of saying the line, split by "|". Don't repeat the last one.
const lastVariants = {};

function pickVariant(line, text) {
  const variants = text.split("|");
  const fresh = variants.filter(variant => variant !== lastVariants[line]);
  lastVariants[line] = pickRandom(fresh.length ? fresh : variants);
  return lastVariants[line];
}

// "Bee-boop" before the robot talks
function playRobotChirp() {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  playTone(1320, now, 0.07, 0.12, "square");
  playTone(880, now + 0.09, 0.09, 0.12, "square");
}

function commentatorSpeaking() {
  return Boolean((currentClip && !currentClip.paused && !currentClip.ended) ||
                 (window.speechSynthesis && speechSynthesis.speaking));
}

function stopCommentator() {
  if (currentClip) currentClip.pause();
  currentClip = null;
  if (window.speechSynthesis) speechSynthesis.cancel();
}

function speak(text, moodId) {
  if (!soundEnabled() || !window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = voiceLanguage();
  const voice = bestVoice(moodId === "robot");
  if (voice) utterance.voice = voice;
  const mood = VOICE_MOODS[moodId];
  const jitter = moodId === "robot" ? 0 : VOICE_MOOD_JITTER;   // robots always sound the same
  utterance.rate = mood.rate + randomBetween(-jitter, jitter);
  utterance.pitch = Math.max(0, mood.pitch + randomBetween(-jitter, jitter));
  stopCommentator();
  speechSynthesis.speak(utterance);
}

// The most natural-sounding voice for the current language. The old built-in desktop voices
// (Microsoft David, Zira...) sound robotic, so they come last, except for the robot, who wants them first.
const VOICE_PREFERENCES = [/Natural|Neural/i, /Online/i, /Google/i, /Premium|Enhanced|Siri/i];

function bestVoice(robotic) {
  const voices = speechSynthesis.getVoices();
  const exact = voices.filter(v => v.lang.replace("_", "-") === voiceLanguage());
  const sameLanguage = voices.filter(v => v.lang.toLowerCase().startsWith(language));
  if (robotic) {
    const oldVoice = v => v.localService && !VOICE_PREFERENCES.some(pattern => pattern.test(v.name));
    const voice = exact.find(oldVoice) || sameLanguage.find(oldVoice);
    if (voice) return voice;
  }
  for (const pattern of VOICE_PREFERENCES) {
    const voice = exact.find(v => pattern.test(v.name)) || sameLanguage.find(v => pattern.test(v.name));
    if (voice) return voice;
  }
  return exact.find(v => !v.localService) || exact[0] || sameLanguage[0] || null;
}

if (window.speechSynthesis) {
  speechSynthesis.getVoices();   // voices load asynchronously; ask early
}

// --- Sound effects ---

function playHitSound(impact) {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const osc = playTone(180, now, 0.15, Math.min(impact / MAX_SHOT_POWER, 1) * 0.35, "sine");
  osc.frequency.exponentialRampToValueAtTime(70, now + 0.12);
}

// Referee whistle: a high tone with a fast vibrato (the pea inside the whistle)
function whistle(when, duration) {
  const osc = audioCtx.createOscillator();
  osc.frequency.value = 2800;
  const vibrato = audioCtx.createOscillator();
  vibrato.frequency.value = 35;
  const vibratoDepth = audioCtx.createGain();
  vibratoDepth.gain.value = 120;
  vibrato.connect(vibratoDepth);
  vibratoDepth.connect(osc.frequency);
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, when);
  gain.gain.linearRampToValueAtTime(0.2, when + 0.02);
  gain.gain.setValueAtTime(0.2, when + duration);
  gain.gain.linearRampToValueAtTime(0, when + duration + 0.05);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(when);
  vibrato.start(when);
  osc.stop(when + duration + 0.1);
  vibrato.stop(when + duration + 0.1);
}

function playStartWhistle(duration) {
  if (!audioCtx) return;
  whistle(audioCtx.currentTime, duration || 0.9);
}

function playFinalWhistle() {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  whistle(now, 0.3);
  whistle(now + 0.45, 0.3);
  whistle(now + 0.9, 1.1);
}

function playMagicSound() {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  [72, 76, 79, 84].forEach((note, i) => playTone(midiToFrequency(note), now + i * 0.08, 0.3, 0.2, "triangle"));
}

function playBigGoalSound() {
  commentate("bigGoal");
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const osc = playTone(150, now, 0.9, 0.2, "square");
  osc.frequency.exponentialRampToValueAtTime(900, now + 0.8);
}

// Mega chip: a quick jingle going up when the chips grow, down when they shrink back
function playMegaSound(growing) {
  if (growing) commentate("mega");
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const notes = growing ? [55, 60, 64, 67, 72, 76, 79] : [72, 67, 64, 60];
  notes.forEach((note, i) => playTone(midiToFrequency(note), now + i * 0.06, 0.18, 0.15, "square"));
}

// Defence wall: heavy bricks dropping into place
function playWallSound() {
  commentate("wall");
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  for (let i = 0; i < 3; i++) {
    noiseHit(now + i * 0.13, "lowpass", 350, 0.18, 0.6);
    kickDrum(now + i * 0.13, 0.35);
  }
}

// Cannon picked up: a burning fuse
function playCannonPickupSound() {
  commentate("cannon");
  if (!audioCtx) return;
  noiseHit(audioCtx.currentTime, "highpass", 4000, 0.7, 0.25);
}

// Cannon shot: BOOM
function playCannonSound() {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  kickDrum(now, 1.0);
  noiseHit(now, "lowpass", 900, 0.6, 0.7);
}

// "Wah wah wah waaah": four falling notes, the last one wobbling
function playSadTrombone() {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const notes = [67, 66, 65, 64];
  notes.forEach((note, i) => {
    const last = i === notes.length - 1;
    const when = now + i * 0.3;
    const duration = last ? 1.0 : 0.28;
    const osc = playTone(midiToFrequency(note), when, duration, 0.18, "sawtooth");
    if (last) {
      const wobble = audioCtx.createOscillator();
      wobble.frequency.value = 6;
      const depth = audioCtx.createGain();
      depth.gain.value = 8;
      wobble.connect(depth);
      depth.connect(osc.frequency);
      wobble.start(when);
      wobble.stop(when + duration);
    }
  });
}

function playFanfare() {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  [60, 64, 67, 72, 67, 72].forEach((note, i) => {
    playTone(midiToFrequency(note), now + i * 0.14, i === 5 ? 0.8 : 0.2, 0.18, "square");
  });
}

function celebrateGoal(team, ownGoal) {
  if (ownGoal) {
    playSadTrombone();
    commentate("ownGoal");
    return;
  }
  crowdRoar();
  commentate("goal", { team: playerOrTeamName(team) });
}

function celebrateFullTime(winner) {
  playFinalWhistle();
  crowdRoar();
  if (winner) {
    commentate("finalWin", { team: playerOrTeamName(winner) });
  } else {
    commentate("finalDraw");
  }
}

// Start screen: a beep on 3, 2, 1 and the whistle on 0
function playCountdownStep(n) {
  const lines = ["go", "one", "two", "three"];
  commentate(lines[n]);
  if (n === 0) {
    playStartWhistle(0.6);
  } else {
    playCountdownBeep();
  }
}

// --- Ball Frenzy sounds ---

function playCrazyStartSound(ultimate) {
  commentate(ultimate ? "crazyUltimate" : "crazy");
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const siren = playTone(200, now, 1.0, 0.2, "sawtooth");
  siren.frequency.exponentialRampToValueAtTime(2000, now + 0.8);
}

function playCountdownBeep() {
  if (!audioCtx) return;
  playTone(880, audioCtx.currentTime, 0.2, 0.2, "square");
}

function playCrazyPointSound() {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  playTone(midiToFrequency(84), now, 0.15, 0.2, "square");
  playTone(midiToFrequency(91), now + 0.08, 0.25, 0.2, "square");
}

function announceCrazyResult(crazy) {
  playFinalWhistle();
  if (!crazy.winner) {
    commentate(crazy.ultimate ? "crazyTieUltimate" : "crazyTie");
    return;
  }
  crowdRoar();
  commentate(crazy.ultimate ? "crazyWinsMatch" : "crazyWinsGoal", { team: playerOrTeamName(crazy.winner) });
}

const CRAZY_NOTES = [60, 62, 64, 67, 69, 72, 74, 76, 79, 81];   // pentatonic: always sounds fine
const CRAZY_STEP = 0.12;

function playCrazyMusicStep(step, when) {
  playTone(midiToFrequency(pickRandom(CRAZY_NOTES)), when, 0.1, 0.12, "square");
  if (step % 4 === 0) kickDrum(when);
  if (step % 2 === 1) hiHat(when);
  if (step % 2 === 0) {
    playTone(midiToFrequency(step % 8 < 4 ? 36 : 43), when, 0.2, 0.15, "sawtooth");
  }
}

// --- Background music: Am → F → C → G, 8 steps per chord, speeding up as the match goes on ---

const CHORDS = [[69, 72, 76], [65, 69, 72], [67, 72, 76], [67, 71, 74]];
const ARPEGGIO = [0, 1, 2, 1, 0, 1, 2, 1];
const BASS_NOTES = [45, 41, 48, 43];
const BASS_PATTERN = [0, null, null, 0, 12, null, 0, null];
const KICK_PATTERN = [1, 0, 0, 0, 1, 0, 0, 1];
const SNARE_PATTERN = [0, 0, 1, 0, 0, 0, 1, 0];
const MELODY = [
  69, null, 72, 76, null, 74, 72, null,
  72, null, 69, 77, null, 76, 72, null,
  76, null, 79, 76, null, 72, 74, null,
  74, null, 71, 74, 79, null, 76, 74,
];

function musicStepDuration() {
  if (!game.totalTime) {
    return MUSIC_STEP_START;
  }
  const progress = 1 - game.timeLeft / game.totalTime;
  return MUSIC_STEP_START - (MUSIC_STEP_START - MUSIC_STEP_END) * progress;
}

function playMusicStep(step, when, stepDuration) {
  const loop = Math.floor(step / 32);
  const songStep = step % 32;
  const chordStep = step % 8;
  const chordIndex = Math.floor(songStep / 8);

  playTone(midiToFrequency(CHORDS[chordIndex][ARPEGGIO[chordStep]]), when, stepDuration * 2, 0.12, "triangle", musicGain);

  const bassJump = BASS_PATTERN[chordStep];
  if (bassJump !== null) {
    playTone(midiToFrequency(BASS_NOTES[chordIndex] + bassJump), when, stepDuration * 1.5, 0.4, "triangle", musicGain);
  }
  if (loop >= 1) {   // the first loop is the intro, without drums
    if (KICK_PATTERN[chordStep]) kickDrum(when, 0.5, musicGain);
    if (SNARE_PATTERN[chordStep]) snare(when, 0.25, musicGain);
    hiHat(when, chordStep % 2 === 0 ? 0.08 : 0.04, musicGain);
  }
  const melodyNote = MELODY[songStep];
  if (loop % 3 !== 0 && melodyNote !== null) {
    playTone(midiToFrequency(melodyNote), when, stepDuration * 1.5, 0.1, "square", musicGain);
  }
}

// --- Per-frame audio update ---

let musicStep = 0;
let nextMusicTime = 0;
let crazyStep = 0;
let nextCrazyTime = 0;
let nextTickTime = 0;
let tick = true;

function updateAudio() {
  if (!audioCtx || adPlaying) return;
  const now = audioCtx.currentTime;
  const inMatch = isMatchInProgress() && !game.paused;

  // Duck everything while the commentator speaks
  if (!soundEnabled() && currentClip) stopCommentator();
  const master = soundEnabled() ? (commentatorSpeaking() ? MASTER_VOLUME * 0.35 : MASTER_VOLUME) : 0;
  masterGain.gain.setTargetAtTime(master, now, 0.1);

  const calmMusic = save.settings.music && inMatch && !game.crazy;
  musicGain.gain.setTargetAtTime(calmMusic ? MUSIC_VOLUME : 0, now, 0.5);

  let crowdVolume = 0;
  let crowdTone = 350;
  if (inMatch) {
    const excitement = crowdExcitement();
    crowdVolume = CROWD_VOLUME * (0.3 + 0.7 * excitement);
    crowdTone = 350 + 550 * excitement;
  }
  crowdGain.gain.setTargetAtTime(crowdVolume, now, 0.3);
  crowdFilter.frequency.setTargetAtTime(crowdTone, now, 0.3);

  if (inMatch) {
    if (nextMusicTime < now) nextMusicTime = now + 0.05;
    while (nextMusicTime < now + 0.2) {
      const stepDuration = musicStepDuration();
      playMusicStep(musicStep, nextMusicTime, stepDuration);
      musicStep += 1;
      nextMusicTime += stepDuration;
    }
  } else if (!game.paused) {
    musicStep = 0;   // the song restarts from the intro next match
  }

  if (inMatch && game.crazy && game.crazy.phase === "frenzy" && save.settings.music) {
    if (nextCrazyTime < now) nextCrazyTime = now + 0.05;
    while (nextCrazyTime < now + 0.2) {
      playCrazyMusicStep(crazyStep, nextCrazyTime);
      crazyStep += 1;
      nextCrazyTime += CRAZY_STEP;
    }
  }

  // Tick-tock while a team is frozen, faster when the ice is about to melt
  if (inMatch && game.frozen && game.state === "playing") {
    const interval = game.frozen.seconds < 3 ? 0.25 : 0.5;
    if (nextTickTime < now) nextTickTime = now + 0.05;
    while (nextTickTime < now + 0.1) {
      playTone(tick ? 1600 : 1100, nextTickTime, 0.05, 0.15, "triangle");
      tick = !tick;
      nextTickTime += interval;
    }
  }
}
