"use client";

import { ChatCircle, Heart, Lightning } from "@phosphor-icons/react";
import { motion, type MotionStyle } from "motion/react";
import Image from "next/image";
import { PhoneMockup } from "../phone-mockup";

const reactionAssets = {
  like: {
    src: "/assets/app-screens/crops/connect-like.png",
    width: 184,
    height: 92,
    alt: "1.1 thousand likes",
  },
  comment: {
    src: "/assets/app-screens/crops/connect-comment.png",
    width: 184,
    height: 92,
    alt: "600 comments",
  },
  hype: {
    src: "/assets/app-screens/crops/connect-hyped.png",
    width: 214,
    height: 92,
    alt: "Hyped by the community",
  },
} as const;

type ConnectArenaStageProps = {
  screen: string;
  imageAlt: string;
  phoneStyle: MotionStyle;
  orbitStyle: MotionStyle;
};

export function ConnectArenaStage({ screen, imageAlt, phoneStyle, orbitStyle }: ConnectArenaStageProps) {
  return (
    <div className="connect-stage relative isolate min-w-0 lg:h-[min(76svh,54rem)] lg:min-h-[42rem] xl:min-h-[46rem]">
      <motion.div
        aria-hidden="true"
        style={orbitStyle}
        className="motion-static-fallback absolute -left-[22%] top-[10%] z-0 hidden aspect-video w-[148%] mix-blend-screen lg:block lg:-left-[13%] lg:top-[13%] lg:w-[125%] xl:-left-[11%] xl:w-[122%]"
      >
        <Image
          src="/assets/decorative/connect-orbit-v4.webp"
          alt=""
          fill
          loading="lazy"
          quality={92}
          sizes="(max-width: 767px) 150vw, (max-width: 1439px) 82vw, 1100px"
          className="object-contain"
        />
      </motion.div>

      <motion.div
        style={phoneStyle}
        className="motion-static-fallback relative z-30 mx-auto w-[min(70vw,19rem)] lg:absolute lg:left-[58%] lg:top-[2%] lg:mx-0 lg:w-[clamp(20rem,27vw,25rem)] lg:-translate-x-1/2 xl:left-[57%] xl:w-[clamp(22rem,24vw,28rem)]"
      >
        <PhoneMockup src={screen} alt={imageAlt} />
      </motion.div>

      <motion.figure
        style={orbitStyle}
        className="motion-static-fallback pointer-events-none absolute inset-0 z-40 hidden lg:block"
        aria-label="Arena community orbit with member posts, likes, comments, hype, and a clear helpful reply to Maya's post"
      >
        <MemberNode
          className="left-[1%] top-[8%] sm:left-[3%] lg:left-[2%] lg:top-[15%] xl:left-[4%]"
          src="/assets/community/nia-squat-post-v1.webp"
          name="Nia Carter"
          score="2740"
          imagePosition="50% 38%"
        />

        <ReactionSignal kind="like" className="z-40 left-[-2%] top-[20%] w-[6.6rem] sm:left-[2%] sm:top-[22%] sm:w-[7.2rem] lg:left-[1%] lg:top-[29%] lg:w-[8rem] xl:left-[3%] xl:w-[8.6rem]" />

        <OrbitPost className="bottom-[2%] left-0 w-[53%] max-w-[13rem] sm:bottom-[3%] sm:left-[-2%] sm:w-[42%] sm:max-w-[13.5rem] lg:bottom-[7%] lg:left-[-3%] lg:w-[29%] lg:max-w-[14.5rem] xl:left-[-1%]" />

        <MayaReplyCard className="right-[1%] top-[65%] w-[72%] max-w-[17rem] sm:right-0 sm:top-[56%] sm:w-[46%] sm:max-w-[16.5rem] lg:right-[-3%] lg:top-[26%] lg:w-[28%] lg:max-w-[12rem] xl:right-[-4%] xl:w-[29%] xl:max-w-[13rem]" />

        <MemberNode
          className="right-[2%] top-[82%] sm:right-[4%] sm:top-[67%] lg:right-[5%] lg:top-[53%] xl:right-[6%]"
          src="/assets/community/eli-omar-training-post-v1.webp"
          name="Eli Brooks"
          score="2880"
          imagePosition="68% 42%"
        />

        <ReactionSignal kind="comment" className="right-[-2%] top-[88%] w-[6.6rem] sm:right-[1%] sm:top-[78%] sm:w-[7.2rem] lg:right-[2%] lg:top-[64%] lg:w-[8rem] xl:right-[3%] xl:w-[8.6rem]" />
        <ReactionSignal kind="hype" className="bottom-[3%] right-[1%] w-[7.6rem] sm:right-[4%] sm:w-[8.4rem] lg:bottom-[7%] lg:right-[7%] lg:w-[9.4rem] xl:right-[9%] xl:w-[10rem]" />

        <figcaption className="screen-reader-only">
          A social orbit extends from the real Arena screen with Nia&apos;s squat milestone, a helpful reply to Maya&apos;s question, and app-accurate likes, comments, and HYPED reactions.
        </figcaption>
      </motion.figure>
      <div className="relative z-40 mx-auto -mt-20 w-[min(100%,21rem)] lg:hidden"><MayaReplyCard className="relative" /></div>
    </div>
  );
}

