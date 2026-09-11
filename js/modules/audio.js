/**
 * ==========================================================================
 * MODULE: WEB AUDIO SYNTHESIZER & CELEBRATORY AMBIENCE ENGINE
 * Project: Arun & Meera — Indian Wedding Invitation
 * Architecture: Zero-Dependency Browser Web Audio API Synthesizer
 * ==========================================================================
 * 
 * Overview:
 * This module provides an ambient musical experience using the native browser
 * Web Audio API. It synthesizes soft Indian classical notes (Raag Hansdhwani &
 * Bhupali pentatonic scales) without requiring external audio files, making it
 * ultra-lightweight, instant-loading, and resilient across all network conditions.
 * 
 * Functions:
 * - initWebAudio()          : Lazily initializes or retrieves AudioContext.
 * - playWeddingMelodyStep() : Generates gentle, randomized pentatonic sitar/flute-like tones.
 * - playPartyPopperSound()  : Synthesizes a celebratory multi-frequency fanfare pop.
 * - toggleAudio()           : Toggles background ambient audio on/off.
 * - getAudioState()         : Returns current boolean audio playback state.
 * - initAudioController()   : Attaches click listeners to the floating UI audio button.
 */

/** @type {AudioContext|null} Singleton Web Audio context reference */
let audioCtx = null;

/** @type {boolean} State flag indicating whether ambient music is active */
let isPlayingAudio = false;

/** @type {number|null} Timeout ID for scheduling consecutive melody notes */
let audioTimer = null;

/**
 * Initializes the AudioContext instance lazily on first user interaction.
 * Supports standard AudioContext and legacy webkitAudioContext.
 * 
 * @returns {void}
 */
export function initWebAudio() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
}

/**
 * Synthesizes a single gentle note using sine-wave oscillators and exponential
 * gain envelopes, then schedules the next random note to create an endless,
 * soothing Indian classical pentatonic melody (Raag Hansdhwani / Bhupali).
 * 
 * @returns {void}
 */
export function playWeddingMelodyStep() {
  // Exit if playback has been stopped or context is unavailable
  if (!isPlayingAudio || !audioCtx) return;

  // Pentatonic Raga notes (in Hz): D4, E4, F#4, A4, B4, D5, E5
  // Raag Hansdhwani / Bhupali creates a peaceful, sacred wedding atmosphere
  const ragaNotes = [293.66, 329.63, 369.99, 440.00, 493.88, 587.33, 659.25];
  const freq = ragaNotes[Math.floor(Math.random() * ragaNotes.length)];

  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    // Pure sine wave for gentle, bell/flute-like resonance
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // Audio Envelope: Soft attack (150ms) -> Sustained decay (1.8s) -> Fade out
    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.8);

    // Audio routing graph: Oscillator -> Gain Node -> Master Output
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    // Start tone immediately and stop after 2.0 seconds
    osc.start();
    osc.stop(audioCtx.currentTime + 2.0);
  } catch (e) {
    // Gracefully handle browser audio restrictions
  }

  // Schedule the next note at an organic, human-like cadence (400ms - 1200ms)
  const nextInterval = 400 + Math.random() * 800;
  audioTimer = setTimeout(playWeddingMelodyStep, nextInterval);
}

/**
 * Synthesizes a bright, multi-frequency fanfare pop sound when the user
 * finishes scratching the ticket or submits their RSVP form.
 * 
 * @returns {void}
 */
export function playPartyPopperSound() {
  try {
    initWebAudio();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    if (!audioCtx) return;

    // Celebratory Fanfare Arpeggio Chord: C5 (523.25Hz), E5 (659.25Hz), G5 (783.99Hz), C6 (1046.50Hz)
    const frequencies = [523.25, 659.25, 783.99, 1046.50];
    frequencies.forEach((freq, index) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      // Triangle wave adds pleasant harmonic warmth to celebratory fanfare
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + index * 0.08);

      // Fast percussive envelope: Instant pluck -> rapid decay
      gain.gain.setValueAtTime(0.001, audioCtx.currentTime + index * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.2, audioCtx.currentTime + index * 0.08 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + index * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(audioCtx.currentTime + index * 0.08);
      osc.stop(audioCtx.currentTime + index * 0.08 + 1.3);
    });
  } catch (e) {
    console.warn('Web Audio playback notice:', e);
  }
}

/**
 * Toggles the background ambient audio synthesizer on and off.
 * Updates UI button state (animated equalizer bars).
 * 
 * @param {HTMLElement|null} audioBtn - The floating equalizer button element
 * @returns {boolean} The new isPlayingAudio state
 */
export function toggleAudio(audioBtn) {
  try {
    initWebAudio();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  } catch (e) {
    console.warn('AudioContext resume notice:', e);
  }

  isPlayingAudio = !isPlayingAudio;

  if (audioBtn) {
    if (isPlayingAudio) {
      audioBtn.classList.add('audio-playing');
      playWeddingMelodyStep();
    } else {
      audioBtn.classList.remove('audio-playing');
      if (audioTimer) clearTimeout(audioTimer);
    }
  }
  return isPlayingAudio;
}

/**
 * Returns the current audio playback state.
 * 
 * @returns {boolean} True if ambient music is actively playing
 */
export function getAudioState() {
  return isPlayingAudio;
}

/**
 * Attaches click event listener to the floating equalizer controller button.
 * 
 * @returns {void}
 */
export function initAudioController() {
  const audioBtn = document.getElementById('audio-controller');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => toggleAudio(audioBtn));
  }
}
