create extension if not exists pg_cron with schema pg_catalog;

do $$
declare
  existing_job bigint;
begin
  select jobid into existing_job from cron.job where jobname = 'revenge-arc-web-daily-rollup' limit 1;
  if existing_job is not null then
    perform cron.unschedule(existing_job);
  end if;
end $$;

select cron.schedule(
  'revenge-arc-web-daily-rollup',
  '17 2 * * *',
  $$
    select public.aggregate_analytics_day(current_date - 1);
    select public.enforce_website_retention();
  $$
);
