import type { Metadata } from "next";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import {
  LEGAL_EFFECTIVE_DATE,
  LEGAL_VERSION,
  legalDocumentGroups,
} from "@/content/legal";
import { SUPPORT_EMAIL } from "@/content/site";

export const metadata: Metadata = {
  title: "Legal Center",
  description:
    "Revenge Arc terms, privacy, AI, consumer health, safety, community, app license, subscription, creator, copyright, security, and data policies.",
  alternates: { canonical: "/legal" },
};

export default function LegalCenterPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal Center"
        title={
          <>
            Your choices.
            <br />
            <span className="text-violet-300">Clearly explained.</span>
          </>
        }
        description="Find what happens to your data, how membership works, and the limits of AI. Start with the topic you need."
      />
      <nav
        aria-label="Common legal questions"
        className="content-shell studio-reading legal-shortcuts mt-7"
      >
        <Link href="/privacy">Privacy & your data</Link>
        <Link href="/data-retention-deletion">Delete your records</Link>
        <Link href="/subscriptions-refunds">Trial & subscriptions</Link>
        <Link href="/ai-data-processing">AI & safety</Link>
      </nav>
      <section
        className="content-shell studio-reading pt-7 sm:pt-10"
        aria-labelledby="legal-status-heading"
      >
        <div className="grid gap-4 lg:grid-cols-[1.4fr_.6fr]">
          <div className="rounded-2xl border border-amber-400/30 bg-amber-400/[0.07] p-6 sm:p-8">
            <p className="utility-text text-[0.62rem] text-amber-300">
              Policy review status
            </p>
            <h2
              id="legal-status-heading"
              className="display-text mt-3 text-3xl font-bold uppercase text-white sm:text-4xl"
            >
              Counsel review required
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-amber-50/90">
              Record deletion, reporting, and blocking are described below.
              These policies still need final business identity, jurisdiction,
              provider, retention, and legal review. Website launch does not
              mean that review is complete.
            </p>
          </div>
          <dl className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 text-sm sm:p-8">
            <div>
              <dt className="text-zinc-500">Effective date</dt>
              <dd className="mt-1 font-bold text-white">
                {LEGAL_EFFECTIVE_DATE}
              </dd>
            </div>
            <div className="mt-5">
              <dt className="text-zinc-500">Policy set</dt>
              <dd className="mt-1 font-bold text-white">{LEGAL_VERSION}</dd>
            </div>
            <div className="mt-5">
              <dt className="text-zinc-500">Service age</dt>
              <dd className="mt-1 font-bold text-white">Adults 18+ only</dd>
            </div>
          </dl>
        </div>
      </section>
      <section
        className="content-shell studio-reading py-10 sm:py-16"
        aria-label="Legal documents"
      >
        <div className="grid gap-14 sm:gap-16">
          {legalDocumentGroups.map((group) => (
            <section
              key={group.category}
              aria-labelledby={`legal-${group.category.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`}
            >
              <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-white/10 pb-4">
                <h2
                  id={`legal-${group.category.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`}
                  className="display-text text-3xl font-bold uppercase text-white sm:text-4xl"
                >
                  {group.category}
                </h2>
                <p className="utility-text text-[0.58rem] text-zinc-500">
                  {group.documents.length}{" "}
                  {group.documents.length === 1 ? "document" : "documents"}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.documents.map((document, index) => (
                  <Link
                    key={document.slug}
                    href={`/${document.slug}`}
                    className="group hairline-panel flex flex-col rounded-2xl p-5 hover:border-violet-400/35"
                  >
                    <p className="utility-text text-[0.58rem] text-zinc-400">
                      {String(index + 1).padStart(2, "0")} · Updated{" "}
                      {document.updated}
                    </p>
                    <h3 className="display-text mt-4 text-3xl font-bold leading-tight text-white">
                      {document.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-300">
                      {document.description}
                    </p>
                    <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-bold text-violet-300">
                      Read document{" "}
                      <ArrowRight
                        size={17}
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="content-shell py-14 sm:py-20">
          <a
            href="/website-third-party-notices.txt"
            className="studio-text-link"
          >
            View website software & font notices
            <ArrowRight size={17} aria-hidden="true" />
          </a>
          <p className="utility-text mt-5 text-[0.62rem] text-zinc-400">
            Rights, reports, and support
          </p>
          <h2 className="display-text mt-3 text-4xl font-bold uppercase text-white sm:text-5xl">
            Start with one inbox.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300">
            For privacy requests, deletion, safety reports, enforcement appeals,
            copyright concerns, subscription support, or policy questions,
            contact{" "}
            <a
              className="font-bold text-cyan-300 hover:text-cyan-200"
              href={`mailto:${SUPPORT_EMAIL}`}
            >
              {SUPPORT_EMAIL}
            </a>
            . This inbox is not an emergency service.
          </p>
        </div>
      </section>
    </>
  );
}
