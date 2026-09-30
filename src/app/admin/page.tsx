import { AppStoreLogo, ChartLineUp, CursorClick, UsersThree, UserFocus } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AnalyticsChart } from "@/components/admin/analytics-chart";
import { CreatorWorkspace } from "@/components/admin/creator-workspace";
import { getAdminDashboard } from "@/lib/admin-data";
import { logoutAction } from "./login/actions";

export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ range?: string }> }) {
  const params = await searchParams;
  const range = Number(params.range || 30);
  const data = await getAdminDashboard(range);
  if (!data) redirect("/admin/login");

  const cards = [
    { label: "Page views", value: data.metrics.pageViews.toLocaleString(), icon: ChartLineUp, tone: "text-violet-300" },
    { label: "Avg. daily visitors", value: data.metrics.approximateDailyVisitors.toLocaleString(), icon: UsersThree, tone: "text-cyan-300" },
    { label: "App Store clicks", value: data.metrics.appStoreClicks.toLocaleString(), icon: AppStoreLogo, tone: "text-violet-300" },
    { label: "Creator applications", value: data.metrics.creatorApplications.toLocaleString(), icon: UserFocus, tone: "text-amber-300" },
    { label: "View → application", value: `${data.metrics.conversionRate}%`, icon: CursorClick, tone: "text-emerald-300" },
  ];

  return (
    <div className="content-shell py-6 sm:py-8">
      <header className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4"><Image src="/assets/brand/ra-logo-3d.png" alt="Revenge Arc" width={52} height={52} className="size-13 object-contain" /><div><p className="utility-text text-[0.6rem] text-violet-300">Private workspace</p><h1 className="display-text mt-1 text-4xl font-bold uppercase text-white">Command Center</h1></div></div>
        <div className="flex items-center gap-3"><div className="text-right"><p className="text-sm font-semibold text-white">{data.admin.username}</p><p className="text-xs capitalize text-zinc-500">{data.admin.role}</p></div><form action={logoutAction}><button className="min-h-11 rounded-xl border border-white/10 px-4 text-sm font-semibold text-zinc-300 hover:border-white/25">Sign out</button></form></div>
      </header>

      <div className="mt-7 flex flex-wrap items-end justify-between gap-4"><div><p className="utility-text text-[0.62rem] text-zinc-500">Website pulse</p><h2 className="display-text mt-2 text-5xl font-bold uppercase text-white">Last {data.range} days</h2></div><nav aria-label="Analytics date range" className="flex rounded-xl border border-white/10 bg-black/30 p-1">{[7, 30, 90].map((days) => <Link key={days} href={`/admin?range=${days}`} aria-current={data.range === days ? "page" : undefined} className={`grid min-h-10 min-w-14 place-items-center rounded-lg px-3 text-sm font-bold ${data.range === days ? "bg-violet-600 text-white" : "text-zinc-500 hover:text-white"}`}>{days}d</Link>)}</nav></div>

      <section aria-label="Key metrics" className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map(({ label, value, icon: Icon, tone }) => <article key={label} className="rounded-2xl border border-white/10 bg-[#08070e] p-5"><Icon size={23} className={tone} aria-hidden="true" /><p className="display-text mt-7 text-4xl font-bold text-white">{value}</p><p className="mt-1 text-xs text-zinc-500">{label}</p></article>)}
      </section>

      <section className="mt-4 rounded-2xl border border-white/10 bg-[#08070e] p-4 sm:p-6"><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg font-bold text-white">Traffic and conversion</h2><p className="mt-1 text-xs text-zinc-500">Violet: views · Cyan: approximate visitors · Amber: applications</p></div></div><AnalyticsChart data={data.daily} /></section>

      <section className="mt-4 grid gap-4 lg:grid-cols-3"><RankList title="Top pages" items={data.topPages} /><RankList title="Referrers" items={data.referrers} /><RankList title="UTM campaigns" items={data.campaigns} /><RankList title="Device classes" items={data.devices} /><RankList title="CTA performance" items={data.ctas} /></section>
      <CreatorWorkspace initialApplications={data.applications} />
    </div>
  );
}

function RankList({ title, items }: { title: string; items: Array<{ label: string; value: number }> }) {
  const max = Math.max(...items.map((item) => item.value), 1);
  return <article className="rounded-2xl border border-white/10 bg-[#08070e] p-5"><h3 className="text-sm font-bold text-white">{title}</h3><ol className="mt-5 grid gap-4">{items.length ? items.map((item) => <li key={item.label}><div className="flex justify-between gap-4 text-xs"><span className="truncate text-zinc-400">{item.label}</span><span className="font-bold text-white">{item.value}</span></div><div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5"><span className="block h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{ width: `${Math.max(5, (item.value / max) * 100)}%` }} /></div></li>) : <li className="text-sm text-zinc-600">No data yet.</li>}</ol></article>;
}
