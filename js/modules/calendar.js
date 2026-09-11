/**
 * ==========================================================================
 * MODULE: GOOGLE CALENDAR EXPORT UTILITY
 * Project: Arun & Meera — Indian Wedding Invitation
 * Architecture: ES6 Module / URL-Based Integration
 * ==========================================================================
 * 
 * Overview:
 * This module generates formatted Google Calendar event URLs allowing wedding
 * guests to add specific functions (Mayra, Sangeet, Mehendi, Haldi, Phere,
 * Reception) to their personal Google Calendar with a single click.
 * 
 * Functions:
 * - addToCalendar(eventTitle, startDateStr, locationStr) : Opens Google Calendar event creator.
 * - initCalendarButtons()                                : Exposes helper to global window scope.
 */

/**
 * Constructs a Google Calendar deep-link template URL and opens it in a new tab.
 * 
 * @param {string} eventTitle   - The title of the wedding event (e.g. 'Royal Sangeet & Dhol Night')
 * @param {string} startDateStr - The UTC start date timestamp in YYYYMMDDTHHMMSSZ format (e.g. '20261210T193000Z')
 * @param {string} locationStr  - The venue location string (e.g. 'The Leela Palace, Udaipur')
 * @returns {void}
 */
export function addToCalendar(eventTitle, startDateStr, locationStr) {
  // URL-encode all query parameters for browser safety
  const title = encodeURIComponent(`Arun & Meera Wedding: ${eventTitle}`);
  const details = encodeURIComponent(
    `We can't wait to celebrate with you at ${eventTitle} during Arun & Meera's royal wedding festivities!`
  );
  const location = encodeURIComponent(locationStr);

  // Default fallback date range if no timestamp is provided
  let dateParam = '20261212T043000Z/20261212T180000Z';

  // Calculate event end time (defaults to 4 hours duration after start time)
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

  // Generate the direct Google Calendar render URL
  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dateParam}`;

  // Open calendar creator in a new secure window/tab
  window.open(googleCalUrl, '_blank');
}

/**
 * Binds the calendar utility to the global window object for compatibility
 * with inline HTML `onclick` handlers and modal event listeners.
 * 
 * @returns {void}
 */
export function initCalendarButtons() {
  window.addToCalendar = addToCalendar;
}
