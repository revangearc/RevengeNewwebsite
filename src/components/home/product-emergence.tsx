"use client";

import {
  Barbell,
  CalendarCheck,
  Check,
  Fire,
  MoonStars,
  Sparkle,
} from "@phosphor-icons/react";
import { motion, type MotionStyle } from "motion/react";
import type { Chapter } from "@/content/site";

const springEase = [0.16, 1, 0.3, 1] as const;

const week = [
  { label: "M", state: "complete" },
  { label: "T", state: "complete" },
  { label: "W", state: "rest" },
  { label: "T", state: "complete" },
  { label: "F", state: "complete" },
  { label: "S", state: "rest" },
  { label: "S", state: "complete" },
] as const;

export function StreakExpansion({ conservative }: { conservative: boolean }) {
  return (
    <motion.figure
      initial={conservative ? false : { opacity: 0, x: -56, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: 0.72, duration: 0.82, ease: springEase }}
      className="motion-static-fallback pointer-events-none absolute -left-[28%] top-[57%] z-20 w-[68%] sm:-left-[32%] sm:w-[70%]"
      aria-label="Current streak detail: 42 days, five of four workouts logged, and five of five check-ins"
    >
      <div className="absolute left-[7%] top-1/2 h-px w-[20%] -translate-x-full bg-gradient-to-l from-cyan-300/80 to-transparent shadow-[0_0_12px_rgba(34,211,238,.65)]" aria-hidden="true" />
      <div className="overflow-hidden rounded-[1.15rem] border border-cyan-300/35 bg-[linear-gradient(145deg,rgba(6,26,36,.97),rgba(7,8,17,.96))] shadow-[0_22px_70px_rgba(0,0,0,.72),0_0_42px_rgba(34,211,238,.17),inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3 border-b border-cyan-200/12 px-3.5 py-3 sm:px-4">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-cyan-300/35 bg-cyan-400/10 text-cyan-300 shadow-[0_0_22px_rgba(34,211,238,.14)]">
              <Fire size={18} weight="fill" aria-hidden="true" />
            </span>
            <div>
              <p className="utility-text text-[0.48rem] text-cyan-300 sm:text-[0.54rem]">Current streak</p>
              <p className="mt-0.5 text-[0.62rem] font-medium text-cyan-50/70 sm:text-[0.68rem]">6 weeks protected</p>
            </div>
          </div>
          <p className="tabular-nums text-right text-[1.65rem] font-black leading-none tracking-[-0.06em] text-white sm:text-[2rem]">
            42 <span className="text-[0.62rem] font-bold tracking-normal text-cyan-100/70 sm:text-xs">days</span>
          </p>
        </div>

        <div className="grid grid-cols-2 divide-x divide-cyan-200/10 border-b border-cyan-200/10">
          <Metric icon={Barbell} value="5 / 4" label="workouts logged" />
          <Metric icon={CalendarCheck} value="5 / 5" label="check-ins" />
        </div>

        <div className="px-3.5 pb-3 pt-2.5 sm:px-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="utility-text text-[0.43rem] text-cyan-100/55 sm:text-[0.49rem]">This week</p>
            <p className="text-[0.52rem] font-semibold text-cyan-100/55 sm:text-[0.6rem]">86 total check-ins</p>
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {week.map((day, index) => (
              <div key={`${day.label}-${index}`} className="grid justify-items-center gap-1">
                <span className="text-[0.48rem] font-bold text-cyan-50/58 sm:text-[0.56rem]">{day.label}</span>
                <span
                  className={day.state === "complete"
                    ? "grid size-5 place-items-center rounded-full border border-cyan-200/50 bg-cyan-300 text-[#031116] shadow-[0_0_14px_rgba(34,211,238,.26)] sm:size-[1.4rem]"
                    : "grid size-5 place-items-center rounded-full border border-white/16 bg-white/[.035] text-zinc-500 sm:size-[1.4rem]"}
                  title={day.state === "complete" ? "Completed" : "Rest day"}
                >
                  {day.state === "complete" ? <Check size={11} weight="bold" aria-hidden="true" /> : <MoonStars size={10} aria-hidden="true" />}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="screen-reader-only">A 42-day streak supported by five workouts, five check-ins, and two planned rest days this week.</figcaption>
    </motion.figure>
  );
}

function Metric({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Barbell;
  value: string;
  label: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 px-3 py-2.5 sm:px-4">
      <Icon size={15} weight="bold" className="shrink-0 text-cyan-300" aria-hidden="true" />
      <div className="min-w-0">
        <p className="tabular-nums text-sm font-black leading-none text-white sm:text-base">{value}</p>
        <p className="mt-1 truncate text-[0.48rem] font-medium text-zinc-400 sm:text-[0.58rem]">{label}</p>
      </div>
    </div>
  );
}

export function ChapterEmergence({
  chapterId,
  screenPosition,
  style,
}: {
  chapterId: Chapter["id"];
  screenPosition: Chapter["screenPosition"];
  style: MotionStyle;
}) {
  switch (chapterId) {
    case "train":
      return <WorkoutSetExpansion side={screenPosition} style={style} />;
    case "adapt":
      return <GymBuddyConversation side={screenPosition} style={style} />;
    case "connect":
    case "fuel":
    case "prove":
      return null;
  }
}

function WorkoutSetExpansion({ side, style }: { side: Chapter["screenPosition"]; style: MotionStyle }) {
  return (
    <motion.figure
      style={style}
      className={`motion-static-fallback pointer-events-none absolute top-[38%] z-20 w-[84%] ${side === "left" ? "-right-[68%] md:-right-[58%]" : "-left-[68%] md:-left-[58%]"}`}
      aria-label="Another In Combat example showing three Seated Cable Row sets"
    >
      <div className="overflow-hidden rounded-[1.1rem] border border-cyan-300/35 bg-[linear-gradient(145deg,rgba(5,28,36,.98),rgba(7,9,17,.98))] shadow-[0_24px_74px_rgba(0,0,0,.72),0_0_42px_rgba(34,211,238,.2),inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-xl">
        <div className="flex items-start justify-between gap-3 border-b border-cyan-200/12 px-3.5 py-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-cyan-300/30 bg-cyan-400/10 text-cyan-300">
              <Barbell size={17} weight="bold" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="utility-text text-[0.42rem] text-cyan-300 sm:text-[0.48rem]">Exercise 02 · Back</p>
              <p className="mt-1 truncate text-[0.72rem] font-black text-white sm:text-sm">Seated Cable Row</p>
            </div>
          </div>
          <span className="rounded-md border border-violet-400/30 bg-violet-500/12 px-2 py-1 text-[0.46rem] font-bold text-violet-200">2 / 6</span>
        </div>

        <div className="grid gap-1.5 p-2.5">
          <SetRow set="1" reps="12" load="90" volume="1,080" state="complete" />
          <SetRow set="2" reps="10" load="100" volume="1,000" state="complete" />
          <SetRow set="3" reps="8" load="110" volume="880" state="active" />
        </div>
        <div className="flex items-center justify-between border-t border-cyan-200/10 px-3.5 py-2.5 text-[0.5rem] sm:text-[0.58rem]">
          <span className="font-semibold text-cyan-100/56">Working volume</span>
          <span className="tabular-nums font-black text-cyan-300">2,960 lb</span>
        </div>
      </div>
      <figcaption className="screen-reader-only">Seated Cable Row: 12 reps at 90 pounds, 10 reps at 100 pounds, and an active set of 8 reps at 110 pounds.</figcaption>
    </motion.figure>
  );
}

function SetRow({
  set,
  reps,
  load,
  volume,
  state,
}: {
  set: string;
  reps: string;
  load: string;
  volume: string;
  state: "complete" | "active";
}) {
  return (
    <div className={state === "active"
      ? "grid grid-cols-[1.45rem_1fr_1fr_1.15fr] items-center gap-1.5 rounded-lg border border-violet-400/48 bg-violet-500/12 p-2 shadow-[inset_0_0_20px_rgba(168,85,247,.08)]"
      : "grid grid-cols-[1.45rem_1fr_1fr_1.15fr] items-center gap-1.5 rounded-lg border border-cyan-300/20 bg-cyan-300/[.045] p-2"}
    >
      <span className={state === "active"
        ? "grid size-[1.35rem] place-items-center rounded-full border border-violet-300/70 bg-violet-400/15 text-[0.55rem] font-black text-violet-200"
        : "grid size-[1.35rem] place-items-center rounded-full bg-cyan-300 text-[#031116]"}
      >
        {state === "complete" ? <Check size={11} weight="bold" aria-label={`Set ${set} complete`} /> : set}
      </span>
      <SetValue label="Reps" value={reps} />
      <SetValue label="Lbs" value={load} />
      <SetValue label="Vol" value={volume} accent />
    </div>
  );
}

function SetValue({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="min-w-0">
      <p className="text-[0.38rem] font-bold uppercase tracking-[0.08em] text-zinc-500 sm:text-[0.43rem]">{label}</p>
      <p className={`tabular-nums mt-0.5 truncate text-[0.62rem] font-black sm:text-[0.72rem] ${accent ? "text-cyan-300" : "text-white"}`}>{value}</p>
    </div>
  );
}

function GymBuddyConversation({ side, style }: { side: Chapter["screenPosition"]; style: MotionStyle }) {
  return (
    <motion.figure
      style={style}
      className={`motion-static-fallback pointer-events-none absolute top-[36%] z-20 w-[94%] ${side === "left" ? "-right-[72%] md:-right-[62%]" : "-left-[72%] md:-left-[62%]"}`}
      aria-label="Example personalized conversation with GymBuddy AI"
    >
      <div className="overflow-hidden rounded-[1.1rem] border border-violet-300/32 bg-[linear-gradient(150deg,rgba(17,9,31,.98),rgba(6,6,12,.98))] shadow-[0_24px_80px_rgba(0,0,0,.75),0_0_48px_rgba(168,85,247,.22),inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/8 px-3.5 py-2.5">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-lg border border-violet-400/40 bg-violet-500/15 text-violet-300">
              <Sparkle size={14} weight="fill" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[0.64rem] font-black text-white sm:text-xs">GymBuddy</p>
              <p className="mt-0.5 text-[0.43rem] font-semibold text-cyan-300 sm:text-[0.5rem]">Workout context ready</p>
            </div>
          </div>
          <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]" aria-hidden="true" />
        </div>

        <div className="grid gap-3 p-3">
          <div className="ml-auto max-w-[84%] rounded-lg rounded-br-[.2rem] bg-[linear-gradient(135deg,#8b5cf6,#6d28d9)] px-3 py-2.5 text-[0.56rem] font-medium leading-[1.45] text-white shadow-[0_9px_24px_rgba(109,40,217,.22)] sm:text-[0.66rem]">
            I missed two workouts. How should I adjust this week?
          </div>

          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg border border-violet-400/40 bg-violet-500/15 text-violet-300">
              <Sparkle size={14} weight="fill" aria-hidden="true" />
            </span>
            <div className="min-w-0 text-[0.54rem] leading-[1.5] text-zinc-200 sm:text-[0.65rem]">
              <p>Keep today&apos;s session. Move your second lower-body day to Saturday and reduce each main lift by one set.</p>
              <p className="mt-2 border-l border-cyan-300/38 pl-2 font-semibold text-cyan-200">Resume your normal split Monday—no catch-up workouts needed.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 border-t border-white/8 px-3.5 py-2 text-[0.45rem] text-violet-200/62 sm:text-[0.52rem]">
          <Sparkle size={11} aria-hidden="true" /> Personalized from Marlin&apos;s workout history
        </div>
      </div>
      <figcaption className="screen-reader-only">GymBuddy recommends rescheduling one lower-body session and reducing working sets after two missed workouts.</figcaption>
    </motion.figure>
  );
}
