"use client";

import { useSyncExternalStore } from "react";

type NavigatorWithHints = Navigator & { connection?: EventTarget & { saveData?: boolean }; deviceMemory?: number };

const query = "(max-width: 1023px), (pointer: coarse), (prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(query);
  const connection = (navigator as NavigatorWithHints).connection;
  media.addEventListener("change", onChange);
  connection?.addEventListener("change", onChange);
  return () => {
    media.removeEventListener("change", onChange);
    connection?.removeEventListener("change", onChange);
  };
}

function getSnapshot() {
  const hints = navigator as NavigatorWithHints;
  return window.matchMedia(query).matches || Boolean(hints.connection?.saveData || (hints.deviceMemory && hints.deviceMemory <= 2));
}

export function useConservativeMotion() {
  // Visible before hydration; enable motion only on capable desktops.
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}
