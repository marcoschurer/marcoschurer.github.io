# TASK: Website Enhancement — "The Signature" (v5)

**Target:** https://marcoschurer.github.io/
**Repo:** marcoschurer/marcoschurer.github.io
**Branch:** main
**Files to modify:** `index.html`, `style.css`, `main.js`
**Do NOT change:** File structure, GitHub Pages deploy workflow, `/cv` folder, `/images` folder

---

## Overview

Apply design enhancements to the existing single-page portfolio site. The structure and content stay. What changes is the visual execution: motion, rhythm, interactive craft, and a visual signature element. The goal is to make the site feel alive and memorable while retaining the minimalist, editorial identity.

**Brand guide reference:** `brand-style-guide.md` in the repo root. All colors, fonts, and tokens are defined there. Do not deviate from the palette.

---

## 1. NAVIGATION

### Remove MSD monogram
- Delete the "MSD" logo/monogram element entirely
- Replace with the full name **"Marco Schürer Drews"** in Literata weight 600, 15–16px, color `#1c1b18`
- The name is the leftmost element in the nav bar; nav links sit to the right

### Frosted glass nav
- Add `backdrop-filter: blur(8px)` and `-webkit-backdrop-filter: blur(8px)` to the sticky nav
- Set nav background to `rgba(240, 236, 226, 0.92)` (semi-transparent base color)
- This creates a soft blur effect as content scrolls behind the nav

---

## 2. HERO SECTION

### Layout
- Increase vertical padding significantly: `padding: 80px [horizontal] 60px` (or equivalent) — the hero should feel like it breathes, not be cramped
- Name rendered large: 36–42px, Literata weight 500, stacked on two lines ("Marco" / "Schürer Drews")

### Clay rule
- Add a small horizontal line below the name: `width: 40px; height: 2px; background: #a0725e; border-radius: 1px`
- This is the site's personality signature — it appears only here

### Constellation SVG
- Add an **inline SVG** element positioned `absolute`, top-right of the hero, roughly 200–240px wide, full hero height
- The SVG contains:
  - 6–8 small circles (nodes): 3–4px radius, filled with `#3d4f7c` (indigo) and 2–3 filled with `#a0725e` (clay)
  - 5–7 thin connecting lines between nodes: `stroke-width: 0.5`, colored indigo or clay
- Animations (CSS keyframes, NOT JS):
  - **Nodes float** gently: `transform: translate(3px, -4px)` back and forth, 6–8s duration, ease, infinite, each node with a different delay
  - **Lines pulse** in opacity: from ~0.08 to ~0.18, 4s duration, ease, infinite, staggered delays
- Set container `opacity: 0.12` — the constellation is a subtle background texture, not a focal element
- The hero text content must have `position: relative` or `z-index: 1` to sit above the SVG

### Content
- Keep: Name, "AI Governance & Technology Policy" tagline, "MPA · UC Berkeley Goldman School of Public Policy" in IBM Plex Mono
- Remove any five-question framework text from the hero if present

---

## 3. ALTERNATING SECTION BACKGROUNDS

Apply these backgrounds to create visual rhythm when scrolling:

| Section | Background | Hex |
|---------|-----------|-----|
| Hero | Stone (base) | `#f0ece2` |
| About | White | `#faf8f4` |
| CV | Stone (base) | `#f0ece2` |
| Writing | Cool blue-gray | `#e8ebf2` (indigo-50) |
| Contact | Warm clay | `#f2ece7` (clay-50) |
| Footer | Stone (base) | `#f0ece2` |

These are all light/warm tones — NO dark sections, no indigo backgrounds, no inverted text.

---

## 4. SECTION HEADINGS

Each section uses a **two-level heading** pattern:

1. **Small overhead label:** uppercase, letter-spaced (`letter-spacing: 0.1em`), ~10px, color `#7a776f` (text-muted), IBM Plex Sans
2. **Section title:** Literata weight 500, ~20px, color `#1c1b18` (text), below the label

The specific headings:

| Section | Small label | H2 title |
|---------|-----------|----------|
| About | "About" | *(no h2 — the pull-quote serves as the visual anchor)* |
| CV | "Curriculum vitae" | "Background" |
| Writing | "Writing" | "Samples" |
| Contact | "Contact" | *(no h2 — just body text below)* |

**Important:** Each section has ONE label + ONE heading (or just a label). No duplicates.

---

## 5. ABOUT SECTION

### Pull-quote
- Extract the key sentence as a large pull-quote: *"Who gets to shape the rules of emerging technologies — and who bears the cost when those rules fail?"*
- Style: Literata italic, ~18px, color `#3d4f7c` (indigo), `line-height: 1.5`
- Left border: `border-left: 2px solid #a0725e` (clay), `padding-left: 16px`
- **Scroll-triggered highlight:** When the pull-quote scrolls into view, a warm clay wash (`rgba(160, 114, 94, 0.15)`) sweeps across the background of the text from left to right using `background-size` transition from `0% 100%` to `100% 100%` over ~1 second

### Body text
- Standard body text below the pull-quote
- The trilingual/work auth line stays as IBM Plex Mono, muted

---

## 6. CV SECTION — TIMELINE SPINE

### Add a vertical timeline
- Wrap all CV accordion items in a container with `padding-left: 20px`
- Add an `::before` pseudo-element or a dedicated `<div>` as a thin vertical line: `width: 1px; background: #dbd5c7` (border color), positioned at `left: 4px`, spanning the full height of the CV content

