# Revenge Arc website deployment

The production website is configured for Netlify's current Next.js adapter.

## GitHub continuous deployment

Authorized repository only: `revangearc/RevengeNewwebsite`. Keep the existing Netlify project `revenge-arc-app` and its domain/environment settings.

1. Publish the safe source/assets to the repository's `main` branch; exclude all populated environment files and private/generated files. Run the staged publication guard before uploading.
2. In Netlify's project configuration, link this GitHub repository under Continuous deployment. If GitHub asks for app access, select this repository only; preserve existing unrelated access and stop for the owner's authorization.
3. Production branch: `main`; base directory: repository root; build command: `npm run check`; publish directory: `.next`; Node version: `22`. The Next.js adapter must complete; do not use a static-only export for this server-backed website.
4. Retain production environment values in Netlify, available to the required build/runtime scopes. Do not move them to GitHub files or expose server secrets to untrusted pull requests.
5. Verify a Git-triggered production deployment records the uploaded commit SHA, passes checks, and serves the existing HTTPS domain, pages, images, redirects, creator API, and admin login safely.
6. Make a small documentation-only push and verify that a second deployment starts automatically. This proves the push trigger, not just a one-time manual deploy.

Connection/push verification must be completed before describing auto-deployment as active. No GoDaddy DNS change is needed for this connection.

## Required production environment variables

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_APP_STORE_URL` when the App Store listing is available
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ANALYTICS_HASH_SECRET`
- `ADMIN_LOGIN_USERNAME`
- `ADMIN_AUTH_EMAIL`
- `ADMIN_EMAIL_ALLOWLIST`

Never commit `.env.local` or copy secret values into documentation, screenshots, support messages, or URLs.

## Production checklist

1. Run `npm run check`.
2. Create or link the Netlify site.
3. Import the environment variables from `.env.local` into Netlify without exposing their values.
4. Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS production domain.
5. Deploy a preview, then deploy production.
6. Add the GoDaddy apex and `www` domain records exactly as Netlify specifies. Preserve mail-related MX and TXT records.
7. Set the hosted Supabase Auth Site URL to the canonical production domain and allow only required production and local redirect URLs.
8. Test public pages, creator applications, analytics, `/admin/login`, logout, CSV export, redirects, `robots.txt`, `sitemap.xml`, and HTTPS.

## Mobile redesign handoff — September 29, 2026

Production: https://www.revengearc.com/ on Netlify site `revenge-arc-app` (`e753c504-4cbf-4664-b3c3-d2aadd803a57`). The verified complete deployment `6abc64caef5f4d67b193403e` was promoted to production.

For this Next.js site, run the full Netlify build/adapter workflow and verify a preview before promotion. Do not assume `deploy --no-build` will preserve the adapter's public-asset routing: that path omitted image assets during this release and was immediately replaced with the complete verified preview.

- A seven-day trial is owner-confirmed. Exact eligible plans and billing configuration still need verification in the app's purchase flow; do not claim every plan includes the trial.
- Set `NEXT_PUBLIC_APP_STORE_URL` only when the approved listing exists, then rebuild and verify actual download links. Until then, actions show launch details and the badge area states that the link is coming soon.
- Preserve the current contact email until the owner supplies a replacement. Do not alter mail DNS records as part of website publishing.
- Regenerate the website notice bundle after dependency/font changes with `node scripts/generate-website-notices.mjs`; check its flagged license-text gaps separately. App/native/backend notices are a separate review.
- Public policy updates are version 1.2. Unconfirmed legal entity, jurisdiction, provider/retention details, moderation operations, and app license choice remain review items.
