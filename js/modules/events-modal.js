/**
 * ==========================================================================
 * MODULE: ROYAL WEDDING FUNCTION DETAILS MODAL
 * Project: Arun & Meera — Indian Wedding Invitation
 * Architecture: Data-Driven Interactive Modal & Schedule Engine
 * ==========================================================================
 * 
 * Overview:
 * This module manages the interactive pop-up modal for each wedding function.
 * Clicking any event card opens an opulent detail view displaying high-res
 * photography, ceremony meaning, attire guidance with live color swatches,
 * step-by-step minute timeline, venue details, and direct Google Calendar export.
 * 
 * Data Schema:
 * weddingEventsData: Dictionary keyed by event ID (1 to 6) containing:
 *   - num        : Formatted string index ('01', '02', etc.)
 *   - tag        : Day / Session indicator ('DAY 1 MORNING')
 *   - caption    : Short poetic subtitle
 *   - title      : Primary function name ('Ganesh Sthapana & Mayra')
 *   - subtitle   : Secondary descriptive title
 *   - image      : High-res background image path
 *   - date       : Human-readable date string
 *   - time       : Human-readable time duration
 *   - venue      : Exact venue location inside palace grounds
 *   - dress      : Recommended dress code & styling tips
 *   - swatches   : Array of recommended color palette chips [{ name, color }]
 *   - calDate    : UTC timestamp in YYYYMMDDTHHMMSSZ format for Google Calendar
 *   - desc       : Cultural meaning, tradition & ceremony overview
 *   - timeline   : Array of chronological ritual checkpoints [{ time, desc }]
 *   - guestNote  : Helpful tips for guests (turbans, chunnis, petals, etc.)
 * 
 * Functions:
 * - initEventsModal() : Binds event listeners to cards, buttons, backdrops & keyboard ESC.
 */

/**
 * Complete data repository for all 6 wedding celebrations.
 * Easily customized by editing dates, times, venues, dress palettes, and ritual descriptions.
 */
export const weddingEventsData = {
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
 * Initializes the interactive event detail modal viewer.
 * Binds click events on cards, handles dynamic data injection,
 * renders timeline items and dress code swatches, and configures dismiss triggers.
 * 
 * @returns {void}
 */
export function initEventsModal() {
  const eventCards = document.querySelectorAll('.event-card');
  const modal = document.getElementById('event-modal');
  if (!modal || !eventCards.length) return;

  // Cache DOM references for modal elements
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

  /** @type {Object|null} Cached calendar event metadata for active modal */
  let currentCalEvent = null;

  /**
   * Injects function details into modal markup and triggers slide-up animation.
   * 
   * @param {string|number} eventId - Unique function ID (1 - 6)
   * @returns {void}
   */
  function openModal(eventId) {
    const data = weddingEventsData[eventId];
    if (!data) return;

    // Populate textual & media fields
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

    // Dynamically render color palette swatches
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

    // Dynamically render schedule timeline
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

    // Cache active calendar event details
    currentCalEvent = {
      title: data.title,
      date: data.calDate,
      venue: data.venue
    };

    // Show modal and lock background body scroll
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Closes the active event modal and restores body scroll.
   * 
   * @returns {void}
   */
  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Bind click listener to all function cards
  eventCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      // Don't trigger modal if clicking the calendar button directly
      if (e.target.closest('.btn-calendar')) return;
      const id = card.getAttribute('data-event-id');
      openModal(id);
    });
  });

  // Modal Google Calendar Button
  if (modalBtnCalendar) {
    modalBtnCalendar.addEventListener('click', () => {
      if (currentCalEvent && window.addToCalendar) {
        window.addToCalendar(currentCalEvent.title, currentCalEvent.date, currentCalEvent.venue);
      }
    });
  }

  // Dismiss listeners
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modalBtnClose) modalBtnClose.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  // Close on ESC key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}
