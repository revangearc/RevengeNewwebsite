"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function AnalyticsChart({ data }: { data: Array<{ date: string; views: number; visitors: number; applications: number }> }) {
  return (
    <div className="h-80 w-full" aria-label="Page views, approximate daily visitors, and creator applications over time">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id="views" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#a855f7" stopOpacity={0.45} /><stop offset="95%" stopColor="#a855f7" stopOpacity={0} /></linearGradient>
            <linearGradient id="visitors" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22d3ee" stopOpacity={0.35} /><stop offset="95%" stopColor="#22d3ee" stopOpacity={0} /></linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
          <XAxis dataKey="date" tickFormatter={(value) => value.slice(5)} stroke="#625d6b" fontSize={11} tickLine={false} axisLine={false} minTickGap={28} />
          <YAxis stroke="#625d6b" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
          <Tooltip contentStyle={{ background: "#0a0810", border: "1px solid rgba(255,255,255,.15)", borderRadius: 12 }} labelStyle={{ color: "#fff" }} />
          <Area type="monotone" dataKey="views" stroke="#a855f7" fill="url(#views)" strokeWidth={2} />
          <Area type="monotone" dataKey="visitors" stroke="#22d3ee" fill="url(#visitors)" strokeWidth={2} />
          <Area type="monotone" dataKey="applications" stroke="#f59e0b" fill="transparent" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
