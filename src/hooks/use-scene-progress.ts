"use client";

import { scroll, useMotionValue } from "motion/react";
import { useEffect, type RefObject } from "react";

export function useSceneProgress(target: RefObject<HTMLElement | null>, enabled: boolean, hero = false) {
  const progress = useMotionValue(0);
  useEffect(() => {
    if (!enabled || !target.current) return;
    return scroll((value: number) => progress.set(value), {
      target: target.current,
      offset: hero ? ["start start", "end start"] : ["start end", "end start"],
    });
  }, [enabled, hero, progress, target]);
  return progress;
}
