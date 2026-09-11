# Audio Assets Directory

This folder is designated for custom background music tracks and audio assets for the wedding invitation.

## How Background Music Works

By default, the template uses the browser's native **Web Audio API Synthesizer** (located in `js/modules/audio.js`) to generate peaceful pentatonic Indian classical flute/tanpura notes (Raag Hansdhwani & Bhupali) without needing external audio files.

## Adding Custom Wedding Music (e.g. Shehnai / Instrumental)

To use a custom recorded MP3 or WAV audio track:
1. Place your audio file here (e.g., `assets/audio/wedding-flute.mp3`).
2. Update `js/modules/audio.js` to create an `Audio` element:
   ```javascript
   const bgMusic = new Audio('assets/audio/wedding-flute.mp3');
   bgMusic.loop = true;
   ```
3. Call `bgMusic.play()` when the user opens the envelope or clicks the music controller.
