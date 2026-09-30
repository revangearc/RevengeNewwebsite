# Mobile refinement

## September 29 mobile-first conversion redesign

Audience: first-time TikTok visitors on phones. One job: understand the everyday value, explore actual app screens, and reach the App Store when the approved listing is supplied.

Approved palette: void #030207, ivory #f7f5fb, violet #c084fc, cyan #22d3ee, amber #f59e0b, readable muted #a6a1af. Preserve Inter body, Barlow Condensed display, Space Mono labels, the 3D RA mark, and one cinematic mountain hero. Supporting pages use quiet surfaces and actual captures rather than dark fantasy figures.

Signature element: a user-controlled four-moment product demonstration with real app captures and clearly labeled example interactions. No fake reviews, invented biographies, automatic slides, scroll locking, or new third-party animation dependencies. Brief transform/opacity transitions have a reduced-motion fallback.

Homepage order: practical promise and seven-day trial, interactive product demonstration, GymBuddy, Arena and progress, plain-language story and privacy controls, membership, questions/download, then compact future features and creator invitation. Unreleased Watch/Coach Pro stay labeled coming soon.

Contact email must remain unchanged. Seven-day free trial confirmed by owner; individual eligible plans and renewal prices are authoritative in the app purchase screen. App Store links activate only from the real NEXT_PUBLIC_APP_STORE_URL. Unconfirmed operator, jurisdiction, AI-provider and retention facts remain review items, not invented promises.

Verification: mobile 360/390/430, tablet 768, desktop 1440; keyboard/touch alternatives, menu/gallery focus restoration, no horizontal overflow, ordinary scrolling, contrast, short creator validation, pricing arithmetic, launch states, tests/typecheck/lint/production build. Physical-device and TikTok-browser checks remain separate.

### Published verification

Published September 29, 2026 (New York), using the complete, verified Netlify preview deployment `6abc64caef5f4d67b193403e`. The canonical domain is https://www.revengearc.com/.

- The seven main public routes were inspected at phone, tablet, and desktop widths without document-level horizontal overflow. Tablet headline wrapping was refined before publication.
- The live 390×844 homepage, user-controlled meal demonstration, and image rendering were checked after publishing. All 27 public URLs and 27 checked screenshot/hero/mascot assets responded successfully.
- Final `npm run check` passed: lint, TypeScript, 28 tests across eight files, and the production build. Apex and HTTP requests redirect to canonical HTTPS `www`.
- Menu dismissal/focus restoration, gallery interaction, feature expansion, trial FAQ, and creator validation were checked. Creator API tests use mocked storage; no real creator application was submitted as a test.
- Website dependency and font notices are generated at `/website-third-party-notices.txt`. This is not a completed mobile-app/native license audit.
- Contact email is unchanged. No App Store listing URL has been supplied, so the public action honestly shows launch details rather than a fake download. Eligible trial plans, final legal/business/provider facts, and physical-device checks remain outstanding.

## Earlier iterations (historical; superseded by the September 29 direction)

Audience: visitors arriving from TikTok on a phone. Lead with the product promise, real app screen, and launch-ready store presentation.

Preserve void #030207, white #f7f5fb, violet #a855f7, cyan #22d3ee, amber #f59e0b, muted #a6a1af. Keep Inter body/hero, Barlow Condensed chapters, Space Mono utility labels, and the 3D RA mark and mountains as the signature.

Mobile: 20px side padding, compact hero, official badges aligned at 44px visible height, readable app previews, normal document scrolling, and no scroll-driven fading/rotation. Desktop retains subtle parallax. Content is visible before hydration and with reduced motion.

App Store artwork is deliberately unlinked until NEXT_PUBLIC_APP_STORE_URL is supplied. Google Play stays unlinked with an external Coming soon label. Apple Watch support is coming soon. No waitlist or invented download URL.

Official assets, unchanged:
- https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg
- https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png

Google's PNG includes transparent clear space; layout compensates without modifying the asset. Apple artwork stays static, including on desktop.

## Implemented

- Shorter hero copy and mobile heading, with the app preview visible in the first viewport.
- Larger 3D header mark using a 12 KB WebP export of the original.
- Feature shortcuts to Train, Fuel, Adapt, Connect, and Prove.
- Mobile/tablet/reduced-motion layouts never subscribe to scroll tracking. Desktop subscriptions are cleaned up when the media query changes. Chapter content no longer fades out.
- Readable overlapping detail cards on phones; simplified community preview; tablet streak card stays inside the viewport.
- Static responsive app screenshots at 360, 640, and 853 pixels, generated by `node scripts/optimize-phone-assets.mjs`. The 640px files are 53–79 KB, with small previews behind them while loading.
- Compact mobile community/pricing, three homepage FAQs, and a compact legal link. Full policy pages and desktop legal content remain available.

## Verification

Checked in the in-app browser at 360×800, 390×844, 430×932, 768×1024, and 1440×900. Verified feature anchor navigation, mobile menu dismissal/focus restoration, nonlinked store states, image delivery, and no document-level horizontal overflow at the inspected widths. Browser console had no warnings or errors in the final inspection.

Existing tests plus two regression tests cover no mobile scroll subscription and cleanup on a desktop-to-mobile/reduced-motion change. Physical iPhone Safari, Android Chrome, and TikTok's embedded browser were not available for this pass.

When the app is approved, set NEXT_PUBLIC_APP_STORE_URL to the real apps.apple.com listing and restart/rebuild. The App Store badge and pricing links then activate; Google Play remains unlinked.

## Homepage storytelling and exploration

Added on September 20:

- Every primary phone preview opens one shared six-screen gallery. Native modal isolation, Escape/close, focus restoration, previous/next with wraparound, horizontal swipe, and full-resolution zoom are supported. Vertical scrolling and zoomed panning do not change screens. No autoplay or scroll tracking was added.
- Apple Watch gets a dedicated coming-soon teaser using the existing RA mark and a simple watch icon. No real Watch capture was present in the project; replace this teaser artwork when the actual Watch UI is available. No unreleased Watch features are claimed.
- Train, Adapt, and Prove retain cinematic mountains. Fuel and Connect use quieter backgrounds and more welcoming copy to vary the pacing.
- A four-step daily walkthrough connects a workout, meal, GymBuddy conversation, and weekly reflection. It uses accessible tabs, arrow/Home/End keyboard navigation, and the existing app screens.
- The light “Why Revenge Arc exists” section uses the existing ivory/purple palette. Copy is grounded in the product promise, with no invented founder biography or testimonials.
- A closing app visual and “Download for iPhone” action follow the FAQs. The action remains disabled until the approved App Store URL is supplied, using the same configuration as the hero.

Interaction verification: gallery open/close, keyboard navigation, zoom, focus restoration, and daily tabs checked in the browser. Automated gallery tests cover wraparound, close/cancel cleanup, and horizontal versus vertical/zoomed gestures. Phone and desktop layouts inspected; decorative Watch overflow was corrected at 360px. Physical-device checks remain pending.
