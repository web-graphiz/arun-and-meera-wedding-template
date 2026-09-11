# Arun & Meera — Royal Indian Wedding Invitation Template

> A luxury, interactive, mobile-responsive Indian & Marwadi wedding invitation web template built with vanilla HTML5, modular CSS3, and ES6 JavaScript. Features an interactive 3D envelope splash screen, zero-dependency Web Audio Indian classical raga synthesizer, metallic gold foil scratch-card ticket, dual-cannon celebratory confetti physics engine, interactive 6-event schedule modal suite with color swatches, one-click Google Calendar integration, photo gallery lightbox, and RSVP guestbook.

---

## 🌟 Table of Contents

1. [Key Highlights & Visual Showcase](#-key-highlights--visual-showcase)
2. [Interactive Features Deep-Dive](#-interactive-features-deep-dive)
3. [Architecture & Directory Structure](#-architecture--directory-structure)
4. [Technical Specifications](#-technical-specifications)
5. [Quick Start & Local Setup](#-quick-start--local-setup)
6. [Complete Customization Guide](#-complete-customization-guide)
   - [6.1 Couple Names & Taglines](#61-couple-names--taglines)
   - [6.2 Auspicious Wedding Date & Countdown Target](#62-auspicious-wedding-date--countdown-target)
   - [6.3 Customizing Wedding Events, Timelines & Swatches](#63-customizing-wedding-events-timelines--swatches)
   - [6.4 Color Palette & Design Tokens](#64-color-palette--design-tokens)
   - [6.5 Typography & Google Fonts](#65-typography--google-fonts)
   - [6.6 Images & Photography](#66-images--photography)
   - [6.7 Ambient Music & Custom Audio Tracks](#67-ambient-music--custom-audio-tracks)
   - [6.8 Connecting RSVP to Backend Endpoints](#68-connecting-rsvp-to-backend-endpoints)
7. [Browser & Device Compatibility](#-browser--device-compatibility)
8. [Troubleshooting & FAQs](#-troubleshooting--faqs)
9. [License & Credits](#-license--credits)

---

## ✨ Key Highlights & Visual Showcase

- 🪷 **Auspicious Royal Theme**: Curated royal color palette combining deep Eucalyptus green (`#244B40`), warm metallic golds (`#C5A059`), ivory alabaster (`#FAF8F4`), and sandstone tones.
- 💌 **3D Interactive Envelope Cover**: Parallax-tilted 3D golden envelope splash screen with Auspicious Ganesha invocation (`|| ॐ श्री गणेशाय नमः ||`), animated glow aura, and smooth opening unwrap transition.
- 🎶 **Native Web Audio Synthesizer**: Zero-dependency browser Web Audio API engine synthesizing peaceful pentatonic sitar/flute melodies (*Raag Hansdhwani* & *Raag Bhupali*) and celebratory fanfare arpeggio pops.
- 🎟️ **Metallic Gold Foil Scratch Card**: Interactive HTML5 canvas scratch ticket where guests scratch off shimmering gold foil to uncover the muhurat wedding date, venue, and live countdown clock. Includes auto-reveal at >= 18% scratch threshold and a one-tap "Quick Reveal" option.
- 🎊 **Dual-Cannon Confetti Physics Engine**: Full-screen 2D canvas physics simulation shooting gold, ruby, and teal celebratory confetti with realistic drag, gravity, and 3D tumbling rotation.
- 📅 **Interactive 6-Function Events Suite**: Dedicated cards and slide-up detail modals for Ganesh Sthapana & Mayra, Mehndi & Sundowner, Sangeet & Dhol Night, Haldi & Phoolon Holi, Shahi Baraat & Phere, and Grand Reception. Includes dress codes with live color swatch chips and minute-by-minute ritual timelines.
- 📆 **One-Click Google Calendar Integration**: Deep-linked Google Calendar event generator automatically calculating UTC ISO dates and locations for every function.
- ⏳ **Live Auspicious Countdown Clock**: Real-time ticker counting down Days, Hours, Minutes, and Seconds with automatic zero-padding typography.
- 🖼️ **Photo Gallery & Lightbox Viewer**: Masonry-style photo showcase with fullscreen animated modal viewer, keyboard `Escape` dismiss, and backdrop tap support.
- ✉️ **RSVP & Blessings Guestbook**: Comprehensive guest response form collecting attendance, guest count, dietary preferences (Jain/Pure Veg/Standard), and heartfelt blessings with celebration confirmation modal.
- 📱 **Mobile-First & Ultra-Responsive**: Handcrafted CSS Grid and Flexbox layouts optimized for iOS Safari, Android Chrome, tablets, laptops, and ultra-wide displays.

---

## 🔍 Interactive Features Deep-Dive

### 1. 3D Envelope Splash Screen (`js/modules/splash.js`, `css/components/splash.css`)
- **Parallax Physics**: On desktop, moving the cursor over the screen tilts the envelope along the X and Y axes (`rotateY` / `rotateX`) inside a 1200px 3D perspective viewport.
- **Ambient Sparkles Canvas**: 40 floating, pulsing gold particles gently drift and twinkle across the background.
- **Unwrap Trigger**: Clicking "Open Royal Invitation" or tapping the couple portrait medallion initiates a smooth zoom-out scale transition, auto-starts the ambient background melody, and reveals the main invitation page.

### 2. Ambient Web Audio Synthesizer (`js/modules/audio.js`, `css/components/audio-player.css`)
- **Zero External Dependencies**: Does not rely on heavy MP3 files to play music; uses browser `OscillatorNode` and `GainNode` audio graphs.
- **Indian Classical Scales**: Generates gentle sine-wave frequencies corresponding to *Raag Hansdhwani* (D4, E4, F#4, A4, B4, D5, E5) with a human-like randomized interval (400ms – 1200ms).
- **Floating Controller**: Includes a fixed floating music pill with animated equalizer bars that guests can click to mute/unmute at any point.

### 3. Metallic Foil Scratch Card Ticket (`js/modules/scratch-card.js`, `css/components/hero.css`)
- **Multi-Stop Metallic Gradient**: Canvas rendering with 5-color gold linear gradient, ornamental inner borders, and 160+ sparkle flecks.
- **Composite Eraser**: Uses `ctx.globalCompositeOperation = 'destination-out'` to connect consecutive pointer coordinates with 44px rounded brush strokes.
- **Subsampled Performance**: Analyzes alpha transparency by subsampling every 8th pixel (32 bytes) at a 60fps throttled rate. Triggers the full reveal once 18% of the surface is scratched.
- **Cross-Input Compatibility**: Supports modern `PointerEvents` with `setPointerCapture` alongside legacy touch and mouse event fallbacks.

### 4. Dual-Cannon Confetti Explosion (`js/modules/confetti.js`)
- **Particle Dynamics**: 180 particles launched simultaneously from the bottom-left (45°) and bottom-right (135°) corners.
- **Realistic Physics**: Calculates drag friction (`0.985`), downward gravity (`0.35`), and angular tumbling velocity per frame for 4.5 seconds.
- **Dual Trigger**: Activated automatically upon completing the scratch card reveal or submitting the RSVP form.

### 5. Interactive Wedding Events Modal Suite (`js/modules/events-modal.js`, `css/components/events.css`)
- **Data-Driven Architecture**: All event information is managed inside a clean dictionary schema (`weddingEventsData`).
- **Dynamic Color Swatches**: Renders interactive color chips (e.g., Bandhani Red, Pastel Mint, Sunshine Yellow, Royal Crimson, Tuxedo Black) indicating dress code colors.
- **Ritual Timeline**: Formats chronological ceremony milestones with gold marker dots.
- **Direct Calendar Export**: One-tap button that generates a Google Calendar event for that specific function.

---

## 📁 Architecture & Directory Structure

```
Arun and Meera/
├── assets/
│   ├── audio/                      # Audio assets & audio integration notes
│   │   └── README.md               # Guide for integrating custom MP3 audio files
│   └── images/                     # Optimized high-resolution imagery
│       ├── favicon.svg             # Royal gold monogram favicon
│       ├── hero-couple.jpg         # Couple portrait used in splash & hero section
│       ├── mayra.jpg               # Ganesh Sthapana & Mayra ceremony photo
│       ├── mehendi.jpg             # Royal Mehndi & Sundowner photo
│       ├── sangeet.jpg             # Royal Sangeet & Dhol Night photo
│       ├── haldi.jpg               # Vibrant Haldi & Phoolon Holi photo
│       ├── phere.jpg               # Shahi Baraat & Royal Phere photo
│       ├── reception.jpg           # Grand Wedding Reception photo
│       ├── gallery-1.jpg           # Photo gallery item 1
│       ├── gallery-2.jpg           # Photo gallery item 2
│       ├── gallery-3.jpg           # Photo gallery item 3
│       └── gallery-4.jpg           # Photo gallery item 4
├── favicon.svg                     # Direct root favicon fallback
├── css/
│   ├── base/
│   │   ├── variables.css           # Color tokens, typography scales, radii & shadows
│   │   ├── reset.css               # Box-sizing normalize, scrollbar & base canvas
│   │   └── typography.css          # Section headings, dividers, ornaments & buttons
│   ├── components/
│   │   ├── splash.css              # 3D Envelope cover, portrait medallion & CTA
│   │   ├── audio-player.css        # Floating equalizer button & audio bars
│   │   ├── navbar.css              # Glassmorphism sticky navbar & mobile drawer
│   │   ├── hero.css                # 2-Column hero card, wreath grid & scratch ticket
│   │   ├── blessings.css           # Family lineage & blessings cards
│   │   ├── story.css               # Love story milestone timeline
│   │   ├── events.css              # 6-Card events grid, schedule & pop-up modal
│   │   ├── gallery.css             # Photo gallery grid & lightbox modal
│   │   ├── venue.css               # Destination card & travel feature grid
│   │   ├── rsvp.css                # RSVP form, inputs & confirmation modal
│   │   └── footer.css              # Royal footer & copyright section
│   ├── utilities/
│   │   └── animations.css          # Keyframe animations, shimmers & scroll reveals
│   ├── animations.css              # Backward-compatible animation stylesheet
│   └── style.css                   # Central stylesheet importing all modular components
├── js/
│   ├── modules/
│   │   ├── audio.js                # Web Audio API Synthesizer (Raag Hansdhwani melody)
│   │   ├── calendar.js             # Google Calendar URL builder & deep-link generator
│   │   ├── confetti.js             # Dual-cannon celebratory party popper canvas engine
│   │   ├── countdown.js            # Auspicious live wedding countdown timer
│   │   ├── events-modal.js         # Function details data, timeline & modal viewer
│   │   ├── gallery.js              # Fullscreen photo lightbox viewer
│   │   ├── navigation.js           # Sticky navbar scroll listener & mobile drawer toggle
│   │   ├── rsvp.js                 # RSVP form submission handler & modal feedback
│   │   ├── scratch-card.js         # Metallic foil scratch card ticket & quick-reveal
│   │   ├── scroll-reveal.js        # Intersection Observer for smooth scroll animations
│   │   ├── sparkles.js             # Ambient floating gold particles background canvas
│   │   └── splash.js               # 3D tilt envelope & invitation unlock logic
│   └── main.js                     # Master ES6 orchestrator and standalone bundle
├── index.html                      # Semantic HTML5 document linking all modern modules
└── README.md                       # Comprehensive documentation and developer guide
```

---

## ⚙️ Technical Specifications

| Parameter | Specification | Details |
| :--- | :--- | :--- |
| **Core Languages** | HTML5, CSS3, ES6 JavaScript | Zero build step required; runs instantly in all browsers |
| **CSS Architecture** | Modular Component-Based CSS | 100% Vanilla CSS with CSS Custom Properties (Variables) |
| **Audio Engine** | Web Audio API (`AudioContext`) | Real-time synthesis of pentatonic raga chords & sound effects |
| **Graphics Engine** | HTML5 2D Canvas API | Used for scratch card eraser, confetti physics, and sparkle particles |
| **Scroll Animation** | `IntersectionObserver` API | Passive viewport detection with GPU-accelerated CSS transforms |
| **Responsive Layout** | CSS Grid & Flexbox | Custom fluid breakpoints at 1024px, 768px, 640px, and 480px |
| **Typography** | Google Fonts | *Cinzel*, *Playfair Display*, *Cormorant Garamond*, *Great Vibes*, *Montserrat* |
| **Iconography** | Font Awesome 6 | CDN-linked SVG web icons for venue, calendar, and UI badges |
| **Bundle Modes** | Dual Compatibility | Operates via modular ES6 imports or standalone IIFE in `js/main.js` |

---

## 🚀 Quick Start & Local Setup

You can run this project locally without any complex build tools or bundlers.

### Option 1: Direct File Open
Simply double-click `index.html` or open it directly in any browser (`Chrome`, `Safari`, `Edge`, `Firefox`).

### Option 2: Using Python (Recommended)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Open `http://localhost:8000` in your web browser.

### Option 3: Using Node.js / NPX
```bash
npx serve .
# Or using http-server
npx http-server -p 8000
```

### Option 4: VS Code Live Server
Right-click on `index.html` inside VS Code and select **"Open with Live Server"**.

---

## 🎨 Complete Customization Guide

### 6.1 Couple Names & Taglines
Search and replace occurrences of **"Arun"** and **"Meera"** across the following files:
1. **`index.html`**:
   - `<title>` tag and `<meta name="description">`
   - Splash screen header (`<h1 class="envelope-names">`)
   - Navigation brand text (`<span class="nav-brand-text">`)
   - Hero section couple names (`<h1 class="couple-title">`)
   - Footer section (`<h2 class="footer-names">` and `#ArunWedsMeera`)
2. **`js/modules/events-modal.js`** & **`js/main.js`**:
   - Event titles and guest note strings inside `weddingEventsData`.

---

### 6.2 Auspicious Wedding Date & Countdown Target
1. Open `js/main.js` (or `js/modules/countdown.js`):
2. Locate the initialization call near the bottom:
   ```javascript
   initCountdown('December 12, 2026 10:00:00');
   ```
3. Update the string to your wedding date and time (format: `Month DD, YYYY HH:MM:SS`).
4. Update the visible date badge in `index.html` within the hero section and scratch card revealed details box.

---

### 6.3 Customizing Wedding Events, Timelines & Swatches
All event data is centralized in `js/modules/events-modal.js` (and mirrored in `js/main.js` for standalone usage).

To edit or add a ceremony:
```javascript
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
    calDate: '20261210T100000Z', // Format: YYYYMMDDTHHMMSSZ (UTC)
    desc: "Your ritual overview description...",
    timeline: [
      { time: '10:00 AM', desc: 'Auspicious Ganesh Pujan & Vedic Chants' },
      { time: '11:15 AM', desc: 'Grand Arrival of Mama & Family with Royal Dhol' },
      { time: '12:00 PM', desc: 'Mayra Bhaat Presentation & Chunni Rasam' },
      { time: '01:00 PM', desc: 'Royal Marwadi Royal Thali Feast' }
    ],
    guestNote: "Traditional safas and chunnis will be presented to all arriving guests."
  }
  // Repeat for events 2 through 6...
};
```

---

### 6.4 Color Palette & Design Tokens
Open `css/base/variables.css` to adjust the root CSS custom properties:
```css
:root {
  /* Background Canvas */
  --bg-primary: #FAF8F4;        /* Warm Ivory Alabaster */
  --bg-secondary: #F3EFE6;      /* Sandstone Tint */
  --bg-card: #FFFFFF;

  /* Signature Green */
  --teal-primary: #244B40;      /* Deep Eucalyptus Green */
  --teal-accent: #628F87;       /* Dusty Sage Teal */

  /* Metallic Gold */
  --gold-primary: #C5A059;      /* Warm Regal Gold */
  --gold-dark: #A6813B;
  --gold-gradient: linear-gradient(135deg, #C5A059 0%, #ECDDB0 40%, #B88F42 70%, #DFC588 100%);
}
```

---

### 6.5 Typography & Google Fonts
Fonts are linked in `index.html` from Google Fonts and defined in `css/base/variables.css`:
- **`--font-title`**: `'Cinzel', serif` (Badges, tags, and small capitals)
- **`--font-heading`**: `'Playfair Display', serif` (Section titles and main headings)
- **`--font-serif`**: `'Cormorant Garamond', serif` (Descriptions, quotes, and ceremony texts)
- **`--font-script`**: `'Great Vibes', cursive` (Romantic signatures and accents)
- **`--font-body`**: `'Montserrat', sans-serif` (Clean UI text and form inputs)

---

### 6.6 Images & Photography
Replace the JPG images in `assets/images/` with your own photography. For best performance and visual elegance, use the following recommended dimensions:

| Image File | Recommended Dimensions | Purpose |
| :--- | :--- | :--- |
| `hero-couple.jpg` | `1200 x 1500 px` (Portrait) | Splash screen medallion & Hero couple frame |
| `mayra.jpg` | `1000 x 650 px` (Landscape) | Event 1: Mayra & Ganesh Sthapana card & modal |
| `mehendi.jpg` | `1000 x 650 px` (Landscape) | Event 2: Mehndi & Sundowner card & modal |
| `sangeet.jpg` | `1000 x 650 px` (Landscape) | Event 3: Sangeet & Dhol Night card & modal |
| `haldi.jpg` | `1000 x 650 px` (Landscape) | Event 4: Haldi & Phoolon Holi card & modal |
| `phere.jpg` | `1000 x 650 px` (Landscape) | Event 5: Baraat & Phere card & modal |
| `reception.jpg` | `1000 x 650 px` (Landscape) | Event 6: Grand Reception card & modal |
| `gallery-1.jpg` – `gallery-4.jpg` | `1200 x 800 px` | Photo gallery grid and fullscreen lightbox |
| `favicon.svg` | Vector SVG | Browser tab icon |

---

### 6.7 Ambient Music & Custom Audio Tracks
By default, the template uses an ultra-fast **Web Audio API synthesizer** playing *Raag Hansdhwani*.

If you wish to replace the synthesizer with a real MP3/AAC audio file:
1. Place your audio file into `assets/audio/wedding-song.mp3`.
2. Add an `<audio>` tag to `index.html`:
   ```html
   <audio id="bg-audio" loop preload="auto" src="assets/audio/wedding-song.mp3"></audio>
   ```
3. Update `toggleAudio()` in `js/modules/audio.js` (and `js/main.js`):
   ```javascript
   const audioElement = document.getElementById('bg-audio');
   function toggleAudio(btn) {
     if (audioElement.paused) {
       audioElement.play();
       btn.classList.add('audio-playing');
     } else {
       audioElement.pause();
       btn.classList.remove('audio-playing');
     }
   }
   ```

---

### 6.8 Connecting RSVP to Backend Endpoints
In `index.html`, the form is defined as:
```html
<form id="rsvp-form">
  <!-- Inputs: guest-name, guest-attendance, guest-count, guest-diet, guest-wishes -->
</form>
```

To forward responses to your backend, Google Sheets, or services like Formspree, update `js/modules/rsvp.js`:
```javascript
rsvpForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById('guest-name').value,
    attendance: document.getElementById('guest-attendance').value,
    count: document.getElementById('guest-count').value,
    diet: document.getElementById('guest-diet').value,
    wishes: document.getElementById('guest-wishes').value,
    timestamp: new Date().toISOString()
  };

  try {
    await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    // Display confirmation dialog & fire celebratory confetti
    successModal.classList.add('active');
    firePartyPoppers();
    rsvpForm.reset();
  } catch (err) {
    alert('Thank you! Your response has been noted.');
  }
});
```

---

## 🌐 Browser & Device Compatibility

| Platform / Browser | Status | Features Tested |
| :--- | :--- | :--- |
| **Google Chrome (Desktop & Android)** | ✅ 100% Full Support | 3D tilt, Web Audio, Canvas scratch, Confetti, Modals |
| **Apple Safari (macOS & iOS iPhone/iPad)** | ✅ 100% Full Support | Touch pointer capture, Webkit AudioContext, Backdrop filters |
| **Mozilla Firefox (Desktop & Mobile)** | ✅ 100% Full Support | 2D Canvas composite eraser, Grid layouts, Smooth scroll |
| **Microsoft Edge (Windows & Mac)** | ✅ 100% Full Support | IntersectionObserver, Keyboard ESC navigation, CSS Gradients |
| **Samsung Internet & Mobile Browsers** | ✅ 100% Full Support | Touch gestures, Modal body-lock, Responsive typography |

---

## ❓ Troubleshooting & FAQs

#### Q1: Why doesn't music play immediately on page load?
> **Answer**: Modern web browsers (Chrome, Safari, iOS) enforce strict **Audio Autoplay Policies** requiring user interaction (click, tap) before audio can play. In this template, music automatically begins when the guest taps **"Open Royal Invitation"** on the splash screen.

#### Q2: What happens if a guest is using a stylus or finger on mobile to scratch?
> **Answer**: `js/modules/scratch-card.js` implements the unified **PointerEvents API** with `pointercapture` and `touch-action: none`. It works seamlessly with finger touch, Apple Pencil/stylus, and standard mouse cursors.

#### Q3: How do the Google Calendar timezones work?
> **Answer**: In `js/modules/events-modal.js`, the `calDate` timestamps are specified in ISO 8601 UTC format (`YYYYMMDDTHHMMSSZ`). Google Calendar automatically converts this timestamp to the guest's local device timezone.

#### Q4: Can I run this template entirely offline without an internet connection?
> **Answer**: Yes! The template's JavaScript, CSS, animations, and Web Audio raga synthesizer have **zero external JS dependencies**. To make it 100% offline-ready, download the Google Fonts and Font Awesome stylesheet locally.

---

## 📄 License & Credits

- **Designed & Developed for**: Arun & Meera Royal Indian Wedding.
- **Architecture**: Modular Vanilla ES6 & CSS3 Design System.
- **Fonts**: *Cinzel*, *Playfair Display*, *Cormorant Garamond*, *Great Vibes*, *Montserrat* (Google Fonts).
- **Icons**: Font Awesome 6.
- **License**: MIT License. Free to use, customize, and distribute for personal and commercial wedding invitations.
