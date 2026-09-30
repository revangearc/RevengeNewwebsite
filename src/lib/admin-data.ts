import "server-only";

import { getAdminLoginConfig } from "@/lib/env";
import { getAuthorizedAdmin } from "@/lib/supabase/server";

export type CreatorApplication = {
  id: string;
  submitted_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  desired_compensation: string;
  instagram: string | null;
  tiktok: string | null;
  motivation: string;
  audience_description: string;
  consent_version: string;
  consented_at: string;
  utm_source: string | null;
  status: "new" | "reviewing" | "approved" | "rejected";
  private_notes: string;
  reviewer: string | null;
  reviewed_at: string | null;
  archived_at: string | null;
};

type AnalyticsEvent = {
  occurred_at: string;
  event_name: string;
  path: string;
  referrer_host: string | null;
  utm_campaign: string | null;
  device_class: string;
  anonymous_daily_hash: string;
  event_details: Record<string, unknown>;
};

function ranked(values: Array<string | null>, fallback: string) {
  const counts = new Map<string, number>();
  values.forEach((value) => counts.set(value || fallback, (counts.get(value || fallback) || 0) + 1));
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([label, value]) => ({ label, value }));
}

export async function getAdminDashboard(requestedRange: number) {
  const admin = await getAuthorizedAdmin();
  if (!admin) return null;
  const range = [7, 30, 90].includes(requestedRange) ? requestedRange : 30;
  const since = new Date(Date.now() - range * 86_400_000).toISOString();

  const [eventsResult, applicationsResult] = await Promise.all([
    admin.service.from("analytics_events").select("occurred_at,event_name,path,referrer_host,utm_campaign,device_class,anonymous_daily_hash,event_details").gte("occurred_at", since).order("occurred_at", { ascending: true }).limit(50_000),
    admin.service.from("creator_applications").select("*").order("submitted_at", { ascending: false }).limit(5_000),
  ]);

  if (eventsResult.error) throw new Error(eventsResult.error.message);
  if (applicationsResult.error) throw new Error(applicationsResult.error.message);
  const events = (eventsResult.data || []) as AnalyticsEvent[];
  const applications = (applicationsResult.data || []) as CreatorApplication[];
  const recentApplications = applications.filter((application) => application.submitted_at >= since);
  const pageViews = events.filter((event) => event.event_name === "page_view");
  const appStoreClicks = events.filter((event) => event.event_name === "app_store_click");

  const dayMap = new Map<string, { views: number; visitors: Set<string>; applications: number }>();
  for (let offset = range - 1; offset >= 0; offset -= 1) {
    const day = new Date(Date.now() - offset * 86_400_000).toISOString().slice(0, 10);
    dayMap.set(day, { views: 0, visitors: new Set(), applications: 0 });
  }
  pageViews.forEach((event) => {
    const day = event.occurred_at.slice(0, 10);
    const item = dayMap.get(day);
    if (item) { item.views += 1; item.visitors.add(event.anonymous_daily_hash); }
  });
  recentApplications.forEach((application) => {
    const item = dayMap.get(application.submitted_at.slice(0, 10));
    if (item) item.applications += 1;
  });
  const daily = [...dayMap.entries()].map(([date, value]) => ({ date, views: value.views, visitors: value.visitors.size, applications: value.applications }));
  const activeDays = daily.filter((day) => day.views > 0).length || 1;
  const approximateDailyVisitors = Math.round(daily.reduce((sum, day) => sum + day.visitors, 0) / activeDays);

  return {
    admin: { username: getAdminLoginConfig().username || "Admin", role: admin.profile.role },
    range,
    metrics: {
      pageViews: pageViews.length,
      approximateDailyVisitors,
      appStoreClicks: appStoreClicks.length,
      creatorApplications: recentApplications.length,
      conversionRate: pageViews.length ? Number(((recentApplications.length / pageViews.length) * 100).toFixed(1)) : 0,
    },
    daily,
    topPages: ranked(pageViews.map((event) => event.path), "/"),
    referrers: ranked(pageViews.map((event) => event.referrer_host), "Direct / unknown"),
    campaigns: ranked(events.map((event) => event.utm_campaign), "No campaign"),
    devices: ranked(pageViews.map((event) => event.device_class), "Unknown"),
    ctas: ranked(events.filter((event) => ["app_store_click", "pricing_plan_click", "creator_cta", "creator_form_start", "creator_submission"].includes(event.event_name)).map((event) => event.event_name), "Other"),
    applications,
  };
}
