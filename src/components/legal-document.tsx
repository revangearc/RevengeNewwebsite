import Link from "next/link";
import { legalDocuments, type LegalDocument as LegalDocumentType } from "@/content/legal";
import { SUPPORT_EMAIL } from "@/content/site";
import { LegalActions } from "./legal-actions";

export function LegalDocument({ document }: { document: LegalDocumentType }) {
  const relatedDocuments = legalDocuments
    .filter((item) => item.category === document.category && item.slug !== document.slug)
    .slice(0, 3);

  return (
    <article className="legal-document content-shell pb-24 pt-28 sm:pt-40">
      <nav aria-label="Breadcrumb" className="utility-text text-[0.62rem] text-zinc-500"><Link href="/legal" className="hover:text-white">Legal Center</Link><span aria-hidden="true"> / </span><span className="text-violet-300">{document.title}</span></nav>
      <header className="mt-7 max-w-5xl border-b border-white/10 pb-10">
        <p className="utility-text text-[0.62rem] text-violet-300">{document.category} · Revenge Arc policy</p>
        <h1 className="display-text mt-4 break-words text-[clamp(3rem,11vw,7.2rem)] font-bold uppercase leading-[0.88] text-white">{document.title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">{document.description}</p>
        <dl className="mt-6 grid max-w-2xl gap-3 text-sm sm:grid-cols-3">
          <div><dt className="text-zinc-500">Effective</dt><dd className="mt-1 font-semibold text-zinc-200">{document.effective}</dd></div>
          <div><dt className="text-zinc-500">Last updated</dt><dd className="mt-1 font-semibold text-zinc-200">{document.updated}</dd></div>
          <div><dt className="text-zinc-500">Version</dt><dd className="mt-1 font-semibold text-zinc-200">{document.version}</dd></div>
        </dl>
        <LegalActions email={SUPPORT_EMAIL} />
      </header>

      <aside className="legal-review-notice mt-8 max-w-3xl rounded-xl border border-amber-400/30 bg-amber-400/[0.07] p-4 text-sm leading-6 text-amber-100"><strong className="font-bold">Review status: </strong>{document.reviewNotice}</aside>

      <aside className="mt-4 max-w-3xl rounded-xl border border-violet-400/25 bg-violet-400/[0.06] p-4 text-sm leading-6 text-violet-100"><strong className="font-bold">Adults only: </strong>Revenge Arc is intended for people age 18 and older.</aside>

      <nav aria-label="On this page" className="legal-toc mt-10 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
        <p className="utility-text text-[0.62rem] text-zinc-500">On this page</p>
        <ol className="mt-4 grid gap-x-8 gap-y-3 text-sm text-zinc-300 sm:grid-cols-2">
          {document.sections.map((section, index) => <li key={section.heading}><a href={`#section-${index + 1}`} className="hover:text-white"><span className="mr-2 text-violet-400">{String(index + 1).padStart(2, "0")}</span>{section.heading}</a></li>)}
        </ol>
      </nav>

      <div className="mt-14 grid max-w-3xl gap-14">
        {document.sections.map((section, index) => (
          <section key={section.heading} id={`section-${index + 1}`}>
            <p aria-hidden="true" className="utility-text text-[0.58rem] text-violet-400">Section {String(index + 1).padStart(2, "0")}</p>
            <h2 className="display-text mt-2 text-3xl font-bold uppercase leading-tight text-white sm:text-4xl">{section.heading}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph} className="mt-4 text-base leading-8 text-zinc-300">{paragraph}</p>)}
            {section.bullets && <ul className="mt-4 grid gap-3 pl-5 text-base leading-7 text-zinc-300">{section.bullets.map((bullet) => <li key={bullet} className="list-disc pl-1 marker:text-violet-400">{bullet}</li>)}</ul>}
          </section>
        ))}
      </div>

      <div className="legal-document-end mt-16 max-w-3xl border-t border-white/10 pt-8">
        <p className="text-sm leading-6 text-zinc-400">Questions about this document? Email <a className="font-semibold text-cyan-300 hover:text-cyan-200" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</p>
        <Link href="/legal" className="mt-5 inline-flex min-h-11 items-center text-sm font-bold text-violet-300 hover:text-violet-200">Back to Legal Center</Link>
      </div>

      {relatedDocuments.length > 0 && (
        <aside className="mt-14 max-w-5xl border-t border-white/10 pt-8" aria-labelledby="related-legal-heading">
          <p className="utility-text text-[0.6rem] text-zinc-500">Keep reading</p>
          <h2 id="related-legal-heading" className="display-text mt-2 text-3xl font-bold uppercase text-white">Related documents</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {relatedDocuments.map((related) => (
              <Link key={related.slug} href={`/${related.slug}`} className="flex min-h-28 flex-col rounded-xl border border-white/10 bg-white/[0.025] p-4 hover:border-violet-300/35 hover:bg-violet-400/[0.04]">
                <span className="text-sm font-bold text-white">{related.title}</span>
                <span className="mt-2 text-xs leading-5 text-zinc-500">{related.description}</span>
              </Link>
            ))}
          </div>
        </aside>
      )}
    </article>
  );
}
