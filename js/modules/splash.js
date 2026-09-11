/**
 * ==========================================================================
 * MODULE: 3D ENVELOPE COVER & INVITATION UNWRAP LOGIC
 * Project: Arun & Meera — Indian Wedding Invitation
 * Architecture: 3D Parallax & Transition Controller
 * ==========================================================================
 * 
 * Overview:
 * This module coordinates the initial royal splash screen:
 * 1. 3D Mouse Parallax Tilt: Rotates the golden envelope card along X/Y axes based on mouse position.
 * 2. Envelope Unwrap Opening: Handles button/portrait clicks, applies smooth scale/fade unwrap animations,
 *    and seamlessly starts the gentle background audio synthesizer.
 * 
 * Functions:
 * - initSplashCover() : Attaches mouse parallax and click unwrap listeners.
 */

import { toggleAudio, getAudioState } from './audio.js';

/**
 * Initializes 3D card parallax tilt and splash unwrap triggers.
 * 
 * @returns {void}
 */
export function initSplashCover() {
  const invitationCover = document.getElementById('invitation-cover');
  const openInviteBtn = document.getElementById('open-invite-btn');
  const splashPortraitBtn = document.getElementById('splash-portrait-btn');
  const cardWrapper = document.getElementById('envelope-card-wrapper');
  const audioBtn = document.getElementById('audio-controller');

  // --------------------------------------------------------------------------
  // 1. 3D CARD PARALLAX TILT ON MOUSE MOVE (Desktop)
  // --------------------------------------------------------------------------
  if (cardWrapper && invitationCover) {
    invitationCover.addEventListener('mousemove', (e) => {
      if (invitationCover.classList.contains('opened')) return;
      const { innerWidth, innerHeight } = window;
      // Map cursor coordinates from center (-0.5 to +0.5) to +/-10 degrees tilt
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * -20;
      cardWrapper.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });

    // Reset card orientation when mouse leaves splash container
    invitationCover.addEventListener('mouseleave', () => {
      cardWrapper.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
  }

  // --------------------------------------------------------------------------
  // 2. ENVELOPE OPEN TRIGGER SEQUENCE
  // --------------------------------------------------------------------------
  const triggerOpen = () => {
    if (invitationCover && !invitationCover.classList.contains('opened')) {
      invitationCover.classList.add('opened');

      // Auto-start soothing background classical music
      if (!getAudioState() && audioBtn) {
        toggleAudio(audioBtn);
      }

      // Recalibrate scratch card dimensions if needed
      if (typeof window.reinitScratchCardCanvas === 'function') {
        setTimeout(window.reinitScratchCardCanvas, 150);
        setTimeout(window.reinitScratchCardCanvas, 400);
      }
    }
  };

  // Bind click handlers to both the main button and the portrait medallion
  if (openInviteBtn) {
    openInviteBtn.addEventListener('click', triggerOpen);
  }
  if (splashPortraitBtn) {
    splashPortraitBtn.addEventListener('click', triggerOpen);
  }
}
