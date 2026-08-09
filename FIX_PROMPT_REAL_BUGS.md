# FIX PROMPT — Real Bugs Found on Live Deployment

I reviewed live screenshots of my portfolio (Hero, About, Skills, Achievements, Contact
sections) and found the following confirmed, specific bugs. Fix each one — do not
regenerate the whole site from scratch, patch these exact issues in the existing code.

---

## BUG 1 — Black dead-zone above the navbar on every section

**Symptom**: A solid black bar (~60-80px) sits above the navbar/content on every
single page section, visible at every scroll position.

**Likely causes to check**:
- `body` or `html` has default margin/padding not reset to 0
- A section or wrapper has an empty `<div>` or extra top padding before the nav
- The Ferrofluid/canvas background is painting an opaque black rect instead of
  staying transparent (`gl.clearColor` alpha should be 0, canvas context must have
  `alpha: true`)
- A fixed-position nav is leaving a gap because the hero section has
  `padding-top` equal to nav height PLUS extra unaccounted space

**Fix**: Audit `globals.css` for `* { margin:0; padding:0; }` reset, confirm no
stray wrapper divs before `<Nav />`, and confirm every canvas/WebGL context clears
with alpha 0, not opaque black.

---

## BUG 2 — Large empty vertical space before section content

**Symptom**: On Skills, Achievements, and Contact sections, there's 400-500px of
blank black space between the navbar and the actual heading. User has to scroll
through empty space before seeing content.

**Likely causes to check**:
- Sections have a fixed `min-h-screen` or `min-h-[XXvh]` regardless of content
  length, instead of sizing to content with reasonable padding
- GSAP ScrollTrigger `pin: true` on a previous section is reserving scroll space
  that isn't being released properly
- Flex/grid container has `justify-content: center` inside an oversized parent,
  pushing content down instead of the parent shrinking to content

**Fix**: Remove any unconditional `min-h-screen` from sections that don't need
full-viewport height. Replace with `py-24 md:py-32` style content-driven padding.
If GSAP pinning is involved, verify `ScrollTrigger.refresh()` is called after
layout changes and pins are cleanly unpinned.

---

## BUG 3 — Overlapping/garbled text between Achievements and Contact sections

**Symptom**: At the top of the Contact section, 2-3 chunks of text from different
cards are visibly overlapping/bleeding into each other — unreadable garbled text.

**Likely causes to check**:
- A GSAP ScrollTrigger-pinned section (Achievements) isn't fully un-pinning
  before Contact renders, so both sections' content occupies the same screen
  space simultaneously
- Two sections have conflicting `position: absolute` or `position: fixed` without
  correct z-index layering
- A previous section's exit animation isn't completing (opacity/transform stuck
  mid-transition) before the next section's content starts

**Fix**: Review every `ScrollTrigger.create()` / `pin` config for Achievements —
ensure `end` value and `pinSpacing` are correct so it releases cleanly. Check
z-index stacking between adjacent `<section>` elements. Add `overflow: hidden` on
section boundaries if content is bleeding across them. Test by scrolling slowly
through that exact transition point with DevTools open.

---

## BUG 4 — Stray floating preview/debug panel on Skills section

**Symptom**: A small floating box appears in the bottom-right corner while
viewing the Skills section, showing a mini-preview of the About section content.
This looks like a dev tool or debug widget that shipped to production.

**Fix**: Search the codebase for any scroll-position minimap, debug overlay, or
third-party dev tool component (e.g. a Next.js dev indicator, a leftover
`<ScrollPreview />`, a browser extension artifact) and remove it from the
production build. Confirm `NODE_ENV=production` build doesn't include any
`process.env.NODE_ENV === 'development'`-gated debug UI that's leaking through.

---

## BUG 5 — Stats row clipped at bottom of About section

**Symptom**: The 4-stat grid (Projects Built, Hackathon Wins, Technologies, Years
Learning) has its last row (`18+`, `3+`) visibly cut off at the section/container
edge instead of fully visible.

**Fix**: Remove `overflow: hidden` (or fixed height) from the stats container if
present. Let the section height be determined by content
(`height: auto` / no fixed height on the parent card), or increase the section's
`min-height` to fit all rows with padding.

---

## BUG 6 — Orphaned decorative ring near profile avatar

**Symptom**: A small circular ring/decoration floats near the top-right of the
"TL" avatar card in the About section, disconnected from any element, positioned
seemingly at random.

**Fix**: Find this decorative element in the About/profile component. Either
anchor it correctly with `position: absolute` relative to a proper parent with
`position: relative`, or remove it if it's leftover from a previous design
iteration that's no longer used.

---

## BUG 7 — Custom cursor not rendering (default OS cursor shown)

**Symptom**: Every screenshot shows the standard system arrow cursor instead of
a custom cursor, even though the design calls for a custom glow/magnetic cursor.

**Likely causes to check**:
- `cursor: none` on `body` isn't being applied (check for CSS specificity
  conflicts or a media query accidentally matching desktop)
- The custom cursor component isn't mounting (check for a hydration error,
  missing `dynamic(..., { ssr: false })`, or a JS error breaking the mount)
- Screenshots are taken in a way that doesn't capture the custom cursor overlay
  (verify this isn't just a screenshot artifact by checking DevTools console for
  errors first)

**Fix**: Open browser console on the live site and check for JS errors. If no
errors, verify the cursor component actually renders in the DOM (inspect
element). Fix `cursor: none` specificity if the default cursor is winning.

---

## VERIFICATION STEPS (do these after each fix)

1. Open the live site in Chrome DevTools, throttle to "Fast 3G" and confirm no
   layout shift while sections load
2. Scroll the ENTIRE page slowly from top to bottom, screenshotting every section
   boundary to confirm no overlapping content
3. Check the browser console for any errors or warnings
4. Resize the viewport from 1920px down to 375px and confirm no section shows the
   black dead-zone or the empty-space gap
5. Confirm the stray floating panel from Bug 4 does not appear anywhere
6. Confirm all 4 stats in the About section are fully visible without clipping
7. Move the mouse around the page and confirm a custom cursor renders (or confirm
   intentionally there isn't one, and remove `cursor: none` from CSS if so)

Do not mark this done until all 7 items are verified visually, not just assumed
from code review.