function MemberNode({
  className,
  src,
  name,
  score,
  imagePosition,
}: {
  className: string;
  src: string;
  name: string;
  score: string;
  imagePosition: string;
}) {
  return (
    <div className={`absolute flex items-end gap-1.5 ${className}`}>
      <span className="relative size-11 overflow-hidden rounded-full border-[3px] border-rose-400 bg-[#08070d] shadow-[0_0_0_2px_rgba(3,2,7,.85),0_0_24px_rgba(244,63,117,.35)] sm:size-12 md:size-14">
        <Image src={src} alt="" fill loading="lazy" sizes="56px" className="object-cover" style={{ objectPosition: imagePosition }} />
      </span>
      <span className="mb-0.5 flex min-h-6 items-center gap-1 rounded-md border border-rose-400/45 bg-[#220b18] px-2 text-[0.58rem] font-black tabular-nums text-rose-200 shadow-[0_8px_24px_rgba(0,0,0,.55)] md:text-[0.64rem]">
        <Lightning size={10} weight="fill" aria-hidden="true" /> {score}
      </span>
      <span className="screen-reader-only">{name}, Arena score {score}</span>
    </div>
  );
}

function ReactionSignal({ kind, className }: { kind: keyof typeof reactionAssets; className: string }) {
  const asset = reactionAssets[kind];
  return (
    <div className={`absolute overflow-hidden rounded-xl border border-white/10 bg-black/90 shadow-[0_16px_42px_rgba(0,0,0,.6)] ${className}`}>
      <Image src={asset.src} alt={asset.alt} width={asset.width} height={asset.height} loading="lazy" sizes="160px" className="h-auto w-full" />
    </div>
  );
}

function MayaReplyCard({ className }: { className: string }) {
  return (
    <div className={`absolute overflow-hidden rounded-xl border border-violet-300/30 bg-[#08060e] shadow-[0_22px_60px_rgba(0,0,0,.72),0_0_34px_rgba(168,85,247,.16)] ${className}`}>
      <div className="flex min-h-9 items-center justify-between gap-2 border-b border-white/10 px-3 py-2">
        <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-rose-400 shadow-[0_0_12px_rgba(244,63,117,.78)]" />
        <span className="shrink-0 rounded-md border border-violet-300/35 bg-violet-400/12 px-2 py-1 text-[0.56rem] font-black uppercase tracking-[0.06em] text-white sm:text-[0.62rem] md:text-[0.68rem]">Maya&apos;s Post</span>
      </div>
      <div className="flex items-start gap-2.5 px-3 py-3 sm:px-3.5 sm:py-3.5">
        <span className="grid size-8 shrink-0 place-items-center rounded-full border border-violet-300/38 bg-violet-500/20 text-xs font-black text-violet-100">J</span>
        <div className="min-w-0">
          <p className="text-[0.62rem] font-medium leading-[1.5] text-zinc-100 sm:text-[0.68rem] md:text-xs">
            Try a two-count pause and keep 1–2 reps in reserve. That broke my plateau without irritating my shoulders.
          </p>
          <p className="mt-2 text-[0.55rem] font-bold text-cyan-300 sm:text-[0.6rem] md:text-[0.68rem]">Helpful reply · 84 likes</p>
        </div>
      </div>
    </div>
  );
}

function OrbitPost({ className }: { className: string }) {
  return (
    <div className={`absolute overflow-hidden rounded-xl border border-violet-300/30 bg-[#08060e] shadow-[0_22px_64px_rgba(0,0,0,.75),0_0_34px_rgba(168,85,247,.14)] ${className}`}>
      <div className="flex items-center gap-2 px-2.5 py-2.5">
        <span className="relative size-8 shrink-0 overflow-hidden rounded-full border-2 border-rose-400 bg-zinc-900">
          <Image src="/assets/community/nia-squat-post-v1.webp" alt="" fill loading="lazy" sizes="32px" className="object-cover" style={{ objectPosition: "50% 38%" }} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block whitespace-nowrap text-[0.6rem] font-black text-white sm:text-[0.67rem]">Nia Carter</span>
          <span className="block truncate text-[0.48rem] text-zinc-500 sm:text-[0.52rem]">@niacarter · now</span>
        </span>
        <span className="ml-auto flex min-h-6 shrink-0 items-center gap-1 rounded-md border border-rose-400/40 bg-rose-500/10 px-1.5 text-[0.48rem] font-black text-rose-200">
          <Lightning size={9} weight="fill" aria-hidden="true" />2740
        </span>
      </div>
      <div className="px-2.5 py-2.5">
        <p className="text-[0.58rem] font-medium leading-[1.45] text-zinc-100 sm:text-[0.65rem]">First clean 225 squat. Depth finally clicked.</p>
        <div className="mt-2 flex items-center gap-3 border-t border-white/10 pt-2 text-[0.5rem] font-black tabular-nums text-white sm:text-[0.56rem]">
          <span className="flex items-center gap-1"><Heart size={14} aria-hidden="true" />428</span>
          <span className="flex items-center gap-1 text-blue-300"><ChatCircle size={14} aria-hidden="true" />73</span>
          <span className="ml-auto text-[0.47rem] uppercase tracking-[0.08em] text-amber-300">Hyped</span>
        </div>
      </div>
    </div>
  );
}
