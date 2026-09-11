/**
 * ==========================================================================
 * MODULE: RSVP FORM SUBMISSION & SUCCESS MODAL
 * Project: Arun & Meera — Indian Wedding Invitation
 * Architecture: Interactive Form Submission & Celebration Handler
 * ==========================================================================
 * 
 * Overview:
 * This module handles client-side RSVP form processing:
 * 1. Validates required input fields (Guest Name).
 * 2. Prevents default form refresh and displays the royal confirmation modal.
 * 3. Triggers celebratory confetti poppers and fanfare audio upon confirmation.
 * 4. Resets the form inputs and manages modal dismiss actions (click / keyboard ESC).
 * 
 * Functions:
 * - initRSVP() : Binds submit listeners to the RSVP form and close triggers to the success modal.
 */

import { firePartyPoppers } from './confetti.js';

/**
 * Initializes the RSVP guestbook form submission handler and success dialog.
 * 
 * @returns {void}
 */
export function initRSVP() {
  const rsvpForm = document.getElementById('rsvp-form');
  const successModal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('guest-name');
      // Ensure guest name is entered before processing
      if (!nameInput || !nameInput.value.trim()) return;

      // Show Success Feedback Modal
      if (successModal) {
        successModal.classList.add('active');
        // Trigger celebratory confetti burst and chime fanfare
        firePartyPoppers();
      }

      // Reset form fields
      rsvpForm.reset();
    });
  }

  // Dismiss button inside modal
  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
    });
  }

  // Dismiss on clicking backdrop outside modal content
  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
      }
    });
  }

  // Dismiss on pressing keyboard Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successModal && successModal.classList.contains('active')) {
      successModal.classList.remove('active');
    }
  });
}
