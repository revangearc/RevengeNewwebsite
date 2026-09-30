import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useConservativeMotion } from "./use-conservative-motion";
import { useSceneProgress } from "./use-scene-progress";

const { stop, start } = vi.hoisted(() => {
  const stop = vi.fn();
  return { stop, start: vi.fn(() => stop) };
});

vi.mock("motion/react", async (importOriginal) => ({
  ...await importOriginal<typeof import("motion/react")>(),
  scroll: start,
}));

afterEach(() => { vi.unstubAllGlobals(); vi.clearAllMocks(); });

function media(initial: boolean) {
  let matches = initial;
  const listeners = new Set<() => void>();
  vi.stubGlobal("matchMedia", vi.fn(() => ({
    get matches() { return matches; },
    media: "", onchange: null,
    addEventListener: (_event: string, listener: () => void) => listeners.add(listener),
    removeEventListener: (_event: string, listener: () => void) => listeners.delete(listener),
    addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: () => true,
  })));
  return (next: boolean) => { matches = next; listeners.forEach((listener) => listener()); };
}

function useScene() {
  const conservative = useConservativeMotion();
  const progress = useSceneProgress(target, !conservative);
  return { conservative, progress };
}
const target = { current: document.createElement("section") };

describe("mobile and reduced-motion scenes", () => {
  it("does not subscribe to scrolling on a phone or reduced-motion display", () => {
    media(true);
    const { result, unmount } = renderHook(useScene);
    expect(result.current.conservative).toBe(true);
    expect(result.current.progress.get()).toBe(0);
    expect(start).not.toHaveBeenCalled();
    unmount();
  });

  it("removes desktop scroll tracking when the viewport or motion preference changes", () => {
    const changeMedia = media(false);
    const { result, unmount } = renderHook(useScene);
    expect(start).toHaveBeenCalledOnce();
    act(() => changeMedia(true));
    expect(result.current.conservative).toBe(true);
    expect(stop).toHaveBeenCalledOnce();
    unmount();
  });
});
