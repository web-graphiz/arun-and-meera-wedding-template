/**
 * ==========================================================================
 * MODULE: PHOTO GALLERY & FULLSCREEN LIGHTBOX VIEWER
 * Project: Arun & Meera — Indian Wedding Invitation
 * Architecture: Accessible Modal Lightbox Engine
 * ==========================================================================
 * 
 * Overview:
 * This module enables fullscreen viewing of high-resolution couple photographs
 * with smooth fade-in animations, backdrop-click dismiss, and keyboard accessibility (ESC key).
 * 
 * Functions:
 * - initGalleryLightbox() : Binds click listeners to gallery grid items and handles modal visibility.
 */

/**
 * Initializes the interactive photo lightbox modal.
 * Attaches click handlers to gallery thumbnails and manages modal opening/closing.
 * 
 * @returns {void}
 */
export function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  if (!lightboxModal) return;

  // Open lightbox with clicked image
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

  // Close on close icon click
  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });
  }

  // Close on backdrop overlay click
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      lightboxModal.classList.remove('active');
    }
  });

  // Close on keyboard ESC press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
      lightboxModal.classList.remove('active');
    }
  });
}
