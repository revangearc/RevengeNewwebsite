# Revenge Arc Website V2

Mobile-first launch website for Revenge Arc. This is the new Supabase-connected website, separate from the previous website.

Production: https://www.revengearc.com/  
Source repository: https://github.com/revangearc/RevengeNewwebsite  
Hosting: the existing Netlify project `revenge-arc-app`, with the GoDaddy-managed domain.

## Stack

- Next.js App Router, React, and TypeScript
- Tailwind CSS and Motion
- Supabase Auth and Postgres
- Zod validation
- Vitest, Testing Library, and jest-axe

## Local development

```bash
cp .env.example .env.local
npm ci
npm run dev
```

Open `http://localhost:3000`.

The public site works without Supabase credentials. Creator submissions, analytics persistence, and admin authentication return configuration-safe states until the website Supabase project is connected.

## Environment

| Variable                        | Purpose                                                                               |
| ------------------------------- | ------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Canonical site origin.                                                                |
| `NEXT_PUBLIC_APP_STORE_URL`     | Enables the App Store badge and pricing CTAs when configured.                         |
| `NEXT_PUBLIC_SUPABASE_URL`      | Website Supabase project URL.                                                         |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser-safe Supabase key used for authentication.                                    |
| `SUPABASE_SERVICE_ROLE_KEY`     | Server-only key for validated APIs and admin queries. Never expose it in client code. |
| `ANALYTICS_HASH_SECRET`         | Server-only secret for rotating anonymous daily hashes.                               |
| `ADMIN_LOGIN_USERNAME`          | Server-side mapping for the owner's chosen login name.                                |
| `ADMIN_AUTH_EMAIL`              | Private Supabase Auth identity mapped to the login name.                              |
| `ADMIN_EMAIL_ALLOWLIST`         | Comma-separated owner/admin email allowlist.                                          |

Generate `ANALYTICS_HASH_SECRET` with a cryptographically secure password generator before production.

`.env.example` contains names and empty placeholders only. `.env.local`, provider state, private keys, exports, build caches, and internal legal/QA review material stay out of Git. Keep production credentials in Netlify environment settings; do not put them in source, GitHub issues, screenshots, or workflow files. Browser-safe Supabase values are still not hardcoded in this repository.

## Routes

Public routes:

- `/`, `/features`, `/pricing`, `/creators`, `/faq`, `/legal`, `/contact`
- The complete seventeen-document policy set is listed at `/legal`, including privacy, terms, AI processing, retention/deletion, consumer health data, community rules, subscriptions, and app licensing.
- `/ai-health-disclaimer` and `/data-deletion` are compatibility redirects.

Private routes:

- `/admin/login`
- `/admin`

The admin route is excluded from public navigation, blocked in `robots.txt`, marked `noindex`, protected by middleware, checked against `admin_profiles`, and backed by row-level security.

## Supabase

The migration files are version controlled in `supabase/migrations`:

1. `202608170001_revenge_arc_web.sql` creates the application, analytics, aggregate, rate-limit, and admin tables with policies and functions.
2. `202608170002_analytics_schedule.sql` schedules daily aggregation and retention when `pg_cron` is available.
3. `202608190003_api_privileges.sql` grants the minimum privileges needed by the validated website APIs.

For a new installation only (do not re-create or overwrite the existing production project):

```bash
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push
```

Create the owner in Supabase Auth, then add the matching user ID and role to `public.admin_profiles`. Keep the same email in `ADMIN_EMAIL_ALLOWLIST`. See [supabase/README.md](supabase/README.md).

## Analytics and privacy

- Public analytics are cookie-free.
- The server accepts only allowlisted events and never stores raw IP addresses.
- Anonymous hashes rotate daily.
- Raw events retain for 90 days; daily aggregates retain for 24 months.
- Only authenticated admin sessions use essential cookies.
- Legal pages are owner/legal-review drafts and must be reviewed before launch.

## Asset pipeline

`scripts/build-assets.py` creates:

- 3840×2160 desktop and 2160×3840 portrait masters
- responsive AVIF/WebP derivatives
- exact UI-card crops from the approved marketing screens

Run it only when source art or app screenshots change:

```bash
python3 scripts/build-assets.py
```

## Verification

```bash
npm run check
```

This runs a focused credential/publication guard, linting, TypeScript checks, unit/accessibility tests, and a production build. Design and breakpoint notes are in [mobile-design.md](mobile-design.md) and [design-qa.md](design-qa.md); private screenshot archives remain local.

## Automatic deployment

This repository's `main` branch is connected to the existing Netlify project `revenge-arc-app`. Netlify reads `netlify.toml`, runs `npm run check`, then packages the Next.js site with its adapter. A failed check/build does not replace the last successful deployment. GitHub Actions also checks pushes to `main` and pull requests, without production secrets.

Automatic deployment was verified on September 29, 2026: a push to `main` started and published a production deployment without a manual upload. Commits pushed or merged to `main` update https://www.revengearc.com/ after a successful Netlify build. Other branches do not directly change production. Local edits must be committed and pushed before they can deploy. See [DEPLOYMENT.md](DEPLOYMENT.md) for configuration and verification records.

Do not change GoDaddy DNS, create another hosting project, or upload `.next` manually for routine updates. The approved App Store URL remains a future environment-setting change followed by a rebuild.
