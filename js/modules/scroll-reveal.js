/**
 * ==========================================================================
 * MODULE: INTERSECTION OBSERVER SCROLL REVEALS
 * Project: Arun & Meera — Indian Wedding Invitation
 * Architecture: High-Performance IntersectionObserver Engine
 * ==========================================================================
 * 
 * Overview:
 * This module observes elements with reveal classes (.reveal, .reveal-left,
 * .reveal-right, .zoom-in) and activates them with subtle, elegant CSS entry
 * transitions as they enter the guest's viewport during scrolling.
 * 
 * Functions:
 * - initScrollReveal() : Creates IntersectionObserver and attaches to target elements.
 */

/**
 * Initializes viewport intersection observer for scroll-triggered entrance animations.
 * 
 * @returns {void}
 */
export function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .zoom-in'
  );
  if (!revealElements.length) return;

  // Configure observer with 15% visibility threshold
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Optional: Unobserve after activation to save CPU cycles
          // revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  // Attach observer to each marked DOM node
  revealElements.forEach((el) => revealObserver.observe(el));
}
