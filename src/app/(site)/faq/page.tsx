import type { Metadata } from "next";
import { FaqList } from "@/components/faq-list";
import { PageHero } from "@/components/page-hero";
import { faqs } from "@/content/site";
import { DownloadAction } from "@/components/download-action";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about Revenge Arc features, pricing, AI guidance, subscriptions, and Coach Pro.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const categories = [...new Set(faqs.map((faq) => faq.category))];
  return (
    <>
      <PageHero
        eyebrow="Quick answers"
        title={
          <>
            A little clarity.
            <br />
            <span className="text-cyan-300">Then your next step.</span>
          </>
        }
        description="Getting started, the 7-day trial, billing, AI, and your data. Find the answer without the fine-print hunt."
      />
      <div className="content-shell studio-reading py-10 sm:py-16">
        <nav
          aria-label="Question categories"
          className="mb-8 flex flex-wrap gap-2"
        >
          {categories.map((category, index) => (
            <a
              key={category}
              href={`#questions-${index}`}
              className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-3 text-sm text-zinc-200"
            >
              {category}
            </a>
          ))}
        </nav>
        {categories.map((category, index) => (
          <section
            id={`questions-${index}`}
            key={category}
            className="mb-10"
            aria-labelledby={`faq-category-${index}`}
          >
            <h2
              id={`faq-category-${index}`}
              className="mb-5 text-2xl font-bold"
            >
              {category}
            </h2>
            <FaqList items={faqs.filter((faq) => faq.category === category)} />
          </section>
        ))}
        <p className="text-zinc-300">
          Still have a question?{" "}
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center text-violet-300 underline underline-offset-4"
          >
            Open support
          </Link>
          .
        </p>
        <div className="mt-4">
          <DownloadAction placement="faq" />
        </div>
      </div>
    </>
  );
}
