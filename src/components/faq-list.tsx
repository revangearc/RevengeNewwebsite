import { Plus } from "@phosphor-icons/react/dist/ssr";
import { faqs } from "@/content/site";
import type { FaqItem } from "@/content/site";
import Link from "next/link";

export function FaqList({
  limit,
  items = faqs,
}: {
  limit?: number;
  items?: FaqItem[];
}) {
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.slice(0, limit).map((faq) => (
        <details key={faq.question} className="group">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-left text-base font-semibold text-white marker:content-none sm:text-lg">
            {faq.question}
            <Plus
              className="shrink-0 text-violet-300 transition-transform duration-200 group-open:rotate-45"
              size={21}
              aria-hidden="true"
            />
          </summary>
          <div className="max-w-3xl pb-6 text-sm leading-7 text-zinc-300 sm:text-base">
            <p>{faq.answer}</p>
            {faq.href && (
              <Link href={faq.href} className="studio-text-link">
                {faq.linkLabel}
              </Link>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
