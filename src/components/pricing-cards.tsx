"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { APP_STORE_URL, prices } from "@/content/site";
import { trackEvent } from "@/lib/client-events";

export function PricingCards({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`grid gap-3 ${compact ? "md:grid-cols-3" : "lg:grid-cols-3"}`}
    >
      {[prices[1], prices[2], prices[0]].map((plan) => (
        <article
          key={plan.id}
          className={`relative flex flex-col overflow-hidden rounded-2xl border p-5 sm:p-6 ${plan.featured ? "border-amber-400/50 bg-gradient-to-b from-amber-500/10 to-[#0a0810] shadow-[0_0_45px_rgba(245,158,11,.12)]" : "border-white/15 bg-[#0a0810]/90"}`}
        >
          {plan.featured && (
            <span className="utility-text absolute right-0 top-0 bg-amber-400 px-3 py-1.5 text-[0.58rem] font-bold text-black">
              Best value
            </span>
          )}
          <p className="text-sm font-semibold text-zinc-300">{plan.label}</p>
          <p className="display-text mt-5 text-5xl font-bold text-white">
            {plan.price}
          </p>
          <p className="mt-1 text-sm text-zinc-300">
            {plan.cadence} · billed {plan.id}
          </p>
          <p className="pricing-value">
            {plan.id === "yearly"
              ? "$12.50/month equivalent. Save $65.89/year versus monthly billing."
              : plan.id === "monthly"
                ? "A month at a time. Keep your routine connected."
                : "Shorter billing cycle. The same included tools."}
          </p>
          <p className="mt-3 text-sm text-zinc-300">
            Workouts, food logging, GymBuddy, progress & Arena.
          </p>
          {APP_STORE_URL ? (
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackEvent("pricing_plan_click", { plan: plan.id })
              }
              className={`mt-6 inline-flex min-h-12 items-center justify-between rounded-xl border px-4 text-sm font-bold transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 ${plan.featured ? "border-amber-300/40 bg-gradient-to-r from-violet-600 to-rose-500 text-white" : "border-white/15 bg-white/[0.04] text-white hover:border-violet-300/50"}`}
            >
              Open App Store <ArrowRight size={18} />
            </a>
          ) : (
            <p className="mt-5 text-xs leading-6 text-zinc-400">
              Select your plan in the app when the App Store listing is
              available.
            </p>
          )}
        </article>
      ))}
    </div>
  );
}
