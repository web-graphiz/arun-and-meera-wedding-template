/**
 * ==========================================================================
 * MODULE: STICKY NAVIGATION, MOBILE DRAWER & ACTIVE SECTION SCROLLSPY
 * Project: Arun & Meera — Indian Wedding Invitation
 * Architecture: Passive Scroll Observer & Navigation Manager
 * ==========================================================================
 * 
 * Overview:
 * This module manages the top navigation bar behavior:
 * 1. Sticky background glassmorphism elevation on page scroll.
 * 2. Real-time ScrollSpy indicating the current visible section in menu links.
 * 3. Mobile hamburger menu drawer toggle with auto-collapse on selection.
 * 
 * Functions:
 * - initNavigation() : Binds scroll, resize, and mobile toggle listeners.
 */

/**
 * Initializes navigation bar scroll listeners, mobile menu toggling, and section scrollspy.
 * 
 * @returns {void}
 */
export function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  /**
   * Applies elevated glassmorphism styling when user scrolls past 80px.
   * 
   * @returns {void}
   */
  function handleNavbarScroll() {
    if (navbar) {
      if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }

  /**
   * Calculates current vertical scroll position and highlights the corresponding menu item.
   * Accounts for dynamic navbar height and scroll offsets.
   * 
   * @returns {void}
   */
  function updateActiveSection() {
    if (!sections.length || !navLinks.length) return;

    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const navHeight = navbar ? navbar.offsetHeight : 70;
    const scrollPosition = scrollY + navHeight + 60;

    let currentId = '';

    // Check if scrolled near the bottom of document (activates last section, e.g. RSVP)
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

    // Default to the first section if at the very top of page
    if (!currentId && scrollY < 300 && sections.length > 0) {
      currentId = sections[0].getAttribute('id');
    }

    // Update active class on matching anchor link
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Register passive scroll and resize listeners for maximum 60fps performance
  window.addEventListener('scroll', () => {
    handleNavbarScroll();
    updateActiveSection();
  }, { passive: true });

  window.addEventListener('resize', updateActiveSection);

  // Initial execution to set initial navbar state on page load
  handleNavbarScroll();
  updateActiveSection();

  // Mobile Menu Drawer Toggle
  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('mobile-active');
    });
  }

  // Smooth click handling & auto-closing mobile menu on item tap
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
