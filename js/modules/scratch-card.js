/**
 * ==========================================================================
 * MODULE: INTERACTIVE METALLIC FOIL SCRATCH CARD TICKET
 * Project: Arun & Meera — Indian Wedding Invitation
 * Architecture: Canvas 2D Composite Eraser & Pointer Event Engine
 * ==========================================================================
 * 
 * Overview:
 * This module transforms the hero wedding ticket into an interactive metallic
 * gold scratch card. Guests scratch the canvas with their mouse, finger, or stylus
 * using `globalCompositeOperation = 'destination-out'` to reveal the wedding date,
 * muhurat time, venue, and live countdown timer underneath.
 * 
 * Key Features:
 * 1. Shimmering Gold Foil: Multi-stop linear gradient with 160+ random sparkle flecks.
 * 2. High-Performance Erasing: Continuous path strokes connecting consecutive pointer events.
 * 3. Fast Pixel Sampling: Subsamples alpha channels (every 8th pixel) to detect >= 18% scratch threshold.
 * 4. Auto-Reveal & Quick-Reveal: Smooth transition into the fully revealed ticket state.
 * 5. Multi-Input Support: Modern PointerEvents API with PointerCapture + Touch/Mouse fallbacks.
 * 
 * Functions:
 * - initScratchCard() : Sets up canvas rendering, pointer capture, and reveal thresholds.
 */

import { firePartyPoppers } from './confetti.js';

/**
 * Initializes the metallic scratch card canvas, rendering loops, and gesture handlers.
 * 
 * @returns {void}
 */
