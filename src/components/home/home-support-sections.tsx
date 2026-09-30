import { ArrowRight, LockSimple, UserFocus } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { legalDocuments } from "@/content/legal";
import { communitySteps } from "@/content/site";
import { FaqList } from "../faq-list";
import { PricingCards } from "../pricing-cards";
import { TrackLink } from "../track-link";

const featuredLegalSlugs = new Set(["terms", "privacy", "consumer-health-data", "ai-data-processing", "health-safety", "subscriptions-refunds"]);
const featuredLegalDocuments = legalDocuments.filter((document) => featuredLegalSlugs.has(document.slug));

export function CommunitySection() {
  return (
    <section className="home-support relative overflow-hidden border-b border-white/10 py-20 sm:py-28">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-80 w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_210deg,rgba(168,85,247,.22),rgba(34,211,238,.18),rgba(245,158,11,.15),rgba(168,85,247,.22))] blur-[100px]" />
      <div className="content-shell relative">
        <p className="utility-text text-center text-xs text-cyan-300">The next chapter</p>
        <h2 className="display-text mt-4 text-center text-[clamp(3.6rem,8vw,7rem)] font-bold uppercase leading-[0.84] text-white">Built with the community.</h2>
        <p className="mx-auto mt-5 max-w-xl text-center text-base leading-7 text-zinc-400">Your voice drives what we build. Revenge Arc grows by turning useful requests into connected features.</p>
        <ol className="community-steps mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 md:grid-cols-4">
          {communitySteps.map(({ number, title, text, icon: Icon }) => (
            <li key={number} className="relative bg-[#08070e]/95 p-5 sm:p-6">
              <Icon size={27} className="text-violet-300" aria-hidden="true" />
              <p className="utility-text mt-7 text-[0.6rem] text-zinc-600">{number}</p>
              <h3 className="mt-1 text-lg font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ProgramsSection() {
  return (
    <section className="home-support border-b border-white/10 py-20 sm:py-28">
      <div className="content-shell grid gap-4 lg:grid-cols-2">
        <article className="home-program hairline-panel relative min-h-[29rem] overflow-hidden rounded-2xl p-6 sm:p-8">
          <Image src="/assets/scenes/prove-landscape.png" alt="Revenge Arc creator standing above an amber mountain landscape" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-[35%_center] opacity-65" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#07050b] via-[#07050b]/85 to-transparent" />
          <div className="relative flex h-full max-w-md flex-col">
            <span className="grid size-12 place-items-center rounded-xl border border-violet-300/25 bg-violet-500/10 text-violet-300"><UserFocus size={25} /></span>
            <h2 className="display-text mt-8 text-5xl font-bold uppercase text-white sm:text-6xl">Creator Program</h2>
            <p className="mt-4 text-base leading-7 text-zinc-300">Help explain features, inspire progress, and bring useful feedback into the roadmap.</p>
            <ul className="mt-6 grid gap-2 text-sm text-zinc-300"><li>Early feature access</li><li>Creator resources</li><li>A direct line to the roadmap</li></ul>
            <TrackLink href="/creators" event="creator_cta" details={{ placement: "home_program" }} className="mt-auto inline-flex min-h-12 w-fit items-center gap-2 rounded-xl bg-violet-600 px-5 text-sm font-bold text-white hover:bg-violet-500">Apply now <ArrowRight size={18} /></TrackLink>
          </div>
        </article>

        <article className="home-program hairline-panel relative min-h-[29rem] overflow-hidden rounded-2xl p-6 sm:p-8">
          <Image src="/assets/scenes/hero-landscape.png" alt="Coach Pro concept with a single athlete overlooking the Revenge Arc mountains" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-left opacity-60" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#07050b] via-[#07050b]/84 to-transparent" />
          <div className="relative max-w-md">
            <span className="grid size-12 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-500/10 text-cyan-300"><LockSimple size={25} /></span>
            <p className="utility-text mt-8 text-[0.65rem] text-cyan-300">Coming soon</p>
            <h2 className="display-text mt-2 text-5xl font-bold uppercase text-white sm:text-6xl">Coach Pro</h2>
            <p className="mt-4 text-base leading-7 text-zinc-300">A future workspace where coaches can review client activity, understand daily patterns, and help update routines.</p>
            <div className="mt-7 inline-flex min-h-11 items-center rounded-xl border border-white/15 bg-black/40 px-4 text-sm font-semibold text-zinc-400">In development</div>
          </div>
        </article>
      </div>
    </section>
  );
}

export function HomePricingSection() {
  return (
    <section className="home-support border-b border-white/10 py-20 sm:py-28">
      <div className="content-shell grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
        <div>
          <p className="utility-text text-xs text-amber-300">One membership</p>
          <h2 className="display-text mt-4 text-6xl font-bold uppercase leading-[0.83] text-white sm:text-7xl">Choose your pace.</h2>
          <p className="mt-5 max-w-md text-base leading-7 text-zinc-400">Every plan unlocks the same connected experience. Choose the billing cadence inside the app.</p>
          <Link href="/pricing" className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-violet-300 hover:text-violet-200">Pricing details <ArrowRight size={17} /></Link>
        </div>
        <PricingCards compact />
      </div>
    </section>
  );
}

export function HomeFaqLegalSection() {
  return (
    <section className="home-support py-20 sm:py-28">
      <div className="content-shell grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <div className="mb-7 flex items-end justify-between gap-4"><div><p className="utility-text text-[0.65rem] text-violet-300">Questions</p><h2 className="display-text mt-2 text-5xl font-bold uppercase text-white">FAQ</h2></div><Link href="/faq" className="text-sm font-bold text-zinc-400 hover:text-white">View all</Link></div>
          <div className="home-faq-list"><FaqList limit={5} /></div>
          <Link href="/legal" className="home-legal-compact mt-8 hidden rounded-xl border border-white/15 p-5 text-sm font-semibold text-zinc-300">Privacy, policies &amp; your data <ArrowRight size={18} className="float-right text-violet-300" aria-hidden="true" /></Link>
        </div>
        <div className="home-legal">
          <div className="mb-7 flex items-end justify-between gap-4"><div><p className="utility-text text-[0.65rem] text-cyan-300">Plain language</p><h2 className="display-text mt-2 text-5xl font-bold uppercase text-white">Legal Center</h2></div><Link href="/legal" className="text-sm font-bold text-zinc-400 hover:text-white">View all {legalDocuments.length}</Link></div>
          <div className="grid gap-2 sm:grid-cols-2">
            {featuredLegalDocuments.map((document) => (
              <Link key={document.slug} href={`/${document.slug}`} className="group flex min-h-20 items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.025] p-4 hover:border-cyan-300/25 hover:bg-cyan-400/[0.04]">
                <span><span className="block text-sm font-semibold text-white">{document.title}</span><span className="mt-1 block text-xs leading-5 text-zinc-500">{document.description}</span></span><ArrowRight className="shrink-0 text-zinc-600 group-hover:text-cyan-300" size={17} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