### Timeline dots
- Each CV accordion item gets a small circle positioned on the timeline:
  - `width: 9px; height: 9px; border-radius: 50%`
  - Default state: `border: 1.5px solid #dbd5c7; background: #faf8f4` (hollow, matching surface)
  - Hover / open state: `border-color: #3d4f7c; background: #3d4f7c` (filled indigo)
  - Transition: `all 0.3s ease`
- Position: `absolute; left: -20px; top: 14px` (relative to the cv-item)

### Accordion animation
- Replace instant show/hide with animated open/close:
  - Use `max-height` transition: closed = `max-height: 0; overflow: hidden; opacity: 0`, open = `max-height: 300px; opacity: 1`
  - Transition: `max-height 0.4s ease, opacity 0.3s ease`
- The `+` toggle should rotate 45° when open: `transform: rotate(45deg)` with `transition: transform 0.25s`

### Download CV + LinkedIn buttons
- Position these on the **same line as the section heading**, right-aligned
- Use a flex row: heading left, buttons right
- "Download CV" = filled indigo button; "LinkedIn" = outlined indigo button
- Small size: `padding: 7px 16px; font-size: 11px`

### Awards & scholarships
- Change from accordion to **static display** (no fold/unfold)
- Same visual treatment as the skills tags area — just a sub-label "Awards & scholarships" and the three items listed as plain text lines
- Keep within the CV section

### Skills tags
- **Static only** — no hover color change, no cursor pointer
- Languages get `background: #f2ece7; color: #a0725e` (clay tones)
- Other skills get `background: #e8ebf2; color: #2d3a5c` (indigo tones)

---

## 7. WRITING SECTION

### Card hover animation
- Each writing card gets a clay top-border that **sweeps in from left** on hover:
  - Use a `::before` pseudo-element: `height: 2px; background: #a0725e; transform: scaleX(0); transform-origin: left; transition: transform 0.35s ease`
  - On hover: `transform: scaleX(1)`
- Cards also lift slightly on hover: `transform: translateY(-2px)`
- Card background: `#faf8f4` (surface white) with `border: 0.5px solid #cdd1dc` (cool border)

---

## 8. CONTACT SECTION

### Button hover
- Contact links (Email, LinkedIn, GitHub) should transition to filled indigo on hover:
  - Default: `background: #faf8f4; color: #3d4f7c; border: 0.5px solid #dbd5c7`
  - Hover: `background: #3d4f7c; color: #fff; border-color: #3d4f7c`
  - Transition: `all 0.25s ease`

---

## 9. SCROLL-TRIGGERED FADE-IN ANIMATIONS

### Implementation
- Use `IntersectionObserver` in `main.js`
- Target: all section content containers (about content, writing cards, contact block)
- **NOT** the CV section — it's long and the accordion is the interaction there

### Animation class
- `.fade-up` = initial state: `opacity: 0; transform: translateY(20px)`
- `.fade-up.visible` = final state: `opacity: 1; transform: translateY(0)`
- Transition: `opacity 0.6s ease, transform 0.6s ease`

### Staggered delays
- Where multiple elements enter together (e.g., writing cards), add staggered `transition-delay`:
  - First element: 0s
  - Second: 0.1s
  - Third: 0.2s
  - Fourth: 0.3s

### Observer config
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });
```

---

## 10. FOOTER

- Keep the existing quote and copyright
- Light treatment: stone background, muted text, Literata italic for the quote

---

## 11. THINGS TO NOT DO

- Do NOT add dark/inverted sections (no indigo or dark backgrounds)
- Do NOT make skill tags interactive/hoverable
- Do NOT add placeholder content for projects — keep the projects section hidden (`display: none`) if it exists
- Do NOT change the content text (about section copy, CV entries, etc.) — only change presentation
- Do NOT add any external animation libraries — CSS + vanilla JS only
- Do NOT change the font stack (Literata / IBM Plex Sans / IBM Plex Mono)
- Do NOT change the color palette

---

## 12. SUMMARY OF CSS KEYFRAMES TO ADD

```css
@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(3px, -4px); }
}

@keyframes float2 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-2px, 5px); }
}

@keyframes pulse-line {
  0%, 100% { opacity: 0.08; }
  50% { opacity: 0.18; }
}
```

---

## Verification checklist

After implementation, verify:
- [ ] MSD monogram is gone, full name in nav
- [ ] Nav has frosted glass blur effect
- [ ] Hero has breathing room, clay rule visible, constellation SVG animating subtly
- [ ] Section backgrounds alternate (stone → white → stone → cool → clay-warm → stone)
- [ ] Pull-quote has clay left border and highlight sweep on scroll
- [ ] CV has vertical timeline with dots that fill on hover/open
- [ ] CV accordion animates open/close smoothly
- [ ] Download CV + LinkedIn buttons sit next to "Background" heading
- [ ] Awards display as static text, not accordion
- [ ] Skill tags are static (no hover effects)
- [ ] Writing section heading: "Writing" (label) / "Samples" (h2)
- [ ] Writing cards have sweep-in clay top border on hover
- [ ] Contact buttons transition to filled indigo on hover
- [ ] Fade-up animations trigger on scroll for about, writing, contact sections
- [ ] Writing cards stagger their entrance
- [ ] No dark sections anywhere
- [ ] Site deploys correctly on GitHub Pages
