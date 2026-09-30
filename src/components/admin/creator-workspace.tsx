"use client";

import { Archive, ArrowCounterClockwise, DownloadSimple, MagnifyingGlass, Trash } from "@phosphor-icons/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { CreatorApplication } from "@/lib/admin-data";

const statuses = ["all", "new", "reviewing", "approved", "rejected"] as const;
type FilterStatus = (typeof statuses)[number];

export function CreatorWorkspace({ initialApplications }: { initialApplications: CreatorApplication[] }) {
  const [applications, setApplications] = useState(initialApplications);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<FilterStatus>("all");
  const [showArchived, setShowArchived] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(initialApplications[0]?.id || null);
  const [message, setMessage] = useState("");

  const filtered = useMemo(() => applications.filter((application) => {
    const matchesArchive = showArchived ? Boolean(application.archived_at) : !application.archived_at;
    const matchesStatus = status === "all" || application.status === status;
    const term = search.trim().toLowerCase();
    const matchesSearch = !term || [application.full_name, application.email, application.instagram || "", application.tiktok || ""].some((value) => value.toLowerCase().includes(term));
    return matchesArchive && matchesStatus && matchesSearch;
  }), [applications, search, showArchived, status]);

  const selected = applications.find((application) => application.id === selectedId) || null;

  async function updateApplication(id: string, body: Record<string, unknown>) {
    setMessage("Saving…");
    const response = await fetch(`/api/admin/creator-applications/${id}`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    const result = (await response.json()) as { application?: CreatorApplication; message?: string };
    if (!response.ok || !result.application) { setMessage(result.message || "Update failed."); return; }
    setApplications((items) => items.map((item) => item.id === id ? result.application! : item));
    setMessage("Saved.");
  }

  async function permanentlyDelete(id: string, confirmation: string) {
    const response = await fetch(`/api/admin/creator-applications/${id}`, { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ confirmation }) });
    const result = (await response.json()) as { message?: string };
    if (!response.ok) { setMessage(result.message || "Deletion failed."); return false; }
    setApplications((items) => items.filter((item) => item.id !== id));
    setSelectedId(null);
    setMessage("Application permanently deleted.");
    return true;
  }

  return (
    <section className="mt-8 rounded-2xl border border-white/10 bg-[#08070e] p-4 sm:p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div><p className="utility-text text-[0.62rem] text-violet-300">Creator workspace</p><h2 className="display-text mt-2 text-4xl font-bold uppercase text-white">Applications</h2></div>
        <div className="flex flex-wrap gap-2">
          <label className="relative min-w-[14rem] flex-1"><span className="screen-reader-only">Search applications</span><MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, email, or handle…" spellCheck={false} autoComplete="off" className="min-h-11 w-full rounded-xl border border-white/10 bg-black/40 pl-10 pr-3 text-sm text-white focus:border-violet-400 focus:outline-none" /></label>
          <select aria-label="Filter by status" value={status} onChange={(event) => setStatus(event.target.value as FilterStatus)} className="min-h-11 rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-white"><option value="all">All statuses</option>{statuses.slice(1).map((item) => <option key={item} value={item}>{item}</option>)}</select>
          <button onClick={() => setShowArchived((value) => !value)} className="min-h-11 rounded-xl border border-white/10 bg-black/40 px-4 text-sm font-semibold text-zinc-300 hover:border-white/25">{showArchived ? "Show active" : "Show archived"}</button>
          <Link prefetch={false} href="/api/admin/creator-applications/export" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-4 text-sm font-semibold text-zinc-300 hover:border-white/25"><DownloadSimple size={17} /> CSV</Link>
        </div>
      </div>
      <p className="mt-3 min-h-5 text-xs text-zinc-500" role="status" aria-live="polite">{message || `${filtered.length} application${filtered.length === 1 ? "" : "s"}`}</p>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.12fr_.88fr]">
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
            <thead className="bg-white/[0.04] text-xs uppercase tracking-wider text-zinc-500"><tr><th className="px-4 py-3">Applicant</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Source</th><th className="px-4 py-3">Submitted</th></tr></thead>
            <tbody className="divide-y divide-white/10">
              {filtered.map((application) => (
                <tr key={application.id} className={`hover:bg-white/[0.035] ${selectedId === application.id ? "bg-violet-400/[0.07]" : ""}`}>
                  <td className="px-4 py-2"><button type="button" onClick={() => setSelectedId(application.id)} className="min-h-12 w-full text-left"><span className="font-semibold text-white">{application.full_name}</span><span className="mt-1 block text-xs text-zinc-500">{application.email}</span></button></td>
                  <td className="px-4 py-4"><StatusPill status={application.status} /></td>
                  <td className="px-4 py-4 text-zinc-400">{application.utm_source || "Direct"}</td>
                  <td className="px-4 py-4 text-zinc-400">{new Date(application.submitted_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="p-8 text-center text-sm text-zinc-500">No applications match these filters.</p>}
        </div>
        {selected ? <ApplicationDetail key={selected.id} application={selected} onUpdate={updateApplication} onDelete={permanentlyDelete} /> : <div className="grid min-h-72 place-items-center rounded-xl border border-dashed border-white/10 text-sm text-zinc-600">Select an application</div>}
      </div>
    </section>
  );
}

function StatusPill({ status }: { status: CreatorApplication["status"] }) {
  const colors = { new: "border-cyan-400/25 bg-cyan-400/[0.08] text-cyan-200", reviewing: "border-violet-400/25 bg-violet-400/[0.08] text-violet-200", approved: "border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-200", rejected: "border-rose-400/25 bg-rose-400/[0.08] text-rose-200" };
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${colors[status]}`}>{status}</span>;
}

function ApplicationDetail({ application, onUpdate, onDelete }: { application: CreatorApplication; onUpdate: (id: string, body: Record<string, unknown>) => Promise<void>; onDelete: (id: string, confirmation: string) => Promise<boolean> }) {
  const [notes, setNotes] = useState(application.private_notes);
  const [armed, setArmed] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  return (
    <aside className="rounded-xl border border-white/10 bg-black/25 p-5">
      <div className="flex items-start justify-between gap-3"><div><h3 className="text-xl font-bold text-white">{application.full_name}</h3><a className="mt-1 block text-sm text-violet-300" href={`mailto:${application.email}`}>{application.email}</a></div><StatusPill status={application.status} /></div>
      <dl className="mt-6 grid gap-4 text-sm"><Detail label="Phone" value={application.phone || "Not provided"} /><Detail label="Compensation" value={application.desired_compensation} /><Detail label="Instagram" value={application.instagram || "Not provided"} /><Detail label="TikTok" value={application.tiktok || "Not provided"} /><Detail label="Motivation" value={application.motivation} /><Detail label="Audience" value={application.audience_description} /></dl>

      <label className="mt-6 block text-sm font-semibold text-zinc-300">Status<select value={application.status} onChange={(event) => void onUpdate(application.id, { status: event.target.value })} className="mt-2 min-h-11 w-full rounded-xl border border-white/10 bg-[#09070e] px-3 text-white"><option value="new">New</option><option value="reviewing">Reviewing</option><option value="approved">Approved</option><option value="rejected">Rejected</option></select></label>
      <label className="mt-5 block text-sm font-semibold text-zinc-300">Private notes<textarea value={notes} onChange={(event) => setNotes(event.target.value)} className="mt-2 min-h-32 w-full resize-y rounded-xl border border-white/10 bg-[#09070e] p-3 text-sm text-white focus:border-violet-400 focus:outline-none" /></label>
      <button onClick={() => void onUpdate(application.id, { privateNotes: notes })} className="mt-3 min-h-11 rounded-xl bg-violet-600 px-4 text-sm font-bold text-white hover:bg-violet-500">Save notes</button>

      <div className="mt-7 border-t border-white/10 pt-5">
        <button onClick={() => void onUpdate(application.id, { archived: !application.archived_at })} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm font-semibold text-zinc-300 hover:border-white/25">{application.archived_at ? <ArrowCounterClockwise size={17} /> : <Archive size={17} />}{application.archived_at ? "Restore application" : "Archive application"}</button>
        {!armed ? (
          <button onClick={() => setArmed(true)} className="mt-3 flex min-h-11 items-center gap-2 text-sm font-semibold text-rose-300"><Trash size={17} />Prepare permanent deletion</button>
        ) : (
          <div className="mt-4 rounded-xl border border-rose-400/25 bg-rose-400/[0.05] p-4">
            <p className="text-sm leading-6 text-rose-100">This cannot be undone. Type <strong>DELETE {application.email}</strong> to confirm.</p>
            <input value={confirmation} onChange={(event) => setConfirmation(event.target.value)} className="mt-3 min-h-11 w-full rounded-lg border border-rose-400/25 bg-black/50 px-3 text-sm text-white" />
            <div className="mt-3 flex gap-2"><button onClick={() => { setArmed(false); setConfirmation(""); }} className="min-h-11 rounded-lg border border-white/10 px-3 text-sm text-zinc-300">Cancel</button><button disabled={confirmation !== `DELETE ${application.email}`} onClick={() => void onDelete(application.id, confirmation)} className="min-h-11 rounded-lg bg-rose-600 px-3 text-sm font-bold text-white disabled:opacity-40">Delete permanently</button></div>
          </div>
        )}
      </div>
    </aside>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div className="min-w-0"><dt className="utility-text text-[0.55rem] text-zinc-600">{label}</dt><dd className="mt-1 break-words whitespace-pre-wrap leading-6 text-zinc-300">{value}</dd></div>;
}