export function initScratchCard() {
  const scratchCanvas = document.getElementById('scratch-canvas');
  const scratchPromptOverlay = document.getElementById('scratch-prompt-overlay');
  const quickScratchBtn = document.getElementById('quick-scratch-btn');
  const scratchFoilBox = document.getElementById('scratch-foil-box');
  const scratchUnderCard = document.getElementById('scratch-under-card');
  const revealedDetailsBox = document.getElementById('revealed-details-box');

  if (!scratchCanvas || !scratchFoilBox) return;

  // Optimize context configuration with willReadFrequently for high-speed getImageData operations
  const ctx = scratchCanvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return;

  /** @type {boolean} State flag indicating if pointer/touch is actively down and moving */
  let isDrawing = false;

  /** @type {boolean} State flag indicating if the card has completed its reveal animation */
  let isRevealed = false;

  /** @type {boolean} State flag indicating if user has initiated at least one scratch stroke */
  let hasScratchedAny = false;

  /** @type {number|null} Previous pointer X coordinate for stroke continuity */
  let lastX = null;

  /** @type {number|null} Previous pointer Y coordinate for stroke continuity */
  let lastY = null;

  /**
   * Generates the metallic gold foil texture on the scratch canvas with
   * custom gradient, border stroke, and randomly distributed sparkle flecks.
   * 
   * @returns {void}
   */
  function initScratchCanvas() {
    if (isRevealed || hasScratchedAny) return;
    const rect = scratchFoilBox.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const w = Math.round(rect.width);
    const h = Math.round(rect.height);

    scratchCanvas.width = w;
    scratchCanvas.height = h;

    // Metallic Gold Foil Multi-Stop Gradient
    const goldGrad = ctx.createLinearGradient(0, 0, w, h);
    goldGrad.addColorStop(0, '#c5a059');
    goldGrad.addColorStop(0.25, '#f7eccd');
    goldGrad.addColorStop(0.5, '#ba9048');
    goldGrad.addColorStop(0.75, '#fdf6dc');
    goldGrad.addColorStop(1, '#a8813b');

    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 0, w, h);

    // Decorative inner border on foil
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 2;
    ctx.strokeRect(6, 6, w - 12, h - 12);

    // Sparkle flecks simulating real gold dust texture
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    for (let i = 0; i < 160; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = Math.random() * 2 + 0.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Initial setup with timeouts to ensure parent layout computation is complete
  initScratchCanvas();
  setTimeout(initScratchCanvas, 100);
  setTimeout(initScratchCanvas, 400);

  // ResizeObserver for responsive recalculation if window or container scales
  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(() => {
      if (!isRevealed && !hasScratchedAny) {
        initScratchCanvas();
      }
    });
    ro.observe(scratchFoilBox);
  }

  window.addEventListener('resize', () => {
    if (!isRevealed && !hasScratchedAny) initScratchCanvas();
  });

  // Expose recalibration function globally (used when splash envelope unwrap finishes)
  window.reinitScratchCardCanvas = initScratchCanvas;

  /**
   * Normalizes mouse, touch, or stylus coordinates into canvas internal pixel space.
   * 
   * @param {MouseEvent|TouchEvent|PointerEvent} e - Input event
   * @returns {{x: number, y: number}} Normalized coordinates
   */
  function getPointerPos(e) {
    const rect = scratchCanvas.getBoundingClientRect();
    const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

    const scaleX = scratchCanvas.width / (rect.width || 1);
    const scaleY = scratchCanvas.height / (rect.height || 1);

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }

  /**
   * Applies an erasing scratch stroke at the specified coordinates.
   * Connects previous and current points to prevent dotted gaps during fast motion.
   * 
   * @param {number} x - Normalized X coordinate
   * @param {number} y - Normalized Y coordinate
   * @returns {void}
   */
  function scratchStroke(x, y) {
    hasScratchedAny = true;

    // Fade out the "Scratch Here" cue pill once scratching begins
    if (scratchPromptOverlay && !scratchPromptOverlay.classList.contains('fade-out')) {
      scratchPromptOverlay.classList.add('fade-out');
    }

    ctx.save();
    // 'destination-out' clears existing canvas pixels where new drawing occurs
    ctx.globalCompositeOperation = 'destination-out';

    // Draw continuous rounded line connecting consecutive pointer events
    if (lastX !== null && lastY !== null) {
      ctx.beginPath();
      ctx.lineWidth = 44;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    // Draw circular spot at current pointer coordinate
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    lastX = x;
    lastY = y;

    // Check if enough area has been scratched to trigger auto-reveal
    checkScratchPercentage();
  }

  /** @type {number|null} Throttle timer ID for pixel analysis */
  let checkThrottle = null;

  /**
   * Analyzes canvas alpha pixels to calculate total percentage cleared.
   * Subsamples every 8th pixel (32 bytes) for ultra-fast performance.
   * 
   * @returns {void}
   */
  function checkScratchPercentage() {
    if (checkThrottle || isRevealed) return;
    checkThrottle = setTimeout(() => {
      checkThrottle = null;
      const width = scratchCanvas.width;
      const height = scratchCanvas.height;
      if (width === 0 || height === 0) return;

      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;
      let transparentPixels = 0;
      let totalSample = 0;

      // Subsample every 32 bytes (8th pixel) for 60fps performance
      for (let i = 3; i < data.length; i += 32) {
        totalSample++;
        if (data[i] < 128) {
          transparentPixels++;
        }
      }

      const scratchedRatio = transparentPixels / totalSample;
      // When >= 18% is scratched, automatically reveal the full details
      if (scratchedRatio > 0.18) {
        revealDateFully();
      }
    }, 80);
  }

  /**
   * Completes the ticket reveal with smooth CSS transitions,
   * displays the fully uncovered ticket details, and triggers confetti celebration.
   * 
   * @returns {void}
   */
  function revealDateFully() {
    if (isRevealed) return;
    isRevealed = true;

    if (scratchPromptOverlay) {
      scratchPromptOverlay.classList.add('fade-out');
    }

    if (scratchFoilBox) {
      scratchFoilBox.style.opacity = '0';
      scratchFoilBox.style.transform = 'scale(0.96)';
      scratchFoilBox.style.pointerEvents = 'none';
    }

    if (scratchUnderCard) {
      scratchUnderCard.style.opacity = '0';
      scratchUnderCard.style.transform = 'scale(0.96)';
    }

    setTimeout(() => {
      if (scratchFoilBox) scratchFoilBox.style.display = 'none';
      if (scratchUnderCard) scratchUnderCard.style.display = 'none';
      if (revealedDetailsBox) {
        revealedDetailsBox.classList.add('is-active');
      }
      // Fire celebratory party popper explosion!
      firePartyPoppers();
    }, 380);
  }

  // --------------------------------------------------------------------------
  // INPUT EVENT LISTENERS (Pointer Events with PointerCapture)
  // --------------------------------------------------------------------------
  if (window.PointerEvent) {
    scratchCanvas.addEventListener('pointerdown', (e) => {
      if (isRevealed) return;
      if (e.cancelable) e.preventDefault();
      isDrawing = true;
      try {
        scratchCanvas.setPointerCapture(e.pointerId);
      } catch (err) {}
      const pos = getPointerPos(e);
      lastX = null;
      lastY = null;
      scratchStroke(pos.x, pos.y);
    });

    scratchCanvas.addEventListener('pointermove', (e) => {
      if (!isDrawing || isRevealed) return;
      if (e.cancelable) e.preventDefault();
      const pos = getPointerPos(e);
      scratchStroke(pos.x, pos.y);
    });

    function onPointerEnd(e) {
      isDrawing = false;
      lastX = null;
      lastY = null;
      try {
        scratchCanvas.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }

    scratchCanvas.addEventListener('pointerup', onPointerEnd);
    scratchCanvas.addEventListener('pointercancel', onPointerEnd);
  } else {
    // Legacy Touch & Mouse fallbacks for older devices
    scratchCanvas.addEventListener('mousedown', (e) => {
      if (isRevealed) return;
      isDrawing = true;
      const pos = getPointerPos(e);
      lastX = null;
      lastY = null;
      scratchStroke(pos.x, pos.y);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDrawing || isRevealed) return;
      const pos = getPointerPos(e);
      scratchStroke(pos.x, pos.y);
    });

    window.addEventListener('mouseup', () => {
      isDrawing = false;
      lastX = null;
      lastY = null;
    });

    scratchCanvas.addEventListener('touchstart', (e) => {
      if (isRevealed) return;
      if (e.cancelable) e.preventDefault();
      isDrawing = true;
      const pos = getPointerPos(e);
      lastX = null;
      lastY = null;
      scratchStroke(pos.x, pos.y);
    }, { passive: false });

    scratchCanvas.addEventListener('touchmove', (e) => {
      if (!isDrawing || isRevealed) return;
      if (e.cancelable) e.preventDefault();
      const pos = getPointerPos(e);
      scratchStroke(pos.x, pos.y);
    }, { passive: false });

    scratchCanvas.addEventListener('touchend', () => {
      isDrawing = false;
      lastX = null;
      lastY = null;
    });
  }

  // Quick Reveal Button Click Handler
  if (quickScratchBtn) {
    quickScratchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      revealDateFully();
    });
  }
}
