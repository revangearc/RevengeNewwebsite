import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SiteMotion } from "./site-motion";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
afterEach(() => {
  cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks();
  delete document.documentElement.dataset.lightMotion;
  delete document.documentElement.dataset.pageVisible;
});

function setup(reduced = false) {
  const listeners = new Set<() => void>();
  let matches = reduced;
  vi.stubGlobal("matchMedia", vi.fn(() => ({
    get matches() { return matches; },
    addEventListener: (_event: string, listener: () => void) => listeners.add(listener),
    removeEventListener: (_event: string, listener: () => void) => listeners.delete(listener),
  })));
  let callback: IntersectionObserverCallback;
  const observe = vi.fn(), unobserve = vi.fn(), disconnect = vi.fn();
  const Observer = vi.fn(class {
    constructor(next: IntersectionObserverCallback) { callback = next; }
    observe = observe; unobserve = unobserve; disconnect = disconnect;
  });
  vi.stubGlobal("IntersectionObserver", Observer);
  const view = render(<>
    <article data-testid="card" data-reveal>Always-visible content</article>
    <div data-testid="buddy" data-buddy-motion>Buddy</div>
    <SiteMotion />
  </>);
  return {
    ...view, Observer, unobserve, disconnect,
    enter(target: Element, isIntersecting: boolean) {
      act(() => callback([{ target, isIntersecting } as IntersectionObserverEntry], {} as IntersectionObserver));
    },
    reduce() { act(() => { matches = true; listeners.forEach((listener) => listener()); }); },
  };
}

describe("site motion controller", () => {
  it("reveals content once and pauses character motion offscreen or in a hidden tab", () => {
    const controller = setup();
    const card = screen.getByTestId("card"), buddy = screen.getByTestId("buddy");
    expect(card).toBeVisible();
    expect(card).not.toHaveAttribute("data-revealed");
    controller.enter(card, true);
    expect(card).toHaveAttribute("data-revealed", "true");
    expect(controller.unobserve).toHaveBeenCalledWith(card);
    controller.enter(buddy, true);
    expect(buddy).toHaveAttribute("data-motion-active", "true");
    const hidden = vi.spyOn(document, "hidden", "get").mockReturnValue(true);
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    expect(buddy).toHaveAttribute("data-motion-active", "false");
    hidden.mockReturnValue(false);
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    controller.enter(buddy, false);
    expect(buddy).toHaveAttribute("data-motion-active", "false");
    controller.unmount();
    expect(controller.disconnect).toHaveBeenCalledOnce();
  });
  it("disconnects the observer and stops motion when Reduce Motion is enabled", () => {
    const controller = setup();
    controller.enter(screen.getByTestId("buddy"), true);
    controller.reduce();
    expect(document.documentElement).toHaveAttribute("data-light-motion", "off");
    expect(screen.getByTestId("buddy")).toHaveAttribute("data-motion-active", "false");
    expect(controller.disconnect).toHaveBeenCalledOnce();
  });
  it("does not create motion observers for reduced-motion visitors", () => {
    const controller = setup(true);
    expect(controller.Observer).not.toHaveBeenCalled();
    expect(screen.getByText("Always-visible content")).toBeVisible();
  });
});
