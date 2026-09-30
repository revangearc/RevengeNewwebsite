import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useLightMotion } from "./use-light-motion";

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

function preferences(initial = false) {
  let matches = initial;
  const listeners = new Set<() => void>();
  const add = vi.fn((_event: string, listener: () => void) => listeners.add(listener));
  const remove = vi.fn((_event: string, listener: () => void) => listeners.delete(listener));
  vi.stubGlobal("matchMedia", vi.fn(() => ({
    get matches() { return matches; },
    addEventListener: add, removeEventListener: remove,
  })));
  return { add, remove, change(next: boolean) { matches = next; listeners.forEach((listener) => listener()); } };
}

describe("lightweight motion preferences", () => {
  it("allows lightweight phone motion without viewport or scroll subscriptions", () => {
    preferences();
    const { result } = renderHook(useLightMotion);
    expect(result.current).toBe(true);
    expect(window.matchMedia).toHaveBeenCalledWith("(prefers-reduced-motion: reduce)");
  });
  it("responds immediately to Reduce Motion changes", () => {
    const setting = preferences();
    const { result } = renderHook(useLightMotion);
    act(() => setting.change(true));
    expect(result.current).toBe(false);
  });
  it("shares one preference listener and removes it after the last subscriber", () => {
    const setting = preferences();
    const first = renderHook(useLightMotion);
    const second = renderHook(useLightMotion);
    expect(setting.add).toHaveBeenCalledOnce();
    first.unmount();
    expect(setting.remove).not.toHaveBeenCalled();
    second.unmount();
    expect(setting.remove).toHaveBeenCalledOnce();
  });
  it("keeps the fallback static when preference APIs are unavailable", () => {
    vi.stubGlobal("matchMedia", undefined);
    expect(renderHook(useLightMotion).result.current).toBe(false);
  });
  it("honors Save Data changes and removes its connection subscription", () => {
    preferences();
    const connection = Object.assign(new EventTarget(), { saveData: true });
    const remove = vi.spyOn(connection, "removeEventListener");
    vi.stubGlobal("navigator", { connection });
    const { result, unmount } = renderHook(useLightMotion);
    expect(result.current).toBe(false);
    act(() => { connection.saveData = false; connection.dispatchEvent(new Event("change")); });
    expect(result.current).toBe(true);
    unmount();
    expect(remove).toHaveBeenCalledOnce();
  });
});
