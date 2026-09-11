/**
 * ==========================================================================
 * MODULE: PARTY POPPER & CELEBRATORY CONFETTI ENGINE
 * Project: Arun & Meera — Indian Wedding Invitation
 * Architecture: High-Performance Canvas 2D Physics Engine
 * ==========================================================================
 * 
 * Overview:
 * This module creates a celebratory dual-cannon confetti explosion effect
 * rendered on a dedicated full-screen HTML5 `<canvas>`. It simulates realistic
 * physics including gravity, air resistance (drag), initial velocity vectors,
 * 3D tumbling rotation, and varied geometric particle shapes.
 * 
 * Triggers:
 * 1. Revealing the metallic scratch-card ticket (scratch completion / quick-reveal).
 * 2. Submitting the RSVP guestbook form.
 * 
 * Functions:
 * - firePartyPoppers() : Spawns 180+ particles from bottom corners and renders physics loop.
 * - resetPopperFlag()  : Resets state flag allowing subsequent celebratory triggers.
 */

import { playPartyPopperSound } from './audio.js';

/** @type {boolean} Debounce flag ensuring single trigger execution per event */
let popperFired = false;

/**
 * Launches an interactive dual-cannon celebratory confetti burst.
 * Triggers sound synthesizer and runs requestAnimationFrame animation loop.
 * 
 * @returns {void}
 */
export function firePartyPoppers() {
  const popperCanvas = document.getElementById('party-popper-canvas');
  if (popperFired || !popperCanvas) return;
  popperFired = true;

  // Play celebratory audio chime fanfare
  playPartyPopperSound();

  const pCtx = popperCanvas.getContext('2d');
  let width = (popperCanvas.width = window.innerWidth);
  let height = (popperCanvas.height = window.innerHeight);

  /** @type {Array<Object>} Active confetti particle pool */
  const particles = [];

  // Curated celebratory palette: Royal golds, emerald teal, ruby rose, and crisp white
  const colors = [
    '#d4af37', // Metallic Gold
    '#c5a059', // Warm Ochre
    '#244b40', // Royal Teal
    '#e85d75', // Festive Rose
    '#ffffff', // Pearl White
    '#628f87', // Sage Teal
    '#f4a8b7', // Pastel Rose
    '#ecdcb0'  // Champagne Gold
  ];

  // --------------------------------------------------------------------------
  // 1. LEFT CANNON PARTICLE SPAWNING
  // --------------------------------------------------------------------------
  // Particles shoot upward and rightward at ~45 degree angle (+/- spread)
  for (let i = 0; i < 90; i++) {
    const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.6; // ~45 deg
    const speed = Math.random() * 18 + 12; // High initial ejection velocity
    particles.push({
      x: 0,
      y: height,
      vx: Math.cos(angle) * speed,
      vy: -Math.sin(angle) * speed,
      gravity: 0.35,                          // Downward acceleration constant
      drag: 0.985,                            // Air friction deceleration
      rotation: Math.random() * 360,          // Initial angular rotation (degrees)
      rotSpeed: (Math.random() - 0.5) * 15,   // Tumbling angular velocity
      width: Math.random() * 12 + 6,          // Particle width
      height: Math.random() * 16 + 8,         // Particle length
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: Math.random() > 0.4 ? 'rect' : 'circle',
      alpha: 1
    });
  }

  // --------------------------------------------------------------------------
  // 2. RIGHT CANNON PARTICLE SPAWNING
  // --------------------------------------------------------------------------
  // Particles shoot upward and leftward at ~135 degree angle (+/- spread)
  for (let i = 0; i < 90; i++) {
    const angle = (3 * Math.PI) / 4 + (Math.random() - 0.5) * 0.6; // ~135 deg
    const speed = Math.random() * 18 + 12;
    particles.push({
      x: width,
      y: height,
      vx: Math.cos(angle) * speed,
      vy: -Math.sin(angle) * speed,
      gravity: 0.35,
      drag: 0.985,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 15,
      width: Math.random() * 12 + 6,
      height: Math.random() * 16 + 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: Math.random() > 0.4 ? 'rect' : 'circle',
      alpha: 1
    });
  }

  const startTime = Date.now();

  /**
   * Main animation loop updating particle positions, rotations, and rendering.
   * Runs for 4.5 seconds before cleaning up the canvas.
   * 
   * @returns {void}
   */
  function renderPopper() {
    pCtx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      // Apply physical forces: air resistance & gravity
      p.vx *= p.drag;
      p.vy = p.vy * p.drag + p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;

      // Render transformed particle
      pCtx.save();
      pCtx.translate(p.x, p.y);
      pCtx.rotate((p.rotation * Math.PI) / 180);
      pCtx.fillStyle = p.color;
      pCtx.globalAlpha = p.alpha;

      if (p.shape === 'rect') {
        pCtx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
      } else {
        pCtx.beginPath();
        pCtx.arc(0, 0, p.width / 2, 0, Math.PI * 2);
        pCtx.fill();
      }
      pCtx.restore();
    });

    // Animate for 4.5s duration then clear canvas
    if (Date.now() - startTime < 4500) {
      requestAnimationFrame(renderPopper);
    } else {
      pCtx.clearRect(0, 0, width, height);
    }
  }

  renderPopper();
}

/**
 * Resets the single-fire flag to allow subsequent celebrations (e.g., re-scratching or multiple RSVPs).
 * 
 * @returns {void}
 */
export function resetPopperFlag() {
  popperFired = false;
}
