"use client";

import { ArrowDown } from "@phosphor-icons/react";
import { motion, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { useConservativeMotion } from "@/hooks/use-conservative-motion";
import { useSceneProgress } from "@/hooks/use-scene-progress";
import { PhoneMockup } from "../phone-mockup";
import { StoreBadges } from "../store-badges";
import { StreakExpansion } from "./product-emergence";

export function CinematicHero() {
  const section = useRef<HTMLElement>(null);
  const conservative = useConservativeMotion();
  const scrollYProgress = useSceneProgress(section, !conservative, true);
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.35 });
  const backgroundY = useTransform(smooth, [0, 1], [0, conservative ? 0 : 110]);
  const phoneY = useTransform(smooth, [0, 1], [0, conservative ? 0 : -90]);
  const phoneRotate = useTransform(smooth, [0, 1], [0, conservative ? 0 : -2.5]);

  return (
    <section ref={section} id="start" className="cinematic-hero relative overflow-hidden border-b border-white/10 bg-black pt-[calc(var(--header-height)+.5rem)] md:min-h-[min(56rem,100svh)] lg:min-h-svh">
      <motion.div className="motion-static-fallback absolute inset-0" style={{ y: backgroundY }} aria-hidden="true">
        <picture>
          <source media="(max-width: 767px)" type="image/avif" srcSet="/assets/scenes/hero-portrait-720.avif 720w, /assets/scenes/hero-portrait-1080.avif 1080w, /assets/scenes/hero-portrait-2160.avif 2160w" sizes="100vw" />
          <source media="(max-width: 767px)" type="image/webp" srcSet="/assets/scenes/hero-portrait-720.webp 720w, /assets/scenes/hero-portrait-1080.webp 1080w, /assets/scenes/hero-portrait-2160.webp 2160w" sizes="100vw" />
          <source type="image/avif" srcSet="/assets/scenes/hero-landscape-1280.avif 1280w, /assets/scenes/hero-landscape-1920.avif 1920w, /assets/scenes/hero-landscape-3840.avif 3840w" sizes="100vw" />
          <source type="image/webp" srcSet="/assets/scenes/hero-landscape-1280.webp 1280w, /assets/scenes/hero-landscape-1920.webp 1920w, /assets/scenes/hero-landscape-3840.webp 3840w" sizes="100vw" />
          <img src="/assets/scenes/hero-landscape.png" alt="" width={1920} height={1080} className="h-full w-full scale-[1.04] object-cover" fetchPriority="high" />
        </picture>
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,2,7,.18),rgba(3,2,7,.08)_45%,rgba(3,2,7,.6)),linear-gradient(0deg,#030207_0%,transparent_28%,rgba(3,2,7,.2)_100%)] max-md:bg-[linear-gradient(0deg,#030207_0%,rgba(3,2,7,.08)_50%,rgba(3,2,7,.65)_100%)]" />

      <div className="hero-grid content-shell relative grid items-center gap-8 py-8 md:min-h-[calc(min(56rem,100svh)-var(--header-height))] md:grid-cols-[minmax(19rem,.85fr)_minmax(24rem,1.15fr)] md:py-14 lg:min-h-[calc(100svh-var(--header-height))] lg:items-start lg:gap-16 lg:pb-0 lg:pt-[8vh]">
        <motion.div
          style={{ y: phoneY, rotate: phoneRotate }}
          initial={conservative ? false : { opacity: 0, y: 90, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="motion-static-fallback hero-phone relative order-2 ml-auto mr-[2%] md:order-1 md:mx-auto"
        >
          <motion.span
            aria-hidden="true"
            className="absolute -inset-x-24 -top-14 z-[-1] h-28 rounded-[100%] bg-violet-400/28 blur-3xl"
            style={{ opacity: 0.5 }}
          />
          <PhoneMockup src="/assets/app-screens/home.png" alt="Revenge Arc home screen for Marlin showing a weekly report, quote, 72-hour challenge, and 42-day streak" priority />
          <StreakExpansion conservative={conservative} />
        </motion.div>

        <div className="hero-copy order-1 max-w-[42rem] md:order-2">
          <motion.p initial={conservative ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.65 }} className="motion-static-fallback utility-text text-[0.68rem] text-violet-300 sm:text-xs">One system. Your next chapter.</motion.p>
          <motion.h1 initial={conservative ? false : { opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="hero-title motion-static-fallback mt-4 font-sans text-[clamp(2.6rem,10.8vw,3.65rem)] font-black leading-[0.98] tracking-[-0.065em] text-white md:text-[clamp(3.7rem,6vw,6.8rem)]">
            Built for today.<br /><span className="text-gradient-violet">Forged for what&apos;s next.</span>
          </motion.h1>
          <motion.p initial={conservative ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44, duration: 0.7 }} className="motion-static-fallback mt-4 max-w-xl text-[0.94rem] leading-6 text-zinc-300 sm:text-lg sm:leading-8">
            Your training, nutrition, AI guidance, and progress. Finally, connected. Stop starting over. Start your arc.
          </motion.p>
          <div className="hero-store mt-6 lg:mt-8"><StoreBadges /></div>
          <a href="#explore" className="hero-explore-link mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-violet-200">See it in action <ArrowDown size={16} aria-hidden="true" /></a>
        </div>
      </div>

      <div aria-hidden="true" className="hero-buddy pointer-events-none absolute bottom-0 right-[2%] hidden w-[7.5rem] md:block lg:w-[min(12vw,11rem)]">
        <Image src="/assets/brand/buddy-open.webp" alt="" width={977} height={1610} loading="lazy" unoptimized className="h-auto w-full drop-shadow-[0_0_40px_rgba(34,211,238,.3)]" />
      </div>
      <a href="#train" className="absolute bottom-5 left-1/2 hidden min-h-11 -translate-x-1/2 items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400 hover:text-white md:flex">
        Enter the arc <ArrowDown size={17} className="animate-bounce" />
      </a>
    </section>
  );
}
