import { ArrowUpRight, Watch, ArrowDown } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import type { Chapter } from "@/content/site";
import { PhoneMockup } from "../phone-mockup";
import { ClosingDownload } from "./closing-download";

export function WatchTeaser() {
  return (
    <section id="apple-watch" className="watch-teaser section-pause">
      <div className="content-shell watch-grid">
        <div><p className="utility-text text-[.65rem] text-violet-300">The next chapter · Apple Watch</p><h2 className="section-title mt-4">Your arc,<br />on your wrist.</h2><p className="mt-5 max-w-md text-base leading-7 text-zinc-300">A smaller screen. The same ambition. We’re working on bringing Revenge Arc to Apple Watch.</p><p className="coming-soon-pill"><span aria-hidden="true" />Support coming soon</p></div>
        <div className="watch-teaser-art" aria-label="Revenge Arc Apple Watch support, coming soon">
          <div className="watch-orbit" aria-hidden="true" />
          <div className="watch-teaser-tile"><Watch size={34} weight="light" aria-hidden="true" /><Image src="/assets/brand/ra-logo-header.webp" alt="" width={100} height={112} unoptimized /><span className="utility-text text-[.55rem] text-violet-200">Coming soon</span></div>
          <p className="relative mt-6 text-center text-xs text-zinc-400">A new way to carry your momentum.</p>
        </div>
      </div>
    </section>
  );
}

export function QuietFeature({ chapter }: { chapter: Chapter }) {
  const fuel = chapter.id === "fuel";
  return (
    <section id={chapter.id} className={`quiet-feature section-pause ${fuel ? "quiet-fuel" : "quiet-connect"}`}>
      <div className="content-shell quiet-grid">
        <div><p className="utility-text text-[.65rem] text-cyan-300">{chapter.eyebrow} · {fuel ? "Room for real life" : "You belong here"}</p><h2 className="section-title mt-4">{chapter.title}</h2><p className="mt-4 max-w-lg text-2xl font-semibold leading-tight tracking-tight text-white">{fuel ? "Good food. Better momentum." : "Big goals. Better company."}</p><p className="mt-4 max-w-lg text-base leading-7 text-zinc-400">{fuel ? "A meal, a snack, a glass of water. Keep your nutrition together without making your whole day about tracking it." : "A first workout counts. So does a new personal best. Share your wins, ask questions, and find people who get it."}</p><ul className="quiet-benefits">{chapter.details.map(detail => <li key={detail}><span aria-hidden="true" />{detail}</li>)}</ul><p className="mt-6 flex items-center gap-2 text-xs text-zinc-400"><ArrowUpRight size={17} aria-hidden="true" />Tap the screen. Take a closer look.</p></div>
        <div className="quiet-product"><div className="quiet-product-glow" aria-hidden="true" /><div className="quiet-phone"><PhoneMockup src={chapter.screen} alt={chapter.imageAlt} /></div><p className="quiet-product-caption">{fuel ? "Your nutrition, at a glance." : "Your people. Your Arena."}</p></div>
      </div>
    </section>
  );
}

export function OriginSection() {
  return (
    <section id="our-story" className="origin-section section-pause">
      <div className="content-shell origin-grid">
        <div><p className="utility-text text-[.65rem]">Why Revenge Arc exists</p><h2 className="section-title mt-5">You don’t need<br />a perfect week.<br /><span className="origin-accent">You need a next step.</span></h2></div>
        <div className="origin-copy"><p>Training in one place. Meals in another. Progress somewhere else. It’s a lot to hold together when you’re just trying to show up.</p><p>Revenge Arc brings those pieces into one connected system, built around a simple idea: make the next useful action easier to see.</p><p>A missed day doesn’t erase your work. There’s always another set, another meal, another chance to build momentum.</p><div className="origin-signature"><Image src="/assets/brand/ra-logo-header.webp" alt="" width={48} height={54} unoptimized /><span><strong>Revenge Arc</strong><span>Stop starting over. Start your arc.</span></span></div></div>
      </div>
    </section>
  );
}

export function ClosingSection() {
  return (
    <section id="next-chapter" className="closing-section section-pause">
      <div className="closing-landscape" aria-hidden="true" />
      <div className="content-shell closing-grid">
        <div><p className="utility-text text-[.65rem] text-violet-200">Take the next step</p><h2 className="section-title mt-5">Your next chapter<br /><span className="text-violet-300">starts here.</span></h2><p className="mt-5 max-w-md text-base leading-7 text-zinc-300">Bring your training, nutrition, and progress together. Make room for the person you’re becoming.</p><div className="mt-7"><ClosingDownload /></div><p className="mt-4 text-xs leading-6 text-zinc-400">Google Play &amp; Apple Watch support coming soon.</p><Link href="/features" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-zinc-200">Explore all features <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
        <div className="closing-phone"><PhoneMockup src="/assets/app-screens/home.png" alt="Revenge Arc home screen showing your next step and weekly progress" /></div>
      </div>
      <a href="#start" className="closing-back"><ArrowDown size={15} className="rotate-180" aria-hidden="true" />Back to the beginning</a>
    </section>
  );
}
