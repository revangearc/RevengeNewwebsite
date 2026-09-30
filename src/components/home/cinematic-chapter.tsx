"use client";

import { CheckCircle } from "@phosphor-icons/react";
import { motion, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import type { Accent, Chapter } from "@/content/site";
import { useConservativeMotion } from "@/hooks/use-conservative-motion";
import { useSceneProgress } from "@/hooks/use-scene-progress";
import { PhoneMockup } from "../phone-mockup";
import { ConnectArenaStage } from "./connect-arena-stage";
import { ChapterEmergence } from "./product-emergence";

const accentStyles: Record<Accent, { text: string; line: string }> = {
  violet: { text: "text-violet-300", line: "bg-violet-400" },
  cyan: { text: "text-cyan-300", line: "bg-cyan-400" },
  amber: { text: "text-amber-300", line: "bg-amber-400" },
  rose: { text: "text-rose-300", line: "bg-rose-400" },
};

export function CinematicChapter({ chapter }: { chapter: Chapter }) {
  const section = useRef<HTMLElement>(null);
  const conservative = useConservativeMotion();
  const isConnect = chapter.id === "connect";
  const scrollYProgress = useSceneProgress(section, !conservative);
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.25 });
  const backgroundY = useTransform(smooth, [0, 1], [conservative ? 0 : -80, conservative ? 0 : 80]);
  const backgroundScale = useTransform(smooth, [0, 0.5, 1], conservative ? [1, 1, 1] : [1.07, 1, 1.05]);
  const phoneY = useTransform(smooth, [0.1, 0.5, 0.9], [conservative ? 0 : 80, 0, conservative ? 0 : -40]);
  const phoneRotate = useTransform(smooth, [0.1, 0.5, 0.9], [chapter.screenPosition === "left" ? -4 : 4, 0, chapter.screenPosition === "left" ? 2 : -2]);
  const copyY = useTransform(smooth, [0.15, 0.5, 0.85], [conservative ? 0 : 35, 0, conservative ? 0 : -12]);
  const emergenceX = useTransform(smooth, [0.24, 0.48], [chapter.screenPosition === "left" ? 74 : -74, 0]);
  const emergenceY = useTransform(smooth, [0.24, 0.48], [conservative ? 0 : 24, 0]);
  const emergenceScale = useTransform(smooth, [0.24, 0.48], conservative ? [1, 1] : [0.92, 1]);
  const emergenceOpacity = useTransform(smooth, [0.24, 0.45], [0, 1]);
  const accent = accentStyles[chapter.accent];
  const landscapeStem = chapter.background.replace(/\.png$/, "");
  const portraitStem = chapter.portraitBackground?.replace(/\.png$/, "");
  const hasEmergence = chapter.id === "train" || chapter.id === "adapt";
  const phoneAlignment = !hasEmergence
      ? "mx-auto"
      : chapter.screenPosition === "left"
        ? "ml-[2%] mr-auto md:mx-auto"
        : "ml-auto mr-[2%] md:mx-auto";
  const chapterGrid = isConnect
    ? "lg:grid-cols-[minmax(0,1.28fr)_minmax(22rem,.72fr)] lg:gap-8 xl:grid-cols-[minmax(0,1.3fr)_minmax(25rem,.7fr)] xl:gap-14"
    : "md:grid-cols-2 md:gap-12 lg:gap-20";

  return (
    <section ref={section} id={chapter.id} className="cinematic-chapter relative border-b border-white/10 bg-black lg:min-h-svh">
      <div className="chapter-stage relative flex items-center overflow-hidden pt-10 lg:min-h-svh lg:pt-[var(--header-height)]">
        <motion.div aria-hidden="true" className="motion-static-fallback absolute -inset-y-24 inset-x-0" style={{ y: backgroundY, scale: backgroundScale }}>
          <picture>
            {portraitStem && <source media="(max-width: 767px)" type="image/avif" srcSet={`${portraitStem}-720.avif 720w, ${portraitStem}-1080.avif 1080w, ${portraitStem}-2160.avif 2160w`} sizes="100vw" />}
            {portraitStem && <source media="(max-width: 767px)" type="image/webp" srcSet={`${portraitStem}-720.webp 720w, ${portraitStem}-1080.webp 1080w, ${portraitStem}-2160.webp 2160w`} sizes="100vw" />}
            <source type="image/avif" srcSet={`${landscapeStem}-1280.avif 1280w, ${landscapeStem}-1920.avif 1920w, ${landscapeStem}-3840.avif 3840w`} sizes="100vw" />
            <source type="image/webp" srcSet={`${landscapeStem}-1280.webp 1280w, ${landscapeStem}-1920.webp 1920w, ${landscapeStem}-3840.webp 3840w`} sizes="100vw" />
            <img src={chapter.background} alt="" width={1920} height={1080} loading="lazy" className="h-full w-full object-cover" />
          </picture>
        </motion.div>
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,2,7,.84),rgba(3,2,7,.18)_46%,rgba(3,2,7,.48)),linear-gradient(0deg,rgba(3,2,7,.85),transparent_30%,rgba(3,2,7,.38))] max-md:bg-[linear-gradient(0deg,rgba(3,2,7,.9)_0%,rgba(3,2,7,.1)_58%,rgba(3,2,7,.6)_100%)]" />

        <div className={`chapter-grid content-shell relative grid items-center gap-8 pb-12 pt-4 sm:py-7 md:py-10 ${isConnect ? "lg:-translate-y-24 xl:-translate-y-28" : ""} ${chapterGrid}`}>
          <motion.div style={{ y: copyY }} className={`motion-static-fallback ${isConnect ? "lg:order-2" : chapter.screenPosition === "left" ? "md:order-2" : "md:order-1"} relative z-30 min-w-0 ${isConnect ? "lg:pl-2 xl:pl-5" : ""}`}>
            <p className={`utility-text text-[0.65rem] sm:text-xs ${accent.text}`}>{chapter.eyebrow}</p>
            <h2 className={`display-text mt-3 font-bold uppercase leading-[0.76] text-white ${isConnect ? "text-[clamp(4.7rem,17vw,8.5rem)] md:text-[clamp(4.35rem,8.2vw,8.5rem)]" : "text-[clamp(5rem,18vw,10rem)] md:text-[clamp(4.75rem,11vw,10rem)]"}`}>{chapter.title}</h2>
            <p className={`display-text mt-3 max-w-lg text-2xl font-semibold leading-[0.95] sm:mt-5 sm:text-4xl ${accent.text}`}>{chapter.summary}</p>
            <ul className="mt-4 grid gap-2 text-sm text-zinc-200 sm:mt-7 sm:gap-3 sm:text-base">
              {chapter.details.map((detail) => <li key={detail} className="flex items-center gap-3"><CheckCircle size={21} weight="fill" className={accent.text} aria-hidden="true" />{detail}</li>)}
            </ul>
            <span aria-hidden="true" className={`mt-6 block h-px w-16 md:mt-9 md:w-28 ${accent.line} shadow-[0_0_18px_currentColor]`} />
          </motion.div>

          {isConnect ? (
            <div className="relative z-10 min-w-0 lg:order-1">
              <ConnectArenaStage
                screen={chapter.screen}
                imageAlt={chapter.imageAlt}
                phoneStyle={{ y: phoneY }}
                orbitStyle={{
                  x: conservative ? 0 : emergenceX,
                  y: conservative ? 0 : emergenceY,
                  scale: conservative ? 1 : emergenceScale,
                  opacity: conservative ? 1 : emergenceOpacity,
                }}
              />
            </div>
          ) : (
            <motion.div style={{ y: phoneY, rotate: conservative ? 0 : phoneRotate }} className={`chapter-phone motion-static-fallback ${chapter.screenPosition === "left" ? "md:order-1" : "md:order-2"} ${phoneAlignment} relative isolate z-10 w-[min(58vw,20rem)] sm:w-[min(54vw,22rem)] md:w-[min(29vw,25rem)]`}>
              <PhoneMockup src={chapter.screen} alt={chapter.imageAlt} />
              <ChapterEmergence
                chapterId={chapter.id}
                screenPosition={chapter.screenPosition}
                style={{
                  x: conservative ? 0 : emergenceX,
                  y: conservative ? 0 : emergenceY,
                  scale: conservative ? 1 : emergenceScale,
                  opacity: conservative ? 1 : emergenceOpacity,
                }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
