# Restrained motion QA — September 29, 2026

- Preserved the approved mobile-first layout, brand palette, typography, real screen assets, contact details, trial wording, and App Store launch state.
- Browser previews at actual 390×844 and 1280×720 dimensions showed no document-level horizontal overflow. Checked the static launch area, product tabs and step changes, illustrative GymBuddy reply, progress chart, character section, native FAQ opening, gallery controls, and focus restoration. Browser console had no warnings/errors during the inspected development interactions.
- Observed the character paused offscreen and active in its visible section, with a finite two-cycle / 4.8-second CSS animation. The chart fill and FAQ entrance styles applied, while the hero launch area had no animation and remained fully visible.
- `npm run check` passed: publication guard, lint, TypeScript, 39 tests across ten files, and the production build. New regressions cover shared preference listeners, Reduce Motion/Save Data changes, observer cleanup, hidden/offscreen character behavior, crossfade control isolation, short AI-example timers, and immediate reduced-motion replies.
- No continuous scroll subscriptions, autoplay slides, real AI calls, new animation dependency, or real creator test application was added. Content is visible before animation enhancement; keyboard/tab and gallery behavior stay user-controlled.
- The browser viewport control did not reliably resize background preview tabs; only the actual measured dimensions above are claimed for this pass. Physical iPhone Safari, Android Chrome, and TikTok's in-app browser remain unverified.

## Earlier Option 4 implementation — historical

Reference: `design-exploration/mockups-round-7-true-size-stacked/04-cinematic-split-chapters.png` in the V1 design archive.

Comparison evidence: `design-qa/comparison-824-hero-final.png` places the reference and implementation side by side. The reference is a flattened long-page composition; the implementation intentionally holds each chapter as a sticky scroll scene, so the first viewport dwells on the hero instead of revealing the next chapter immediately.

## Verified viewports

| Viewport | Result |
| --- | --- |
| 390×844 | No horizontal overflow; portrait hero, menu, hero phone, Train entry, and full Train dwell checked. |
| 430×932 | No horizontal overflow; hero copy and store states fit; phone maintains realistic proportions. |
| 768×1024 | No horizontal overflow; independent tablet composition and hamburger navigation verified. |
| 824×1200 | Compared directly with the Option 4 reference at matching width. |
| 1440×900 | Desktop navigation, headline, full hero phone, floating card, and Buddy placement verified. |
| 1920×1080 | No horizontal overflow; hero phone fits the viewport and desktop navigation remains balanced. |
| 3840×2160 | No horizontal overflow; centered max-width composition verified with true 3840 source assets available. |

## Resolved visual issues

- P0: none.
- P1: Hero phone was too tall at desktop widths and clipped below the viewport. Resolved with a height-aware true-iPhone width calculation.
- P1: Chapter heading could slide under the sticky mobile header. Resolved by reducing the scroll-linked copy travel.
- P1: Desktop scenes initially selected only a 1920px source at a 4K viewport. Resolved by adding 3840px AVIF/WebP candidates and 2160px portrait candidates.
- P2: Hero streak pop-out was visually too small. Resolved by increasing and repositioning the exact UI crop.
- P2: Buddy competed with the main headline. Resolved by reducing its desktop footprint and moving it to the lower edge.

## Interaction and accessibility checks

- Mobile menu opens into a modal drawer, locks body scroll, marks background content inert, traps keyboard focus, closes on Escape, and returns focus to the trigger.
- Creator form has visible labels, error summaries, field-level errors, autocomplete/input-mode attributes, a consent requirement, and 44px minimum targets.
- Skip link, semantic heading order, visible focus styles, screen-reader labels, color contrast, safe-area padding, and reduced-motion behavior are implemented.
- Reduced-motion/save-data/low-power paths render static scenes without depending on animation for meaning.

## Intentional differences from the flattened mockup

- Chapters use full-height sticky dwell points, crossfades, parallax, and UI-card emergence instead of appearing simultaneously in one static canvas.
- Mobile is independently art-directed with portrait scene masters instead of cropping desktop artwork.
- All product screens use approved Revenge Arc marketing captures and requested data rather than the illustrative inaccuracies in early mockups.
- Store badges appear only in the hero, with App Store disabled until configured and Google Play marked Coming Soon.

## External completion gates

- Live Simulator recapture is pending because no iOS Simulator is currently booted. The checked-in screens are app-faithful marketing captures grounded in the current Revenge Arc UI and requested data; replace them with the development-only Marlin fixture captures after the dedicated Simulator is booted.
- Live Supabase provisioning and migration application are pending the required action-time confirmation to create the persistent cloud project and credentials.
