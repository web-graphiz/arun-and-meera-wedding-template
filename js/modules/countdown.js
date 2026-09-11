/**
 * ==========================================================================
 * MODULE: AUSPICIOUS LIVE WEDDING COUNTDOWN TIMER
 * Project: Arun & Meera — Indian Wedding Invitation
 * Architecture: Real-Time Interval-Based Countdown Engine
 * ==========================================================================
 * 
 * Overview:
 * This module calculates the remaining time in Days, Hours, Minutes, and Seconds
 * leading up to the auspicious wedding date and updates the DOM elements every second.
 * It includes automatic zero-padding for clean two-digit typography.
 * 
 * Functions:
 * - initCountdown(targetDateStr) : Initializes the countdown timer loop.
 */

/**
 * Initializes and starts the 1-second interval countdown timer to the target date.
 * 
 * @param {string} [targetDateStr='December 12, 2026 10:00:00'] - Target wedding timestamp string
 * @returns {void}
 */
export function initCountdown(targetDateStr = 'December 12, 2026 10:00:00') {
  const weddingDate = new Date(targetDateStr).getTime();
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  // Verify that countdown DOM nodes exist before running
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  /**
   * Recalculates remaining time distance and updates DOM element text.
   * 
   * @returns {void}
   */
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Handle past date (e.g., when the wedding has already begun)
    if (distance < 0) {
      daysEl.innerText = '00';
      hoursEl.innerText = '00';
      minutesEl.innerText = '00';
      secondsEl.innerText = '00';
      return;
    }

    // Time calculations for Days, Hours, Minutes and Seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Format with leading zero if single digit for visual balance
    daysEl.innerText = days < 10 ? '0' + days : days;
    hoursEl.innerText = hours < 10 ? '0' + hours : hours;
    minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
    secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
  }

  // Update every second and execute immediately for instant UI render
  setInterval(updateCountdown, 1000);
  updateCountdown();
}
