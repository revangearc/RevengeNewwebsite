"use client";

import { EnvelopeSimple, Printer } from "@phosphor-icons/react";

export function LegalActions({ email }: { email: string }) {
  return (
    <div className="legal-actions mt-7 flex flex-wrap gap-3" aria-label="Document actions">
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 text-sm font-bold text-white hover:border-violet-300/45 hover:bg-violet-400/10"
      >
        <Printer size={18} aria-hidden="true" />
        Print or save PDF
      </button>
      <a
        href={`mailto:${email}`}
        className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 px-4 text-sm font-bold text-zinc-200 hover:border-cyan-300/45 hover:text-white"
      >
        <EnvelopeSimple size={18} aria-hidden="true" />
        Contact support
      </a>
    </div>
  );
}
