# Supabase bootstrap

Use a dedicated project named `revenge-arc-web` in a US East region.

## 1. Apply the schema

Link the repository to the new project and push all migrations:

```bash
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push
```

The second migration enables `pg_cron` and schedules the privacy-safe daily rollup and retention job. The third migration adds the least-privilege API grants needed when automatic table exposure is disabled. If the project plan does not expose `pg_cron`, run the aggregation and retention functions daily from a trusted scheduler instead.

## 2. Configure authentication

1. In Supabase Auth, create the owner with the private identity from `ADMIN_AUTH_EMAIL` and the chosen password. Auto-confirm this manually created user; do not enable public sign-up.
2. Copy the Auth user UUID.
3. Run this in the SQL editor with the real UUID:

```sql
insert into public.admin_profiles (user_id, role)
values ('AUTH_USER_UUID', 'owner');
```

4. Put the private identity in `ADMIN_EMAIL_ALLOWLIST` and the desired login name in `ADMIN_LOGIN_USERNAME`.
5. Disable public sign-up. The website maps the username to the private Supabase identity only on the server.

Authorization is enforced on the server and by RLS; the hidden URL is not treated as security.

## 3. Configure local secrets

Copy `.env.example` to `.env.local` and populate the website project URL, browser-safe key, server-only service-role key, a strong analytics hash secret, and the owner allowlist.

Never prefix the service-role key or hash secret with `NEXT_PUBLIC_`.

## 4. Verify

- Submit one Creator application and confirm duplicate email handling is case-insensitive.
- Log into `/admin`, update status and notes, archive/restore the record, and export CSV.
- Confirm an unlisted Auth identity cannot access `/admin` even if it has a valid session.
- Confirm anonymous clients cannot read or write any table directly.
