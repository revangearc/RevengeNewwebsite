-- The project keeps automatic Data API table exposure disabled. Grant only the
-- privileges required by the server and the middleware's own-profile check.

grant select on table public.admin_profiles to authenticated;

revoke all on table public.creator_applications from authenticated;
revoke all on table public.analytics_events from authenticated;
revoke all on table public.analytics_daily from authenticated;
revoke all on table public.rate_limit_buckets from authenticated;

grant all privileges on table public.admin_profiles to service_role;
grant all privileges on table public.creator_applications to service_role;
grant all privileges on table public.analytics_events to service_role;
grant all privileges on table public.analytics_daily to service_role;
grant all privileges on table public.rate_limit_buckets to service_role;

grant usage, select on sequence public.analytics_events_id_seq to service_role;
