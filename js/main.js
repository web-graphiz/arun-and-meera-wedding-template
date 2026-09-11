/**
 * ==========================================================================
 * MASTER JAVASCRIPT ORCHESTRATOR & ALL-IN-ONE BUNDLE
 * Project: Arun & Meera — Royal Indian Wedding Invitation
 * Architecture: High-Performance Universal Vanilla ES6 JavaScript (Self-Contained IIFE)
 * Compatibility: Direct local filesystem (file:// protocol) & HTTP/HTTPS Web Servers
 * ==========================================================================
 * 
 * MODULE INDEX:
 * 1. Web Audio Synthesizer & Raag Ambience Engine
 * 2. Splash Screen Floating Golden Sparkles Canvas
 * 3. 3D Envelope Cover & Parallax Unwrap Logic
 * 4. Party Popper & Celebratory Confetti 2D Physics Engine
 * 5. Interactive Metallic Foil Scratch Card Ticket
 * 6. Auspicious Live Wedding Countdown Timer
 * 7. Sticky Navigation, Mobile Drawer & ScrollSpy
 * 8. Intersection Observer Viewport Scroll Reveals
 * 9. Royal Wedding Function Details Data & Interactive Modal
 * 10. Photo Gallery & Fullscreen Lightbox Viewer
 * 11. RSVP Form Submission & Feedback Handler
 * 12. Google Calendar Deep-Link Export Utility
 * 13. DOM Ready Bootstrap Controller
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. WEB AUDIO SYNTHESIZER & RAAG AMBIENCE ENGINE
     ========================================================================== */
  /** @type {AudioContext|null} Singleton Web Audio context reference */
  let audioCtx = null;

  /** @type {boolean} State flag indicating whether ambient music is active */
  let isPlayingAudio = false;

  /** @type {number|null} Timeout ID for scheduling consecutive melody notes */
  let audioTimer = null;

  /**
   * Initializes the AudioContext instance lazily on first user interaction.
   * Handles browser vendor prefixes (standard vs webkit).
   * 
   * @returns {void}
   */
  function initWebAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
  }

  /**
   * Generates a single calming note and schedules the next random note
   * from the Indian classical pentatonic scale (Raag Hansdhwani / Bhupali).
   * 
   * @returns {void}
   */
  function playWeddingMelodyStep() {
    if (!isPlayingAudio || !audioCtx) return;

    // Pentatonic Raga notes (in Hz): D4 (293.66), E4 (329.63), F#4 (369.99), A4 (440.00), B4 (493.88), D5 (587.33), E5 (659.25)
    const ragaNotes = [293.66, 329.63, 369.99, 440.00, 493.88, 587.33, 659.25];
    const freq = ragaNotes[Math.floor(Math.random() * ragaNotes.length)];

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      // Organic flute/bell envelope: 150ms attack -> 1.8s sustained decay
      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 2.0);
    } catch (e) {
      // Handle potential browser restrictions silently
    }

    // Schedule next note with a randomized interval (400ms - 1200ms)
    const nextInterval = 400 + Math.random() * 800;
    audioTimer = setTimeout(playWeddingMelodyStep, nextInterval);
  }

  /**
   * Synthesizes an arpeggiated fanfare chime pop for celebratory triggers
   * (e.g. scratch card complete reveal or RSVP submission).
   * 
   * @returns {void}
   */
  function playPartyPopperSound() {
    try {
      initWebAudio();
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      if (!audioCtx) return;

      // Celebratory Fanfare Arpeggio Chord: C5, E5, G5, C6
      const frequencies = [523.25, 659.25, 783.99, 1046.50];
      frequencies.forEach((freq, index) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + index * 0.08);

        gain.gain.setValueAtTime(0.001, audioCtx.currentTime + index * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.2, audioCtx.currentTime + index * 0.08 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + index * 0.08 + 1.2);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime + index * 0.08);
        osc.stop(audioCtx.currentTime + index * 0.08 + 1.3);
      });
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  /**
   * Toggles ambient audio playback on/off and updates UI controller equalizer animation.
   * 
   * @param {HTMLElement|null} audioBtn - The equalizer button element
   * @returns {boolean} Updated playback state
   */
  function toggleAudio(audioBtn) {
    try {
      initWebAudio();
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    } catch (e) {
      console.warn('AudioContext resume error:', e);
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
   * Returns active audio state.
   * 
   * @returns {boolean} True if music is actively playing
   */
  function getAudioState() {
    return isPlayingAudio;
  }

  /**
   * Binds click listener to the floating equalizer controller.
   * 
   * @returns {void}
   */
  function initAudioController() {
    const audioBtn = document.getElementById('audio-controller');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => toggleAudio(audioBtn));
    }
  }

  /* ==========================================================================
     2. SPLASH SCREEN FLOATING GOLDEN SPARKLES CANVAS
     ========================================================================== */
  /**
   * Renders ambient floating gold dust particles on the splash screen background.
   * 
   * @returns {void}
   */
  function initSparkles() {
    const splashCanvas = document.getElementById('splash-particle-canvas');
    const invitationCover = document.getElementById('invitation-cover');
    if (!splashCanvas) return;

    const sCtx = splashCanvas.getContext('2d');
    if (!sCtx) return;

    let sWidth = (splashCanvas.width = window.innerWidth);
    let sHeight = (splashCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      sWidth = splashCanvas.width = window.innerWidth;
      sHeight = splashCanvas.height = window.innerHeight;
    });

    const sparkles = [];
    const numSparkles = 40;

    for (let i = 0; i < numSparkles; i++) {
      sparkles.push({
        x: Math.random() * sWidth,
        y: Math.random() * sHeight,
        radius: Math.random() * 2.2 + 1,
        color: ['#c5a059', '#d4af37', '#e6c88b', '#ffffff', '#7a9e98'][
          Math.floor(Math.random() * 5)
        ],
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5 - 0.15,
        alpha: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.01
      });
    }

    function animateSparkles() {
      if (invitationCover && invitationCover.classList.contains('opened')) return;

      sCtx.clearRect(0, 0, sWidth, sHeight);

      sparkles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.01;

        if (p.x < 0) p.x = sWidth;
        if (p.x > sWidth) p.x = 0;
        if (p.y < 0) p.y = sHeight;
        if (p.y > sHeight) p.y = 0;

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

  /* ==========================================================================
     3. 3D ENVELOPE COVER & PARALLAX UNWRAP LOGIC
     ========================================================================== */
  /**
   * Opens the royal invitation envelope cover with scale/fade animations,
   * starts background audio, and recalibrates scratch card canvas dimensions.
   * 
   * @returns {void}
   */
  function openInvitationCover() {
    const invitationCover = document.getElementById('invitation-cover');
    const audioBtn = document.getElementById('audio-controller');

    if (invitationCover && !invitationCover.classList.contains('opened')) {
      invitationCover.classList.add('opened');

      // Hide display completely after transition finishes so it doesn't obstruct interactions
      setTimeout(() => {
        invitationCover.style.display = 'none';
      }, 1050);

      // Auto-start soft ambient music
      try {
        if (!getAudioState() && audioBtn) {
          toggleAudio(audioBtn);
        }
      } catch (err) {
        console.warn('Audio auto-play blocked:', err);
      }

      // Recalibrate scratch canvas dimensions when page becomes fully visible
      if (typeof window.reinitScratchCardCanvas === 'function') {
        setTimeout(window.reinitScratchCardCanvas, 150);
        setTimeout(window.reinitScratchCardCanvas, 400);
      }
    }
  }

  // Expose to window for inline onclick attributes in HTML
  window.openInvitationCover = openInvitationCover;

  /**
   * Initializes 3D mouse parallax tilt on the envelope cover.
   * 
   * @returns {void}
   */
  function initSplashCover() {
    const invitationCover = document.getElementById('invitation-cover');
    const openInviteBtn = document.getElementById('open-invite-btn');
    const splashPortraitBtn = document.getElementById('splash-portrait-btn');
    const cardWrapper = document.getElementById('envelope-card-wrapper');

    // 3D Card Tilt on Mouse Move
    if (cardWrapper && invitationCover) {
      invitationCover.addEventListener('mousemove', (e) => {
        if (invitationCover.classList.contains('opened')) return;
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 20; // max 10deg
        const y = (e.clientY / innerHeight - 0.5) * -20;
        cardWrapper.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
      });

      invitationCover.addEventListener('mouseleave', () => {
        cardWrapper.style.transform = `rotateY(0deg) rotateX(0deg)`;
      });
    }

    if (openInviteBtn) {
      openInviteBtn.addEventListener('click', openInvitationCover);
    }
    if (splashPortraitBtn) {
      splashPortraitBtn.addEventListener('click', openInvitationCover);
    }
  }

  /* ==========================================================================
     4. PARTY POPPER & CELEBRATORY CONFETTI 2D PHYSICS ENGINE
     ========================================================================== */
  /** @type {boolean} Prevents overlapping simultaneous confetti bursts */
  let popperFired = false;

  /**
   * Spawns dual-cannon particle physics explosion from screen bottom corners.
   * 
   * @returns {void}
   */
  function firePartyPoppers() {
    const popperCanvas = document.getElementById('party-popper-canvas');
    if (popperFired || !popperCanvas) return;
    popperFired = true;

    playPartyPopperSound();

    const pCtx = popperCanvas.getContext('2d');
    if (!pCtx) return;

    let width = (popperCanvas.width = window.innerWidth);
    let height = (popperCanvas.height = window.innerHeight);

    const particles = [];
    const colors = [
      '#d4af37',
      '#c5a059',
      '#244b40',
      '#e85d75',
      '#ffffff',
      '#628f87',
      '#f4a8b7',
      '#ecdcb0'
    ];

    // Left Cannon Particles (45 degree launch)
    for (let i = 0; i < 90; i++) {
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.6;
      const speed = Math.random() * 18 + 12;
      particles.push({
        x: 0,
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

    // Right Cannon Particles (135 degree launch)
    for (let i = 0; i < 90; i++) {
      const angle = (3 * Math.PI) / 4 + (Math.random() - 0.5) * 0.6;
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

    function renderPopper() {
      pCtx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

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

      if (Date.now() - startTime < 4500) {
        requestAnimationFrame(renderPopper);
      } else {
        pCtx.clearRect(0, 0, width, height);
      }
    }

    renderPopper();
  }

  /* ==========================================================================
     5. INTERACTIVE METALLIC FOIL SCRATCH CARD TICKET
     ========================================================================== */
  /**
   * Initializes the canvas scratch layer, touch/mouse gesture tracking,
   * continuous path erasing, and auto-reveal percentage check.
   * 
   * @returns {void}
   */
  function initScratchCard() {
    const scratchCanvas = document.getElementById('scratch-canvas');
    const scratchPromptOverlay = document.getElementById('scratch-prompt-overlay');
    const quickScratchBtn = document.getElementById('quick-scratch-btn');
    const scratchFoilBox = document.getElementById('scratch-foil-box');
    const scratchUnderCard = document.getElementById('scratch-under-card');
    const revealedDetailsBox = document.getElementById('revealed-details-box');

    if (!scratchCanvas || !scratchFoilBox) return;

    const ctx = scratchCanvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let isDrawing = false;
    let isRevealed = false;
    let hasScratchedAny = false;
    let lastX = null;
    let lastY = null;

    function initScratchCanvas() {
      if (isRevealed || hasScratchedAny) return;
      const rect = scratchFoilBox.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const w = Math.round(rect.width);
      const h = Math.round(rect.height);

      scratchCanvas.width = w;
      scratchCanvas.height = h;

      // Metallic Gold Foil Gradient
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

      // Gold Sparkle Flecks
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

    // Initial setup with ResizeObserver
    initScratchCanvas();
    setTimeout(initScratchCanvas, 100);
    setTimeout(initScratchCanvas, 400);

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

    window.reinitScratchCardCanvas = initScratchCanvas;

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

    function scratchStroke(x, y) {
      hasScratchedAny = true;

      if (scratchPromptOverlay && !scratchPromptOverlay.classList.contains('fade-out')) {
        scratchPromptOverlay.classList.add('fade-out');
      }

      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';

      if (lastX !== null && lastY !== null) {
        ctx.beginPath();
        ctx.lineWidth = 44;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      lastX = x;
      lastY = y;

      checkScratchPercentage();
    }

    let checkThrottle = null;
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

        // Subsample every 32 bytes (8th pixel) for lightning-fast 60fps performance
        for (let i = 3; i < data.length; i += 32) {
          totalSample++;
          if (data[i] < 128) {
            transparentPixels++;
          }
        }

        const scratchedRatio = transparentPixels / totalSample;
        if (scratchedRatio > 0.18) {
          revealDateFully();
        }
      }, 80);
    }

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
        // Fire celebratory party popper explosion once!
        firePartyPoppers();
      }, 380);
    }

    // Pointer Events (Unified Mouse + Touch + Stylus Support)
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
      // Fallback for older browsers
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

    if (quickScratchBtn) {
      quickScratchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        revealDateFully();
      });
    }
  }

  /* ==========================================================================
     6. AUSPICIOUS LIVE WEDDING COUNTDOWN TIMER
     ========================================================================== */
  /**
   * Initializes live 1-second countdown clock to wedding timestamp.
   * 
   * @param {string} [targetDateStr='December 12, 2026 10:00:00'] - Target date string
   * @returns {void}
   */
  function initCountdown(targetDateStr = 'December 12, 2026 10:00:00') {
    const weddingDate = new Date(targetDateStr).getTime();
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        daysEl.innerText = '00';
        hoursEl.innerText = '00';
        minutesEl.innerText = '00';
        secondsEl.innerText = '00';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.innerText = days < 10 ? '0' + days : days;
      hoursEl.innerText = hours < 10 ? '0' + hours : hours;
      minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
      secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
  }

  /* ==========================================================================
     7. STICKY NAVIGATION, MOBILE DRAWER & ACTIVE SECTION SCROLLSPY
     ========================================================================== */
  /**
   * Manages navbar glassmorphism elevation, mobile drawer collapse, and section ScrollSpy.
   * 
   * @returns {void}
   */
  function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Sticky Navbar Scroll Listener
    function handleNavbarScroll() {
      if (navbar) {
        if (window.scrollY > 80) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    }

    // Active Section ScrollSpy
    function updateActiveSection() {
      if (!sections.length || !navLinks.length) return;

      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const navHeight = navbar ? navbar.offsetHeight : 70;
      const scrollPosition = scrollY + navHeight + 60;

      let currentId = '';

      // Check if near the very bottom of the document
      if ((window.innerHeight + scrollY) >= (document.documentElement.scrollHeight - 60)) {
        currentId = sections[sections.length - 1].getAttribute('id');
      } else {
        sections.forEach((section) => {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentId = section.getAttribute('id');
          }
        });
      }

      // Default to the first section if near top or not matched yet
      if (!currentId && scrollY < 300 && sections.length > 0) {
        currentId = sections[0].getAttribute('id');
      }

      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === `#${currentId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    // Event Listeners for scroll and resize
    window.addEventListener('scroll', () => {
      handleNavbarScroll();
      updateActiveSection();
    }, { passive: true });

    window.addEventListener('resize', updateActiveSection);

    // Initial check
    handleNavbarScroll();
    updateActiveSection();

    // Mobile Menu Toggle
    if (mobileToggle && navLinksContainer) {
      mobileToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('mobile-active');
      });
    }

    // Nav link click handling
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navLinksContainer) {
          navLinksContainer.classList.remove('mobile-active');
        }
        navLinks.forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }

  /* ==========================================================================
     8. INTERSECTION OBSERVER SCROLL REVEALS
     ========================================================================== */
  /**
   * Observes scroll-reveal classes and triggers CSS animations on viewport intersection.
   * 
   * @returns {void}
   */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .zoom-in'
    );
    if (!revealElements.length) return;

    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
            }
          });
        },
        { threshold: 0.15 }
      );

      revealElements.forEach((el) => revealObserver.observe(el));
    } else {
      // Fallback for browsers without IntersectionObserver
      revealElements.forEach((el) => el.classList.add('active'));
    }
  }

  /* ==========================================================================
     9. ROYAL WEDDING FUNCTION DETAILS DATA & INTERACTIVE MODAL
     ========================================================================== */
  /**
   * Complete wedding functions data repository.
   */
  const weddingEventsData = {
    1: {
      num: '01',
      tag: 'DAY 1 MORNING',
      caption: "Auspicious Beginning & Mama's Welcome",
      title: 'Ganesh Sthapana & Mayra',
      subtitle: "Auspicious Beginning & Traditional Mama's Welcome",
      image: 'assets/images/mayra.jpg',
      date: 'Thursday, 10th Dec 2026',
      time: '10:00 AM Onwards',
      venue: 'Courtyard Mandap, The Leela Palace, Udaipur',
      dress: 'Traditional Marwadi (Bandhani / Leheriya)',
      swatches: [
        { name: 'Bandhani Red', color: '#B22222' },
        { name: 'Saffron Gold', color: '#E5A93C' },
        { name: 'Royal Mustard', color: '#D4AF37' }
      ],
      calDate: '20261210T100000Z',
      desc: "The wedding festivities commence with the sacred Ganesh Sthapana to invoke the divine blessings of Lord Ganesha for joy, prosperity, and harmony. This is followed by the auspicious Marwadi ritual of Mayra (Bhaat), where the maternal uncles arrive with royal dhol beats, festive gifts, and heartfelt blessings for the bride and groom.",
      timeline: [
        { time: '10:00 AM', desc: 'Auspicious Ganesh Pujan & Vedic Chants' },
        { time: '11:15 AM', desc: 'Grand Arrival of Mama & Family with Royal Dhol' },
        { time: '12:00 PM', desc: 'Mayra Bhaat Presentation & Chunni Rasam' },
        { time: '01:00 PM', desc: 'Royal Marwadi Royal Thali Feast' }
      ],
      guestNote: "Traditional safas and chunnis will be presented to all arriving family members and guests at the Courtyard entrance."
    },
    2: {
      num: '02',
      tag: 'DAY 1 AFTERNOON',
      caption: 'Henna Artistry, Folk Beats & High Tea',
      title: 'Royal Mehndi & Sundowner',
      subtitle: 'Bridal Henna Artistry & Lakeside Folk Melodies',
      image: 'assets/images/mehendi.jpg',
      date: 'Thursday, 10th Dec 2026',
      time: '03:30 PM Onwards',
      venue: 'Lakeside Deck & Heritage Lawns, The Leela Palace',
      dress: 'Pastel Mint & Floral Festive',
      swatches: [
        { name: 'Pastel Mint', color: '#A8D5BA' },
        { name: 'Dusty Sage', color: '#7FA99B' },
        { name: 'Warm Gold', color: '#C5A059' }
      ],
      calDate: '20261210T153000Z',
      desc: "An enchanting, sun-drenched lakeside celebration celebrating the fragrant beauty of bridal henna. Renowned henna artists will adorn guests with intricate designs amidst the soulful strumming of Rajasthani folk musicians, breezy Lake Pichola views, refreshing spritzers, and artisanal high-tea delicacies.",
      timeline: [
        { time: '03:30 PM', desc: 'Guest Welcome & Lakeside High Tea' },
        { time: '04:00 PM', desc: 'Bridal Henna Art & Folk Music Performances' },
        { time: '05:30 PM', desc: 'Sunset Ghoomar Dance & Live Bangles Crafting' },
        { time: '06:30 PM', desc: 'Sundowner Cocktails & Tapas' }
      ],
      guestNote: "Special master mehendi artists will be available exclusively for all guests throughout the afternoon."
    },
    3: {
      num: '03',
      tag: 'DAY 1 NIGHT',
      caption: 'Dance Extravaganza & Midnight Dhol',
      title: 'Royal Sangeet & Dhol Night',
      subtitle: 'Musical Extravaganza & High-Energy Dhol',
      image: 'assets/images/sangeet.jpg',
      date: 'Thursday, 10th Dec 2026',
      time: '07:30 PM Onwards',
      venue: 'Grand Crystal Ballroom, The Leela Palace',
      dress: 'Glamorous Indo-Western / Sparkle & Glitz',
      swatches: [
        { name: 'Midnight Navy', color: '#1B2A4A' },
        { name: 'Emerald Velvet', color: '#1B4D3E' },
        { name: 'Champagne Shimmer', color: '#D4AF37' }
      ],
      calDate: '20261210T193000Z',
      desc: "Get ready to turn up the glamour! An electrifying evening where both families take to the stage in thrilling dance face-offs, surprise choreographies, and emotional tributes. Followed by a midnight countdown with sensational Punjabi dhol players and DJ sets that will keep everyone dancing.",
      timeline: [
        { time: '07:30 PM', desc: 'Red Carpet Welcome & Signature Cocktails' },
        { time: '08:30 PM', desc: 'Family Dance Performances & Couple Medley' },
        { time: '10:00 PM', desc: 'Gourmet Royal Buffet Dinner' },
        { time: '10:45 PM', desc: 'Midnight Dhol Beats & Afterparty' }
      ],
      guestNote: "Dancing shoes and comfortable party flats will be provided at the entrance of the Crystal Ballroom."
    },
    4: {
      num: '04',
      tag: 'DAY 2 MORNING',
      caption: 'Turmeric Glow & Rose Petal Shower',
      title: 'Vibrant Haldi & Phoolon Holi',
      subtitle: 'Turmeric Blessings & Flower Petal Shower',
      image: 'assets/images/haldi.jpg',
      date: 'Friday, 11th Dec 2026',
      time: '10:00 AM Onwards',
      venue: 'Poolside Deck & Heritage Lawns, The Leela Palace',
      dress: 'Sunshine Yellow / Marigold Shades',
      swatches: [
        { name: 'Sunshine Yellow', color: '#FFD700' },
        { name: 'Marigold Orange', color: '#FF8C00' },
        { name: 'Warm Ivory', color: '#FAF8F4' }
      ],
      calDate: '20261211T100000Z',
      desc: "A sunlit morning filled with love, laughter, and fragrant herbal ubtan. Family and friends will apply the sacred golden turmeric paste to Arun & Meera to bestow glowing health and happiness. The ceremony concludes with an exhilarating organic Phoolon Ki Holi (flower petal shower) accompanied by lively folk singers.",
      timeline: [
        { time: '10:00 AM', desc: 'Sunlit Welcome with Fresh Coconut Water & Lassi' },
        { time: '10:30 AM', desc: 'Auspicious Haldi & Tel Baan Rituals' },
        { time: '11:45 AM', desc: 'Grand Phoolon Ki Holi (Rose & Marigold Petal Shower)' },
        { time: '12:45 PM', desc: 'Poolside Street Food Fiesta & Chaat Counter' }
      ],
      guestNote: "100% organic, stain-free fresh rose and marigold petals will be distributed to all guests for the celebration."
    },
    5: {
      num: '05',
      tag: 'MAIN CEREMONY',
      caption: 'Grand Baraat & Sacred Vedic Vows',
      title: 'Shahi Baraat & Royal Phere',
      subtitle: 'Grand Procession & Sacred Vedic Vows',
      image: 'assets/images/phere.jpg',
      date: 'Saturday, 12th Dec 2026',
      time: 'Baraat: 04:00 PM | Phere: 06:30 PM',
      venue: 'Royal Mandap Pavilion by Lake Pichola',
      dress: 'Royal Marwadi Couture (Deep Red & Regal Gold)',
      swatches: [
        { name: 'Royal Crimson', color: '#8B0000' },
        { name: 'Regal Gold', color: '#C5A059' },
        { name: 'Maroon Velvet', color: '#4A0E17' }
      ],
      calDate: '20261212T160000Z',
      desc: "The crown jewel of the wedding celebrations. Arun leads the grand Shahi Baraat in a royal vintage procession with royal brass band and dholak, received warmly by Meera's family with the traditional Toran and Varmala. Under an illuminated, floral-draped mandap by the tranquil waters of Lake Pichola, the couple solemnizes their eternal vows with the holy Saat Phere.",
      timeline: [
        { time: '04:00 PM', desc: 'Shahi Safa Bandhai (Turban Tying for Guests)' },
        { time: '04:30 PM', desc: 'Grand Baraat Procession along Palace Drive' },
        { time: '05:45 PM', desc: 'Royal Varmala (Garland Exchange) Ceremony' },
        { time: '06:30 PM', desc: 'Sacred Vedic Saat Phere & Kanyadaan' },
        { time: '08:30 PM', desc: 'Royal Palace Dinner Under The Stars' }
      ],
      guestNote: "Live translation of the sacred Vedic mantras will be shared in the ceremony keepsake booklet."
    },
    6: {
      num: '06',
      tag: 'GRAND FINALE',
      caption: 'Gala Feast, Live Symphony & Toast',
      title: 'Grand Wedding Reception',
      subtitle: 'Cocktails, Gourmet Feast & Live Symphony',
      image: 'assets/images/reception.jpg',
      date: 'Sunday, 13th Dec 2026',
      time: '07:00 PM Onwards',
      venue: 'Grand Palace Lawns & Royal Ballroom',
      dress: 'Black Tie & Royal Evening Gown',
      swatches: [
        { name: 'Tuxedo Black', color: '#1A1A1A' },
        { name: 'Champagne Gold', color: '#DFBA73' },
        { name: 'Rose Quartz', color: '#C28CAE' }
      ],
      calDate: '20261213T190000Z',
      desc: "The grand celebration of Mr. & Mrs. Sharma! Join us for a black-tie gala evening featuring a mesmerizing live symphony orchestra, heartfelt toasts by family and best friends, cutting of the royal wedding cake, an opulent multi-cuisine royal banquet, and dancing under the stars.",
      timeline: [
        { time: '07:00 PM', desc: 'Red Carpet Entrance & Photo Session with Newlyweds' },
        { time: '08:15 PM', desc: 'Welcome Address & Family Toast' },
        { time: '08:45 PM', desc: 'Royal Wedding Cake Cutting & First Dance' },
        { time: '09:15 PM', desc: 'Grand Gala Banquet Dinner & Live Symphony' }
      ],
      guestNote: "Professional portrait photographers will be available for family and couple portraits at the Red Carpet Photo Pavilion."
    }
  };

  /**
   * Initializes wedding event popup detail modal.
   * 
   * @returns {void}
   */
  function initEventsModal() {
    const eventCards = document.querySelectorAll('.event-card');
    const modal = document.getElementById('event-modal');
    if (!modal || !eventCards.length) return;

    const modalImg = document.getElementById('modal-event-img');
    const modalNum = document.getElementById('modal-event-num');
    const modalTag = document.getElementById('modal-event-tag');
    const modalCaption = document.getElementById('modal-event-caption');
    const modalTitle = document.getElementById('modal-event-title');
    const modalSubtitle = document.getElementById('modal-event-subtitle');
    const modalDesc = document.getElementById('modal-event-desc');
    const modalTimeline = document.getElementById('modal-event-timeline');
    const modalDate = document.getElementById('modal-event-date');
    const modalTime = document.getElementById('modal-event-time');
    const modalVenue = document.getElementById('modal-event-venue');
    const modalDress = document.getElementById('modal-event-dress');
    const modalSwatchesContainer = document.getElementById('modal-event-swatches');
    const modalGuestNote = document.getElementById('modal-event-guest-note');
    const modalBtnCalendar = document.getElementById('modal-btn-calendar');
    const closeBtn = document.getElementById('event-modal-close');
    const modalBtnClose = document.getElementById('modal-btn-close');
    const backdrop = document.getElementById('event-modal-backdrop');

    let currentCalEvent = null;

    function openModal(eventId) {
      const data = weddingEventsData[eventId];
      if (!data) return;

      if (modalImg) modalImg.src = data.image;
      if (modalNum) modalNum.textContent = data.num;
      if (modalTag) modalTag.textContent = data.tag;
      if (modalCaption) modalCaption.textContent = data.caption;
      if (modalTitle) modalTitle.textContent = data.title;
      if (modalSubtitle) modalSubtitle.textContent = data.subtitle;
      if (modalDesc) modalDesc.textContent = data.desc;
      if (modalDate) modalDate.textContent = data.date;
      if (modalTime) modalTime.textContent = data.time;
      if (modalVenue) modalVenue.textContent = data.venue;
      if (modalDress) modalDress.textContent = data.dress;
      if (modalGuestNote && data.guestNote) modalGuestNote.textContent = data.guestNote;

      // Render Color Swatches
      if (modalSwatchesContainer) {
        if (data.swatches && data.swatches.length) {
          modalSwatchesContainer.innerHTML = data.swatches.map((s) => `
            <div class="modal-swatch-chip" title="${s.name}">
              <span class="modal-swatch-dot" style="background-color: ${s.color};"></span>
              <span class="modal-swatch-name">${s.name}</span>
            </div>
          `).join('');
        } else {
          modalSwatchesContainer.innerHTML = '';
        }
      }

      // Render Timeline
      if (modalTimeline) {
        modalTimeline.innerHTML = data.timeline.map((item) => `
          <li class="modal-timeline-item">
            <div class="modal-timeline-marker">
              <span class="timeline-dot"></span>
            </div>
            <div class="modal-timeline-content">
              <span class="modal-timeline-time">${item.time}</span>
              <span class="modal-timeline-desc">${item.desc}</span>
            </div>
          </li>
        `).join('');
      }

      currentCalEvent = {
        title: data.title,
        date: data.calDate,
        venue: data.venue
      };

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    eventCards.forEach((card) => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-calendar')) return;
        const id = card.getAttribute('data-event-id');
        openModal(id);
      });
    });

    if (modalBtnCalendar) {
      modalBtnCalendar.addEventListener('click', () => {
        if (currentCalEvent && window.addToCalendar) {
          window.addToCalendar(currentCalEvent.title, currentCalEvent.date, currentCalEvent.venue);
        }
      });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modalBtnClose) modalBtnClose.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  /* ==========================================================================
     10. PHOTO GALLERY & FULLSCREEN LIGHTBOX VIEWER
     ========================================================================== */
  /**
   * Initializes fullscreen gallery image viewer.
   * 
   * @returns {void}
   */
  function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    if (!lightboxModal) return;

    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img && lightboxImg) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || 'Enlarged Wedding Gallery Photo';
          lightboxModal.classList.add('active');
        }
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        lightboxModal.classList.remove('active');
      });
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  /* ==========================================================================
     11. RSVP FORM SUBMISSION & SUCCESS MODAL
     ========================================================================== */
  /**
   * Validates guest attendance form and displays celebratory modal dialog.
   * 
   * @returns {void}
   */
  function initRSVP() {
    const rsvpForm = document.getElementById('rsvp-form');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    if (rsvpForm) {
      rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('guest-name');
        if (!nameInput || !nameInput.value.trim()) return;

        // Show Success Modal & Trigger celebratory fanfare
        if (successModal) {
          successModal.classList.add('active');
          firePartyPoppers();
        }

        rsvpForm.reset();
      });
    }

    if (closeModalBtn && successModal) {
      closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
      });
    }

    if (successModal) {
      successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
          successModal.classList.remove('active');
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && successModal && successModal.classList.contains('active')) {
        successModal.classList.remove('active');
      }
    });
  }

  /* ==========================================================================
     12. GOOGLE CALENDAR DEEP-LINK EXPORT UTILITY
     ========================================================================== */
  /**
   * Builds Google Calendar URL and opens it in a new window.
   * 
   * @param {string} eventTitle   - Event name
   * @param {string} startDateStr - ISO UTC date string
   * @param {string} locationStr  - Venue location string
   * @returns {void}
   */
  function addToCalendar(eventTitle, startDateStr, locationStr) {
    const title = encodeURIComponent(`Arun & Meera Wedding: ${eventTitle}`);
    const details = encodeURIComponent(
      `We can't wait to celebrate with you at ${eventTitle} during Arun & Meera's wedding festivities!`
    );
    const location = encodeURIComponent(locationStr);

    let dateParam = '20261212T043000Z/20261212T180000Z';
    if (startDateStr && startDateStr.length >= 15) {
      const y = startDateStr.slice(0, 4);
      const m = startDateStr.slice(4, 6);
      const d = startDateStr.slice(6, 8);
      const h = parseInt(startDateStr.slice(9, 11), 10) || 10;
      const min = startDateStr.slice(11, 13) || '00';
      const endH = String(Math.min(h + 4, 23)).padStart(2, '0');
      const endDateStr = `${y}${m}${d}T${endH}${min}00Z`;
      dateParam = `${startDateStr}/${endDateStr}`;
    }

    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dateParam}`;
    window.open(googleCalUrl, '_blank');
  }

  window.addToCalendar = addToCalendar;

  /* ==========================================================================
     13. MASTER BOOTSTRAP INITIALIZATION ON DOM READY
     ========================================================================== */
  /**
   * Initializes all modules in strict dependency sequence.
   * 
   * @returns {void}
   */
  function initAll() {
    initAudioController();
    initSparkles();
    initSplashCover();
    initScratchCard();
    initCountdown('December 12, 2026 10:00:00');
    initNavigation();
    initScrollReveal();
    initEventsModal();
    initGalleryLightbox();
    initRSVP();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
