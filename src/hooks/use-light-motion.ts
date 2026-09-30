"use client";

import { useSyncExternalStore } from "react";

type NavigatorWithConnection = Navigator & {
  connection?: EventTarget & { saveData?: boolean };
};

const query = "(prefers-reduced-motion: reduce)";
const listeners = new Set<() => void>();
let media: MediaQueryList | undefined;
let connection: NavigatorWithConnection["connection"];

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  if (typeof window.matchMedia !== "function") return () => {};
  listeners.add(listener);
  if (listeners.size === 1) {
    media = window.matchMedia(query);
    connection = (navigator as NavigatorWithConnection).connection;
    media.addEventListener("change", notify);
    connection?.addEventListener("change", notify);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      media?.removeEventListener("change", notify);
      connection?.removeEventListener("change", notify);
      media = undefined;
      connection = undefined;
    }
  };
}

function getSnapshot() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function")
    return false;
  return (
    !window.matchMedia(query).matches &&
    !(navigator as NavigatorWithConnection).connection?.saveData
  );
}

// Phone-sized viewports may use lightweight motion, never the scroll scene hook.
// Server rendering stays static and the shared subscription avoids extra listeners.
export function useLightMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
