/**
 * ==========================================================================
 * MODULE: SPLASH SCREEN GOLDEN SPARKLES CANVAS
 * Project: Arun & Meera — Indian Wedding Invitation
 * Architecture: Canvas 2D Ambient Particle Loop
 * ==========================================================================
 * 
 * Overview:
 * This module renders an ambient background field of floating, pulsing gold
 * and teal dust particles behind the 3D envelope splash screen.
 * 
 * Functions:
 * - initSparkles() : Spawns 40 organic particles and executes the render loop.
 */

/**
 * Initializes and animates ambient glowing particles on the splash screen background canvas.
 * 
 * @returns {void}
 */
export function initSparkles() {
  const splashCanvas = document.getElementById('splash-particle-canvas');
  const invitationCover = document.getElementById('invitation-cover');
  if (!splashCanvas) return;

  const sCtx = splashCanvas.getContext('2d');
  if (!sCtx) return;

  let sWidth = (splashCanvas.width = window.innerWidth);
  let sHeight = (splashCanvas.height = window.innerHeight);

  // Resize canvas when window dimensions change
  window.addEventListener('resize', () => {
    sWidth = splashCanvas.width = window.innerWidth;
    sHeight = splashCanvas.height = window.innerHeight;
  });

  /** @type {Array<Object>} Particle state array */
  const sparkles = [];
  const numSparkles = 40;

  // Initialize particles with randomized coordinates, radii, velocities, and alpha pulse frequencies
  for (let i = 0; i < numSparkles; i++) {
    sparkles.push({
      x: Math.random() * sWidth,
      y: Math.random() * sHeight,
      radius: Math.random() * 2.2 + 1,
      color: ['#c5a059', '#d4af37', '#e6c88b', '#ffffff', '#7a9e98'][
        Math.floor(Math.random() * 5)
      ],
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5 - 0.15, // Gentle upward drifting bias
      alpha: Math.random() * 0.7 + 0.3,
      pulseSpeed: Math.random() * 0.02 + 0.01
    });
  }

  /**
   * Main sparkle animation loop. Automatically stops when invitation cover is opened.
   * 
   * @returns {void}
   */
  function animateSparkles() {
    // Terminate animation loop once splash cover is unwrap-transitioned away
    if (invitationCover && invitationCover.classList.contains('opened')) return;

    sCtx.clearRect(0, 0, sWidth, sHeight);

    sparkles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;
      // Sinusoidal alpha pulsing for soft twinkle effect
      p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.01;

      // Wrap-around screen edge boundaries
      if (p.x < 0) p.x = sWidth;
      if (p.x > sWidth) p.x = 0;
      if (p.y < 0) p.y = sHeight;
      if (p.y > sHeight) p.y = 0;

      // Render particle with soft radial glow shadow
      sCtx.save();
      sCtx.globalAlpha = Math.max(0.1, Math.min(1, p.alpha));
      sCtx.fillStyle = p.color;
      sCtx.shadowBlur = 8;
      sCtx.shadowColor = p.color;
      sCtx.beginPath();
      sCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      sCtx.fill();
      sCtx.restore();
    });

    requestAnimationFrame(animateSparkles);
  }

  animateSparkles();
}
