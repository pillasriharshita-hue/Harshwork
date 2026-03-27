# Harshita Pilla — Portfolio Website Plan

## Site Overview
- **Owner:** Sri Harshita Pilla — Product Designer
- **Stack:** Static HTML / CSS / JS (no framework)
- **Hosting:** Vercel (GitHub: pillasriharshita-hue/Harshwork)
- **Theme:** Dark mode (#0D0D0D), orange accent (#E8734A)
- **Fonts (Homepage):** Playfair Display (display), Inter (body)
- **Fonts (Case Studies):** Varies per project (see below)
- **Inspiration:** siddharthhardikar.framer.website (homepage), sanaz.me (case studies)

---

## Global Requirements

### Responsive Design (ALL pages)
Every page must work flawlessly across 4 breakpoints:
- **Desktop:** 1200px+
- **Tablet landscape:** 900–1199px
- **Tablet portrait:** 600–899px
- **Mobile:** <600px

**Responsive rules:**
- Grids collapse: 4-col → 2-col → 1-col
- Hero splits: 2-col → stacked
- Nav: full bar → hamburger menu on mobile
- Cards: side-by-side → stacked
- Font sizes: clamp() for fluid scaling
- Images: max-width:100%, object-fit:cover
- Touch targets: min 44px on mobile
- Carousels: swipe-enabled on touch devices

### Micro Interactions (ALL sections)
Every section and interactive element gets subtle motion/feedback:

| Element | Interaction | Detail |
|---------|------------|--------|
| **Nav links** | Hover | Underline slide-in from left, color shift to accent |
| **Scroll nav** | Scroll trigger | Slides down with spring ease, blur bg |
| **Project cards** | Hover | Slight lift (translateY -4px), border glow, shadow expand |
| **Project cards** | Click/tap | Scale down 0.98 → navigate |
| **Mini cards (carousel)** | Hover | Tilt (subtle 3D perspective), border highlight |
| **Carousel arrows** | Hover | Scale 1.1, bg fill animation |
| **Carousel** | Swipe (mobile) | Touch-drag with momentum, snap to nearest |
| **CTA buttons** | Hover | Arrow slides right 4px, bg fill sweep |
| **CTA buttons** | Click | Ripple effect |
| **Images** | Scroll into view | Fade up + slight scale (0.97 → 1) |
| **Text blocks** | Scroll into view | Fade up with stagger (children delay 0.05s each) |
| **Stats numbers** | Scroll into view | Count-up animation (0 → final number) |
| **Tags/pills** | Hover | Background fill, slight scale |
| **Footer links** | Hover | Color shift + underline |
| **Page load** | On load | Staggered reveal: nav → hero text → hero image → sections |
| **Progress bar** | Scroll | Smooth width transition, amber gradient |
| **Glossary rows** | Hover | Row highlight with subtle bg shift |
| **Theme rows** | Hover | Left border accent appears |
| **Principle cards** | Hover | Subtle border-color shift to amber |
| **Decision cards** | Hover on chosen | Amber glow intensifies |
| **Feature cards** | Hover | Lift + amber border |
| **Iteration rows** | Hover | Row bg slightly lighter |
| **Reflection cards** | Hover | Lift + colored border (matches label color) |
| **Scroll indicator** | On load | Bounce animation at hero bottom |
| **Page transitions** | Navigate | Fade out current → fade in next (CSS only) |
| **Cursor** | Over interactive | pointer + subtle scale on clickable elements |

### Navbar — Calendly Integration
- Add "Book a Call" / "Schedule" button to the nav on ALL pages
- Opens Calendly popup widget (not redirect)
- Uses Calendly embed script: `https://assets.calendly.com/assets/external/widget.js`
- Styled as accent-color pill button in nav
- On mobile: icon-only in hamburger menu, full text in menu panel
- **Calendly URL:** TBD (Harshita to provide her Calendly link)

---

## Pages

### 1. Homepage — `index.html` ✅ BUILT → NEEDS: Responsive + Micro Interactions + Calendly
**Layout:** Siddharth Hardikar style
- **Topbar** — Fixed, avatar + name (left), location + live clock (right)
  - Mobile: stack vertically or hide clock
- **Scroll Nav** — Hidden by default, pill-style nav slides in on scroll
  - Links: Home, Work, About, Resume, **Book a Call** (Calendly)
  - Mobile: hamburger icon, slide-out menu
- **Hero** — Two-column: intro text (left 38%), billboard illustration (right)
  - Mobile: stack — text first, illustration below (smaller)
  - Micro: staggered fade-in (name → tagline → roles → illustration)
- **Recent Works** — 2 featured cards
  - Mobile: full-width stacked
  - Micro: card hover lift, image parallax on hover
- **Other Works** — Looping carousel
  - Mobile: 1 card visible, swipe-enabled
  - Tablet: 2 cards visible
  - Micro: swipe momentum, dot indicator pulse on change
- **Footer** — Location, email, copyright, social links
  - Mobile: centered, stacked

### 2. UttishaNow Case Study — `uttishanow.html` ✅ BUILT → NEEDS: Responsive + Micro Interactions
**Responsive fixes needed:**
- Split layouts (text + image) → stack on mobile
- Carousels → touch-swipe on mobile
- Journey map carousel → full-width on mobile
- Participant cards → 1-col on mobile
- All images → fluid width

### 3. Wander Case Study — `wander.html` ✅ BUILT → NEEDS: Assets + Responsive check
**Already has responsive CSS** (media queries at 900px and 600px)
**Needs:**
- Assets added to `assets/wander/`
- Touch swipe for any future carousels
- Micro interactions (hover states already partially there)

### 4. Neutron × Electron (Tron) — `tron.html` ✅ BUILT
**Layout:** mariavareva.com/copilotmoney style (sticky left + scrolling gallery right)
**Design System:** Bebas Neue + Instrument Serif + DM Sans + DM Mono, dark amber (#D4920A), black (#0D0D0D)
- **Nav** — Fixed, back link (left), "SHP" mark (right), glass-blur bg
- **Hero** — Full viewport height, title at bottom (dramatic whitespace), amber radial glow
- **Main Content** — 2-column grid:
  - Left (38%): Sticky info panel — project title, description, 5 accordion sections (The Ask, The Insight, Design System, Outcome, Methods)
  - Right (62%): Scrolling gallery of large rounded-corner images (16px radius)
- **Below sections** — Full-width expanded content:
  - Insight cards (2×2 grid)
  - Design System (4 system decision cards with rationale)
  - Quote block (centered, bordered)
  - Outcome (full-width dark card, statement + body + quote)
  - Methods tags row
- **Footer** — Back to portfolio

**Images:** Currently using Framer CDN URLs — need to save locally to `assets/tron/`:
- `jVA0lH5uzbC9cDLOIQywfjed0.jpg` (brand overview)
- `XiLvkpYCFhymGcfdeDvgKZ0Ixo.jpg` (brand exploration)
- `hsK8UDEhOTpuDvgrZM42kCVM3VA.png` (design system overview)
- `eJjapFLUEwiDiPf0Yu6ZAgxEw4.png` (brand application)

---

### 5. About Page — `about.html` ❌ TO BUILD
**Layout:** Full page, personal brand storytelling
**Sections:**
1. **Hero** — Large photo/illustration + "About me" heading + short intro
2. **Bio** — Who I am, what I do, what drives me (2-3 paragraphs)
3. **Journey** — Timeline/path: education → experience → current
   - DePaul University — MS HCI
   - 3+ years product design experience
   - Key roles/companies
4. **Skills & Tools** — Grid of skill categories
   - Research: User interviews, usability testing, survey design, affinity mapping
   - Design: Figma, Framer, prototyping, interaction design, visual design
   - Strategy: Product thinking, behavioral design, data-informed decisions
   - Tech: HTML/CSS, basic JS, design systems
5. **Values / Design Philosophy** — 3 cards (e.g., "Research-first", "Craft matters", "Design for behavior")
6. **Fun Facts / Personal** — Hobbies, interests, what makes Harshita unique
7. **CTA** — "Let's work together" → Calendly popup + email link
**Responsive:** Fully responsive from day 1
**Micro interactions:** Timeline animate on scroll, skill cards hover, values cards flip/reveal

### 5. Resume Page — `resume.html` ❌ TO BUILD
**Layout:** Clean, scannable, printable
**Sections:**
1. **Header** — Name, title, contact info, links (LinkedIn, email, portfolio)
2. **Summary** — 2-3 line professional summary
3. **Experience** — Timeline of roles
   - Company, title, dates, bullet points
   - Each role expandable/collapsible on click
4. **Education** — DePaul University, MS HCI + any undergrad
5. **Skills** — Categorized skill tags
6. **Certifications / Awards** — If any
7. **Download Button** — PDF download of resume
   - Links to `assets/uttishanow/Sri_Harshita_Pilla__UX_Product_Designer_.pdf` (or updated version)
**Responsive:** Card-based layout on mobile, timeline on desktop
**Micro interactions:** Timeline dots pulse on scroll, skill tags hover, download button ripple
**Print styles:** `@media print` — clean black/white, no nav, no animations

### 6. Glenen AI Case Study — `glenen.html` ❌ NOT BUILT
**Project:** AI RAG-Based Commerce Platform
**Status:** Needs content + assets from Harshita

### 7. IRCTC Redesign — `irctc.html` ❌ NOT BUILT
**Status:** Coming Soon

### 8. Tron — `tron.html` ❌ NOT BUILT
**Status:** Coming Soon

### 9. Archi Project — `archi.html` ❌ NOT BUILT
**Status:** Coming Soon

---

## Folder Structure (Updated)

```
harshita-portfolio/
├── index.html              ✅ Homepage
├── about.html              ❌ About page (to build)
├── resume.html             ❌ Resume page (to build)
├── uttishanow.html         ✅ Case Study 1
├── wander.html             ✅ Case Study 2
├── glenen.html             ❌ Case Study 3 (to build)
├── irctc.html              ❌ Case Study 4 (to build)
├── tron.html               ❌ Case Study 5 (to build)
├── archi.html              ❌ Case Study 6 (to build)
├── plan.md                 📋 This file
├── styles/
│   ├── main.css            Global styles + dark theme + responsive base
│   ├── hero.css            Homepage hero + billboard
│   ├── cards.css           Project cards (Recent + Other Works)
│   ├── footer.css          Footer styles
│   ├── casestudy.css       UttishaNow case study styles
│   ├── responsive.css      ❌ Global responsive overrides (to create)
│   └── micro.css           ❌ Micro interaction animations (to create)
├── scripts/
│   ├── main.js             Topbar clock, scroll nav, general
│   ├── carousel.js         Other Works looping carousel
│   ├── cards.js            Card interactions
│   ├── micro.js            ❌ Micro interactions (IntersectionObserver, counters, stagger)
│   └── calendly.js         ❌ Calendly popup integration
└── assets/
    ├── Frame 36.png        Dark illustration
    ├── Frame 37.png        Light illustration
    ├── Frame 38.png        Billboard illustration (in use)
    ├── workspace.svg
    ├── harshita-photo.jpg  ❌ Profile photo for About page (needs from Harshita)
    ├── resume.pdf          ❌ Downloadable resume PDF
    ├── thumbnails/
    ├── uttishanow/          UttishaNow project assets
    └── wander/              ❌ EMPTY — needs assets
```

---

## Design Tokens (Unified)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#0D0D0D` | Page background |
| `--bg-card` | `#1A1A1A` | Card backgrounds |
| `--bg-elevated` | `#242424` | Hover states, elevated surfaces |
| `--text-primary` | `#FFFFFF` | Headings, primary text |
| `--text-secondary` | `#9A9A9A` | Body text, descriptions |
| `--text-muted` | `#5A5A5A` | Labels, captions |
| `--accent` | `#E8734A` | Orange — CTAs, highlights |
| `--accent-hover` | `#F4845F` | Orange hover state |
| `--border` | `#2A2A2A` | Card borders, dividers |
| `--border-hover` | `#3A3A3A` | Border on hover |
| `--font-display` | `Playfair Display` | Hero headings |
| `--font-body` | `Inter` | Body text |
| `--radius-sm` | `8px` | Small elements |
| `--radius-md` | `12px` | Cards |
| `--radius-lg` | `16px` | Large cards, modals |
| `--ease` | `cubic-bezier(.22,1,.36,1)` | Standard animation ease |
| `--duration-fast` | `150ms` | Hover states |
| `--duration-med` | `300ms` | Transitions |
| `--duration-slow` | `600ms` | Scroll reveals |

---

## Build Order

### Phase 1 — Foundation (responsive + micro interactions)
1. [x] Create `styles/responsive.css` — global responsive rules for homepage
2. [x] Create `styles/micro.css` — all micro interaction keyframes + hover states
3. [x] Create `scripts/micro.js` — IntersectionObserver reveals, count-up, stagger
4. [x] Add Calendly to nav on homepage
5. [x] Make `index.html` fully responsive (topbar, hero, cards, carousel, footer)
6. [x] Make `uttishanow.html` fully responsive
7. [x] Verify `wander.html` responsive (already has media queries)

### Phase 2 — New Pages
8. [ ] Build `about.html` — fully responsive from start
9. [ ] Build `resume.html` — fully responsive + print styles
10. [ ] Update nav links on ALL pages to include About, Resume, Book a Call

### Phase 3 — Remaining Case Studies
11. [ ] Build `glenen.html` (when content provided)
12. [ ] Build remaining case studies as content arrives

### Phase 4 — Polish
13. [ ] Page transition animations
14. [ ] Favicon + OG images
15. [ ] Performance audit (image optimization, lazy loading)
16. [ ] Accessibility audit (ARIA, keyboard nav, contrast)
17. [ ] Deploy to Vercel + custom domain

---

## Calendly Setup
- **Script:** `<script src="https://assets.calendly.com/assets/external/widget.js" async></script>`
- **Trigger:** `Calendly.initPopupWidget({url: 'https://calendly.com/HARSHITA_URL'});`
- **Button placement:**
  - Homepage scroll nav: pill button "Book a Call"
  - Homepage topbar: subtle link
  - About page: CTA section at bottom
  - Resume page: header area
  - Case study pages: nav back bar
- **Styling:** Accent orange pill, hover glow effect
- **Note:** Harshita needs to provide her Calendly URL

---

## Responsive Breakpoint Cheat Sheet

```css
/* Mobile first approach */

/* Tablet portrait */
@media (min-width: 600px) { }

/* Tablet landscape */
@media (min-width: 900px) { }

/* Desktop */
@media (min-width: 1200px) { }

/* Large screens */
@media (min-width: 1440px) { }
```

---

## Micro Interaction Implementation Notes

### CSS-only (no JS needed)
- Hover lifts, color shifts, underline animations
- Button ripple (using ::after pseudo-element)
- Card border glow (box-shadow transition)
- Tag hover fills
- Focus states for accessibility

### JS-required
- `IntersectionObserver` — scroll-triggered reveals with stagger
- Count-up animation — stats numbers animate from 0 to final value
- Carousel swipe — touch event handling for mobile carousels
- Calendly popup — widget initialization on button click
- Smooth scroll — for nav anchor links
- Page load sequence — staggered reveal of hero elements
