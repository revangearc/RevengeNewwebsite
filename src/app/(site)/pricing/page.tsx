import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/faq-list";
import { PageHero } from "@/components/page-hero";
import { PricingCards } from "@/components/pricing-cards";
import { DownloadAction } from "@/components/download-action";
import { MembershipNote } from "@/components/membership-note";
import { MEMBERSHIP_BENEFITS } from "@/content/membership";
import { faqs } from "@/content/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Revenge Arc weekly, monthly, and yearly membership pricing.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="One membership · 7-day trial"
        title={
          <>
            One app.
            <br />
            <span className="text-amber-300">Your kind of pace.</span>
          </>
        }
        description="Try 7 days free if you’re eligible. Weekly, monthly, and yearly subscriptions include the same tools. Choose your plan inside the iPhone app."
        actions={<DownloadAction placement="pricing" />}
      />
      <section className="content-shell studio-reading py-10 sm:py-16">
        <h2 className="mb-4 text-lg font-bold">Included with every plan</h2>
        <ul className="mb-7 flex flex-wrap gap-2">
          {MEMBERSHIP_BENEFITS.map((benefit) => (
            <li
              key={benefit}
              className="rounded-full border border-white/15 bg-white/[.03] px-3 py-2 text-sm text-zinc-200"
            >
              {benefit}
            </li>
          ))}
        </ul>
        <PricingCards />
        <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.025] p-5 text-sm leading-6 text-zinc-400">
          Displayed prices are the intended launch prices. The App Store
          purchase screen is the final source for current price, taxes, billing
          period, and availability. See{" "}
          <Link
            className="text-violet-300 underline underline-offset-4"
            href="/subscriptions-refunds"
          >
            Subscriptions &amp; Refunds
          </Link>
          .
        </div>
        <MembershipNote />
      </section>
      <section className="border-t border-white/10 studio-section">
        <div className="content-shell max-w-4xl">
          <p className="utility-text text-[0.65rem] text-violet-300">
            Before you choose
          </p>
          <h2 className="studio-title mt-3">Billing, without the guessing.</h2>
          <div className="mt-8">
            <FaqList
              items={faqs.filter((faq) => faq.category === "Membership")}
            />
          </div>
          <div className="mt-6">
            <DownloadAction placement="pricing_end" />
          </div>
        </div>
      </section>
    </>
  );
}
